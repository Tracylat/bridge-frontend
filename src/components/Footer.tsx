import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import emailjs from "emailjs-com";
import bridgeLogo from "../assets/bridge-logo.svg";

const SERVICE_ID = "service_r3wdsfq";
const TEMPLATE_ID = "template_yoqunl8";
const USER_ID = "F5-c2lxaAGI9GHTa4";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg({ type: "error", text: "Veuillez entrer un email valide" });
      return;
    }
    setLoading(true);
    setMsg(null);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: email,
          subject: "Bienvenue à la Newsletter Bridge Partners",
          message: "Merci de vous être abonné !",
        },
        USER_ID
      );
      setMsg({ type: "success", text: "Abonnement réussi ! Merci !" });
      setEmail("");
    } catch {
      setMsg({ type: "error", text: "Erreur lors de l'abonnement. Réessayez." });
    } finally {
      setLoading(false);
    }
  };

  const navCols = [
    {
      title: "Navigation",
      links: [
        { l: "Accueil", to: "/" },
        { l: "À propos", to: "/about" },
        { l: "Articles", to: "/articles" },
        { l: "Découvrir le Bénin", to: "/benin" },
        { l: "Nos Services", to: "/team" },
        { l: "Contact", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-[#040f2e] relative overflow-hidden">
      {/* artisan bg */}
      <div className="absolute inset-0 bp-hero-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img src={bridgeLogo} alt="Bridge Partners Logo" className="w-10 h-10 flex-shrink-0" />
            <div className="flex flex-col leading-none">
              <span className="bp-serif text-white text-lg font-bold">Bridge Partners</span>
              <span className="text-[8px] tracking-[.16em] uppercase text-[#1a45b0]">
                Connecter des ambitions
              </span>
            </div>
          </Link>
          <div className="w-10 h-0.5 bg-[#1a45b0] mb-4" />
          <p className="text-white/40 text-xs leading-relaxed max-w-[220px]">
            Faciliter la création, la domiciliation et la gestion d'entreprises au Bénin pour la diaspora et les investisseurs étrangers.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#1a45b0] mb-4">
            Navigation
          </h4>
          <ul className="space-y-2">
            {navCols[0].links.map(({ l, to }) => (
              <li key={l}>
                <Link to={to} className="text-white/45 text-sm hover:text-white transition-colors duration-200">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coordonnées */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#1a45b0] mb-4">
            Coordonnées
          </h4>
          {[
            ["📧", "contact@bridgepartners.fr"],
            ["📞", "+33 6 17 05 57 35"],
            ["📍", "102 Av. des Champs-Élysées, Paris 🇫🇷"],
            ["📍", "Cotonou – Sèmè City 🇧🇯 (bientôt)"],
          ].map(([ico, val]) => (
            <div key={val as string} className="flex gap-2 mb-3 items-start">
              <span className="text-[#1a45b0] text-sm flex-shrink-0 mt-0.5">{ico}</span>
              <span className="text-white/45 text-xs leading-relaxed">{val}</span>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#1a45b0] mb-4">
            Newsletter
          </h4>
          <p className="text-white/40 text-xs leading-relaxed mb-4">Abonnez-vous pour recevoir nos actualités exclusives.</p>
          <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="px-3 py-2.5 rounded-lg bg-white/06 border border-white/10 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#1a45b0] transition disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="py-2.5 bg-[#1a45b0] text-[#040f2e] text-xs font-bold uppercase tracking-[.1em] rounded-lg hover:bg-[#8fb0ff] transition disabled:opacity-50"
            >
              {loading ? "Abonnement…" : "S'abonner"}
            </button>
            {msg && <p className={`text-xs ${msg.type === "success" ? "text-emerald-400" : "text-red-400"}`}>{msg.text}</p>}
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 border-t border-[#1a45b0]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Bridge Partners. Tous droits réservés.</p>
          <div className="flex gap-3">
            {[FaLinkedin, FaInstagram, FaFacebook, FaTiktok].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 border border-white/10 rounded-md flex items-center justify-center text-white/35 text-sm hover:border-[#1a45b0] hover:text-[#1a45b0] transition-all duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

