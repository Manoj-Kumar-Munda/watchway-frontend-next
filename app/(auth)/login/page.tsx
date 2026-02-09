import type { Metadata } from 'next';
import SignInForm from '../_components/sign-in-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to your Watchway account to upload videos, subscribe to channels, and more.',
};

const LoginPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default LoginPage;
