import env from '../config/env';

const request = async (path, options = {}) => {
  const response = await fetch(`${env.apiUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Request failed');
  }

  return response.status === 204 ? null : response.json();
};

const apiClient = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  del: (path, options) => request(path, { ...options, method: 'DELETE' }),
};

export default apiClient;
