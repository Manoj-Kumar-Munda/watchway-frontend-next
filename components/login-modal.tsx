'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import SignInForm from '@/app/(auth)/_components/sign-in-form';
import { useAuthGuard } from '@/components/providers/auth-guard-provider';

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal } = useAuthGuard();

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in required</DialogTitle>
          <DialogDescription>
            Please sign in to continue with this action.
          </DialogDescription>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
