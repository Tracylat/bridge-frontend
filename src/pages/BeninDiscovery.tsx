import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import { IMGS } from "../assets/images";

const headerSlides = [IMGS.amazone, IMGS.ganvie, IMGS.monument];

interface Section {
  title: string;
  content: React.ReactNode;
  img: string;
  caption: string;
  reverse?: boolean;
}

const sections: Section[] = [
  {
    title: "Un pays en pleine transformation",
    img: IMGS.ganvie,
    caption: "Ganvié – La Venise d'Afrique",
    content: (
      <>
        <p className="text-[#3a4a6a] text-[15px] leading-relaxed mb-4">
          Le Bénin vit une profonde mutation économique, technologique et institutionnelle.
          Réformes structurelles, digitalisation des services publics, stabilité politique,
          croissance soutenue (+6,4 %) : tout concourt à en faire l'un des pays les plus
          attractifs d'Afrique de l'Ouest.
        </p>
        <p className="text-[#3a4a6a] text-[15px] leading-relaxed">
          Aujourd'hui, le Bénin 2.0, c'est un pays qui avance, s'organise et crée de la valeur
          pour ses citoyens et pour sa diaspora.
        </p>
      </>
    ),
  },
  {
    title: "Des réformes qui facilitent l'investissement",
    img: IMGS.monument,
    caption: "Monument des Martyrs, Cotonou",
    reverse: true,
    content: (
      <ul className="space-y-2 text-[#3a4a6a] text-[15px]">
        {["Délai moyen pour créer une entreprise : 5 jours ouvrables","Procédures entièrement digitalisées via la plateforme GUFE","Encadrement juridique clair et transparent","Paiements et enregistrements en ligne"].map(t=>(
          <li key={t} className="flex gap-3">
            <span className="text-[#c9a84c] mt-1 flex-shrink-0">◆</span>{t}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Les pôles de croissance et d'innovation",
    img: IMGS.egungunDanse,
    caption: "Egungun – Culture béninoise",
    content: (
      <ul className="space-y-2 text-[#3a4a6a] text-[15px]">
        {["Sèmè City – campus moderne dédié à la recherche","GDIZ – hub industriel et logistique","Parc Technologique d'Abomey-Calavi","Port de Cotonou modernisé – levier du commerce régional"].map(t=>(
          <li key={t} className="flex gap-3"><span className="text-[#c9a84c] mt-1 flex-shrink-0">◆</span>{t}</li>
        ))}
      </ul>
    ),
  },
  {
    title: "Secteurs porteurs au Bénin",
    img: IMGS.archiOrange,
    caption: "Architecture coloniale, Cotonou",
    reverse: true,
    content: (
      <ul className="space-y-2 text-[#3a4a6a] text-[15px]">
        {["Agro-industrie et transformation locale","Énergies renouvelables : solaire et biomasse","Immobilier et construction","Technologies numériques : startups, fintech","Éducation et formation","Tourisme et culture"].map(t=>(
          <li key={t} className="flex gap-3"><span className="text-[#c9a84c] mt-1 flex-shrink-0">◆</span>{t}</li>
        ))}
      </ul>
    ),
  },
  {
    title: "Le Bénin, un joyau à découvrir",
    img: IMGS.ouidahSign,
    caption: "Cité historique de Ouidah",
    content: (
      <ul className="space-y-2 text-[#3a4a6a] text-[15px]">
        {["Cotonou – capitale économique vibrante","Abomey – cité royale, patrimoine UNESCO","Ganvié – la « Venise d'Afrique »","La Pendjari – réserve naturelle emblématique","Porto-Novo – capitale culturelle","Ouidah – mémoire de l'histoire atlantique"].map(t=>(
          <li key={t} className="flex gap-3"><span className="text-[#c9a84c] mt-1 flex-shrink-0">◆</span>{t}</li>
        ))}
      </ul>
    ),
  },
  {
    title: "Pourquoi investir avec Bridge Partners ?",
    img: IMGS.porteNonRetour,
    caption: "Porte du Non-Retour, Ouidah",
    reverse: true,
    content: (
      <>
        <ul className="space-y-2 text-[#3a4a6a] text-[15px] mb-4">
          {["Étude d'opportunités et business plan","Conseil juridique et fiscal","Création et domiciliation d'entreprise","Mise en relation avec acteurs économiques","Stratégies d'implantation et de croissance"].map(t=>(
            <li key={t} className="flex gap-3"><span className="text-[#c9a84c] mt-1 flex-shrink-0">◆</span>{t}</li>
          ))}
        </ul>
        <p className="text-[#3a4a6a] text-[15px] leading-relaxed">
          Avec Bridge Partners, vous investissez dans un Bénin structuré, compétitif et tourné vers l'avenir.
        </p>
      </>
    ),
  },
];

const BeninDiscovery = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % headerSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbff]">
      {/* ── Hero ── */}
      <section className="relative h-[85vh] overflow-hidden">
        {headerSlides.map((src, i) => (
          <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${src})`, opacity: i === slide ? 1 : 0 }} />
        ))}
        <div className="absolute inset-0 bp-hero-pattern z-[1]" />
        <div className="absolute inset-0 bg-[#08227f]/60 z-[2]" />
        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-6">
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8}}
            className="bp-eyebrow text-[#f0d896] justify-center flex mb-4">
            Terre d'Afrique de l'Ouest
          </motion.p>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.1}}
            className="bp-serif text-white font-bold leading-[1.05] mb-4"
            style={{fontSize:"clamp(36px,6vw,72px)"}}>
            Bénin 2.0 : <em className="italic font-normal text-[#f0d896]">une nation en mouvement</em>
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.9,delay:.25}}
            className="text-white/70 text-[17px] font-light max-w-xl mb-8">
            Terre d'opportunités, d'innovation et de développement durable.
          </motion.p>
          <motion.a href="#sections" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.9,delay:.4}}
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#08227f] text-sm font-semibold rounded-md
                       hover:bg-[#f0d896] transition-all duration-200 uppercase tracking-wider">
            Découvrir <ArrowDown className="h-4 w-4 animate-bounce" />
          </motion.a>
        </div>
      </section>

      {/* ── Sections ── */}
      <div id="sections" className="max-w-7xl mx-auto px-6 divide-y divide-[#08227f]/06">
        {sections.map((s, i) => (
          <motion.div key={i}
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
            transition={{duration:.6,delay:.05}} viewport={{once:true}}
            className={`py-16 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${s.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
            {/* Text */}
            <div>
              <h2 className="bp-title mb-4" style={{fontSize:"clamp(24px,3vw,38px)"}}>{s.title}</h2>
              <div className="bp-gold-line mb-5" />
              {s.content}
            </div>
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-72 lg:h-96">
              <img src={s.img} alt={s.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040f2e]/50 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white text-xs font-medium tracking-wide opacity-90">{s.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Culture gallery ── */}
      <section className="py-16 bg-[#08227f] relative overflow-hidden">
        <div className="absolute inset-0 bp-hero-pattern opacity-60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="bp-eyebrow text-[#f0d896] justify-center flex mb-3">Richesse immatérielle</p>
            <h2 className="bp-title bp-title-white">L'âme du <em>Bénin</em></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-64">
            {[[IMGS.masqueIvoire,"Art royal"],[IMGS.bronze,"Bronzes"],[IMGS.artContemp,"Art contemporain"],[IMGS.femme,"Traditions"]].map(([src,lbl])=>(
              <div key={lbl} className="relative rounded-xl overflow-hidden group">
                <img src={src} alt={lbl} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040f2e]/75 to-transparent" />
                <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-medium">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#08227f] bp-pattern-bogolan text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="bp-title bp-title-white mb-4">Prêt à <em>concrétiser</em> votre projet au Bénin ?</h2>
          <p className="text-white/65 text-[15px] font-light leading-relaxed mb-8">
            Contactez Bridge Partners et transformez votre vision en réalité avec un partenaire de confiance.
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

export default BeninDiscovery;
