import { useUserStore } from '@/store/user-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { AuthGuardProvider, useAuthGuard } from './auth-guard-provider';

const Harness = () => {
  const { requireAuth, isLoginModalOpen } = useAuthGuard();
  const [executedCount, setExecutedCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => requireAuth(() => setExecutedCount((prev) => prev + 1))}
      >
        protected-action
      </button>
      <span>{isLoginModalOpen ? 'modal-open' : 'modal-closed'}</span>
      <span>executed:{executedCount}</span>
    </div>
  );
};

describe('AuthGuardProvider', () => {
  it('opens the login modal for unauthenticated users', async () => {
    useUserStore.setState({ user: null });
    const user = userEvent.setup();

    render(
      <AuthGuardProvider>
        <Harness />
      </AuthGuardProvider>
    );

    await user.click(screen.getByRole('button', { name: 'protected-action' }));

    expect(screen.getByText('modal-open')).toBeInTheDocument();
    expect(screen.getByText('executed:0')).toBeInTheDocument();
  });

  it('executes callback directly for authenticated users', async () => {
    useUserStore.setState({
      user: {
        _id: 'user-1',
        username: 'alice',
        email: 'alice@example.com',
        fullName: 'Alice Doe',
        avatar: 'avatar.png',
        coverImage: 'cover.png',
        watchHistory: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    const user = userEvent.setup();

    render(
      <AuthGuardProvider>
        <Harness />
      </AuthGuardProvider>
    );

    await user.click(screen.getByRole('button', { name: 'protected-action' }));

    expect(screen.getByText('modal-closed')).toBeInTheDocument();
    expect(screen.getByText('executed:1')).toBeInTheDocument();
  });
});
