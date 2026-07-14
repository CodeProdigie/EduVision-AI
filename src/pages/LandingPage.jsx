import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import env from '../config/env';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-6 py-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{env.appName}</p>
            <h1 className="text-xl font-semibold">AI-Powered Learning Studio</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Card title="Architected for scalable video education" description="The platform foundation is prepared for auth, uploads, workflows, and future AI-powered experiences.">
            <div className="mt-6 flex gap-3">
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="secondary">View Dashboard</Button>
              </Link>
            </div>
          </Card>

          <Card title="Planned modules" description="Auth, media workflows, history, settings, and admin views are separated by concern for long-term growth.">
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>• Secure user flows</li>
              <li>• Upload and media management</li>
              <li>• Admin-ready architecture</li>
            </ul>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
