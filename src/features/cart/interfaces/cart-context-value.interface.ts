import type { CartItem } from "@/shared/interfaces/cart.interface";
import type { Product } from "@/shared/interfaces/product.interface";

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  lastAddedProductId: string;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clearCart: () => void;
}
