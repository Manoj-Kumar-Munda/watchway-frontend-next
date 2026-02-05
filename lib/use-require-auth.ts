import { useAuthGuard } from '@/components/providers/auth-guard-provider';
import { useUserStore } from '@/store';

export const useRequireAuth = () => {
  const { requireAuth, isLoginModalOpen, closeLoginModal, openLoginModal } =
    useAuthGuard();
  const user = useUserStore((state) => state.user);

  return {
    requireAuth,
    isAuthenticated: !!user,
    isLoginModalOpen,
    closeLoginModal,
    openLoginModal,
  };
};
