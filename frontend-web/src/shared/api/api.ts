import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { authStorage } from '../lib/auth-storage';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized status, e.g., clear token and redirect to login
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
