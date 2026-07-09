import type { AuthUser } from "@/shared/interfaces/auth-user.interface";

export interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  errorMessage: string;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
}
