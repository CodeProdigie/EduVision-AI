const SectionCard = ({ title, subtitle, action, children, className = '' }) => {
  return (
    <section className={`glass-card rounded-3xl p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
};

export default SectionCard;
