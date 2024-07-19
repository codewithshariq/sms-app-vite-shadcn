import { LogInFormData, getAuthTokens, logInUser, logOutUser } from "@/api/auth";
import { StateCreator, create } from "zustand";
import { decodeJwt } from "jose";

export interface AuthSliceState {
  authLoading: boolean;
  isLogged: boolean;
  authError: string;
  role: "Primary User" | "Sub-User" | null;
}

export interface AuthSliceActions {
  login: (credentials: LogInFormData) => void;
  logout: () => void;
  init: () => void;
  setAuthData: (data: { role: AuthSliceState["role"] }) => void;
}

export type AuthSlice = AuthSliceState & AuthSliceActions;

const initialState: AuthSliceState = {
  authLoading: true,
  isLogged: false,
  authError: "",
  role: null,
};

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  setAuthData: ({ role }: { role: AuthSliceState["role"] }) =>
    set({
      authLoading: false,
      isLogged: true,
      role,
    }),
  login: async (credentials) => {
    set({ authLoading: true, authError: "" });
    try {
      const tokens = await logInUser(credentials);
      const decodedJwt = decodeJwt(tokens.accessToken);

      set({
        authLoading: false,
        isLogged: true,
        role: decodedJwt.role as AuthSliceState["role"],
      });
    } catch (err) {
      set({
        authLoading: false,
        isLogged: false,
        authError: "Authentication failed",
      });
    }
  },
  logout: () => {
    set({ authLoading: true, authError: "" });
    logOutUser().finally(() => set({ authLoading: false, isLogged: false, role: null }));
  },
  init: async () => {
    set({ authLoading: true, isLogged: false });
    const tokens = getAuthTokens();
    if (!tokens) {
      set({ authLoading: false, isLogged: false, role: null });
    } else {
      const decodedJwt = decodeJwt(tokens.accessToken);
      set({
        authLoading: false,
        isLogged: true,
        role: decodedJwt.role as AuthSliceState["role"],
      });
    }
  },
});

export const useAuthState = create(createAuthSlice);

export default createAuthSlice;
