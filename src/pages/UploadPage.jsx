import { useMemo, useState } from 'react';
import UploadDropzone from '../components/uploads/UploadDropzone';
import UploadList from '../components/uploads/UploadList';
import Card from '../components/ui/Card';
import { createUploadRecord, uploadService } from '../services/uploadService';

const UploadPage = () => {
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFilesSelected = async (files) => {
    setError('');
    setIsUploading(true);

    const createdUploads = files.map((file) => {
      const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
      return createUploadRecord(file, previewUrl, 0, 'queued');
    });

    setUploads((current) => [...createdUploads, ...current]);

    for (const upload of createdUploads) {
      try {
        const matchingFile = files.find((file) => file.name === upload.name && file.size === upload.size);
        setUploads((current) => current.map((item) => (item.id === upload.id ? { ...item, status: 'uploading', progress: 25 } : item)));
        const uploaded = await uploadService.upload(matchingFile || new File([], upload.name, { type: upload.type }));
        setUploads((current) => current.map((item) => (item.id === upload.id ? { ...item, progress: 100, status: 'completed', preparedForOcr: true, storagePath: uploaded?.storagePath || '/uploads' } : item)));
      } catch (uploadError) {
        setUploads((current) => current.map((item) => (item.id === upload.id ? { ...item, status: 'failed', progress: 0 } : item)));
        setError(uploadError.message || 'Upload failed');
      }
    }

    setIsUploading(false);
  };

  const handleRetry = async (uploadId) => {
    const target = uploads.find((item) => item.id === uploadId);
    if (!target) return;

    setUploads((current) => current.map((item) => (item.id === uploadId ? { ...item, status: 'uploading', progress: 25 } : item)));
    try {
      const fileLike = new File([], target.name, { type: target.type });
      const uploaded = await uploadService.upload(fileLike);
      setUploads((current) => current.map((item) => (item.id === uploadId ? { ...item, progress: 100, status: 'completed', preparedForOcr: true, storagePath: uploaded?.storagePath || '/uploads' } : item)));
    } catch (uploadError) {
      setUploads((current) => current.map((item) => (item.id === uploadId ? { ...item, status: 'failed', progress: 0 } : item)));
      setError(uploadError.message || 'Retry failed');
    }
  };

  const handleDelete = (uploadId) => {
    setUploads((current) => current.filter((item) => item.id !== uploadId));
    if (uploads.length <= 1) {
      setError('');
    }
  };

  const stats = useMemo(() => ({
    completed: uploads.filter((item) => item.status === 'completed').length,
    failed: uploads.filter((item) => item.status === 'failed').length,
    queued: uploads.filter((item) => item.status === 'queued' || item.status === 'uploading').length,
  }), [uploads]);

  return (
    <div className="space-y-6">
      <Card title="Upload papers" description="Support for PDF, PNG, JPG, and JPEG with drag-and-drop, validation, previews, retries, and storage-ready history.">
        <UploadDropzone onFilesSelected={handleFilesSelected} disabled={isUploading} />
        {error && <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">{error}</p>}
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card title="Upload summary" description="Quick stats for the current batch.">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/60">
              <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats.completed}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/60">
              <p className="text-sm text-slate-500 dark:text-slate-400">Failed</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats.failed}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/60">
              <p className="text-sm text-slate-500 dark:text-slate-400">In progress</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{stats.queued}</p>
            </div>
          </div>
        </Card>

        <Card title="Upload history" description="A persistent list of files queued, uploaded, or needing retry.">
          {uploads.length ? <UploadList uploads={uploads} onRetry={handleRetry} onDelete={handleDelete} /> : <p className="text-sm text-slate-500 dark:text-slate-400">No uploaded files yet.</p>}
        </Card>
      </div>
    </div>
  );
};

export default UploadPage;
