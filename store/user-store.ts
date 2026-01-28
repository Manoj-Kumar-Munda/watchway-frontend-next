import { IUser } from '@/types/auth.types';
import { create } from 'zustand';

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
