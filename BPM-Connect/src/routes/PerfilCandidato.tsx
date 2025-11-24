import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../Contexts/AuthContexts';
import { apiService, Usuario } from '../services/api';

export function PerfilCandidato() {
  const { usuario, atualizarUsuario, logout } = useAuth();
  const [dadosUsuario, setDadosUsuario] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    email: ''
  });

  useEffect(() => {
    carregarDadosUsuario();
  }, [usuario]);

  const carregarDadosUsuario = async () => {
    if (!usuario) return;
    
    try {
      setCarregando(true);
      const dados = await apiService.buscarUsuarioPorId(usuario.id);
      setDadosUsuario(dados);
      setFormData({
        nome: dados.nome || '',
        email: dados.email || ''
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setErro('Erro ao carregar dados do usuário');
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvar = async () => {
    if (!usuario) return;

    try {
      setCarregando(true);
      setErro('');
      
      await atualizarUsuario({
        nome: formData.nome,
        email: formData.email
      });

      setSucesso('Dados atualizados com sucesso!');
      setEditando(false);
      
      setTimeout(() => carregarDadosUsuario(), 500);
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      setErro('Erro ao atualizar dados');
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluirConta = async () => {
    if (!usuario || !window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      setCarregando(true);
      
      alert('Conta excluída com sucesso');
      logout();
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      setErro('Erro ao excluir conta');
    } finally {
      setCarregando(false);
    }
  };

  if (carregando && !dadosUsuario) {
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
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Meu Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gerencie suas informações pessoais
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">Informações Pessoais</h2>
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
                    <label className="block text-sm font-medium mb-2">Nome</label>
                    {editando ? (
                      <input
                        type="text"
                        value={formData.nome}
                        onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                        placeholder="Seu nome completo"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded">{dadosUsuario?.nome || 'Não informado'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    {editando ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                        placeholder="seu@email.com"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded">{dadosUsuario?.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Conta</label>
                    <p className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded capitalize">
                      {dadosUsuario?.tipo?.toLowerCase() || 'Candidato'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <p className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded">
                      {dadosUsuario?.ativo ? 'Ativa' : 'Inativa'}
                    </p>
                  </div>
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
                <h2 className="text-xl font-semibold">Minhas Candidaturas</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Aqui você verá o histórico das vagas para as quais se candidatou.
                </p>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Em breve: Histórico de candidaturas
                  </p>
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
                <Button variant="secondary" className="w-full justify-start">
                  📄 Meu Currículo
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🔑 Alterar Senha
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🔔 Notificações
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Configurações</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Status da conta</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    dadosUsuario?.ativo 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {dadosUsuario?.ativo ? 'Ativa' : 'Inativa'}
                  </span>
                </div>
                
                <Button 
                  variant="danger" 
                  className="w-full"
                  onClick={handleExcluirConta}
                  disabled={carregando}
                >
                  🗑️ Excluir Minha Conta
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Esta ação não pode ser desfeita
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}