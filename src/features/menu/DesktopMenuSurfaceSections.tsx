"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { classNames } from "@/lib/classNames";
import {
  getMenuItemOrderAction,
  liquidOmakaseReservationHref,
} from "@/lib/menuAvailability";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

import type {
  DesktopMenuAddHandler,
  DesktopMenuViewHandler,
} from "./DesktopMenuTypes";
import { desktopHeroContent } from "./DesktopMenuSurfaceData";
import { menuHeroItem } from "./tabletMenuData";

export function DesktopCategoryBenefitStrip({
  category,
}: {
  category: string;
}) {
  const benefits =
    category === "drinks"
      ? ([
          ["floral-emblem-icon.png", "Pairing Logic", "Matched By Course"],
          ["lotus-crown-icon.png", "Sake Cellar", "Reserve In-House"],
          ["chef-crest-icon.png", "Zero Proof", "Online Ready"],
          ["clock-icon.png", "Tea Service", "Order Or Reserve"],
        ] as const)
      : ([
          ["floral-emblem-icon.png", "Ingredient Sourcing", "Sourced Daily"],
          ["lotus-crown-icon.png", "Expert Craftsmanship", "By Master Chefs"],
          [
            "chef-crest-icon.png",
            "Authentic Experience",
            "Traditional. Refined.",
          ],
          ["gold-alert-icon.png", "Allergen Info", "Available Upon Request"],
        ] as const);

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

export function DesktopMenuEditorialRail() {
  return (
    <aside
      aria-hidden="true"
      className="relative hidden min-h-[calc(100dvh-76px)] overflow-hidden border-r border-white/[0.08] min-[1500px]:block"
    >
      <Image
        alt=""
        className="object-cover object-left-top"
        fill
        loading="eager"
        priority
        sizes="178px"
        src="/assets/textures/red-moon-sakura-background.webp"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.08),rgba(0,0,0,0.28)_58%,rgba(0,0,0,0.78)_100%)]" />
    </aside>
  );
}

