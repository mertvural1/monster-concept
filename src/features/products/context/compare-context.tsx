"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { compareLimit } from "@/features/products/data/product-compare-data";
import type { CompareContextValue } from "@/features/products/interfaces/compare-context-value.interface";
import type { Product } from "@/shared/interfaces/product.interface";

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const value = useMemo<CompareContextValue>(() => {
    const selectedProductIds = selectedProducts.map((product) => product.id);

    return {
      selectedProducts,
      selectedProductIds,
      canAddMore: selectedProducts.length < compareLimit,
      isSelected: (productId) => selectedProductIds.includes(productId),
      toggleProduct: (product) => {
        setSelectedProducts((currentProducts) => {
          if (currentProducts.some((item) => item.id === product.id)) {
            return currentProducts.filter((item) => item.id !== product.id);
          }

          if (currentProducts.length >= compareLimit) {
            return currentProducts;
          }

          return [...currentProducts, product];
        });
      },
      removeProduct: (productId) =>
        setSelectedProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId)),
      clearCompare: () => setSelectedProducts([]),
    };
  }, [selectedProducts]);

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error("useCompare CompareProvider içinde kullanılmalı.");
  }

  return context;
}
