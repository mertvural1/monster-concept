import type { CartItem } from "@/shared/interfaces/cart.interface";

export interface CartState {
  items: CartItem[];
  lastAddedProductId: string;
}
