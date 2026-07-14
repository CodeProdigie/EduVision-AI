const StatCard = ({ title, value, detail, icon, accent = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100' }) => {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
        </div>
        <div className={`rounded-2xl p-3 text-lg ${accent}`}>{icon}</div>
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{detail}</p>
    </div>
  );
};

export default StatCard;
