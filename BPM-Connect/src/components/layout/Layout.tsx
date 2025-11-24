import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      {/* Adiciona padding-top para compensar o header fixo */}
      <main className="min-h-screen pt-16"> {/* pt-16 = 4rem = 64px (altura do header) */}
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>BPM Connect &copy; {new Date().getFullYear()} - Conectando talentos e oportunidades</p>
            <p className="text-sm mt-2">Sua plataforma de recrutamento em Business Process Management</p>
          </div>
        </div>
      </footer>
    </div>
  );
}