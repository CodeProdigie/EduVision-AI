const Card = ({ title, description, children, className = '' }) => {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>}
          {description && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
};

export default Card;
