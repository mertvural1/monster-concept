"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { compareCopy, compareLimit } from "@/features/products/data/product-compare-data";
import {
  clearCompare,
  removeCompareProduct,
  selectCompareProducts,
} from "@/features/products/store/compare-slice";
import type { Product } from "@/shared/interfaces/product.interface";
import { cn } from "@/shared/utils/cn";
import { formatCurrency } from "@/shared/utils/format-currency";

function getSpecLabels(selectedProducts: Product[]) {
  return Array.from(new Set(selectedProducts.flatMap((product) => product.specs.map((spec) => spec.label))));
}

export function ProductComparePanel() {
  const [isTableOpen, setIsTableOpen] = useState(false);
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(selectCompareProducts);
  const specLabels = useMemo(() => getSpecLabels(selectedProducts), [selectedProducts]);
  const slots = Array.from({ length: compareLimit });

  if (selectedProducts.length === 0) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed inset-x-0 bottom-4 z-40 max-h-[calc(100dvh-32px)] overflow-y-auto px-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mx-auto max-w-[1180px] rounded border border-white/10 bg-ink/95 p-4 text-white shadow-2xl backdrop-blur-xl">
          <div className="grid gap-4 lg:grid-cols-[190px_1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-acid">{compareCopy.dockEyebrow}</p>
              <h3 className="mt-1 text-lg font-black">{compareCopy.dockTitle}</h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {slots.map((_, index) => {
                const product = selectedProducts[index];

                return (
                  <div
                    key={product?.id ?? index}
                    className={cn(
                      "flex min-h-20 items-center gap-3 rounded border p-3",
                      product ? "border-white/10 bg-white/[0.05]" : "border-dashed border-white/16 bg-white/[0.02]",
                    )}
                  >
                    {product ? (
                      <>
                        <div className="grid size-14 shrink-0 place-items-center rounded bg-mist">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={72}
                            height={54}
                            className="h-11 w-11 object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-black">{product.name}</p>
                          <p className="mt-1 text-xs font-bold text-white/50">{formatCurrency(product.price)}</p>
                        </div>
                        <button
                          className="grid size-8 shrink-0 place-items-center rounded border border-white/10 text-white/60 transition hover:border-red-300 hover:text-red-200"
                          onClick={() => dispatch(removeCompareProduct(product.id))}
                          aria-label={compareCopy.removeAriaLabel}
                        >
                          <X size={15} />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-3 text-white/36">
                        <span className="grid size-10 place-items-center rounded border border-white/10">
                          <Plus size={16} />
                        </span>
                        <span className="text-sm font-black">{compareCopy.emptySlot}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2">
              <button
                className="inline-flex flex-1 items-center justify-center gap-2 rounded bg-acid px-4 py-3 text-sm font-black text-ink transition hover:bg-volt lg:flex-none"
                onClick={() => setIsTableOpen(true)}
              >
                <BarChart3 size={18} />
                {compareCopy.detailsButton}
              </button>
              <button
                className="grid size-11 place-items-center rounded border border-white/10 text-white/70 transition hover:border-red-300 hover:text-red-200"
                onClick={() => dispatch(clearCompare())}
                aria-label={compareCopy.clearButton}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <Dialog.Root open={isTableOpen} onOpenChange={setIsTableOpen}>
        <AnimatePresence>
          {isTableOpen && (
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
                  className="fixed left-1/2 top-1/2 z-[90] flex max-h-[calc(100dvh-32px)] w-[calc(100vw-32px)] max-w-[980px] flex-col overflow-hidden rounded border border-white/10 bg-graphite text-white shadow-2xl sm:max-h-[calc(100dvh-48px)]"
                  initial={{ opacity: 0, scale: 0.96, x: "-50%", y: "calc(-50% + 12px)" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  exit={{ opacity: 0, scale: 0.96, x: "-50%", y: "calc(-50% + 12px)" }}
                >
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
                    <div>
                      <Dialog.Title className="text-2xl font-black">{compareCopy.modalTitle}</Dialog.Title>
                      <Dialog.Description className="mt-1 text-sm leading-6 text-white/60">
                        {compareCopy.modalDescription}
                      </Dialog.Description>
                    </div>
                    <Dialog.Close
                      className="grid size-10 shrink-0 place-items-center rounded border border-white/10 text-white/70 transition hover:border-acid hover:text-acid"
                      aria-label={compareCopy.closeAriaLabel}
                    >
                      <X size={18} />
                    </Dialog.Close>
                  </div>

                  <div className="overflow-auto p-5">
                    <div className="min-w-[720px] overflow-hidden rounded border border-white/10">
                      <div
                        className="grid bg-ink"
                        style={{ gridTemplateColumns: `170px repeat(${selectedProducts.length}, minmax(180px, 1fr))` }}
                      >
                        <div className="border-r border-white/10 p-4" />
                        {selectedProducts.map((product) => (
                          <div key={product.id} className="border-r border-white/10 p-4 last:border-r-0">
                            <div className="grid h-28 place-items-center rounded bg-mist">
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={150}
                                height={110}
                                className="h-24 w-32 object-contain"
                              />
                            </div>
                            <h3 className="mt-3 text-base font-black">{product.name}</h3>
                          </div>
                        ))}
                      </div>

                      {[
                        [compareCopy.familyLabel, ...selectedProducts.map((product) => product.family)],
                        [compareCopy.priceLabel, ...selectedProducts.map((product) => formatCurrency(product.price))],
                        [compareCopy.ratingLabel, ...selectedProducts.map((product) => String(product.rating))],
                        [compareCopy.badgeLabel, ...selectedProducts.map((product) => product.badge)],
                        ...specLabels.map((label) => [
                          label,
                          ...selectedProducts.map(
                            (product) =>
                              product.specs.find((spec) => spec.label === label)?.value ?? compareCopy.missingSpec,
                          ),
                        ]),
                      ].map((row) => (
                        <div
                          key={row[0]}
                          className="grid border-t border-white/10"
                          style={{ gridTemplateColumns: `170px repeat(${selectedProducts.length}, minmax(180px, 1fr))` }}
                        >
                          {row.map((cell, index) => (
                            <div
                              key={`${row[0]}-${index}`}
                              className={cn(
                                "border-r border-white/10 p-4 text-sm last:border-r-0",
                                index === 0 ? "bg-white/[0.03] font-black text-acid" : "font-bold text-white/78",
                              )}
                            >
                              {cell}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
