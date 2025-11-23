import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { useAuth } from '../../Contexts/AuthContexts';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegistro: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToRegistro }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    
    // Validações básicas
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos');
      return;
    }

    // Validação de email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro('Por favor, insira um email válido');
      return;
    }

    setCarregando(true);

    try {
      const sucesso = await login(email, senha);
      if (sucesso) {
        console.log('Login realizado com sucesso!');
        onClose();
        setEmail('');
        setSenha('');

        // Recarrega a página para atualizar o estado global
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setErro('Email ou senha incorretos');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      setErro(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setSenha('');
    setErro('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative">
        <CardHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <h2 className="text-xl font-bold">Entrar na BPM Connect</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            disabled={carregando}
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                {erro}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                required
                disabled={carregando}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                required
                disabled={carregando}
                placeholder="Sua senha"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={carregando}
            >
              {carregando ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-center opacity-80">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={onSwitchToRegistro}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
                disabled={carregando}
              >
                Cadastre-se
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}