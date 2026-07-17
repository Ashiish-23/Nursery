import {
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import authService from '../../features/auth/services/auth.service';
import { authStorage } from '../../shared/lib/auth-storage';
import type {
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from '../../shared/types/auth';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
  };

  useEffect(() => {
  const initializeAuth = async () => {
    const token = authStorage.getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const profile = await authService.getProfile();
      setUser(profile);
      setIsAuthenticated(true);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  void initializeAuth();
}, []);

  const login = async (data: LoginRequest): Promise<void> => {
  try {
    const response = await authService.login(data);

    setUser(response.user);
    setIsAuthenticated(true);
    setLoading(false);
  } catch {
    logout();
  }
};

  const register = async (data: RegisterRequest): Promise<void> => {
  try {
    const response = await authService.register(data);

    setUser(response.user);
    setIsAuthenticated(true);
    setLoading(false);
  } catch {
    logout();
  }
};

  const refreshUser = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch { logout(); }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
