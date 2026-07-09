import type { CartItem, CartTotals } from "@/shared/interfaces/cart.interface";

export function calculateCartTotals(items: CartItem[]): CartTotals {
  return items.reduce<CartTotals>(
    (totals, item) => ({
      itemCount: totals.itemCount + item.quantity,
      subtotal: totals.subtotal + item.product.price * item.quantity,
    }),
    { itemCount: 0, subtotal: 0 },
  );
}
