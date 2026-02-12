import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SignInForm from './sign-in-form';

const { pushMock, loginMock, toastSuccessMock, toastErrorMock } = vi.hoisted(
  () => ({
    pushMock: vi.fn(),
    loginMock: vi.fn(),
    toastSuccessMock: vi.fn(),
    toastErrorMock: vi.fn(),
  })
);

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock('@/services/auth/auth.service', () => ({
  useLogin: () => ({
    mutateAsync: loginMock,
  }),
}));

vi.mock('sonner', () => ({
  toast: {
    success: toastSuccessMock,
    error: toastErrorMock,
  },
}));

describe('SignInForm', () => {
  beforeEach(() => {
    pushMock.mockReset();
    loginMock.mockReset();
    toastSuccessMock.mockReset();
    toastErrorMock.mockReset();
  });

  it('submits valid credentials and redirects on success', async () => {
    loginMock.mockResolvedValue({});
    const user = userEvent.setup();

    render(<SignInForm />);

    await user.type(
      screen.getByRole('textbox', { name: /email or username/i }),
      'alice@example.com'
    );
    await user.type(screen.getByLabelText(/password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /^sign in$/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        userId: 'alice@example.com',
        password: 'secret123',
      });
    });

    expect(toastSuccessMock).toHaveBeenCalledWith('Login successful');
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('shows an error toast when login fails', async () => {
    loginMock.mockRejectedValue(new Error('Invalid credentials'));
    const user = userEvent.setup();

    render(<SignInForm />);

    await user.type(
      screen.getByRole('textbox', { name: /email or username/i }),
      'alice@example.com'
    );
    await user.type(screen.getByLabelText(/password/i), 'wrong-pass');
    await user.click(screen.getByRole('button', { name: /^sign in$/i }));

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith('Invalid credentials');
    });

    expect(pushMock).not.toHaveBeenCalled();
  });
});
