import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

type NavbarProps = {
  isAuthenticated: boolean;
  userRole: "user" | "admin" | null;
  onLogout: () => void;
};

const Navbar = ({ isAuthenticated, userRole, onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Accueil", path: "/" },
    { label: "À propos", path: "/about" },
    { label: "Articles", path: "/articles" },
    { label: "Découvrir le Bénin", path: "/benin" },
    { label: "Nos Services", path: "/team" },
  ];

  return (
    <header className="bg-[#08227f] text-white shadow-md">
      {/* Navbar principal */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/LOGO-BRIDGE-Blanc-jpeg(1).jpg"
            alt="Logo"
            className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-2xl font-bold tracking-wide">
            <span className="text-white">Bridge</span>
            <span className="text-blue-300">Partners</span>
          </h1>
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-blue-300 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              {userRole === "admin" && (
                <>
                  <Link
                    to="/admin/articles"
                    className="hover:text-blue-300 transition-colors duration-200"
                  >
                    Articles
                  </Link>
                  <Link
                    to="/admin/clients"
                    className="hover:text-blue-300 transition-colors duration-200"
                  >
                    Clients
                  </Link>
                </>
              )}
              <button
                onClick={onLogout}
                className="bg-white text-[#08227f] font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-[#08227f] font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
            >
              Connexion
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#08227f] text-white px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block hover:text-blue-300 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              {userRole === "admin" && (
                <>
                  <Link
                    to="/admin/articles"
                    onClick={() => setIsOpen(false)}
                    className="block hover:text-blue-300"
                  >
                    Articles
                  </Link>
                  <Link
                    to="/admin/clients"
                    onClick={() => setIsOpen(false)}
                    className="block hover:text-blue-300"
                  >
                    Clients
                  </Link>
                </>
              )}
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left bg-white text-[#08227f] font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block bg-white text-[#08227f] font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
            >
              Connexion
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
