"use client";

import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { useCart } from "@/hooks/useCart";
import { classNames } from "@/lib/classNames";
import type { MenuItem } from "@/types/menu";

import { DesktopCartPanel } from "./DesktopCartPanel";
import type {
  DesktopMenuAddHandler,
  DesktopMenuViewHandler,
} from "./DesktopMenuTypes";
import {
  desktopCategoryButtons,
  desktopDietaryOptions,
  desktopDrinkOptions,
  desktopFishOptions,
  desktopNigiriDisplayNames,
  desktopSortOptions,
  desktopSpiceOptions,
  matchesDesktopDietaryFilter,
  matchesDesktopFishFilter,
  matchesDesktopSpiceFilter,
  sortDesktopMenuItems,
} from "./DesktopMenuSurfaceData";
import {
  DesktopCategoryBenefitStrip,
  DesktopCategoryEmptyState,
  DesktopCompactMenuRow,
  DesktopDrinksEmptyState,
  DesktopFeatureMenuCard,
  DesktopMenuEditorialRail,
  DesktopMenuHero,
  DesktopMenuSection,
} from "./DesktopMenuSurfaceSections";
import {
  chefSpecialItems,
  desktopNigiriItems,
} from "./tabletMenuData";
import { TabletFilterSelect } from "./TabletMenuControls";

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
