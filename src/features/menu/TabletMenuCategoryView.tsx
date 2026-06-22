"use client";

import { useMemo, useState } from "react";

import { getTabletPresentationImage } from "@/lib/assets";
import type { MenuCategory, MenuItem } from "@/types/menu";

import { TabletCategoryBenefits } from "./TabletCategoryBenefits";
import { TabletCategoryCard } from "./TabletCategoryCard";
import {
  getTabletCategoryContent,
  matchesTabletCategorySearch,
  matchesTabletDietary,
  matchesTabletPrimaryFilter,
  matchesTabletSpice,
  sortTabletCategoryItems,
} from "./TabletMenuCategoryData";
import { TabletMenuCategoryFilters } from "./TabletMenuCategoryFilters";
import { TabletMenuCategoryHero } from "./TabletMenuCategoryHero";
import { TabletCategoryBar } from "./TabletMenuControls";
import { TabletDrinksEmptyState } from "./TabletDrinksEmptyState";

interface TabletMenuCategoryViewProps {
  category: string;
  categories: MenuCategory[];
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

/** Renders a consistent polished tablet category surface for every menu category. */
export function TabletMenuCategoryView({
  category,
  categories,
  items,
  onAddToCart,
  onSelectCategory,
  onViewDetails,
}: TabletMenuCategoryViewProps) {
  const content = getTabletCategoryContent(category, categories);
  const [searchQuery, setSearchQuery] = useState("");
  const [primaryFilter, setPrimaryFilter] = useState(
    content.filterOptions[0] || "Any Type",
  );
  const [dietary, setDietary] = useState("Any Diet");
  const [spice, setSpice] = useState("Any Heat");
  const [sort, setSort] = useState("Featured");
  const isDrinksCategory = category === "drinks";
  const isEmptyDrinksCategory = isDrinksCategory && items.length === 0;

  const displayedItems = useMemo(
    () =>
      sortTabletCategoryItems(
        items.filter(
          (item) =>
            matchesTabletCategorySearch(item, searchQuery) &&
            matchesTabletPrimaryFilter(item, primaryFilter) &&
            matchesTabletDietary(item, dietary) &&
            matchesTabletSpice(item, spice),
        ),
        sort,
      ),
    [dietary, items, primaryFilter, searchQuery, sort, spice],
  );

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <TabletMenuCategoryHero content={content} />

      <TabletCategoryBar
        category={category}
        categories={categories}
        variant="pills"
        onSelectCategory={onSelectCategory}
      />

      <TabletMenuCategoryFilters
        content={content}
        dietary={dietary}
        isDrinksCategory={isDrinksCategory}
        primaryFilter={primaryFilter}
        searchQuery={searchQuery}
        sort={sort}
        spice={spice}
        onClearSearch={clearSearch}
        onDietaryChange={setDietary}
        onPrimaryFilterChange={setPrimaryFilter}
        onSearchChange={setSearchQuery}
        onSortChange={setSort}
        onSpiceChange={setSpice}
      />

      <section className="mt-4 rounded-[14px] border border-white/14 bg-white/[0.025] p-4">
        {displayedItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {displayedItems.map((item, index) => (
              <TabletCategoryCard
                badge={index === 0 ? "Chef's Pick" : undefined}
                eagerImage={
                  index < 6 ||
                  getTabletPresentationImage(item) === content.heroImage
                }
                item={item}
                key={item.id}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : isEmptyDrinksCategory ? (
          <TabletDrinksEmptyState />
        ) : (
          <div className="rounded-[12px] border border-[var(--sb-border)] bg-black/34 p-8 text-center">
            <p className="text-lg uppercase text-[var(--sb-gold)]">
              No {content.title.toLowerCase()} matches these refinements
            </p>
            <p className="mt-2 text-sm text-white/64">
              {isDrinksCategory
                ? `Adjust the search, ${content.filterLabel.toLowerCase()}, or sort order.`
                : `Adjust the search, ${content.filterLabel.toLowerCase()}, diet, or heat level.`}
            </p>
          </div>
        )}
      </section>

      <TabletCategoryBenefits isDrinksCategory={isDrinksCategory} />
    </>
  );
}
