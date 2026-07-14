import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(formData.entries());

      if (payload.password !== payload.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      const { token, user } = await authService.register(payload);
      register(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 dark:bg-slate-950">
      <Card
        title="Create your account"
        description="Set up your learning workspace and start organizing content."
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
          <input
            name="name"
            placeholder="Full name"
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
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
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
            minLength={6}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-slate-900 dark:text-slate-100">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
