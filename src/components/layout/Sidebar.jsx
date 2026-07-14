import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/upload', label: 'Upload' },
  { to: '/videos', label: 'My Videos' },
  { to: '/history', label: 'History' },
  { to: '/settings', label: 'Settings' },
  { to: '/profile', label: 'Profile' },
  { to: '/admin', label: 'Admin' },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 dark:border-slate-700 dark:bg-slate-900 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">PaperVideo</p>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Learning Studio</h2>
        </div>
        <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden" onClick={onClose}>
          ✕
        </button>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
