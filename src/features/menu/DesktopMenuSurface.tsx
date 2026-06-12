import Image from "next/image";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { featuredAssets } from "@/features/home/visualHomeData";
import { useCart } from "@/hooks/useCart";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

import { DesktopCartPanel } from "./DesktopCartPanel";
import type {
  DesktopMenuAddHandler,
  DesktopMenuViewHandler,
} from "./DesktopMenuTypes";
import {
  allTabletMenuItems,
  chefSpecialItems,
  menuHeroItem,
} from "./tabletMenuData";

const desktopCategoryButtons = [
  ["recommended", "Recommended", "/assets/icons/star-icon.png"],
  ["nigiri", "Nigiri", "/assets/icons/nigiri-icon.png"],
  ["rolls", "Rolls", "/assets/icons/sushi-menu-icon.png"],
  ["sashimi", "Sashimi", "/assets/icons/sashimi-icon.png"],
  ["chef-specials", "Chef Specials", "/assets/icons/lotus-crown-icon.png"],
  ["vegetarian", "Vegetarian", "/assets/icons/vegetarian-sushi-icon.webp"],
  ["drinks", "Drinks", "/assets/icons/miso-soup-icon.png"],
] as const;

export function DesktopMenuSurface({
  activeCategoryItems,
  category,
  categoryExists,
  filteredItems,
  hasActiveFilters,
  itemCount,
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
  itemCount: number;
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
  const isCategoryPage = category !== "all" && category !== "recommended";
  const displayItems = isCategoryPage ? filteredItems : allTabletMenuItems;

  return (
    <main className="mx-auto grid min-h-[calc(100dvh-88px)] max-w-[1672px] grid-cols-[minmax(0,1fr)_386px] gap-7 px-7 pb-6 pt-3">
      <section className="min-w-0 rounded-[18px] border border-[var(--sb-border)] bg-black/58 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.52)]">
        <DesktopMenuHero
          category={category}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
        <nav
          aria-label="Desktop menu categories"
          className="mt-4 grid grid-cols-7 gap-3"
        >
          {desktopCategoryButtons.map(([id, label, icon]) => {
            const disabled = id === "drinks" || !categoryExists(id);
            const active =
              (id === "recommended" &&
                (category === "all" || category === "recommended")) ||
              category === id;

            return (
              <button
                aria-pressed={active}
                className={classNames(
                  "grid min-h-[46px] grid-cols-[24px_auto] place-content-center items-center gap-2 rounded-[10px] border px-3 text-[12px] uppercase tracking-[0.04em] transition disabled:cursor-not-allowed disabled:opacity-45",
                  active
                    ? "border-[var(--sb-gold)]/60 bg-[var(--sb-gold)]/22 text-[var(--sb-gold-soft)]"
                    : "border-[var(--sb-border)] bg-white/[0.025] text-white/76 hover:bg-white/[0.05]",
                )}
                disabled={disabled}
                key={id}
                onClick={() => onSelectCategory(id)}
                title={disabled ? `${label} coming soon` : undefined}
                type="button"
              >
                <AssetIcon size={22} src={icon} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_150px_150px_150px] gap-3">
          <label className="relative block">
            <span className="sr-only">Search menu</span>
            <AssetIcon
              className="absolute left-4 top-1/2 -translate-y-1/2"
              size={19}
              src="/assets/icons/search-icon.png"
            />
            <input
              className="h-12 w-full rounded-[10px] border border-[var(--sb-border)] bg-black/30 pl-12 pr-4 text-[14px] text-white outline-none placeholder:text-white/42 focus:border-[var(--sb-gold)]"
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={
                category === "nigiri"
                  ? "Search nigiri..."
                  : "Search menu items..."
              }
              value={query}
            />
          </label>
          <DesktopFilterButton label="Dietary" />
          <DesktopFilterButton label="Spicy Level" />
          <DesktopFilterButton label="Sort By" />
        </div>

        <p className="mt-3 text-[13px] text-white/50">
          Showing{" "}
          <span className="font-mono text-[var(--sb-gold-soft)]">
            {itemCount}
          </span>{" "}
          of{" "}
          <span className="font-mono text-[var(--sb-gold-soft)]">
            {totalItemCount}
          </span>{" "}
          items in <span className="text-white">{selectedCategoryLabel}</span>
          {hasActiveFilters ? (
            <button
              className="ml-3 text-[var(--sb-red-bright)]"
              onClick={onClearFilters}
              type="button"
            >
              Reset filters
            </button>
          ) : null}
        </p>

        {isCategoryPage ? (
          <DesktopMenuSection title={`${selectedCategoryLabel} Menu`}>
            <div className="grid grid-cols-4 gap-4">
              {activeCategoryItems.slice(0, 8).map((item, index) => (
                <DesktopFeatureMenuCard
                  badge={index === 0 ? "Chef's Pick" : undefined}
                  item={item}
                  key={item.id}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          </DesktopMenuSection>
        ) : (
          <>
            <DesktopMenuSection action="View full menu" title="Chef's Specials">
              <div className="grid grid-cols-4 gap-4">
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
                    item={item}
                    key={item.id}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            </DesktopMenuSection>
            <DesktopMenuSection title="All Menu Items">
              <div className="grid grid-cols-3 gap-3">
                {displayItems.slice(0, 9).map((item) => (
                  <DesktopCompactMenuRow
                    item={item}
                    key={item.id}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
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

function DesktopMenuHero({
  category,
  onAddToCart,
  onViewDetails,
}: {
  category: string;
  onAddToCart: DesktopMenuAddHandler;
  onViewDetails: DesktopMenuViewHandler;
}) {
  const isNigiri = category === "nigiri";

  return (
    <section className="relative min-h-[236px] overflow-hidden rounded-[16px] border border-white/10">
      <Image
        alt=""
        className="object-cover object-[72%_42%]"
        fill
        priority
        sizes="1200px"
        src={featuredAssets.heroSushi.publicUrl}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,5,6,0.96),rgba(4,5,6,0.78)_42%,rgba(4,5,6,0.12)_78%,rgba(4,5,6,0.78))]" />
      <div className="relative z-10 flex min-h-[236px] flex-col justify-center px-9">
        <p className="text-[14px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          {isNigiri ? "Our Menu" : "Explore our menu"}
        </p>
        <h1 className="editorial-title mt-2 text-[44px] leading-[0.96] text-white">
          {isNigiri ? (
            "Nigiri"
          ) : (
            <>
              Exceptional
              <span className="block text-[var(--sb-red-bright)]">
                Japanese Cuisine
              </span>
            </>
          )}
        </h1>
        <p className="mt-3 max-w-[500px] text-[15px] leading-6 text-[var(--sb-gold-soft)]">
          {isNigiri
            ? "Experience the pure art of nigiri. Hand-pressed perfection, featuring the finest fish and seasonal ingredients."
            : "Sourced daily. Crafted by masters. Served with passion."}
        </p>
        {!isNigiri ? (
          <div className="mt-4 flex gap-3">
            <button
              className="red-glow-button h-11 w-[180px] rounded-[10px] text-[12px] uppercase tracking-[0.08em]"
              onClick={() => onAddToCart(menuHeroItem)}
              type="button"
            >
              Add feature
            </button>
            <button
              className="h-11 w-[170px] rounded-[10px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              onClick={() => onViewDetails(menuHeroItem)}
              type="button"
            >
              View details
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function DesktopFeatureMenuCard({
  badge,
  item,
  onAddToCart,
  onViewDetails,
}: {
  badge?: string;
  item: MenuItem;
  onAddToCart: DesktopMenuAddHandler;
  onViewDetails: DesktopMenuViewHandler;
}) {
  return (
    <article className="relative min-h-[176px] overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-black/42">
      {badge ? (
        <span className="absolute left-0 top-0 z-10 rounded-br-[12px] bg-[var(--sb-red)]/86 px-2.5 py-1 text-[10px] uppercase text-white">
          {badge}
        </span>
      ) : null}
      <button
        aria-label={`View details for ${item.name}`}
        className="block w-full text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <div className="relative h-[108px]">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="300px"
            src={item.image.publicUrl}
          />
        </div>
        <div className="p-3.5">
          <h3 className="line-clamp-1 text-[17px] text-white">{item.name}</h3>
          <p className="mt-1 line-clamp-1 text-[13px] text-white/58">
            {item.ingredients.slice(0, 3).join(", ")}
          </p>
          <p className="mt-2 text-[17px] text-[var(--sb-gold-soft)]">
            {formatMoney(item.priceCents)}
          </p>
        </div>
      </button>
      <button
        aria-label={`Add ${item.name} to cart`}
        className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-gold)]/52 bg-black/52"
        onClick={() => onAddToCart(item)}
        type="button"
      >
        <AssetIcon size={20} src="/assets/icons/plus-icon.png" />
      </button>
    </article>
  );
}

export function DesktopCompactMenuRow({
  item,
  onAddToCart,
  onViewDetails,
}: {
  item: MenuItem;
  onAddToCart: DesktopMenuAddHandler;
  onViewDetails: DesktopMenuViewHandler;
}) {
  return (
    <article className="grid grid-cols-[86px_minmax(0,1fr)_38px] items-center gap-3 rounded-[10px] border border-[var(--sb-border)] bg-black/34 p-1.5">
      <button
        aria-label={`View details for ${item.name}`}
        className="relative h-[68px] overflow-hidden rounded-[8px]"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="90px"
          src={item.image.publicUrl}
        />
      </button>
      <button
        className="min-w-0 text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <h3 className="line-clamp-1 text-[15px] text-white">{item.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-[12px] text-white/55">
          {item.description}
        </p>
        <p className="text-[15px] text-[var(--sb-gold-soft)]">
          {formatMoney(item.priceCents)}
        </p>
      </button>
      <button
        aria-label={`Add ${item.name} to cart`}
        className="grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-border)]"
        onClick={() => onAddToCart(item)}
        type="button"
      >
        <AssetIcon size={20} src="/assets/icons/plus-icon.png" />
      </button>
    </article>
  );
}

function DesktopMenuSection({
  action,
  children,
  title,
}: {
  action?: string;
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="mt-4 rounded-[14px] border border-[var(--sb-border)] bg-black/34 p-4">
      <div className="flex items-center justify-between">
        <h2 className="editorial-title flex items-center gap-3 text-[18px] uppercase tracking-[0.09em] text-white">
          <AssetIcon size={22} src="/assets/icons/star-icon.png" />
          {title}
        </h2>
        {action ? (
          <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
            {action} &gt;
          </span>
        ) : null}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function DesktopFilterButton({ label }: { label: string }) {
  return (
    <button
      className="grid h-12 grid-cols-[1fr_16px] items-center rounded-[10px] border border-[var(--sb-border)] bg-black/30 px-4 text-left text-[12px] uppercase tracking-[0.06em] text-white/78"
      type="button"
    >
      {label}
      <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
        v
      </span>
    </button>
  );
}
