import { AuthClient, AuthState } from "@shinederu/auth-core";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

type AuthContextValue = {
  client: AuthClient;
  state: AuthState;
  restoreSession: () => void;
  refreshMe: () => Promise<void>;
};

const AuthReactContext = createContext<AuthContextValue | null>(null);

export type AuthProviderProps = PropsWithChildren<{
  client: AuthClient;
  autoRefreshOnMount?: boolean;
}>;

export const AuthProvider = ({ client, autoRefreshOnMount = true, children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(client.getState());

  useEffect(() => client.subscribe(setState), [client]);

  useEffect(() => {
    if (!autoRefreshOnMount) return;

    void client.me();
  }, [autoRefreshOnMount, client]);

  const value = useMemo<AuthContextValue>(
    () => ({
      client,
      state,
      restoreSession: () => {
        client.restoreSession();
      },
      refreshMe: async () => {
        await client.me();
      },
    }),
    [client, state]
  );

  return <AuthReactContext.Provider value={value}>{children}</AuthReactContext.Provider>;
};

export const useAuthClient = (): AuthContextValue => {
  const ctx = useContext(AuthReactContext);
  if (!ctx) {
    throw new Error("useAuthClient must be used inside <AuthProvider>");
  }

  return ctx;
};

export const useAuth = () => {
  const { client, state, refreshMe, restoreSession } = useAuthClient();

  return {
    state,
    session: state.session,
    user: state.session.user,
    isAuthenticated: state.session.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,

    restoreSession,
    refreshMe,

    login: client.login.bind(client),
    register: client.register.bind(client),
    me: client.me.bind(client),
    logout: client.logout.bind(client),
    logoutAll: client.logoutAll.bind(client),
    requestPasswordReset: client.requestPasswordReset.bind(client),
    resetPassword: client.resetPassword.bind(client),
    requestEmailUpdate: client.requestEmailUpdate.bind(client),
    confirmEmailUpdate: client.confirmEmailUpdate.bind(client),
    verifyEmail: client.verifyEmail.bind(client),
    revokeRegister: client.revokeRegister.bind(client),
    revokeEmailUpdate: client.revokeEmailUpdate.bind(client),
    updateProfile: client.updateProfile.bind(client),
    updateAvatar: client.updateAvatar.bind(client),
    deleteAccount: client.deleteAccount.bind(client),
    invoke: client.invoke.bind(client),
  };
};
