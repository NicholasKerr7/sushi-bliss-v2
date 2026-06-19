"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import {
  getTabletPresentationImage,
  TABLET_OTORO_HERO_IMAGE,
} from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuCategory, MenuItem } from "@/types/menu";

import { TabletCategoryBar, TabletFilterSelect } from "./TabletMenuControls";

interface TabletMenuCategoryViewProps {
  category: string;
  categories: MenuCategory[];
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

const dietaryOptions = ["Any Diet", "Lean", "Rich", "Shellfish Free"];
const spiceOptions = ["Any Heat", "Mild", "Hot"];
const sortOptions = ["Featured", "Price Low", "Price High"];

const categoryContent: Record<
  string,
  {
    description: string;
    filterLabel: string;
    filterOptions: string[];
    heroImage: string;
    heroPosition: string;
    placeholder: string;
    title: string;
  }
> = {
  "chef-specials": {
    description:
      "Rare cuts, premium finishes, and chef-driven signatures prepared with ceremony.",
    filterLabel: "Feature",
    filterOptions: ["Any Feature", "Toro", "Wagyu", "Truffle", "Caviar"],
    heroImage: "/assets/editorial/luxury-seafood-and-wagyu-selection.webp",
    heroPosition: "object-[68%_46%]",
    placeholder: "Wagyu, truffle, toro...",
    title: "Chef Specials",
  },
  drinks: {
    description:
      "Liquid omakase: sake, cocktails, tea, and zero-proof pairings selected around the season's sushi menu.",
    filterLabel: "Drink Type",
    filterOptions: [
      "Any Drink",
      "Sake",
      "Flights",
      "Cocktails",
      "Zero Proof",
      "Tea",
      "Beer & Wine",
    ],
    heroImage: "/assets/drinks/akai-tsuki-red-moon-cocktail.webp",
    heroPosition: "object-[58%_50%]",
    placeholder: "Sake, tea, yuzu...",
    title: "Drinks",
  },
  nigiri: {
    description:
      "Experience the pure art of nigiri. Hand-pressed perfection featuring the finest fish and seasonal ingredients.",
    filterLabel: "Fish",
    filterOptions: [
      "Any Fish",
      "Tuna",
      "Salmon",
      "Yellowtail",
      "Shellfish",
      "Roe",
    ],
    heroImage: TABLET_OTORO_HERO_IMAGE,
    heroPosition: "object-[70%_46%]",
    placeholder: "Otoro, uni, salmon...",
    title: "Nigiri",
  },
  rolls: {
    description:
      "Layered maki, precise cuts, and signature rolls built for texture, balance, and richness.",
    filterLabel: "Style",
    filterOptions: ["Any Style", "Classic", "Spicy", "Tempura", "Premium"],
    heroImage: "/assets/food/sushi-rolls-with-warm-cinematic-glow.webp",
    heroPosition: "object-[66%_52%]",
    placeholder: "Dragon, spicy tuna...",
    title: "Rolls",
  },
  sashimi: {
    description:
      "Clean slices of premium fish served with restraint, clarity, and seasonal garnish.",
    filterLabel: "Cut",
    filterOptions: ["Any Cut", "Tuna", "Salmon", "Scallop", "Octopus"],
    heroImage: "/assets/editorial/elegant-sashimi-platter-on-slate.webp",
    heroPosition: "object-[72%_48%]",
    placeholder: "Salmon, tuna, scallop...",
    title: "Sashimi",
  },
  vegetarian: {
    description:
      "Plant-forward sushi with bright vegetables, seasoned rice, and elegant umami.",
    filterLabel: "Ingredient",
    filterOptions: [
      "Any Ingredient",
      "Avocado",
      "Tofu",
      "Cucumber",
      "Shiitake",
    ],
    heroImage: "/assets/menu/sushi/vegetarian-temaki.webp",
    heroPosition: "object-[70%_50%]",
    placeholder: "Avocado, tofu, cucumber...",
    title: "Vegetarian",
  },
};

function getCategoryContent(category: string, categories: MenuCategory[]) {
  const categoryLabel =
    categories.find((item) => item.id === category)?.label || "Menu";

  return (
    categoryContent[category] || {
      description:
        "Explore refined Sushi Bliss selections prepared with premium ingredients.",
      filterLabel: "Type",
      filterOptions: ["Any Type"],
      heroImage: TABLET_OTORO_HERO_IMAGE,
      heroPosition: "object-[70%_46%]",
      placeholder: `Search ${categoryLabel.toLowerCase()}...`,
      title: categoryLabel,
    }
  );
}

function matchesCategorySearch(item: MenuItem, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  return (
    normalizedQuery.length === 0 || item.searchText.includes(normalizedQuery)
  );
}

function matchesPrimaryFilter(item: MenuItem, filter: string) {
  const searchText = item.searchText;

  if (filter.startsWith("Any ")) return true;

  if (item.itemType === "drink") {
    const drinkMatchers: Record<string, RegExp> = {
      "Beer & Wine": /beer|lager|wine|sparkling/,
      Cocktails: /cocktail|old fashioned|highball|spritz|akai|kintsugi/,
      Flights: /flight/,
      Sake: /sake|junmai|ginjo|daiginjo|yamahai/,
      Tea: /tea|sencha|hojicha|gyokuro|matcha/,
      "Zero Proof": /zero-proof|zero proof|nonalcoholic|tonic|cloud|ember/,
    };

    return drinkMatchers[filter]?.test(searchText) ?? true;
  }

  const matchers: Record<string, RegExp> = {
    Avocado: /avocado/,
    Caviar: /caviar/,
    Classic: /california|philadelphia|classic/,
    Cucumber: /cucumber/,
    Octopus: /octopus|tako/,
    Premium: /premium|dragon|rainbow|wagyu|toro|uni|truffle/,
    Roe: /roe|ikura/,
    Salmon: /salmon/,
    Scallop: /scallop/,
    Shellfish: /shrimp|scallop|ebi/,
    Shiitake: /shiitake|mushroom/,
    Spicy: /spicy|hot|firecracker/,
    Tempura: /tempura/,
    Tofu: /tofu|inari/,
    Toro: /toro|otoro|chutoro/,
    Truffle: /truffle/,
    Tuna: /tuna|toro/,
    Wagyu: /wagyu|beef/,
    Yellowtail: /yellowtail|hamachi/,
  };

  return matchers[filter]?.test(searchText) ?? true;
}

function matchesDietary(item: MenuItem, dietary: string) {
  if (item.itemType === "drink") return true;

  const searchText = `${item.name} ${item.description} ${item.ingredients.join(
    " ",
  )}`.toLowerCase();

  if (dietary === "Lean") return /lean|hamachi|salmon|ebi/.test(searchText);
  if (dietary === "Rich") return /otoro|toro|uni|roe/.test(searchText);
  if (dietary === "Shellfish Free") return !/shrimp|scallop/.test(searchText);

  return true;
}

function matchesSpice(item: MenuItem, spice: string) {
  if (item.itemType === "drink") return true;

  if (spice === "Hot") return item.tags.includes("hot");
  if (spice === "Mild") return !item.tags.includes("hot");

  return true;
}

function sortCategoryItems(items: MenuItem[], sort: string) {
  if (sort === "Price Low") {
    return [...items].sort((a, b) => a.priceCents - b.priceCents);
  }

  if (sort === "Price High") {
    return [...items].sort((a, b) => b.priceCents - a.priceCents);
  }

  return items;
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
  const content = getCategoryContent(category, categories);
  const [searchQuery, setSearchQuery] = useState("");
  const [primaryFilter, setPrimaryFilter] = useState(
    content.filterOptions[0] || "Any Type",
  );
  const [dietary, setDietary] = useState("Any Diet");
  const [spice, setSpice] = useState("Any Heat");
  const [sort, setSort] = useState("Featured");
  const isDrinksCategory = category === "drinks";
  const isEmptyDrinksCategory = category === "drinks" && items.length === 0;

  const displayedItems = useMemo(
    () =>
      sortCategoryItems(
        items.filter(
          (item) =>
            matchesCategorySearch(item, searchQuery) &&
            matchesPrimaryFilter(item, primaryFilter) &&
            matchesDietary(item, dietary) &&
            matchesSpice(item, spice),
        ),
        sort,
      ),
    [dietary, items, primaryFilter, searchQuery, sort, spice],
  );
  const heroImage = content.heroImage;
  const heroAlt = `${content.title} presentation`;

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <section className="relative mt-[18px] min-h-[280px] overflow-hidden rounded-[14px] border border-white/16 min-[1080px]:min-h-[342px]">
        <Image
          alt={heroAlt}
          className={classNames("object-cover", content.heroPosition)}
          fill
          loading="eager"
          priority
          sizes="1034px"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.78)_43%,rgba(0,0,0,0.16)_100%)]" />
        <div className="relative z-10 flex min-h-[280px] flex-col justify-center px-[64px] min-[1080px]:min-h-[342px] min-[1080px]:px-[86px]">
          <p className="text-[16px] uppercase tracking-[0.16em] text-[var(--sb-gold)] min-[1080px]:text-[18px]">
            Menu <ChevronIcon direction="right" size={18} /> {content.title}
          </p>
          <h1 className="editorial-title mt-4 text-[64px] uppercase leading-[0.9] tracking-[0.18em] text-white min-[1080px]:mt-5 min-[1080px]:text-[86px]">
            {content.title}
          </h1>
          <p className="mt-4 max-w-[420px] text-[18px] leading-7 text-[var(--sb-gold)] min-[1080px]:mt-5 min-[1080px]:text-[20px] min-[1080px]:leading-8">
            {content.description}
          </p>
        </div>
      </section>

      <TabletCategoryBar
        category={category}
        categories={categories}
        variant="pills"
        onSelectCategory={onSelectCategory}
      />

      <div className="mt-5 rounded-[18px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.34)]">
        <div
          className={classNames(
            "grid grid-cols-2 gap-3 min-[1080px]:gap-4",
            isDrinksCategory
              ? "lg:grid-cols-[minmax(280px,1fr)_210px_170px]"
              : "lg:grid-cols-[minmax(252px,1.28fr)_repeat(4,minmax(0,1fr))]",
          )}
        >
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
            <label className="sr-only" htmlFor="tablet-category-search">
              Search {content.title}
            </label>
            <span className="pointer-events-none absolute left-[54px] top-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]/72">
              Search
            </span>
            <input
              className="h-full min-w-0 flex-1 bg-transparent pt-4 text-[15px] text-white outline-none placeholder:text-white/44"
              id="tablet-category-search"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={content.placeholder}
              value={searchQuery}
            />
            {searchQuery ? (
              <button
                aria-label={`Clear ${content.title} search`}
                className="rounded-full border border-white/12 bg-black/34 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/42 hover:bg-white/[0.06]"
                onClick={clearSearch}
                type="button"
              >
                Clear
              </button>
            ) : null}
          </form>
          <TabletFilterSelect
            label={content.filterLabel}
            options={content.filterOptions}
            value={primaryFilter}
            onChange={setPrimaryFilter}
          />
          {isDrinksCategory ? null : (
            <>
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
            </>
          )}
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
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {displayedItems.map((item, index) => (
              <TabletCategoryCard
                badge={index === 0 ? "Chef's Pick" : undefined}
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

      <div className="mt-4 grid grid-cols-4 rounded-[14px] border border-white/14 bg-white/[0.035] p-4">
        {isDrinksCategory ? (
          <>
            <TabletBenefit icon={icons.flower} title="Pairing Logic">
              Matched By Course
            </TabletBenefit>
            <TabletBenefit icon={icons.crown} title="Sake Cellar">
              Ginjo To Daiginjo
            </TabletBenefit>
            <TabletBenefit icon={icons.chef} title="Zero Proof">
              Built With Balance
            </TabletBenefit>
            <TabletBenefit icon={icons.clock} title="Tea Service">
              Hot Or Chilled
            </TabletBenefit>
          </>
        ) : (
          <>
            <TabletBenefit icon={icons.flower} title="Premium Ingredients">
              Market Fresh
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
          </>
        )}
      </div>
    </>
  );
}

function TabletDrinksEmptyState() {
  const pairings = [
    ["Sake flights", "Junmai, ginjo, and daiginjo pairings by course."],
    ["Tea service", "Roasted green tea, matcha, and seasonal infusions."],
    ["Zero-proof", "Yuzu, shiso, and sparkling citrus preparations."],
  ] as const;

  return (
    <div className="grid min-h-[252px] grid-cols-[1.08fr_0.92fr] overflow-hidden rounded-[13px] border border-[var(--sb-border)] bg-[linear-gradient(135deg,rgba(0,0,0,0.82),rgba(90,10,8,0.34)_48%,rgba(0,0,0,0.86))]">
      <div className="p-8">
        <p className="text-[13px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
          Beverage Pairings
        </p>
        <h2 className="editorial-title mt-3 text-[38px] uppercase leading-none tracking-[0.12em] text-white">
          Curated at the table
        </h2>
        <p className="mt-4 max-w-[460px] text-[15px] leading-6 text-white/66">
          The digital drinks list is served through guided pairings so each
          sake, tea, or zero-proof course matches the fish, rice temperature,
          and pacing of your meal.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            className="red-glow-button grid h-12 w-[196px] place-items-center rounded-[10px] text-[12px] uppercase tracking-[0.08em]"
            href="/reservations"
          >
            Reserve Pairing
          </Link>
          <Link
            className="grid h-12 w-[170px] place-items-center rounded-[10px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/42 hover:bg-white/[0.045]"
            href="/support"
          >
            Ask Concierge
          </Link>
        </div>
      </div>
      <div className="grid content-center gap-3 border-l border-white/10 bg-black/28 p-5">
        {pairings.map(([title, copy]) => (
          <article
            className="rounded-[11px] border border-white/12 bg-white/[0.035] p-4"
            key={title}
          >
            <h3 className="text-[14px] uppercase tracking-[0.12em] text-[var(--sb-gold)]">
              {title}
            </h3>
            <p className="mt-2 text-[13px] leading-5 text-white/62">{copy}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function TabletCategoryCard({
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
  const isDrinkItem = item.itemType === "drink";

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
            src={getTabletPresentationImage(item)}
          />
        </div>
        <div className="p-3 min-[1080px]:p-4">
          <h2 className="text-[19px] text-white">{item.name}</h2>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-white/68">
            {item.description}
          </p>
          {isDrinkItem ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-[var(--sb-gold)]/30 bg-[var(--sb-gold)]/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                {item.serving}
              </span>
              {item.abv ? (
                <span className="rounded-full border border-white/12 bg-white/[0.035] px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-white/62">
                  {item.abv}% ABV
                </span>
              ) : null}
            </div>
          ) : null}
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
