"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { useCart } from "@/hooks/useCart";
import {
  getTabletPresentationImage,
  TABLET_OTORO_HERO_IMAGE,
} from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import {
  getMenuItemOrderAction,
  liquidOmakaseReservationHref,
} from "@/lib/menuAvailability";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

import { DesktopCartPanel } from "./DesktopCartPanel";
import type {
  DesktopMenuAddHandler,
  DesktopMenuViewHandler,
} from "./DesktopMenuTypes";
import {
  chefSpecialItems,
  desktopNigiriItems,
  menuHeroItem,
} from "./tabletMenuData";
import { TabletFilterSelect } from "./TabletMenuControls";

const desktopCategoryButtons = [
  ["all", "Recommended", "/assets/icons/star-icon.png"],
  ["nigiri", "Nigiri", "/assets/icons/nigiri-icon.png"],
  ["rolls", "Rolls", "/assets/icons/sushi-menu-icon.png"],
  ["sashimi", "Sashimi", "/assets/icons/sashimi-icon.png"],
  ["chef-specials", "Chef Specials", "/assets/icons/lotus-crown-icon.png"],
  ["vegetarian", "Vegetarian", "/assets/icons/vegetarian-sushi-icon.webp"],
  ["drinks", "Drinks", "/assets/icons/floral-emblem-icon.png"],
] as const;

const desktopNigiriDisplayNames: Record<string, string> = {
  "salmon-nigiri": "Sake Nigiri",
  "scallop-nigiri": "Hotate Nigiri",
  "tuna-nigiri": "Maguro Nigiri",
};

const desktopFishOptions = [
  "Fish Type",
  "Tuna",
  "Salmon",
  "Yellowtail",
  "Shellfish",
  "Roe",
] as const;
const desktopDrinkOptions = [
  "Drink Type",
  "Sake",
  "Flights",
  "Cocktails",
  "Zero Proof",
  "Tea",
  "Beer & Wine",
] as const;
const desktopDietaryOptions = [
  "Dietary",
  "Lean",
  "Rich",
  "Shellfish Free",
  "Vegetarian",
] as const;
const desktopSpiceOptions = ["Spicy Level", "Mild", "Hot"] as const;
const desktopSortOptions = ["Sort By", "Price Low", "Price High"] as const;

const desktopHeroContent = {
  all: {
    accent: "Japanese Cuisine",
    description: "Sourced daily. Crafted by masters. Served with passion.",
    eyebrow: "Explore our menu",
    image: getTabletPresentationImage(menuHeroItem),
    imagePosition: "object-[72%_42%]",
    title: "Exceptional",
  },
  "chef-specials": {
    description:
      "Rare cuts, premium finishes, and chef-driven signatures prepared with ceremony.",
    eyebrow: "Chef signatures",
    image: "/assets/editorial/luxury-seafood-and-wagyu-selection.webp",
    imagePosition: "object-[68%_46%]",
    title: "Chef Specials",
  },
  drinks: {
    description:
      "Order zero-proof and tea online, or reserve rare sake, cocktails, and Liquid Omakase pairings for the dining room.",
    eyebrow: "Beverage Pairings",
    image: "/assets/drinks/akai-tsuki-red-moon-cocktail.webp",
    imagePosition: "object-[58%_48%]",
    title: "Drinks",
  },
  nigiri: {
    description:
      "Experience the pure art of nigiri. Hand-pressed perfection, featuring the finest fish and seasonal ingredients.",
    eyebrow: "Our Menu",
    image: TABLET_OTORO_HERO_IMAGE,
    imagePosition: "object-[70%_46%]",
    title: "Nigiri",
  },
  rolls: {
    description:
      "Layered maki, precise cuts, and signature rolls built for texture, balance, and richness.",
    eyebrow: "Signature rolls",
    image: "/assets/food/sushi-rolls-with-warm-cinematic-glow.webp",
    imagePosition: "object-[66%_52%]",
    title: "Rolls",
  },
  sashimi: {
    description:
      "Clean slices of premium fish served with restraint, clarity, and seasonal garnish.",
    eyebrow: "Pure cuts",
    image: "/assets/editorial/elegant-sashimi-platter-on-slate.webp",
    imagePosition: "object-[72%_48%]",
    title: "Sashimi",
  },
  vegetarian: {
    description:
      "Plant-forward sushi with bright vegetables, seasoned rice, and elegant umami.",
    eyebrow: "Plant-forward",
    image: "/assets/menu/sushi/vegetarian-temaki.webp",
    imagePosition: "object-[70%_50%]",
    title: "Vegetarian",
  },
} as const;

