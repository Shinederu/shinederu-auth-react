import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

export type UseRequireAuthOptions = {
  onUnauthenticated?: () => void;
};

export const useRequireAuth = ({ onUnauthenticated }: UseRequireAuthOptions = {}) => {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      onUnauthenticated?.();
    }
  }, [auth.isLoading, auth.isAuthenticated, onUnauthenticated]);

  return auth;
};
