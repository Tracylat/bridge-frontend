import { useEffect, useState } from 'react';

type NewsItem = {
  title: string;
  link: string;
  pubDate?: string;
  thumbnail?: string;
  description?: string;
  source?: string;
};

// Try NewsAPI if key present, otherwise use RSS-to-JSON public endpoints as fallback.
export default function useNews(country: 'benin' | 'france', limit = 4) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
        if (apiKey) {
          // Use NewsAPI as priority
          const q = country === 'benin' ? 'Bénin OR Benin' : 'France OR Paris';
          const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&pageSize=${limit}&sortBy=publishedAt&language=fr&apiKey=${apiKey}`;
          const res = await fetch(url);
          const json = await res.json();
          const mapped = (json.articles || []).map((a: any) => ({
            title: a.title,
            link: a.url,
            pubDate: a.publishedAt,
            thumbnail: a.urlToImage,
            description: a.description,
            source: a.source?.name,
          }));
          if (mounted) setItems(mapped);
        } else {
          // Fallback: use rss2json public endpoint with some curated RSS feeds
          const rssFeeds = country === 'benin'
            ? [
                'https://www.rfi.fr/fr/rss/afrique.xml',
                'https://news.google.com/rss/search?q=Bénin&hl=fr&gl=FR&ceid=FR:fr'
              ]
            : [
                'https://www.lemonde.fr/rss/une.xml',
                'https://www.lefigaro.fr/rss/figaro_actualites.xml'
              ];

          const results: NewsItem[] = [];
          for (const feed of rssFeeds) {
            try {
              const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`;
              const res = await fetch(url);
              const json = await res.json();
              if (json.items && Array.isArray(json.items)) {
                json.items.slice(0, limit).forEach((it: any) => {
                  results.push({
                    title: it.title,
                    link: it.link,
                    pubDate: it.pubDate,
                    thumbnail: it.thumbnail || it.enclosure?.link,
                    description: it.description?.replace(/<[^>]+>/g, '').slice(0, 220),
                    source: json.feed?.title,
                  });
                });
              }
            } catch (e) {
              // ignore per-feed errors
            }
            if (results.length >= limit) break;
          }
          if (mounted) setItems(results.slice(0, limit));
        }
      } catch (e: any) {
        if (mounted) setError(String(e?.message || e));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchNews();
    return () => { mounted = false; };
  }, [country, limit]);

  return { items, loading, error };
}
