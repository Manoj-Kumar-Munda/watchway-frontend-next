'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
} from 'react';
import { useUserStore } from '@/store';

interface AuthGuardContextValue {
  isLoginModalOpen: boolean;
  requireAuth: (callback: () => void) => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthGuardContext = createContext<AuthGuardContextValue | null>(null);

export const useAuthGuard = () => {
  const context = useContext(AuthGuardContext);
  if (!context) {
    throw new Error('useAuthGuard must be used within an AuthGuardProvider');
  }
  return context;
};

export function AuthGuardProvider({ children }: PropsWithChildren) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const requireAuth = useCallback(
    (callback: () => void) => {
      if (user) {
        // User is authenticated, execute the callback
        callback();
      } else {
        // User is not authenticated, open login modal
        openLoginModal();
      }
    },
    [user, openLoginModal]
  );

  return (
    <AuthGuardContext.Provider
      value={{
        isLoginModalOpen,
        requireAuth,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthGuardContext.Provider>
  );
}
