"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useAppSelector } from "@/app/hooks";
import { selectCartItems, selectCartTotals } from "@/features/cart/store/cart-slice";
import { formatCurrency } from "@/shared/utils/format-currency";

interface MobileCartBubbleProps {
  onOpen: () => void;
}

export function MobileCartBubble({ onOpen }: MobileCartBubbleProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const suppressTapRef = useRef(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const items = useAppSelector(selectCartItems);
  const { itemCount, subtotal } = useAppSelector(selectCartTotals);
  const previewItems = items.slice(0, 3);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  if (itemCount === 0) {
    return null;
  }

  const openIfNotDragging = () => {
    if (suppressTapRef.current) {
      return;
    }

    onOpen();
  };

  const suppressNextTap = () => {
    suppressTapRef.current = true;
  };

  const allowTapAfterDragSettles = () => {
    window.setTimeout(() => {
      suppressTapRef.current = false;
    }, 120);
  };

  const bubble = (
    <div
      ref={constraintsRef}
      className="pointer-events-none fixed inset-0 z-[60] md:hidden"
      aria-hidden={false}
    >
      <motion.button
        className="pointer-events-auto absolute bottom-2 right-4 grid size-24 touch-none place-items-center rounded-full border border-acid/70 bg-ink text-white shadow-[0_18px_48px_rgba(17,19,21,0.42),0_0_34px_rgba(126,211,33,0.32)]"
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.08}
        dragMomentum={false}
        whileTap={{ scale: 0.96 }}
        onTap={openIfNotDragging}
        onDragStart={suppressNextTap}
        onDragEnd={allowTapAfterDragSettles}
        aria-label={`Sepeti aç, ${itemCount} ürün`}
      >
        <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-acid text-xs font-black text-ink ring-4 ring-ink">
          {itemCount}
        </span>

        <span className="absolute inset-2 rounded-full border border-white/10 bg-white/[0.04]" />

        {previewItems.length > 0 ? (
          <span className="relative z-10 grid size-16 -translate-y-1.5 place-items-center">
            {previewItems.map((item, index) => (
              <span
                key={item.product.id}
                className="absolute grid size-12 place-items-center rounded-full border border-white/14 bg-mist shadow-lg"
                style={{
                  transform: `translate(${(index - 1) * 14}px, ${index === 1 ? -8 : 8}px) scale(${1 - index * 0.08})`,
                  zIndex: previewItems.length - index,
                }}
              >
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  width={56}
                  height={42}
                  className="h-9 w-10 object-contain"
                />
              </span>
            ))}
          </span>
        ) : (
          <ShoppingBag className="relative z-10 -translate-y-1.5 text-acid" size={28} />
        )}

        <span className="absolute bottom-3 z-10 max-w-[78px] truncate rounded-full bg-ink/92 px-2 py-0.5 text-[10px] font-black leading-none text-acid shadow-[0_0_14px_rgba(17,19,21,0.9)]">
          {formatCurrency(subtotal)}
        </span>
      </motion.button>
    </div>
  );

  return portalRoot ? createPortal(bubble, portalRoot) : null;
}
