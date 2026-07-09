import type { Product } from "@/shared/interfaces/product.interface";

function normalizeSearchValue(value: string) {
  return value.toLocaleLowerCase("tr-TR").trim();
}

export function searchProducts(products: Product[], query: string) {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return [];
  }

  return products.filter((product) => {
    const searchableValues = [
      product.name,
      product.family,
      product.badge,
      product.category,
      ...product.specs.flatMap((spec) => [spec.label, spec.value]),
    ];

    return searchableValues.some((value) => normalizeSearchValue(value).includes(normalizedQuery));
  });
}
