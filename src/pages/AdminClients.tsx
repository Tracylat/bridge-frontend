import { useState } from 'react';
import { Users, Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface ClientProject {
  id: number;
  name: string;
  status: 'En cours' | 'Complété' | 'En attente';
  progress: number;
  startDate: string;
  dueDate: string;
  manager: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  projects: ClientProject[];
}

const AdminClients = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '+33 6 12 34 56 78',
      company: 'Dupont Consulting',
      projects: [
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
        }
      ]
    }
  ]);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editingProject, setEditingProject] = useState<ClientProject | null>(null);
  const [newProject, setNewProject] = useState<Partial<ClientProject>>({});
  const [showAddProject, setShowAddProject] = useState(false);

  const handleUpdateProject = (projectId: number, updatedData: Partial<ClientProject>) => {
    if (!selectedClient) return;

    setClients(clients.map(client =>
      client.id === selectedClient.id
        ? {
            ...client,
            projects: client.projects.map(p =>
              p.id === projectId ? { ...p, ...updatedData } : p
            )
          }
        : client
    ));

    setSelectedClient({
      ...selectedClient,
      projects: selectedClient.projects.map(p =>
        p.id === projectId ? { ...p, ...updatedData } : p
      )
    });

    setEditingProject(null);
  };

  const handleAddProject = () => {
    if (!selectedClient || !newProject.name) return;

    const project: ClientProject = {
      id: Math.max(...selectedClient.projects.map(p => p.id), 0) + 1,
      name: newProject.name || '',
      status: newProject.status || 'En attente',
      progress: newProject.progress || 0,
      startDate: newProject.startDate || new Date().toLocaleDateString('fr-FR'),
      dueDate: newProject.dueDate || '',
      manager: newProject.manager || ''
    };

    const updatedClient = {
      ...selectedClient,
      projects: [...selectedClient.projects, project]
    };

    setClients(clients.map(c => c.id === selectedClient.id ? updatedClient : c));
    setSelectedClient(updatedClient);
    setNewProject({});
    setShowAddProject(false);
  };

  const handleDeleteProject = (projectId: number) => {
    if (!selectedClient) return;

    const updatedClient = {
      ...selectedClient,
      projects: selectedClient.projects.filter(p => p.id !== projectId)
    };

    setClients(clients.map(c => c.id === selectedClient.id ? updatedClient : c));
    setSelectedClient(updatedClient);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-8 w-8 text-[#08227f]" />
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Clients</h1>
          </div>
          <p className="text-gray-600">Gérez les projets et le suivi des clients</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des clients */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Clients</h2>
              <div className="space-y-2">
                {clients.map(client => (
                  <button
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedClient?.id === client.id
                        ? 'bg-[#08227f] text-white'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{client.name}</div>
                    <div className={`text-sm ${selectedClient?.id === client.id ? 'text-blue-100' : 'text-gray-600'}`}>
                      {client.company}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Détails du client */}
          {selectedClient && (
            <div className="lg:col-span-2 space-y-6">
              {/* Infos client */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations du client</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      defaultValue={selectedClient.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f] focus:border-[#08227f]"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={selectedClient.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f] focus:border-[#08227f]"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      defaultValue={selectedClient.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f] focus:border-[#08227f]"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                    <input
                      type="text"
                      defaultValue={selectedClient.company}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f] focus:border-[#08227f]"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Projets du client */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Projets</h2>
                  <button
                    onClick={() => setShowAddProject(!showAddProject)}
                    className="flex items-center gap-2 bg-[#08227f] text-white px-4 py-2 rounded-lg hover:bg-[#041a60] transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter projet
                  </button>
                </div>

                {/* Formulaire ajout projet */}
                {showAddProject && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Nom du projet"
                        value={newProject.name || ''}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f]"
                      />
                      <select
                        value={newProject.status || 'En attente'}
                        onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f]"
                      >
                        <option>En attente</option>
                        <option>En cours</option>
                        <option>Complété</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Progression (%)"
                        min="0"
                        max="100"
                        value={newProject.progress || 0}
                        onChange={(e) => setNewProject({ ...newProject, progress: parseInt(e.target.value) })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f]"
                      />
                      <input
                        type="text"
                        placeholder="Responsable"
                        value={newProject.manager || ''}
                        onChange={(e) => setNewProject({ ...newProject, manager: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#08227f]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddProject}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        Créer
                      </button>
                      <button
                        onClick={() => setShowAddProject(false)}
                        className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                {/* Liste des projets */}
                <div className="space-y-3">
                  {selectedClient.projects.map(project => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      {editingProject?.id === project.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editingProject.name}
                            onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={editingProject.status}
                              onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                              className="px-3 py-2 border border-gray-300 rounded-lg"
                            >
                              <option>En attente</option>
                              <option>En cours</option>
                              <option>Complété</option>
                            </select>
                            <input
                              type="number"
                              value={editingProject.progress}
                              onChange={(e) => setEditingProject({ ...editingProject, progress: parseInt(e.target.value) })}
                              className="px-3 py-2 border border-gray-300 rounded-lg"
                              min="0"
                              max="100"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateProject(project.id, editingProject)}
                              className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                              <Save className="h-4 w-4" />
                              Sauvegarder
                            </button>
                            <button
                              onClick={() => setEditingProject(null)}
                              className="flex items-center gap-2 bg-gray-400 text-white px-3 py-1 rounded text-sm hover:bg-gray-500"
                            >
                              <X className="h-4 w-4" />
                              Annuler
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{project.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              project.status === 'Complété'
                                ? 'bg-green-100 text-green-800'
                                : project.status === 'En cours'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progression</span>
                              <span className="font-semibold text-[#08227f]">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-[#08227f] h-2 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            <p>Responsable: {project.manager}</p>
                            <p>Du {project.startDate} au {project.dueDate}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingProject(project)}
                              className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                              Modifier
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                              Supprimer
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminClients;
