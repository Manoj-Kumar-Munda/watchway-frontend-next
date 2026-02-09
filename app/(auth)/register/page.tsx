import type { Metadata } from 'next';
import RegisterForm from '../_components/register-form';

export const metadata: Metadata = {
  title: 'Create Account',
  description:
    'Create a new Watchway account to start uploading videos, subscribing to channels, and joining our community.',
};

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
