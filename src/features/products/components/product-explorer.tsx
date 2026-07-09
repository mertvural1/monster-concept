"use client";

import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { ProductComparePanel } from "@/features/products/components/product-compare-panel";
import { ProductCard } from "@/features/products/components/product-card";
import {
  categoryLabels,
  productCategories,
  productExplorerCopy,
} from "@/features/products/data/product-explorer-data";
import { products } from "@/features/products/data/products";
import { ProductCategory } from "@/shared/enums/product-category.enum";
import { cn } from "@/shared/utils/cn";

export function ProductExplorer() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(ProductCategory.ALL);

  const filteredProducts = useMemo(() => {
    if (activeCategory === ProductCategory.ALL) {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="products" className="bg-mist py-20 text-ink">
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-acid">{productExplorerCopy.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">{productExplorerCopy.title}</h2>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <SlidersHorizontal className="hidden text-ink/40 sm:block" size={18} />
            {productCategories.map((category) => (
              <button
                key={category}
                className={cn(
                  "shrink-0 rounded border px-4 py-2 text-sm font-black transition",
                  activeCategory === category
                    ? "border-ink bg-ink text-white"
                    : "border-black/10 bg-white text-ink/70 hover:border-acid",
                )}
                onClick={() => setActiveCategory(category)}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <ProductComparePanel />
      </div>
    </section>
  );
}
