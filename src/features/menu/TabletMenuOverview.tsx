"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { CarouselIndicator } from "@/components/ui/CarouselIndicator";
import { featuredAssets, icons } from "@/features/home/visualHomeData";
import { formatMoney } from "@/lib/money";
import type { MenuCategory, MenuItem } from "@/types/menu";

import {
  allTabletMenuItems,
  chefSpecialItems,
  getMenuItemsById,
  menuHeroItem,
} from "./tabletMenuData";
import { TabletCompactMenuRow, TabletMenuCard } from "./TabletMenuCards";
import {
  TabletCategoryBar,
  TabletFilterSelect,
  TabletSection,
} from "./TabletMenuControls";

interface TabletMenuOverviewProps {
  category: string;
  categories: MenuCategory[];
  isFavorite: (itemId: string) => boolean;
  onAddToCart: (item: MenuItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onToggleFavorite: (itemId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

const tabletOverviewDietaryOptions = [
  "Dietary",
  "Lean",
  "Rich",
  "Shellfish Free",
  "Vegetarian",
] as const;
const tabletOverviewSpiceOptions = ["Spicy Level", "Mild", "Hot"] as const;
const tabletOverviewSortOptions = [
  "Sort By",
  "Price Low",
  "Price High",
] as const;

function getTabletOverviewSearchText(item: MenuItem) {
  return `${item.name} ${item.description} ${item.ingredients.join(" ")} ${item.tags.join(" ")}`.toLowerCase();
}

function matchesTabletOverviewDietary(item: MenuItem, filter: string) {
  if (filter === tabletOverviewDietaryOptions[0]) return true;

  const searchText = getTabletOverviewSearchText(item);

  if (filter === "Lean") return /lean|hamachi|salmon|ebi/.test(searchText);
  if (filter === "Rich") return /otoro|toro|uni|roe|wagyu/.test(searchText);
  if (filter === "Shellfish Free")
    return !/shrimp|scallop|ebi/.test(searchText);
  if (filter === "Vegetarian") return item.category === "vegetarian";

  return true;
}

function matchesTabletOverviewSpice(item: MenuItem, filter: string) {
  if (filter === "Hot") return item.tags.includes("hot");
  if (filter === "Mild") return !item.tags.includes("hot");

  return true;
}

function sortTabletOverviewItems(items: MenuItem[], sort: string) {
  if (sort === "Price Low") {
    return [...items].sort((a, b) => a.priceCents - b.priceCents);
  }

  if (sort === "Price High") {
    return [...items].sort((a, b) => b.priceCents - a.priceCents);
  }

  return items;
}

export function TabletMenuOverview({
  category,
  categories,
  isFavorite,
  onAddToCart,
  onSelectCategory,
  onToggleFavorite,
  onViewDetails,
}: TabletMenuOverviewProps) {
  const recommendationSlides = useMemo(
    () =>
      [
        menuHeroItem,
        ...getMenuItemsById([
          "spicy-tuna-roll",
          "salmon-sashimi",
          "dragon-roll",
          "truffle-wagyu-nigiri",
        ]),
      ].filter(
        (item, index, allItems) =>
          allItems.findIndex((match) => match.id === item.id) === index,
      ),
    [],
  );
  const [activeRecommendationIndex, setActiveRecommendationIndex] = useState(0);
  const [dietaryFilter, setDietaryFilter] = useState<string>(
    tabletOverviewDietaryOptions[0],
  );
  const [spiceFilter, setSpiceFilter] = useState<string>(
    tabletOverviewSpiceOptions[0],
  );
  const [sortFilter, setSortFilter] = useState<string>(
    tabletOverviewSortOptions[0],
  );
  const activeRecommendation =
    recommendationSlides[activeRecommendationIndex] || menuHeroItem;
  const recommendationNote =
    activeRecommendation.id === menuHeroItem.id
      ? "Indulge in the melt-in-your-mouth richness of premium otoro."
      : activeRecommendation.chefNote;
  const selectRecommendation = (index: number) => {
    const nextIndex =
      (index + recommendationSlides.length) % recommendationSlides.length;

    setActiveRecommendationIndex(nextIndex);
  };
  const applyOverviewFilters = (items: MenuItem[]) =>
    sortTabletOverviewItems(
      items.filter(
        (item) =>
          matchesTabletOverviewDietary(item, dietaryFilter) &&
          matchesTabletOverviewSpice(item, spiceFilter),
      ),
      sortFilter,
    );
  const visibleChefSpecialItems = applyOverviewFilters(chefSpecialItems);
  const visibleOverviewItems = applyOverviewFilters(allTabletMenuItems);
  const resetOverviewFilters = () => {
    setDietaryFilter(tabletOverviewDietaryOptions[0]);
    setSpiceFilter(tabletOverviewSpiceOptions[0]);
    setSortFilter(tabletOverviewSortOptions[0]);
  };

  return (
    <>
      <section className="relative mt-[18px] min-h-[342px] overflow-hidden rounded-[14px] border border-white/16">
        <Image
          alt={activeRecommendation.image.alt || activeRecommendation.name}
          className="object-cover object-[72%_45%]"
          fill
          loading="eager"
          priority
          sizes="1034px"
          src={
            activeRecommendation.id === menuHeroItem.id
              ? featuredAssets.heroSushi.publicUrl
              : activeRecommendation.image.publicUrl
          }
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.82)_39%,rgba(0,0,0,0.18)_74%,rgba(0,0,0,0.58)_100%)]" />
        <button
          aria-label="Previous recommendation"
          className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[var(--sb-border)] text-[var(--sb-gold)]"
          onClick={() => selectRecommendation(activeRecommendationIndex - 1)}
          type="button"
        >
          <ChevronIcon direction="left" size={18} />
        </button>
        <button
          aria-label="Next recommendation"
          className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[var(--sb-border)] text-[var(--sb-gold)]"
          onClick={() => selectRecommendation(activeRecommendationIndex + 1)}
          type="button"
        >
          <ChevronIcon direction="right" size={18} />
        </button>
        <div className="relative z-10 flex min-h-[342px] flex-col justify-center px-[104px]">
          <p className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
            Chef&apos;s Recommendation
          </p>
          <h1 className="editorial-title mt-3 text-[40px] uppercase tracking-[0.16em] text-white">
            {activeRecommendation.name}
          </h1>
          <p className="mt-2 text-[22px] text-[var(--sb-gold)]">
            {activeRecommendation.description}
          </p>
          <p className="mt-4 max-w-[270px] text-[15px] leading-6 text-white/72">
            {recommendationNote}
          </p>
          <p className="mt-5 text-[22px] text-[var(--sb-gold)]">
            {formatMoney(activeRecommendation.priceCents)}
          </p>
          <button
            className="red-glow-button mt-4 flex h-12 w-[205px] items-center justify-center gap-8 rounded-[8px] uppercase tracking-[0.08em] text-white"
            onClick={() => onAddToCart(activeRecommendation)}
            type="button"
          >
            Add to Order
            <span aria-hidden="true">+</span>
          </button>
          <CarouselIndicator
            activeIndex={activeRecommendationIndex}
            ariaLabel="Chef recommendation slides"
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
            count={recommendationSlides.length}
            onSelect={setActiveRecommendationIndex}
          />
        </div>
      </section>
      <TabletCategoryBar
        category={category}
        categories={categories}
        onSelectCategory={onSelectCategory}
      />
      <div className="mt-3 grid grid-cols-3 gap-3">
        <TabletFilterSelect
          label="Diet"
          options={tabletOverviewDietaryOptions}
          value={dietaryFilter}
          onChange={setDietaryFilter}
        />
        <TabletFilterSelect
          label="Heat"
          options={tabletOverviewSpiceOptions}
          value={spiceFilter}
          onChange={setSpiceFilter}
        />
        <TabletFilterSelect
          label="Sort"
          options={tabletOverviewSortOptions}
          value={sortFilter}
          onChange={setSortFilter}
        />
      </div>
      <TabletSection title="Chef's Specials" icon={icons.crown}>
        {visibleChefSpecialItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {visibleChefSpecialItems.slice(0, 4).map((item, index) => (
              <TabletMenuCard
                badge={
                  index === 0
                    ? "Chef's Special"
                    : index === 1
                      ? "Hot"
                      : index === 2
                        ? "Signature"
                        : "Premium"
                }
                eagerImage={index < 4}
                isFavorite={isFavorite(item.id)}
                item={item}
                key={item.id}
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <TabletOverviewEmptyState onReset={resetOverviewFilters} />
        )}
      </TabletSection>
      <TabletSection title="All Menu Items">
        {visibleOverviewItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {visibleOverviewItems.map((item, index) => (
              <TabletCompactMenuRow
                eagerImage={index < 3}
                item={item}
                key={item.id}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <TabletOverviewEmptyState onReset={resetOverviewFilters} />
        )}
      </TabletSection>
    </>
  );
}

function TabletOverviewEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-[12px] border border-[var(--sb-border)] bg-black/34 p-6 text-center">
      <p className="text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
        No dishes match these filters
      </p>
      <p className="mt-2 text-[13px] text-white/62">
        Reset the overview filters to return to the full menu.
      </p>
      <button
        className="mt-4 rounded-[9px] border border-[var(--sb-border)] px-5 py-3 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onReset}
        type="button"
      >
        Reset filters
      </button>
    </div>
  );
}
