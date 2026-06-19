"use client";

import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { TabletExperienceHeader } from "@/components/layout/TabletExperienceHeader";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { classNames } from "@/lib/classNames";
import { getDefaultCustomizationsForItem } from "@/lib/cart";
import type { MenuItem } from "@/types/menu";

import { TabletFavoriteMenuCard } from "./TabletFavoriteMenuCard";
import { TabletSavedExperienceCard } from "./TabletSavedExperienceCard";
import {
  tabletFavoriteBenefits,
  tabletSavedExperiences,
} from "./tabletFavoritesContent";

const favoriteFilterTabs = [
  ["all", "All favorites", "/assets/icons/heart-icon.png"],
  ["food", "Food & drinks", "/assets/icons/sushi-roll-icon.png"],
  ["experiences", "Experiences", "/assets/icons/star-icon.png"],
  ["recent", "Recently saved", "/assets/icons/clock-icon.png"],
] as const;

type FavoriteFilterId = (typeof favoriteFilterTabs)[number][0];

/** Tablet favorites surface matching the saved-item reference dashboard. */
export function TabletFavoritesPage() {
  const { addItem, itemCount } = useCart();
  const { clearFavorites, favoriteItems, hasFavorites, toggleFavorite } =
    useFavorites();
  const [activeFilter, setActiveFilter] = useState<FavoriteFilterId>("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const visibleFavoriteItems =
    activeFilter === "experiences"
      ? []
      : activeFilter === "recent"
        ? favoriteItems.slice(0, 2)
        : favoriteItems;
  const visibleExperiences =
    activeFilter === "food"
      ? []
      : activeFilter === "recent"
        ? tabletSavedExperiences.slice(0, 1)
        : tabletSavedExperiences;
  const totalFavoriteCount =
    favoriteItems.length + tabletSavedExperiences.length;

  const getFilterCount = (filterId: FavoriteFilterId) => {
    if (filterId === "food") {
      return favoriteItems.length;
    }

    if (filterId === "experiences") {
      return tabletSavedExperiences.length;
    }

    if (filterId === "recent") {
      return Math.min(2, totalFavoriteCount);
    }

    return totalFavoriteCount;
  };

  const addFavoriteToCart = (item: MenuItem, quantity: number) => {
    addItem({
      addOns: [],
      customizations: getDefaultCustomizationsForItem(item),
      menuItem: item,
      quantity,
    });
    setStatusMessage(
      `${quantity} ${item.name}${quantity > 1 ? "s" : ""} added to cart.`,
    );
    setCartOpen(true);
  };

  return (
    <>
      <section
        className="min-h-dvh overflow-x-hidden bg-[#040506] px-[18px] pb-[126px] pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pt-3"
        id="favorites"
      >
        <TabletExperienceHeader
          cartCount={itemCount}
          title="Favorites"
          onOpenCart={() => setCartOpen(true)}
        />

        <main className="mx-auto w-full max-w-[1034px] pb-8 pt-6">
          <section className="flex items-start justify-between gap-8">
            <div>
              <h1 className="editorial-title text-[50px] uppercase leading-none tracking-[0.08em] text-white">
                My Favorites
              </h1>
              <p className="mt-3 text-[17px] leading-6 text-[var(--sb-gold-soft)]">
                Your saved items and experiences, all in one place.
              </p>
            </div>
            <Button
              className="mt-1 h-[46px] rounded-[8px] border-[var(--sb-red-bright)]/42 px-6 text-[12px] uppercase tracking-[0.08em] text-white/76 hover:border-[var(--sb-red-bright)]/70 hover:text-white"
              disabled={!hasFavorites}
              onClick={clearFavorites}
              title={
                hasFavorites
                  ? "Clear saved menu dishes"
                  : "No saved menu dishes to clear"
              }
              variant="ghost"
            >
              <AssetIcon size={18} src="/assets/icons/heart-icon.png" />
              Clear saved dishes
            </Button>
          </section>

          <section
            aria-label="Favorite filters"
            className="mt-8 grid grid-cols-2 gap-3 min-[1080px]:grid-cols-4"
          >
            {favoriteFilterTabs.map(([id, label, icon]) => {
              const isActive = activeFilter === id;

              return (
                <button
                  aria-pressed={isActive}
                  className={classNames(
                    "flex min-h-[56px] items-center justify-center gap-3 rounded-[8px] border px-3 text-[14px] uppercase tracking-[0.055em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                    isActive
                      ? "border-[var(--sb-gold)] bg-[linear-gradient(180deg,#f2c665,#d9a347)] text-black shadow-[0_0_22px_rgb(215_168_79_/_0.24)]"
                      : "border-[var(--sb-border)] bg-black/24 text-white/70 hover:border-[var(--sb-gold)]/50 hover:text-[var(--sb-gold-soft)]",
                  )}
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  type="button"
                >
                  <AssetIcon
                    loading={isActive ? "eager" : "lazy"}
                    size={22}
                    src={icon}
                  />
                  {label} ({getFilterCount(id)})
                </button>
              );
            })}
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
                className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                href="/menu"
              >
                View all <ChevronIcon direction="right" size={18} />
              </Link>
            </div>
            {visibleFavoriteItems.length > 0 ? (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {visibleFavoriteItems.slice(0, 4).map((item, index) => (
                  <TabletFavoriteMenuCard
                    eagerImage={index === 0}
                    item={item}
                    key={item.id}
                    onAddToCart={addFavoriteToCart}
                    onRemove={toggleFavorite}
                    showQuantityControls={index !== 2}
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
                className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                href="/omakase"
              >
                View all <ChevronIcon direction="right" size={18} />
              </Link>
            </div>
            <div className="mt-3 grid gap-3">
              {visibleExperiences.map((experience, index) => (
                <TabletSavedExperienceCard
                  eagerImage={index < 2}
                  experience={experience}
                  key={experience.title}
                />
              ))}
              {visibleExperiences.length === 0 ? (
                <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-6 text-center">
                  <StatusBadge tone="neutral">No saved experiences</StatusBadge>
                  <p className="mt-3 text-[15px] text-white/62">
                    Saved reservations and pairings will appear here.
                  </p>
                </div>
              ) : null}
            </div>
          </section>

          <section className="mt-10 grid grid-cols-4 rounded-[12px] border border-[var(--sb-border)] bg-white/[0.035]">
            {tabletFavoriteBenefits.map(([title, subtitle, icon]) => (
              <div
                className="grid min-h-[78px] grid-cols-[34px_minmax(0,1fr)] items-center gap-4 border-r border-white/10 px-5 last:border-r-0"
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
