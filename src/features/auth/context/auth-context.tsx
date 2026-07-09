"use client";

import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import type { AuthContextValue } from "@/features/auth/interfaces/auth-context-value.interface";
import { getFirebaseAuth, getGoogleProvider } from "@/features/auth/services/firebase-client";
import { FirebaseErrorMessage } from "@/shared/enums/firebase-error.enum";
import type { AuthUser } from "@/shared/interfaces/auth-user.interface";

const AuthContext = createContext<AuthContextValue | null>(null);

function mapFirebaseUser(user: User): AuthUser {
  return {
    id: user.uid,
    displayName: user.displayName ?? "Monster Kullanıcısı",
    email: user.email ?? "",
    photoUrl: user.photoURL ?? "",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let unsubscribe = () => undefined as void;

    try {
      const auth = getFirebaseAuth();
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser ? mapFirebaseUser(currentUser) : null);
        setIsLoading(false);
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : FirebaseErrorMessage.MISSING_CONFIG);
      setIsLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      errorMessage,
      loginWithGoogle: async () => {
        setErrorMessage("");

        try {
          await signInWithPopup(getFirebaseAuth(), getGoogleProvider());
        } catch {
          setErrorMessage(FirebaseErrorMessage.LOGIN_FAILED);
        }
      },
      logout: async () => {
        setErrorMessage("");
        await signOut(getFirebaseAuth());
      },
      clearAuthError: () => setErrorMessage(""),
    }),
    [errorMessage, isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth AuthProvider içinde kullanılmalı.");
  }

  return context;
}
