"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import { TABLET_OTORO_HERO_IMAGE } from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuCategory, MenuItem } from "@/types/menu";

import { tabletNigiriItems } from "./tabletMenuData";
import { TabletCategoryBar, TabletFilterSelect } from "./TabletMenuControls";

interface TabletNigiriCategoryViewProps {
  categories: MenuCategory[];
  onAddToCart: (item: MenuItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

const fishOptions = [
  "Any Fish",
  "Tuna",
  "Salmon",
  "Yellowtail",
  "Shellfish",
  "Roe",
];
const dietaryOptions = ["Any Diet", "Lean", "Rich", "Shellfish Free"];
const spiceOptions = ["Any Heat", "Mild", "Hot"];
const sortOptions = ["Featured", "Price Low", "Price High"];

function matchesNigiriSearch(item: MenuItem, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  return (
    normalizedQuery.length === 0 || item.searchText.includes(normalizedQuery)
  );
}

function matchesFishType(item: MenuItem, fishType: string) {
  const searchText = `${item.name} ${item.description} ${item.ingredients.join(
    " ",
  )}`.toLowerCase();

  if (fishType === "Tuna") return /tuna|toro/.test(searchText);
  if (fishType === "Salmon") return searchText.includes("salmon");
  if (fishType === "Yellowtail") return searchText.includes("yellowtail");
  if (fishType === "Shellfish") return /shrimp|scallop/.test(searchText);
  if (fishType === "Roe") return /roe|ikura/.test(searchText);

  return true;
}

function matchesDietary(item: MenuItem, dietary: string) {
  const searchText = `${item.name} ${item.description} ${item.ingredients.join(
    " ",
  )}`.toLowerCase();

  if (dietary === "Lean") return /lean|hamachi|salmon|ebi/.test(searchText);
  if (dietary === "Rich") return /otoro|toro|uni|roe/.test(searchText);
  if (dietary === "Shellfish Free") return !/shrimp|scallop/.test(searchText);

  return true;
}

function matchesSpice(item: MenuItem, spice: string) {
  if (spice === "Hot") return item.tags.includes("hot");
  if (spice === "Mild") return !item.tags.includes("hot");

  return true;
}

function sortNigiriItems(items: MenuItem[], sort: string) {
  if (sort === "Price Low") {
    return [...items].sort((a, b) => a.priceCents - b.priceCents);
  }

  if (sort === "Price High") {
    return [...items].sort((a, b) => b.priceCents - a.priceCents);
  }

  return items;
}

/** Recreates the tablet nigiri category reference with working local filters. */
export function TabletNigiriCategoryView({
  categories,
  onAddToCart,
  onSelectCategory,
  onViewDetails,
}: TabletNigiriCategoryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [fishType, setFishType] = useState("Any Fish");
  const [dietary, setDietary] = useState("Any Diet");
  const [spice, setSpice] = useState("Any Heat");
  const [sort, setSort] = useState("Featured");

  const displayedItems = useMemo(
    () =>
      sortNigiriItems(
        tabletNigiriItems.filter(
          (item) =>
            matchesNigiriSearch(item, searchQuery) &&
            matchesFishType(item, fishType) &&
            matchesDietary(item, dietary) &&
            matchesSpice(item, spice),
        ),
        sort,
      ),
    [dietary, fishType, searchQuery, sort, spice],
  );

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <section className="relative mt-[18px] min-h-[280px] overflow-hidden rounded-[14px] border border-white/16 min-[1080px]:min-h-[342px]">
        <Image
          alt=""
          className="object-cover object-[70%_46%]"
          fill
          priority
          sizes="1034px"
          src={TABLET_OTORO_HERO_IMAGE}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.78)_43%,rgba(0,0,0,0.16)_100%)]" />
        <div className="relative z-10 flex min-h-[280px] flex-col justify-center px-[64px] min-[1080px]:min-h-[342px] min-[1080px]:px-[86px]">
          <p className="text-[16px] uppercase tracking-[0.16em] text-[var(--sb-gold)] min-[1080px]:text-[18px]">
            Menu <ChevronIcon direction="right" size={18} /> Nigiri
          </p>
          <h1 className="editorial-title mt-4 text-[64px] uppercase leading-[0.9] tracking-[0.18em] text-white min-[1080px]:mt-5 min-[1080px]:text-[86px]">
            Nigiri
          </h1>
          <p className="mt-4 max-w-[420px] text-[18px] leading-7 text-[var(--sb-gold)] min-[1080px]:mt-5 min-[1080px]:text-[20px] min-[1080px]:leading-8">
            Experience the pure art of nigiri. Hand-pressed perfection featuring
            the finest fish and seasonal ingredients.
          </p>
        </div>
      </section>

      <TabletCategoryBar
        category="nigiri"
        categories={categories}
        variant="pills"
        onSelectCategory={onSelectCategory}
      />

      <div className="mt-5 rounded-[18px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.34)]">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-[minmax(252px,1.28fr)_repeat(4,minmax(0,1fr))] min-[1080px]:gap-4">
          <form
            className={classNames(
              "relative col-span-2 flex h-[58px] min-w-0 items-center gap-3 rounded-[13px] border px-4 transition focus-within:border-[var(--sb-gold)] focus-within:ring-2 focus-within:ring-[var(--sb-gold)]/25 lg:col-span-1",
              searchQuery
                ? "border-[var(--sb-gold)] bg-white/[0.06] shadow-[0_0_24px_rgb(215_168_79_/_0.12)]"
                : "border-white/14 bg-black/28 hover:border-[var(--sb-gold)]/34 hover:bg-white/[0.055]",
            )}
            onSubmit={(event) => event.preventDefault()}
          >
            <AssetIcon className="mt-4" size={22} src={icons.search} />
            <label className="sr-only" htmlFor="tablet-nigiri-search">
              Search nigiri
            </label>
            <span className="pointer-events-none absolute left-[54px] top-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]/72">
              Search
            </span>
            <input
              className="h-full min-w-0 flex-1 bg-transparent pt-4 text-[15px] text-white outline-none placeholder:text-white/44"
              id="tablet-nigiri-search"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Otoro, uni, salmon..."
              value={searchQuery}
            />
            {searchQuery ? (
              <button
                aria-label="Clear nigiri search"
                className="rounded-full border border-white/12 bg-black/34 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/42 hover:bg-white/[0.06]"
                onClick={clearSearch}
                type="button"
              >
                Clear
              </button>
            ) : null}
          </form>
          <TabletFilterSelect
            label="Fish"
            options={fishOptions}
            value={fishType}
            onChange={setFishType}
          />
          <TabletFilterSelect
            label="Diet"
            options={dietaryOptions}
            value={dietary}
            onChange={setDietary}
          />
          <TabletFilterSelect
            label="Heat"
            options={spiceOptions}
            value={spice}
            onChange={setSpice}
          />
          <TabletFilterSelect
            label="Sort"
            options={sortOptions}
            value={sort}
            onChange={setSort}
          />
        </div>
      </div>

      <section className="mt-4 rounded-[14px] border border-white/14 bg-white/[0.025] p-4">
        {displayedItems.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {displayedItems.map((item, index) => (
              <TabletNigiriCard
                badge={index === 0 ? "Chef's Pick" : undefined}
                item={item}
                key={item.id}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[12px] border border-[var(--sb-border)] bg-black/34 p-8 text-center">
            <p className="text-lg uppercase text-[var(--sb-gold)]">
              No nigiri matches these refinements
            </p>
            <p className="mt-2 text-sm text-white/64">
              Adjust the search, fish type, diet, or heat level.
            </p>
          </div>
        )}
      </section>

      <div className="mt-4 grid grid-cols-4 rounded-[14px] border border-white/14 bg-white/[0.035] p-4">
        <TabletBenefit icon={icons.flower} title="Premium Ingredients">
          Sourced Daily
        </TabletBenefit>
        <TabletBenefit icon={icons.crown} title="Expert Craftsmanship">
          By Master Chefs
        </TabletBenefit>
        <TabletBenefit icon={icons.chef} title="Authentic Experience">
          Traditional. Refined.
        </TabletBenefit>
        <TabletBenefit icon={icons.bag} title="Allergen Info">
          Available Upon Request
        </TabletBenefit>
      </div>
    </>
  );
}

