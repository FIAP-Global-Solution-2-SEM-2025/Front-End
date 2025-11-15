// src/components/layout/Header.tsx - VERSÃO IPHONE STYLE
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <nav className="header-iphone fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="font-bold text-white">BP</span>
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BPM Connect
            </h1>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItem href="/">Início</NavItem>
            <NavItem href="/vagas" active>Vagas</NavItem>
            <NavItem href="/candidatos">Candidatos</NavItem>
            <NavItem href="/processos">Processos</NavItem>
          </div>

          {/* AÇÕES */}
          <div className="flex items-center gap-4">
            {/* TEMA */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* LOGIN */}
            <button className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
              Entrar
            </button>

            {/* HAMBÚRGUER */}
            <button 
              className="md:hidden p-2 rounded-full bg-black/10 dark:bg-white/10"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* MENU MOBILE */}
        {open && (
          <div className="md:hidden flex flex-col py-4 space-y-4 bg-header rounded-2xl mt-2 p-4">
            <MobileItem href="/">Início</MobileItem>
            <MobileItem href="/vagas" active>Vagas</MobileItem>
            <MobileItem href="/candidatos">Candidatos</MobileItem>
            <MobileItem href="/processos">Processos</MobileItem>

            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all">
              Entrar
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavItem({ href, children, active = false }) {
  return (
    <a
      href={href}
      className={`
        transition-all font-medium px-3 py-2 rounded-full
        ${active 
          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300" 
          : "hover:bg-black/10 dark:hover:bg-white/10"
        }
      `}
    >
      {children}
    </a>
  );
}

function MobileItem({ href, children, active = false }) {
  return (
    <a
      href={href}
      className={`
        text-lg transition-all px-4 py-3 rounded-xl
        ${active 
          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-semibold" 
          : "hover:bg-black/10 dark:hover:bg-white/10"
        }
      `}
    >
      {children}
    </a>
  );
}