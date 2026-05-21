import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  adminMaxHold: number;
  setAdminMaxHold: (amount: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  adminMaxHold: 1000,
  setAdminMaxHold: (amount) => set({ adminMaxHold: amount }),
}));
