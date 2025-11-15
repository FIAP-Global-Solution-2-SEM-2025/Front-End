export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#111] border-t border-gray-200 dark:border-gray-800 mt-10">
      <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo e nome */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            BPM Connect
          </span>
        </div>

        {/* Links */}
        <nav className="flex gap-6 text-sm">
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Sobre
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contato
          </a>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Trabalhe Conosco
          </a>
        </nav>

        {/* Direitos autorais */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} BPM Connect — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
