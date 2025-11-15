// src/components/layout/Header.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
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

  return (
    <nav className="header-iphone fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">

          {/* LOGO - Mobile mais compacto */}
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

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center space-x-2">
            <NavItem href="/" active={isActive('/')}>Início</NavItem>
            <NavItem href="/vagas" active={isActive('/vagas')}>Vagas</NavItem>
            <NavItem href="/candidatos" active={isActive('/candidatos')}>Candidatos</NavItem>
            <NavItem href="/processos" active={isActive('/processos')}>Processos</NavItem>
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

            {/* LOGIN - Escondido no mobile */}
            <button className="hidden sm:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-5 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-sm sm:text-base">
              Entrar
            </button>

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

        {/* MENU MOBILE - Melhorado */}
        {open && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-header backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex flex-col py-4 space-y-1 px-4">
              <MobileItem href="/" active={isActive('/')} onClick={() => setOpen(false)}>
                Início
              </MobileItem>
              <MobileItem href="/vagas" active={isActive('/vagas')} onClick={() => setOpen(false)}>
                Vagas
              </MobileItem>
              <MobileItem href="/candidatos" active={isActive('/candidatos')} onClick={() => setOpen(false)}>
                Candidatos
              </MobileItem>
              <MobileItem href="/processos" active={isActive('/processos')} onClick={() => setOpen(false)}>
                Processos
              </MobileItem>

              {/* Login no mobile */}
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all mt-4 text-base">
                Entrar
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

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
        transition-all px-4 py-3 rounded-xl text-base font-medium
        ${active 
          ? "nav-item-active" 
          : "hover:bg-black/10 dark:hover:bg-white/10"
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