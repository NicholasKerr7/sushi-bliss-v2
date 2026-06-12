"use client";

import Image from "next/image";
import { useState } from "react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { getDefaultCustomizations } from "@/lib/cart";
import type { MenuItem } from "@/types/menu";

import { MobileFavoriteCard } from "./MobileFavoriteCard";
import { MobileFavoritesEmptyState } from "./MobileFavoritesEmptyState";
import {
  MobileFavoritesHeader,
  MobileFavoritesPanel,
} from "./MobileFavoritesPrimitives";

/** Mobile-first favorites page for quick reorder and saved dish management. */
export function MobileFavoritesPage() {
  const { addItem, itemCount } = useCart();
  const { clearFavorites, favoriteItems, hasFavorites, toggleFavorite } =
    useFavorites();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const addFavoriteToCart = (item: MenuItem) => {
    addItem({
      addOns: [],
      customizations: getDefaultCustomizations(),
      menuItem: item,
      quantity: 1,
    });
    setCartMessage(`${item.name} added to cart.`);
    setCartOpen(true);
  };

  return (
    <section
      className="relative min-h-dvh overflow-x-hidden bg-[#050607] px-4 pb-[236px] pt-5 text-white md:hidden"
      id="favorites"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_14%,rgba(239,47,37,0.18),transparent_30%),radial-gradient(circle_at_100%_8%,rgba(215,168,79,0.14),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0)_0%,#050607_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[430px] bg-[url('/assets/editorial/elegant-sashimi-platter-on-slate.webp')] bg-cover bg-center opacity-20"
      />

      <div className="relative z-10 mx-auto max-w-[430px]">
        <MobileFavoritesHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
        />

        <section className="mt-8">
          <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Saved dishes
          </p>
          <h1 className="editorial-title mt-3 text-[43px] uppercase leading-[0.96] text-white">
            Favorite
            <span className="block text-[var(--sb-red-bright)]">Dishes</span>
          </h1>
          <p className="mt-4 text-[16px] leading-6 text-white/62">
            Keep signature pieces ready for quick reorder, reward planning, and
            menu returns.
          </p>
        </section>

        <MobileFavoritesPanel className="mt-6 overflow-hidden">
          <div className="relative min-h-[250px] p-5">
            <Image
              alt="Sushi Bliss sashimi platter"
              className="absolute inset-0 object-cover opacity-78"
              fill
              loading="eager"
              priority
              sizes="430px"
              src={
                favoriteItems[0]?.image.publicUrl ||
                "/assets/editorial/elegant-sashimi-platter-on-slate.webp"
              }
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.88)_100%)]" />
            <div className="relative z-10 flex min-h-[210px] flex-col justify-end">
              <StatusBadge tone="premium">
                {favoriteItems.length} saved
              </StatusBadge>
              <h2 className="editorial-title mt-4 text-[34px] uppercase leading-none text-white">
                Reorder list
              </h2>
              <p className="mt-3 text-[15px] leading-6 text-white/62">
                {hasFavorites
                  ? "Add favorites directly to cart or remove dishes as your tastes change."
                  : "Save items from the menu to build your personal Sushi Bliss list."}
              </p>
            </div>
          </div>
        </MobileFavoritesPanel>

        {cartMessage ? (
          <p
            aria-live="polite"
            className="mt-4 rounded-[14px] border border-sb-wasabi/30 bg-sb-wasabi/10 p-4 text-[13px] font-semibold leading-5 text-sb-wasabi"
          >
            {cartMessage}
          </p>
        ) : null}

        {hasFavorites ? (
          <>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                Saved signatures
              </p>
              <button
                className="rounded-full border border-[var(--sb-border)] bg-black/28 px-4 py-2 text-[11px] uppercase tracking-[0.08em] text-white/58"
                onClick={clearFavorites}
                type="button"
              >
                Clear
              </button>
            </div>
            <div className="mt-3 grid gap-3">
              {favoriteItems.map((item, index) => (
                <MobileFavoriteCard
                  eagerImage={index === 0}
                  item={item}
                  key={item.id}
                  onAddToCart={addFavoriteToCart}
                  onRemove={toggleFavorite}
                />
              ))}
            </div>
          </>
        ) : (
          <MobileFavoritesEmptyState />
        )}
      </div>

      <BottomNavigation
        activeId="profile"
        ariaLabel="Mobile favorites navigation"
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
