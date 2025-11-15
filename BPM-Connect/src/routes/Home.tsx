// src/routes/Home.tsx
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <Layout>
      {/* Hero Section - Mobile First */}
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sua carreira em BPM 
            <span className="block mt-2">começa aqui</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-80 max-w-3xl mx-auto leading-relaxed">
            Conectamos os melhores talentos de Business Process Management 
            às empresas que mais inovam no mercado
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/vagas" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
                Encontrar Vagas
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
              Sou Empresa
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
            <StatCard number="500+" label="Vagas Ativas" />
            <StatCard number="2.000+" label="Candidatos" />
            <StatCard number="150+" label="Empresas" />
            <StatCard number="95%" label="Taxa de Sucesso" />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
            Como funciona
          </h2>
          <p className="text-lg sm:text-xl text-center opacity-80 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Um processo simples e eficiente para conectar talentos e oportunidades
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <StepCard 
              number="1"
              title="Crie seu perfil"
              description="Cadastre-se e destaque suas habilidades em BPM"
            />
            <StepCard 
              number="2" 
              title="Encontre vagas"
              description="Busque oportunidades que combinam com seu perfil"
            />
            <StepCard 
              number="3"
              title="Conecte-se"
              description="Candidate-se e converse diretamente com recrutadores"
            />
          </div>
        </div>
      </section>

      {/* Featured Jobs Preview */}
      <section className="py-12 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Vagas em Destaque
              </h2>
              <p className="text-lg sm:text-xl opacity-80">
                Oportunidades exclusivas em empresas líderes
              </p>
            </div>
            <Link to="/vagas" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto hidden sm:block">
                Ver Todas as Vagas
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <JobPreviewCard
              title="Analista de Processos Sênior"
              company="TechCorp Solutions"
              location="São Paulo - SP"
              type="CLT"
              salary={12000}
            />
            <JobPreviewCard
              title="Consultor BPM Jr"
              company="ProcessFlow Consulting"
              location="Remoto"
              type="PJ" 
              salary={5000}
            />
          </div>

          <div className="text-center sm:hidden">
            <Link to="/vagas" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">
                Ver Todas as Vagas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Pronto para o próximo passo?
          </h2>
          <p className="text-lg sm:text-xl opacity-80 mb-6 sm:mb-8 leading-relaxed">
            Junte-se a milhares de profissionais de BPM que já encontraram 
            oportunidades incríveis através da nossa plataforma
          </p>
          <Link to="/vagas" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg">
              Começar Agora
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

// Componentes auxiliares atualizados para mobile
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-4 sm:p-6">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">
        {number}
      </div>
      <div className="text-sm sm:text-lg opacity-80 leading-tight">{label}</div>
    </div>
  );
}

function StepCard({ number, title, description }: { 
  number: string; 
  title: string; 
  description: string; 
}) {
  return (
    <Card hover={true} className="text-center p-6 sm:p-8 card-consistent">
      <CardContent>
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold mb-3 sm:mb-4 mx-auto">
          {number}
        </div>
        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h3>
        <p className="opacity-80 text-sm sm:text-base leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function JobPreviewCard({ title, company, location, type, salary }: {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: number;
}) {
  return (
    <Card hover={true} className="p-4 sm:p-6 card-consistent">
      <CardContent>
        <h3 className="text-lg sm:text-xl font-bold mb-2 hover:text-blue-600 cursor-pointer line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center mb-3 opacity-80 text-sm sm:text-base">
          <span className="font-medium">{company}</span>
          <span className="mx-2">•</span>
          <span>📍 {location}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="tag-blue text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
            {type}
          </span>
          <div className="text-right">
            <p className="font-bold text-green-600 text-sm sm:text-base">
              R$ {salary.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs sm:text-sm opacity-70">mensal</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}