function getDesktopMenuSearchText(item: MenuItem) {
  return `${item.name} ${item.description} ${item.ingredients.join(" ")} ${item.tags.join(" ")}`.toLowerCase();
}

function matchesDesktopFishFilter(item: MenuItem, filter: string) {
  if (item.itemType === "drink") {
    if (filter === desktopFishOptions[0] || filter === desktopDrinkOptions[0]) {
      return true;
    }

    const searchText = getDesktopMenuSearchText(item);
    const drinkMatchers: Record<string, RegExp> = {
      "Beer & Wine": /beer|lager|wine|sparkling/,
      Cocktails: /cocktail|old fashioned|highball|spritz|akai|kintsugi/,
      Flights: /flight/,
      Sake: /sake|junmai|ginjo|daiginjo|yamahai/,
      Tea: /tea|sencha|hojicha|gyokuro|matcha/,
      "Zero Proof": /zero-proof|zero proof|nonalcoholic|tonic|cloud|ember/,
    };

    return drinkMatchers[filter]?.test(searchText) ?? true;
  }

  if (filter === desktopFishOptions[0]) return true;

  const searchText = getDesktopMenuSearchText(item);
  const matchers: Record<string, RegExp> = {
    Roe: /roe|ikura/,
    Salmon: /salmon/,
    Shellfish: /shrimp|scallop|ebi/,
    Tuna: /tuna|toro/,
    Yellowtail: /yellowtail|hamachi/,
  };

  return matchers[filter]?.test(searchText) ?? true;
}

function matchesDesktopDietaryFilter(item: MenuItem, filter: string) {
  if (filter === desktopDietaryOptions[0]) return true;
  if (item.itemType === "drink") return true;

  const searchText = getDesktopMenuSearchText(item);

  if (filter === "Lean") return /lean|hamachi|salmon|ebi/.test(searchText);
  if (filter === "Rich") return /otoro|toro|uni|roe|wagyu/.test(searchText);
  if (filter === "Shellfish Free")
    return !/shrimp|scallop|ebi/.test(searchText);
  if (filter === "Vegetarian") return item.category === "vegetarian";

  return true;
}

function matchesDesktopSpiceFilter(item: MenuItem, filter: string) {
  if (item.itemType === "drink") return true;
  if (filter === "Hot") return item.tags.includes("hot");
  if (filter === "Mild") return !item.tags.includes("hot");

  return true;
}

function sortDesktopMenuItems(items: MenuItem[], sort: string) {
  if (sort === "Price Low") {
    return [...items].sort((a, b) => a.priceCents - b.priceCents);
  }

  if (sort === "Price High") {
    return [...items].sort((a, b) => b.priceCents - a.priceCents);
  }

  return items;
}

