"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect } from "react";

import { useAppDispatch } from "@/app/hooks";
import { loginModalCopy } from "@/features/auth/data/login-modal-data";
import { getFirebaseAuth } from "@/features/auth/services/firebase-client";
import { setAuthError, setAuthUser } from "@/features/auth/store/auth-slice";
import { FirebaseErrorMessage } from "@/shared/enums/firebase-error.enum";
import type { AuthUser } from "@/shared/interfaces/auth-user.interface";

function mapFirebaseUser(user: User): AuthUser {
  return {
    id: user.uid,
    displayName: user.displayName ?? loginModalCopy.defaultDisplayName,
    email: user.email ?? "",
    photoUrl: user.photoURL ?? "",
  };
}

export function AuthStateListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let unsubscribe = () => undefined as void;

    try {
      const auth = getFirebaseAuth();
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        dispatch(setAuthUser(currentUser ? mapFirebaseUser(currentUser) : null));
      });
    } catch (error) {
      dispatch(setAuthError(error instanceof Error ? error.message : FirebaseErrorMessage.MISSING_CONFIG));
    }

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}
