"use client";

import { signOut } from "firebase/auth";
import { LogOut, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/app/hooks";
import { LoginModal } from "@/features/auth/components/login-modal";
import { getFirebaseAuth } from "@/features/auth/services/firebase-client";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { MobileCartBubble } from "@/features/cart/components/mobile-cart-bubble";
import { selectCartTotals } from "@/features/cart/store/cart-slice";
import { headerCopy } from "@/features/navigation/data/header-data";
import { navItems } from "@/features/navigation/data/nav-items";
import { ProductSearchModal } from "@/features/products/components/product-search-modal";
import { AppRoute } from "@/shared/enums/app-route.enum";
import { UiCopy } from "@/shared/enums/ui-copy.enum";
import { cn } from "@/shared/utils/cn";
import { getUserInitials } from "@/shared/utils/get-user-initials";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [campaignText, setCampaignText] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  const { itemCount } = useAppSelector(selectCartTotals);
  const userInitials = user ? getUserInitials(user.displayName) : "";

  useEffect(() => {
    const text = headerCopy.campaignBar;
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldReduceMotion) {
      setCampaignText(text);
      return;
    }

    setCampaignText("");

    const intervalId = window.setInterval(() => {
      setCampaignText((currentText) => {
        if (currentText.length >= text.length) {
          window.clearInterval(intervalId);
          return currentText;
        }

        return text.slice(0, currentText.length + 1);
      });
    }, 46);

    return () => window.clearInterval(intervalId);
  }, []);

  const openLogin = () => {
    setIsOpen(false);
    setIsLoginOpen(true);
  };

  const openCart = () => {
    setIsOpen(false);
    setIsCartOpen(true);
  };

  const openSearch = () => {
    setIsOpen(false);
    setIsSearchOpen(true);
  };

  const logout = async () => {
    setIsOpen(false);
    setIsLoginOpen(false);
    await signOut(getFirebaseAuth());
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      <div className="bg-acid py-2 text-center text-xs font-black uppercase tracking-[0.18em] text-ink">
        <span className="inline-flex min-h-4 items-center justify-center px-4">
          <span>{campaignText}</span>
          <span className="typewriter-caret ml-1 h-4 w-0.5 bg-ink" aria-hidden="true" />
        </span>
      </div>
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4">
        <Link href={AppRoute.HOME} className="flex items-end gap-2" aria-label={headerCopy.homeAriaLabel}>
          <span className="logo-shine text-2xl font-black tracking-wide text-acid">{UiCopy.BRAND_NAME}</span>
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
            onClick={openSearch}
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
            {user ? (
              <span className="text-xs font-black uppercase leading-none">{userInitials}</span>
            ) : (
              <UserRound size={18} />
            )}
          </button>
          {user && (
            <button
              className="grid size-10 place-items-center rounded border border-white/10 text-white/75 transition hover:border-red-300 hover:text-red-200"
              aria-label={headerCopy.logoutLabel}
              onClick={logout}
            >
              <LogOut size={18} />
            </button>
          )}
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

        <div className="flex items-center gap-2 md:hidden">
          <button
            className={cn(
              "grid size-10 place-items-center rounded border transition",
              user ? "border-acid text-acid" : "border-white/10 text-white",
            )}
            aria-label={user ? headerCopy.accountAriaLabel : headerCopy.loginAriaLabel}
            onClick={openLogin}
          >
            {user ? (
              <span className="text-xs font-black uppercase leading-none">{userInitials}</span>
            ) : (
              <UserRound size={18} />
            )}
          </button>
          <button
            className="grid size-10 place-items-center rounded border border-white/10 text-white"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? headerCopy.closeMenuAriaLabel : headerCopy.openMenuAriaLabel}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
            onClick={openSearch}
          >
            {headerCopy.searchAriaLabel}
          </button>
          {user && (
            <button
              className="flex items-center gap-3 rounded border border-white/10 px-4 py-3 text-left text-sm font-bold text-white/80 transition hover:border-red-300 hover:text-red-200"
              onClick={logout}
            >
              <LogOut size={18} />
              {headerCopy.logoutLabel}
            </button>
          )}
        </nav>
      </div>

      <MobileCartBubble onOpen={openCart} />
      <ProductSearchModal isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <LoginModal isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} />
      <CartDrawer isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
}
