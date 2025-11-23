import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, Usuario, LoginResponse } from '../services/api';

interface UsuarioAuth {
  id: number;
  email: string;
  nome: string;
  tipo: string;
}

interface AuthContextType {
  usuario: UsuarioAuth | null;
  login: (email: string, senha: string) => Promise<boolean>;
  cadastrar: (usuario: { email: string; senha: string; nome: string; tipo: string }) => Promise<boolean>;
  logout: () => void;
  carregando: boolean;
  atualizarUsuario: (dados: Partial<UsuarioAuth>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioAuth | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarUsuarioSalvo = async () => {
      try {
        const usuarioSalvo = localStorage.getItem('usuario');
        if (usuarioSalvo) {
          const usuarioData = JSON.parse(usuarioSalvo);
          
          if (usuarioData.id && usuarioData.email) {
            try {
              const usuarioAtualizado = await apiService.buscarUsuarioPorId(usuarioData.id);
              setUsuario(usuarioAtualizado);
              localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
            } catch (error) {
              console.warn('Nao foi possivel atualizar dados do usuario, usando dados salvos:', error);
              setUsuario(usuarioData);
            }
          } else {
            console.warn('Dados de usuario invalidos no localStorage');
            localStorage.removeItem('usuario');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar usuario:', error);
        localStorage.removeItem('usuario');
      } finally {
        setCarregando(false);
      }
    };

    carregarUsuarioSalvo();
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      setCarregando(true);
      console.log('Iniciando login para:', email);

      const response = await fetch('https://skillfast-api.onrender.com/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      console.log('Status do login:', response.status);
      
      const responseText = await response.text();
      console.log('Resposta do login (texto):', responseText);

      if (!response.ok) {
        throw new Error(responseText || 'Credenciais invalidas');
      }

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Dados do login (JSON):', data);
      } catch {
        throw new Error('Resposta invalida da API');
      }
      
      // Verificacao flexivel do login
      const loginSucesso = data.success || data.autenticado || data.authenticated || data.sucesso;
      const usuarioId = data.id || data.usuarioId || data.userId;

      console.log('Analise login:', { loginSucesso, usuarioId, data });

      if (loginSucesso && usuarioId) {
        // Busca dados do usuario
        try {
          const userResponse = await fetch(`https://skillfast-api.onrender.com/usuarios/email/${email}`);
          if (userResponse.ok) {
            const userData = await userResponse.json();
            console.log('Dados do usuario:', userData);
            
            const usuarioCompleto = {
              id: userData.id,
              email: userData.email,
              nome: userData.nome,
              tipo: userData.tipo
            };

            setUsuario(usuarioCompleto);
            localStorage.setItem('usuario', JSON.stringify(usuarioCompleto));
            localStorage.setItem('token', 'authenticated');
            return true;
          }
        } catch (userError) {
          console.log('Usando dados basicos:', userError);
        }

        // Fallback com dados basicos
        const usuarioBasico = {
          id: usuarioId,
          email: email,
          nome: data.nome || email.split('@')[0],
          tipo: data.tipo || data.tipoUsuario || 'CANDIDATO'
        };

        setUsuario(usuarioBasico);
        localStorage.setItem('usuario', JSON.stringify(usuarioBasico));
        localStorage.setItem('token', 'authenticated');
        return true;
      }
      
      throw new Error(data.message || 'Login falhou');
    } catch (error: any) {
      console.error('Erro no login:', error);
      throw new Error(error.message || 'Email ou senha incorretos');
    } finally {
      setCarregando(false);
    }
  };

  const cadastrar = async (usuarioData: { 
    email: string; 
    senha: string; 
    nome: string; 
    tipo: string;
  }): Promise<boolean> => {
    try {
      setCarregando(true);
      console.log('Iniciando cadastro para:', usuarioData.email);

      // Pequeno delay para garantir persistencia no banco
      console.log('Aguardando persistencia no banco...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch('https://skillfast-api.onrender.com/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioData),
      });

      const responseText = await response.text();
      console.log('Resposta cadastro:', responseText);

      if (!response.ok && response.status !== 201) {
        throw new Error(responseText || 'Erro ao cadastrar');
      }

      console.log('Usuario cadastrado com sucesso');

      // Aguardar mais um pouco para garantir sincronizacao
      console.log('Aguardando sincronizacao...');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Tentar login com retry (3 tentativas)
      let loginSucesso = false;
      let tentativas = 0;
      
      while (!loginSucesso && tentativas < 3) {
        tentativas++;
        console.log(`Tentativa de login ${tentativas}/3...`);
        
        // Aguardar entre tentativas
        if (tentativas > 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * tentativas));
        }
        
        loginSucesso = await login(usuarioData.email, usuarioData.senha);
        
        if (loginSucesso) {
          console.log('Cadastro e login realizados com sucesso!');
          return true;
        }
      }

      // Se login automatico falhou, informar usuario
      if (!loginSucesso) {
        console.warn('Cadastro realizado, mas login automatico falhou');
        throw new Error('Cadastro realizado com sucesso! Voce ja pode fazer login manualmente.');
      }
      
      return true;
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      
      if (error.message.includes('ja cadastrado') || error.message.includes('already exists')) {
        throw new Error('Este email ja esta cadastrado');
      } else if (error.message.includes('Email') && error.message.includes('invalido')) {
        throw new Error('Por favor, insira um email valido');
      } else if (error.message.includes('Senha') && error.message.includes('fraca')) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      } else if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
        throw new Error('Erro de conexao. Verifique sua internet.');
      } else if (error.message.includes('Voce ja pode fazer login manualmente')) {
        throw error;
      } else {
        throw new Error(error.message || 'Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  const atualizarUsuario = async (dados: Partial<UsuarioAuth>): Promise<void> => {
    try {
      if (!usuario) throw new Error('Nenhum usuario logado');

      console.log('Atualizando dados do usuario:', dados);
      
      // Converter para o formato da API
      const dadosParaAPI = {
        nome: dados.nome,
        email: dados.email
      };

      const response = await fetch(`https://skillfast-api.onrender.com/usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaAPI),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar usuario');
      }

      const usuarioAtualizado = await response.json();
      
      // Atualizar estado local
      const usuarioAuthAtualizado = {
        id: usuarioAtualizado.id,
        email: usuarioAtualizado.email,
        nome: usuarioAtualizado.nome,
        tipo: usuarioAtualizado.tipo
      };
      
      setUsuario(usuarioAuthAtualizado);
      localStorage.setItem('usuario', JSON.stringify(usuarioAuthAtualizado));
      
      console.log('Dados do usuario atualizados com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar usuario:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('Realizando logout...');
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    console.log('Logout realizado com sucesso');
  };

  const value: AuthContextType = {
    usuario,
    login,
    cadastrar,
    logout,
    carregando,
    atualizarUsuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}