import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Article } from "../types/Article";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState<number | null>(null);
  const [toc, setToc] = useState<Array<{ id: string; text: string; tag: string }>>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();
      setArticle(data || null);
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!id) return;
      const { data } = await supabase
        .from('articles')
        .select('*')
        .neq('id', id)
        .order('created_at', { ascending: false })
        .limit(3);
      setRelated(data || []);
    };
    fetchRelated();
  }, [id]);

  useEffect(() => {
    if (!article) return;

    // Compute reading time (words / 200 wpm)
    const text = (article.content || '').replace(/<[^>]+>/g, ' ');
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    setReadingTime(minutes);

    // Build table of contents from article HTML headings
    setTimeout(() => {
      const el = contentRef.current;
      if (!el) return;
      const headings = Array.from(el.querySelectorAll('h2, h3')) as HTMLElement[];
      const items: Array<{ id: string; text: string; tag: string }> = [];
      headings.forEach((h) => {
        let id = h.id;
        if (!id) {
          id = h.textContent ? h.textContent.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '') : '';
          h.id = id;
        }
        items.push({ id, text: h.textContent || '', tag: h.tagName.toLowerCase() });
      });
      setToc(items);
    }, 50);
  }, [article]);

  if (loading) return <p className="p-12 text-center">Chargement...</p>;
  if (!article) return <p className="p-12 text-center">Article introuvable.</p>;

  const date = article.created_at ? new Date(article.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero image */}
      <header className="relative w-full overflow-hidden">
        <div className="w-full h-64 md:h-96 bg-gray-200">
          {article.image_url ? (
            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover object-center" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#08227f] to-[#1a3bb8] flex items-center justify-center text-white">{article.title}</div>
          )}
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto p-6 lg:p-12 text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">{article.title}</h1>
            <div className="mt-3 text-sm md:text-base text-gray-100/90">{date} • Bridge Partners</div>
          </div>
        </div>
      </header>

      {/* Article content + related */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="prose lg:prose-xl prose-lg max-w-none text-gray-800 lg:col-span-2">
          {article.description && <p className="text-gray-700 text-lg md:text-xl mb-6 font-medium leading-relaxed">{article.description}</p>}
          <div ref={contentRef} className="text-gray-800" dangerouslySetInnerHTML={{ __html: article.content }} />

          <div className="mt-12 border-t pt-8">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">{readingTime ? `${readingTime} min de lecture` : ''}</div>
              <div>
                <Link to="/articles" className="text-sm text-[#08227f]">Retour aux articles</Link>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold">Vous avez aimé ?</h4>
              <p className="text-sm text-gray-600 mt-2">Abonnez-vous à notre newsletter pour recevoir les prochains articles.</p>
              <div className="mt-3 flex gap-2">
                <input className="flex-1 border rounded-lg px-3 py-2 text-sm" placeholder="Votre email" />
                <button className="bg-[#08227f] text-white px-4 py-2 rounded-lg text-sm">S'abonner</button>
              </div>
            </div>
          </div>
        </article>

        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h4 className="text-lg font-semibold mb-2">À propos de l'auteur</h4>
            <p className="text-sm text-gray-600">Bridge Partners partage des analyses, retours d'expérience et actualités sur ses projets et initiatives.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h4 className="text-lg font-semibold mb-3">Sommaire</h4>
            {toc.length === 0 ? (
              <p className="text-sm text-gray-500">Pas de sommaire disponible.</p>
            ) : (
              <nav className="text-sm text-gray-700 flex flex-col gap-2">
                {toc.map((t) => (
                  <a key={t.id} href={`#${t.id}`} className="hover:text-[#08227f]" onClick={(e) => { e.preventDefault(); document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth' }); }}>
                    {t.text}
                  </a>
                ))}
              </nav>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h4 className="text-lg font-semibold mb-4">Articles liés</h4>
            <div className="flex flex-col gap-3">
              {related.length === 0 ? (
                <p className="text-sm text-gray-500">Aucun article lié pour le moment.</p>
              ) : (
                related.map((r) => <ArticleCard key={r.id} article={r} compact />)
              )}
            </div>
            <div className="mt-4">
              <Link to="/articles" className="text-sm text-[#08227f]">Voir tous les articles</Link>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
