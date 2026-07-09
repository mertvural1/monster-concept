import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import { products } from "@/features/products/data/products";
import type { CartState } from "@/features/cart/interfaces/cart-state.interface";
import type { StoredCartItem } from "@/features/cart/interfaces/stored-cart-item.interface";
import { StorageKey } from "@/shared/enums/storage-key.enum";
import type { CartItem } from "@/shared/interfaces/cart.interface";
import type { Product } from "@/shared/interfaces/product.interface";
import { calculateCartTotals } from "@/shared/utils/calculate-cart-totals";

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

export function persistCartItems(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  const storedItems: StoredCartItem[] = items.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));

  window.localStorage.setItem(StorageKey.CART, JSON.stringify(storedItems));
}

const initialState: CartState = {
  items: getInitialItems(),
  lastAddedProductId: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      state.lastAddedProductId = action.payload.id;
      const existingItem = state.items.find((item) => item.product.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    incrementItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find((item) => item.product.id === action.payload);

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      state.items = state.items
        .map((item) =>
          item.product.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, clearCart, decrementItem, incrementItem, removeItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectLastAddedProductId = (state: RootState) => state.cart.lastAddedProductId;
export const selectCartTotals = (state: RootState) => calculateCartTotals(state.cart.items);
