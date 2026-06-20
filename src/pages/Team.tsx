import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Globe, Users, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

const sliderImages = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop',
];

const services = [
  {
    num: '01.',
    title: "Pôle Création d'Entreprise",
    icon: <FileText className="h-6 w-6" />,
    intro: "Créer une entreprise ne devrait pas être un parcours du combattant. Le pôle Création d'entreprise de Bridge Partners a été pensé pour simplifier les démarches, structurer votre vision et sécuriser votre lancement.",
    missions: [
      "Évaluer et valider votre idée d'entreprise à travers une étude de faisabilité",
      "Rédiger un business plan clair, précis et convaincant",
      "Accompagner dans le choix du statut juridique le plus adapté",
      "Gérer les formalités administratives (RCCM, IFU, publication GUFE, carte professionnelle)",
      "Assurer la domiciliation de votre entreprise",
      "Aider à l'ouverture de votre compte bancaire professionnel",
    ],
    why: "Parce que nous vous offrons plus qu'un accompagnement administratif : un partenaire stratégique qui comprend vos besoins, anticipe vos blocages et vous guide jusqu'à la réussite.",
  },
  {
    num: '02.',
    title: 'Pôle Rayonnement Numérique & Rédaction de Contenus',
    icon: <Globe className="h-6 w-6" />,
    intro: "À l'ère du digital, la visibilité est la nouvelle monnaie. Bridge Partners met la stratégie de contenu et le référencement (SEO) au cœur de votre croissance.",
    missions: [
      "Rédaction de contenus : articles, livres blancs, pages de vente, fiches produits, newsletters",
      "SEO et netlinking pour améliorer votre position sur Google",
      "Cocon sémantique & optimisation web pour convertir vos visiteurs",
      "Communication stratégique : Google Discover, Wikipédia, e-books, storytelling",
      "Marketing relationnel : emailings, newsletters, campagnes de fidélisation",
    ],
    why: "Parce que dans un monde numérique saturé, votre contenu est votre voix. Bridge Partners transforme votre expertise en impact digital mesurable.",
  },
  {
    num: '03.',
    title: 'Pôle Recrutement International',
    icon: <Users className="h-6 w-6" />,
    intro: "Le capital humain est la première richesse d'une entreprise. Avec notre pôle Recrutement international, Bridge Partners facilite la mise en relation entre talents béninois et entreprises françaises ou internationales.",
    missions: [
      "Mise en relation directe entre candidats et entreprises partenaires",
      "Accompagnement personnalisé des candidats (entretiens, CV, lettres de motivation)",
      "Soutien administratif pour la mobilité internationale (Campus France, visa travail)",
      "Conseil RH pour les entreprises : intégration, onboarding, gestion des talents",
    ],
    why: "Parce qu'il ne s'agit pas seulement de recruter, mais de connecter des potentiels à des projets de vie. Bridge Partners favorise une mobilité choisie, éthique et durable.",
  },
];

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F8F2E6', color: '#2C1A08' }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Hero Slider */}
      <section style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
        {sliderImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img src={img} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(28,14,4,0.85) 0%, rgba(44,26,8,0.6) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 3rem' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C07A3A', borderTop: '1px solid #C07A3A', paddingTop: '6px', marginBottom: '1.5rem', display: 'inline-block' }}>
            Bridge Partners
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, color: '#F8F2E6', lineHeight: 1.2, maxWidth: '560px', marginBottom: '1rem' }}
          >
            Nos <em style={{ fontStyle: 'italic', color: '#C07A3A' }}>services</em>
          </motion.h1>
          <p style={{ color: '#C9A96A', maxWidth: '440px', fontSize: '15px', lineHeight: 1.8, marginBottom: '2rem' }}>
            Chaque pôle de Bridge Partners agit pour simplifier, valoriser et développer vos projets.
          </p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: '#C07A3A', color: '#FDFAF3', padding: '0.8rem 2rem', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none' }}>
            Contactez-nous <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Band */}
      <div style={{ background: '#C07A3A', padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
        <span style={{ color: 'rgba(253,250,243,0.35)', fontSize: '20px' }}>✦</span>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontStyle: 'italic', color: '#FDFAF3', letterSpacing: '0.04em' }}>
          Un partenaire stratégique, du lancement à la croissance
        </p>
        <span style={{ color: 'rgba(253,250,243,0.35)', fontSize: '20px' }}>✦</span>
      </div>

      {/* Services */}
      <section style={{ padding: '5rem 2.5rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '3rem' }}>
            <div style={{ width: '32px', height: '2px', background: '#C07A3A', flexShrink: 0 }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C07A3A', fontWeight: 500 }}>Nos pôles d'expertise</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(192,122,58,0.15)', border: '1px solid rgba(192,122,58,0.15)' }}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ background: '#FDFAF3', padding: '2.5rem' }}
              >
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#C07A3A', fontWeight: 500, marginBottom: '0.75rem' }}>{service.num}</div>
                    <div style={{ color: '#C07A3A' }}>{service.icon}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 400, color: '#2C1A08', marginBottom: '1rem', lineHeight: 1.3 }}>
                      {service.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6B4A28', marginBottom: '1.25rem', lineHeight: 1.8 }}>{service.intro}</p>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {service.missions.map((m, i) => (
                        <li key={i} style={{ fontSize: '13px', color: '#6B4A28', paddingLeft: '1rem', borderLeft: '2px solid #C07A3A', lineHeight: 1.6 }}>{m}</li>
                      ))}
                    </ul>
                    <p style={{ fontSize: '13px', color: '#7C4A1E', fontStyle: 'italic', lineHeight: 1.7 }}>{service.why}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#2C1A08', padding: '5rem 2.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 400, color: '#F8F2E6', marginBottom: '1.25rem', lineHeight: 1.3 }}>
            Une expertise, un objectif : <em style={{ color: '#C07A3A', fontStyle: 'italic' }}>votre réussite</em>
          </h2>
          <p style={{ color: '#C9A96A', fontSize: '15px', marginBottom: '2.5rem', lineHeight: 1.8 }}>
            Du lancement de votre entreprise à sa croissance digitale, Bridge Partners connecte ambitions et succès.
          </p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: '#C07A3A', color: '#FDFAF3', padding: '0.8rem 2rem', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none' }}>
            Découvrir nos offres <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;