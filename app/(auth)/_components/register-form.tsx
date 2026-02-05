'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '@/components/form';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/services/auth/auth.service';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerSchema = z.object({
  fullName: z.string().trim().min(1, 'Fullname is required'),
  username: z
    .string()
    .trim()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long')
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      'Username can only contain letters, numbers and (., _, -)'
    ),
  email: z
    .string()
    .min(1, 'Email is required')
    .refine((value) => emailRegex.test(value), 'Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  avatar: z
    .instanceof(FileList)
    .refine((files) => files && files.length > 0, 'Please upload a photo'),
  coverImage: z.instanceof(FileList).optional(),
});

export type RegisterFormSchema = z.infer<typeof registerSchema>;

const STEPS = [
  {
    id: 1,
    title: 'Sign up',
    description: 'Create your account',
  },
  { id: 2, title: 'Profile Setup', description: 'Personalize your profile' },
];

const RegisterForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const { mutateAsync: register } = useRegister();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormSchema) => {
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);

      if (data.avatar && data.avatar.length > 0) {
        formData.append('avatar', data.avatar[0]);
      }

      if (data.coverImage && data.coverImage.length > 0) {
        formData.append('coverImage', data.coverImage[0]);
      }

      await register(formData);
      toast.success('Registration successful! Please sign in.');
      router.push('/login');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    }
  };

  const handleNextStep = async () => {
    // Validate step 1 fields before proceeding
    const step1Fields: (keyof RegisterFormSchema)[] = ['email', 'password'];
    const isValid = await form.trigger(step1Fields);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  const currentStepInfo = STEPS[currentStep - 1];

  return (
    <Form.Root
      form={form}
      formId="register-form"
      onSubmit={onSubmit}
      className="w-full sm:max-w-md"
    >
      {/* Back Button - Top Right */}
      {currentStep > 1 && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-8 w-8"
          onClick={handlePreviousStep}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      )}

      <Form.Header
        title={currentStepInfo.title}
        description={currentStepInfo.description}
      />

      {/* Step Indicator */}
      <div className="px-6 pb-2">
        <div className="flex items-center justify-center gap-2">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= step.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.id}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-1 transition-colors ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Form.Content>
        {currentStep === 1 && (
          <>
            <Form.TextField<RegisterFormSchema>
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <Form.TextField<RegisterFormSchema>
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <Form.TextField<RegisterFormSchema>
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />
            <Form.TextField<RegisterFormSchema>
              name="username"
              label="Username"
              placeholder="Choose a username"
              type="text"
            />
            <div className="flex gap-4">
              <Form.FileField<RegisterFormSchema>
                name="avatar"
                label="Profile Picture"
                accept="image/*"
                required
              />
              <Form.FileField<RegisterFormSchema>
                name="coverImage"
                label="Cover Image"
                accept="image/*"
              />
            </div>
          </>
        )}
      </Form.Content>

      <Form.Footer className="flex flex-col gap-3">
        {currentStep < STEPS.length ? (
          <Button
            type="button"
            className="w-full rounded-full"
            onClick={handleNextStep}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Form.SubmitButton loadingText="Creating Account...">
            Sign Up
          </Form.SubmitButton>
        )}
        <Form.FooterLink
          text="Already have an account?"
          linkText="Sign In"
          onClick={() => router.push('/login')}
        />
      </Form.Footer>
    </Form.Root>
  );
};

export default RegisterForm;
