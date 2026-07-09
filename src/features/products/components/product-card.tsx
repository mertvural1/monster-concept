"use client";

import { motion } from "framer-motion";
import { Check, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useCart } from "@/features/cart/context/cart-context";
import { productCardCopy } from "@/features/products/data/product-card-data";
import type { ProductCardProps } from "@/features/products/interfaces/product-card-props.interface";
import { formatCurrency } from "@/shared/utils/format-currency";

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, lastAddedProductId } = useCart();
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const isLastAdded = lastAddedProductId === product.id;

  const handleAddItem = () => {
    addItem(product);
    setIsFeedbackVisible(true);
    window.setTimeout(() => setIsFeedbackVisible(false), 1100);
  };

  return (
    <motion.article
      className="group flex h-full flex-col rounded border border-black/8 bg-white p-4 shadow-sm transition hover:shadow-xl"
      animate={
        isLastAdded
          ? {
              y: [0, -6, 0],
              boxShadow: [
                "0 1px 3px rgba(0, 0, 0, 0.08)",
                "0 20px 45px rgba(126, 211, 33, 0.22)",
                "0 1px 3px rgba(0, 0, 0, 0.08)",
              ],
            }
          : {}
      }
      transition={{ duration: 0.36 }}
    >
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
          <button
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded bg-ink px-4 py-3 text-sm font-black text-white transition hover:bg-acid hover:text-ink"
            onClick={handleAddItem}
          >
            {isFeedbackVisible ? <Check size={18} /> : <ShoppingCart size={18} />}
            {isFeedbackVisible ? productCardCopy.addedToCart : productCardCopy.addToCart}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
