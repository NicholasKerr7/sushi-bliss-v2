"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { menuItemById } from "@/data/menu";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { classNames } from "@/lib/classNames";
import { getDefaultCustomizations } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

const fallbackFavoriteIds = [
  "otoro-nigiri",
  "spicy-tuna-roll",
  "dragon-roll",
  "salmon-nigiri",
] as const;

const savedExperiences = [
  {
    action: "Reserve again",
    category: "Omakase",
    id: "chef-omakase",
    image: "/assets/omakase/specialties/lead-chef-omakase-nigiri-flight.webp",
    meta: "Premium seasonal selection by our master chefs",
    price: "$150.00 / per person",
    title: "Chef's Omakase",
    valueCents: 15000,
  },
  {
    action: "Reserve again",
    category: "Experience",
    id: "private-dining",
    image: "/assets/gallery/intimate-upscale-dining-room-setting.webp",
    meta: "Exclusive private dining for special occasions",
    price: "Last booked: May 10, 2024",
    title: "Private Dining Experience",
    valueCents: 12650,
  },
] as const;

const recommendedItems = [
  menuItemById.get("dragon-roll"),
  menuItemById.get("salmon-nigiri"),
  menuItemById.get("tuna-sashimi"),
].filter((item): item is MenuItem => Boolean(item));

const favoriteTabs = [
  { icon: "/assets/icons/star-icon.png", id: "all", label: "All Favorites" },
  { icon: "/assets/icons/nigiri-icon.png", id: "nigiri", label: "Nigiri" },
  { icon: "/assets/icons/sushi-roll-icon.png", id: "rolls", label: "Rolls" },
  { icon: "/assets/icons/sashimi-icon.png", id: "sashimi", label: "Sashimi" },
  {
    icon: "/assets/icons/vegetarian-sushi-icon.webp",
    id: "vegetarian",
    label: "Vegetarian",
  },
  {
    icon: "/assets/icons/calendar-icon.png",
    id: "experiences",
    label: "Experiences",
  },
] as const;

type FavoriteFilterId = (typeof favoriteTabs)[number]["id"];

function getFallbackFavorites() {
  return fallbackFavoriteIds
    .map((id) => menuItemById.get(id))
    .filter((item): item is MenuItem => Boolean(item));
}

