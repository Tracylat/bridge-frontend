import { useState } from "react";
import emailjs from "emailjs-com";

// Remplace par tes propres identifiants EmailJS
const SERVICE_ID = "service_r3wdsfq";
const TEMPLATE_ID = "template_yoqunl8";
const USER_ID = "F5-c2lxaAGI9GHTa4";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });

  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      // Envoi via EmailJS
      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, USER_ID);

      if (result.status === 200) {
        setStatus({ type: "success", message: "Message envoyé avec succès !" });
        setForm({ name: "", email: "", phone: "", type: "", message: "" });
      } else {
        setStatus({ type: "error", message: "Erreur lors de l'envoi du message." });
      }
    } catch (err: any) {
  console.error("EmailJS error:", err);
  setStatus({ type: "error", message: "Erreur serveur, veuillez réessayer." });
}

  };
  

  return (
    <div className="max-w-3xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Contactez-nous</h1>

      {status && (
        <div className={`mb-4 p-3 rounded ${status.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom complet*"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full p-3 rounded text-black"
        />
        <input
          type="email"
          placeholder="Adresse e-mail*"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full p-3 rounded text-black"
        />
        <input
          type="tel"
          placeholder="Numéro de téléphone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full p-3 rounded text-black"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
          className="w-full p-3 rounded text-black"
        >
          <option value="">Type de projet*</option>
          <option value="Création d’entreprise">Création d’entreprise</option>
          <option value="Développement numérique">Développement numérique</option>
          <option value="Recrutement">Recrutement</option>
          <option value="Autre">Autre</option>
        </select>
        <textarea
          placeholder="Message / Description du besoin*"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          className="w-full p-3 rounded text-black h-32"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-[#08227f] text-white rounded-lg hover:bg-[#041a60] transition disabled:opacity-60"
        >
          {submitting ? "Envoi..." : "Envoyer ma demande"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
