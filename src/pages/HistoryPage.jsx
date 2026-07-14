import Card from '../components/ui/Card';

const HistoryPage = () => {
  return (
    <Card title="History" description="Chronological view of generated and uploaded content.">
      <ul className="space-y-3">
        {['Uploaded chapter notes', 'Generated summary', 'Reviewed transcript'].map((item) => (
          <li key={item} className="rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default HistoryPage;
