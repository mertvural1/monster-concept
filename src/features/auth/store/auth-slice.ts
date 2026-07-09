import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthState } from "@/features/auth/interfaces/auth-state.interface";
import type { AuthUser } from "@/shared/interfaces/auth-user.interface";

const initialState: AuthState = {
  user: null,
  isLoading: true,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
    clearAuthError: (state) => {
      state.errorMessage = "";
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { clearAuthError, setAuthError, setAuthLoading, setAuthUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
