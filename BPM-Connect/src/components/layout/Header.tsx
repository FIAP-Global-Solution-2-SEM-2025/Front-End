import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContexts';
import { Button } from '../ui/Button';
import { LoginModal } from '../auth/LoginModal';
import { RegistroModal } from '../auth/RegistroModal';
import { useTheme } from '../theme/ThemeProvider';

export function Header() {
  const { usuario, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [loginModalAberto, setLoginModalAberto] = useState(false);
  const [registroModalAberto, setRegistroModalAberto] = useState(false);
  const [menuUsuarioAberto, setMenuUsuarioAberto] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const handleAbrirLogin = () => {
    setLoginModalAberto(true);
    setRegistroModalAberto(false);
  };

  const handleAbrirRegistro = () => {
    setRegistroModalAberto(true);
    setLoginModalAberto(false);
  };

  const handleSwitchParaLogin = () => {
    setRegistroModalAberto(false);
    setLoginModalAberto(true);
  };

  const handleSwitchParaRegistro = () => {
    setLoginModalAberto(false);
    setRegistroModalAberto(true);
  };

  const handleLogout = () => {
    logout();
    setMenuUsuarioAberto(false);
    setMenuMobileAberto(false);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900/30 border-gray-700/30' 
          : 'bg-white/50 border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo e Menu Mobile */}
            <div className="flex items-center space-x-4">
              {/* Botão Menu Mobile */}
              <button 
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-800/40 text-gray-300' 
                    : 'hover:bg-gray-100/60 text-gray-700'
                }`}
                onClick={() => setMenuMobileAberto(!menuMobileAberto)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/BPM-LOGO.png" 
                    alt="BPM Connect" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BPM Connect
                </span>
              </Link>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActiveRoute('/') 
                    ? 'bg-blue-600/80 text-white font-semibold backdrop-blur-sm' 
                    : `${theme === 'dark' 
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/30' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100/50'}`
                }`}
              >
                Início
              </Link>
              <Link 
                to="/vagas" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActiveRoute('/vagas') 
                    ? 'bg-blue-600/80 text-white font-semibold backdrop-blur-sm' 
                    : `${theme === 'dark' 
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/30' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100/50'}`
                }`}
              >
                Vagas
              </Link>
              <Link 
                to="/candidatos" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActiveRoute('/candidatos') 
                    ? 'bg-blue-600/80 text-white font-semibold backdrop-blur-sm' 
                    : `${theme === 'dark' 
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/30' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100/50'}`
                }`}
              >
                Candidatos
              </Link>
              <Link 
                to="/processos" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActiveRoute('/processos') 
                    ? 'bg-blue-600/80 text-white font-semibold backdrop-blur-sm' 
                    : `${theme === 'dark' 
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/30' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100/50'}`
                }`}
              >
                Processos
              </Link>
            </nav>

            {/* Área do Usuário e Tema */}
            <div className="flex items-center space-x-3">
              {/* Botão de Tema */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-800/40 text-yellow-400' 
                    : 'hover:bg-gray-100/60 text-gray-700'
                }`}
                aria-label="Alternar tema"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {usuario ? (
                /* Usuário Logado */
                <div className="relative">
                  <button 
                    onClick={() => setMenuUsuarioAberto(!menuUsuarioAberto)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-800/40 text-gray-300' 
                        : 'hover:bg-gray-100/60 text-gray-700'
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {usuario.nome.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block">
                      {usuario.nome}
                    </span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${menuUsuarioAberto ? 'rotate-180' : ''} ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {menuUsuarioAberto && (
                    <div className={`absolute right-0 mt-2 w-48 backdrop-blur-md rounded-lg shadow-lg py-2 z-50 border ${
                      theme === 'dark' 
                        ? 'bg-gray-900/80 border-gray-700/40' 
                        : 'bg-white/80 border-gray-200/50'
                    }`}>
                      <Link 
                        to="/dashboard" 
                        className={`flex items-center px-4 py-2 transition-colors ${
                          theme === 'dark' 
                            ? 'hover:bg-gray-800/40 text-gray-300' 
                            : 'hover:bg-gray-100/60 text-gray-700'
                        }`}
                        onClick={() => setMenuUsuarioAberto(false)}
                      >
                        <span className="mr-2">📊</span>
                        Dashboard
                      </Link>
                      
                      <Link 
                        to={usuario.tipo === 'EMPRESA' ? '/perfil/empresa' : '/perfil/candidato'} 
                        className={`flex items-center px-4 py-2 transition-colors ${
                          theme === 'dark' 
                            ? 'hover:bg-gray-800/40 text-gray-300' 
                            : 'hover:bg-gray-100/60 text-gray-700'
                        }`}
                        onClick={() => setMenuUsuarioAberto(false)}
                      >
                        <span className="mr-2">👤</span>
                        Meu Perfil
                      </Link>

                      <Link 
                        to="/vagas" 
                        className={`flex items-center px-4 py-2 transition-colors ${
                          theme === 'dark' 
                            ? 'hover:bg-gray-800/40 text-gray-300' 
                            : 'hover:bg-gray-100/60 text-gray-700'
                        }`}
                        onClick={() => setMenuUsuarioAberto(false)}
                      >
                        <span className="mr-2">💼</span>
                        {usuario.tipo === 'EMPRESA' ? 'Minhas Vagas' : 'Buscar Vagas'}
                      </Link>

                      <div className={`border-t my-1 ${
                        theme === 'dark' ? 'border-gray-700/40' : 'border-gray-200/50'
                      }`}></div>
                      
                      <button 
                        onClick={handleLogout}
                        className={`flex items-center w-full text-left px-4 py-2 transition-colors text-red-500 ${
                          theme === 'dark' 
                            ? 'hover:bg-gray-800/40' 
                            : 'hover:bg-gray-100/60'
                        }`}
                      >
                        <span className="mr-2">🚪</span>
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Usuário Não Logado */
                <div className="flex items-center space-x-3">
                  <Button
                    variant="secondary"
                    onClick={handleAbrirLogin}
                    className={`hidden sm:block backdrop-blur-sm ${
                      theme === 'dark' 
                        ? 'bg-gray-800/40 border-gray-700/40 text-gray-300 hover:bg-gray-700/50' 
                        : 'bg-white/60 border-gray-200/50 text-gray-700 hover:bg-gray-100/70'
                    }`}
                  >
                    Entrar
                  </Button>
                  <Button
                    onClick={handleAbrirRegistro}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 backdrop-blur-sm text-white border-0"
                  >
                    Cadastrar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {menuMobileAberto && (
          <div className={`md:hidden backdrop-blur-md border-b ${
            theme === 'dark' 
              ? 'bg-gray-900/80 border-gray-700/40' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm transition-colors ${
                  isActiveRoute('/') 
                    ? 'bg-blue-600/80 text-white' 
                    : `${theme === 'dark' 
                        ? 'text-gray-300 hover:bg-gray-800/40' 
                        : 'text-gray-700 hover:bg-gray-100/60'}`
                }`}
                onClick={() => setMenuMobileAberto(false)}
              >
                Início
              </Link>
              <Link 
                to="/vagas" 
                className={`block px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm transition-colors ${
                  isActiveRoute('/vagas') 
                    ? 'bg-blue-600/80 text-white' 
                    : `${theme === 'dark' 
                        ? 'text-gray-300 hover:bg-gray-800/40' 
                        : 'text-gray-700 hover:bg-gray-100/60'}`
                }`}
                onClick={() => setMenuMobileAberto(false)}
              >
                Vagas
              </Link>
              <Link 
                to="/candidatos" 
                className={`block px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm transition-colors ${
                  isActiveRoute('/candidatos') 
                    ? 'bg-blue-600/80 text-white' 
                    : `${theme === 'dark' 
                        ? 'text-gray-300 hover:bg-gray-800/40' 
                        : 'text-gray-700 hover:bg-gray-100/60'}`
                }`}
                onClick={() => setMenuMobileAberto(false)}
              >
                Candidatos
              </Link>
              <Link 
                to="/processos" 
                className={`block px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm transition-colors ${
                  isActiveRoute('/processos') 
                    ? 'bg-blue-600/80 text-white' 
                    : `${theme === 'dark' 
                        ? 'text-gray-300 hover:bg-gray-800/40' 
                        : 'text-gray-700 hover:bg-gray-100/60'}`
                }`}
                onClick={() => setMenuMobileAberto(false)}
              >
                Processos
              </Link>

              {/* Botão de Tema no Mobile */}
              <button
                onClick={toggleTheme}
                className={`flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:bg-gray-800/40' 
                    : 'text-gray-700 hover:bg-gray-100/60'
                }`}
              >
                <span className="mr-2">
                  {theme === 'dark' ? '☀️' : '🌙'}
                </span>
                {theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
              </button>

              {/* Seções para usuário logado no mobile */}
              {usuario && (
                <>
                  <div className={`border-t mt-2 pt-2 ${
                    theme === 'dark' ? 'border-gray-700/40' : 'border-gray-200/50'
                  }`}>
                    <Link 
                      to="/dashboard" 
                      className={`block px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm transition-colors ${
                        theme === 'dark' 
                          ? 'text-gray-300 hover:bg-gray-800/40' 
                          : 'text-gray-700 hover:bg-gray-100/60'
                      }`}
                      onClick={() => setMenuMobileAberto(false)}
                    >
                      📊 Dashboard
                    </Link>
                    <Link 
                      to={usuario.tipo === 'EMPRESA' ? '/perfil/empresa' : '/perfil/candidato'} 
                      className={`block px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm transition-colors ${
                        theme === 'dark' 
                          ? 'text-gray-300 hover:bg-gray-800/40' 
                          : 'text-gray-700 hover:bg-gray-100/60'
                      }`}
                      onClick={() => setMenuMobileAberto(false)}
                    >
                      👤 Meu Perfil
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm transition-colors text-red-500 ${
                        theme === 'dark' 
                          ? 'hover:bg-gray-800/40' 
                          : 'hover:bg-gray-100/60'
                      }`}
                    >
                      🚪 Sair
                    </button>
                  </div>
                </>
              )}

              {/* Seções para usuário não logado no mobile */}
              {!usuario && (
                <div className={`border-t mt-2 pt-2 space-y-1 ${
                  theme === 'dark' ? 'border-gray-700/40' : 'border-gray-200/50'
                }`}>
                  <button 
                    onClick={handleAbrirLogin}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm transition-colors ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:bg-gray-800/40' 
                        : 'text-gray-700 hover:bg-gray-100/60'
                    }`}
                  >
                    🔑 Entrar
                  </button>
                  <button 
                    onClick={handleAbrirRegistro}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white backdrop-blur-sm border-0"
                  >
                    📝 Cadastrar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Modais de Autenticação */}
      <LoginModal
        isOpen={loginModalAberto}
        onClose={() => setLoginModalAberto(false)}
        onSwitchToRegistro={handleSwitchParaRegistro}
      />

      <RegistroModal
        isOpen={registroModalAberto}
        onClose={() => setRegistroModalAberto(false)}
        onSwitchToLogin={handleSwitchParaLogin}
      />

      {/* Overlay para fechar menus ao clicar fora */}
      {(menuUsuarioAberto || menuMobileAberto) && (
        <div 
          className="fixed inset-0 z-40" // z-40 para ficar abaixo do header (z-50)
          onClick={() => {
            setMenuUsuarioAberto(false);
            setMenuMobileAberto(false);
          }}
        />
      )}
    </>
  );
}