export function DesktopFavoritesPage() {
  const { addItem, itemCount } = useCart();
  const { clearFavorites, favoriteItems, hasFavorites, toggleFavorite } =
    useFavorites();
  const [activeFilter, setActiveFilter] = useState<FavoriteFilterId>("all");
  const [savedExperienceIds, setSavedExperienceIds] = useState<string[]>(
    savedExperiences.map((experience) => experience.id),
  );
  const [statusMessage, setStatusMessage] = useState("");
  const displayFavorites = hasFavorites
    ? favoriteItems
    : getFallbackFavorites();
  const visibleSavedExperiences = savedExperiences.filter((experience) =>
    savedExperienceIds.includes(experience.id),
  );
  const getCategoryCount = (category: string) =>
    displayFavorites.filter((item) => item.category === category).length;
  const favoriteFilterCounts: Record<FavoriteFilterId, number> = {
    all: displayFavorites.length + visibleSavedExperiences.length,
    experiences: visibleSavedExperiences.length,
    nigiri: getCategoryCount("nigiri"),
    rolls: getCategoryCount("rolls"),
    sashimi: getCategoryCount("sashimi"),
    vegetarian: getCategoryCount("vegetarian"),
  };
  const visibleFavorites =
    activeFilter === "all"
      ? displayFavorites
      : activeFilter === "experiences"
        ? []
        : displayFavorites.filter((item) => item.category === activeFilter);
  const showMenuFavorites = activeFilter !== "experiences";
  const showSavedExperiences =
    activeFilter === "all" || activeFilter === "experiences";
  const totalValueCents =
    displayFavorites.reduce((total, item) => total + item.priceCents, 0) +
    visibleSavedExperiences.reduce(
      (total, experience) => total + experience.valueCents,
      0,
    );

  const removeSavedExperience = (experienceId: string) => {
    const removedExperience = savedExperiences.find(
      (experience) => experience.id === experienceId,
    );

    setSavedExperienceIds((currentIds) =>
      currentIds.filter((id) => id !== experienceId),
    );

    if (removedExperience) {
      setStatusMessage(`${removedExperience.title} removed from favorites.`);
    }
  };

  const addFavoriteToCart = (item: MenuItem) => {
    addItem({
      addOns: [],
      customizations: getDefaultCustomizations(),
      menuItem: item,
      quantity: 1,
    });
    setStatusMessage(`${item.name} added to cart.`);
  };

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="favorites"
    >
      <DesktopMenuHeader activeId="favorites" cartCount={itemCount} />
      <main className="mx-auto max-w-[1672px] px-10 pb-4 pt-5">
        <div className="grid grid-cols-[minmax(0,1fr)_490px] gap-6">
          <section>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h1 className="editorial-title text-[54px] uppercase leading-none tracking-[0.08em]">
                  Your{" "}
                  <span className="text-[var(--sb-red-bright)]">Favorites</span>
                </h1>
                <p className="mt-3 text-[18px] text-[var(--sb-gold-soft)]">
                  Quick access to the dishes, drinks, and experiences you love.
                </p>
              </div>
              <Button
                className="h-[50px] rounded-[10px] border-[var(--sb-red-bright)]/42 px-6 text-[14px] uppercase tracking-[0.08em] text-white/76 hover:border-[var(--sb-red-bright)]/70 hover:text-white"
                disabled={!hasFavorites}
                onClick={clearFavorites}
                title={
                  hasFavorites
                    ? "Clear saved menu dishes"
                    : "No saved menu dishes to clear"
                }
                variant="ghost"
              >
                <AssetIcon size={22} src="/assets/icons/heart-icon.png" />
                Clear saved dishes
              </Button>
            </div>

            <nav
              aria-label="Favorite filters"
              className="mt-5 grid grid-cols-6 overflow-hidden rounded-[10px] border border-[var(--sb-border)] bg-white/[0.035]"
            >
              {favoriteTabs.map((tab) => (
                <button
                  aria-pressed={activeFilter === tab.id}
                  className={classNames(
                    "flex min-h-[52px] items-center justify-center gap-2 border-r border-white/10 text-[12px] uppercase tracking-[0.04em] last:border-r-0",
                    activeFilter === tab.id
                      ? "bg-[var(--sb-gold)]/12 text-[var(--sb-gold-soft)]"
                      : "text-white/72",
                  )}
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  type="button"
                >
                  <AssetIcon size={22} src={tab.icon} />
                  {tab.label} ({favoriteFilterCounts[tab.id]})
                </button>
              ))}
            </nav>

            {statusMessage ? (
              <p
                aria-live="polite"
                className="mt-4 rounded-[12px] border border-sb-wasabi/30 bg-sb-wasabi/10 px-4 py-3 text-[13px] font-semibold text-sb-wasabi"
              >
                {statusMessage}
              </p>
            ) : null}

            {showMenuFavorites ? (
              <>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {visibleFavorites.slice(0, 4).map((item, index) => (
                    <FavoriteMenuCard
                      favoriteIsPersisted={hasFavorites}
                      item={item}
                      key={item.id}
                      priority={index < 2}
                      onAddToCart={addFavoriteToCart}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
                {visibleFavorites.length === 0 ? (
                  <p className="mt-4 rounded-[12px] border border-white/10 bg-white/[0.035] px-4 py-4 text-[14px] text-white/62">
                    No saved dishes in this category yet.
                  </p>
                ) : null}
              </>
            ) : null}

            {showSavedExperiences ? (
              <div className="mt-3 grid gap-3">
                {visibleSavedExperiences.length > 0 ? (
                  visibleSavedExperiences.map((experience, index) => (
                    <SavedExperienceCard
                      experience={experience}
                      key={experience.id}
                      priority={index === 0}
                      onRemove={removeSavedExperience}
                    />
                  ))
                ) : (
                  <p className="rounded-[12px] border border-white/10 bg-white/[0.035] px-4 py-4 text-[14px] text-white/62">
                    No saved experiences yet.
                  </p>
                )}
              </div>
            ) : null}
          </section>

          <aside className="space-y-4 pt-1">
            <article className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
              <h2 className="flex items-center gap-3 text-[18px] uppercase tracking-[0.08em] text-white">
                <AssetIcon size={28} src="/assets/icons/heart-icon.png" />
                Your favorite summary
              </h2>
              <div className="mt-5 grid grid-cols-3 rounded-[12px] border border-white/10 bg-black/24 py-4 text-center">
                <SummaryMetric
                  label="Total Favorites"
                  value={
                    displayFavorites.length + visibleSavedExperiences.length
                  }
                />
                <SummaryMetric
                  label="Total Value"
                  value={formatMoney(totalValueCents)}
                />
                <SummaryMetric label="Total Points" value="3,500 pts" />
              </div>
            </article>

            <article className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] uppercase tracking-[0.08em] text-white">
                  Recommended for you
                </h2>
                <Link
                  className="text-[12px] uppercase tracking-[0.1em] text-[var(--sb-red-bright)]"
                  href="/menu"
                >
                  View all <ChevronIcon direction="right" size={18} />
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {recommendedItems.map((item, index) => (
                  <button
                    className="grid min-h-[104px] w-full grid-cols-[126px_1fr_48px] items-center gap-4 rounded-[12px] border border-white/10 bg-black/24 p-2 text-left"
                    key={item.id}
                    onClick={() => addFavoriteToCart(item)}
                    type="button"
                  >
                    <span className="relative h-[86px] overflow-hidden rounded-[8px]">
                      <Image
                        alt=""
                        className="object-cover"
                        fill
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="126px"
                        src={item.image.publicUrl}
                      />
                    </span>
                    <span>
                      <span className="block text-[18px] text-white">
                        {item.name}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-[13px] leading-5 text-white/54">
                        {item.ingredients.slice(0, 3).join(", ")}
                      </span>
                      <span className="mt-2 block text-[18px] text-[var(--sb-gold-soft)]">
                        {formatMoney(item.priceCents)}
                      </span>
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--sb-gold)]/44 text-[var(--sb-gold-soft)]">
                      +
                    </span>
                  </button>
                ))}
              </div>
            </article>

            <article className="grid grid-cols-[78px_1fr] items-center gap-4 rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
              <AssetIcon size={58} src="/assets/icons/star-icon.png" />
              <p>
                <span className="block text-[16px] text-[var(--sb-gold-soft)]">
                  Love something new?
                </span>
                <span className="mt-2 block text-[15px] leading-6 text-white/58">
                  Favorites shape chef recommendations and make return orders
                  faster.
                </span>
              </p>
            </article>
          </aside>
        </div>

        <div className="mt-4">
          <DesktopBenefitStrip />
        </div>
      </main>
    </section>
  );
}

