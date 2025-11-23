import { useEffect, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { VagaCard } from "./components/rh/VagaCard";
import { vagaService, VagaAPI } from "./services/vagaService";
import { Button } from "./components/ui/Button";
import { Vaga } from "./types/rh";
import { useAuth } from "./Contexts/AuthContexts";
import { CriarVagaModal } from "./components/rh/CriarVaga";

function App() {
  const { usuario } = useAuth();
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [modalCriarVagaAberto, setModalCriarVagaAberto] = useState(false);
  const [atualizar, setAtualizar] = useState(0);

  // Função para converter VagaAPI para Vaga (frontend)
  const converterVagaAPIparaFrontend = (vagaAPI: VagaAPI): Vaga => {
    return {
      id: vagaAPI.id.toString(),
      titulo: vagaAPI.titulo,
      empresa: vagaAPI.empresa,
      localizacao: vagaAPI.localizacao,
      tipo: vagaAPI.tipo,
      nivel: vagaAPI.nivel,
      salario: vagaAPI.salario,
      descricao: vagaAPI.descricao,
      requisitos: Array.isArray(vagaAPI.requisitos) ? vagaAPI.requisitos : 
                 typeof vagaAPI.requisitos === 'string' && vagaAPI.requisitos.trim() !== '' ? 
                 vagaAPI.requisitos.split(' ') : []
    };
  };

  const carregarVagas = async () => {
    try {
      setCarregando(true);
      setErro("");
      console.log("Carregando vagas...");
      
      let vagasAPI: VagaAPI[] = [];
      
      if (usuario?.tipo === "EMPRESA") {
        console.log("Carregando vagas da empresa:", usuario.id, usuario.nome);
        
        // Tenta buscar vagas específicas da empresa primeiro
        vagasAPI = await vagaService.listarVagasPorEmpresa(usuario.id);
        
        // Se não encontrou vagas, tenta buscar todas e filtrar
        if (vagasAPI.length === 0) {
          console.log("Nenhuma vaga encontrada pelo endpoint específico, tentando buscar todas...");
          try {
            const todasVagas = await vagaService.listarTodasVagas();
            vagasAPI = todasVagas.filter(vaga => {
              // Tenta encontrar por empresaId ou pelo nome da empresa
              const matchById = vaga.empresaId === usuario.id;
              const matchByName = vaga.empresa.toLowerCase() === usuario.nome.toLowerCase();
              return matchById || matchByName;
            });
            console.log(`Encontradas ${vagasAPI.length} vagas após filtro`);
          } catch (fallbackError) {
            console.error("Erro no fallback:", fallbackError);
          }
        }
        
        console.log(`Empresa ${usuario.nome} tem ${vagasAPI.length} vaga(s)`);
        
      } else {
        // Candidatos e não logados veem todas as vagas ativas
        console.log("Carregando vagas ativas para candidato");
        vagasAPI = await vagaService.listarVagasAtivas();
      }
      
      console.log("Vagas recebidas da API:", vagasAPI);
      
      // Converter para o tipo do frontend
      const vagasConvertidas = vagasAPI.map(converterVagaAPIparaFrontend);
      setVagas(vagasConvertidas);
      console.log("Vagas convertidas:", vagasConvertidas);
      
    } catch (error) {
      console.error("Erro ao carregar vagas:", error);
      setErro("Erro ao carregar vagas. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarVagas();
  }, [usuario, atualizar]);

  const handleCandidatar = async (vagaId: string) => {
    if (!usuario) {
      alert("Faça login para se candidatar a vagas");
      return;
    }
    
    try {
      console.log("Candidatando à vaga:", vagaId);
      alert("Candidatura enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao candidatar:", error);
      alert("Erro ao enviar candidatura.");
    }
  };

  const handleVerDetalhes = (vagaId: string) => {
    console.log("Ver detalhes da vaga:", vagaId);
  };

  const handleNovaVaga = () => {
    console.log("Abrindo modal de nova vaga");
    setModalCriarVagaAberto(true);
  };

  const handleVagaCriada = () => {
    console.log("Vaga criada, recarregando lista...");
    setModalCriarVagaAberto(false);
    
    // Forçar atualização da lista
    setAtualizar(prev => prev + 1);
    
    // Também recarrega as vagas diretamente após um delay
    setTimeout(() => {
      carregarVagas();
    }, 1000);
  };

  const handleRecarregar = () => {
    setAtualizar(prev => prev + 1);
    carregarVagas();
  };

  const tituloPagina = usuario?.tipo === "EMPRESA" 
    ? "Minhas Vagas" 
    : "Vagas em Destaque";

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {tituloPagina}
            </h1>
            {usuario && (
              <p className="text-sm opacity-70 mt-1">
                Logado como: <span className="font-semibold">{usuario.nome}</span> 
                ({usuario.tipo === "EMPRESA" ? "Empresa" : "Candidato"})
              </p>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              onClick={handleRecarregar}
              disabled={carregando}
            >
              {carregando ? "Carregando..." : "Recarregar"}
            </Button>
            
            {usuario?.tipo === "EMPRESA" && (
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600"
                onClick={handleNovaVaga}
              >
                + Nova Vaga
              </Button>
            )}
          </div>
        </div>

        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{erro}</span>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleRecarregar}
            >
              Tentar Novamente
            </Button>
          </div>
        )}

        {carregando ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg">Carregando vagas...</span>
          </div>
        ) : vagas.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl opacity-80 mb-4">
              {usuario?.tipo === "EMPRESA" 
                ? "Nenhuma vaga criada ainda." 
                : "Nenhuma vaga disponível no momento."}
            </p>
            {usuario?.tipo === "EMPRESA" ? (
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600"
                onClick={handleNovaVaga}
              >
                Criar Primeira Vaga
              </Button>
            ) : (
              <Button 
                variant="secondary"
                onClick={handleRecarregar}
              >
                Recarregar
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm opacity-70 mb-2">
              Mostrando {vagas.length} vaga{vagas.length !== 1 ? 's' : ''}
              {usuario?.tipo === "EMPRESA" && (
                <button 
                  onClick={handleRecarregar}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Atualizar
                </button>
              )}
            </div>
            {vagas.map((vaga) => (
              <VagaCard 
                key={vaga.id}
                vaga={vaga}
                onCandidatar={handleCandidatar}
                onVerDetalhes={handleVerDetalhes}
                modoEmpresa={usuario?.tipo === "EMPRESA"}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de Criar Vaga */}
      <CriarVagaModal
        isOpen={modalCriarVagaAberto}
        onClose={() => setModalCriarVagaAberto(false)}
        onVagaCriada={handleVagaCriada}
      />
    </Layout>
  );
}

export default App;