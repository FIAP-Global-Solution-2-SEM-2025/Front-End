export interface Vaga {
  id: string;
  titulo: string;
  empresa: string;
  localizacao: string;
  tipo: string;
  nivel: string;
  salario?: number;
  descricao: string;
  requisitos: string[];
}

// Tipos específicos para formulários
export type TipoVagaForm = "CLT" | "PJ" | "FREELANCE" | "ESTAGIO";
export type NivelVagaForm = "JUNIOR" | "PLENO" | "SENIOR";

// Opções para selects
export const TIPOS_VAGA: { value: TipoVagaForm; label: string }[] = [
  { value: "CLT", label: "CLT" },
  { value: "PJ", label: "PJ" },
  { value: "FREELANCE", label: "Freelancer" },
  { value: "ESTAGIO", label: "Estágio" }
];

export const NIVEIS_VAGA: { value: NivelVagaForm; label: string }[] = [
  { value: "JUNIOR", label: "Júnior" },
  { value: "PLENO", label: "Pleno" },
  { value: "SENIOR", label: "Sênior" }
];