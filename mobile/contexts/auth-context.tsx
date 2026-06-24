import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  AuthContextType,
  AuthUser,
} from '@/types/auth';

import {
  authStorage,
  User,
} from '@/services/auth-storage';
import { authApi } from '@/services/api';
const AuthContext =
  createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  const restoreSession = async () => {
  try {
    const token = await authStorage.getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    const profile = await authApi.profile();

    setUser(profile);
  } catch (error) {
    console.error('Session restore failed:', error);

    await authStorage.clearAll();

    setUser(null);
  } finally {
    setLoading(false);
  }
};

  const login = async (
    userData: AuthUser,
    token: string,
  ) => {
    await authStorage.saveToken(token);

    await authStorage.saveUser(userData as User);

    setUser(userData);
  };

  const logout = async () => {
    await authStorage.clearAll();

    setUser(null);
  };

  useEffect(() => {
  const initializeAuth = async () => {
    await restoreSession();
  };

  void initializeAuth();
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider',
    );
  }

  return context;
}