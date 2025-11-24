import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContexts';
import { Layout } from '../layout/Layout';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

export function DashboardCandidato() {
  const { usuario } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bem-vindo, {usuario?.nome}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Encontre as melhores oportunidades em BPM
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm opacity-80">Candidaturas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm opacity-80">Em Análise</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">1</div>
              <div className="text-sm opacity-80">Entrevistas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">85%</div>
              <div className="text-sm opacity-80">Perfil Completo</div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Ações Rápidas</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/vagas">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  🔍 Buscar Vagas
                </Button>
              </Link>
              <Link to="/perfil/candidato">
                <Button variant="secondary" className="w-full justify-start">
                  👤 Completar Perfil
                </Button>
              </Link>
              <Button variant="secondary" className="w-full justify-start">
                📄 Atualizar Currículo
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                🔔 Preferências
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Vagas Recomendadas</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold">Analista de Processos Jr</h3>
                  <p className="text-sm opacity-80">TechCorp • São Paulo - SP</p>
                </div>
                <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold">Consultor BPM</h3>
                  <p className="text-sm opacity-80">ProcessFlow • Remoto</p>
                </div>
              </div>
              <Link to="/vagas" className="block mt-4">
                <Button variant="secondary" className="w-full">
                  Ver Todas as Vagas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Últimas Candidaturas */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Últimas Candidaturas</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold">Especialista em BPM</h3>
                  <p className="text-sm opacity-80">Empresa XYZ • Candidatou em 15/12/2024</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Em análise
                </span>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold">Analista de Melhoria Contínua</h3>
                  <p className="text-sm opacity-80">Consultoria ABC • Candidatou em 10/12/2024</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Aprovado
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}