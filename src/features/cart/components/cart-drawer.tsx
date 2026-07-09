"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, Zap } from "lucide-react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { cartDrawerCopy } from "@/features/cart/data/cart-drawer-data";
import type { CartDrawerProps } from "@/features/cart/interfaces/cart-drawer-props.interface";
import {
  clearCart,
  decrementItem,
  incrementItem,
  removeItem,
  selectCartItems,
  selectCartTotals,
  selectLastAddedProductId,
} from "@/features/cart/store/cart-slice";
import { formatCurrency } from "@/shared/utils/format-currency";

export function CartDrawer({ isOpen, onOpenChange }: CartDrawerProps) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const { itemCount, subtotal } = useAppSelector(selectCartTotals);
  const lastAddedProductId = useAppSelector(selectLastAddedProductId);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[80] bg-ink/76 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.aside
                className="fixed bottom-0 right-0 top-0 z-[90] flex h-dvh w-full max-w-[470px] flex-col border-l border-white/10 bg-ink text-white shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
              >
                <div className="flex items-center justify-between border-b border-white/10 p-5">
                  <div>
                    <Dialog.Title className="text-2xl font-black">{cartDrawerCopy.title}</Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-white/56">
                      {itemCount > 0 ? `${itemCount} ${cartDrawerCopy.readySuffix}` : cartDrawerCopy.emptyDescription}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close className="grid size-10 place-items-center rounded border border-white/10 text-white/70 transition hover:border-acid hover:text-acid" aria-label={cartDrawerCopy.closeAriaLabel}>
                    <X size={19} />
                  </Dialog.Close>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                  {items.length === 0 ? (
                    <div className="grid min-h-[420px] place-items-center rounded border border-dashed border-white/16 bg-white/[0.03] p-8 text-center">
                      <div>
                        <div className="mx-auto grid size-16 place-items-center rounded-full bg-acid text-ink shadow-glow">
                          <ShoppingBag size={28} />
                        </div>
                        <h3 className="mt-6 text-xl font-black">{cartDrawerCopy.emptyTitle}</h3>
                        <p className="mt-3 text-sm leading-6 text-white/60">
                          {cartDrawerCopy.emptyText}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      <AnimatePresence initial={false}>
                        {items.map((item) => {
                          const isLastAdded = item.product.id === lastAddedProductId;

                          return (
                            <motion.article
                              key={item.product.id}
                              className="relative overflow-hidden rounded border border-white/10 bg-white/[0.04] p-4"
                              layout
                              initial={{ opacity: 0, y: 18, scale: 0.98 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: isLastAdded ? [1, 1.02, 1] : 1,
                              }}
                              exit={{ opacity: 0, x: 60, scale: 0.96 }}
                              transition={{ duration: 0.24 }}
                            >
                              {isLastAdded && (
                                <motion.div
                                  className="absolute inset-x-0 top-0 h-1 bg-acid"
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  style={{ transformOrigin: "left" }}
                                />
                              )}
                              <div className="flex gap-4">
                                <div className="grid size-24 shrink-0 place-items-center rounded bg-mist">
                                  <Image
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    width={120}
                                    height={90}
                                    className="h-20 w-20 object-contain"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-black uppercase tracking-[0.18em] text-acid">
                                    {item.product.family}
                                  </p>
                                  <h3 className="mt-1 truncate text-base font-black">{item.product.name}</h3>
                                  <p className="mt-2 text-sm font-black text-white">
                                    {formatCurrency(item.product.price)}
                                  </p>

                                  <div className="mt-4 flex items-center justify-between gap-3">
                                    <div className="flex items-center rounded border border-white/10">
                                      <button
                                        className="grid size-9 place-items-center text-white/70 transition hover:text-acid"
                                        onClick={() => dispatch(decrementItem(item.product.id))}
                                        aria-label={cartDrawerCopy.decrementAriaLabel}
                                      >
                                        <Minus size={15} />
                                      </button>
                                      <span className="grid h-9 min-w-10 place-items-center text-sm font-black">
                                        {item.quantity}
                                      </span>
                                      <button
                                        className="grid size-9 place-items-center text-white/70 transition hover:text-acid"
                                        onClick={() => dispatch(incrementItem(item.product.id))}
                                        aria-label={cartDrawerCopy.incrementAriaLabel}
                                      >
                                        <Plus size={15} />
                                      </button>
                                    </div>
                                    <button
                                      className="grid size-9 place-items-center rounded border border-white/10 text-white/60 transition hover:border-red-300 hover:text-red-200"
                                      onClick={() => dispatch(removeItem(item.product.id))}
                                      aria-label={cartDrawerCopy.removeAriaLabel}
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.article>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 bg-graphite p-5">
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>{cartDrawerCopy.subtotalLabel}</span>
                    <span className="text-2xl font-black text-white">{formatCurrency(subtotal)}</span>
                  </div>
                  <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded bg-acid px-5 py-3 text-sm font-black text-ink transition hover:bg-volt disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30" disabled={items.length === 0}>
                    <Zap size={18} />
                    {cartDrawerCopy.checkoutButton}
                  </button>
                  {items.length > 0 && (
                    <button
                      className="mt-3 w-full rounded border border-white/10 px-5 py-3 text-sm font-black text-white/70 transition hover:border-red-300 hover:text-red-200"
                      onClick={() => dispatch(clearCart())}
                    >
                      {cartDrawerCopy.clearButton}
                    </button>
                  )}
                </div>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
