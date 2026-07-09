"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Search, ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addItem } from "@/features/cart/store/cart-slice";
import { productSearchCopy, popularSearchTerms } from "@/features/products/data/product-search-data";
import { products } from "@/features/products/data/products";
import type { ProductSearchModalProps } from "@/features/products/interfaces/product-search-modal-props.interface";
import {
  selectCanAddMoreCompareProducts,
  selectCompareProductIds,
  toggleCompareProduct,
} from "@/features/products/store/compare-slice";
import { searchProducts } from "@/features/products/utils/search-products";
import { AppRoute } from "@/shared/enums/app-route.enum";
import type { Product } from "@/shared/interfaces/product.interface";
import { cn } from "@/shared/utils/cn";
import { formatCurrency } from "@/shared/utils/format-currency";

function getPreviewProducts(query: string, searchResults: Product[]) {
  if (query.trim()) {
    return searchResults;
  }

  return products.slice(0, 4);
}

export function ProductSearchModal({ isOpen, onOpenChange }: ProductSearchModalProps) {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const selectedProductIds = useAppSelector(selectCompareProductIds);
  const canAddMore = useAppSelector(selectCanAddMoreCompareProducts);
  const searchResults = useMemo(() => searchProducts(products, query), [query]);
  const visibleProducts = getPreviewProducts(query, searchResults);
  const hasQuery = Boolean(query.trim());

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
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
                className="fixed left-1/2 top-4 z-[90] flex max-h-[calc(100dvh-32px)] w-[calc(100vw-32px)] max-w-[820px] flex-col overflow-hidden rounded border border-white/10 bg-graphite text-white shadow-2xl sm:top-10 sm:max-h-[calc(100dvh-80px)]"
                initial={{ opacity: 0, x: "-50%", y: -18, scale: 0.98 }}
                animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                exit={{ opacity: 0, x: "-50%", y: -18, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="border-b border-white/10 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title className="text-2xl font-black">{productSearchCopy.title}</Dialog.Title>
                      <Dialog.Description className="mt-1 text-sm leading-6 text-white/60">
                        {productSearchCopy.description}
                      </Dialog.Description>
                    </div>
                    <Dialog.Close
                      className="grid size-10 shrink-0 place-items-center rounded border border-white/10 text-white/70 transition hover:border-acid hover:text-acid"
                      aria-label={productSearchCopy.closeAriaLabel}
                    >
                      <X size={18} />
                    </Dialog.Close>
                  </div>

                  <div className="mt-5 flex items-center gap-3 rounded border border-white/10 bg-white/[0.06] px-4 py-3 focus-within:border-acid">
                    <Search className="text-acid" size={20} />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder={productSearchCopy.inputPlaceholder}
                      className="min-w-0 flex-1 bg-transparent text-base font-bold text-white outline-none placeholder:text-white/36"
                      autoFocus
                    />
                  </div>

                  {!hasQuery && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {popularSearchTerms.map((term) => (
                        <button
                          key={term}
                          className="rounded border border-white/10 px-3 py-2 text-xs font-black text-white/70 transition hover:border-acid hover:text-acid"
                          onClick={() => setQuery(term)}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="overflow-y-auto p-5">
                  {visibleProducts.length === 0 ? (
                    <div className="grid min-h-64 place-items-center rounded border border-dashed border-white/16 bg-white/[0.03] p-8 text-center">
                      <div>
                        <div className="mx-auto grid size-14 place-items-center rounded-full bg-acid text-ink">
                          <SlidersHorizontal size={24} />
                        </div>
                        <h3 className="mt-5 text-xl font-black">{productSearchCopy.emptyTitle}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/60">{productSearchCopy.emptyDescription}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {!hasQuery && (
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-acid">
                          {productSearchCopy.initialTitle}
                        </p>
                      )}
                      {visibleProducts.map((product) => {
                        const selected = selectedProductIds.includes(product.id);
                        const compareDisabled = !selected && !canAddMore;

                        return (
                          <article
                            key={product.id}
                            className="grid gap-4 rounded border border-white/10 bg-white/[0.04] p-4 transition hover:border-acid/60 sm:grid-cols-[96px_1fr]"
                          >
                            <div className="grid size-24 place-items-center rounded bg-mist">
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={120}
                                height={90}
                                className="h-20 w-20 object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0">
                                  <p className="text-xs font-black uppercase tracking-[0.18em] text-acid">
                                    {product.family}
                                  </p>
                                  <h3 className="mt-1 truncate text-lg font-black">{product.name}</h3>
                                  <p className="mt-2 text-sm font-black text-white">{formatCurrency(product.price)}</p>
                                </div>
                                <div className="flex shrink-0 gap-2">
                                  <button
                                    className={cn(
                                      "inline-flex items-center justify-center gap-2 rounded border px-3 py-2 text-xs font-black transition",
                                      selected
                                        ? "border-acid bg-acid text-ink"
                                        : "border-white/10 text-white/70 hover:border-acid hover:text-acid",
                                      compareDisabled && "cursor-not-allowed opacity-45",
                                    )}
                                    onClick={() => dispatch(toggleCompareProduct(product))}
                                    disabled={compareDisabled}
                                  >
                                    {selected ? <Check size={15} /> : <SlidersHorizontal size={15} />}
                                    {selected ? productSearchCopy.selectedCompareLabel : productSearchCopy.compareLabel}
                                  </button>
                                  <button
                                    className="grid size-9 place-items-center rounded bg-acid text-ink transition hover:bg-volt"
                                    onClick={() => dispatch(addItem(product))}
                                    aria-label={productSearchCopy.addToCart}
                                  >
                                    <ShoppingCart size={17} />
                                  </button>
                                </div>
                              </div>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {product.specs.map((spec) => (
                                  <span
                                    key={spec.label}
                                    className="rounded border border-white/10 px-2 py-1 text-xs font-bold text-white/56"
                                  >
                                    {spec.label}: {spec.value}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 p-5">
                  <Link
                    href={AppRoute.PRODUCTS}
                    className="inline-flex w-full items-center justify-center rounded bg-acid px-5 py-3 text-sm font-black text-ink transition hover:bg-volt"
                    onClick={() => onOpenChange(false)}
                  >
                    {productSearchCopy.viewProducts}
                  </Link>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
