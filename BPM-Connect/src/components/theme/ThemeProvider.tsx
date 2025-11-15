// src/components/theme/ThemeProvider.tsx - VERSÃO ATUALIZADA
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    return saved || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    
    // Remove todas as classes de tema
    root.classList.remove("light", "dark");
    
    // Adiciona a classe do tema atual
    root.classList.add(theme);
    
    // Força cores específicas
    if (theme === "dark") {
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#f8fafc";
      if (main) main.style.backgroundColor = "#0f172a";
      if (footer) footer.style.backgroundColor = "#1e293b";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
      if (main) main.style.backgroundColor = "#ffffff";
      if (footer) footer.style.backgroundColor = "#f8fafc";
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}