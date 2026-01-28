'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AuthForm } from './auth-form';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/services/auth/auth.service';
import { toast } from 'sonner';

const signInSchema = z.object({
  userId: z.union([
    z.string().email('Invalid email address'),
    z.string().min(3, 'Invalid user id'),
  ]),
  password: z.string().min(3, 'Password must be at least 3 characters.'),
});

export type SignInFormSchema = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();

  const { mutateAsync: signIn } = useLogin();

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormSchema) => {
    try {
      await signIn(data);
      toast.success('Login successful');
      router.push('/');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    }
  };

  return (
    <AuthForm.Root form={form} formId="sign-in-form" onSubmit={onSubmit}>
      <AuthForm.Header
        title="Sign In"
        description="Sign in to your account to continue."
      />
      <AuthForm.Content>
        <AuthForm.TextField<SignInFormSchema>
          name="userId"
          label="Email or Username"
          placeholder="Enter your email or username"
          type="text"
        />
        <AuthForm.TextField<SignInFormSchema>
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
      </AuthForm.Content>
      <AuthForm.Footer>
        <AuthForm.SubmitButton loadingText="Signing In...">
          Sign In
        </AuthForm.SubmitButton>
        <AuthForm.FooterLink
          text="Don't have an account?"
          linkText="Sign Up"
          onClick={() => router.push('/register')}
        />
      </AuthForm.Footer>
    </AuthForm.Root>
  );
};

export default SignInForm;
