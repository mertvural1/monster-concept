import type { ProductBadge } from "@/shared/enums/product-badge.enum";
import type { ProductCategory } from "@/shared/enums/product-category.enum";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  family: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: ProductCategory;
  badge: ProductBadge;
  specs: ProductSpec[];
}
