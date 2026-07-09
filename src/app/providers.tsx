"use client";

import { Provider } from "react-redux";
import type { ReactNode } from "react";

import { store } from "@/app/store";
import { AuthStateListener } from "@/features/auth/components/auth-state-listener";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthStateListener />
      {children}
    </Provider>
  );
}
