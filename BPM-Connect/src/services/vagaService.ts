const API_BASE_URL = 'https://skillfast-api.onrender.com';

export interface VagaAPI {
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

export const vagaService = {
  async listarVagasAtivas(): Promise<VagaAPI[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/ativas`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao buscar vagas ativas:', error);
      return [];
    }
  },

  async listarVagasPorEmpresa(empresaId: number): Promise<VagaAPI[]> {
    try {
      console.log(`Buscando vagas para empresa ID: ${empresaId}`);
      
      const response = await fetch(`${API_BASE_URL}/vagas/empresa/${empresaId}`);
      
      if (response.status === 404) {
        console.log(`Nenhuma vaga encontrada para empresa ${empresaId} - endpoint retornou 404`);
        return [];
      }
      
      if (!response.ok) {
        console.error(`Erro ${response.status} ao buscar vagas da empresa ${empresaId}`);
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`Vagas encontradas para empresa ${empresaId}:`, data);
      return Array.isArray(data) ? data : [];
      
    } catch (error) {
      console.error('Erro ao buscar vagas da empresa:', error);
      
      // SOLUÇÃO ALTERNATIVA: Buscar todas as vagas e filtrar
      try {
        console.log('Tentando buscar todas as vagas e filtrar...');
        const todasVagas = await this.listarVagasAtivas();
        const vagasDaEmpresa = todasVagas.filter(vaga => vaga.empresaId === empresaId);
        console.log(`Vagas filtradas para empresa ${empresaId}:`, vagasDaEmpresa);
        return vagasDaEmpresa;
      } catch (fallbackError) {
        console.error('Erro no fallback:', fallbackError);
        return [];
      }
    }
  },

  async criarVaga(vagaData: CriarVagaData): Promise<VagaAPI> {
    try {
      console.log('Tentando criar vaga...');
      console.log('Dados recebidos:', vagaData);
      
      const dadosParaEnviar = {
        titulo: vagaData.titulo,
        descricao: vagaData.descricao,
        tipo: vagaData.tipo,
        nivel: vagaData.nivel,
        localizacao: vagaData.localizacao,
        requisitos: vagaData.requisitos,
        empresaId: vagaData.empresaId,
        empresa: vagaData.empresa,
        ...(vagaData.salario && { salario: vagaData.salario })
      };
      
      console.log('Dados para envio:', dadosParaEnviar);
      console.log('JSON enviado:', JSON.stringify(dadosParaEnviar));
      
      const response = await fetch(`${API_BASE_URL}/vagas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      console.log('Status da resposta:', response.status);
      
      const responseText = await response.text();
      console.log('Resposta do servidor:', responseText);
      
      if (!response.ok) {
        console.error('Erro detalhado:', {
          status: response.status,
          statusText: response.statusText,
          body: responseText
        });
        
        throw new Error(`Erro ${response.status}: ${responseText || 'Erro interno do servidor'}`);
      }
      
      try {
        const data = JSON.parse(responseText);
        console.log('Vaga criada com sucesso:', data);
        return data;
      } catch {
        throw new Error('Resposta inválida do servidor');
      }
      
    } catch (error) {
      console.error('Erro completo:', error);
      throw error;
    }
  },

  async buscarVagaPorId(id: number): Promise<VagaAPI> {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/${id}`);
      if (!response.ok) throw new Error('Vaga não encontrada');
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar vaga por ID:', error);
      throw error;
    }
  },

  async listarTodasVagas(): Promise<VagaAPI[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao buscar todas as vagas:', error);
      return [];
    }
  }
};