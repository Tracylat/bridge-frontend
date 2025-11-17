import { useState } from 'react';
import { User, FileText, Settings, Bell, LogOut, TrendingUp, Calendar, Clock } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = [
    { label: 'Articles publiés', value: '12', change: '+2 ce mois', icon: <FileText className="h-5 w-5" /> },
    { label: 'Vues totales', value: '3,847', change: '+15% ce mois', icon: <TrendingUp className="h-5 w-5" /> },
    { label: 'Commentaires', value: '48', change: '+8 ce mois', icon: <User className="h-5 w-5" /> },
    { label: 'Taux d\'engagement', value: '4.2%', change: '+0.5% ce mois', icon: <TrendingUp className="h-5 w-5" /> }
  ];

  const recentArticles = [
    { id: 1, title: 'Les nouvelles tendances du marché', date: '15 Oct 2025', status: 'Publié', views: 234 },
    { id: 2, title: 'Innovation et technologie', date: '12 Oct 2025', status: 'Publié', views: 189 },
    { id: 3, title: 'Perspectives futures', date: '08 Oct 2025', status: 'Brouillon', views: 0 },
    { id: 4, title: 'Analyse comparative', date: '05 Oct 2025', status: 'Publié', views: 156 }
  ];

  const notifications = [
    { id: 1, message: 'Votre article a été approuvé', time: 'Il y a 2 heures', type: 'success' },
    { id: 2, message: 'Nouveau commentaire sur votre article', time: 'Il y a 5 heures', type: 'info' },
    { id: 3, message: 'Mise à jour des termes d\'utilisation', time: 'Hier', type: 'warning' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-2">Bienvenue sur votre espace personnel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-900">{stat.icon}</div>
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
            {['overview', 'articles', 'notifications', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'overview' && 'Aperçu'}
                {tab === 'articles' && 'Mes articles'}
                {tab === 'notifications' && 'Notifications'}
                {tab === 'settings' && 'Paramètres'}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Aperçu général</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Articles */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Articles récents</h3>
                  <div className="space-y-3">
                    {recentArticles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{article.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500">{article.date}</span>
                            <span className="text-gray-300">•</span>
                            <span className={`text-sm font-medium ${
                              article.status === 'Publié' ? 'text-green-600' : 'text-yellow-600'
                            }`}>
                              {article.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">{article.views} vues</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-600 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">Créer un nouvel article</div>
                          <div className="text-sm text-gray-600">Rédiger et publier du contenu</div>
                        </div>
                      </div>
                    </button>
                    
                    <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-600 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">Modifier mon profil</div>
                          <div className="text-sm text-gray-600">Mettre à jour mes informations</div>
                        </div>
                      </div>
                    </button>
                    
                    <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <Settings className="h-5 w-5 text-gray-600 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">Paramètres du compte</div>
                          <div className="text-sm text-gray-600">Gérer les préférences</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Mes articles</h2>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Nouvel article
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Titre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vues
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentArticles.map((article) => (
                      <tr key={article.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{article.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{article.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            article.status === 'Publié' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {article.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {article.views}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-gray-900 hover:text-gray-700 mr-3">Modifier</button>
                          <button className="text-red-600 hover:text-red-900">Supprimer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <Bell className="h-5 w-5 text-gray-600 mt-0.5" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Paramètres du compte</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        defaultValue="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        defaultValue="jean.dupont@email.com"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Préférences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Recevoir les notifications par email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Profil public</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Enregistrer les modifications
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