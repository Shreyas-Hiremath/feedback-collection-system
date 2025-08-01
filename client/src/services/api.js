import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// This is the interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // The backend authMiddleware expects the header 'x-auth-token'
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;