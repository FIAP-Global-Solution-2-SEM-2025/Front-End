// src/components/layout/Header.tsx (ATUALIZADO - SEM ÍCONES)
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, User, LogOut, Building } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { LoginModal } from "../auth/LoginModal";
import { RegistroModal } from "../auth/RegistroModal";
import { useAuth } from "../../Contexts/AuthContexts";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { usuario, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registroModalOpen, setRegistroModalOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Fechar menu ao clicar fora (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (open && !target.closest('nav')) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  // Fechar menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoginClick = () => {
    setLoginModalOpen(true);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  // Menus específicos por tipo de usuário
  const getMenuItems = () => {
    const items = [
      { href: "/", label: "Início" }
    ];

    if (!usuario) {
      // Usuário não logado - mostra opções básicas
      items.push(
        { href: "/vagas", label: "Vagas" }
      );
    } else if (usuario.tipo === "CANDIDATO") {
      // Candidato logado
      items.push(
        { href: "/vagas", label: "Vagas" },
        { href: "/processos", label: "Minhas Candidaturas" }
      );
    } else if (usuario.tipo === "EMPRESA") {
      // Empresa logada
      items.push(
        { href: "/vagas", label: "Minhas Vagas" },
        { href: "/candidatos", label: "Candidatos" }
      );
    }

    return items;
  };

  const menuItems = getMenuItems();

  return (
    <>
      <nav className="header-iphone fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">

            {/* LOGO */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 sm:space-x-3"
              onClick={() => setOpen(false)}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="font-bold text-white text-sm sm:text-base">BP</span>
              </div>
              <h1 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BPM Connect
              </h1>
            </Link>

            {/* MENU DESKTOP - CONDICIONAL */}
            <div className="hidden md:flex items-center space-x-2">
              {menuItems.map((item) => (
                <NavItem 
                  key={item.href} 
                  href={item.href} 
                  active={isActive(item.href)}
                >
                  {item.label}
                </NavItem>
              ))}
            </div>

            {/* AÇÕES */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* TEMA */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all"
                aria-label="Mudar tema"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>

              {/* USUÁRIO LOGADO OU LOGIN */}
              {usuario ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 text-sm">
                    {usuario.tipo === "EMPRESA" ? (
                      <Building className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span>Olá, {usuario.nome}</span>
                    <span className="text-xs opacity-70 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                      {usuario.tipo === "EMPRESA" ? "Empresa" : "Candidato"}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sair</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleLoginClick}
                  className="hidden sm:flex bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-5 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-sm sm:text-base"
                >
                  Entrar
                </button>
              )}

              {/* HAMBÚRGUER */}
              <button 
                className="md:hidden p-2 rounded-full bg-black/10 dark:bg-white/10"
                onClick={() => setOpen(!open)}
                aria-label="Abrir menu"
              >
                {open ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>

          {/* MENU MOBILE - CONDICIONAL */}
          {open && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg mobile-menu-container">
              <div className="flex flex-col py-4 space-y-2 px-4">
                {menuItems.map((item) => (
                  <MobileItem 
                    key={item.href}
                    href={item.href} 
                    active={isActive(item.href)}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </MobileItem>
                ))}

                {/* Login/Logout no mobile */}
                {usuario ? (
                  <>
                    <div className="mobile-menu-item text-center opacity-80 flex items-center justify-center">
                      {usuario.tipo === "EMPRESA" ? (
                        <Building className="w-4 h-4 mr-2" />
                      ) : (
                        <User className="w-4 h-4 mr-2" />
                      )}
                      Olá, {usuario.nome}
                      <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                        {usuario.tipo === "EMPRESA" ? "Empresa" : "Candidato"}
                      </span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="mobile-menu-item bg-red-600 text-white hover:bg-red-700 text-center flex items-center justify-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleLoginClick}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all mt-4 text-base font-medium w-full"
                  >
                    Entrar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* MODAIS */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegistro={() => {
          setLoginModalOpen(false);
          setRegistroModalOpen(true);
        }}
      />

      <RegistroModal
        isOpen={registroModalOpen}
        onClose={() => setRegistroModalOpen(false)}
        onSwitchToLogin={() => {
          setRegistroModalOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </>
  );
}

// Componentes NavItem e MobileItem atualizados (sem ícones)
function NavItem({ href, children, active = false }: { 
  href: string; 
  children: React.ReactNode; 
  active?: boolean; 
}) {
  return (
    <Link
      to={href}
      className={`
        transition-all font-medium px-4 py-2 rounded-full text-sm
        ${active 
          ? "nav-item-active" 
          : "hover:bg-black/10 dark:hover:bg-white/10"
        }
      `}
      onClick={() => window.scrollTo(0, 0)}
    >
      {children}
    </Link>
  );
}

function MobileItem({ href, children, active = false, onClick }: { 
  href: string; 
  children: React.ReactNode; 
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={href}
      className={`
        mobile-menu-item transition-all px-4 py-3 rounded-xl text-base font-medium
        ${active 
          ? "mobile-menu-item-active bg-blue-600 text-white" 
          : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
        }
      `}
      onClick={() => {
        window.scrollTo(0, 0);
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}