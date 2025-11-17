import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Article } from "../types/Article";
import Footer from "../components/Footer";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="p-12 text-center">Chargement...</p>;
  if (!article) return <p className="p-12 text-center">Article introuvable.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero image */}
      {article.image_url && (
        <div className="relative w-full overflow-hidden aspect-[16/9] md:aspect-[21/9]">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white px-4 text-center">
              {article.title}
            </h1>
          </div>
        </div>
      )}

      {/* Article content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {article.description && (
          <p className="text-gray-700 text-lg mb-6">{article.description}</p>
        )}
        <div
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>

      <Footer />
    </div>
  );
}
