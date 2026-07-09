import { Star } from "lucide-react";
import Image from "next/image";

import type { Product } from "@/shared/interfaces/product.interface";
import { formatCurrency } from "@/shared/utils/format-currency";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col rounded border border-black/8 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative grid aspect-[1.2] place-items-center overflow-hidden rounded bg-mist">
        <span className="absolute left-3 top-3 rounded bg-ink px-3 py-1 text-xs font-black text-acid">
          {product.badge}
        </span>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={320}
          height={240}
          className="h-[78%] w-[86%] object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-acid">{product.family}</p>
            <h3 className="mt-2 text-xl font-black text-ink">{product.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-sm font-black text-ink">
            <Star className="fill-acid text-acid" size={16} />
            {product.rating}
          </div>
        </div>

        <dl className="mt-5 grid gap-2">
          {product.specs.map((spec) => (
            <div key={spec.label} className="flex justify-between gap-4 border-b border-black/10 pb-2 text-sm">
              <dt className="text-ink/50">{spec.label}</dt>
              <dd className="font-bold text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-6">
          <p className="text-2xl font-black text-ink">{formatCurrency(product.price)}</p>
          <button className="mt-4 w-full rounded bg-ink px-4 py-3 text-sm font-black text-white transition hover:bg-acid hover:text-ink">
            Sepete Ekle
          </button>
        </div>
      </div>
    </article>
  );
}
