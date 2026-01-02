import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, TrendingUp, Users, BarChart, Lightbulb, ArrowRight, Mail, Linkedin, Twitter, Calendar, Award, Briefcase } from 'lucide-react';
import Footer from '../components/Footer';

const sliderImages = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop', // Équipe collaborant
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop', // Bureau moderne
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop', // Réunion professionnelle
];

const departments = [
  { id: 'all', name: 'Toute l\'équipe' },
  { id: 'leadership', name: 'Direction' },
  { id: 'tech', name: 'Technologie' },
  { id: 'business', name: 'Business' },
  { id: 'support', name: 'Support' }
];

const teamMembers = [
  {
    id: 1,
    name: 'Venance Ayinagnon',
    role: 'Fondateur & PDG',
    department: 'leadership',
    bio: 'Visionnaire entrepreneur avec plus de 15 ans d\'expérience dans la transformation digitale.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    email: 'bridgePartnersbp@gmail.com',
    linkedin: '#',
    twitter: '#',
    joinDate: '2018',
    achievements: ['Prix Entrepreneur de l\'année 2023', 'Forbes 30 Under 30']
  },
  {
    id: 2,
    name: 'Marie Laurent',
    role: 'Co-fondatrice & CTO',
    department: 'leadership',
    bio: 'Expert en intelligence artificielle et architecture logicielle.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    email: 'marie.laurent@bridgePartners.fr',
    linkedin: '#',
    twitter: '#',
    joinDate: '2018',
    achievements: ['Tech Innovation Award 2022', 'Google Developer Expert']
  },
  {
    id: 3,
    name: 'Thomas Bernard',
    role: 'Directeur Technique',
    department: 'tech',
    bio: 'Spécialiste du cloud computing et cybersécurité.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    email: 'thomas.bernard@bridgePartners.fr',
    linkedin: '#',
    twitter: '#',
    joinDate: '2019',
    achievements: ['AWS Certified Solutions Architect', 'CISSP Certification']
  },
  {
    id: 4,
    name: 'Sophie Martin',
    role: 'Directrice Marketing',
    department: 'business',
    bio: 'Créative marketing avec une passion pour les marques qui changent le monde.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    email: 'sophie.martin@bridgePartners.fr',
    linkedin: '#',
    twitter: '#',
    joinDate: '2020',
    achievements: ['Marketing Excellence Award 2023', 'Campaign of the Year']
  },
  // Ajoute ici les autres membres comme avant
];

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredTeam = selectedDepartment === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === selectedDepartment);

  const values = [
    { icon: <Lightbulb className="h-8 w-8 text-[#08227f]" />, title: "Innovation", description: "Imaginer des solutions audacieuses, adaptées aux réalités du marché béninois." },
    { icon: <TrendingUp className="h-8 w-8 text-[#08227f]" />, title: "Excellence", description: "Garantir un accompagnement de qualité, précis et rigoureux." },
    { icon: <BarChart className="h-8 w-8 text-[#08227f]" />, title: "Impact", description: "Mesurer notre succès à travers la réussite de nos clients et la transformation locale." },
    { icon: <Users className="h-8 w-8 text-[#08227f]" />, title: "Humanité", description: "Placer la confiance, l’écoute et la bienveillance au cœur de chaque mission." }
  ];

  const milestones = [
    { year: "2020", title: "La Genèse", description: "Bridge Partners est né pour connecter la diaspora et les talents locaux béninois." },
    { year: "2021", title: "Premiers Projets", description: "Accompagnement des premières entreprises locales et investisseurs étrangers." },
    { year: "2022", title: "Expansion", description: "Développement de services digitaux et de solutions sur mesure." },
    { year: "2023", title: "Impact Renforcé", description: "Mise en place de programmes pour structurer les talents et projets de la diaspora." },
    { year: "2025", title: "Futur", description: "Poursuite de la mission : bâtir des ponts entre ambitions et réalisations." }
  ];

  const stats = [
    { number: "200+", label: "Projets accompagnés" },
    { number: "50+", label: "Entrepreneurs soutenus" },
    { number: "10+", label: "Partenaires internationaux" },
    { number: "100%", label: "Satisfaction clients" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {sliderImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-4xl md:text-6xl font-bold text-white mb-4">
            Notre Histoire
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-xl md:text-2xl text-gray-200 max-w-2xl">
            Bridge Partners connecte talents, investisseurs et projets pour transformer les ambitions en réalité.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }} className="mt-8 flex gap-4">
            <Link to="/contact" className="inline-flex items-center justify-center bg-white text-[#08227f] px-8 py-3 rounded-lg font-medium hover:bg-[#e6ecff] transition-colors">
              Contactez-nous <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                <div className="text-3xl md:text-4xl font-bold text-[#08227f] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#08227f] mb-6">Notre Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Simplifier, professionnaliser et accélérer les projets entrepreneuriaux de la diaspora, des investisseurs et des entreprises locales.
              </p>
              <ul className="list-disc pl-5 text-gray-600 mb-6">
                <li>Création d’entreprise et gestion administrative</li>
                <li>Développement digital et mise en lumière des marques</li>
                <li>Recrutement international et mobilité professionnelle</li>
              </ul>
              <div className="flex items-center space-x-4">
                <Globe className="h-8 w-8 text-[#08227f]" />
                <span className="text-lg font-medium text-[#08227f]">Impact local et portée internationale</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#08227f] mb-4">Nos Valeurs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">L’essence de Bridge Partners</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="text-center p-6">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-[#08227f] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#08227f] mb-4">Notre Histoire</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Les moments clés qui ont façonné notre parcours</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8 order-1'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-[#08227f] mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-[#08227f] mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#08227f] rounded-full border-4 border-white"></div>
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#08227f] mb-4">Notre Équipe</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Découvrez les talents derrière notre succès</p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map(dept => (
              <button key={dept.id} onClick={() => setSelectedDepartment(dept.id)} className={`px-6 py-2 rounded-full font-medium transition-all ${selectedDepartment === dept.id ? 'bg-[#08227f] text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                {dept.name}
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTeam.map((member, index) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col items-center">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full object-cover mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-1">{member.name}</h3>
                <p className="text-[#08227f] text-center font-medium mb-3">{member.role}</p>
                {member.joinDate && <p className="text-gray-500 text-sm mb-1 flex items-center gap-1"><Calendar className="h-4 w-4" /> {member.joinDate}</p>}
                <p className="text-gray-600 text-sm mb-4 text-center line-clamp-3">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  {member.email && <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-[#08227f]"><Mail className="h-4 w-4" /></a>}
                  {member.linkedin && <a href={member.linkedin} className="text-gray-400 hover:text-[#08227f]"><Linkedin className="h-4 w-4" /></a>}
                  {member.twitter && <a href={member.twitter} className="text-gray-400 hover:text-[#08227f]"><Twitter className="h-4 w-4" /></a>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#08227f] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vous êtes entrepreneur ou investisseur ?</h2>
            <p className="text-xl mb-8">Votre ambition mérite un accompagnement à la hauteur.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center bg-white text-[#08227f] px-8 py-3 rounded-lg font-medium hover:bg-[#e6ecff] transition-colors">Démarrez votre projet</Link>
              <Link to="/about" className="inline-flex items-center justify-center border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#08227f] transition-colors">En savoir plus</Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
