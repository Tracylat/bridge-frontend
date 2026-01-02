import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (user: { role: 'admin' | 'user'; email: string; id?: string }) => void;
}

const ADMIN_ACCOUNT = { email: 'admin@bridgePartners.fr', password: 'admin123' };
const CLIENT_ACCOUNTS = [
  { id: '1', email: 'client1@bridgePartners.fr', password: 'client123' },
  { id: '2', email: 'client2@bridgePartners.fr', password: 'client456' },
];

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(res => setTimeout(res, 800));

    if (email === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
      onLogin({ role: 'admin', email });
      navigate('/admin/articles');
      return;
    }

    const client = CLIENT_ACCOUNTS.find(c => c.email === email && c.password === password);
    if (client) {
      onLogin({ role: 'user', email: client.email, id: client.id });
      navigate('/dashboard');
      return;
    }

    setError('Identifiants invalides.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">BridgePartners</h1>
          <h2 className="mt-6 text-2xl font-semibold">Connexion</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded">{error}</div>}

          <div>
            <label>Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 py-3 border rounded-lg" placeholder="email" />
            </div>
          </div>

          <div>
            <label>Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5" />
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 py-3 border rounded-lg" placeholder="••••••" />
              <button type="button" className="absolute right-3 top-3.5" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-gray-900 text-white">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;