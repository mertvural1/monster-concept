import type { AuthUser } from "@/shared/interfaces/auth-user.interface";

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  errorMessage: string;
}
