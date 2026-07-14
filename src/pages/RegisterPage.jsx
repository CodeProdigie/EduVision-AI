import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    register({ name: payload.name, email: payload.email, role: 'student' }, 'demo-token');
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 dark:bg-slate-950">
      <Card title="Create your account" description="Set up your learning workspace and start organizing content." className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full name" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800" />
          <input name="email" type="email" placeholder="Email" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800" />
          <input name="password" type="password" placeholder="Password" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800" />
          <Button className="w-full" type="submit">Register</Button>
        </form>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          Already have an account? <Link to="/login" className="font-semibold text-slate-900 dark:text-slate-100">Sign in</Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