function FavoriteMenuCard({
  favoriteIsPersisted,
  item,
  priority,
  onAddToCart,
  onToggleFavorite,
}: {
  favoriteIsPersisted: boolean;
  item: MenuItem;
  priority: boolean;
  onAddToCart: (item: MenuItem) => void;
  onToggleFavorite: (itemId: string) => void;
}) {
  return (
    <article className="grid min-h-[164px] grid-cols-[240px_1fr] overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-white/[0.035]">
      <div className="relative">
        <Image
          alt=""
          className="object-cover"
          fill
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes="240px"
          src={item.image.publicUrl}
        />
        <span className="absolute left-0 top-0 bg-[var(--sb-red)] px-3 py-2 text-[11px] uppercase tracking-[0.08em] text-white">
          {item.categoryLabel}
        </span>
      </div>
      <div className="relative p-4">
        <AssetIcon
          className="absolute right-4 top-4"
          size={26}
          src="/assets/icons/star-icon.png"
        />
        <h2 className="text-[21px] text-white">{item.name}</h2>
        <p className="mt-2 line-clamp-2 text-[14px] leading-5 text-white/58">
          {item.ingredients.slice(0, 4).join(", ")}
        </p>
        <p className="mt-2 text-[23px] text-[var(--sb-gold-soft)]">
          {formatMoney(item.priceCents)}
        </p>
        <div className="mt-3 flex items-center gap-4">
          <button
            className="red-glow-button flex h-10 w-[148px] items-center justify-center gap-2 rounded-[8px] px-3 text-[11px] uppercase tracking-[0.04em] whitespace-nowrap"
            onClick={() => onAddToCart(item)}
            type="button"
          >
            <AssetIcon size={18} src="/assets/icons/shopping-cart-icon.png" />
            Add to cart
          </button>
          <button
            className="flex h-10 items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-white/72"
            onClick={() => onToggleFavorite(item.id)}
            type="button"
          >
            <AssetIcon size={18} src="/assets/icons/gold-alert-icon.png" />
            {favoriteIsPersisted ? "Remove" : "Save"}
          </button>
        </div>
      </div>
    </article>
  );
}

function SavedExperienceCard({
  experience,
  priority,
  onRemove,
}: {
  experience: (typeof savedExperiences)[number];
  onRemove: (experienceId: string) => void;
  priority: boolean;
}) {
  return (
    <article className="grid min-h-[132px] grid-cols-[240px_1fr_228px] overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-white/[0.035]">
      <div className="relative">
        <Image
          alt=""
          className="object-cover"
          fill
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes="240px"
          src={experience.image}
        />
        <span className="absolute left-0 top-0 bg-[var(--sb-red)] px-3 py-2 text-[11px] uppercase tracking-[0.08em] text-white">
          {experience.category}
        </span>
      </div>
      <div className="p-4">
        <h2 className="text-[21px] text-white">{experience.title}</h2>
        <p className="mt-2 max-w-[310px] text-[14px] leading-5 text-white/58">
          {experience.meta}
        </p>
        <p className="mt-3 text-[14px] text-[var(--sb-gold-soft)]">
          {experience.price}
        </p>
      </div>
      <div className="grid content-center gap-3 px-5">
        <Button
          className="red-glow-button h-10 rounded-[8px] text-[11px] uppercase tracking-[0.04em] whitespace-nowrap"
          href="/reservations"
          size="sm"
        >
          <AssetIcon size={18} src="/assets/icons/calendar-icon.png" />
          {experience.action}
        </Button>
        <button
          className="h-10 text-[12px] uppercase tracking-[0.08em] text-white/60 transition hover:text-[var(--sb-red-bright)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={() => onRemove(experience.id)}
          type="button"
        >
          Remove
        </button>
      </div>
    </article>
  );
}

function SummaryMetric({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <p className="border-l border-white/10 first:border-l-0">
      <span className="block text-[26px] text-white">{value}</span>
      <span className="mt-2 block text-[14px] text-white/56">{label}</span>
    </p>
  );
}
