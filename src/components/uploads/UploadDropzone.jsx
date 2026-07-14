import { useCallback, useEffect, useState } from 'react';
import Button from '../ui/Button';

const ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
};

const UploadDropzone = ({ onFilesSelected, disabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback((files) => {
    const validFiles = Array.from(files).filter((file) => {
      const isAccepted = Boolean(ACCEPTED_TYPES[file.type]);
      const hasAcceptedExtension = ['.pdf', '.png', '.jpg', '.jpeg'].some((ext) => file.name.toLowerCase().endsWith(ext));
      return isAccepted || hasAcceptedExtension;
    });

    if (validFiles.length) {
      onFilesSelected(validFiles);
    }
  }, [onFilesSelected]);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    setIsDragging(false);
    if (!disabled) {
      handleFiles(event.dataTransfer.files);
    }
  }, [disabled, handleFiles]);

  const onInputChange = (event) => {
    if (!disabled) {
      handleFiles(event.target.files || []);
    }
  };

  useEffect(() => {
    const prevent = (event) => event.preventDefault();
    window.addEventListener('dragover', prevent);
    window.addEventListener('drop', prevent);
    return () => {
      window.removeEventListener('dragover', prevent);
      window.removeEventListener('drop', prevent);
    };
  }, []);

  return (
    <label className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-8 py-16 text-center transition ${isDragging ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-300 bg-white/70 dark:border-slate-700 dark:bg-slate-900/60'} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`} onDragEnter={() => setIsDragging(true)} onDragLeave={() => setIsDragging(false)} onDrop={onDrop}>
      <input type="file" className="hidden" multiple onChange={onInputChange} accept=".pdf,.png,.jpg,.jpeg" />
      <div className="text-4xl">📦</div>
      <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Drag and drop your papers here</p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Supported formats: PDF, PNG, JPG, JPEG</p>
      <Button variant="secondary" className="mt-5" type="button">Choose files</Button>
    </label>
  );
};

export default UploadDropzone;
