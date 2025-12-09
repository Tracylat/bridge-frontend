import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Article } from '../types/Article';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';

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

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero / Featured */}
      <section className="relative">
        {featured ? (
          <div className="relative h-[420px] md:h-[520px] bg-gray-100">
            <img src={featured.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&h=700&fit=crop'} alt={featured.title} className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
              <div className="max-w-5xl mx-auto px-6 lg:px-12 text-white">
                <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
                  {featured.title}
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4 text-lg md:text-xl text-gray-100/95 max-w-2xl">
                  {featured.description}
                </motion.p>
                <div className="mt-6">
                  <Link to={`/article/${featured.id}`} className="inline-block bg-white text-[#08227f] font-semibold px-5 py-3 rounded-full shadow hover:shadow-lg">
                    Lire l'article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-48 md:h-64 bg-gradient-to-r from-[#08227f] to-[#1a3bb8] flex items-center justify-center text-white">
            <h1 className="text-3xl font-bold">Nos Articles</h1>
          </div>
        )}
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {loading ? (
          <p className="text-center text-gray-600">Chargement des articles…</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-600">Aucun article disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rest.map((a, i) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="bg-white rounded-2xl p-6 shadow">
                <h4 className="text-lg font-semibold mb-4">Abonnez‑vous</h4>
                <p className="text-sm text-gray-600">Recevez les dernières nouvelles et articles directement dans votre boîte mail.</p>
                <div className="mt-4">
                  <input className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Votre email" />
                  <button className="mt-3 w-full bg-[#08227f] text-white px-4 py-2 rounded-lg">S'abonner</button>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-2xl p-6 shadow">
                <h4 className="text-lg font-semibold mb-3">Articles récents</h4>
                <div className="flex flex-col gap-3">
                  {articles.slice(0, 5).map((a) => (
                    <Link key={a.id} to={`/article/${a.id}`} className="text-sm text-gray-700 hover:text-[#08227f]">{a.title}</Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
