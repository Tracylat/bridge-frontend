import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Article } from '../types/Article';
import { ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

const sliderImage = '/images/slider1.jpg';

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setArticles(data || []);
    } catch (err: any) {
      console.error('fetchArticles:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Header */}
      <section
        className="relative h-[400px] md:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${sliderImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-2"
          >
            Nos Articles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl"
          >
            Découvrez nos dernières actualités, projets et initiatives.
          </motion.p>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {loading ? (
          <p className="text-center text-gray-600">Chargement des articles…</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-600">Aucun article disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a, index) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <Link to={`/article/${a.id}`}>
                  <div className="h-48 w-full overflow-hidden">
                    {a.image_url ? (
                      <img
                        src={a.image_url}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        Pas d'image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{a.title}</h2>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {(a as any).description ?? a.content.substring(0, 100) + '...'}
                    </p>
                    <span className="inline-flex items-center mt-4 text-[#08227f] font-medium hover:underline">
                      Lire l'article <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
