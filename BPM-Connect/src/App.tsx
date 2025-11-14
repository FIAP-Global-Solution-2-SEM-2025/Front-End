import { Layout } from "./components/layout/Layout";
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
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Vagas em Destaque</h1>

        <div className="grid gap-6">
          {vagasExemplo.map((vaga) => (
            <div
              key={vaga.id}
              className="p-6 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold">{vaga.titulo}</h2>
              <p className="text-gray-700 dark:text-gray-300">{vaga.empresa}</p>
              <p className="mt-2">{vaga.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default App;
