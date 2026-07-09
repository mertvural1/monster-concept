"use client";

import { Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { navItems } from "@/features/navigation/data/nav-items";
import { UiCopy } from "@/shared/enums/ui-copy.enum";
import { cn } from "@/shared/utils/cn";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      <div className="bg-acid py-2 text-center text-xs font-black uppercase tracking-[0.18em] text-ink">
        Masaüstü bilgisayarlarda seçili kampanyaları kaçırma
      </div>
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-end gap-2" aria-label="Anasayfa">
          <span className="text-2xl font-black tracking-wide text-acid">{UiCopy.BrandName}</span>
          <span className="hidden text-sm font-semibold text-white/70 sm:block">{UiCopy.BrandSuffix}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana navigasyon">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/75 transition hover:text-acid"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button className="grid size-10 place-items-center rounded border border-white/10 text-white/75 transition hover:border-acid hover:text-acid" aria-label="Ara">
            <Search size={18} />
          </button>
          <button className="grid size-10 place-items-center rounded border border-white/10 text-white/75 transition hover:border-acid hover:text-acid" aria-label="Hesabım">
            <UserRound size={18} />
          </button>
          <button className="grid size-10 place-items-center rounded border border-white/10 text-white/75 transition hover:border-acid hover:text-acid" aria-label="Sepet">
            <ShoppingCart size={18} />
          </button>
        </div>

        <button
          className="grid size-10 place-items-center rounded border border-white/10 text-white lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-white/10 bg-graphite px-4 py-4 lg:hidden",
          isOpen ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto grid max-w-[1180px] gap-3" aria-label="Mobil navigasyon">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded border border-white/10 px-4 py-3 text-sm font-bold text-white/80"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
