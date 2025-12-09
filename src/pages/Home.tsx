// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Users, Globe, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

// ---------------------- Types ----------------------
type Slide = { img: string };

// ---------------------- Data ----------------------
const heroSlides: Slide[] = [
  { img: "/images/benin-1.jpg" },
  { img: "/images/benin-2.jpg" },
  { img: "/images/france-1.jpg" },
];

const DISPLAY_MS = 5000;
const FADE_MS = 800;

const features = [
  { icon: <TrendingUp className="h-8 w-8 text-[#08227f]" />, title: "Performance", description: "Solutions optimisées pour des résultats exceptionnels" },
  { icon: <Shield className="h-8 w-8 text-[#08227f]" />, title: "Sécurité", description: "Protection avancée de vos données et confidentialité" },
  { icon: <Users className="h-8 w-8 text-[#08227f]" />, title: "Expertise", description: "Une équipe dédiée à votre succès" },
  { icon: <Globe className="h-8 w-8 text-[#08227f]" />, title: "Global", description: "Présence internationale et vision locale" },
  { icon: <BarChart className="h-8 w-8 text-[#08227f]" />, title: "Analytique", description: "Décisions basées sur des données précises" },
];

const articles = [
  { id: 1, title: "Les nouvelles tendances du marché", excerpt: "Découvrez les dernières évolutions qui transforment notre secteur...", date: "15 Oct 2025", category: "Analyse" },
  { id: 2, title: "Innovation et technologie", excerpt: "Comment les nouvelles technologies redéfinissent nos standards...", date: "12 Oct 2025", category: "Technologie" },
  { id: 3, title: "Perspectives futures", excerpt: "Anticiper les changements pour mieux se préparer...", date: "08 Oct 2025", category: "Stratégie" },
];

// ---------------------- Hero Rotator (cross-fade without white flash) ----------------------
const HeroBackgroundRotator: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(index);
      setIsTransitioning(true);

      // after FADE_MS, switch to next image and clear transitioning state
      setTimeout(() => {
        setIndex((i) => (i + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, FADE_MS);
    }, DISPLAY_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <section className="relative w-full h-[80vh] lg:h-[90vh] overflow-hidden" aria-label="Hero">
      {/* previous image: fades out */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity"
        style={{
          backgroundImage: `url(${heroSlides[prevIndex].img})`,
          opacity: isTransitioning ? 0 : 1,
          transitionDuration: `${FADE_MS}ms`,
        }}
        aria-hidden
      />

      {/* current image: stays visible, will also be visible during transition to avoid gaps */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity"
        style={{
          backgroundImage: `url(${heroSlides[index].img})`,
          opacity: 1,
          transitionDuration: `${FADE_MS}ms`,
        }}
        aria-hidden
      />

      {/* dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center lg:text-left text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Bridge Partners
            <span className="block text-[#82aaff] font-light text-2xl mt-2">Créer un pont, connecter des ambitions...</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
            Faciliter la création, la domiciliation et la gestion d'entreprises au Bénin pour la diaspora et les investisseurs étrangers
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#08227f] text-white font-semibold rounded-lg shadow-lg hover:bg-[#041a60] transition-transform hover:scale-105"
            >
              Contactez-nous
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              to="/articles"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#08227f] transition-transform hover:scale-105"
            >
              Explorer les articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};



// ---------------------- Home Component ----------------------
const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[#08227f]">
      <HeroBackgroundRotator />

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#041a60] to-[#08227f] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow">Nos Services</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">Des solutions sur mesure pour vos projets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 bg-white text-[#08227f] rounded-xl hover:bg-[#e6ecff] transition-all duration-300 shadow-md border border-[#08227f]/10"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#041a60]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#041a60] to-[#08227f] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-xl text-gray-200 mb-8">Contactez-nous dès aujourd'hui pour donner vie à votre projet</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#08227f] font-semibold rounded-lg shadow-lg hover:bg-[#e6ecff] transition">
              Contactez-nous
            </Link>

            <Link to="/benin" className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#08227f] transition">
              Découvrir le Bénin
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

