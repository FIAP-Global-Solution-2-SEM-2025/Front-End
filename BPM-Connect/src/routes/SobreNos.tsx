import { Layout } from '../components/layout/Layout';
import { Card, CardContent } from '../components/ui/Card';

export function SobreNos() {
  const alunos = [
    {
      nome: "Bruno Andrade Zanateli",
      rm: "RM563736",
      turma: "1tdspo",
      github: "https://github.com/Bruno-A-Z",
      linkedin: "https://www.linkedin.com/in/bruno-andrade-zanateli-501534353?utm_source=share_via&utm_content=profile&utm_medium=member_android"
    },
    {
      nome: "Matheus Enrico Souza", 
      rm: "RM562532",
      turma: "1tdspo",
      github: "https://github.com/matheusssss07",
      linkedin: "https://www.linkedin.com/in/matheus-enrico-1a02b131b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    {
      nome: "Pedro Pereira Biasolli",
      rm: "RM562521",
      turma: "3TDS-2024", 
      github: "https://github.com/PedroBiasolli",
      linkedin: "https://www.linkedin.com/in/pedro-pereira-biasolli-da-fonseca-8b7558381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sobre Nós
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Conheça a equipe de desenvolvimento por trás do BPM Connect
          </p>
        </div>

        {/* Cards dos Alunos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alunos.map((aluno, index) => (
            <Card key={index} className="text-center card-consistent">
              <CardContent className="p-6">
                {/* Foto com iniciais */}
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {aluno.nome.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>

                {/* Informações */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {aluno.nome}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>RM:</strong> {aluno.rm}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Turma:</strong> {aluno.turma}
                  </p>
                </div>

                {/* Links */}
                <div className="flex justify-center space-x-4">
                  <a 
                    href={aluno.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    title="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href={aluno.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    title="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sobre o Projeto */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Sobre o Projeto
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  O <strong>BPM Connect</strong> é uma plataforma inovadora desenvolvida para conectar 
                  profissionais especializados em Business Process Management (BPM) com empresas que 
                  buscam otimizar seus processos organizacionais.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mt-4">
                  Desenvolvido como projeto acadêmico, nossa missão é facilitar o encontro entre 
                  talentos qualificados e oportunidades no mercado de BPM, promovendo eficiência 
                  e excelência operacional.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Nosso Contato
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Entre em Contato
                  </h3>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-400">
                      📧 <strong>Email:</strong> contato@bpmconnect.com
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      📍 <strong>Localização:</strong> São Paulo, SP
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      🏫 <strong>Instituição de Ensino:</strong> FIAP
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Horário de Atendimento
                  </h3>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-400">
                      🕒 <strong>Segunda a Sexta:</strong> 9h às 18h
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      🕒 <strong>Sábado:</strong> 9h às 12h
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      📞 <strong>Telefone:</strong> (11) 94397-2526
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}