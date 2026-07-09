import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

import { FirebaseErrorMessage } from "@/shared/enums/firebase-error.enum";

const firebaseConfig = {
  apiKey: "AIzaSyAEhCCTYZJsrwkqhh7zEKwZB2I-eQHSBCI",
  authDomain: "monster-concept.firebaseapp.com",
  projectId: "monster-concept",
  storageBucket: "monster-concept.firebasestorage.app",
  messagingSenderId: "179172389856",
  appId: "1:179172389856:web:add8184a9bced672a87185",
  measurementId: "G-C6G5C0ZDMN"
};

function hasFirebaseConfig() {
  return Object.values(firebaseConfig).every(Boolean);
}

export function getFirebaseApp(): FirebaseApp {
  if (!hasFirebaseConfig()) {
    throw new Error(FirebaseErrorMessage.MISSING_CONFIG);
  }

  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export function getGoogleProvider() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
}
