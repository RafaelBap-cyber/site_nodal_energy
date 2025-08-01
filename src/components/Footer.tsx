import { Mail, Phone, Linkedin, Instagram, Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/src/assets/Corect_logo.png" alt="Logo" className="h-16 w-16" style={{ filter: 'invert(41%) sepia(97%) saturate(749%) hue-rotate(74deg) brightness(90%) contrast(90%)' }} />
              <span className="text-xl font-light text-primary">Nodal Energy</span>
            </div>
            <p className="text-muted-foreground">
              Especialistas em eficiência energética e sustentabilidade.
              Transformando o futuro através de soluções inteligentes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <div className="space-y-2">
              <a href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="/sobre" className="block text-muted-foreground hover:text-primary transition-colors">
                Sobre & Projetos
              </a>
              <a href="/contatos" className="block text-muted-foreground hover:text-primary transition-colors">
                Contatos
              </a>
              <a href="/blog" className="block text-muted-foreground hover:text-primary transition-colors">
                Blog
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contato@carrascoenergy.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Nodal Energy. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;