import { useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import emailjs from "emailjs-com";
import beninHero from "../assets/benin-hero.jpg";

const SERVICE_ID = "service_r3wdsfq";
const TEMPLATE_ID = "template_yoqunl8";
const USER_ID = "F5-c2lxaAGI9GHTa4";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: "error", text: "Veuillez entrer votre email" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: "error", text: "Email invalide" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: email,
          subject: "Bienvenue à la Newsletter Bridge Partners",
          message: `Merci de vous être abonné à notre newsletter ! Vous recevrez désormais nos actualités exclusives.`
        },
        USER_ID
      );

      setMessage({ type: "success", text: "Abonnement réussi ! Merci !" });
      setEmail("");
    } catch (error) {
      console.error("Newsletter error:", error);
      setMessage({ type: "error", text: "Erreur lors de l'abonnement. Réessayez." });
    } finally {
      setLoading(false);
    }
  };

  return (
  <footer className="relative benin-texture text-white adenka-footer">
  {/* Decorative image strip (Benin / France thumbnails) */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
    <div className="image-strip mb-6">
      <img src={beninHero} alt="Bénin" />
      <img src="/images/france-1.jpg" alt="France" />
      <img src={beninHero} alt="Bénin" />
      <img src="/images/france-1.jpg" alt="France" />
    </div>
  </div>

  {/* Subtle gradient + background */}
  <div className="absolute inset-0 bridge-hero opacity-95" />
  <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />

  {/* Contenu du footer */}
  <div className="relative z-10 text-white max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
    <div>
      <h3 className="text-lg font-bold mb-2">Nos coordonnées</h3>
      <p>📧 contact@bridgepartners.fr</p>
      <p>📞 +33 6 17 05 57 35</p>
      <p>📍 102 Avenue des Champs-Élysées, 75008 Paris 🇫🇷</p>
      <p>📍 Cotonou – Sèmè City 🇧🇯 (bientôt disponible)</p>
    </div>

    <div>
      <h3 className="text-lg font-bold mb-2">Suivez-nous</h3>
      <div className="flex gap-4 text-2xl mt-2">
        <a href="#"><FaLinkedin /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaFacebook /></a>
        <a href="#"><FaTiktok /></a>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-bold mb-2">Newsletter</h3>
      <p>Abonnez-vous pour recevoir nos actualités exclusives.</p>
      <form onSubmit={handleNewsletterSubmit} className="mt-2 flex flex-col gap-2">
        <input
          type="email"
          placeholder="Votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded-lg text-gray-800"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-bridge disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Abonnement..." : "S'abonner"}
        </button>
        {message && (
          <div className={`text-sm px-3 py-2 rounded ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          } text-white`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  </div>

  <div className="relative z-10 text-center text-sm bg-[#071c6b]/80 py-4">
    © {new Date().getFullYear()} Bridge Partners. Tous droits réservés.
  </div>
</footer>
  );
};

export default Footer;
