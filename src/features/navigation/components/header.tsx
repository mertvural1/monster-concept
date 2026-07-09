"use client";

import { Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { LoginModal } from "@/features/auth/components/login-modal";
import { useAuth } from "@/features/auth/context/auth-context";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { useCart } from "@/features/cart/context/cart-context";
import { headerCopy } from "@/features/navigation/data/header-data";
import { navItems } from "@/features/navigation/data/nav-items";
import { AppRoute } from "@/shared/enums/app-route.enum";
import { UiCopy } from "@/shared/enums/ui-copy.enum";
import { cn } from "@/shared/utils/cn";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();
  const { itemCount } = useCart();

  const openLogin = () => {
    setIsOpen(false);
    setIsLoginOpen(true);
  };

  const openCart = () => {
    setIsOpen(false);
    setIsCartOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      <div className="bg-acid py-2 text-center text-xs font-black uppercase tracking-[0.18em] text-ink">
        {headerCopy.campaignBar}
      </div>
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4">
        <Link href={AppRoute.HOME} className="flex items-end gap-2" aria-label={headerCopy.homeAriaLabel}>
          <span className="text-2xl font-black tracking-wide text-acid">{UiCopy.BRAND_NAME}</span>
          <span className="hidden text-sm font-semibold text-white/70 sm:block">{UiCopy.BRAND_SUFFIX}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={headerCopy.desktopNavAriaLabel}>
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
          <button
            className="grid size-10 place-items-center rounded border border-white/10 text-white/75 transition hover:border-acid hover:text-acid"
            aria-label={headerCopy.searchAriaLabel}
          >
            <Search size={18} />
          </button>
          <button
            className={cn(
              "grid size-10 place-items-center rounded border transition hover:border-acid hover:text-acid",
              user ? "border-acid text-acid" : "border-white/10 text-white/75",
            )}
            aria-label={user ? headerCopy.accountAriaLabel : headerCopy.loginAriaLabel}
            onClick={openLogin}
          >
            <UserRound size={18} />
          </button>
          <button
            className="relative grid size-10 place-items-center rounded border border-white/10 text-white/75 transition hover:border-acid hover:text-acid"
            aria-label={headerCopy.cartAriaLabel}
            onClick={openCart}
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-acid text-[10px] font-black text-ink">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        <button
          className="grid size-10 place-items-center rounded border border-white/10 text-white lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? headerCopy.closeMenuAriaLabel : headerCopy.openMenuAriaLabel}
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
        <nav className="mx-auto grid max-w-[1180px] gap-3" aria-label={headerCopy.mobileNavAriaLabel}>
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
          <button
            className="rounded border border-white/10 px-4 py-3 text-left text-sm font-bold text-white/80"
            onClick={openLogin}
          >
            {user ? headerCopy.accountAriaLabel : headerCopy.googleLoginLabel}
          </button>
          <button
            className="rounded border border-white/10 px-4 py-3 text-left text-sm font-bold text-white/80"
            onClick={openCart}
          >
            {headerCopy.cartLabel} {itemCount > 0 ? `(${itemCount})` : ""}
          </button>
        </nav>
      </div>

      <LoginModal isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} />
      <CartDrawer isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
}
