"use client";

import type { MenuCategory, MenuItem } from "@/types/menu";

import {
  TabletMenuBottomNav,
  TabletMenuHeader,
  TabletMenuStatusBar,
} from "./TabletMenuChrome";
import { TabletMenuOverview } from "./TabletMenuOverview";
import { TabletSearchFilter } from "./TabletSearchFilter";
import { tabletSearchFallbackItems } from "./tabletMenuData";

interface TabletMenuExplorerProps {
  category: string;
  categories: MenuCategory[];
  filteredItems: MenuItem[];
  isFavorite: (itemId: string) => boolean;
  query: string;
  cartItemCount: number;
  onAddToCart: (item: MenuItem) => void;
  onClearFilters: () => void;
  onOpenCart: () => void;
  onQueryChange: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onToggleFavorite: (itemId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

/** Coordinates the tablet menu reference screens without owning their view markup. */
export function TabletMenuExplorer({
  category,
  categories,
  filteredItems,
  isFavorite,
  query,
  cartItemCount,
  onAddToCart,
  onClearFilters,
  onOpenCart,
  onQueryChange,
  onSelectCategory,
  onToggleFavorite,
  onViewDetails,
}: TabletMenuExplorerProps) {
  const hasSearch = query.trim().length > 0;
  const searchResults =
    filteredItems.length > 0 ? filteredItems : tabletSearchFallbackItems;

  return (
    <div className="hidden bg-[#050607] px-[26px] pb-4 pt-3 text-white md:block xl:hidden">
      <TabletMenuStatusBar />
      <TabletMenuHeader
        cartCount={cartItemCount}
        query={query}
        onClearQuery={() => onQueryChange("")}
        onOpenCart={onOpenCart}
        onQueryChange={onQueryChange}
      />
      {hasSearch ? (
        <TabletSearchFilter
          category={category}
          categories={categories}
          isFavorite={isFavorite}
          results={searchResults}
          onAddToCart={onAddToCart}
          onClearFilters={onClearFilters}
          onQueryChange={onQueryChange}
          onSelectCategory={onSelectCategory}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      ) : (
        <TabletMenuOverview
          category={category}
          categories={categories}
          isFavorite={isFavorite}
          onAddToCart={onAddToCart}
          onSelectCategory={onSelectCategory}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      )}
      <TabletMenuBottomNav activeIndex={1} />
    </div>
  );
}
