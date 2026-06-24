import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  // France - Paris / Eiffel
  'https://images.unsplash.com/photo-1529429617335-2a9b4b66b3a6?w=2000&q=80&auto=format&fit=crop',
  // France - modern city
  'https://images.unsplash.com/photo-1505765053382-9f3f09d2f2c9?w=2000&q=80&auto=format&fit=crop',
  // Benin - Ganvie / lagoon
  'https://images.unsplash.com/photo-1566401233439-7a4a2b197d0e?w=2000&q=80&auto=format&fit=crop',
  // Benin - culture / mask
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=2000&q=80&auto=format&fit=crop'
];

const DISPLAY_MS = 5500;
const FADE_MS = 900;

const HeroCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), DISPLAY_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full h-[78vh] md:h-[86vh] adenka-hero">
      {images.map((src, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: FADE_MS / 1000 }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />

      <div className="relative z-20 hero-inner flex items-center h-full">
        <div className="text-white max-w-3xl">
          <h1 className="hero-title-large font-extrabold mb-3">Bridge Partners — Connecter la diaspora et l'innovation</h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">Accompagnement, domiciliation et création d'entreprises entre la France et le Bénin.</p>
          <div className="flex gap-3">
            <a href="/contact" className="adenka-cta">Contactez-nous</a>
            <a href="/articles" className="inline-flex items-center px-5 py-3 rounded-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition">Voir les articles</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
