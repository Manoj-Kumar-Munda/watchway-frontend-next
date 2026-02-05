'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './auth-provider';
import { AuthGuardProvider } from './auth-guard-provider';
import { getQueryClient } from '@/lib/query-client';
import LoginModal from '@/components/login-modal';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthGuardProvider>
          {children}
          <LoginModal />
        </AuthGuardProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
