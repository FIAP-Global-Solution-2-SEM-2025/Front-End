import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <nav className="
      fixed top-0 left-0 w-full z-50
      backdrop-blur-xl bg-white/60 dark:bg-black/40
      border-b border-black/10 dark:border-white/10
      transition
    ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-black dark:bg-white flex items-center justify-center">
              <span className="font-bold text-white dark:text-black">BP</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
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
              className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-800" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-300" />
              )}
            </button>

            {/* LOGIN */}
            <button className="hidden md:block bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-lg hover:opacity-80">
              Entrar
            </button>

            {/* HAMBÚRGUER */}
            <button className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? (
                <X className="w-7 h-7 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="w-7 h-7 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* MENU MOBILE */}
        {open && (
          <div className="md:hidden flex flex-col py-4 space-y-4">
            <MobileItem href="/">Início</MobileItem>
            <MobileItem href="/vagas" active>Vagas</MobileItem>
            <MobileItem href="/candidatos">Candidatos</MobileItem>
            <MobileItem href="/processos">Processos</MobileItem>

            <button className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-lg">
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
        transition font-medium 
        ${active
          ? "text-black dark:text-white"
          : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"}
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
        text-lg transition 
        ${active
          ? "font-semibold text-black dark:text-white"
          : "text-gray-900 dark:text-gray-300"}
      `}
    >
      {children}
    </a>
  );
}
