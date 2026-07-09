"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { products } from "@/features/products/data/products";
import type { CartContextValue } from "@/features/cart/interfaces/cart-context-value.interface";
import type { StoredCartItem } from "@/features/cart/interfaces/stored-cart-item.interface";
import { StorageKey } from "@/shared/enums/storage-key.enum";
import type { CartItem } from "@/shared/interfaces/cart.interface";
import { calculateCartTotals } from "@/shared/utils/calculate-cart-totals";

const CartContext = createContext<CartContextValue | null>(null);

function getInitialItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedValue = window.localStorage.getItem(StorageKey.CART);

  if (!storedValue) {
    return [];
  }

  try {
    const storedItems = JSON.parse(storedValue) as StoredCartItem[];
    return storedItems
      .map((storedItem) => {
        const product = products.find((item) => item.id === storedItem.productId);
        return product ? { product, quantity: storedItem.quantity } : null;
      })
      .filter((item): item is CartItem => Boolean(item));
  } catch {
    return [];
  }
}

function persistItems(items: CartItem[]) {
  const storedItems: StoredCartItem[] = items.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));

  window.localStorage.setItem(StorageKey.CART, JSON.stringify(storedItems));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(getInitialItems);
  const [lastAddedProductId, setLastAddedProductId] = useState("");

  const updateItems = (updater: (currentItems: CartItem[]) => CartItem[]) => {
    setItems((currentItems) => {
      const nextItems = updater(currentItems);
      persistItems(nextItems);
      return nextItems;
    });
  };

  const totals = calculateCartTotals(items);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: totals.itemCount,
      subtotal: totals.subtotal,
      lastAddedProductId,
      addItem: (product) => {
        setLastAddedProductId(product.id);
        updateItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.product.id === product.id);

          if (existingItem) {
            return currentItems.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            );
          }

          return [...currentItems, { product, quantity: 1 }];
        });
      },
      removeItem: (productId) =>
        updateItems((currentItems) => currentItems.filter((item) => item.product.id !== productId)),
      incrementItem: (productId) =>
        updateItems((currentItems) =>
          currentItems.map((item) =>
            item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        ),
      decrementItem: (productId) =>
        updateItems((currentItems) =>
          currentItems
            .map((item) =>
              item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        ),
      clearCart: () => updateItems(() => []),
    }),
    [items, lastAddedProductId, totals.itemCount, totals.subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart CartProvider içinde kullanılmalı.");
  }

  return context;
}
