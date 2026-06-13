"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import { TABLET_OTORO_HERO_IMAGE } from "@/lib/assets";
import { formatMoney } from "@/lib/money";
import type { MenuCategory, MenuItem } from "@/types/menu";

import { tabletNigiriItems } from "./tabletMenuData";
import { TabletCategoryBar, TabletFilterSelect } from "./TabletMenuControls";

interface TabletNigiriCategoryViewProps {
  categories: MenuCategory[];
  onAddToCart: (item: MenuItem) => void;
  onQueryChange: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

const fishOptions = [
  "Fish Type",
  "Tuna",
  "Salmon",
  "Yellowtail",
  "Shellfish",
  "Roe",
];
const dietaryOptions = ["Dietary", "Lean", "Rich", "Shellfish Free"];
const spiceOptions = ["Spicy Level", "Mild", "Hot"];
const sortOptions = ["Sort By", "Price Low", "Price High"];

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
  onQueryChange,
  onSelectCategory,
  onViewDetails,
}: TabletNigiriCategoryViewProps) {
  const [fishType, setFishType] = useState("Fish Type");
  const [dietary, setDietary] = useState("Dietary");
  const [spice, setSpice] = useState("Spicy Level");
  const [sort, setSort] = useState("Sort By");

  const displayedItems = useMemo(
    () =>
      sortNigiriItems(
        tabletNigiriItems.filter(
          (item) =>
            matchesFishType(item, fishType) &&
            matchesDietary(item, dietary) &&
            matchesSpice(item, spice),
        ),
        sort,
      ),
    [dietary, fishType, sort, spice],
  );

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

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-[260px_1fr_1fr_1fr_1fr] min-[1080px]:grid-cols-[310px_1fr_1fr_1fr_1fr] min-[1080px]:gap-4">
        <form
          className="col-span-2 flex h-12 items-center gap-4 rounded-[9px] border border-[var(--sb-border)] bg-black/22 px-5 lg:col-span-1"
          onSubmit={(event) => event.preventDefault()}
        >
          <AssetIcon size={22} src={icons.search} />
          <label className="sr-only" htmlFor="tablet-nigiri-search">
            Search nigiri
          </label>
          <input
            className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-white/58"
            id="tablet-nigiri-search"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search nigiri..."
          />
        </form>
        <TabletFilterSelect
          label="Fish type"
          options={fishOptions}
          value={fishType}
          onChange={setFishType}
        />
        <TabletFilterSelect
          label="Dietary"
          options={dietaryOptions}
          value={dietary}
          onChange={setDietary}
        />
        <TabletFilterSelect
          label="Spicy level"
          options={spiceOptions}
          value={spice}
          onChange={setSpice}
        />
        <TabletFilterSelect
          label="Sort by"
          options={sortOptions}
          value={sort}
          onChange={setSort}
        />
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
              No nigiri matches these filters
            </p>
            <p className="mt-2 text-sm text-white/64">
              Adjust the fish type, dietary preference, or spice level.
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
