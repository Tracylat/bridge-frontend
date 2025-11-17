import { FaLinkedin, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#08227f] text-white mt-16">
      {/* Contact direct */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Newsletter</h3>
          <p>Abonnez-vous pour recevoir nos actualités exclusives.</p>
          <form className="mt-2 flex flex-col gap-2">
            <input
              type="email"
              placeholder="Votre e-mail"
              className="px-3 py-2 rounded-lg text-[#08227f]"
            />
            <button
              type="submit"
              className="bg-white text-[#08227f] px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
            >
              S'abonner
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-sm bg-[#071c6b] py-4">
        © {new Date().getFullYear()} Bridge Partners. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
