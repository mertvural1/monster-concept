import type { Product } from "@/shared/interfaces/product.interface";

export interface CompareContextValue {
  selectedProducts: Product[];
  selectedProductIds: string[];
  canAddMore: boolean;
  isSelected: (productId: string) => boolean;
  toggleProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearCompare: () => void;
}
