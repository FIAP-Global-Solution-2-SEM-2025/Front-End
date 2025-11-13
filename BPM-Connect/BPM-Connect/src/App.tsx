import { Layout } from './components/layout/Layout'
import { Vaga } from './types/rh'

function App() {
  const vagasExemplo: Vaga[] = [
    {
      id: '1',
      titulo: "Desenvolvedor Front-End React",
      empresa: "BPM Connect",
      localizacao: "Remoto",
      tipo: "CLT",
      nivel: "Pleno",
      salario: 8000,
      descricao: "Desenvolvimento de interfaces modernas com React e TypeScript",
      requisitos: ["React", "TypeScript", "Tailwind CSS"]
    },
    {
      id: '2',
      titulo: "UX Designer",
      empresa: "BPM Connect", 
      localizacao: "Híbrido - SP",
      tipo: "PJ",
      nivel: "Sênior",
      salario: 12000,
      descricao: "Criação de experiências de usuário excepcionais",
      requisitos: ["Figma", "Design System", "Pesquisa com usuários"]
    }
  ]

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Vagas em Destaque</h1>
        <div className="grid gap-4">
        </div>
      </div>
    </Layout>
  )
}

export default App