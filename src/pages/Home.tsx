import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Users, Globe, BarChart } from "lucide-react";
import { FaLinkedin, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import Footer from "../components/Footer";
import { IMGS } from "../assets/images";

// ── Hero slides ────────────────────────────────────────────
const heroSlides = [
  { img: IMGS.louvre,   label: "Paris · France 🇫🇷" },
  { img: IMGS.amazone,  label: "Cotonou · Bénin 🇧🇯" },
  { img: IMGS.ganvie,   label: "Ganvié · Bénin 🇧🇯" },
];

const features = [
  { icon: <TrendingUp className="h-7 w-7 text-[#08227f]" />, title: "Performance",  desc: "Solutions optimisées pour des résultats exceptionnels." },
  { icon: <Shield      className="h-7 w-7 text-[#08227f]" />, title: "Sécurité",     desc: "Protection avancée de vos données et confidentialité." },
  { icon: <Users       className="h-7 w-7 text-[#08227f]" />, title: "Expertise",    desc: "Une équipe dédiée à votre succès." },
  { icon: <Globe       className="h-7 w-7 text-[#08227f]" />, title: "Global",       desc: "Présence internationale et vision locale." },
  { icon: <BarChart    className="h-7 w-7 text-[#08227f]" />, title: "Analytique",   desc: "Décisions basées sur des données précises." },
];

// ── Hero rotator ────────────────────────────────────────────
const HeroRotator: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % heroSlides.length);
        setPrev((p) => p); // keep for parity; visual uses fading
        setFading(false);
      }, 800);
    }, 5000);

    return () => clearInterval(t);
  }, [idx]);

  return (
    <section className="relative w-full h-[88vh] lg:h-[92vh] overflow-hidden">
      {/* current slide */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroSlides[idx].img})`, opacity: fading ? 0 : 1, transition: 'opacity 800ms ease' }} />

      {/* Artisan overlay */}
      <div className="absolute inset-0 bp-hero-pattern opacity-100 pointer-events-none z-[1]" />
      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65 z-[2]" />
      {/* Right accent */}
          <div className="absolute right-0 top-0 bottom-0 w-[40%] border-l border-[#1a45b0]/15 z-[3]
                      bg-gradient-to-l from-white/[.02] to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center">
        <div>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8}}
            className="bp-eyebrow text-[#08227f] mb-5">
            Votre partenaire franco-béninois
          </motion.p>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.1}}
            className="bp-serif text-white leading-[1.05] mb-3"
            style={{fontSize:"clamp(42px,8vw,92px)",fontWeight:700,letterSpacing:"-.01em"}}>
            Bridge<br/><em className="italic font-normal text-white">Partners</em>
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.9,delay:.2}}
            className="bp-serif italic text-white/75 mb-4"
            style={{fontSize:"clamp(18px,2.4vw,26px)"}}>
            Créer un pont, connecter des ambitions…
          </motion.p>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.9,delay:.3}}
            className="text-white/65 text-[15px] font-light leading-relaxed max-w-[520px] mb-9">
            Faciliter la création, la domiciliation et la gestion d'entreprises au Bénin pour la diaspora et les investisseurs étrangers.
          </motion.p>
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.4}}
            className="flex flex-wrap gap-4">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#08227f] text-sm font-semibold rounded-md
hover:bg-[#8fb0ff] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 uppercase tracking-wider">

              Contactez-nous <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/benin"
              className="inline-flex items-center gap-2 px-7 py-3 border border-white/40 text-white text-sm font-medium rounded-md
                         hover:bg-white/10 hover:border-white/70 transition-all duration-200 uppercase tracking-wider">
              Découvrir le Bénin
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#041a60]/85 backdrop-blur-sm border-t border-[#1a45b0]/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-[#1a45b0]/15">
          {[["3","Pôles d'expertise"],["2","Continents connectés"],["100%","Accompagnement personnalisé"]].map(([n,l])=>(
            <div key={l} className="py-4 text-center">
              <div className="bp-serif text-white text-3xl font-bold leading-none">{n}</div>
              <div className="text-white/55 text-[10px] uppercase tracking-[.1em] mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Diptych France / Bénin ─────────────────────────────────
const Diptych: React.FC = () => (
  <section className="py-20 bg-[#fafbff] bp-pattern-adinkra">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <p className="bp-eyebrow justify-center flex mb-3">Deux mondes, une vision</p>
        <h2 className="bp-title">France <em>&amp;</em> Bénin</h2>
        <p className="text-[#3a4a6a] text-[15px] font-light leading-relaxed max-w-lg mx-auto mt-3">
          Un pont culturel entre deux pays, deux identités, une seule ambition partagée.
        </p>
      </div>

      {/* Diptych grid */}
      <div className="grid grid-cols-[1fr_64px_1fr] h-[440px] md:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
        {/* France side */}
        <div className="relative overflow-hidden grid grid-rows-2 gap-0.5">
          <div className="bg-cover bg-center" style={{backgroundImage:`url(${IMGS.louvre})`}} />
          <div className="bg-cover bg-[center_30%]" style={{backgroundImage:`url(${IMGS.franceFlag})`}} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040f2e]/70 to-transparent flex items-end p-6">
            <div>
              <span className="text-3xl">🇫🇷</span>
              <p className="bp-serif text-white text-3xl font-bold leading-none mt-1">France</p>
              <p className="text-white/60 text-xs uppercase tracking-[.12em] mt-1">Paris · Champs-Élysées</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-[#08227f] flex flex-col items-center justify-center gap-4 relative">
          <div className="absolute top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#1a45b0] to-transparent" />
          <svg width="44" height="44" viewBox="0 0 44 44" className="relative z-10" fill="none">
            <circle cx="22" cy="22" r="20" stroke="white" strokeWidth="1.2" strokeOpacity=".4"/>
            <circle cx="22" cy="22" r="10" stroke="#1a45b0" strokeWidth="1" strokeOpacity=".8"/>
            <circle cx="22" cy="22" r="3.5" fill="#1a45b0" fillOpacity=".9"/>

            <line x1="22" y1="2" x2="22" y2="42" stroke="white" strokeWidth=".7" strokeOpacity=".25"/>
            <line x1="2" y1="22" x2="42" y2="22" stroke="white" strokeWidth=".7" strokeOpacity=".25"/>
          </svg>
        </div>

        {/* Bénin side */}
        <div className="relative overflow-hidden grid grid-rows-2 gap-0.5">
          <div className="bg-cover bg-center" style={{backgroundImage:`url(${IMGS.amazone})`}} />
          <div className="bg-cover bg-center" style={{backgroundImage:`url(${IMGS.porteNonRetour})`}} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040f2e]/70 to-transparent flex items-end p-6">
            <div>
              <span className="text-3xl">🇧🇯</span>
              <p className="bp-serif text-white text-3xl font-bold leading-none mt-1">Bénin</p>
              <p className="text-white/60 text-xs uppercase tracking-[.12em] mt-1">Cotonou · Ouidah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Features ───────────────────────────────────────────────
const Features: React.FC = () => (
  <section className="py-20 bg-white bp-pattern-kente">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <p className="bp-eyebrow mb-3">Ce que nous faisons</p>
        <h2 className="bp-title">Nos <em>piliers</em> de service</h2>
        <p className="text-[#3a4a6a] text-[15px] font-light leading-relaxed max-w-lg mt-3">
          Des solutions sur mesure pour vos projets d'investissement et de développement.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div key={i}
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
            transition={{duration:.5,delay:i*.08}} viewport={{once:true}}
            className="group bg-[#fafbff] border border-[#08227f]/08 rounded-xl p-8 relative overflow-hidden
                       hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#08227f] to-[#1a45b0]
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div className="w-12 h-12 bg-[#e6ecff] rounded-xl flex items-center justify-center mb-5">{f.icon}</div>
            <h3 className="bp-serif text-[#08227f] text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-[#3a4a6a] text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ── Benin strip ────────────────────────────────────────────
const BeninStrip: React.FC = () => (
  <section className="py-20 bg-[#08227f] relative overflow-hidden">
    <div className="absolute inset-0 bp-hero-pattern opacity-60" />
    <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <p className="bp-eyebrow text-[#08227f] mb-3">Terre d'opportunités</p>
        <h2 className="bp-title bp-title-white">Le Bénin, <em>une nation en mouvement</em></h2>
        <div className="bp-gold-line" />
        <p className="text-white/65 text-[15px] font-light leading-relaxed mb-8">
          Réformes structurelles, digitalisation, stabilité politique, croissance soutenue (+6,4 %) :
          le Bénin 2.0 est l'un des pays les plus attractifs d'Afrique de l'Ouest.
        </p>
        <Link to="/benin"
          className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#08227f] text-sm font-semibold rounded-md
                     hover:bg-[#1a45b0] transition-all duration-200 uppercase tracking-wider">
          Découvrir le Bénin <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {/* 3-image grid */}
      <div className="grid grid-cols-2 gap-3 h-72">
        <div className="col-span-2 rounded-xl overflow-hidden">
          <img src={IMGS.amazone} alt="Amazone de Cotonou" className="w-full h-full object-cover" />
        </div>
        <div className="rounded-xl overflow-hidden">
          <img src={IMGS.porteNonRetour} alt="Porte du Non-Retour" className="w-full h-full object-cover object-center" />
        </div>
        <div className="rounded-xl overflow-hidden">
          <img src={IMGS.ganvie} alt="Ganvié" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
);

// ── Culture strip ──────────────────────────────────────────
const CultureStrip: React.FC = () => (
  <section className="py-20 bg-[#fafbff]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-center">
        <div>
          <p className="bp-eyebrow mb-3">Richesse culturelle</p>
          <h2 className="bp-title">L'âme du <em>Bénin</em></h2>
          <div className="bp-gold-line" />
          <p className="text-[#3a4a6a] text-[14px] leading-relaxed font-light">
            Art, traditions millénaires, spiritualité vodoun — une culture vivante qui inspire le monde entier.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 h-72">
          {[
            [IMGS.masqueIvoire, "Art royal"],
            [IMGS.bronze,       "Bronzes du Bénin"],
            [IMGS.artContemp,   "Art contemporain"],
            [IMGS.femme,        "Traditions vivantes"],
          ].map(([src, label]) => (
            <div key={label} className="relative rounded-xl overflow-hidden group">
              <img src={src} alt={label} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040f2e]/75 to-transparent" />
              <p className="absolute bottom-2 left-0 right-0 text-center text-white text-[11px] font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── CTA ────────────────────────────────────────────────────
const CTA: React.FC = () => (
  <section className="py-20 bg-[#08227f] bp-pattern-bogolan text-center">
    <div className="max-w-2xl mx-auto px-6">
      <p className="bp-eyebrow justify-center flex text-[#08227f] mb-3">Passez à l'action</p>
      <h2 className="bp-title bp-title-white mb-4">Prêt à <em>commencer</em> ?</h2>
      <p className="text-white/65 text-[15px] font-light leading-relaxed mb-8">
        Contactez-nous dès aujourd'hui pour donner vie à votre projet d'investissement au Bénin.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/contact"
          className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#08227f] text-sm font-semibold rounded-md
hover:bg-[#8fb0ff] transition-all duration-200 uppercase tracking-wider">

          Contactez-nous <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/benin"
          className="inline-flex items-center gap-2 px-7 py-3 border border-white/40 text-white text-sm font-medium rounded-md
                     hover:bg-white/10 hover:border-white/70 transition-all duration-200 uppercase tracking-wider">
          Découvrir le Bénin
        </Link>
      </div>
    </div>
  </section>
);

// ── Home page ──────────────────────────────────────────────
const Home: React.FC = () => (
  <div className="min-h-screen bg-white">
    <HeroRotator />
    <Diptych />
    <Features />
    <BeninStrip />
    <CultureStrip />
    <CTA />
    <Footer />
  </div>
);

export default Home;
