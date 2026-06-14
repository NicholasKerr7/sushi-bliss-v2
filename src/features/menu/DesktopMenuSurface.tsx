import Image from "next/image";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
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
  desktopNigiriItems,
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

const desktopNigiriDisplayNames: Record<string, string> = {
  "salmon-nigiri": "Sake Nigiri",
  "scallop-nigiri": "Hotate Nigiri",
  "tuna-nigiri": "Maguro Nigiri",
};

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
  const categoryDisplayItems =
    category === "nigiri" ? desktopNigiriItems : activeCategoryItems;

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
              isCategoryPage
              onSelectCategory={onSelectCategory}
            />
            <DesktopFilterControls
              category={category}
              isCategoryPage
              query={query}
              onQueryChange={onQueryChange}
            />
          </>
        ) : (
          <>
            <DesktopFilterControls
              category={category}
              query={query}
              onQueryChange={onQueryChange}
            />
            <DesktopCategoryNav
              category={category}
              categoryExists={categoryExists}
              onSelectCategory={onSelectCategory}
            />
          </>
        )}

        <p className="mt-3 text-[13px] text-white/50 min-[1500px]:sr-only">
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
          <>
            <DesktopMenuSection title={`${selectedCategoryLabel} Menu`}>
              <div className="grid grid-cols-4 gap-4">
                {categoryDisplayItems.slice(0, 8).map((item, index) => (
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
            </DesktopMenuSection>
            <DesktopCategoryBenefitStrip />
          </>
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
              <div className="grid grid-cols-3 gap-3">
                {displayItems.slice(0, 9).map((item, index) => (
                  <DesktopCompactMenuRow
                    eagerImage={index < 3}
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

function DesktopFilterControls({
  category,
  isCategoryPage = false,
  query,
  onQueryChange,
}: {
  category: string;
  isCategoryPage?: boolean;
  query: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <div
      className={classNames(
        "mt-4 grid grid-cols-[minmax(0,1fr)_150px_150px_150px] gap-3 min-[1500px]:gap-2.5",
        isCategoryPage
          ? "min-[1500px]:mt-3 min-[1500px]:grid-cols-[326px_145px_132px_162px_128px]"
          : "min-[1500px]:mt-0 min-[1500px]:w-fit min-[1500px]:grid-cols-[346px_108px_128px_118px]",
      )}
    >
      <label className="relative block">
        <span className="sr-only">Search menu</span>
        <AssetIcon
          className="absolute left-4 top-1/2 -translate-y-1/2"
          size={19}
          src="/assets/icons/search-icon.png"
        />
        <input
          className="h-12 w-full rounded-[10px] border border-[var(--sb-border)] bg-black/30 pl-12 pr-4 text-[14px] text-white outline-none placeholder:text-white/42 focus:border-[var(--sb-gold)] min-[1500px]:h-10 min-[1500px]:rounded-[8px] min-[1500px]:text-[13px]"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={
            category === "nigiri" ? "Search nigiri..." : "Search menu items..."
          }
          value={query}
        />
      </label>
      {isCategoryPage ? <DesktopFilterButton label="Fish Type" /> : null}
      <DesktopFilterButton label="Dietary" />
      <DesktopFilterButton label="Spicy Level" />
      <DesktopFilterButton label="Sort By" />
    </div>
  );
}

function DesktopCategoryNav({
  category,
  categoryExists,
  isCategoryPage = false,
  onSelectCategory,
}: {
  category: string;
  categoryExists: (categoryId: string) => boolean;
  isCategoryPage?: boolean;
  onSelectCategory: (categoryId: string) => void;
}) {
  return (
    <nav
      aria-label="Desktop menu categories"
      className={classNames(
        "mt-4 grid grid-cols-7 gap-3",
        isCategoryPage
          ? "min-[1500px]:mt-4 min-[1500px]:grid-cols-[182px_112px_112px_112px_148px_132px_96px]"
          : "min-[1500px]:mt-4 min-[1500px]:flex min-[1500px]:w-fit min-[1500px]:gap-2",
      )}
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
              "grid min-h-[46px] grid-cols-[24px_auto] place-content-center items-center gap-2 rounded-[10px] border px-3 text-[12px] uppercase tracking-[0.04em] transition disabled:cursor-not-allowed disabled:opacity-45 min-[1500px]:min-h-9 min-[1500px]:rounded-[9px]",
              isCategoryPage
                ? "min-[1500px]:grid min-[1500px]:grid-cols-[22px_auto] min-[1500px]:px-3"
                : "min-[1500px]:flex min-[1500px]:grid-cols-none min-[1500px]:gap-1.5 min-[1500px]:px-3",
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
            <AssetIcon
              className={
                isCategoryPage || id === "recommended"
                  ? ""
                  : "min-[1500px]:hidden"
              }
              size={22}
              src={icon}
            />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

function DesktopCategoryBenefitStrip() {
  const benefits = [
    ["floral-emblem-icon.png", "Premium Ingredients", "Sourced Daily"],
    ["lotus-crown-icon.png", "Expert Craftsmanship", "By Master Chefs"],
    ["chef-crest-icon.png", "Authentic Experience", "Traditional. Refined."],
    ["gold-alert-icon.png", "Allergen Info", "Available Upon Request"],
  ] as const;

  return (
    <section className="mt-4 grid grid-cols-4 rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] px-8 py-3">
      {benefits.map(([icon, title, copy]) => (
        <article
          className="grid grid-cols-[42px_1fr] items-center gap-3 border-l border-white/10 pl-7 first:border-l-0 first:pl-0"
          key={title}
        >
          <AssetIcon size={34} src={`/assets/icons/${icon}`} />
          <div>
            <p className="editorial-title text-[14px] uppercase tracking-[0.08em] text-white/82">
              {title}
            </p>
            <p className="mt-0.5 text-[13px] text-white/56">{copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function DesktopMenuEditorialRail() {
  return (
    <aside
      aria-hidden="true"
      className="relative hidden min-h-[calc(100dvh-76px)] overflow-hidden border-r border-white/[0.08] min-[1500px]:block"
    >
      <Image
        alt=""
        className="object-cover object-left-top"
        fill
        priority
        sizes="178px"
        src="/assets/textures/red-moon-sakura-background.webp"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.08),rgba(0,0,0,0.28)_58%,rgba(0,0,0,0.78)_100%)]" />
    </aside>
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
    <section className="relative min-h-[236px] overflow-hidden rounded-[16px] border border-white/10 min-[1500px]:min-h-[174px]">
      <Image
        alt=""
        className="object-cover object-[72%_42%]"
        fill
        loading="eager"
        priority
        sizes="1200px"
        src={featuredAssets.heroSushi.publicUrl}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,5,6,0.96),rgba(4,5,6,0.78)_42%,rgba(4,5,6,0.12)_78%,rgba(4,5,6,0.78))]" />
      <div className="relative z-10 flex min-h-[236px] flex-col justify-center px-9 min-[1500px]:min-h-[174px] min-[1500px]:px-2">
        <p className="text-[14px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          {isNigiri ? "Our Menu" : "Explore our menu"}
        </p>
        <h1 className="editorial-title mt-2 text-[44px] leading-[0.96] text-white min-[1500px]:text-[40px]">
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
          <div className="mt-4 flex gap-3 min-[1500px]:hidden">
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
  compactDesktop = false,
  displayName,
  eagerImage = false,
  item,
  onAddToCart,
  onViewDetails,
}: {
  badge?: string;
  compactDesktop?: boolean;
  displayName?: string;
  eagerImage?: boolean;
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
        <div
          className={classNames(
            "relative h-[108px]",
            compactDesktop ? "min-[1500px]:h-[86px]" : "min-[1500px]:h-24",
          )}
        >
          <Image
            alt=""
            className="object-cover"
            fill
            loading={eagerImage ? "eager" : "lazy"}
            priority={eagerImage}
            sizes="300px"
            src={item.image.publicUrl}
          />
        </div>
        <div
          className={classNames(
            "p-3.5",
            compactDesktop
              ? "min-[1500px]:p-3"
              : "min-[1500px]:px-3.5 min-[1500px]:py-3",
          )}
        >
          <h3
            className={classNames(
              "line-clamp-1 text-[17px] text-white",
              compactDesktop
                ? "min-[1500px]:text-[15px]"
                : "min-[1500px]:text-[16px] min-[1500px]:leading-5",
            )}
          >
            {displayName || item.name}
          </h3>
          <p
            className={classNames(
              "mt-1 line-clamp-1 text-[13px] text-white/58",
              compactDesktop ? "" : "min-[1500px]:leading-5",
            )}
          >
            {item.ingredients.slice(0, 3).join(", ")}
          </p>
          <p
            className={classNames(
              "mt-2 text-[17px] text-[var(--sb-gold-soft)]",
              compactDesktop ? "" : "min-[1500px]:leading-5",
            )}
          >
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
  eagerImage = false,
  item,
  onAddToCart,
  onViewDetails,
}: {
  eagerImage?: boolean;
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
          loading={eagerImage ? "eager" : "lazy"}
          priority={eagerImage}
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
    <section className="mt-4 rounded-[14px] border border-[var(--sb-border)] bg-black/34 p-4 min-[1500px]:mt-3 min-[1500px]:p-3">
      <div className="flex items-center justify-between">
        <h2 className="editorial-title flex items-center gap-3 text-[18px] uppercase tracking-[0.09em] text-white">
          <AssetIcon size={22} src="/assets/icons/star-icon.png" />
          {title}
        </h2>
        {action ? (
          <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
            {action} <ChevronIcon direction="right" size={18} />
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
      className="grid h-12 grid-cols-[1fr_16px] items-center rounded-[10px] border border-[var(--sb-border)] bg-black/30 px-4 text-left text-[12px] uppercase tracking-[0.06em] text-white/78 min-[1500px]:h-10 min-[1500px]:rounded-[8px] min-[1500px]:px-4 min-[1500px]:text-[12px]"
      type="button"
    >
      {label}
      <ChevronIcon
        className="text-[var(--sb-gold-soft)]"
        direction="down"
        size={16}
      />
    </button>
  );
}
