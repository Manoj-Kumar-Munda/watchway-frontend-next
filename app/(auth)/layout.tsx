import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to your Watchway account to upload videos, subscribe to channels, and more.',
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="pt-10 md:pt-16 px-4 w-full">{children}</div>;
};

export default AuthLayout;
