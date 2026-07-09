import type { Product } from "@/shared/interfaces/product.interface";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
}
