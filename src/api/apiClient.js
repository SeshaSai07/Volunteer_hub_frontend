import axios from 'axios';

const BASE_URL = 'https://api-volunteer-opportunity-hub-backend.onrender.com/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('vhub_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response error handler
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vhub_token');
      localStorage.removeItem('vhub_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
