"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/features/auth/context/auth-context";
import { CartProvider } from "@/features/cart/context/cart-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
