import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const getPreferredTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: getPreferredTheme(),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    },
  ),
);
