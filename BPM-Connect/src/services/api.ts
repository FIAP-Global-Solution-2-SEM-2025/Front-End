const API_BASE_URL = 'https://skillfast-api.onrender.com';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  ativo: boolean;
}

export interface Empresa {
  id: number;
  nome: string;
  cnpj: string;
  setor: string;
  tamanho: string;
  descricao?: string;
  ativa: boolean;
}

export interface Vaga {
  id: number;
  titulo: string;
  descricao: string;
  empresa: string;
  localizacao: string;
  tipo: string;
  nivel: string;
  salario?: number;
  requisitos: string[];
  ativa: boolean;
  dataCriacao: string;
  empresaId?: number;
}

export interface Candidatura {
  id: number;
  usuarioId: number;
  vagaId: number;
  status: string;
  observacao?: string;
  dataCandidatura: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  id?: number;
  tipo?: string;
  autenticado?: boolean;
  authenticated?: boolean;
}

export interface RegistroUsuarioData {
  nome: string;
  email: string;
  senha: string;
  tipo: string;
}

export interface RegistroEmpresaData {
  nome: string;
  cnpj: string;
  setor: string;
  tamanho: string;
  descricao?: string;
}

export interface CriarVagaData {
  titulo: string;
  descricao: string;
  empresa: string;
  localizacao: string;
  tipo: string;
  nivel: string;
  salario?: number;
  requisitos: string[];
  empresaId?: number;
}

