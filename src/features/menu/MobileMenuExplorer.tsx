"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { SegmentedProgressMeter } from "@/components/ui/SegmentedProgressMeter";
import { icons } from "@/features/home/homeDashboardData";
import { getTabletPresentationImage } from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import { liquidOmakaseReservationHref } from "@/lib/menuAvailability";
import { formatMoney } from "@/lib/money";
import type { MenuCategory, MenuItem } from "@/types/menu";

import {
  getPopularMobileItems,
  MobileMenuGridCard,
  MobileMenuListCard,
  MobileSearchResultRow,
} from "./MobileMenuCards";
import {
  MobileCategoryPills,
  MobileMenuHeader,
  MobileSearchForm,
  MobileSectionHeader,
  recentMobileSearches,
} from "./MobileMenuChrome";
import { menuHeroItem, tabletNigiriItems } from "./tabletMenuData";

interface MobileMenuExplorerProps {
  cartItemCount: number;
  cartSubtotalCents: number;
  categories: MenuCategory[];
  category: string;
  filteredItems: MenuItem[];
  query: string;
  onAddToCart: (item: MenuItem) => void;
  onClearFilters: () => void;
  onOpenCart: () => void;
  onQueryChange: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

const mobileCategoryOrder = [
  "nigiri",
  "rolls",
  "sashimi",
  "chef-specials",
  "vegetarian",
  "drinks",
] as const;

/** Mobile-first menu browser with search, category, and featured-item states. */
export function MobileMenuExplorer({
  cartItemCount,
  cartSubtotalCents,
  categories,
  category,
  filteredItems,
  query,
  onAddToCart,
  onClearFilters,
  onOpenCart,
  onQueryChange,
  onSelectCategory,
  onViewDetails,
}: MobileMenuExplorerProps) {
  const hasSearch = query.trim().length > 0;
  const selectedCategory = categories.find((item) => item.id === category);
  const visibleCategories = mobileCategoryOrder
    .map((id) => categories.find((item) => item.id === id))
    .filter((item): item is MenuCategory => Boolean(item));
  const popularItems = getPopularMobileItems(filteredItems);

  return (
    <section className="relative min-h-dvh overflow-hidden bg-black px-5 pb-[124px] pt-5 text-white md:hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_4%,rgba(118,12,12,0.34),transparent_26%),radial-gradient(circle_at_94%_15%,rgba(202,164,93,0.08),transparent_22%),linear-gradient(180deg,#060606_0%,#070605_42%,#030303_100%)]" />
        <div className="sb-wave-pattern absolute left-0 top-[230px] h-40 w-full opacity-20" />
      </div>

      <div className="mobile-frame relative z-10">
        <MobileMenuHeader
          cartItemCount={cartItemCount}
          cartSubtotalCents={cartSubtotalCents}
          onOpenCart={onOpenCart}
        />

        {hasSearch ? (
          <MobileSearchResults
            filteredItems={filteredItems}
            query={query}
            onAddToCart={onAddToCart}
            onClearFilters={onClearFilters}
            onQueryChange={onQueryChange}
            onViewDetails={onViewDetails}
          />
        ) : category !== "all" && selectedCategory ? (
          <MobileCategoryView
            category={selectedCategory}
            categories={visibleCategories}
            items={filteredItems}
            onAddToCart={onAddToCart}
            onQueryChange={onQueryChange}
            onSelectCategory={onSelectCategory}
            onViewDetails={onViewDetails}
          />
        ) : (
          <MobileMenuOverview
            cartItemCount={cartItemCount}
            categories={visibleCategories}
            items={popularItems}
            onAddToCart={onAddToCart}
            onOpenCart={onOpenCart}
            onQueryChange={onQueryChange}
            onSelectCategory={onSelectCategory}
            onViewDetails={onViewDetails}
          />
        )}
      </div>

      <BottomNavigation activeId="menu" ariaLabel="Mobile menu navigation" />
    </section>
  );
}

function MobileMenuOverview({
  categories,
  items,
  onAddToCart,
  onOpenCart,
  onQueryChange,
  onSelectCategory,
  onViewDetails,
}: {
  cartItemCount: number;
  categories: MenuCategory[];
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onOpenCart: () => void;
  onQueryChange: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}) {
  return (
    <>
      <div className="mt-6">
        <MobileSearchForm query="" onQueryChange={onQueryChange} />
      </div>

      <MobileCategoryPills
        activeCategory="nigiri"
        categories={categories}
        onSelectCategory={onSelectCategory}
      />

      <button
        className="relative mt-4 block min-h-[222px] w-full overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-black/52 text-left shadow-[0_22px_60px_rgba(0,0,0,0.48)]"
        onClick={() => onViewDetails(menuHeroItem)}
        type="button"
      >
        <Image
          alt=""
          className="object-cover object-[72%_48%]"
          fill
          fetchPriority="high"
          loading="eager"
          priority
          sizes="430px"
          src={getTabletPresentationImage(menuHeroItem)}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.62)_46%,rgba(0,0,0,0.08)_100%),linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.72)_100%)]" />
        <span className="absolute right-5 top-5 rounded-[9px] bg-[var(--sb-red)] px-3 py-1 text-[12px] uppercase text-white">
          Hot
        </span>
        <div className="relative z-10 flex min-h-[222px] flex-col justify-center px-6 py-6">
          <p className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
            Chef&apos;s Special
          </p>
          <h1 className="editorial-title mt-3 text-[32px] leading-none tracking-[0.12em] text-white">
            {menuHeroItem.name}
          </h1>
          <p className="mt-2 text-[17px] text-white/74">
            {menuHeroItem.description}
          </p>
          <p className="mt-4 max-w-[190px] text-[16px] leading-6 text-[var(--sb-gold)]">
            Exquisitely marbled otoro, melts in your mouth.
          </p>
          <p className="mt-4 text-[25px] text-[var(--sb-gold)]">
            {formatMoney(menuHeroItem.priceCents)}
          </p>
        </div>
      </button>

      <MobileSectionHeader title="Popular Picks" />
      <div className="mt-3 grid grid-cols-1 gap-3 min-[390px]:grid-cols-2">
        {items.slice(0, 8).map((item, index) => (
          <MobileMenuGridCard
            badge={index === 0 ? "Hot" : index === 1 ? "Popular" : undefined}
            eagerImage={index < 4}
            item={item}
            key={item.id}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] text-white/44">
        Prices do not include tax. Photos for illustration only.
      </p>

      <button
        aria-label="View Bliss Member progress"
        className="mt-5 grid w-full grid-cols-[58px_minmax(0,1fr)_auto] items-center gap-4 overflow-hidden rounded-[20px] border border-[var(--sb-gold)]/24 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02)_42%,rgba(96,7,8,0.28))] p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_48px_rgba(0,0,0,0.34)] transition hover:border-[var(--sb-gold)]/42"
        onClick={onOpenCart}
        type="button"
      >
        <span className="grid h-[58px] w-[58px] place-items-center rounded-full border border-[var(--sb-gold)]/32 bg-black/42 shadow-[0_0_24px_rgba(215,168,79,0.12)]">
          <AssetIcon size={42} src={icons.flower} />
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="editorial-title block text-[17px] uppercase leading-none tracking-[0.08em]">
              Bliss Member
            </span>
            <span className="rounded-full bg-[linear-gradient(180deg,var(--sb-gold-soft),var(--sb-gold))] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-black">
              Gold
            </span>
          </span>
          <span className="mt-2 block text-[12px] leading-5 text-white/68">
            3,250 pts earned. 750 pts to Platinum.
          </span>
          <SegmentedProgressMeter
            ariaLabel="Bliss member tier progress"
            className="mt-3"
            max={4000}
            size="compact"
            value={3250}
          />
        </span>
        <span className="text-[var(--sb-gold)]" aria-hidden="true">
          <ChevronIcon direction="right" size={18} />
        </span>
      </button>
    </>
  );
}

