import Card from '../components/ui/Card';

const AdminPage = () => {
  return (
    <Card title="Admin" description="Admin-focused dashboards and management views will live here.">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <h4 className="font-semibold">User management</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Role-based permissions and account oversight.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <h4 className="font-semibold">System health</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Monitoring and diagnostics for platform operations.</p>
        </div>
      </div>
    </Card>
  );
};

export default AdminPage;