export function DesktopMenuHero({
  category,
  onAddToCart,
  onViewDetails,
}: {
  category: string;
  onAddToCart: DesktopMenuAddHandler;
  onViewDetails: DesktopMenuViewHandler;
}) {
  const hero =
    desktopHeroContent[category as keyof typeof desktopHeroContent] ||
    desktopHeroContent.all;
  const showFeaturedActions = category === "all";

  return (
    <section className="relative min-h-[216px] overflow-hidden rounded-[16px] border border-white/10 min-[1500px]:min-h-[174px]">
      <Image
        alt={`${hero.title} menu presentation`}
        className={classNames("object-cover", hero.imagePosition)}
        fetchPriority="high"
        fill
        loading="eager"
        priority
        sizes="1200px"
        src={hero.image}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,5,6,0.96),rgba(4,5,6,0.78)_42%,rgba(4,5,6,0.12)_78%,rgba(4,5,6,0.78))]" />
      <div className="relative z-10 flex min-h-[216px] flex-col justify-center px-8 min-[1500px]:min-h-[174px] min-[1500px]:px-2">
        <p className="text-[14px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          {hero.eyebrow}
        </p>
        <h1 className="editorial-title mt-2 text-[42px] leading-[0.96] text-white min-[1500px]:text-[40px]">
          {hero.title}
          {"accent" in hero ? (
            <span className="block text-[var(--sb-red-bright)]">
              {hero.accent}
            </span>
          ) : null}
        </h1>
        <p className="mt-2 max-w-[500px] text-[15px] leading-6 text-[var(--sb-gold-soft)]">
          {hero.description}
        </p>
        {showFeaturedActions ? (
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

export function DesktopDrinksEmptyState() {
  const pairings = [
    ["Sake flight", "Three pours aligned to lean, rich, and umami courses."],
    ["Tea service", "Roasted green tea, matcha, and warm seasonal infusions."],
    ["Zero-proof", "Sparkling yuzu, shiso citrus, and mineral pairings."],
  ] as const;

  return (
    <div className="grid min-h-[246px] grid-cols-[1fr_300px] overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-[linear-gradient(135deg,rgba(0,0,0,0.76),rgba(101,12,10,0.28)_48%,rgba(0,0,0,0.86))]">
      <div className="p-7">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
          Sommelier Guided
        </p>
        <h3 className="editorial-title mt-3 text-[34px] uppercase leading-none tracking-[0.1em] text-white">
          Pairings served with your meal
        </h3>
        <p className="mt-4 max-w-[560px] text-[14px] leading-6 text-white/64">
          The beverage selection is matched at the table so the pour follows the
          fish, rice temperature, seasoning, and pacing of the order.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            className="red-glow-button grid h-11 w-[178px] place-items-center rounded-[9px] text-[11px] uppercase tracking-[0.08em]"
            href={liquidOmakaseReservationHref}
          >
            Reserve Pairing
          </Link>
          <Link
            className="grid h-11 w-[154px] place-items-center rounded-[9px] border border-[var(--sb-border)] text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/42 hover:bg-white/[0.045]"
            href="/support"
          >
            Ask Concierge
          </Link>
        </div>
      </div>
      <div className="grid content-center gap-3 border-l border-white/10 bg-black/30 p-4">
        {pairings.map(([title, copy]) => (
          <article
            className="rounded-[10px] border border-white/12 bg-white/[0.035] p-3"
            key={title}
          >
            <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--sb-gold)]">
              {title}
            </p>
            <p className="mt-1 text-[12px] leading-5 text-white/58">{copy}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function DesktopCategoryEmptyState({
  categoryLabel,
  onClearFilters,
}: {
  categoryLabel: string;
  onClearFilters: () => void;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--sb-border)] bg-black/34 p-8 text-center">
      <p className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
        No {categoryLabel.toLowerCase()} matches these refinements
      </p>
      <p className="mt-2 text-[13px] text-white/58">
        Reset the filters to return to the full menu.
      </p>
      <button
        className="mt-5 rounded-[9px] border border-[var(--sb-border)] px-5 py-3 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/42 hover:bg-white/[0.045]"
        onClick={onClearFilters}
        type="button"
      >
        Reset filters
      </button>
    </div>
  );
}

export function DesktopFeatureMenuCard({
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
  const hasDuplicateStandardCard = item.name === "Otoro Nigiri";
  const orderAction = getMenuItemOrderAction(item);

  return (
    <article className="relative min-h-[210px] overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-black/42 min-[1500px]:min-h-[204px]">
      {badge ? (
        <span className="absolute left-0 top-0 z-10 rounded-br-[12px] bg-[var(--sb-red)]/86 px-2.5 py-1 text-[10px] uppercase text-white">
          {badge}
        </span>
      ) : null}
      <button
        aria-label={
          badge && hasDuplicateStandardCard
            ? `View featured ${item.name} details`
            : `View details for ${item.name}`
        }
        className="block w-full text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <div
          className={classNames(
            "relative h-[96px]",
            compactDesktop ? "min-[1500px]:h-[82px]" : "min-[1500px]:h-[90px]",
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
            "px-3.5 py-3 pr-12",
            compactDesktop
              ? "min-[1500px]:px-3 min-[1500px]:py-2.5 min-[1500px]:pr-12"
              : "min-[1500px]:px-3.5 min-[1500px]:py-2.5 min-[1500px]:pr-12",
          )}
        >
          <h3
            className={classNames(
              "line-clamp-2 min-h-[42px] text-[16px] leading-[21px] text-white",
              compactDesktop
                ? "min-[1500px]:text-[15px]"
                : "min-[1500px]:text-[15px] min-[1500px]:leading-5",
            )}
          >
            {displayName || item.name}
          </h3>
          <p
            className={classNames(
              "mt-1 line-clamp-1 text-[12px] text-white/58",
              compactDesktop ? "" : "min-[1500px]:leading-5",
            )}
          >
            {item.itemType === "drink"
              ? item.serving || item.texture
              : item.ingredients.slice(0, 3).join(", ")}
          </p>
          <p
            className={classNames(
              "mt-2 text-[16px] text-[var(--sb-gold-soft)]",
              compactDesktop ? "" : "min-[1500px]:leading-5",
            )}
          >
            {formatMoney(item.priceCents)}
          </p>
          {item.itemType === "drink" ? (
            <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-white/42">
              {orderAction.badge}
            </span>
          ) : null}
        </div>
      </button>
      {orderAction.kind === "reservation" ? (
        <Link
          aria-label={`${orderAction.label} for ${item.name}`}
          className="absolute bottom-3 right-3 flex h-10 min-w-[98px] items-center justify-center gap-2 rounded-full border border-[var(--sb-gold)]/48 bg-[linear-gradient(180deg,rgba(215,168,79,0.18),rgba(7,8,8,0.86))] px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] shadow-[0_0_20px_rgba(215,168,79,0.16)]"
          href={orderAction.href || "/reservations"}
        >
          <AssetIcon size={18} src={orderAction.icon} />
          <span>{orderAction.shortLabel}</span>
        </Link>
      ) : (
        <button
          aria-label={
            badge && hasDuplicateStandardCard
              ? `Add featured ${item.name} to cart`
              : `Add ${item.name} to cart`
          }
          className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/52 bg-black/52"
          onClick={() => onAddToCart(item)}
          type="button"
        >
          <AssetIcon size={20} src="/assets/icons/plus-icon.png" />
        </button>
      )}
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
  const orderAction = getMenuItemOrderAction(item);

  return (
    <article className="grid grid-cols-[86px_minmax(0,1fr)_42px] items-center gap-3 rounded-[10px] border border-[var(--sb-border)] bg-black/34 p-1.5">
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
        <h3 className="line-clamp-2 min-h-[42px] text-[15px] leading-[21px] text-white">
          {item.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-[12px] text-white/55">
          {item.itemType === "drink"
            ? item.serving || item.texture
            : item.description}
        </p>
        <p className="text-[15px] text-[var(--sb-gold-soft)]">
          {formatMoney(item.priceCents)}
        </p>
        {item.itemType === "drink" ? (
          <span className="text-[10px] uppercase tracking-[0.1em] text-white/42">
            {orderAction.badge}
          </span>
        ) : null}
      </button>
      {orderAction.kind === "reservation" ? (
        <Link
          aria-label={`${orderAction.label} for ${item.name}`}
          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/48 bg-[linear-gradient(180deg,rgba(215,168,79,0.18),rgba(7,8,8,0.86))] shadow-[0_0_20px_rgba(215,168,79,0.16)]"
          href={orderAction.href || "/reservations"}
        >
          <AssetIcon size={19} src={orderAction.icon} />
        </Link>
      ) : (
        <button
          aria-label={`Add ${item.name} to cart`}
          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-border)]"
          onClick={() => onAddToCart(item)}
          type="button"
        >
          <AssetIcon size={20} src="/assets/icons/plus-icon.png" />
        </button>
      )}
    </article>
  );
}

export function DesktopMenuSection({
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
