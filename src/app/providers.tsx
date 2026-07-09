"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/features/auth/context/auth-context";
import { CartProvider } from "@/features/cart/context/cart-context";
import { CompareProvider } from "@/features/products/context/compare-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CompareProvider>{children}</CompareProvider>
      </CartProvider>
    </AuthProvider>
  );
}
