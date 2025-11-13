// src/components/layout/Footer.tsx
import { Button } from '../ui/Button'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Seção principal do footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">BPM Connect RH</h2>
            <p className="text-gray-300 max-w-md">
              Conectando talentos excepcionais com oportunidades incríveis. 
              Transformando o recrutamento através da tecnologia e inovação.
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialIcon href="#" icon="📘" label="Facebook" />
              <SocialIcon href="#" icon="📷" label="Instagram" />
              <SocialIcon href="#" icon="💼" label="LinkedIn" />
              <SocialIcon href="#" icon="🐦" label="Twitter" />
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <FooterLink href="/vagas" text="Vagas Abertas" />
              <FooterLink href="/sobre" text="Sobre Nós" />
              <FooterLink href="/contato" text="Contato" />
              <FooterLink href="/blog" text="Blog" />
              <FooterLink href="/privacidade" text="Política de Privacidade" />
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3 text-gray-300">
              <p>📧 contato@bpmconnect.com</p>
              <p>📞 (11) 9999-9999</p>
              <p>📍 São Paulo, SP</p>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Newsletter</h4>
              <div className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Seu e-mail"
                  className="px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button size="sm" className="w-full">
                  Inscrever
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Divisória */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} BPM Connect RH. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/termos" className="text-gray-400 hover:text-white text-sm">Termos de Uso</a>
              <a href="/privacidade" className="text-gray-400 hover:text-white text-sm">Privacidade</a>
              <a href="/cookies" className="text-gray-400 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  text: string
}

const FooterLink = ({ href, text }: FooterLinkProps) => (
  <li>
    <a 
      href={href} 
      className="text-gray-300 hover:text-white transition-colors text-sm"
    >
      {text}
    </a>
  </li>
)


interface SocialIconProps {
  href: string
  icon: string
  label: string
}

const SocialIcon = ({ href, icon, label }: SocialIconProps) => (
  <a 
    href={href}
    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
    aria-label={label}
  >
    <span className="text-lg">{icon}</span>
  </a>
)