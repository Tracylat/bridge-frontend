import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  user: { role: "admin" | "user"; email: string } | null;
  onLogout: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
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
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/LOGO-BRIDGE-Blanc-jpeg.jpg" alt="Bridge Partners" className="h-8 md:h-10 object-contain" />
          <span className="hidden md:inline text-2xl font-bold">BridgePartners</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="hover:text-blue-300">{link.label}</Link>
          ))}

          {user ? (
            <>
              {user.role === "admin" && (
                <>
                  <Link to="/admin/articles" className="hover:text-blue-300">Articles Admin</Link>
                  <Link to="/admin/clients" className="hover:text-blue-300">Clients</Link>
                </>
              )}
              {user.role === "user" && <Link to="/dashboard" className="hover:text-blue-300">Mon Dashboard</Link>}

              <button onClick={onLogout} className="bg-white text-[#08227f] px-4 py-2 rounded-lg hover:bg-blue-100">
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-[#08227f] px-4 py-2 rounded-lg hover:bg-blue-100">
              Connexion
            </Link>
          )}
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-[#08227f] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>{link.label}</Link>
          ))}

          {user ? (
            <>
              {user.role === "admin" && (
                <>
                  <Link to="/admin/articles" onClick={() => setIsOpen(false)}>Articles Admin</Link>
                  <Link to="/admin/clients" onClick={() => setIsOpen(false)}>Clients</Link>
                </>
              )}
              {user.role === "user" && <Link to="/dashboard" onClick={() => setIsOpen(false)}>Mon Dashboard</Link>}
              <button
                onClick={() => { onLogout(); setIsOpen(false); }}
                className="w-full text-left bg-white text-[#08227f] px-4 py-2 rounded-lg"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-left bg-white text-[#08227f] px-4 py-2 rounded-lg">
              Connexion
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;