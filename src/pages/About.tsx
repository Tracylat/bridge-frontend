import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, TrendingUp, BarChart, Users, Lightbulb } from "lucide-react";
import Footer from "../components/Footer";
import { IMGS } from "../assets/images";

const headerSlides = [IMGS.louvre, IMGS.franceFlag, IMGS.amazone];

const values = [
  { icon: <Lightbulb className="h-7 w-7 text-[#08227f]" />, title: "Clarté",    desc: "Des démarches simples, des explications claires, aucun jargon inutile." },
  { icon: <TrendingUp className="h-7 w-7 text-[#08227f]" />, title: "Confiance", desc: "Un partenaire que vous pouvez appeler, qui répond et qui tient ses engagements." },
  { icon: <BarChart    className="h-7 w-7 text-[#08227f]" />, title: "Impact",    desc: "Favoriser une mobilité choisie, éthique et durable, au bénéfice de tous." },
  { icon: <Users       className="h-7 w-7 text-[#08227f]" />, title: "Innovation",desc: "Des solutions adaptées au monde d'aujourd'hui, pas à celui d'hier." },
];

const milestones = [
  { year:"2020", title:"La Genèse",        desc:"Bridge Partners est né pour connecter la diaspora et les talents béninois." },
  { year:"2021", title:"Premiers Projets", desc:"Accompagnement des premières entreprises locales et investisseurs étrangers." },
  { year:"2022", title:"Expansion",        desc:"Développement de services digitaux et de solutions sur mesure." },
  { year:"2023", title:"Impact Renforcé",  desc:"Mise en place de programmes pour structurer les talents et projets de la diaspora." },
  { year:"2025", title:"Futur",            desc:"Poursuite de la mission : bâtir des ponts entre ambitions et réalisations." },
];

const stats = [
  ["200+","Projets accompagnés"],["50+","Entrepreneurs soutenus"],
  ["10+","Partenaires internationaux"],["100%","Satisfaction clients"],
];

const About = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % headerSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbff]">
      {/* ── Hero ── */}
      <section className="relative h-[70vh] overflow-hidden">
        {headerSlides.map((src, i) => (
          <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${src})`, opacity: i === slide ? 1 : 0 }} />
        ))}
        <div className="absolute inset-0 bp-hero-pattern z-[1]" />
        <div className="absolute inset-0 bg-[#08227f]/60 z-[2]" />
        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-6">
          <motion.p initial={{opacity:0}} animate={{opacity:1}} className="bp-eyebrow text-[#8fb0ff] justify-center flex mb-4">

            Notre identité
          </motion.p>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1}}
            className="bp-serif text-white font-bold leading-tight mb-3"
            style={{fontSize:"clamp(32px,6vw,68px)"}}>
            À propos de <em className="italic font-normal text-[#8fb0ff]">Bridge Partners</em>

          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.25}}
            className="text-white/70 text-[16px] font-light max-w-lg">
            Un pont entre deux mondes, une ambition : simplifier votre accès aux opportunités béninoises.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white py-14 border-b border-[#08227f]/06">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(([n, l], i) => (
            <motion.div key={l} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
              transition={{duration:.5,delay:i*.08}} viewport={{once:true}}>
              <div className="bp-serif text-[#08227f] font-bold" style={{fontSize:"clamp(28px,4vw,44px)"}}>{n}</div>
              <div className="text-[#3a4a6a] text-sm mt-1">{l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 bg-[#fafbff] bp-pattern-adinkra">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
            <p className="bp-eyebrow mb-3">Notre mission</p>
            <h2 className="bp-title mb-2">Créer des <em>ponts</em>, pas des murs</h2>
            <div className="bp-gold-line mb-5" />
            <p className="text-[#3a4a6a] text-[15px] leading-relaxed mb-4">
              Bridge Partners est né d'une conviction simple : trop d'entrepreneurs de la diaspora africaine
              renoncent à investir dans leur pays d'origine faute d'accompagnement fiable et structuré.
            </p>
            <p className="text-[#3a4a6a] text-[15px] leading-relaxed mb-6">
              Nous avons créé Bridge Partners pour être ce partenaire de confiance — entre la France et le Bénin —
              qui comprend vos besoins des deux côtés de l'Atlantique.
            </p>
            <div className="flex items-center gap-3">
              <Globe className="h-7 w-7 text-[#08227f] flex-shrink-0" />
              <span className="bp-serif italic text-[#3a4a6a] text-[17px]">
                "Parce que chaque ambition mérite un chemin clair"
              </span>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            className="relative rounded-2xl overflow-hidden shadow-xl h-80 lg:h-[420px]">
            <img src={IMGS.porteNonRetour} alt="Porte du Non-Retour"
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040f2e]/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="bp-eyebrow justify-center flex mb-3">Nos valeurs</p>
            <h2 className="bp-title">Ce qui nous <em>guide</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                transition={{duration:.5,delay:i*.08}} viewport={{once:true}}
                className="bg-[#fafbff] border border-[#08227f]/07 rounded-xl p-7 text-center">
                <div className="flex justify-center mb-4">{v.icon}</div>
                <h3 className="bp-serif text-[#08227f] text-xl font-bold mb-2">{v.title}</h3>
                <p className="text-[#3a4a6a] text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 bg-[#fafbff] bp-pattern-kente">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="bp-eyebrow justify-center flex mb-3">Notre parcours</p>
            <h2 className="bp-title">Notre <em>histoire</em></h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a84c]/20 via-[#c9a84c]/60 to-[#c9a84c]/20" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{opacity:0,x: i%2===0?-20:20}} whileInView={{opacity:1,x:0}}
                  transition={{duration:.5,delay:i*.08}} viewport={{once:true}}
                  className={`relative flex ${i%2===0?"justify-start":"justify-end"}`}>
                  <div className={`w-5/12 bg-white border border-[#08227f]/07 rounded-xl p-5 shadow-sm
                                  ${i%2===0?"mr-8 text-right":"ml-8 text-left"}`}>
                    <div className="bp-serif text-[#08227f] text-2xl font-bold">{m.year}</div>
                    <h3 className="text-[#08227f] font-semibold mt-1 mb-1">{m.title}</h3>
                    <p className="text-[#3a4a6a] text-sm leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-5 w-3.5 h-3.5 rounded-full bg-[#c9a84c] border-4 border-white shadow" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#08227f] bp-pattern-bogolan text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="bp-title bp-title-white mb-4">Travaillons <em>ensemble</em></h2>
          <p className="text-white/65 text-[15px] font-light leading-relaxed mb-8">
            Du lancement de votre entreprise à sa croissance digitale, en passant par la gestion des talents :
            Bridge Partners connecte ambitions et succès.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#08227f] text-sm font-semibold rounded-md
                         hover:bg-[#f0d896] transition-all duration-200 uppercase tracking-wider">
              Contactez-nous <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/team"
              className="inline-flex items-center gap-2 px-7 py-3 border border-white/40 text-white text-sm font-medium rounded-md
                         hover:bg-white/10 transition-all duration-200 uppercase tracking-wider">
              Nos Services
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
