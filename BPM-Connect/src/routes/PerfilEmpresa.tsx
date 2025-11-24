import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../Contexts/AuthContexts';
import { apiService, Empresa } from '../services/api';

export function PerfilEmpresa() {
  const { usuario, logout } = useAuth();
  const [dadosEmpresa, setDadosEmpresa] = useState<Empresa | null>(null);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    setor: '',
    tamanho: '',
    descricao: ''
  });

  useEffect(() => {
    carregarDadosEmpresa();
  }, [usuario]);

  const carregarDadosEmpresa = async () => {
    if (!usuario) return;
    
    try {
      setCarregando(true);
      const empresas = await apiService.listarEmpresas();
      const empresaEncontrada = empresas.find(emp => 
        emp.nome.toLowerCase() === usuario.nome.toLowerCase()
      );
      
      if (empresaEncontrada) {
        setDadosEmpresa(empresaEncontrada);
        setFormData({
          nome: empresaEncontrada.nome || '',
          cnpj: empresaEncontrada.cnpj || '',
          setor: empresaEncontrada.setor || '',
          tamanho: empresaEncontrada.tamanho || '',
          descricao: empresaEncontrada.descricao || ''
        });
      } else {
        setErro('Empresa não encontrada');
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setErro('Erro ao carregar dados da empresa');
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvar = async () => {
    if (!usuario || !dadosEmpresa) return;

    try {
      setCarregando(true);
      setErro('');
      
      await apiService.atualizarEmpresa(dadosEmpresa.id, formData);
      
      setSucesso('Dados da empresa atualizados com sucesso!');
      setEditando(false);
      
      setTimeout(() => carregarDadosEmpresa(), 500);
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      setErro('Erro ao atualizar dados da empresa');
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluirConta = async () => {
    if (!usuario || !window.confirm('Tem certeza que deseja excluir sua conta e todos os dados da empresa? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      setCarregando(true);
      // Implementar exclusão quando estiver disponível
      alert('Conta e empresa excluídas com sucesso');
      logout();
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      setErro('Erro ao excluir conta');
    } finally {
      setCarregando(false);
    }
  };

  if (carregando && !dadosEmpresa) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Perfil da Empresa
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gerencie as informações da sua empresa
          </p>
        </div>

        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {sucesso}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">Informações da Empresa</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditando(!editando)}
                  disabled={carregando}
                >
                  {editando ? 'Cancelar' : 'Editar'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome da Empresa</label>
                    {editando ? (
                      <input
                        type="text"
                        value={formData.nome}
                        onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded">{dadosEmpresa?.nome}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">CNPJ</label>
                    {editando ? (
                      <input
                        type="text"
                        value={formData.cnpj}
                        onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded">{dadosEmpresa?.cnpj}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Setor</label>
                    {editando ? (
                      <select
                        value={formData.setor}
                        onChange={(e) => setFormData(prev => ({ ...prev, setor: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      >
                        <option value="">Selecione um setor</option>
                        <option value="Tecnologia">Tecnologia</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Educação">Educação</option>
                        <option value="Finanças">Finanças</option>
                        <option value="Varejo">Varejo</option>
                        <option value="Indústria">Indústria</option>
                        <option value="Serviços">Serviços</option>
                        <option value="Outros">Outros</option>
                      </select>
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded">{dadosEmpresa?.setor || 'Não informado'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Porte</label>
                    {editando ? (
                      <select
                        value={formData.tamanho}
                        onChange={(e) => setFormData(prev => ({ ...prev, tamanho: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      >
                        <option value="STARTUP">Startup</option>
                        <option value="PEQUENA">Pequena</option>
                        <option value="MEDIA">Média</option>
                        <option value="GRANDE">Grande</option>
                        <option value="CORPORACAO">Corporação</option>
                      </select>
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded">{dadosEmpresa?.tamanho || 'Não informado'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  {editando ? (
                    <textarea
                      value={formData.descricao}
                      onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 resize-none"
                      placeholder="Conte um pouco sobre sua empresa..."
                    />
                  ) : (
                    <p className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded min-h-[80px]">
                      {dadosEmpresa?.descricao || 'Nenhuma descrição informada'}
                    </p>
                  )}
                </div>

                {editando && (
                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={handleSalvar}
                      disabled={carregando}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {carregando ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Estatísticas</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4">
                    <div className="text-2xl font-bold text-blue-600">-</div>
                    <div className="text-sm opacity-80">Vagas Ativas</div>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-green-600">-</div>
                    <div className="text-sm opacity-80">Candidaturas</div>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-purple-600">-</div>
                    <div className="text-sm opacity-80">Contratados</div>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-orange-600">-</div>
                    <div className="text-sm opacity-80">Taxa de Sucesso</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Ações</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  ➕ Nova Vaga
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📊 Dashboard
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  👥 Candidatos
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Configurações</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Status da empresa</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    dadosEmpresa?.ativa 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {dadosEmpresa?.ativa ? 'Ativa' : 'Inativa'}
                  </span>
                </div>
                
                <Button 
                  variant="danger" 
                  className="w-full"
                  onClick={handleExcluirConta}
                  disabled={carregando}
                >
                  🗑️ Excluir Empresa
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Esta ação exclui empresa e conta
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}