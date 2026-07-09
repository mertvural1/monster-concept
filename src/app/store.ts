import { configureStore, isAnyOf, type Middleware } from "@reduxjs/toolkit";

import { authReducer } from "@/features/auth/store/auth-slice";
import type { CartState } from "@/features/cart/interfaces/cart-state.interface";
import {
  addItem,
  cartReducer,
  clearCart,
  decrementItem,
  incrementItem,
  persistCartItems,
  removeItem,
} from "@/features/cart/store/cart-slice";
import { compareReducer } from "@/features/products/store/compare-slice";

const cartPersistenceMiddleware: Middleware<object, { cart: CartState }> = (api) => (next) => (action) => {
  const result = next(action);

  if (isAnyOf(addItem, removeItem, incrementItem, decrementItem, clearCart)(action)) {
    persistCartItems(api.getState().cart.items);
  }

  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    compare: compareReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartPersistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
