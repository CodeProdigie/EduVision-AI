import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTheme } from '../hooks/useTheme';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card title="Settings" description="Configuration for preferences, integrations, and account controls.">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">Theme</p>
              <p className="text-sm text-slate-500">Current: {theme === 'dark' ? 'Dark' : 'Light'}</p>
            </div>
            <Button variant="secondary" onClick={toggleTheme}>
              Toggle {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">Notifications</p>
              <p className="text-sm text-slate-500">Receive updates about uploads and processing</p>
            </div>
            <button
              onClick={() => setNotificationsEnabled((prev) => !prev)}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                notificationsEnabled ? 'bg-slate-900 dark:bg-slate-100' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">Default export format</p>
              <p className="text-sm text-slate-500">MP4</p>
            </div>
            <Button variant="secondary">Change</Button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={handleSave}>Save preferences</Button>
          {saved && <span className="text-sm text-emerald-600 dark:text-emerald-400">Saved!</span>}
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