// Serviços da API
export const apiService = {
  // ===== USUÁRIOS =====
  async login(credentials: { email: string; senha: string }): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  },

  async cadastrarUsuario(usuario: RegistroUsuarioData): Promise<Usuario> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(usuario)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro no cadastro de usuário:', error);
      throw error;
    }
  },

  async buscarUsuarioPorId(id: number): Promise<Usuario> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      throw error;
    }
  },

  async buscarUsuarioPorEmail(email: string): Promise<Usuario> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/email/${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Usuário não encontrado');
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      throw error;
    }
  },

  async atualizarUsuario(id: number, usuarioData: Partial<Usuario>): Promise<Usuario> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(usuarioData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },

  // ===== EMPRESAS =====
  async cadastrarEmpresa(empresa: RegistroEmpresaData): Promise<Empresa> {
    try {
      // Limpa o CNPJ (remove caracteres não numéricos)
      const empresaData = {
        ...empresa,
        cnpj: empresa.cnpj.replace(/[^\d]/g, '')
      };

      console.log('Enviando dados da empresa:', empresaData);

      const response = await fetch(`${API_BASE_URL}/empresas`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(empresaData)
      });

      const responseText = await response.text();
      console.log('Resposta do servidor (empresa):', responseText);

      if (!response.ok) {
        throw new Error(responseText || `Erro ${response.status}: ${response.statusText}`);
      }

      try {
        return JSON.parse(responseText);
      } catch {
        throw new Error('Resposta inválida do servidor');
      }
    } catch (error) {
      console.error('Erro no cadastro de empresa:', error);
      throw error;
    }
  },

  async listarEmpresas(): Promise<Empresa[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/empresas`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao listar empresas:', error);
      throw error;
    }
  },

  async buscarEmpresaPorId(id: number): Promise<Empresa> {
    try {
      const response = await fetch(`${API_BASE_URL}/empresas/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Empresa não encontrada');
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar empresa por ID:', error);
      throw error;
    }
  },

  async buscarEmpresaPorCnpj(cnpj: string): Promise<Empresa> {
    try {
      const cnpjLimpo = cnpj.replace(/[^\d]/g, '');
      const response = await fetch(`${API_BASE_URL}/empresas/cnpj/${cnpjLimpo}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Empresa não encontrada');
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar empresa por CNPJ:', error);
      throw error;
    }
  },

  async buscarEmpresasPorSetor(setor: string): Promise<Empresa[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/empresas/setor/${encodeURIComponent(setor)}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao buscar empresas por setor:', error);
      throw error;
    }
  },

  async buscarEmpresasPorTamanho(tamanho: string): Promise<Empresa[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/empresas/tamanho/${encodeURIComponent(tamanho)}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao buscar empresas por tamanho:', error);
      throw error;
    }
  },

  async atualizarEmpresa(id: number, empresaData: Partial<Empresa>): Promise<Empresa> {
    try {
      const response = await fetch(`${API_BASE_URL}/empresas/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(empresaData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error);
      throw error;
    }
  },

  // ===== VAGAS =====
  async listarVagas(): Promise<Vaga[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao listar vagas:', error);
      throw error;
    }
  },

  async listarVagasAtivas(): Promise<Vaga[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/ativas`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao listar vagas ativas:', error);
      throw error;
    }
  },

  async buscarVagaPorId(id: number): Promise<Vaga> {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Vaga não encontrada');
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar vaga por ID:', error);
      throw error;
    }
  },

  async buscarVagasPorEmpresa(empresaId: number): Promise<Vaga[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/empresa/${empresaId}`);
      
      if (response.status === 404) {
        return []; // Empresa não tem vagas ainda
      }
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao buscar vagas por empresa:', error);
      throw error;
    }
  },

  async buscarVagasRecentes(): Promise<Vaga[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/recentes`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao buscar vagas recentes:', error);
      throw error;
    }
  },

  async filtrarVagas(filtros: { 
    tipo?: string; 
    nivel?: string; 
    localizacao?: string; 
    titulo?: string;
    empresa?: string;
  }): Promise<Vaga[]> {
    try {
      const params = new URLSearchParams();
      Object.entries(filtros).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await fetch(`${API_BASE_URL}/vagas/filtrar?${params}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao filtrar vagas:', error);
      throw error;
    }
  },

  async buscarVagasAvancado(filtros: {
    empresa?: string;
    titulo?: string;
    nivel?: string;
  }): Promise<Vaga[]> {
    try {
      const params = new URLSearchParams();
      Object.entries(filtros).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await fetch(`${API_BASE_URL}/vagas/buscar/avancado?${params}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro na busca avançada de vagas:', error);
      throw error;
    }
  },

  async criarVaga(vagaData: CriarVagaData): Promise<Vaga> {
    try {
      console.log('Enviando dados da vaga:', vagaData);

      const response = await fetch(`${API_BASE_URL}/vagas`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(vagaData)
      });

      const responseText = await response.text();
      console.log('Resposta do servidor (vaga):', responseText);

      if (!response.ok) {
        throw new Error(responseText || `Erro ${response.status}: ${response.statusText}`);
      }

      try {
        return JSON.parse(responseText);
      } catch {
        throw new Error('Resposta inválida do servidor');
      }
    } catch (error) {
      console.error('Erro ao criar vaga:', error);
      throw error;
    }
  },

  async atualizarVaga(id: number, vagaData: Partial<Vaga>): Promise<Vaga> {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(vagaData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar vaga:', error);
      throw error;
    }
  },

  async desativarVaga(id: number, versao: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/${id}/desativar?versao=${versao}`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao desativar vaga:', error);
      throw error;
    }
  },

  async reativarVaga(id: number, versao: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/${id}/reativar?versao=${versao}`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao reativar vaga:', error);
      throw error;
    }
  },

  // ===== CANDIDATURAS =====
  async listarCandidaturas(): Promise<Candidatura[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/candidaturas`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao listar candidaturas:', error);
      throw error;
    }
  },

  async candidatarVaga(usuarioId: number, vagaId: number): Promise<Candidatura> {
    try {
      const response = await fetch(`${API_BASE_URL}/candidaturas`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ usuarioId, vagaId })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao candidatar vaga:', error);
      throw error;
    }
  },

  async buscarCandidaturaPorId(id: number): Promise<Candidatura> {
    try {
      const response = await fetch(`${API_BASE_URL}/candidaturas/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Candidatura não encontrada');
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar candidatura por ID:', error);
      throw error;
    }
  },

  async buscarCandidaturasPorUsuario(usuarioId: number): Promise<Candidatura[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/candidaturas/usuario/${usuarioId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return []; // Usuário não tem candidaturas
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao buscar candidaturas por usuário:', error);
      throw error;
    }
  },

  async buscarCandidaturasPorVaga(vagaId: number): Promise<Candidatura[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/candidaturas/vaga/${vagaId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return []; // Vaga não tem candidaturas
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao buscar candidaturas por vaga:', error);
      throw error;
    }
  },

  async buscarCandidaturasPorEmpresa(empresaId: number): Promise<Candidatura[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/candidaturas/empresa/${empresaId}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao buscar candidaturas por empresa:', error);
      throw error;
    }
  },

  async verificarCandidatura(usuarioId: number, vagaId: number): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/candidaturas/verificar?usuarioId=${usuarioId}&vagaId=${vagaId}`
      );
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao verificar candidatura:', error);
      throw error;
    }
  },

  async atualizarStatusCandidatura(
    id: number, 
    status: string, 
    observacao?: string
  ): Promise<Candidatura> {
    try {
      const params = new URLSearchParams();
      params.append('status', status);
      if (observacao) params.append('observacao', observacao);

      const response = await fetch(`${API_BASE_URL}/candidaturas/${id}/status?${params}`, {
        method: 'PATCH',
        headers: { 
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar status da candidatura:', error);
      throw error;
    }
  },

  async aprovarCandidatura(id: number, observacao?: string): Promise<Candidatura> {
    try {
      const params = new URLSearchParams();
      if (observacao) params.append('observacao', observacao);

      const response = await fetch(`${API_BASE_URL}/candidaturas/${id}/aprovar?${params}`, {
        method: 'PATCH',
        headers: { 
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao aprovar candidatura:', error);
      throw error;
    }
  },

  async rejeitarCandidatura(id: number, observacao?: string): Promise<Candidatura> {
    try {
      const params = new URLSearchParams();
      if (observacao) params.append('observacao', observacao);

      const response = await fetch(`${API_BASE_URL}/candidaturas/${id}/rejeitar?${params}`, {
        method: 'PATCH',
        headers: { 
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao rejeitar candidatura:', error);
      throw error;
    }
  },

  async cancelarCandidatura(id: number, versao: number): Promise<void> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/candidaturas/${id}/cancelar?versao=${versao}`, 
        { method: 'PATCH' }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao cancelar candidatura:', error);
      throw error;
    }
  }
};

// Utilitários
export const formatarCNPJ = (cnpj: string): string => {
  const numeros = cnpj.replace(/[^\d]/g, '');
  if (numeros.length !== 14) return cnpj;
  
  return numeros.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  );
};

export const validarCNPJ = (cnpj: string): boolean => {
  const numeros = cnpj.replace(/[^\d]/g, '');
  
  if (numeros.length !== 14) return false;
  if (/^(\d)\1+$/.test(numeros)) return false;
    return true;
};

export default apiService;