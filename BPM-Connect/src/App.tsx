// src/App.tsx
import { Layout } from "./components/layout/Layout";
import { VagaCard } from "./components/rh/VagaCard";
import { Vaga } from "./types/rh";

function App() {
  const vagasExemplo: Vaga[] = [
    {
      id: "1",
      titulo: "Desenvolvedor Front-End React",
      empresa: "BPM Connect",
      localizacao: "Remoto",
      tipo: "CLT",
      nivel: "Pleno",
      salario: 8000,
      descricao: "Desenvolvimento de interfaces modernas com React e TypeScript",
      requisitos: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "2",
      titulo: "UX Designer",
      empresa: "BPM Connect",
      localizacao: "Híbrido - SP",
      tipo: "PJ",
      nivel: "Sênior",
      salario: 12000,
      descricao: "Criação de experiências de usuário excepcionais",
      requisitos: ["Figma", "Design System", "Pesquisa com usuários"],
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Vagas em Destaque
        </h1>

        <div className="space-y-4">
          {vagasExemplo.map((vaga) => (
            <VagaCard 
              key={vaga.id}
              vaga={vaga}
              onCandidatar={(id) => console.log('Candidatar:', id)}
              onVerDetalhes={(id) => console.log('Detalhes:', id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default App;