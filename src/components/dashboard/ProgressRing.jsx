const ProgressRing = ({ percent, label }) => {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/50 bg-white/50 p-4 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/50">
      <svg width="96" height="96" viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={radius} stroke="rgba(148,163,184,0.25)" strokeWidth="12" fill="none" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div>
        <p className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{percent}%</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
};

export default ProgressRing;
