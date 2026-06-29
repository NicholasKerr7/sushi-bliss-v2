"use client";

import type { MenuCategory, MenuItem } from "@/types/menu";

import { TabletMenuBottomNav, TabletMenuHeader } from "./TabletMenuChrome";
import { TabletMenuCategoryView } from "./TabletMenuCategoryView";
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
  onOpenCart: () => void;
  onQueryChange: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onToggleFavorite: (itemId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

/** Coordinates tablet menu states without owning their view markup. */
export function TabletMenuExplorer({
  category,
  categories,
  filteredItems,
  isFavorite,
  query,
  cartItemCount,
  onAddToCart,
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
    <div className="hidden h-dvh min-h-dvh flex-col overflow-hidden bg-[#050607] px-[26px] pb-4 pt-3 text-white md:flex xl:hidden">
      <TabletMenuHeader
        cartCount={cartItemCount}
        query={query}
        onClearQuery={() => onQueryChange("")}
        onOpenCart={onOpenCart}
        onQueryChange={onQueryChange}
      />
      <main className="smooth-scroll-area min-h-0 flex-1 overflow-x-hidden overflow-y-auto pb-3">
        {hasSearch ? (
          <TabletSearchFilter
            category={category}
            categories={categories}
            isFavorite={isFavorite}
            results={searchResults}
            onAddToCart={onAddToCart}
            onQueryChange={onQueryChange}
            onSelectCategory={onSelectCategory}
            onToggleFavorite={onToggleFavorite}
            onViewDetails={onViewDetails}
          />
        ) : category !== "all" ? (
          <TabletMenuCategoryView
            category={category}
            categories={categories}
            items={filteredItems}
            key={category}
            onAddToCart={onAddToCart}
            onSelectCategory={onSelectCategory}
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
      </main>
      <TabletMenuBottomNav activeIndex={1} />
    </div>
  );
}
