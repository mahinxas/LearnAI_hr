import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import { useOnlineStatus } from '@/lib/capabilities';
import { ArrowRight } from 'lucide-react';

export default function Login() {
  const { signIn, signUp, signInGoogle, user } = useAuth();
  const online = useOnlineStatus();
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [form, setForm] = useState({ email: '', password: '', displayName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate('/', { replace: true });
    return null;
  }

  if (!online) {
    return (
      <div className="grid min-h-[calc(100vh-120px)] place-items-center px-6 py-12">
        <div className="w-full max-w-md rounded-lg border border-midnight-100 bg-white p-8 shadow-soft">
          <p className="eyebrow mb-3">Offline mode</p>
          <h1 className="display-md mb-4">Sign in is unavailable offline.</h1>
          <p className="text-sm leading-6 text-midnight-600">
            Learning content and the prompt builder can still be used. Account sign-in
            needs an internet connection.
          </p>
          <Link to="/" className="btn-primary mt-6 !inline-flex">
            Back to app
          </Link>
        </div>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signin') {
        await signIn({ email: form.email, password: form.password });
      } else {
        await signUp(form);
      }
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setError('');
    setLoading(true);
    try {
      await signInGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-120px)] place-items-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-midnight-600 hover:text-midnight-950">
          ← Back to LeAIrn HR
        </Link>

        <div className="rounded-3xl border border-midnight-100 bg-white p-8 shadow-soft">
          <p className="eyebrow mb-3">{mode === 'signin' ? 'Welcome back' : 'Create an account'}</p>
          <h1 className="display-md mb-6">
            {mode === 'signin' ? 'Sign in to continue' : 'Start learning'}
          </h1>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-midnight-500">
                  Name
                </label>
                <input
                  className="input-base"
                  value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  required
                />
              </div>
            )}
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-midnight-500">
                Email
              </label>
              <input
                type="email"
                className="input-base"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-midnight-500">
                Password
              </label>
              <input
                type="password"
                minLength={6}
                className="input-base"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {error && (
              <p className="rounded-lg bg-coral-50 px-3 py-2 text-sm text-coral-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !justify-center disabled:opacity-60"
            >
              {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-midnight-100" />
            <span className="text-xs text-midnight-400">or</span>
            <span className="h-px flex-1 bg-midnight-100" />
          </div>

          <button
            onClick={google}
            disabled={loading}
            className="btn-secondary w-full !justify-center disabled:opacity-60"
          >
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-midnight-600">
            {mode === 'signin' ? "Don't have an account?" : 'Already a member?'}{' '}
            <button
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-medium text-coral-500 hover:underline"
            >
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-midnight-500">
          LeAIrn HR uses Firebase Authentication. Your password is never stored on
          our servers.
        </p>
      </div>
    </div>
  );
}
