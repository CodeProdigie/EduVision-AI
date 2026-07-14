import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Card title="Profile" description="User identity and account management">
        <p className="text-sm text-slate-500">No user data available. Please log in.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card title="Profile" description="Your identity and account management.">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-2xl font-bold text-white">
            {user.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{user.name}</h3>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
      </Card>

      <Card title="Account details">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <span className="text-slate-500">Role</span>
            <span className="font-medium text-slate-900 dark:text-slate-100 capitalize">{user.role || 'student'}</span>
          </div>
          <div className="flex justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <span className="text-slate-500">Email verified</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {user.emailVerified ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <span className="text-slate-500">Member since</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
