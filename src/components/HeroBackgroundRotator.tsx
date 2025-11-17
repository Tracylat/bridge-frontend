import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Slide = { img: string };

const slides: Slide[] = [
  { img: "/images/benin-1.jpg" },
  { img: "/images/benin-2.jpg" },
  { img: "/images/benin-3.jpg" },
];

const DISPLAY_MS = 5000; // durée d'affichage d'une image
const FADE_MS = 800;     // durée du fondu

const HeroBackgroundRotator = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % slides.length);
        setVisible(true);
      }, FADE_MS);
    }, DISPLAY_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] lg:h-[90vh]">
      <div
        className="absolute inset-0 bg-center bg-cover transition-opacity"
        style={{
          backgroundImage: `url(${slides[index].img})`,
          transitionDuration: `${FADE_MS}ms`,
          opacity: visible ? 1 : 0,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center lg:text-left text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Excellence et <span className="text-blue-400 font-light">Innovation</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
            Une plateforme moderne pour la gestion de contenu, l'analyse de données et la découverte de nouvelles perspectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Commencer maintenant
            </Link>
            <Link
              to="/articles"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-900 transition"
            >
              Explorer les articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBackgroundRotator;
