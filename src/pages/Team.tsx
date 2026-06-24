import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Lightbulb, Users, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import { IMGS } from "../assets/images";

const headerSlides = [IMGS.louvre, IMGS.amazone, IMGS.egungunDanse];

const services = [
  {
    icon: <FileText className="h-8 w-8 text-[#08227f]" />,
    title: "Pôle Création d'Entreprise",
    intro: "Créer une entreprise ne devrait pas être un parcours du combattant. Le pôle Création d'entreprise de Bridge Partners a été pensé pour simplifier les démarches, structurer votre vision et sécuriser votre lancement.",
    missions: [
      "Évaluer et valider votre idée via une étude de faisabilité",
      "Rédiger un business plan clair, précis et convaincant",
      "Accompagner dans le choix du statut juridique",
      "Gérer les formalités administratives (RCCM, IFU, GUFE, carte professionnelle)",
      "Assurer la domiciliation de votre entreprise",
      "Aider à l'ouverture de votre compte bancaire professionnel",
    ],
    why: "Parce que nous vous offrons plus qu'un accompagnement administratif : un partenaire stratégique qui vous guide avec clarté jusqu'à la réussite.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-[#08227f]" />,
    title: "Pôle Rayonnement Numérique & Contenus",
    intro: "À l'ère du digital, la visibilité est la nouvelle monnaie. Bridge Partners met la stratégie de contenu et le référencement (SEO) au cœur de votre croissance.",
    missions: [
      "Rédaction de contenus : articles, livres blancs, pages de vente, newsletters",
      "SEO et netlinking pour améliorer votre position sur Google",
      "Cocon sémantique & optimisation web pour convertir vos visiteurs",
      "Communication stratégique : Google Discover, Wikipédia, e-books, storytelling",
      "Marketing relationnel : emailings, campagnes de fidélisation et de prospection",
    ],
    why: "Parce que dans un monde numérique saturé, votre contenu est votre voix. Bridge Partners transforme votre expertise en impact digital mesurable.",
  },
  {
    icon: <Users className="h-8 w-8 text-[#08227f]" />,
    title: "Pôle Recrutement International",
    intro: "Le capital humain est la première richesse d'une entreprise. Bridge Partners facilite la mise en relation entre talents béninois et entreprises françaises ou internationales.",
    missions: [
      "Mise en relation directe entre candidats et entreprises partenaires",
      "Accompagnement personnalisé des candidats (CV, lettres de motivation, entretiens)",
      "Soutien administratif pour la mobilité internationale (Campus France, visa travail)",
      "Conseil RH pour les entreprises : intégration, onboarding, gestion à distance",
    ],
    why: "Parce qu'il ne s'agit pas seulement de recruter, mais de connecter des potentiels à des projets de vie — une mobilité choisie, éthique et durable.",
  },
];

const Team = () => {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % headerSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbff]">
      {/* ── Hero ── */}
      <section className="relative h-[65vh] overflow-hidden">
        {headerSlides.map((src, i) => (
          <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${src})`, opacity: i === slide ? 1 : 0 }} />
        ))}
        <div className="absolute inset-0 bp-hero-pattern z-[1]" />
        <div className="absolute inset-0 bg-[#08227f]/60 z-[2]" />
        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-6">
          <motion.p initial={{opacity:0}} animate={{opacity:1}} className="bp-eyebrow text-[#f0d896] justify-center flex mb-4">
            Ce que nous faisons
          </motion.p>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1}}
            className="bp-serif text-white font-bold leading-tight"
            style={{fontSize:"clamp(32px,6vw,68px)"}}>
            Nos <em className="italic font-normal text-[#f0d896]">Services</em>
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.25}}
            className="text-white/70 text-[16px] font-light max-w-lg mt-3">
            Chaque pôle de Bridge Partners agit pour simplifier, valoriser et développer vos projets.
          </motion.p>
        </div>
      </section>

      {/* ── Service cards ── */}
      <section className="py-20 bp-pattern-kente">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div key={i}
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                transition={{duration:.55,delay:i*.1}} viewport={{once:true}}
                className="group bg-white border border-[#08227f]/08 rounded-2xl p-8 relative overflow-hidden
                           hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300">
                {/* Corner deco */}
                <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full border border-[#08227f]/04" />
                <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full border border-[#c9a84c]/08" />
                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#08227f] to-[#c9a84c]
                                scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                <div className="w-14 h-14 bg-[#e6ecff] rounded-xl flex items-center justify-center mb-6 relative z-10">
                  {s.icon}
                </div>
                <h3 className="bp-serif text-[#08227f] text-2xl font-bold mb-4 leading-tight">{s.title}</h3>
                <p className="text-[#3a4a6a] text-[14px] leading-relaxed mb-5">{s.intro}</p>
                <ul className="space-y-2 mb-5">
                  {s.missions.map((m, j) => (
                    <li key={j} className="flex gap-3 text-[13px] text-[#3a4a6a] border-b border-[#08227f]/04 pb-2">
                      <span className="text-[#1a45b0] mt-0.5 flex-shrink-0">→</span>{m}
                    </li>
                  ))}
                </ul>
                <p className="text-[#08227f] text-[13px] font-medium italic leading-relaxed border-t border-[#08227f]/06 pt-4">
                  {s.why}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#08227f] bp-pattern-bogolan text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="bp-eyebrow justify-center flex text-[#f0d896] mb-3">Une expertise, un objectif</p>
          <h2 className="bp-title bp-title-white mb-4">Votre <em>réussite</em></h2>
          <p className="text-white/65 text-[15px] font-light leading-relaxed mb-8">
            Du lancement de votre entreprise à sa croissance digitale, en passant par la gestion des talents :
            Bridge Partners connecte ambitions et succès.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#08227f] text-sm font-semibold rounded-md
                       hover:bg-[#f0d896] transition-all duration-200 uppercase tracking-wider">
            Découvrez nos offres <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Team;
