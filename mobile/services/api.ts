import axios, { AxiosInstance, AxiosError } from "axios";
import { authStorage } from "./auth-storage";

// API Configuration
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://10.41.110.104:3000";
  console.log('API_BASE_URL:', API_BASE_URL);

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request interceptor - Add JWT token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await authStorage.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error adding token to request:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear auth data if token is invalid
      try {
        await authStorage.clearAll();
      } catch (err) {
        console.error("Error clearing auth data:", err);
      }
    }
    return Promise.reject(error);
  },
);

// API Methods
export const authApi = {
  register: async (data: {
    full_name: string;
    mobile_number: string;
    email?: string;
    password: string;
    role: "B2C_BUYER" | "B2B_BUYER" | "NURSERY_SELLER";
  }) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (data: { mobile_number: string; password: string }) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  logout: async () => {
    try {
      // Call logout endpoint if it exists
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Error calling logout endpoint:", error);
    }
    // Always clear local storage
    await authStorage.clearAll();
  },
};

export default api;
