"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { signInWithPopup, signOut } from "firebase/auth";
import { Chrome, Loader2, LogOut, ShieldCheck, X } from "lucide-react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loginModalCopy } from "@/features/auth/data/login-modal-data";
import type { LoginModalProps } from "@/features/auth/interfaces/login-modal-props.interface";
import { getFirebaseAuth, getGoogleProvider } from "@/features/auth/services/firebase-client";
import { clearAuthError, setAuthError } from "@/features/auth/store/auth-slice";
import { FirebaseErrorMessage } from "@/shared/enums/firebase-error.enum";
import { getUserInitials } from "@/shared/utils/get-user-initials";

export function LoginModal({ isOpen, onOpenChange }: LoginModalProps) {
  const dispatch = useAppDispatch();
  const { user, isLoading, errorMessage } = useAppSelector((state) => state.auth);

  const loginWithGoogle = async () => {
    dispatch(clearAuthError());

    try {
      await signInWithPopup(getFirebaseAuth(), getGoogleProvider());
      onOpenChange(false);
    } catch {
      dispatch(setAuthError(FirebaseErrorMessage.LOGIN_FAILED));
    }
  };

  const logout = async () => {
    dispatch(clearAuthError());
    await signOut(getFirebaseAuth());
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen);
        dispatch(clearAuthError());
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[80] bg-ink/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-[90] flex max-h-[calc(100dvh-32px)] w-[calc(100vw-32px)] max-w-[430px] flex-col overflow-hidden rounded border border-white/10 bg-graphite text-white shadow-2xl"
                initial={{ opacity: 0, scale: 0.94, x: "-50%", y: "calc(-50% + 18px)" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.94, x: "-50%", y: "calc(-50% + 18px)" }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
              >
                <div className="relative border-b border-white/10 p-6">
                  <Dialog.Close className="absolute right-4 top-4 grid size-9 place-items-center rounded border border-white/10 text-white/70 transition hover:border-acid hover:text-acid" aria-label={loginModalCopy.closeAriaLabel}>
                    <X size={18} />
                  </Dialog.Close>
                  <div className="grid size-12 place-items-center rounded bg-acid text-ink">
                    <ShieldCheck size={24} />
                  </div>
                  <Dialog.Title className="mt-5 text-2xl font-black">{loginModalCopy.title}</Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm leading-6 text-white/60">
                    {loginModalCopy.description}
                  </Dialog.Description>
                </div>

                <div className="overflow-y-auto p-6">
                  {user ? (
                    <div>
                      <div className="flex items-center gap-4 rounded border border-white/10 bg-white/[0.04] p-4">
                        {user.photoUrl ? (
                          <Image
                            src={user.photoUrl}
                            alt={user.displayName}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="grid size-12 place-items-center rounded-full bg-acid text-sm font-black text-ink">
                            {getUserInitials(user.displayName, "M")}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-black">{user.displayName}</p>
                          <p className="truncate text-xs text-white/56">{user.email}</p>
                        </div>
                      </div>
                      <button
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded border border-white/10 px-5 py-3 text-sm font-black text-white transition hover:border-acid hover:text-acid"
                        onClick={logout}
                      >
                        <LogOut size={18} />
                        {loginModalCopy.logoutButton}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="inline-flex w-full items-center justify-center gap-3 rounded bg-white px-5 py-3 text-sm font-black text-ink transition hover:bg-acid"
                      onClick={loginWithGoogle}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Chrome size={18} />}
                      {loginModalCopy.googleButton}
                    </button>
                  )}

                  {errorMessage && (
                    <p className="mt-4 rounded border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-100">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
