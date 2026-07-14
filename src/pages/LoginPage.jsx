import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(formData.entries());
      const { token, user } = await authService.login(payload);
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 dark:bg-slate-950">
      <Card title="Welcome back" description="Sign in to continue to your workspace." className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={6}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          New here?{' '}
          <Link to="/register" className="font-semibold text-slate-900 dark:text-slate-100">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
