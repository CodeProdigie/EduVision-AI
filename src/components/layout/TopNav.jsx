import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

const TopNav = ({ onMenuClick }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900 lg:px-8">
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden" onClick={onMenuClick}>
          ☰
        </button>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search content"
          className="hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-slate-400 md:block dark:border-slate-700 dark:bg-slate-800"
        />
      </div>

      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <div className="hidden text-right md:block">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user?.name || 'Guest'}</p>
          <p className="text-xs text-slate-500">{user?.email || 'No account'}</p>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default TopNav;
