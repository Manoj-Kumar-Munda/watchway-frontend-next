import { create } from 'zustand';

interface IAppStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const appStore = create<IAppStore>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

export default appStore;
