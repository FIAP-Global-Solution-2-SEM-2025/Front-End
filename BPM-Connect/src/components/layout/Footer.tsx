export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LOGO E DESCRIÇÃO */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">BPM Connect RH</h2>
          <p className="max-w-md">
            Conectando talentos excepcionais com oportunidades incríveis.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Links Rápidos</h3>
          <div className="flex flex-col space-y-2">
            <FooterLink href="/vagas">Vagas Abertas</FooterLink>
            <FooterLink href="/sobre">Sobre Nós</FooterLink>
            <FooterLink href="/contato">Contato</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
          </div>
        </div>

        {/* CONTATO */}
        <div>
          <h3 className="font-semibold mb-4">Contato</h3>
          <p>📧 contato@bpmconnect.com</p>
          <p>📞 (11) 9999-9999</p>
          <p>📍 São Paulo, SP</p>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 py-6 text-center">
        © {year} BPM Connect RH — Todos os direitos reservados.
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <a href={href} className="hover:underline text-gray-800 dark:text-gray-300">
      {children}
    </a>
  );
}
