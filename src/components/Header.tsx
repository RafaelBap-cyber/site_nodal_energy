import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/Corect_logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-16 w-16" style={{ filter: 'invert(41%) sepia(97%) saturate(749%) hue-rotate(74deg) brightness(90%) contrast(90%)' }} />
          <span className="text-xl font-light text-primary">Nodal Energy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/sobre"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/sobre") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Sobre & Projetos
          </Link>
          <Link
            to="/blog"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/blog") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Blog
          </Link>
          <Link
            to="/contatos"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/contatos") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Contatos
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 px-4 pb-4">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/sobre"
              className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                isActive("/sobre") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre & Projetos
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                isActive("/blog") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contatos"
              className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                isActive("/contatos") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contatos
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;