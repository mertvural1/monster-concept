import { ProductCategory } from "@/shared/enums/product-category.enum";

export const productExplorerCopy = {
  eyebrow: "Öne çıkan ürünler",
  title: "İhtiyacına göre canavarını seç.",
};

export const categoryLabels: Record<ProductCategory, string> = {
  [ProductCategory.ALL]: "Tümü",
  [ProductCategory.GAMING]: "Oyun",
  [ProductCategory.CREATOR]: "Creator",
  [ProductCategory.BUSINESS]: "İş",
  [ProductCategory.DESKTOP]: "Masaüstü",
};

export const productCategories = Object.values(ProductCategory);
