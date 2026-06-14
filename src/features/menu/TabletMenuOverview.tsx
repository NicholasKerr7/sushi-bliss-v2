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
  TabletSection,
  TabletSelectButton,
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
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-3">
          <TabletSelectButton label="Dietary" />
          <TabletSelectButton label="Spicy Level" />
        </div>
        <TabletSelectButton label="Sort By" />
      </div>
      <TabletSection title="Chef's Specials" icon={icons.crown}>
        <div className="grid grid-cols-4 gap-3">
          {chefSpecialItems.map((item, index) => (
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
      </TabletSection>
      <TabletSection title="All Menu Items">
        <div className="grid grid-cols-3 gap-3">
          {allTabletMenuItems.map((item, index) => (
            <TabletCompactMenuRow
              eagerImage={index < 3}
              item={item}
              key={item.id}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </TabletSection>
    </>
  );
}
