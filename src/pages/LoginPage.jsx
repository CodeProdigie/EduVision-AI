import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    login({ name: payload.email?.split('@')[0] || 'User', email: payload.email }, 'demo-token');
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 dark:bg-slate-950">
      <Card title="Welcome back" description="Sign in to continue to your workspace." className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="Email" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800" />
          <input name="password" type="password" placeholder="Password" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800" />
          <Button className="w-full" type="submit">Login</Button>
        </form>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          New here? <Link to="/register" className="font-semibold text-slate-900 dark:text-slate-100">Create an account</Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
