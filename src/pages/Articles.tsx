import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Article } from '../types/Article';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import useNews from '../hooks/useNews';

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

  const { items: beninItems, loading: beninLoading } = useNews('benin', 2);
  const { items: franceItems, loading: franceLoading } = useNews('france', 2);

  return (
    <div id="page-articles" className="page active">
      <section className="hero small">
        <div className="hero-content container">
          <div className="hero-eyebrow">Ressources</div>
          <h1 className="hero-title">Nos <em>Articles</em></h1>
          <p className="hero-sub">Analyses, perspectives et actualités pour mieux comprendre les enjeux entre la France et le Bénin.</p>
        </div>
      </section>

      <main className="container">
        {loading ? (
          <p className="text-center text-gray-600 py-12">Chargement des articles…</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-600 py-12">Aucun article disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="card bg-white p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4">Actualités — Bénin</h3>
                  {beninLoading ? (
                    <p>Chargement…</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {beninItems.map((it, idx) => (
                        <a key={idx} href={it.link} target="_blank" rel="noreferrer" className="flex items-start gap-4 hover:bg-gray-50 p-2 rounded">
                          {it.thumbnail ? <img src={it.thumbnail} alt="thumb" className="w-20 h-14 object-cover rounded" /> : <div className="w-20 h-14 bg-gray-100 rounded" />}
                          <div>
                            <div className="text-sm text-gray-700 font-semibold">{it.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{it.pubDate ? new Date(it.pubDate).toLocaleDateString('fr-FR') : it.source}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card bg-white p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4">Actualités — France</h3>
                  {franceLoading ? (
                    <p>Chargement…</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {franceItems.map((it, idx) => (
                        <a key={idx} href={it.link} target="_blank" rel="noreferrer" className="flex items-start gap-4 hover:bg-gray-50 p-2 rounded">
                          {it.thumbnail ? <img src={it.thumbnail} alt="thumb" className="w-20 h-14 object-cover rounded" /> : <div className="w-20 h-14 bg-gray-100 rounded" />}
                          <div>
                            <div className="text-sm text-gray-700 font-semibold">{it.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{it.pubDate ? new Date(it.pubDate).toLocaleDateString('fr-FR') : it.source}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rest.map((a, i) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="card bg-white rounded-2xl p-6 shadow">
                <h4 className="text-lg font-semibold mb-4">Abonnez‑vous</h4>
                <p className="text-sm text-gray-600">Recevez les dernières nouvelles et articles directement dans votre boîte mail.</p>
                <div className="mt-4">
                  <input className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Votre email" />
                  <button className="mt-3 w-full btn-bridge">S'abonner</button>
                </div>
              </div>

              <div className="mt-6 card bg-white rounded-2xl p-6 shadow">
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

      <Footer />
    </div>
  );
}
