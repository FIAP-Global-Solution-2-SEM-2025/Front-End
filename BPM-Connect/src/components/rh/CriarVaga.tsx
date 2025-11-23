// components/rh/CriarVagaModal.tsx - ATUALIZADO
import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { vagaService, CriarVagaData } from '../../services/vagaService';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { TIPOS_VAGA, NIVEIS_VAGA, TipoVagaForm, NivelVagaForm } from '../../types/rh';
import { useAuth } from '../../Contexts/AuthContexts';
import { apiService } from '../../services/api';

interface CriarVagaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVagaCriada: () => void;
}

interface EmpresaData {
  id: number;
  nome: string;
  cnpj: string;
}

export function CriarVagaModal({ isOpen, onClose, onVagaCriada }: CriarVagaModalProps) {
  const { usuario } = useAuth();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [novoRequisito, setNovoRequisito] = useState('');
  const [empresaData, setEmpresaData] = useState<EmpresaData | null>(null);
  
  const [dadosVaga, setDadosVaga] = useState({
    titulo: '',
    descricao: '',
    empresa: '',
    localizacao: '',
    tipo: 'CLT' as TipoVagaForm,
    nivel: 'JUNIOR' as NivelVagaForm,
    salario: undefined as number | undefined,
    requisitos: [] as string[]
  });

  useEffect(() => {
    if (isOpen && usuario) {
      buscarEmpresaDoUsuario();
    }
  }, [isOpen, usuario]);

  // BUSCAR EMPRESA PELO USUÁRIO LOGADO
  const buscarEmpresaDoUsuario = async () => {
    try {
      console.log('Buscando empresa do usuario:', usuario?.nome);
      setCarregando(true);
      
      // Buscar todas as empresas e filtrar pelo nome do usuário
      const empresas = await apiService.listarEmpresas();
      console.log('Empresas disponiveis:', empresas);
      
      // Encontrar empresa com nome igual ao usuário logado
      const empresaEncontrada = empresas.find(emp => 
        emp.nome.toLowerCase() === usuario?.nome.toLowerCase()
      );
      
      if (empresaEncontrada) {
        setEmpresaData({
          id: empresaEncontrada.id,
          nome: empresaEncontrada.nome,
          cnpj: empresaEncontrada.cnpj
        });
        
        setDadosVaga(prev => ({
          ...prev,
          empresa: empresaEncontrada.nome
        }));
        
        console.log('Empresa encontrada:', empresaEncontrada);
      } else {
        setErro('Empresa nao encontrada. Verifique se criou uma conta empresa com este nome.');
        console.warn('Empresa nao encontrada para usuario:', usuario?.nome);
      }
    } catch (error) {
      console.error('Erro ao buscar empresa:', error);
      setErro('Erro ao carregar dados da empresa.');
    } finally {
      setCarregando(false);
    }
  };

  // SOLUÇÃO ALTERNATIVA: Buscar empresa por CNPJ se disponível
  const buscarEmpresaPorCnpj = async (cnpj: string) => {
    try {
      console.log('Buscando empresa por CNPJ:', cnpj);
      const empresa = await apiService.buscarEmpresaPorCnpj(cnpj);
      
      setEmpresaData({
        id: empresa.id,
        nome: empresa.nome,
        cnpj: empresa.cnpj
      });
      
      setDadosVaga(prev => ({
        ...prev,
        empresa: empresa.nome
      }));
      
      console.log('Empresa encontrada por CNPJ:', empresa);
    } catch (error) {
      console.error('Erro ao buscar empresa por CNPJ:', error);
      throw error;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDadosVaga(prev => ({
      ...prev,
      [name]: value
    }));
    if (erro) setErro('');
  };

  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setDadosVaga(prev => ({
      ...prev,
      salario: value
    }));
  };

  const adicionarRequisito = () => {
    if (novoRequisito.trim() && !dadosVaga.requisitos.includes(novoRequisito.trim())) {
      setDadosVaga(prev => ({
        ...prev,
        requisitos: [...prev.requisitos, novoRequisito.trim()]
      }));
      setNovoRequisito('');
    }
  };

  const removerRequisito = (requisito: string) => {
    setDadosVaga(prev => ({
      ...prev,
      requisitos: prev.requisitos.filter(r => r !== requisito)
    }));
  };

  const handleKeyPressRequisito = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      adicionarRequisito();
    }
  };

  const validarFormulario = (): boolean => {
    if (!dadosVaga.titulo.trim()) {
      setErro('O titulo da vaga e obrigatorio');
      return false;
    }
    if (!dadosVaga.descricao.trim()) {
      setErro('A descricao da vaga e obrigatoria');
      return false;
    }
    if (!empresaData) {
      setErro('Dados da empresa nao carregados');
      return false;
    }
    if (!dadosVaga.localizacao.trim()) {
      setErro('A localizacao e obrigatoria');
      return false;
    }
    if (dadosVaga.salario && dadosVaga.salario < 0) {
      setErro('O salario nao pode ser negativo');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    setCarregando(true);
    setErro('');

    try {
      const vagaData: CriarVagaData = {
        titulo: dadosVaga.titulo,
        descricao: dadosVaga.descricao,
        empresa: dadosVaga.empresa,
        localizacao: dadosVaga.localizacao,
        tipo: dadosVaga.tipo,
        nivel: dadosVaga.nivel,
        salario: dadosVaga.salario,
        requisitos: dadosVaga.requisitos,
        empresaId: empresaData!.id
      };

      console.log('Criando vaga com dados:', {
        empresaId: empresaData!.id,
        empresa: empresaData!.nome
      });
      
      await vagaService.criarVaga(vagaData);
      
      console.log('Vaga criada com sucesso!');
      onVagaCriada();
      handleFechar();
      
    } catch (error: any) {
      console.error('Erro no handleSubmit:', error);
      
      let mensagemErro = 'Erro ao criar vaga. ';
      
      if (error.message.includes('500')) {
        mensagemErro += 'O servidor esta com problemas. Tente novamente em alguns instantes.';
      } else if (error.message.includes('400')) {
        mensagemErro += 'Verifique se todos os campos estao preenchidos corretamente.';
      } else if (error.message.includes('Network Error')) {
        mensagemErro += 'Problema de conexao. Verifique sua internet.';
      } else {
        mensagemErro += error.message || 'Tente novamente.';
      }
      
      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };

  const handleFechar = () => {
    setDadosVaga({
      titulo: '',
      descricao: '',
      empresa: '',
      localizacao: '',
      tipo: 'CLT',
      nivel: 'JUNIOR',
      salario: undefined,
      requisitos: []
    });
    setEmpresaData(null);
    setNovoRequisito('');
    setErro('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between p-6 pb-4 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-xl font-bold">Criar Nova Vaga</h2>
          <button
            onClick={handleFechar}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            disabled={carregando}
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {erro && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                {erro}
              </div>
            )}

            {/* Informações da Empresa */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                Informações da Empresa
              </h3>
              {empresaData ? (
                <div className="text-sm">
                  <p><strong>Nome:</strong> {empresaData.nome}</p>
                  <p><strong>ID:</strong> {empresaData.id}</p>
                  <p><strong>CNPJ:</strong> {empresaData.cnpj}</p>
                </div>
              ) : (
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {carregando ? 'Carregando dados da empresa...' : 'Empresa não configurada'}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="titulo" className="block text-sm font-medium mb-2">
                Titulo da Vaga *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={dadosVaga.titulo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                required
                disabled={carregando}
                placeholder="Ex: Desenvolvedor Front-End React"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="empresa" className="block text-sm font-medium mb-2">
                  Empresa *
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  value={dadosVaga.empresa}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  required
                  disabled={carregando || !empresaData}
                  placeholder="Nome da empresa"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="localizacao" className="block text-sm font-medium mb-2">
                  Localizacao *
                </label>
                <input
                  type="text"
                  id="localizacao"
                  name="localizacao"
                  value={dadosVaga.localizacao}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  required
                  disabled={carregando}
                  placeholder="Ex: Remoto, Sao Paulo - SP"
                />
              </div>
            </div>

            {/* Resto do formulário permanece igual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium mb-2">
                  Tipo de Contratacao *
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={dadosVaga.tipo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  required
                  disabled={carregando}
                >
                  {TIPOS_VAGA.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="nivel" className="block text-sm font-medium mb-2">
                  Nivel *
                </label>
                <select
                  id="nivel"
                  name="nivel"
                  value={dadosVaga.nivel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  required
                  disabled={carregando}
                >
                  {NIVEIS_VAGA.map((nivel) => (
                    <option key={nivel.value} value={nivel.value}>
                      {nivel.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="salario" className="block text-sm font-medium mb-2">
                Salario (opcional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                <input
                  type="number"
                  id="salario"
                  name="salario"
                  value={dadosVaga.salario || ''}
                  onChange={handleSalarioChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={carregando}
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium mb-2">
                Descricao da Vaga *
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={dadosVaga.descricao}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
                required
                disabled={carregando}
                placeholder="Descreva as responsabilidades, beneficios e detalhes da vaga..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Requisitos e Habilidades
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={novoRequisito}
                  onChange={(e) => setNovoRequisito(e.target.value)}
                  onKeyPress={handleKeyPressRequisito}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={carregando}
                  placeholder="Ex: React, TypeScript, Ingles..."
                />
                <Button
                  type="button"
                  onClick={adicionarRequisito}
                  disabled={!novoRequisito.trim() || carregando}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {dadosVaga.requisitos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {dadosVaga.requisitos.map((requisito, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{requisito}</span>
                      <button
                        type="button"
                        onClick={() => removerRequisito(requisito)}
                        disabled={carregando}
                        className="hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleFechar}
                disabled={carregando}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={carregando || !empresaData}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {carregando ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {empresaData ? 'Criando...' : 'Carregando empresa...'}
                  </div>
                ) : (
                  'Criar Vaga'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}