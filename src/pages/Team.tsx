import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Scale, Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import { IMGS } from "../assets/images";

const headerSlides = [IMGS.louvre, IMGS.amazone, IMGS.egungunDanse];

const services = [
  {
    icon: <Briefcase className="h-8 w-8 text-[#08227f]" />,
    title: "Pôle Conseil aux Entreprises",
    intro:
      "Créer et développer une entreprise au Bénin ou en France, c'est naviguer dans un environnement administratif complexe, des exigences juridiques précises et un marché en pleine évolution. Bridge Partners vous apporte l'expertise et le réseau pour transformer votre ambition en réalité.",
    missions: [
      "Évaluation de l'idée et rédaction du business plan",
      "Choix du statut juridique et rédaction des statuts",
      "Immatriculation RCCM / IFU / NIF et publication GUFE",
      "Domiciliation et ouverture de compte bancaire professionnel",
      "Recrutement, formation et gestion RH des équipes dirigeantes",
      "Conseil stratégique sur mesure et mise en relation avec nos partenaires",
    ],
    why:
      "Parce que nous vous offrons plus qu'un accompagnement administratif : un partenaire stratégique qui vous guide avec clarté jusqu'à la réussite.",
  },
  {
    icon: <Scale className="h-8 w-8 text-[#08227f]" />,
    title: "Pôle Marchés Publics & Conseil Juridique",
    intro:
      "Au Bénin, la commande publique représente une part considérable de l'économie, mais de nombreuses PME en sont exclues faute de maîtriser les procédures et les subtilités juridiques des appels d'offres. Bridge Partners comble cet écart, de la veille jusqu'à l'exécution du marché.",
    missions: [
      "Veille et identification des appels d'offres",
      "Montage des dossiers de candidature",
      "Assistance à Maîtrise d'Ouvrage (AMO) et suivi d'exécution",
      "Audit juridique et rédaction de contrats",
      "Conseil en droit des affaires OHADA et droit du travail",
      "Gestion des contentieux et procédures judiciaires",
    ],
    why:
      "Parce que les marchés publics sont une opportunité, et que la sécurité juridique protège durablement votre activité.",
  },
  {
    icon: <Cpu className="h-8 w-8 text-[#08227f]" />,
    title: "Pôle Services Numériques",
    intro:
      "La transformation digitale bouleverse tous les secteurs. Au Bénin comme en France, la digitalisation des processus est devenue un impératif de compétitivité. Bridge Partners vous accompagne avec des solutions concrètes, adaptées à votre taille et à vos objectifs.",
    missions: [
      "Création de sites web (vitrine, e-commerce) et applications mobiles",
      "Identité visuelle, réseaux sociaux et stratégie de contenu",
      "Référencement naturel (SEO) et maintenance technique",
      "Audit digital et élaboration de la stratégie de transformation",
      "Intégration de solutions ERP, CRM et outils collaboratifs",
      "Data analytics, tableaux de bord et formation des équipes",
    ],
    why:
      "Parce que le numérique n'est plus une option : c'est votre prochain avantage compétitif.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-[#08227f]" />,
    title: "Pôle Analyse des Risques & Intelligence Stratégique",
    intro:
      "Dans un environnement géopolitique et économique instable, États et institutions font face à des menaces complexes — criminalité organisée, blanchiment de capitaux, financement du terrorisme, corruption. Bridge Partners met à leur service une expertise rare en intelligence criminelle et en analyse stratégique des risques.",
    missions: [
      "Cartographie et évaluation des risques sécuritaires et financiers",
      "Évaluation des dispositifs LCB-FT et audit de contrôle interne",
      "Accompagnement lors des évaluations GAFI",
      "Collecte, traitement et rédaction de rapports d'intelligence",
      "Détection des flux financiers illicites et analyse des réseaux criminels",
      "Formation et renforcement des capacités des agents spécialisés",
    ],
    why:
      "Parce qu'anticiper les menaces, c'est déjà les neutraliser — au service exclusif des États et institutions internationales.",
  },
];

const Team = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % headerSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbff]">
      {/* ── Hero ── */}
      <section className="relative h-[65vh] overflow-hidden">
        {headerSlides.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${src})`, opacity: i === slide ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bp-hero-pattern z-[1]" />
        <div className="absolute inset-0 bg-[#08227f]/60 z-[2]" />
        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bp-eyebrow text-[#8fb0ff] justify-center flex mb-4"
          >
            Ce que nous faisons
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bp-serif text-white font-bold leading-tight"
            style={{ fontSize: "clamp(32px,6vw,68px)" }}
          >
            Nos <em className="italic font-normal text-[#8fb0ff]">Services</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-white/70 text-[16px] font-light max-w-lg mt-3"
          >
            Quatre pôles d'expertise complémentaires pour accompagner vos projets entre la France et le Bénin.
          </motion.p>
        </div>
      </section>

      {/* ── Service cards ── */}
      <section className="py-20 bp-pattern-kente">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white border border-[#08227f]/08 rounded-2xl p-8 relative overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
              >
                {/* Corner deco */}
                <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full border border-[#08227f]/04" />
                <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full border border-[#1a45b0]/08" />

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#08227f] to-[#8fb0ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                <div className="w-14 h-14 bg-[#e6ecff] rounded-xl flex items-center justify-center mb-6 relative z-10">
                  {s.icon}
                </div>
                <h3 className="bp-serif text-[#08227f] text-2xl font-bold mb-4 leading-tight">{s.title}</h3>
                <p className="text-[#3a4a6a] text-[14px] leading-relaxed mb-5">{s.intro}</p>
                <ul className="space-y-2 mb-5">
                  {s.missions.map((m, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[13px] text-[#3a4a6a] border-b border-[#08227f]/04 pb-2"
                    >
                      <span className="text-[#1a45b0] mt-0.5 flex-shrink-0">→</span>
                      {m}
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
          <p className="bp-eyebrow justify-center flex text-[#8fb0ff] mb-3">Une expertise, un objectif</p>
          <h2 className="bp-title bp-title-white mb-4">
            Votre <em>réussite</em>
          </h2>
          <p className="text-white/65 text-[15px] font-light leading-relaxed mb-8">
            Du lancement de votre entreprise à sa croissance digitale, en passant par la sécurisation juridique et
            l'analyse des risques : Bridge Partners connecte ambitions et succès entre la France et le Bénin.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#08227f] text-sm font-semibold rounded-md hover:bg-[#8fb0ff] transition-all duration-200 uppercase tracking-wider"
          >
            Découvrez nos offres <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;