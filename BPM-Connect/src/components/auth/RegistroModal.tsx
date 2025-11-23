import { useState } from 'react';
import { X, Building, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { useAuth } from '../../Contexts/AuthContexts';
import { apiService } from '../../services/api';

interface RegistroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

// Dados  para empresas
const SETORES = [
  'Tecnologia', 'Saude', 'Educaçao', 'Finanças', 'Varejo', 
  'Industria', 'Serviços', 'Construçao', 'Outros'
];

const TAMANHOS_EMPRESA = [
  'STARTUP', 'PEQUENA', 'MEDIA', 'GRANDE', 'CORPORACAO'
];

export function RegistroModal({ isOpen, onClose, onSwitchToLogin }: RegistroModalProps) {
  const [etapa, setEtapa] = useState<'tipo' | 'dados' | 'empresa'>('tipo');
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipo: 'CANDIDATO' as 'CANDIDATO' | 'EMPRESA',
    
    
    cnpj: '',
    setor: '',
    tamanho: 'PEQUENA' as string,
    descricao: ''
  });
  
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { cadastrar } = useAuth();

  const handleMudanca = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDadosFormulario(prev => ({
      ...prev,
      [name]: value
    }));
    if (erro) setErro('');
  };

  const validarCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]/g, '');
    
    if (cnpj.length !== 14) return false;
    
    if (/^(\d)\1+$/.test(cnpj)) return false;
    
    return true;
  };

  const avancarEtapa = () => {
    if (etapa === 'tipo') {
      if (!dadosFormulario.tipo) {
        setErro('Selecione o tipo de conta');
        return;
      }
      setEtapa('dados');
    } else if (etapa === 'dados') {
      // Validação dos dados básicos
      if (!dadosFormulario.nome || !dadosFormulario.email || !dadosFormulario.senha) {
        setErro('Por favor, preencha todos os campos');
        return;
      }

      if (dadosFormulario.senha !== dadosFormulario.confirmarSenha) {
        setErro('As senhas não coincidem');
        return;
      }

      if (dadosFormulario.senha.length < 6) {
        setErro('A senha deve ter pelo menos 6 caracteres');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(dadosFormulario.email)) {
        setErro('Por favor, insira um email válido');
        return;
      }

      if (dadosFormulario.tipo === 'EMPRESA') {
        setEtapa('empresa');
      } else {
        handleEnviar();
      }
    }
  };

  const voltarEtapa = () => {
    if (etapa === 'dados') {
      setEtapa('tipo');
    } else if (etapa === 'empresa') {
      setEtapa('dados');
    }
  };

  const handleEnviar = async () => {
    setCarregando(true);
    setErro('');

    try {
      console.log('Enviando dados para cadastro:', dadosFormulario);
      
      let empresaId: number | undefined;
      
      if (dadosFormulario.tipo === 'EMPRESA') {
        if (!dadosFormulario.cnpj || !dadosFormulario.setor) {
          setErro('CNPJ e setor são obrigatórios para empresas');
          setCarregando(false);
          return;
        }

        if (!validarCNPJ(dadosFormulario.cnpj)) {
          setErro('CNPJ inválido');
          setCarregando(false);
          return;
        }

        try {
          console.log('Cadastrando empresa...');
          const empresaResponse = await apiService.cadastrarEmpresa({
            nome: dadosFormulario.nome,
            cnpj: dadosFormulario.cnpj.replace(/[^\d]/g, ''),
            setor: dadosFormulario.setor,
            tamanho: dadosFormulario.tamanho,
            descricao: dadosFormulario.descricao
          });
          
          console.log('Empresa cadastrada:', empresaResponse);
          // Não precisamos do ID da empresa aqui pois o usuário será criado separadamente
        } catch (error: any) {
          console.error('Erro ao cadastrar empresa:', error);
          // Se a empresa já existe, continuamos com o cadastro do usuário
          if (!error.message.includes('já cadastrada')) {
            throw error;
          }
        }
      }

      // Cadastra o usuário
      const sucesso = await cadastrar({
        nome: dadosFormulario.nome,
        email: dadosFormulario.email,
        senha: dadosFormulario.senha,
        tipo: dadosFormulario.tipo
      });

      if (sucesso) {
        console.log('Cadastro realizado com sucesso!');
        handleFechar();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setErro('Erro ao criar conta. Tente novamente.');
      }
    } catch (error: any) {
      console.error('Erro detalhado no cadastro:', error);
      setErro(error.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const handleFechar = () => {
    setEtapa('tipo');
    setDadosFormulario({
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      tipo: 'CANDIDATO',
      cnpj: '',
      setor: '',
      tamanho: 'PEQUENA',
      descricao: ''
    });
    setErro('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative">
        <CardHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <div>
            <h2 className="text-xl font-bold">
              {etapa === 'tipo' && 'Criar Conta'}
              {etapa === 'dados' && 'Seus Dados'}
              {etapa === 'empresa' && 'Dados da Empresa'}
            </h2>
            <div className="flex gap-1 mt-2">
              {['tipo', 'dados', 'empresa'].map((step, index) => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded ${
                    etapa === step 
                      ? 'bg-blue-600' 
                      : index < ['tipo', 'dados', 'empresa'].indexOf(etapa) 
                        ? 'bg-blue-300' 
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleFechar}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            disabled={carregando}
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <form onSubmit={(e) => { e.preventDefault(); etapa === 'empresa' ? handleEnviar() : avancarEtapa(); }} className="space-y-4">
            {erro && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                {erro}
              </div>
            )}

            {/* ETAPA 1: Tipo de Conta */}
            {etapa === 'tipo' && (
              <div className="space-y-4">
                <p className="text-sm opacity-80 mb-4">
                  Selecione o tipo de conta que deseja criar
                </p>
                
                <div className="grid gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDadosFormulario(prev => ({ ...prev, tipo: 'CANDIDATO' }));
                      setTimeout(avancarEtapa, 100);
                    }}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      dadosFormulario.tipo === 'CANDIDATO'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <User className="w-6 h-6 mb-2 text-blue-600" />
                    <h3 className="font-semibold">Candidato</h3>
                    <p className="text-sm opacity-80 mt-1">
                      Busco oportunidades de emprego
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDadosFormulario(prev => ({ ...prev, tipo: 'EMPRESA' }));
                      setTimeout(avancarEtapa, 100);
                    }}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      dadosFormulario.tipo === 'EMPRESA'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <Building className="w-6 h-6 mb-2 text-green-600" />
                    <h3 className="font-semibold">Empresa</h3>
                    <p className="text-sm opacity-80 mt-1">
                      Quero publicar vagas e recrutar talentos
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2: Dados Básicos */}
            {etapa === 'dados' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-2">
                    {dadosFormulario.tipo === 'EMPRESA' ? 'Nome da Empresa *' : 'Nome Completo *'}
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={dadosFormulario.nome}
                    onChange={handleMudanca}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder={dadosFormulario.tipo === 'EMPRESA' ? "Nome da sua empresa" : "Seu nome completo"}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={dadosFormulario.email}
                    onChange={handleMudanca}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="senha" className="block text-sm font-medium mb-2">
                    Senha *
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={dadosFormulario.senha}
                    onChange={handleMudanca}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
                  />
                </div>

                <div>
                  <label htmlFor="confirmarSenha" className="block text-sm font-medium mb-2">
                    Confirmar Senha *
                  </label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    value={dadosFormulario.confirmarSenha}
                    onChange={handleMudanca}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Digite a senha novamente"
                    minLength={6}
                  />
                </div>
              </div>
            )}

            {/* ETAPA 3: Dados da Empresa */}
            {etapa === 'empresa' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="cnpj" className="block text-sm font-medium mb-2">
                    CNPJ *
                  </label>
                  <input
                    type="text"
                    id="cnpj"
                    name="cnpj"
                    value={dadosFormulario.cnpj}
                    onChange={handleMudanca}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="00.000.000/0000-00"
                  />
                </div>

                <div>
                  <label htmlFor="setor" className="block text-sm font-medium mb-2">
                    Setor de Atuação *
                  </label>
                  <select
                    id="setor"
                    name="setor"
                    value={dadosFormulario.setor}
                    onChange={handleMudanca}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione um setor</option>
                    {SETORES.map(setor => (
                      <option key={setor} value={setor}>{setor}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="tamanho" className="block text-sm font-medium mb-2">
                    Porte da Empresa *
                  </label>
                  <select
                    id="tamanho"
                    name="tamanho"
                    value={dadosFormulario.tamanho}
                    onChange={handleMudanca}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {TAMANHOS_EMPRESA.map(tamanho => (
                      <option key={tamanho} value={tamanho}>
                        {tamanho.charAt(0) + tamanho.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium mb-2">
                    Descrição da Empresa
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    value={dadosFormulario.descricao}
                    onChange={handleMudanca}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Conte um pouco sobre sua empresa..."
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {etapa !== 'tipo' && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={voltarEtapa}
                  disabled={carregando}
                  className="flex-1"
                >
                  Voltar
                </Button>
              )}
              
              <Button
                type="submit"
                className={`${etapa === 'tipo' ? 'w-full' : 'flex-1'} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50`}
                disabled={carregando}
              >
                {carregando ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {etapa === 'empresa' ? 'Cadastrando...' : 'Avançando...'}
                  </div>
                ) : etapa === 'empresa' ? (
                  'Finalizar Cadastro'
                ) : (
                  'Avançar'
                )}
              </Button>
            </div>
          </form>

          {etapa === 'tipo' && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-center opacity-80">
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Fazer login
                </button>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}