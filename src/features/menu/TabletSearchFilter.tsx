"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { menuItemById } from "@/data/menu";
import { featuredAssets, icons } from "@/features/home/homeDashboardData";
import type { MenuCategory, MenuItem } from "@/types/menu";

import { recentTabletSearches } from "./tabletMenuData";
import { TabletMenuCard } from "./TabletMenuCards";
import {
  TabletCategoryTiles,
  TabletFilterSelect,
  TabletSegmentGroup,
} from "./TabletMenuControls";

interface TabletSearchFilterProps {
  category: string;
  categories: MenuCategory[];
  isFavorite: (itemId: string) => boolean;
  results: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onQueryChange: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onToggleFavorite: (itemId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

export function TabletSearchFilter({
  category,
  categories,
  isFavorite,
  results,
  onAddToCart,
  onQueryChange,
  onSelectCategory,
  onToggleFavorite,
  onViewDetails,
}: TabletSearchFilterProps) {
  const [dietary, setDietary] = useState("Any");
  const [spice, setSpice] = useState("Any");
  const [price, setPrice] = useState("Any");
  const [sort, setSort] = useState("Most Relevant");
  const refinedResults = useMemo(
    () =>
      sortSearchResults(
        results.filter(
          (item) =>
            matchesSearchDietary(item, dietary) &&
            matchesSearchSpice(item, spice) &&
            matchesSearchPrice(item, price),
        ),
        sort,
      ),
    [dietary, price, results, sort, spice],
  );
  const resetFilters = () => {
    setDietary("Any");
    setSpice("Any");
    setPrice("Any");
    setSort("Most Relevant");
  };

  return (
    <section className="relative mt-[18px] overflow-hidden rounded-[14px] border border-white/16 px-12 pb-9 pt-9">
      <Image
        alt=""
        className="object-cover object-[75%_18%] opacity-70"
        fill
        loading="eager"
        priority
        sizes="1034px"
        src={
          menuItemById.get("spicy-tuna-roll")?.image.publicUrl ||
          featuredAssets.heroSushi.publicUrl
        }
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.78)_45%,rgba(0,0,0,0.28)_100%),linear-gradient(180deg,rgba(0,0,0,0.38)_0%,#050607_33%,#050607_100%)]" />
      <div className="relative z-10">
        <h1 className="editorial-title text-[48px] uppercase tracking-[0.16em] text-white">
          Search <span className="text-[var(--sb-red-bright)]">& Filter</span>
        </h1>
        <p className="mt-3 text-[20px] text-[var(--sb-gold)]">
          Find your perfect dish.
        </p>
        <p className="mt-12 text-sm uppercase text-white/78">Recent Searches</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {recentTabletSearches.map((search) => (
            <button
              className="flex h-10 items-center gap-4 rounded-[8px] border border-[var(--sb-border)] bg-black/34 px-4 text-sm text-white"
              key={search}
              onClick={() => onQueryChange(search)}
              type="button"
            >
              {search}
              <span className="text-[var(--sb-gold)]" aria-hidden="true">
                x
              </span>
            </button>
          ))}
        </div>
        <p className="mt-9 text-sm uppercase text-white/78">
          Browse by Category
        </p>
        <TabletCategoryTiles
          category={category}
          categories={categories}
          onSelectCategory={onSelectCategory}
        />
        <div className="mt-8 rounded-[12px] border border-white/14 bg-white/[0.035] p-5">
          <h2 className="text-sm uppercase text-[var(--sb-gold)]">
            Refine Your Search
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-x-10 gap-y-5">
            <TabletSegmentGroup
              label="Dietary"
              options={["Any", "Gluten Free", "Dairy Free", "Vegan", "Keto"]}
              value={dietary}
              onChange={setDietary}
            />
            <TabletSegmentGroup
              label="Spice Level"
              options={["Any", "Mild", "Medium", "Hot", "Extra Hot"]}
              value={spice}
              onChange={setSpice}
            />
            <TabletFilterSelect
              label="Sort"
              options={["Most Relevant", "Price Low", "Price High"]}
              value={sort}
              onChange={setSort}
            />
            <TabletSegmentGroup
              label="Price Range"
              options={["Any", "Under $10", "$10 - $20", "Over $20"]}
              value={price}
              onChange={setPrice}
            />
          </div>
          <div className="mt-5 flex justify-end">
            <button
              className="text-sm uppercase text-[var(--sb-gold)]"
              onClick={resetFilters}
              type="button"
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="mt-7 flex items-center justify-between">
          <p className="text-sm uppercase text-white/78">
            {refinedResults.length} results found
          </p>
          <button
            className="text-sm text-[var(--sb-red-bright)]"
            onClick={() => onQueryChange("")}
            type="button"
          >
            Clear Search
          </button>
        </div>
        {refinedResults.length > 0 ? (
          <div className="mt-4 grid grid-cols-4 gap-4">
            {refinedResults.slice(0, 4).map((item, index) => (
              <TabletMenuCard
                badge={
                  index === 1
                    ? "Signature"
                    : item.tags.includes("chef-special")
                      ? "Special"
                      : "Hot"
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
          <div className="mt-4 rounded-[12px] border border-[var(--sb-border)] bg-black/34 p-8 text-center">
            <p className="text-lg uppercase text-[var(--sb-gold)]">
              No dishes match those filters
            </p>
            <p className="mt-2 text-sm text-white/64">
              Reset the dietary, heat, price, or sort controls.
            </p>
          </div>
        )}
        <Link
          className="mt-6 grid grid-cols-[80px_1fr_auto] items-center rounded-[12px] border border-white/14 bg-white/[0.035] p-4"
          href="/support"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--sb-border)]">
            <AssetIcon size={40} src={icons.flower} />
          </span>
          <span>
            <span className="block text-base uppercase text-[var(--sb-gold)]">
              Can&apos;t find what you&apos;re looking for?
            </span>
            <span className="mt-1 block text-sm text-white/72">
              Our chefs are here to create something special just for you.
            </span>
          </span>
          <span className="rounded-[9px] border border-[var(--sb-border)] px-6 py-3 text-sm uppercase text-[var(--sb-gold)]">
            Request a Custom Dish <ChevronIcon direction="right" size={18} />
          </span>
        </Link>
      </div>
    </section>
  );
}

function getSearchFilterText(item: MenuItem) {
  return `${item.name} ${item.description} ${item.ingredients.join(" ")} ${item.tags.join(" ")}`.toLowerCase();
}

function matchesSearchDietary(item: MenuItem, dietary: string) {
  if (dietary === "Any") return true;

  const searchText = getSearchFilterText(item);

  if (dietary === "Gluten Free")
    return !/tempura|soy|eel sauce/.test(searchText);
  if (dietary === "Dairy Free") return !/cream cheese|mayo/.test(searchText);
  if (dietary === "Vegan") {
    return (
      item.category === "vegetarian" ||
      /tofu|avocado|cucumber|shiitake/.test(searchText)
    );
  }
  if (dietary === "Keto") {
    return (
      /sashimi|tuna|salmon|hamachi|scallop/.test(searchText) &&
      !/roll|rice/.test(searchText)
    );
  }

  return true;
}

function matchesSearchSpice(item: MenuItem, spice: string) {
  if (spice === "Any") return true;
  if (spice === "Mild") return !item.tags.includes("hot");
  if (spice === "Medium") return /spicy|mayo/.test(getSearchFilterText(item));
  if (spice === "Hot") return item.tags.includes("hot");
  if (spice === "Extra Hot")
    return (
      item.tags.includes("hot") && /spicy|fire/.test(getSearchFilterText(item))
    );

  return true;
}

function matchesSearchPrice(item: MenuItem, price: string) {
  if (price === "Under $10") return item.priceCents < 1000;
  if (price === "$10 - $20")
    return item.priceCents >= 1000 && item.priceCents <= 2000;
  if (price === "Over $20") return item.priceCents > 2000;

  return true;
}

function sortSearchResults(items: MenuItem[], sort: string) {
  if (sort === "Price Low") {
    return [...items].sort((a, b) => a.priceCents - b.priceCents);
  }

  if (sort === "Price High") {
    return [...items].sort((a, b) => b.priceCents - a.priceCents);
  }

  return items;
}
