'use client';

import { useEffect } from 'react';
import { useCurrentUser } from '@/services/auth/auth.service';
import { useUserStore } from '@/store/user-store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, error } = useCurrentUser();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (data) {
      setUser(data?.data?.data);
    }
  }, [data, setUser]);

  if (error) {
    console.error(error);
  }

  return <>{children}</>;
}
