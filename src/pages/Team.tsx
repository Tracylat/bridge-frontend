import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Globe, Users, Lightbulb, ArrowRight } from 'lucide-react';

// Slider images
const sliderImages = [
  '/images/slider1.jpg', // Exemple : image Bénin / culture / ville
  '/images/slider2.jpg', // Exemple : image bureau / équipe
  '/images/slider3.jpg', // Exemple : image diaspora / projet
];

const services = [
  {
    title: "Pôle Création d’Entreprise",
    icon: <FileText className="h-8 w-8 text-[#08227f]" />,
    intro: "Créer une entreprise ne devrait pas être un parcours du combattant. Le pôle Création d’entreprise de Bridge Partners a été pensé pour simplifier les démarches, structurer votre vision et sécuriser votre lancement.",
    missions: [
      "Évaluer et valider votre idée d’entreprise à travers une étude de faisabilité",
      "Rédiger un business plan clair, précis et convaincant",
      "Accompagner dans le choix du statut juridique le plus adapté",
      "Gérer les formalités administratives (RCCM, IFU, publication GUFE, carte professionnelle)",
      "Assurer la domiciliation de votre entreprise",
      "Aider à l’ouverture de votre compte bancaire professionnel"
    ],
    why: "Parce que nous vous offrons plus qu’un accompagnement administratif : un partenaire stratégique, qui comprend vos besoins, anticipe vos blocages et vous guide avec clarté et efficacité jusqu’à la réussite."
  },
  {
    title: "Pôle Rayonnement Numérique & Rédaction de Contenus",
    icon: <Lightbulb className="h-8 w-8 text-[#08227f]" />,
    intro: "À l’ère du digital, la visibilité est la nouvelle monnaie. Bridge Partners met la stratégie de contenu et le référencement (SEO) au cœur de votre croissance.",
    missions: [
      "Rédaction de contenus : articles, livres blancs, pages de vente, fiches produits, newsletters",
      "SEO et netlinking pour améliorer votre position sur Google",
      "Cocon sémantique & optimisation web pour convertir vos visiteurs",
      "Communication stratégique : Google Discover, Wikipédia, e-books, storytelling",
      "Marketing relationnel : emailings, newsletters, campagnes de fidélisation et de prospection"
    ],
    why: "Parce que dans un monde numérique saturé, votre contenu est votre voix. Bridge Partners transforme votre expertise en impact digital mesurable : plus de visibilité, plus de crédibilité, plus de ventes."
  },
  {
    title: "Pôle Recrutement International",
    icon: <Users className="h-8 w-8 text-[#08227f]" />,
    intro: "Le capital humain est la première richesse d’une entreprise. Avec notre pôle Recrutement international, Bridge Partners facilite la mise en relation entre talents béninois et entreprises françaises ou internationales.",
    missions: [
      "Mise en relation directe entre candidats et entreprises partenaires",
      "Accompagnement personnalisé des candidats (entretiens, CV, lettres de motivation, orientation)",
      "Soutien administratif et logistique pour la mobilité internationale (Campus France, visa travail)",
      "Conseil RH pour les entreprises : intégration, onboarding, gestion des talents à distance"
    ],
    why: "Parce qu’il ne s’agit pas seulement de recruter, mais de connecter des potentiels à des projets de vie. Bridge Partners favorise une mobilité choisie, éthique et durable."
  }
];

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {sliderImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Overlay Texte */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Nos Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl"
          >
            Chaque pôle de Bridge Partners agit pour simplifier, valoriser et développer vos projets.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 flex gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white text-[#08227f] px-8 py-3 rounded-lg font-medium hover:bg-[#e6ecff] transition-colors"
            >
              Contactez-nous
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-[#08227f]">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.intro}</p>
                <ul className="list-disc pl-5 mb-4 text-gray-600">
                  {service.missions.map((mission, i) => (
                    <li key={i} className="mb-2">{mission}</li>
                  ))}
                </ul>
                <p className="text-gray-700 font-medium">{service.why}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#08227f] text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Une expertise, un objectif : votre réussite
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl mb-8 max-w-2xl mx-auto"
        >
          Du lancement de votre entreprise à sa croissance digitale, en passant par la gestion des talents : Bridge Partners connecte ambitions et succès.
        </motion.p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center bg-white text-[#08227f] px-8 py-3 rounded-lg font-medium hover:bg-[#e6ecff] transition-colors"
        >
          Découvrez nos offres
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>
    </div>
  );
};

export default Services;
