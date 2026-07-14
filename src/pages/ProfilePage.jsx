import Card from '../components/ui/Card';

const ProfilePage = () => {
  return (
    <Card title="Profile" description="A centralized place for user identity and account management.">
      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
        <p><span className="font-semibold text-slate-900 dark:text-slate-100">Name:</span> Learning User</p>
        <p><span className="font-semibold text-slate-900 dark:text-slate-100">Role:</span> Student</p>
        <p><span className="font-semibold text-slate-900 dark:text-slate-100">Plan:</span> Pro</p>
      </div>
    </Card>
  );
};

export default ProfilePage;