export function DesktopMenuSurface({
  activeCategoryItems,
  category,
  categoryExists,
  filteredItems,
  hasActiveFilters,
  query,
  selectedCategoryLabel,
  totalItemCount,
  onAddToCart,
  onClearCart,
  onClearFilters,
  onOpenCheckout,
  onQueryChange,
  onRemoveItem,
  onSelectCategory,
  onUpdateQuantity,
  onViewDetails,
}: {
  activeCategoryItems: MenuItem[];
  category: string;
  categoryExists: (categoryId: string) => boolean;
  filteredItems: MenuItem[];
  hasActiveFilters: boolean;
  query: string;
  selectedCategoryLabel: string;
  totalItemCount: number;
  onAddToCart: DesktopMenuAddHandler;
  onClearCart: () => void;
  onClearFilters: () => void;
  onOpenCheckout: () => void;
  onQueryChange: (query: string) => void;
  onRemoveItem: (id: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onViewDetails: DesktopMenuViewHandler;
}) {
  const { items, totals } = useCart();
  const [fishFilter, setFishFilter] = useState<string>(desktopFishOptions[0]);
  const [dietaryFilter, setDietaryFilter] = useState<string>(
    desktopDietaryOptions[0],
  );
  const [spiceFilter, setSpiceFilter] = useState<string>(
    desktopSpiceOptions[0],
  );
  const [sortFilter, setSortFilter] = useState<string>(desktopSortOptions[0]);
  const isCategoryPage = category !== "all" && category !== "recommended";
  const isDrinkCategory = category === "drinks";
  const displayItems = filteredItems;
  const categoryDisplayItems =
    category === "nigiri" && query.trim().length === 0
      ? desktopNigiriItems
      : activeCategoryItems;
  const effectiveFishFilter =
    isCategoryPage && isDrinkCategory
      ? desktopDrinkOptions.includes(
          fishFilter as (typeof desktopDrinkOptions)[number],
        )
        ? fishFilter
        : desktopDrinkOptions[0]
      : isCategoryPage
        ? fishFilter
        : desktopFishOptions[0];
  const hasDesktopFilters =
    effectiveFishFilter !==
      (isDrinkCategory ? desktopDrinkOptions[0] : desktopFishOptions[0]) ||
    (!isDrinkCategory && dietaryFilter !== desktopDietaryOptions[0]) ||
    (!isDrinkCategory && spiceFilter !== desktopSpiceOptions[0]) ||
    sortFilter !== desktopSortOptions[0];
  const applyDesktopFilters = (sourceItems: MenuItem[]) =>
    sortDesktopMenuItems(
      sourceItems.filter(
        (item) =>
          matchesDesktopFishFilter(item, effectiveFishFilter) &&
          matchesDesktopDietaryFilter(item, dietaryFilter) &&
          matchesDesktopSpiceFilter(item, spiceFilter),
      ),
      sortFilter,
    );
  const visibleDisplayItems = applyDesktopFilters(displayItems);
  const visibleCategoryItems = applyDesktopFilters(categoryDisplayItems);
  const visibleItemCount = isCategoryPage
    ? visibleCategoryItems.length
    : visibleDisplayItems.length;
  const clearAllDesktopFilters = () => {
    setFishFilter(desktopFishOptions[0]);
    setDietaryFilter(desktopDietaryOptions[0]);
    setSpiceFilter(desktopSpiceOptions[0]);
    setSortFilter(desktopSortOptions[0]);
    onClearFilters();
  };

  return (
    <main
      className={classNames(
        "mx-auto grid min-h-[calc(100dvh-76px)] max-w-[1672px] grid-cols-[minmax(0,1fr)_386px] gap-7 px-7 pb-6 pt-3",
        isCategoryPage
          ? "min-[1500px]:px-7 min-[1500px]:pb-0 min-[1500px]:pt-0"
          : "min-[1500px]:max-w-none min-[1500px]:grid-cols-[178px_minmax(0,980px)_382px] min-[1500px]:px-0 min-[1500px]:pb-0 min-[1500px]:pt-0",
      )}
    >
      {isCategoryPage ? null : <DesktopMenuEditorialRail />}
      <section className="min-w-0 rounded-[18px] border border-[var(--sb-border)] bg-black/58 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.52)] min-[1500px]:rounded-none min-[1500px]:border-0 min-[1500px]:bg-transparent min-[1500px]:p-0 min-[1500px]:shadow-none">
        <DesktopMenuHero
          category={category}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />

        {isCategoryPage ? (
          <>
            <DesktopCategoryNav
              category={category}
              categoryExists={categoryExists}
              onSelectCategory={onSelectCategory}
            />
            <DesktopFilterControls
              category={category}
              dietaryFilter={dietaryFilter}
              fishFilter={fishFilter}
              isCategoryPage
              query={query}
              sortFilter={sortFilter}
              spiceFilter={spiceFilter}
              onDietaryFilterChange={setDietaryFilter}
              onFishFilterChange={setFishFilter}
              onQueryChange={onQueryChange}
              onSortFilterChange={setSortFilter}
              onSpiceFilterChange={setSpiceFilter}
            />
          </>
        ) : (
          <>
            <DesktopFilterControls
              category={category}
              dietaryFilter={dietaryFilter}
              fishFilter={fishFilter}
              query={query}
              sortFilter={sortFilter}
              spiceFilter={spiceFilter}
              onDietaryFilterChange={setDietaryFilter}
              onFishFilterChange={setFishFilter}
              onQueryChange={onQueryChange}
              onSortFilterChange={setSortFilter}
              onSpiceFilterChange={setSpiceFilter}
            />
            <DesktopCategoryNav
              category={category}
              categoryExists={categoryExists}
              onSelectCategory={onSelectCategory}
            />
          </>
        )}

        <p className="mt-2 text-[12px] text-white/50 min-[1500px]:sr-only">
          Showing{" "}
          <span className="font-mono text-[var(--sb-gold-soft)]">
            {visibleItemCount}
          </span>{" "}
          of{" "}
          <span className="font-mono text-[var(--sb-gold-soft)]">
            {totalItemCount}
          </span>{" "}
          items in <span className="text-white">{selectedCategoryLabel}</span>
          {hasActiveFilters || hasDesktopFilters ? (
            <button
              className="ml-3 text-[var(--sb-red-bright)]"
              onClick={clearAllDesktopFilters}
              type="button"
            >
              Reset filters
            </button>
          ) : null}
        </p>

        {isCategoryPage ? (
          <>
            <DesktopMenuSection title={`${selectedCategoryLabel} Menu`}>
              {visibleCategoryItems.length > 0 ? (
                <div className="grid grid-cols-4 gap-3 min-[1500px]:gap-4">
                  {visibleCategoryItems.slice(0, 8).map((item, index) => (
                    <DesktopFeatureMenuCard
                      badge={index === 0 ? "Chef's Pick" : undefined}
                      displayName={desktopNigiriDisplayNames[item.id]}
                      eagerImage={index < 8}
                      item={item}
                      key={item.id}
                      onAddToCart={onAddToCart}
                      onViewDetails={onViewDetails}
                    />
                  ))}
                </div>
              ) : category === "drinks" && activeCategoryItems.length === 0 ? (
                <DesktopDrinksEmptyState />
              ) : (
                <DesktopCategoryEmptyState
                  categoryLabel={selectedCategoryLabel}
                  onClearFilters={clearAllDesktopFilters}
                />
              )}
            </DesktopMenuSection>
            <DesktopCategoryBenefitStrip category={category} />
          </>
        ) : (
          <>
            <DesktopMenuSection action="View full menu" title="Chef's Specials">
              <div className="grid grid-cols-4 gap-3 min-[1500px]:gap-4">
                {chefSpecialItems.map((item, index) => (
                  <DesktopFeatureMenuCard
                    badge={
                      index === 0
                        ? "Chef's Special"
                        : index === 1
                          ? "Hot"
                          : index === 2
                            ? "Signature"
                            : "Premium"
                    }
                    compactDesktop
                    eagerImage={index < 4}
                    item={item}
                    key={item.id}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            </DesktopMenuSection>
            <DesktopMenuSection title="All Menu Items">
              {visibleDisplayItems.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {visibleDisplayItems.slice(0, 9).map((item, index) => (
                    <DesktopCompactMenuRow
                      eagerImage={index < 3}
                      item={item}
                      key={item.id}
                      onAddToCart={onAddToCart}
                      onViewDetails={onViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <DesktopCategoryEmptyState
                  categoryLabel={selectedCategoryLabel}
                  onClearFilters={clearAllDesktopFilters}
                />
              )}
            </DesktopMenuSection>
          </>
        )}
      </section>

      <DesktopCartPanel
        items={items}
        totals={totals}
        onCheckout={onOpenCheckout}
        onClearCart={onClearCart}
        onRemove={onRemoveItem}
        onUpdateQuantity={onUpdateQuantity}
      />
    </main>
  );
}

function DesktopFilterControls({
  category,
  dietaryFilter,
  fishFilter,
  isCategoryPage = false,
  query,
  sortFilter,
  spiceFilter,
  onDietaryFilterChange,
  onFishFilterChange,
  onQueryChange,
  onSortFilterChange,
  onSpiceFilterChange,
}: {
  category: string;
  dietaryFilter: string;
  fishFilter: string;
  isCategoryPage?: boolean;
  query: string;
  sortFilter: string;
  spiceFilter: string;
  onDietaryFilterChange: (value: string) => void;
  onFishFilterChange: (value: string) => void;
  onQueryChange: (query: string) => void;
  onSortFilterChange: (value: string) => void;
  onSpiceFilterChange: (value: string) => void;
}) {
  const isDrinkCategory = category === "drinks";
  const primaryFilterOptions = isDrinkCategory
    ? desktopDrinkOptions
    : desktopFishOptions;
  const primaryFilterValue = (
    primaryFilterOptions as readonly string[]
  ).includes(fishFilter)
    ? fishFilter
    : primaryFilterOptions[0];
  const placeholder = isDrinkCategory
    ? "Search drinks, sake, tea..."
    : category === "nigiri"
      ? "Search nigiri..."
      : "Search menu items...";

  return (
    <div
      className={classNames(
        "mt-3 grid gap-3",
        isCategoryPage && isDrinkCategory
          ? "grid-cols-[minmax(0,1fr)_170px_170px] min-[1500px]:mt-4 min-[1500px]:grid-cols-[minmax(360px,1fr)_190px_170px]"
          : isCategoryPage
            ? "grid-cols-[minmax(0,1fr)_150px_150px_150px_150px] min-[1500px]:mt-4 min-[1500px]:grid-cols-[minmax(340px,1fr)_160px_160px_160px_160px]"
            : "grid-cols-[minmax(0,1fr)_170px_170px_170px] min-[1500px]:mt-4 min-[1500px]:grid-cols-[minmax(360px,1fr)_174px_174px_174px]",
      )}
    >
      <label className="relative block">
        <span className="sr-only">Search menu</span>
        <AssetIcon
          className="absolute left-4 top-1/2 -translate-y-1/2 drop-shadow-[0_0_10px_rgba(215,168,79,0.22)]"
          size={20}
          src="/assets/icons/search-icon.png"
        />
        <input
          aria-label="Search menu items"
          className="h-[54px] w-full rounded-[13px] border border-white/14 bg-black/28 pl-12 pr-4 text-[14px] font-semibold text-white outline-none transition placeholder:text-white/44 hover:border-[var(--sb-gold)]/34 hover:bg-white/[0.055] focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/25 min-[1500px]:h-[58px]"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          value={query}
        />
      </label>
      {isCategoryPage ? (
        <TabletFilterSelect
          label={isDrinkCategory ? "Drink Type" : "Fish Type"}
          options={primaryFilterOptions}
          value={primaryFilterValue}
          onChange={onFishFilterChange}
        />
      ) : null}
      {isDrinkCategory ? null : (
        <>
          <TabletFilterSelect
            label="Dietary"
            options={desktopDietaryOptions}
            value={dietaryFilter}
            onChange={onDietaryFilterChange}
          />
          <TabletFilterSelect
            label="Spicy Level"
            options={desktopSpiceOptions}
            value={spiceFilter}
            onChange={onSpiceFilterChange}
          />
        </>
      )}
      <TabletFilterSelect
        label="Sort By"
        options={desktopSortOptions}
        value={sortFilter}
        onChange={onSortFilterChange}
      />
    </div>
  );
}

function DesktopCategoryNav({
  category,
  categoryExists,
  onSelectCategory,
}: {
  category: string;
  categoryExists: (categoryId: string) => boolean;
  onSelectCategory: (categoryId: string) => void;
}) {
  return (
    <nav
      aria-label="Desktop menu categories"
      className="mt-3 grid grid-cols-[1.28fr_0.7fr_0.7fr_0.78fr_1.28fr_1.04fr_0.62fr] gap-2 min-[1500px]:mt-4 min-[1500px]:grid-cols-[1.16fr_0.74fr_0.74fr_0.84fr_1.18fr_1fr_0.74fr] min-[1500px]:gap-3"
    >
      {desktopCategoryButtons.map(([id, label, icon]) => {
        const disabled =
          id === "chef-specials" || id === "drinks"
            ? false
            : !categoryExists(id);
        const active = category === id;

        return (
          <button
            aria-label={label}
            aria-pressed={active}
            className={classNames(
              "flex min-h-[46px] min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-[10px] border px-1.5 text-[10px] uppercase transition disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[1500px]:gap-2 min-[1500px]:px-3 min-[1500px]:text-[13px]",
              active
                ? "border-[var(--sb-gold)] bg-[linear-gradient(180deg,var(--sb-gold-soft),var(--sb-gold))] text-black shadow-[0_0_24px_rgb(215_168_79_/_0.22)]"
                : "border-white/14 bg-black/24 text-white/72 hover:border-[var(--sb-gold)]/36 hover:bg-white/[0.055] hover:text-white",
              disabled ? "hover:border-white/14 hover:bg-black/24" : "",
            )}
            disabled={disabled}
            key={id}
            onClick={() => onSelectCategory(id)}
            type="button"
          >
            <AssetIcon size={16} src={icon} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function DesktopCategoryBenefitStrip({ category }: { category: string }) {
  const benefits =
    category === "drinks"
      ? ([
          ["floral-emblem-icon.png", "Pairing Logic", "Matched By Course"],
          ["lotus-crown-icon.png", "Sake Cellar", "Reserve In-House"],
          ["chef-crest-icon.png", "Zero Proof", "Online Ready"],
          ["clock-icon.png", "Tea Service", "Order Or Reserve"],
        ] as const)
      : ([
          ["floral-emblem-icon.png", "Ingredient Sourcing", "Sourced Daily"],
          ["lotus-crown-icon.png", "Expert Craftsmanship", "By Master Chefs"],
          [
            "chef-crest-icon.png",
            "Authentic Experience",
            "Traditional. Refined.",
          ],
          ["gold-alert-icon.png", "Allergen Info", "Available Upon Request"],
        ] as const);

  return (
    <section className="mt-4 grid grid-cols-4 rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] px-8 py-3">
      {benefits.map(([icon, title, copy]) => (
        <article
          className="grid grid-cols-[42px_1fr] items-center gap-3 border-l border-white/10 pl-7 first:border-l-0 first:pl-0"
          key={title}
        >
          <AssetIcon size={34} src={`/assets/icons/${icon}`} />
          <div>
            <p className="editorial-title text-[14px] uppercase tracking-[0.08em] text-white/82">
              {title}
            </p>
            <p className="mt-0.5 text-[13px] text-white/56">{copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function DesktopMenuEditorialRail() {
  return (
    <aside
      aria-hidden="true"
      className="relative hidden min-h-[calc(100dvh-76px)] overflow-hidden border-r border-white/[0.08] min-[1500px]:block"
    >
      <Image
        alt=""
        className="object-cover object-left-top"
        fill
        loading="eager"
        priority
        sizes="178px"
        src="/assets/textures/red-moon-sakura-background.webp"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.08),rgba(0,0,0,0.28)_58%,rgba(0,0,0,0.78)_100%)]" />
    </aside>
  );
}

function DesktopMenuHero({
  category,
  onAddToCart,
  onViewDetails,
}: {
  category: string;
  onAddToCart: DesktopMenuAddHandler;
  onViewDetails: DesktopMenuViewHandler;
}) {
  const hero =
    desktopHeroContent[category as keyof typeof desktopHeroContent] ||
    desktopHeroContent.all;
  const showFeaturedActions = category === "all";

  return (
    <section className="relative min-h-[216px] overflow-hidden rounded-[16px] border border-white/10 min-[1500px]:min-h-[174px]">
      <Image
        alt={`${hero.title} menu presentation`}
        className={classNames("object-cover", hero.imagePosition)}
        fetchPriority="high"
        fill
        loading="eager"
        priority
        sizes="1200px"
        src={hero.image}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,5,6,0.96),rgba(4,5,6,0.78)_42%,rgba(4,5,6,0.12)_78%,rgba(4,5,6,0.78))]" />
      <div className="relative z-10 flex min-h-[216px] flex-col justify-center px-8 min-[1500px]:min-h-[174px] min-[1500px]:px-2">
        <p className="text-[14px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          {hero.eyebrow}
        </p>
        <h1 className="editorial-title mt-2 text-[42px] leading-[0.96] text-white min-[1500px]:text-[40px]">
          {hero.title}
          {"accent" in hero ? (
            <span className="block text-[var(--sb-red-bright)]">
              {hero.accent}
            </span>
          ) : null}
        </h1>
        <p className="mt-2 max-w-[500px] text-[15px] leading-6 text-[var(--sb-gold-soft)]">
          {hero.description}
        </p>
        {showFeaturedActions ? (
          <div className="mt-4 flex gap-3 min-[1500px]:hidden">
            <button
              className="red-glow-button h-11 w-[180px] rounded-[10px] text-[12px] uppercase tracking-[0.08em]"
              onClick={() => onAddToCart(menuHeroItem)}
              type="button"
            >
              Add feature
            </button>
            <button
              className="h-11 w-[170px] rounded-[10px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              onClick={() => onViewDetails(menuHeroItem)}
              type="button"
            >
              View details
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function DesktopDrinksEmptyState() {
  const pairings = [
    ["Sake flight", "Three pours aligned to lean, rich, and umami courses."],
    ["Tea service", "Roasted green tea, matcha, and warm seasonal infusions."],
    ["Zero-proof", "Sparkling yuzu, shiso citrus, and mineral pairings."],
  ] as const;

  return (
    <div className="grid min-h-[246px] grid-cols-[1fr_300px] overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-[linear-gradient(135deg,rgba(0,0,0,0.76),rgba(101,12,10,0.28)_48%,rgba(0,0,0,0.86))]">
      <div className="p-7">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
          Sommelier Guided
        </p>
        <h3 className="editorial-title mt-3 text-[34px] uppercase leading-none tracking-[0.1em] text-white">
          Pairings served with your meal
        </h3>
        <p className="mt-4 max-w-[560px] text-[14px] leading-6 text-white/64">
          The beverage selection is matched at the table so the pour follows the
          fish, rice temperature, seasoning, and pacing of the order.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            className="red-glow-button grid h-11 w-[178px] place-items-center rounded-[9px] text-[11px] uppercase tracking-[0.08em]"
            href={liquidOmakaseReservationHref}
          >
            Reserve Pairing
          </Link>
          <Link
            className="grid h-11 w-[154px] place-items-center rounded-[9px] border border-[var(--sb-border)] text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/42 hover:bg-white/[0.045]"
            href="/support"
          >
            Ask Concierge
          </Link>
        </div>
      </div>
      <div className="grid content-center gap-3 border-l border-white/10 bg-black/30 p-4">
        {pairings.map(([title, copy]) => (
          <article
            className="rounded-[10px] border border-white/12 bg-white/[0.035] p-3"
            key={title}
          >
            <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--sb-gold)]">
              {title}
            </p>
            <p className="mt-1 text-[12px] leading-5 text-white/58">{copy}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function DesktopCategoryEmptyState({
  categoryLabel,
  onClearFilters,
}: {
  categoryLabel: string;
  onClearFilters: () => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--sb-border)] bg-black/34 p-8 text-center">
      <p className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
        No {categoryLabel.toLowerCase()} matches these refinements
      </p>
      <p className="mt-2 text-[13px] text-white/58">
        Reset the filters to return to the full menu.
      </p>
      <button
        className="mt-5 rounded-[9px] border border-[var(--sb-border)] px-5 py-3 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/42 hover:bg-white/[0.045]"
        onClick={onClearFilters}
        type="button"
      >
        Reset filters
      </button>
    </div>
  );
}

function DesktopFeatureMenuCard({
  badge,
  compactDesktop = false,
  displayName,
  eagerImage = false,
  item,
  onAddToCart,
  onViewDetails,
}: {
  badge?: string;
  compactDesktop?: boolean;
  displayName?: string;
  eagerImage?: boolean;
  item: MenuItem;
  onAddToCart: DesktopMenuAddHandler;
  onViewDetails: DesktopMenuViewHandler;
}) {
  const hasDuplicateStandardCard = item.name === "Otoro Nigiri";
  const orderAction = getMenuItemOrderAction(item);

  return (
    <article className="relative min-h-[210px] overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-black/42 min-[1500px]:min-h-[204px]">
      {badge ? (
        <span className="absolute left-0 top-0 z-10 rounded-br-[12px] bg-[var(--sb-red)]/86 px-2.5 py-1 text-[10px] uppercase text-white">
          {badge}
        </span>
      ) : null}
      <button
        aria-label={
          badge && hasDuplicateStandardCard
            ? `View featured ${item.name} details`
            : `View details for ${item.name}`
        }
        className="block w-full text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <div
          className={classNames(
            "relative h-[96px]",
            compactDesktop ? "min-[1500px]:h-[82px]" : "min-[1500px]:h-[90px]",
          )}
        >
          <Image
            alt=""
            className="object-cover"
            fill
            loading={eagerImage ? "eager" : "lazy"}
            priority={eagerImage}
            sizes="300px"
            src={item.image.publicUrl}
          />
        </div>
        <div
          className={classNames(
            "px-3.5 py-3 pr-12",
            compactDesktop
              ? "min-[1500px]:px-3 min-[1500px]:py-2.5 min-[1500px]:pr-12"
              : "min-[1500px]:px-3.5 min-[1500px]:py-2.5 min-[1500px]:pr-12",
          )}
        >
          <h3
            className={classNames(
              "line-clamp-2 min-h-[42px] text-[16px] leading-[21px] text-white",
              compactDesktop
                ? "min-[1500px]:text-[15px]"
                : "min-[1500px]:text-[15px] min-[1500px]:leading-5",
            )}
          >
            {displayName || item.name}
          </h3>
          <p
            className={classNames(
              "mt-1 line-clamp-1 text-[12px] text-white/58",
              compactDesktop ? "" : "min-[1500px]:leading-5",
            )}
          >
            {item.itemType === "drink"
              ? item.serving || item.texture
              : item.ingredients.slice(0, 3).join(", ")}
          </p>
          <p
            className={classNames(
              "mt-2 text-[16px] text-[var(--sb-gold-soft)]",
              compactDesktop ? "" : "min-[1500px]:leading-5",
            )}
          >
            {formatMoney(item.priceCents)}
          </p>
          {item.itemType === "drink" ? (
            <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-white/42">
              {orderAction.badge}
            </span>
          ) : null}
        </div>
      </button>
      {orderAction.kind === "reservation" ? (
        <Link
          aria-label={`${orderAction.label} for ${item.name}`}
          className="absolute bottom-3 right-3 flex h-10 min-w-[98px] items-center justify-center gap-2 rounded-full border border-[var(--sb-gold)]/48 bg-[linear-gradient(180deg,rgba(215,168,79,0.18),rgba(7,8,8,0.86))] px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] shadow-[0_0_20px_rgba(215,168,79,0.16)]"
          href={orderAction.href || "/reservations"}
        >
          <AssetIcon size={18} src={orderAction.icon} />
          <span>{orderAction.shortLabel}</span>
        </Link>
      ) : (
        <button
          aria-label={
            badge && hasDuplicateStandardCard
              ? `Add featured ${item.name} to cart`
              : `Add ${item.name} to cart`
          }
          className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/52 bg-black/52"
          onClick={() => onAddToCart(item)}
          type="button"
        >
          <AssetIcon size={20} src="/assets/icons/plus-icon.png" />
        </button>
      )}
    </article>
  );
}

export function DesktopCompactMenuRow({
  eagerImage = false,
  item,
  onAddToCart,
  onViewDetails,
}: {
  eagerImage?: boolean;
  item: MenuItem;
  onAddToCart: DesktopMenuAddHandler;
  onViewDetails: DesktopMenuViewHandler;
}) {
  const orderAction = getMenuItemOrderAction(item);

  return (
    <article className="grid grid-cols-[86px_minmax(0,1fr)_42px] items-center gap-3 rounded-[10px] border border-[var(--sb-border)] bg-black/34 p-1.5">
      <button
        aria-label={`View details for ${item.name}`}
        className="relative h-[68px] overflow-hidden rounded-[8px]"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <Image
          alt=""
          className="object-cover"
          fill
          loading={eagerImage ? "eager" : "lazy"}
          priority={eagerImage}
          sizes="90px"
          src={item.image.publicUrl}
        />
      </button>
      <button
        className="min-w-0 text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <h3 className="line-clamp-2 min-h-[42px] text-[15px] leading-[21px] text-white">
          {item.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-[12px] text-white/55">
          {item.itemType === "drink"
            ? item.serving || item.texture
            : item.description}
        </p>
        <p className="text-[15px] text-[var(--sb-gold-soft)]">
          {formatMoney(item.priceCents)}
        </p>
        {item.itemType === "drink" ? (
          <span className="text-[10px] uppercase tracking-[0.1em] text-white/42">
            {orderAction.badge}
          </span>
        ) : null}
      </button>
      {orderAction.kind === "reservation" ? (
        <Link
          aria-label={`${orderAction.label} for ${item.name}`}
          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/48 bg-[linear-gradient(180deg,rgba(215,168,79,0.18),rgba(7,8,8,0.86))] shadow-[0_0_20px_rgba(215,168,79,0.16)]"
          href={orderAction.href || "/reservations"}
        >
          <AssetIcon size={19} src={orderAction.icon} />
        </Link>
      ) : (
        <button
          aria-label={`Add ${item.name} to cart`}
          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-border)]"
          onClick={() => onAddToCart(item)}
          type="button"
        >
          <AssetIcon size={20} src="/assets/icons/plus-icon.png" />
        </button>
      )}
    </article>
  );
}

function DesktopMenuSection({
  action,
  children,
  title,
}: {
  action?: string;
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="mt-4 rounded-[14px] border border-[var(--sb-border)] bg-black/34 p-4 min-[1500px]:mt-3 min-[1500px]:p-3">
      <div className="flex items-center justify-between">
        <h2 className="editorial-title flex items-center gap-3 text-[18px] uppercase tracking-[0.09em] text-white">
          <AssetIcon size={22} src="/assets/icons/star-icon.png" />
          {title}
        </h2>
        {action ? (
          <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
            {action} <ChevronIcon direction="right" size={18} />
          </span>
        ) : null}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}
