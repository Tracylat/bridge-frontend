import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaLinkedin, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import Footer from "../components/Footer";
import { IMGS } from "../assets/images";

const SERVICE_ID  = "service_r3wdsfq";
const TEMPLATE_ID = "template_yoqunl8";
const USER_ID     = "F5-c2lxaAGI9GHTa4";

const Contact = () => {
  const [form, setForm] = useState({ name:"", email:"", phone:"", type:"", message:"" });
  const [status, setStatus] = useState<{type:"success"|"error"; message:string}|null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setStatus(null);
    try {
      const r = await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, USER_ID);
      if (r.status === 200) {
        setStatus({ type:"success", message:"✓ Message envoyé avec succès ! Nous vous répondrons très prochainement." });
        setForm({ name:"", email:"", phone:"", type:"", message:"" });
      } else { setStatus({ type:"error", message:"Erreur lors de l'envoi du message." }); }
    } catch { setStatus({ type:"error", message:"Erreur serveur, veuillez réessayer." }); }
    finally { setSubmitting(false); }
  };

  const inputCls = "w-full px-4 py-3 border border-[#08227f]/12 rounded-lg text-sm text-[#0a1a3a] bg-[#fafbff] focus:outline-none focus:border-[#08227f] focus:ring-2 focus:ring-[#08227f]/08 transition";

  return (
    <div className="min-h-screen bg-[#fafbff]">
      {/* ── Page hero ── */}
      <section className="relative py-24 bg-[#08227f] overflow-hidden text-center">
        <div className="absolute inset-0 bp-hero-pattern" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <p className="bp-eyebrow text-[#f0d896] justify-center flex mb-4">Parlons de votre projet</p>
          <h1 className="bp-serif text-white font-bold mb-3" style={{fontSize:"clamp(30px,5vw,58px)"}}>
            <em className="italic font-normal text-[#f0d896]">Contactez</em>-nous
          </h1>
          <p className="text-white/65 text-[15px] font-light leading-relaxed">
            Décrivez-nous votre projet et nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      </section>

      {/* ── Main grid ── */}
      <section className="py-16 bp-pattern-adinkra">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-start">

          {/* Left – info */}
          <div>
            <h3 className="bp-serif text-[#08227f] text-2xl font-bold mb-7">Nos coordonnées</h3>
            {[
              ["📧","Email","contact@bridgepartners.fr"],
              ["📞","Téléphone","+33 6 17 05 57 35"],
              ["📍","Paris 🇫🇷","102 Avenue des Champs-Élysées, 75008 Paris"],
              ["📍","Cotonou 🇧🇯","Sèmè City – bientôt disponible"],
            ].map(([ico,lbl,val])=>(
              <div key={lbl} className="flex gap-4 mb-6 items-start">
                <div className="w-11 h-11 bg-[#08227f] rounded-lg flex items-center justify-center text-lg flex-shrink-0">{ico}</div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.1em] text-[#3a4a6a] mb-0.5">{lbl}</p>
                  <p className="text-[#0a1a3a] text-sm leading-snug">{val}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#3a4a6a] mb-3">Suivez-nous</p>
              <div className="flex gap-3">
                {[FaLinkedin, FaInstagram, FaFacebook, FaTiktok].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-10 h-10 border border-[#08227f]/15 rounded-lg flex items-center justify-center text-[#08227f] text-lg hover:bg-[#08227f] hover:text-white hover:border-[#08227f] transition-all duration-200">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quote card */}
            <div className="mt-8 p-6 bg-[#08227f] rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bp-pattern-bogolan" />
              <div className="relative z-10">
                <p className="bp-serif text-white text-lg font-semibold leading-snug mb-2">
                  "Chaque ambition mérite un pont solide."
                </p>
                <p className="text-white/50 text-xs">— L'équipe Bridge Partners</p>
              </div>
            </div>
          </div>

          {/* Right – form */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}}
            className="bg-white border border-[#08227f]/07 rounded-2xl p-10 shadow-lg">
            <h3 className="bp-serif text-[#08227f] text-2xl font-bold mb-1">Envoyez-nous un message</h3>
            <p className="text-[#3a4a6a] text-sm mb-7 leading-relaxed">Décrivez votre projet et nous vous recontactons rapidement.</p>

            {status && (
              <div className={`mb-5 p-3 rounded-lg text-sm ${status.type==="success"?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-red-50 text-red-700 border border-red-200"}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[.08em] text-[#3a4a6a] mb-1.5">Nom complet *</label>
                  <input className={inputCls} type="text" placeholder="Jean Dupont" required
                    value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[.08em] text-[#3a4a6a] mb-1.5">Email *</label>
                  <input className={inputCls} type="email" placeholder="jean@example.com" required
                    value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[.08em] text-[#3a4a6a] mb-1.5">Téléphone</label>
                <input className={inputCls} type="tel" placeholder="+33 6 00 00 00 00"
                  value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[.08em] text-[#3a4a6a] mb-1.5">Type de projet *</label>
                <select className={inputCls} required value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                  <option value="">Sélectionnez votre besoin</option>
                  <option>Création d'entreprise</option>
                  <option>Développement numérique</option>
                  <option>Recrutement</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[.08em] text-[#3a4a6a] mb-1.5">Message *</label>
                <textarea className={`${inputCls} h-36 resize-none`} required placeholder="Décrivez votre projet…"
                  value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full py-3.5 bg-[#08227f] text-white text-sm font-semibold uppercase tracking-widest rounded-lg
                           hover:bg-[#041a60] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 disabled:opacity-60">
                {submitting ? "Envoi en cours…" : "Envoyer ma demande →"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