function MobileCategoryView({
  category,
  categories,
  items,
  onAddToCart,
  onQueryChange,
  onSelectCategory,
  onViewDetails,
}: {
  category: MenuCategory;
  categories: MenuCategory[];
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onQueryChange: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}) {
  const isDrinksCategory = category.id === "drinks";
  const isEmptyDrinks = isDrinksCategory && items.length === 0;
  const displayItems =
    category.id === "nigiri" ? tabletNigiriItems : isEmptyDrinks ? [] : items;
  const heroItem = displayItems[0] || menuHeroItem;
  const heroImage = isDrinksCategory
    ? "/assets/drinks/akai-tsuki-red-moon-cocktail.webp"
    : getTabletPresentationImage(heroItem);

  return (
    <>
      <section className="relative mt-7 min-h-[232px] overflow-hidden">
        <Image
          alt=""
          className={classNames(
            "object-cover",
            isDrinksCategory ? "object-[58%_48%]" : "object-[75%_38%]",
          )}
          fetchPriority="high"
          fill
          loading="eager"
          sizes="430px"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.58)_54%,rgba(0,0,0,0.08)_100%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,#050505_96%)]" />
        <div className="relative z-10 flex min-h-[232px] flex-col justify-end pb-7">
          <p className="text-[18px] text-[var(--sb-gold)] min-[390px]:text-[20px]">
            Menu <ChevronIcon direction="right" size={18} />{" "}
            <span className="text-[var(--sb-red-bright)]">
              {category.label}
            </span>
          </p>
          <h1 className="editorial-title mt-4 break-words text-[34px] leading-[0.95] tracking-[0.07em] text-white min-[360px]:text-[38px] min-[390px]:text-[42px] min-[390px]:leading-none min-[390px]:tracking-[0.1em]">
            {category.label}
          </h1>
          <p className="mt-5 max-w-[350px] text-[15px] leading-6 text-[var(--sb-gold)] min-[390px]:text-[17px] min-[390px]:leading-7">
            {isDrinksCategory
              ? "Order zero-proof and tea online, or reserve rare sake, cocktails, and Liquid Omakase pairings for the dining room."
              : "Hand-pressed perfection. The purest form of sushi, crafted with balance and precision."}
          </p>
        </div>
      </section>

      <MobileCategoryPills
        activeCategory={category.id}
        categories={categories}
        onSelectCategory={onSelectCategory}
      />

      <div className="mt-5 h-px bg-[var(--sb-border)]" />

      {isEmptyDrinks ? (
        <MobileDrinksEmptyState />
      ) : (
        <>
          <div className="mt-4 grid gap-3">
            {displayItems.slice(0, 8).map((item, index) => (
              <MobileMenuListCard
                badge={
                  index === 0
                    ? isDrinksCategory
                      ? "Featured"
                      : "Hot"
                    : index === 1
                      ? isDrinksCategory
                        ? "Pairing"
                        : "Popular"
                      : item.tags.includes("chef-special")
                        ? "Chef's Special"
                        : undefined
                }
                eagerImage={index < 2}
                item={item}
                key={item.id}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>

          <button
            className="mt-5 grid w-full grid-cols-[46px_1fr_auto] items-center gap-4 rounded-[18px] border border-[var(--sb-border)] bg-black/54 p-4 text-left"
            onClick={() => onQueryChange(category.label)}
            type="button"
          >
            <AssetIcon size={38} src={icons.flower} />
            <span>
              <span className="editorial-title block text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
                {category.label} Experience
              </span>
              <span className="mt-1 block text-[14px] leading-5 text-white/68">
                {isDrinksCategory
                  ? "Choose delivery-safe drinks now, or reserve a guided pairing around sushi, sake, and cocktails."
                  : "Savor each piece fresh, balanced, and unforgettable."}
              </span>
            </span>
            <span className="text-[var(--sb-gold)]" aria-hidden="true">
              <ChevronIcon direction="right" size={18} />
            </span>
          </button>
        </>
      )}
    </>
  );
}

function MobileDrinksEmptyState() {
  const pairings = [
    "Sake flight",
    "Tea service",
    "Zero-proof pairing",
  ] as const;

  return (
    <section className="mt-4 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(0,0,0,0.72),rgba(99,12,10,0.34)_52%,rgba(0,0,0,0.86))] p-5">
      <p className="text-[13px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
        Beverage Pairings
      </p>
      <h2 className="editorial-title mt-3 text-[28px] uppercase leading-none tracking-[0.1em] text-white">
        Guided by the table
      </h2>
      <p className="mt-3 text-[14px] leading-6 text-white/66">
        The drinks selection is matched to the order in person so each pour
        follows the fish, rice temperature, and pacing of your meal.
      </p>
      <div className="mt-5 grid gap-2">
        {pairings.map((pairing) => (
          <div
            className="grid grid-cols-[34px_1fr] items-center rounded-[13px] border border-white/12 bg-black/30 px-3 py-3"
            key={pairing}
          >
            <AssetIcon
              size={25}
              src="/assets/editorial/sake-vase-set-black-gold-floral.webp"
            />
            <span className="text-[13px] uppercase tracking-[0.08em] text-white/76">
              {pairing}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          className="red-glow-button grid h-12 place-items-center rounded-[12px] text-[11px] uppercase tracking-[0.08em]"
          href={liquidOmakaseReservationHref}
        >
          Reserve
        </Link>
        <Link
          className="grid h-12 place-items-center rounded-[12px] border border-[var(--sb-border)] text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          href="/support"
        >
          Concierge
        </Link>
      </div>
    </section>
  );
}

function MobileSearchResults({
  filteredItems,
  query,
  onAddToCart,
  onClearFilters,
  onQueryChange,
  onViewDetails,
}: {
  filteredItems: MenuItem[];
  query: string;
  onAddToCart: (item: MenuItem) => void;
  onClearFilters: () => void;
  onQueryChange: (query: string) => void;
  onViewDetails: (item: MenuItem) => void;
}) {
  return (
    <>
      <div className="mt-7 flex items-center justify-between">
        <h1 className="editorial-title text-[30px] uppercase tracking-[0.08em]">
          Search &amp; Filter
        </h1>
      </div>

      <div className="mt-6">
        <MobileSearchForm query={query} onQueryChange={onQueryChange} />
      </div>

      <div className="mt-7 flex items-center justify-between">
        <h2 className="editorial-title text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
          Recent Searches
        </h2>
        <button
          className="text-[15px] text-[var(--sb-red-bright)]"
          onClick={onClearFilters}
          type="button"
        >
          Clear All
        </button>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {recentMobileSearches.map((search) => (
          <button
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/14 bg-white/[0.045] px-4 py-2 text-[14px] text-white/82"
            key={search}
            onClick={() => onQueryChange(search)}
            type="button"
          >
            {search}
            <ChevronIcon
              className="text-[var(--sb-gold)]"
              direction="right"
              size={14}
            />
          </button>
        ))}
      </div>

      <h2 className="editorial-title mt-5 text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
        Sort By
      </h2>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {["Popular", "Price: Low to High", "Price: High to Low"].map(
          (label, index) => (
            <button
              className={classNames(
                "shrink-0 rounded-[12px] border px-4 py-3 text-[13px] uppercase",
                index === 0
                  ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/44 text-white shadow-[0_0_22px_var(--sb-red-glow)]"
                  : "border-white/14 bg-white/[0.035] text-white/78",
              )}
              key={label}
              onClick={() => onQueryChange(query)}
              type="button"
            >
              {label}
            </button>
          ),
        )}
      </div>

      <section className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-black/44 p-3">
        <div className="mb-3 flex items-center justify-between">
          <p className="editorial-title text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
            {filteredItems.length} results found
          </p>
        </div>
        <div className="grid gap-3">
          {filteredItems.slice(0, 10).map((item, index) => (
            <MobileSearchResultRow
              badge={
                index === 0
                  ? "Premium"
                  : item.tags.includes("hot")
                    ? "Hot"
                    : item.tags.includes("chef-special")
                      ? "Special"
                      : undefined
              }
              eagerImage={index < 2}
              item={item}
              key={item.id}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>
    </>
  );
}
