import { useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { authStorage } from '@/services/auth-storage';

interface User {
  id: string;
  email?: string;
  mobileNumber: string;
  fullName: string;
  role: 'B2C_BUYER' | 'B2B_BUYER' | 'NURSERY_SELLER';
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await authStorage.getToken();
        const userData = await authStorage.getUser();
        
        if (token) {
          setIsSignedIn(true);
          setUser(userData);
        } else {
          setIsSignedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        setIsSignedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  return { isLoading, user, isSignedIn };
};

export const useAuthNavigation = () => {
  const { isLoading, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'register';

    if (isSignedIn && inAuthGroup) {
      // Redirect to home if signed in and on auth screen
      router.replace('/');
    } else if (!isSignedIn && !inAuthGroup) {
      // Redirect to login if not signed in and not on auth screen
      router.replace('/login');
    }
  }, [isSignedIn, segments, isLoading, router]);

  return { isLoading };
};
