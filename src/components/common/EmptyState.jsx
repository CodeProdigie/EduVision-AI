const EmptyState = ({ title, description, action }) => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
      {action}
    </div>
  );
};

export default EmptyState;