function TabletNigiriCard({
  badge,
  item,
  onAddToCart,
  onViewDetails,
}: {
  badge?: string;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onViewDetails: (item: MenuItem) => void;
}) {
  return (
    <article className="relative overflow-hidden rounded-[10px] border border-[var(--sb-border)] bg-black/42">
      {badge ? (
        <span className="absolute left-2 top-2 z-10 rounded-[8px] bg-[var(--sb-red)] px-3 py-1 text-[11px] uppercase text-white">
          {badge}
        </span>
      ) : null}
      <button
        className="block w-full text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <div className="relative h-[98px] min-[1080px]:h-[128px]">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="320px"
            src={item.image.publicUrl}
          />
        </div>
        <div className="p-3 min-[1080px]:p-4">
          <h2 className="text-[19px] text-white">{item.name}</h2>
          <p className="mt-2 text-sm text-white/68">{item.description}</p>
          <p className="mt-4 text-[22px] text-[var(--sb-gold)]">
            {formatMoney(item.priceCents)}
          </p>
        </div>
      </button>
      <button
        aria-label={`Add ${item.name} to cart`}
        className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-border-strong)] bg-black/55 text-[var(--sb-gold)]"
        onClick={() => onAddToCart(item)}
        type="button"
      >
        <AssetIcon size={24} src={icons.plus} />
      </button>
    </article>
  );
}

function TabletBenefit({
  children,
  icon,
  title,
}: {
  children: string;
  icon?: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4 border-r border-white/10 px-4 last:border-r-0">
      <AssetIcon size={36} src={icon} />
      <p>
        <span className="block text-sm uppercase text-white/78">{title}</span>
        <span className="mt-1 block text-sm text-white/64">{children}</span>
      </p>
    </div>
  );
}
