import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  offloadPageNo: number;
  incrementOffloadPageNo: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  offloadPageNo: 1,
  incrementOffloadPageNo: () => set((state) => ({ offloadPageNo: state.offloadPageNo + 1 })),
}));
