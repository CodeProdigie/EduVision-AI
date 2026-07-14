import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const SettingsPage = () => {
  return (
    <Card title="Settings" description="Configuration for preferences, integrations, and account controls.">
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
          <span>Enable notifications</span>
          <Button variant="secondary">Configure</Button>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
          <span>Default export format</span>
          <Button variant="secondary">Manage</Button>
        </div>
      </div>
    </Card>
  );
};

export default SettingsPage;
