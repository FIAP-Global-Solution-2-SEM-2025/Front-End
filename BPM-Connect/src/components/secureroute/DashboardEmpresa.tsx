import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContexts';
import { Layout } from '../layout/Layout';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

export function DashboardEmpresa() {
  const { usuario } = useAuth();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard - {usuario?.nome}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gerencie suas vagas e candidatos
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm opacity-80">Vagas Ativas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">45</div>
              <div className="text-sm opacity-80">Candidaturas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm opacity-80">Em Entrevista</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm opacity-80">Contratados</div>
            </CardContent>
          </Card>
        </div>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ações Rápidas */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Ações Rápidas</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link to="/vagas?criar=true">
                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 h-12">
                      ➕ Nova Vaga
                    </Button>
                  </Link>
                  <Link to="/perfil/empresa">
                    <Button variant="secondary" className="w-full justify-start h-12">
                      👥 Gerenciar Candidatos
                    </Button>
                  </Link>
                  <Button variant="secondary" className="w-full justify-start h-12">
                    📊 Relatórios
                  </Button>
                  <Link to="/perfil/empresa">
                    <Button variant="secondary" className="w-full justify-start h-12">
                      ⚙️ Configurações
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Vagas Recentes */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Suas Vagas Recentes</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Analista de Processos Sênior</h3>
                      <p className="text-sm opacity-80">15 candidaturas • Publicada em 10/12/2024</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Ativa
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Consultor BPM Pleno</h3>
                      <p className="text-sm opacity-80">8 candidaturas • Publicada em 08/12/2024</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Ativa
                    </span>
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Candidaturas Recentes */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Candidaturas Recentes</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-semibold text-sm">João Silva</h3>
                    <p className="text-xs opacity-80">Analista de Processos Sênior</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Nova
                    </span>
                  </div>
                  <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-semibold text-sm">Maria Santos</h3>
                    <p className="text-xs opacity-80">Consultor BPM Pleno</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Em análise
                    </span>
                  </div>
                </div>
                <Button variant="secondary" className="w-full mt-3">
                  Ver Todas Candidaturas
                </Button>
              </CardContent>
            </Card>

            {/* Atividade Recente */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Atividade</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p>Nova candidatura recebida</p>
                      <p className="text-xs opacity-70">Há 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p>Vaga publicada com sucesso</p>
                      <p className="text-xs opacity-70">Há 1 dia</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p>Perfil da empresa atualizado</p>
                      <p className="text-xs opacity-70">Há 2 dias</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}