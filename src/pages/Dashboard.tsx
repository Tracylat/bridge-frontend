import { useState } from 'react';
import { User, FileText, Settings, Bell, LogOut, TrendingUp, Calendar, Clock, CheckCircle, AlertCircle, Briefcase } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const userStats = [
    { label: 'Projets en cours', value: '3', change: '+1 ce mois', icon: <Briefcase className="h-5 w-5" /> },
    { label: 'Projets complétés', value: '5', change: '+2 ce mois', icon: <CheckCircle className="h-5 w-5" /> },
    { label: 'Tâches en attente', value: '8', change: '-2 ce mois', icon: <AlertCircle className="h-5 w-5" /> },
    { label: 'Progression moyenne', value: '72%', change: '+15% ce mois', icon: <TrendingUp className="h-5 w-5" /> }
  ];

  const clientProjects = [
    { 
      id: 1, 
      name: 'Création Entreprise - SARL Tech', 
      status: 'En cours', 
      progress: 85, 
      startDate: '15 Oct 2025',
      dueDate: '30 Nov 2025',
      manager: 'Alexandre Dubois'
    },
    { 
      id: 2, 
      name: 'Business Plan - Import/Export', 
      status: 'En cours', 
      progress: 60, 
      startDate: '01 Nov 2025',
      dueDate: '15 Dec 2025',
      manager: 'Marie Laurent'
    },
    { 
      id: 3, 
      name: 'Domiciliation Entreprise', 
      status: 'Complété', 
      progress: 100, 
      startDate: '20 Sep 2025',
      dueDate: '10 Oct 2025',
      manager: 'Sophie Martin'
    },
    { 
      id: 4, 
      name: 'Stratégie Marketing Digital', 
      status: 'En attente', 
      progress: 20, 
      startDate: '05 Dec 2025',
      dueDate: '20 Jan 2026',
      manager: 'Thomas Bernard'
    }
  ];

  const projectUpdates = [
    { id: 1, message: 'Vos documents ont été validés par Bridge Partners', time: 'Il y a 2 heures', type: 'success', project: 'Création Entreprise' },
    { id: 2, message: 'Nouvelle étape disponible : Formalités administratives', time: 'Il y a 5 heures', type: 'info', project: 'Business Plan' },
    { id: 3, message: 'Rendez-vous de suivi prévu le 15 Dec à 10h', time: 'Hier', type: 'warning', project: 'Stratégie Marketing' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Espace Client</h1>
          <p className="text-gray-600 mt-2">Suivez la progression de vos projets avec Bridge Partners</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[#08227f]">{stat.icon}</div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['projects', 'updates', 'profile', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-[#08227f] text-[#08227f]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'projects' && 'Mes Projets'}
                {tab === 'updates' && 'Mises à jour'}
                {tab === 'profile' && 'Mon Profil'}
                {tab === 'settings' && 'Paramètres'}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'projects' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Mes Projets</h2>
              
              <div className="space-y-4">
                {clientProjects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">Responsable: {project.manager}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'Complété' 
                          ? 'bg-green-100 text-green-800' 
                          : project.status === 'En cours'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Progression</span>
                        <span className="text-sm font-semibold text-[#08227f]">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#08227f] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Début: {project.startDate}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Fin prévue: {project.dueDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'updates' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Mises à jour de vos projets</h2>
              <div className="space-y-4">
                {projectUpdates.map((update) => (
                  <div key={update.id} className="flex items-start p-4 bg-gray-50 rounded-lg border-l-4" style={{borderLeftColor: update.type === 'success' ? '#10b981' : update.type === 'warning' ? '#f59e0b' : '#3b82f6'}}>
                    <div className="flex-shrink-0 mt-1">
                      {update.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {update.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                      {update.type === 'info' && <Bell className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-700">{update.project}</p>
                      <p className="text-sm text-gray-900 mt-1">{update.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{update.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Mon Profil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f] focus:border-[#08227f]"
                    defaultValue="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f] focus:border-[#08227f]"
                    defaultValue="jean.dupont@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f] focus:border-[#08227f]"
                    defaultValue="+33 6 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f] focus:border-[#08227f]"
                    defaultValue="Dupont Consulting"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="bg-[#08227f] text-white px-6 py-2 rounded-lg hover:bg-[#041a60] transition-colors">
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Paramètres du compte</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Préférences de notification</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-[#08227f] focus:ring-[#08227f] border-gray-300 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Recevoir des mises à jour par email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-[#08227f] focus:ring-[#08227f] border-gray-300 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Notifications pour les étapes complétées</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-[#08227f] focus:ring-[#08227f] border-gray-300 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Partager mes projets publiquement</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Sécurité</h3>
                  <button className="bg-[#08227f] text-white px-6 py-2 rounded-lg hover:bg-[#041a60] transition-colors">
                    Changer le mot de passe
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
