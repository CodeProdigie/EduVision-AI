const UploadList = ({ uploads, onRetry, onDelete }) => {
  return (
    <div className="space-y-3">
      {uploads.map((upload) => (
        <div key={upload.id} className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/60">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900 dark:text-slate-100">{upload.name}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{upload.sizeLabel} • {upload.status}</p>
            </div>
            <div className="flex items-center gap-2">
              {upload.previewUrl && (
                <a href={upload.previewUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Preview</a>
              )}
              {upload.status === 'failed' && (
                <button onClick={() => onRetry(upload.id)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700">Retry</button>
              )}
              <button onClick={() => onDelete(upload.id)} className="rounded-lg border border-rose-300 px-3 py-2 text-sm text-rose-600 dark:border-rose-700 dark:text-rose-400">Delete</button>
            </div>
          </div>

          {upload.progress !== undefined && (
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all" style={{ width: `${upload.progress}%` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UploadList;
