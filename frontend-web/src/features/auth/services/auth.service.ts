import api from '../../../shared/api/api';
import { authStorage } from '../../../shared/lib/auth-storage';
import type {
  AuthUser,
  AuthResponse,
  LoginRequest,
  RegisterRequest
} from '../../../shared/types/auth';

const getErrorMessage = (error: unknown): string | undefined => {
  const e = error as { response?: { data?: { message?: string } } };
  return e.response?.data?.message;
};

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      authStorage.setToken(response.data.access_token);
      return response.data;
    } catch (error: unknown) {
      console.error("Login failed:", getErrorMessage(error));
      throw error;
    }
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      authStorage.setToken(response.data.access_token);
      return response.data;
    } catch (error: unknown) {
      console.error('Registration failed:', getErrorMessage(error));
      throw error;
    }
  },

  async getProfile(): Promise<AuthUser> {
    try {
      const response = await api.get<AuthResponse>('/auth/profile');
      return response.data.user;
    } catch (error: unknown) {
      console.error('Profile fetch failed:', getErrorMessage(error));
      throw error;
    }
  },

  logout(): void {
    authStorage.removeToken();
  }
}

export default authService;
