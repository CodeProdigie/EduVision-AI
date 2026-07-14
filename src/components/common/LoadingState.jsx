const LoadingState = ({ title = 'Loading', description = 'Preparing your experience...' }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/70 p-10 text-center backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-500" />
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
};

export default LoadingState;
