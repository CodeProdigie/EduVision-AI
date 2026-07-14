import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: Boolean(user?.role === 'admin'),
        }),
      register: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: Boolean(user?.role === 'admin'),
        }),
      logout: () => set(initialState),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    },
  ),
);
