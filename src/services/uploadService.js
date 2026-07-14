import apiClient from './apiClient';

const formatSize = (size) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export const createUploadRecord = (file, previewUrl, progress = 0, status = 'queued') => ({
  id: crypto.randomUUID(),
  name: file.name,
  size: file.size,
  sizeLabel: formatSize(file.size),
  type: file.type,
  previewUrl,
  progress,
  status,
  createdAt: new Date().toISOString(),
  preparedForOcr: false,
  storagePath: null,
});

export const uploadService = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', 'paper');

    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/uploads`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Upload failed');
    }

    return response.json();
  },
};
