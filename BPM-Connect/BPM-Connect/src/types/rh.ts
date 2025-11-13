export interface Vaga {
  id: string
  titulo: string
  empresa: string
  localizacao: string
  tipo: 'CLT' | 'PJ' | 'Freelancer'
  nivel: 'Júnior' | 'Pleno' | 'Sênior'
  salario?: number
  descricao: string
  requisitos: string[]
}

export interface Candidato {
  id: string
  nome: string
  email: string
  telefone: string
  experiencia: number
  pretensaoSalarial: number
  curriculoUrl?: string
}