"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, icons } from "@/features/home/homeDashboardData";
import { classNames } from "@/lib/classNames";
import type { RestaurantLocation } from "@/types/location";

export const mobileLocationMeta: Record<
  string,
  {
    access: string;
    distance: string;
    parking: string;
    tag: string;
  }
> = {
  "kintsugi-courtyard": {
    access: "Garden room, street-level entrance",
    distance: "3.2 km",
    parking: "Valet and nearby public parking",
    tag: "Flagship",
  },
  "sushi-bar": {
    access: "Chef counter, late seating",
    distance: "1.9 km",
    parking: "Station parking nearby",
    tag: "Popular",
  },
  "tokyo-rooftop": {
    access: "Private booths, elevator access",
    distance: "0.6 km",
    parking: "Valet available after 5 PM",
    tag: "Nearest",
  },
};

interface MobileLocationsHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

/** Shared mobile locations header using the same brand treatment as customer screens. */
export function MobileLocationsHeader({
  cartCount,
  onOpenCart,
}: MobileLocationsHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <Link
        className="flex min-w-0 items-center gap-3 rounded-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        href="/home"
      >
        <AssetIcon
          alt="Sushi Bliss"
          className="rounded-full"
          loading="eager"
          size={54}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[18px] leading-[0.95] tracking-[0.34em] text-white">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <div className="flex items-center gap-3">
        {cartCount > 0 ? (
          <button
            aria-label="Open cart"
            className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)]"
            onClick={onOpenCart}
            type="button"
          >
            <AssetIcon loading="eager" size={25} src={icons.cart} />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold">
              {cartCount}
            </span>
          </button>
        ) : null}
        <Link
          aria-label="Notifications"
          className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)]"
          href="/notifications"
        >
          <AssetIcon loading="eager" size={27} src={icons.bell} />
          <span className="absolute right-2.5 top-2 h-3 w-3 rounded-full bg-[var(--sb-red-bright)]" />
        </Link>
      </div>
    </header>
  );
}

export function MobileLocationsBackButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="grid h-12 w-12 place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/46 text-[30px] leading-none text-[var(--sb-gold-soft)] shadow-[0_0_24px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:h-[52px] min-[390px]:w-[52px]"
      onClick={onClick}
      type="button"
    >
      <ChevronIcon direction="left" size={24} />
    </button>
  );
}

export function MobileLocationFact({
  icon,
  text,
  tone = "default",
}: {
  icon?: string;
  text: string;
  tone?: "default" | "gold";
}) {
  return (
    <p
      className={classNames(
        "grid grid-cols-[18px_1fr] gap-1.5 text-[12px] leading-[18px] min-[390px]:grid-cols-[20px_1fr] min-[390px]:gap-2 min-[390px]:text-[13px] min-[390px]:leading-5",
        tone === "gold" ? "text-[var(--sb-gold-soft)]" : "text-white/62",
      )}
    >
      <AssetIcon className="mt-0.5" size={16} src={icon} />
      <span>{text}</span>
    </p>
  );
}

export function MobileDetailRow({
  icon,
  label,
  supporting,
  value,
}: {
  icon?: string;
  label: string;
  supporting: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[48px_1fr] gap-3 py-3.5 min-[390px]:grid-cols-[56px_1fr] min-[390px]:gap-4 min-[390px]:py-4">
      <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/34 min-[390px]:h-[52px] min-[390px]:w-[52px] min-[390px]:rounded-[14px]">
        <AssetIcon size={24} src={icon} />
      </span>
      <span className="min-w-0">
        <span className="block text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[390px]:text-[14px] min-[390px]:tracking-[0.1em]">
          {label}
        </span>
        <span className="mt-1 block text-[14px] text-white/76 min-[390px]:text-[15px]">
          {value}
        </span>
        <span className="mt-1 block text-[13px] leading-[18px] text-white/52 min-[390px]:text-[14px] min-[390px]:leading-5">
          {supporting}
        </span>
      </span>
    </div>
  );
}

export function MobileLocationsEmptyState({
  onClearFilters,
}: {
  onClearFilters: () => void;
}) {
  return (
    <section className="rounded-[18px] border border-[var(--sb-border)] bg-black/44 p-6 text-center">
      <AssetIcon className="mx-auto" size={56} src={icons.location} />
      <h2 className="editorial-title mt-5 text-[25px] text-white">
        No locations found
      </h2>
      <p className="mt-3 text-[15px] leading-6 text-white/58">
        Try a different neighborhood or clear the active filters.
      </p>
      <button
        className="mt-6 h-[52px] rounded-[13px] border border-[var(--sb-border)] px-5 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onClearFilters}
        type="button"
      >
        Clear filters
      </button>
    </section>
  );
}

export function getMobileLocationMeta(location: RestaurantLocation) {
  return (
    mobileLocationMeta[location.id] || {
      access: location.features.join(", "),
      distance: "Nearby",
      parking: "Contact the restaurant for parking details",
      tag: "Open",
    }
  );
}

export function getDirectionsUrl(location: RestaurantLocation) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.name} ${location.address}`,
  )}`;
}
