import { useQuery } from '@tanstack/react-query';
import { videoService } from '../services/videoService';
import Card from '../components/ui/Card';
import EmptyState from '../components/common/EmptyState';
import LoadingState from '../components/common/LoadingState';

const HistoryPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['videos', 'history'],
    queryFn: () => videoService.list(),
  });

  if (isLoading) {
    return <LoadingState title="Loading history" description="Fetching your content history..." />;
  }

  const videos = data?.items || [];

  return (
    <Card title="History" description="Chronological view of generated and uploaded content.">
      {error && (
        <p className="mb-4 text-sm text-rose-600 dark:text-rose-400">
          Failed to load history: {error.message}
        </p>
      )}

      {!videos.length ? (
        <EmptyState
          title="No history yet"
          description="Your uploaded papers and generated videos will appear here."
        />
      ) : (
        <div className="space-y-3">
          {videos.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/60"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                <p className="text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleString()} &middot; {item.status}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  item.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default HistoryPage;
