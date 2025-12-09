import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types/Article';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type Props = {
  article: Article;
  compact?: boolean;
};

function formatDate(date?: string | null) {
  if (!date) return '';
  try {
    return new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export default function ArticleCard({ article, compact = false }: Props) {
  const img = article.image_url || `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow ${
        compact ? 'flex items-center gap-4' : ''
      }`}
    >
      <Link to={`/article/${article.id}`} className={`group block w-full ${compact ? 'flex items-center' : ''}`}>
        <div className={`${compact ? 'w-36 flex-shrink-0 h-24' : 'w-full h-48'} relative overflow-hidden`}> 
          <img
            src={img}
            alt={article.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="absolute left-3 top-3 bg-[#08227f] text-white text-xs font-medium px-3 py-1 rounded-full">Article</span>
        </div>

        <div className={`p-4 ${compact ? 'flex-1' : ''}`}>
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight line-clamp-2">{article.title}</h3>
          <p className="text-sm md:text-base text-gray-600 mt-3 line-clamp-3">{article.description || (article.content?.substring(0, 140) + '...')}</p>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span className="text-xs text-gray-400">{formatDate(article.created_at)}</span>
            <span className="text-[#08227f] font-semibold inline-flex items-center">Lire <ArrowRight className="ml-2 h-4 w-4" /></span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
