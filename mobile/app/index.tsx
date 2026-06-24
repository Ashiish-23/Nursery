import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import { useAuth } from '@/contexts/auth-context';

export default function Index() {
  const router = useRouter();

  const {
    loading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (isAuthenticated) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [loading, isAuthenticated]);

  return null;
}