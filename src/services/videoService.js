import apiClient from './apiClient';

export const videoService = {
  list: () => apiClient.get('/videos'),
  create: (payload) => apiClient.post('/videos', payload),
};
