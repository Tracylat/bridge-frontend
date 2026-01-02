import { useState, useEffect } from "react";
import {
  Briefcase,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Clock,
  Bell,
} from "lucide-react";

/* ---------------- TYPES ---------------- */

interface User {
  role: "user";
  email: string;
  id?: string;
}

interface Project {
  id: string;
  name: string;
  status: "En cours" | "Complété" | "En attente";
  progress: number;
  startDate: string;
  dueDate: string;
  manager: string;
}

interface Update {
  id: string;
  project: string;
  message: string;
  time: string;
  type: "success" | "warning" | "info";
}

/* ---------------- MOCK DATA (par client) ---------------- */
/* ⚠️ En prod : API / backend */

const PROJECTS_BY_CLIENT: Record<string, Project[]> = {
  "1": [
    {
      id: "p1",
      name: "Création Entreprise - SARL Tech",
      status: "En cours",
      progress: 85,
      startDate: "15 Oct 2025",
      dueDate: "30 Nov 2025",
      manager: "Alexandre Dubois",
    },
    {
      id: "p2",
      name: "Business Plan - Import/Export",
      status: "Complété",
      progress: 100,
      startDate: "01 Sep 2025",
      dueDate: "15 Oct 2025",
      manager: "Marie Laurent",
    },
  ],
  "2": [
    {
      id: "p3",
      name: "Stratégie Marketing Digital",
      status: "En cours",
      progress: 60,
      startDate: "05 Nov 2025",
      dueDate: "20 Jan 2026",
      manager: "Thomas Bernard",
    },
  ],
};

const UPDATES_BY_CLIENT: Record<string, Update[]> = {
  "1": [
    {
      id: "u1",
      project: "Création Entreprise",
      message: "Vos documents ont été validés.",
      time: "Il y a 2 heures",
      type: "success",
    },
    {
      id: "u2",
      project: "Business Plan",
      message: "Nouvelle étape disponible.",
      time: "Hier",
      type: "info",
    },
  ],
  "2": [
    {
      id: "u3",
      project: "Stratégie Marketing",
      message: "Rendez-vous prévu le 15 Dec à 10h.",
      time: "Aujourd’hui",
      type: "warning",
    },
  ],
};

/* ---------------- DASHBOARD ---------------- */

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "projects" | "updates" | "profile"
  >("projects");

  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);

  /* -------- LOAD USER -------- */

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed: User = JSON.parse(stored);
      setUser(parsed);

      if (parsed.id) {
        setProjects(PROJECTS_BY_CLIENT[parsed.id] || []);
        setUpdates(UPDATES_BY_CLIENT[parsed.id] || []);
      }
    }
  }, []);

  /* -------- STATS -------- */

  const stats = [
    {
      label: "Projets en cours",
      value: projects.filter((p) => p.status === "En cours").length,
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      label: "Projets complétés",
      value: projects.filter((p) => p.status === "Complété").length,
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      label: "En attente",
      value: projects.filter((p) => p.status === "En attente").length,
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      label: "Progression moyenne",
      value:
        projects.length > 0
          ? `${Math.round(
              projects.reduce((acc, p) => acc + p.progress, 0) /
                projects.length
            )}%`
          : "0%",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Espace client
          </h1>
          <p className="text-gray-600 mt-1">{user.email}</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-[#08227f] mb-3">{s.icon}</div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-6 border-b mb-6">
          {[
            { id: "projects", label: "Mes projets" },
            { id: "updates", label: "Mises à jour" },
            { id: "profile", label: "Mon profil" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`pb-2 font-medium ${
                activeTab === t.id
                  ? "border-b-2 border-[#08227f] text-[#08227f]"
                  : "text-gray-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === "projects" && (
            <div className="space-y-4">
              {projects.length === 0 && (
                <p className="text-gray-500">
                  Aucun projet en cours.
                </p>
              )}

              {projects.map((p) => (
                <div
                  key={p.id}
                  className="border rounded-lg p-5"
                >
                  <div className="flex justify-between mb-3">
                    <h3 className="font-semibold">{p.name}</h3>
                    <span className="text-sm text-gray-600">
                      {p.status}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progression</span>
                      <span>{p.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-[#08227f] h-2 rounded-full"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 flex gap-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {p.startDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {p.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "updates" && (
            <div className="space-y-4">
              {updates.map((u) => (
                <div
                  key={u.id}
                  className="flex gap-3 bg-gray-50 p-4 rounded-lg"
                >
                  <Bell className="h-5 w-5 text-[#08227f]" />
                  <div>
                    <p className="text-sm font-medium">
                      {u.project}
                    </p>
                    <p className="text-sm">{u.message}</p>
                    <p className="text-xs text-gray-500">
                      {u.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-4 max-w-md">
              <div>
                <label className="text-sm text-gray-600">
                  Email
                </label>
                <input
                  disabled
                  value={user.email}
                  className="w-full border px-3 py-2 rounded-lg bg-gray-100"
                />
              </div>

              <p className="text-sm text-gray-500">
                Les informations personnelles sont gérées par
                l’administrateur.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;