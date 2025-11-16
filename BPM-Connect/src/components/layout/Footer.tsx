export default function Footer() {
  return (
    <footer className="bg-card border-t mt-10">
      <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo e nome */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
          <span className="text-lg font-semibold">
            BPM Connect
          </span>
        </div>

        {/* Links */}
        <nav className="flex gap-6 text-sm">
          <a href="#" className="opacity-80 hover:opacity-100 transition">
            Sobre
          </a>
          <a href="#" className="opacity-80 hover:opacity-100 transition">
            Contato
          </a>
          <a href="#" className="opacity-80 hover:opacity-100 transition">
            Trabalhe Conosco
          </a>
        </nav>

        {/* Direitos autorais */}
        <p className="text-xs opacity-70">
          © {new Date().getFullYear()} BPM Connect — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}