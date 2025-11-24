import { ReactNode } from 'react';
import { Header } from './Header';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="min-h-screen pt-16">
        {children}
      </main>
      
      {/* Footer Atualizado */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-400">
                BPM Connect &copy; {new Date().getFullYear()} - Conectando talentos e oportunidades
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Sua plataforma de recrutamento em Business Process Management
              </p>
            </div>
            
            {/* Links do Footer */}
            <div className="flex space-x-6">
              <Link 
                to="/sobre-nos" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Sobre Nós
              </Link>
              <a 
                href="/privacidade" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacidade
              </a>
              <a 
                href="/termos" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Termos
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}