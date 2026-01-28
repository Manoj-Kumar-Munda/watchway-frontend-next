'use client';

import { useEffect } from 'react';
import { useCurrentUser } from '@/services/auth/auth.service';
import { useUserStore } from '@/store/user-store';
import { toast } from 'sonner';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, error } = useCurrentUser();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (data) {
      setUser(data?.data?.data);
    }
  }, [data, setUser]);

  if (error) {
    toast.error(error.message || 'Something went wrong');
  }
  return <>{children}</>;
}
