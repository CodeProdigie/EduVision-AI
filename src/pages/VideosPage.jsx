import { useQuery } from '@tanstack/react-query';
import { videoService } from '../services/videoService';
import Card from '../components/ui/Card';
import EmptyState from '../components/common/EmptyState';
import LoadingState from '../components/common/LoadingState';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const VideosPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['videos'],
    queryFn: () => videoService.list(),
  });

  if (isLoading) {
    return <LoadingState title="Loading videos" description="Fetching your video library..." />;
  }

  if (error) {
    return (
      <Card title="My Videos" description="Your video library">
        <p className="text-rose-600 dark:text-rose-400">Failed to load videos: {error.message}</p>
      </Card>
    );
  }

  const videos = data?.items || [];

  if (!videos.length) {
    return (
      <Card title="My Videos" description="Your video library">
        <EmptyState
          title="No videos yet"
          description="Upload a paper to generate your first video."
          action={
            <Link to="/upload">
              <Button className="mt-4">Upload a paper</Button>
            </Link>
          }
        />
      </Card>
    );
  }

  return (
    <Card title="My Videos" description="Your video library">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video._id}
            className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60"
          >
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">{video.title}</h4>
            {video.description && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{video.description}</p>
            )}
            <div className="mt-3 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  video.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                    : video.status === 'processing'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {video.status}
              </span>
              <span className="text-xs text-slate-500">
                {new Date(video.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default VideosPage;
