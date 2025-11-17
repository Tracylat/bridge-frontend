import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Article } from "../types/Article";
import { toast } from "react-hot-toast";

/**
 * AdminArticles.tsx
 * - CRUD articles (Supabase)
 * - Upload image -> bucket 'articles'
 *
 * Prérequis Supabase:
 * - Table `articles` avec colonnes: id, title, description, content, image_url, created_at
 * - Bucket public: 'articles'
 */

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles((data || []) as Article[]);
    } catch (err: any) {
      console.error("fetchArticles:", err);
      setErrorMsg(err.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreviewUrl(URL.createObjectURL(f));
    else setPreviewUrl(null);
  };

  // 🔥🔥🔥 LE SEUL ENDROIT MODIFIÉ : BUCKET = "articles"
  const uploadFile = async (f: File) => {
    const fileExt = f.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("articles")  // ✅ TON BUCKET
      .upload(filePath, f, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("articles")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      if (!title.trim() || !content.trim()) {
        toast.error("Titre et contenu requis");
        setSubmitting(false);
        return;
      }

      let image_url: string | null = null;

      if (file) {
        toast.loading("Upload de l'image...");
        image_url = await uploadFile(file);
        toast.dismiss();
      }

      if (editingId) {
        const updates: any = { title, description, content };
        if (image_url) updates.image_url = image_url;

        const { error } = await supabase
          .from("articles")
          .update(updates)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Article mis à jour");
      } else {
        const { error } = await supabase
          .from("articles")
          .insert([{ title, description, content, image_url }]);

        if (error) throw error;
        toast.success("Article ajouté");
      }

      setTitle("");
      setDescription("");
      setContent("");
      setFile(null);
      setPreviewUrl(null);
      setEditingId(null);

      await fetchArticles();
    } catch (err: any) {
      console.error("handleSubmit:", err);
      toast.error(err.message || "Erreur lors de l'enregistrement");
      setErrorMsg(err.message || "Erreur lors de l'enregistrement");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cet article ?")) return;
    try {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
      toast.success("Article supprimé");
      fetchArticles();
    } catch (err: any) {
      console.error("handleDelete:", err);
      toast.error(err.message || "Erreur suppression");
      setErrorMsg(err.message || "Erreur suppression");
    }
  };

  const startEdit = (a: Article) => {
    setEditingId(a.id ?? null);
    setTitle(a.title ?? "");
    setDescription((a as any).description ?? "");
    setContent(a.content ?? "");
    setPreviewUrl(a.image_url ?? null);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setContent("");
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#08227f]">
        Admin — Gestion des articles
      </h1>

      {errorMsg && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">{errorMsg}</div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4 mb-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {editingId ? "Modifier l'article" : "Ajouter un article"}
          </h2>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              Annuler
            </button>
          )}
        </div>

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Description courte (optionnelle)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          className="w-full border px-3 py-2 rounded h-36"
          placeholder="Contenu complet"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="flex items-center gap-4">
          <input type="file" accept="image/*" onChange={onFileChange} />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              className="w-28 h-20 object-cover rounded shadow"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-[#08227f] text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
        >
          {editingId
            ? submitting
              ? "Enregistrement..."
              : "Mettre à jour"
            : submitting
            ? "Ajout..."
            : "Ajouter"}
        </button>
      </form>

      {/* ARTICLES LIST */}
      {loading ? (
        <p className="p-6">Chargement…</p>
      ) : articles.length === 0 ? (
        <p>Aucun article trouvé.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {articles.map((a) => (
            <div
              key={a.id}
              className="bg-white p-4 rounded-lg shadow flex gap-4"
            >
              <div className="w-28 h-20 flex-shrink-0">
                {a.image_url ? (
                  <img
                    src={a.image_url}
                    alt={a.title}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-sm text-gray-400">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{a.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {(a as any).description ?? ""}
                </p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => startEdit(a)}
                    className="px-3 py-1 bg-yellow-400 rounded text-black hover:bg-yellow-500"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(a.id!)}
                    className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
