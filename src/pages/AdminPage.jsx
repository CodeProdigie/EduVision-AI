import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import { Navigate } from 'react-router-dom';

const AdminPage = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <Card title="Admin" description="Admin-focused dashboards and management views.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/60">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">User management</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Role-based permissions and account oversight.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/60">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">System health</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Monitoring and diagnostics for platform operations.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/60">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Content moderation</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Review and manage uploaded content across the platform.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/60">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Analytics</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Platform-wide usage statistics and trends.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminPage;
