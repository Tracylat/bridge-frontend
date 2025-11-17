import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

// Slider images pour l'entête
const headerSlides = [
  '/images/slider1.jpg', // Bénin / culture / ville
  '/images/slider2.jpg', // Bureau / équipe
  '/images/slider3.jpg', // Diaspora / projet
];

// Images pour les sections (exemple)
const sectionImages = {
  transformation: '/images/benin-transformation.jpg',
  reforms: '/images/benin-reforms.jpg',
  innovation: '/images/benin-innovation.jpg',
  sectors: '/images/benin-sectors.jpg',
  discovery: '/images/benin-discovery.jpg',
  invest: '/images/benin-invest.jpg'
};

const Benin2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % headerSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const primaryBlue = "#0D4F8B"; // Couleur proche du logo

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative h-[90vh] w-full">
        <div
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${headerSlides[currentSlide]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-[rgba(13,79,139,0.6)] z-20"></div>
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Bénin 2.0 : Une nation en mouvement
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
            Terre d’opportunités, d’innovation et de développement durable.
          </p>
          <Link
            to="#sections"
            className="inline-flex items-center bg-white text-[#0D4F8B] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Découvrir le Bénin
            <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
          </Link>
        </div>
      </section>

      {/* Sections */}
      <div id="sections" className="space-y-24">

        {/* Section 1 – Transformation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Un pays en pleine transformation
            </h2>
            <p className="text-gray-600 mb-4">
              Le Bénin vit une profonde mutation économique, technologique et institutionnelle.
              Réformes structurelles, digitalisation des services publics, stabilité politique, croissance soutenue (+6,4 %) : tout concourt à en faire l’un des pays les plus attractifs d’Afrique de l’Ouest.
            </p>
            <p className="text-gray-600">
              Aujourd’hui, le Bénin 2.0, c’est un pays qui avance, s’organise et crée de la valeur pour ses citoyens et pour sa diaspora.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src={sectionImages.transformation} alt="Transformation Bénin" className="rounded-xl shadow-lg"/>
          </div>
        </section>

        {/* Section 2 – Réformes */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Des réformes qui facilitent la création et l’investissement
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Délai moyen pour créer une entreprise : 5 jours ouvrables</li>
              <li>Procédures entièrement digitalisées via la plateforme GUFE</li>
              <li>Encadrement juridique clair et transparent</li>
              <li>Paiements et enregistrements en ligne</li>
            </ul>
            <p className="text-gray-600">
              Le pays attire également les investisseurs étrangers par des avantages fiscaux compétitifs, une zone économique spéciale via la GDIZ, et une stabilité monétaire garantie par l’UEMOA.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src={sectionImages.reforms} alt="Réformes Bénin" className="rounded-xl shadow-lg"/>
          </div>
        </section>

        {/* Section 3 – Innovation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Les pôles de croissance et d’innovation
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Sèmè City – campus moderne dédié à la recherche et l’entrepreneuriat</li>
              <li>GDIZ – hub industriel et logistique</li>
              <li>Parc Technologique d’Abomey-Calavi – économie numérique et emploi des jeunes</li>
              <li>Port de Cotonou modernisé – levier du commerce régional</li>
            </ul>
            <p className="text-gray-600">
              Bridge Partners collabore avec les acteurs institutionnels et privés pour connecter la diaspora aux opportunités béninoises.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src={sectionImages.innovation} alt="Innovation Bénin" className="rounded-xl shadow-lg"/>
          </div>
        </section>

        {/* Section 4 – Secteurs porteurs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Secteurs porteurs au Bénin
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Agro-industrie et transformation locale</li>
              <li>Énergies renouvelables : solaire et biomasse</li>
              <li>Immobilier et construction</li>
              <li>Technologies numériques : startups, fintech, e-commerce</li>
              <li>Éducation et formation</li>
              <li>Tourisme et culture</li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <img src={sectionImages.sectors} alt="Secteurs Bénin" className="rounded-xl shadow-lg"/>
          </div>
        </section>

        {/* Section 5 – Découverte */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Le Bénin, un joyau à découvrir
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Cotonou – capitale économique vibrante</li>
              <li>Abomey – cité royale, patrimoine mondial UNESCO</li>
              <li>Ganvié – la “Venise d’Afrique”</li>
              <li>La Pendjari – réserve naturelle emblématique</li>
              <li>Porto-Novo – capitale culturelle</li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <img src={sectionImages.discovery} alt="Découverte Bénin" className="rounded-xl shadow-lg"/>
          </div>
        </section>

        {/* Section 6 – Investir */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi investir au Bénin avec Bridge Partners ?
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Étude d’opportunités et business plan</li>
              <li>Conseil juridique et fiscal</li>
              <li>Création et domiciliation d’entreprise</li>
              <li>Mise en relation avec acteurs économiques et institutionnels</li>
              <li>Stratégies d’implantation et de croissance</li>
            </ul>
            <p className="text-gray-600">
              Avec Bridge Partners, vous investissez dans un Bénin structuré, compétitif et tourné vers l’avenir.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src={sectionImages.invest} alt="Investir Bénin" className="rounded-xl shadow-lg"/>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 bg-[#0D4F8B] text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à concrétiser votre projet au Bénin 2.0 ?
          </h2>
          <p className="text-xl mb-8">
            Contactez Bridge Partners pour exploiter les meilleures opportunités du pays.
          </p>
          <Link
            to="/contact"
            className="bg-white text-[#0D4F8B] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Contactez Bridge Partners
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Benin2;
