"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { TabletExperienceHeader } from "@/components/layout/TabletExperienceHeader";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { classNames } from "@/lib/classNames";
import { getDefaultCustomizations } from "@/lib/cart";
import type { MenuItem } from "@/types/menu";

import { TabletFavoriteMenuCard } from "./TabletFavoriteMenuCard";
import {
  tabletFavoriteBenefits,
  tabletSavedExperiences,
} from "./tabletFavoritesContent";

/** Tablet favorites surface with saved dishes, experiences, and bottom nav. */
export function TabletFavoritesPage() {
  const { addItem, itemCount } = useCart();
  const { clearFavorites, favoriteItems, hasFavorites, toggleFavorite } =
    useFavorites();
  const [cartOpen, setCartOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const addFavoriteToCart = (item: MenuItem) => {
    addItem({
      addOns: [],
      customizations: getDefaultCustomizations(),
      menuItem: item,
      quantity: 1,
    });
    setStatusMessage(`${item.name} added to cart.`);
    setCartOpen(true);
  };

  return (
    <>
      <section
        className="min-h-dvh overflow-x-hidden bg-[#050607] px-[18px] pb-[150px] pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pt-3"
        id="favorites"
      >
        <TabletExperienceHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
          title="Favorites"
        />

        <main className="mx-auto w-full max-w-[1034px]">
          <section className="mt-4 grid grid-cols-[minmax(0,1fr)_220px] items-end gap-5 rounded-[14px] border border-white/10 bg-white/[0.035] p-5 min-[1080px]:mt-5 min-[1080px]:grid-cols-[minmax(0,1fr)_260px] min-[1080px]:p-7">
            <div>
              <p className="text-[13px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                Saved items and experiences
              </p>
              <h1 className="editorial-title mt-2 text-[44px] uppercase leading-none text-white min-[1080px]:text-[58px]">
                My Favorites
              </h1>
              <p className="mt-3 max-w-[560px] text-[15px] leading-6 text-[var(--sb-gold-soft)]">
                Your saved Sushi Bliss dishes and premium experiences stay ready
                for quick reorder and reservation planning.
              </p>
            </div>
            <div className="grid gap-3">
              <Button
                className="h-11 rounded-[10px] uppercase tracking-[0.08em]"
                disabled={!hasFavorites}
                onClick={clearFavorites}
                variant="secondary"
              >
                Manage favorites
              </Button>
              <Button
                className="h-11 rounded-[10px] uppercase tracking-[0.08em]"
                href="/menu"
                variant="ghost"
              >
                Browse menu
              </Button>
            </div>
          </section>

          <section className="mt-4 grid grid-cols-4 gap-3">
            {[
              [
                "All favorites",
                favoriteItems.length + tabletSavedExperiences.length,
              ],
              ["Food & drinks", favoriteItems.length],
              ["Experiences", tabletSavedExperiences.length],
              ["Recently saved", 2],
            ].map(([label, count], index) => (
              <button
                aria-pressed={index === 0}
                className={classNames(
                  "flex h-[54px] items-center justify-center gap-3 rounded-[12px] border text-[12px] uppercase tracking-[0.08em]",
                  index === 0
                    ? "border-[var(--sb-gold)] bg-[var(--sb-gold)] text-black"
                    : "border-white/10 bg-white/[0.035] text-white/70",
                )}
                key={label}
                type="button"
              >
                <AssetIcon
                  size={22}
                  src={
                    index === 0
                      ? "/assets/icons/heart-icon.png"
                      : "/assets/icons/star-icon.png"
                  }
                />
                {label} ({count})
              </button>
            ))}
          </section>

          {statusMessage ? (
            <p
              aria-live="polite"
              className="mt-4 rounded-[12px] border border-sb-wasabi/30 bg-sb-wasabi/10 p-3 text-[13px] font-semibold text-sb-wasabi"
            >
              {statusMessage}
            </p>
          ) : null}

          <section className="mt-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[17px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                Saved menu items
              </h2>
              <Link
                className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                href="/menu"
              >
                View all &gt;
              </Link>
            </div>
            {hasFavorites ? (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {favoriteItems.slice(0, 4).map((item, index) => (
                  <TabletFavoriteMenuCard
                    eagerImage={index === 0}
                    item={item}
                    key={item.id}
                    onAddToCart={addFavoriteToCart}
                    onRemove={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-3 rounded-[14px] border border-white/10 bg-white/[0.035] p-6 text-center">
                <StatusBadge tone="neutral">No saved dishes</StatusBadge>
                <p className="mt-3 text-[15px] text-white/62">
                  Save dishes from the menu to build a quick reorder list.
                </p>
              </div>
            )}
          </section>

          <section className="mt-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[17px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                Saved experiences
              </h2>
              <Link
                className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                href="/omakase"
              >
                View all &gt;
              </Link>
            </div>
            <div className="mt-3 grid gap-3">
              {tabletSavedExperiences.map((experience, index) => (
                <article
                  className="grid min-h-[120px] grid-cols-[220px_minmax(0,1fr)_196px] overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.035] min-[1080px]:grid-cols-[258px_minmax(0,1fr)_220px]"
                  key={experience.title}
                >
                  <div className="relative bg-black/30">
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      sizes="280px"
                      src={experience.image}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[20px] font-semibold text-white">
                      {experience.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-5 text-white/58">
                      {experience.meta}
                    </p>
                    <p className="mt-3 inline-flex rounded-full border border-[var(--sb-gold)]/28 px-3 py-1 text-[12px] text-[var(--sb-gold-soft)]">
                      Member favorite
                    </p>
                  </div>
                  <div className="grid content-center gap-3 p-4">
                    <Button
                      className="red-glow-button h-10 rounded-[10px] text-[11px] uppercase tracking-[0.08em]"
                      href="/reservations"
                      size="sm"
                    >
                      Reserve again
                    </Button>
                    <Button
                      className="h-10 rounded-[10px] text-[11px] uppercase tracking-[0.08em]"
                      href={experience.href}
                      size="sm"
                      variant="secondary"
                    >
                      View details
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6 grid grid-cols-4 rounded-[14px] border border-white/10 bg-white/[0.035]">
            {tabletFavoriteBenefits.map(([title, subtitle, icon]) => (
              <div
                className="grid min-h-[70px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 border-r border-white/10 px-4 last:border-r-0"
                key={title}
              >
                <AssetIcon size={30} src={icon} />
                <span>
                  <span className="block text-[12px] uppercase text-white/70">
                    {title}
                  </span>
                  <span className="mt-1 block text-[12px] text-white/46">
                    {subtitle}
                  </span>
                </span>
              </div>
            ))}
          </section>
        </main>
      </section>

      <TabletBottomNavigation
        activeId="profile"
        ariaLabel="Tablet favorites navigation"
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </>
  );
}
