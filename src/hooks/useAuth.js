import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const auth = useAuthStore();

  return {
    ...auth,
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isAdmin: auth.isAdmin,
  };
};
