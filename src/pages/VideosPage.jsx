import Card from '../components/ui/Card';

const VideosPage = () => {
  return (
    <Card title="My Videos" description="A dedicated list view for the user’s video library.">
      <div className="grid gap-4 md:grid-cols-2">
        {['Intro lesson', 'Summarized recap', 'Interactive review'].map((video) => (
          <div key={video} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
            <h4 className="font-semibold">{video}</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Prepared for future media metadata and playback integration.</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default VideosPage;
