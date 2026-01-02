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
        }
      ]
    }
  ]);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState<Partial<Client>>({});
  const [showAddClient, setShowAddClient] = useState(false);

  const [editingProject, setEditingProject] = useState<ClientProject | null>(null);
  const [newProject, setNewProject] = useState<Partial<ClientProject>>({});
  const [showAddProject, setShowAddProject] = useState(false);

  // ----------------------- CLIENTS -----------------------
  const handleAddClient = () => {
    if (!newClient.name || !newClient.email) return;

    const client: Client = {
      id: Math.max(...clients.map(c => c.id), 0) + 1,
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone || '',
      company: newClient.company || '',
      projects: []
    };

    setClients([...clients, client]);
    setNewClient({});
    setShowAddClient(false);
  };

  const handleUpdateClient = (clientId: number, updatedData: Partial<Client>) => {
    setClients(clients.map(c => (c.id === clientId ? { ...c, ...updatedData } : c)));
    if (selectedClient?.id === clientId) setSelectedClient({ ...selectedClient, ...updatedData });
    setEditingClient(null);
  };

  const handleDeleteClient = (clientId: number) => {
    setClients(clients.filter(c => c.id !== clientId));
    if (selectedClient?.id === clientId) setSelectedClient(null);
  };

  // ----------------------- PROJETS -----------------------
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

    setClients(clients.map(c => (c.id === selectedClient.id ? updatedClient : c)));
    setSelectedClient(updatedClient);
    setNewProject({});
    setShowAddProject(false);
  };

  const handleUpdateProject = (projectId: number, updatedData: Partial<ClientProject>) => {
    if (!selectedClient) return;
    const updatedClient = {
      ...selectedClient,
      projects: selectedClient.projects.map(p =>
        p.id === projectId ? { ...p, ...updatedData } : p
      )
    };
    setClients(clients.map(c => (c.id === selectedClient.id ? updatedClient : c)));
    setSelectedClient(updatedClient);
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId: number) => {
    if (!selectedClient) return;
    const updatedClient = {
      ...selectedClient,
      projects: selectedClient.projects.filter(p => p.id !== projectId)
    };
    setClients(clients.map(c => (c.id === selectedClient.id ? updatedClient : c)));
    setSelectedClient(updatedClient);
  };

  // ----------------------- RENDER -----------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-[#08227f]" />
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Clients</h1>
          </div>
          <button
            onClick={() => setShowAddClient(!showAddClient)}
            className="flex items-center gap-2 bg-[#08227f] text-white px-4 py-2 rounded-lg hover:bg-[#041a60] transition"
          >
            <Plus className="h-4 w-4" />
            Ajouter client
          </button>
        </div>

        {/* FORMULAIRE AJOUT CLIENT */}
        {showAddClient && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Nom" value={newClient.name || ''} onChange={e => setNewClient({ ...newClient, name: e.target.value })} className="px-3 py-2 border rounded-lg" />
              <input type="email" placeholder="Email" value={newClient.email || ''} onChange={e => setNewClient({ ...newClient, email: e.target.value })} className="px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Téléphone" value={newClient.phone || ''} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} className="px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Entreprise" value={newClient.company || ''} onChange={e => setNewClient({ ...newClient, company: e.target.value })} className="px-3 py-2 border rounded-lg" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddClient} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                <Save className="h-4 w-4" /> Créer
              </button>
              <button onClick={() => setShowAddClient(false)} className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                <X className="h-4 w-4" /> Annuler
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LISTE CLIENTS */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Clients</h2>
              <div className="space-y-2">
                {clients.map(client => (
                  <div key={client.id} className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-2 rounded">
                    <button className="text-left w-full" onClick={() => setSelectedClient(client)}>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-600">{client.company}</div>
                    </button>
                    <div className="flex gap-1 ml-2">
                      <button onClick={() => setEditingClient(client)} className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDeleteClient(client.id)} className="p-1 bg-red-600 text-white rounded hover:bg-red-700"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DETAILS CLIENT */}
          {selectedClient && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Informations du client</h2>
                {editingClient && editingClient.id === selectedClient.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" value={editingClient.name} onChange={e => setEditingClient({ ...editingClient, name: e.target.value })} className="px-3 py-2 border rounded" />
                    <input type="email" value={editingClient.email} onChange={e => setEditingClient({ ...editingClient, email: e.target.value })} className="px-3 py-2 border rounded" />
                    <input type="text" value={editingClient.phone} onChange={e => setEditingClient({ ...editingClient, phone: e.target.value })} className="px-3 py-2 border rounded" />
                    <input type="text" value={editingClient.company} onChange={e => setEditingClient({ ...editingClient, company: e.target.value })} className="px-3 py-2 border rounded" />
                    <div className="col-span-2 flex gap-2 mt-2">
                      <button onClick={() => editingClient && handleUpdateClient(editingClient.id, editingClient)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"><Save className="h-4 w-4" /> Sauvegarder</button>
                      <button onClick={() => setEditingClient(null)} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"><X className="h-4 w-4" /> Annuler</button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" value={selectedClient.name} disabled className="px-3 py-2 border rounded" />
                    <input type="email" value={selectedClient.email} disabled className="px-3 py-2 border rounded" />
                    <input type="text" value={selectedClient.phone} disabled className="px-3 py-2 border rounded" />
                    <input type="text" value={selectedClient.company} disabled className="px-3 py-2 border rounded" />
                  </div>
                )}
              </div>

              {/* PROJETS CLIENT */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Projets</h2>
                  <button onClick={() => setShowAddProject(!showAddProject)} className="flex items-center gap-2 bg-[#08227f] text-white px-4 py-2 rounded hover:bg-[#041a60]"><Plus className="h-4 w-4" /> Ajouter projet</button>
                </div>

                {showAddProject && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input type="text" placeholder="Nom du projet" value={newProject.name || ''} onChange={e => setNewProject({ ...newProject, name: e.target.value })} className="px-3 py-2 border rounded" />
                      <select value={newProject.status || 'En attente'} onChange={e => setNewProject({ ...newProject, status: e.target.value as any })} className="px-3 py-2 border rounded">
                        <option>En attente</option>
                        <option>En cours</option>
                        <option>Complété</option>
                      </select>
                      <input type="number" placeholder="Progression (%)" min={0} max={100} value={newProject.progress || 0} onChange={e => setNewProject({ ...newProject, progress: parseInt(e.target.value) })} className="px-3 py-2 border rounded" />
                      <input type="text" placeholder="Responsable" value={newProject.manager || ''} onChange={e => setNewProject({ ...newProject, manager: e.target.value })} className="px-3 py-2 border rounded" />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleAddProject} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"><Save className="h-4 w-4" /> Créer</button>
                      <button onClick={() => setShowAddProject(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"><X className="h-4 w-4" /> Annuler</button>
                    </div>
                  </div>
                )}

                {/* LISTE PROJETS */}
                <div className="space-y-3">
                  {selectedClient.projects.map(project => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md">
                      {editingProject?.id === project.id ? (
                        <div className="space-y-3">
                          <input type="text" value={editingProject.name} onChange={e => setEditingProject({ ...editingProject, name: e.target.value })} className="w-full px-3 py-2 border rounded" />
                          <div className="grid grid-cols-2 gap-2">
                            <select value={editingProject.status} onChange={e => setEditingProject({ ...editingProject, status: e.target.value as any })} className="px-3 py-2 border rounded">
                              <option>En attente</option>
                              <option>En cours</option>
                              <option>Complété</option>
                            </select>
                            <input type="number" value={editingProject.progress} min={0} max={100} onChange={e => setEditingProject({ ...editingProject, progress: parseInt(e.target.value) })} className="px-3 py-2 border rounded" />
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleUpdateProject(project.id, editingProject)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"><Save className="h-4 w-4" /> Sauvegarder</button>
                            <button onClick={() => setEditingProject(null)} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"><X className="h-4 w-4" /> Annuler</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{project.name}</h3>
                            <p className="text-sm text-gray-600">Responsable: {project.manager}</p>
                            <p className="text-sm text-gray-600">Du {project.startDate} au {project.dueDate}</p>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => setEditingProject(project)} className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"><Edit className="h-4 w-4" /></button>
                            <button onClick={() => handleDeleteProject(project.id)} className="p-1 bg-red-600 text-white rounded hover:bg-red-700"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </div>
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