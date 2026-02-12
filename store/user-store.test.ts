import { describe, expect, it } from 'vitest';
import { useUserStore } from './user-store';

describe('useUserStore', () => {
  it('sets and clears the user', () => {
    const mockUser = {
      _id: 'user-1',
      username: 'alice',
      email: 'alice@example.com',
      fullName: 'Alice Doe',
      avatar: 'avatar.png',
      coverImage: 'cover.png',
      watchHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    useUserStore.getState().setUser(mockUser);
    expect(useUserStore.getState().user).toEqual(mockUser);

    useUserStore.getState().logout();
    expect(useUserStore.getState().user).toBeNull();
  });
});
