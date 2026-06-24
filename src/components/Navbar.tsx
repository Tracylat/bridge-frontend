import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import bridgeLogo from "../assets/bridge-logo.svg";

interface NavbarProps {
  user: { role: "admin" | "user"; email: string } | null;
  onLogout: () => void;
}

const navLinks = [
  { label: "Accueil",           path: "/" },
  { label: "À propos",          path: "/about" },
  { label: "Articles",          path: "/articles" },
  { label: "Découvrir le Bénin",path: "/benin" },
  { label: "Nos Services",      path: "/team" },
];

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "text-[#c9a84c] font-semibold" : "text-white hover:text-[#c9a84c]";

  return (
    <>
      {/* TOPBAR */}
      <div className="bg-[#040f2e] text-white text-xs py-1.5 text-center hidden md:block">
        <span className="mx-3">📧 <a href="mailto:contact@bridgepartners.fr" className="text-[#f0d896] hover:underline">contact@bridgepartners.fr</a></span>
        <span className="mx-3">📞 <a href="tel:+33617055735" className="text-[#f0d896] hover:underline">+33 6 17 05 57 35</a></span>
        <span className="mx-3">🇫🇷 Paris · 🇧🇯 Cotonou</span>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#08227f]/10 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={bridgeLogo} alt="Bridge Partners Logo" className="w-10 h-10 flex-shrink-0" />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg text-[#08227f] bp-serif" style={{fontFamily:"'Cormorant Garamond',serif"}}>Bridge Partners</span>
              <span className="text-[9px] tracking-[.18em] uppercase text-[#c9a84c]">Connecter des ambitions</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-medium tracking-wide uppercase transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-[#08227f] font-semibold border-b-2 border-[#c9a84c] pb-0.5"
                    : "text-[#3a4a6a] hover:text-[#08227f]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                {user.role === "admin" && (
                  <>
                    <Link to="/admin/articles" className="text-xs text-[#3a4a6a] hover:text-[#08227f] uppercase tracking-wide">Admin Articles</Link>
                    <Link to="/admin/clients" className="text-xs text-[#3a4a6a] hover:text-[#08227f] uppercase tracking-wide">Clients</Link>
                  </>
                )}
                {user.role === "user" && (
                  <Link to="/dashboard" className="text-xs text-[#3a4a6a] hover:text-[#08227f] uppercase tracking-wide">Mon Dashboard</Link>
                )}
                <button
                  onClick={onLogout}
                  className="text-xs bg-[#08227f] text-white px-4 py-2 rounded-md hover:bg-[#041a60] transition font-semibold tracking-wide"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/contact"
                className="text-xs bg-[#08227f] text-white px-5 py-2 rounded-md hover:bg-[#041a60] transition font-semibold tracking-widest uppercase"
              >
                Contactez-nous
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-[#08227f]" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t-2 border-[#08227f] px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm border-b border-[#08227f]/06 ${
                  location.pathname === link.path ? "text-[#08227f] font-semibold" : "text-[#3a4a6a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                {user.role === "admin" && <>
                  <Link to="/admin/articles" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-[#3a4a6a]">Admin Articles</Link>
                  <Link to="/admin/clients" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-[#3a4a6a]">Clients</Link>
                </>}
                {user.role === "user" && <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-[#3a4a6a]">Mon Dashboard</Link>}
                <button onClick={() => { onLogout(); setIsOpen(false); }} className="w-full mt-2 bg-[#08227f] text-white py-2 rounded-md text-sm font-semibold">Déconnexion</button>
              </>
            ) : (
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block mt-2 text-center bg-[#08227f] text-white py-2 rounded-md text-sm font-semibold">Contactez-nous</Link>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
