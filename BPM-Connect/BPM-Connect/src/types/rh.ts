export interface Vaga {
  id: string
  titulo: string
  empresa: string
  localizacao: string
  tipo: 'CLT' | 'PJ' | 'Freelancer' | 'Estágio'
  nivel: 'Júnior' | 'Pleno' | 'Sênior'
  salario?: number
  descricao: string
  requisitos: string[]
  beneficios?: string[]
  dataPublicacao: Date
  dataExpiracao?: Date
  status: 'ativa' | 'pausada' | 'encerrada'
  totalCandidaturas: number
  modalidade: 'presencial' | 'remoto' | 'híbrido'
  setor: string
}

export interface Candidato {
  id: string
  nome: string
  email: string
  telefone: string
  experiencia: number
  pretensaoSalarial: number
  curriculoUrl?: string
  linkedinUrl?: string
  portfolioUrl?: string
}