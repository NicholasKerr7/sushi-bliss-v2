"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import type { RestaurantLocation } from "@/types/location";

import {
  getMobileLocationMeta,
  MobileLocationFact,
  MobileLocationsEmptyState,
  MobileLocationsHeader,
} from "./MobileLocationsPrimitives";

interface MobileLocationListViewProps {
  cartCount: number;
  filterOpen: boolean;
  locations: RestaurantLocation[];
  neighborhoods: string[];
  onClearFilters: () => void;
  onNeighborhoodChange: (neighborhood: string) => void;
  onOpenCart: () => void;
  onOpenDetail: (location: RestaurantLocation) => void;
  onOpenMap: () => void;
  onQueryChange: (query: string) => void;
  onShowNearest: () => void;
  onToggleFilter: () => void;
  query: string;
  selectedNeighborhood: string;
}

/** Mobile locations directory list with working search, filters, and map actions. */
export function MobileLocationListView({
  cartCount,
  filterOpen,
  locations,
  neighborhoods,
  onClearFilters,
  onNeighborhoodChange,
  onOpenCart,
  onOpenDetail,
  onOpenMap,
  onQueryChange,
  onShowNearest,
  onToggleFilter,
  query,
  selectedNeighborhood,
}: MobileLocationListViewProps) {
  return (
    <div className="relative z-10 mx-auto max-w-[430px] pb-16">
      <MobileLocationsHeader cartCount={cartCount} onOpenCart={onOpenCart} />

      <section className="pt-12">
        <h1 className="editorial-title text-[43px] leading-[1.06] tracking-[0.06em]">
          Restaurant
          <span className="block text-[var(--sb-red-bright)]">Locations</span>
        </h1>
        <p className="mt-4 text-[17px] leading-6 text-[var(--sb-gold-soft)]">
          Find a Sushi Bliss restaurant near you.
        </p>
      </section>

      <form
        className="mt-7 grid grid-cols-[minmax(0,1fr)_88px] gap-3"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="flex h-[62px] min-w-0 items-center gap-3 rounded-[14px] border border-[var(--sb-border)] bg-black/58 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
          <AssetIcon size={24} src={icons.search} />
          <span className="sr-only">
            Search by city, neighborhood, or address
          </span>
          <input
            className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/48"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search locations..."
            value={query}
          />
        </label>
        <button
          aria-expanded={filterOpen}
          className={classNames(
            "flex h-[62px] items-center justify-center gap-1.5 rounded-[14px] border text-[12px] uppercase tracking-[0.06em] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]",
            filterOpen
              ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/20 text-[var(--sb-red-bright)]"
              : "border-[var(--sb-border)] bg-black/58 text-[var(--sb-gold-soft)]",
          )}
          onClick={onToggleFilter}
          type="button"
        >
          <AssetIcon size={21} src={icons.settings} />
          Filter
        </button>
      </form>

      {filterOpen ? (
        <div className="mt-3 rounded-[16px] border border-[var(--sb-border)] bg-black/64 p-3 backdrop-blur-xl">
          <p className="text-[12px] uppercase tracking-[0.12em] text-white/54">
            Neighborhood
          </p>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {neighborhoods.map((neighborhood) => (
              <button
                aria-pressed={selectedNeighborhood === neighborhood}
                className={classNames(
                  "h-10 shrink-0 rounded-full border px-4 text-[12px] uppercase tracking-[0.06em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]",
                  selectedNeighborhood === neighborhood
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/22 text-[var(--sb-red-bright)] shadow-[0_0_20px_rgba(239,47,37,0.25)]"
                    : "border-white/12 bg-white/[0.035] text-white/62",
                )}
                key={neighborhood}
                onClick={() => onNeighborhoodChange(neighborhood)}
                type="button"
              >
                {neighborhood === "all" ? "All locations" : neighborhood}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-5 grid gap-3">
        {locations.length > 0 ? (
          locations.map((location, index) => (
            <MobileLocationCard
              imagePriority={index < 2}
              key={location.id}
              location={location}
              onOpenDetail={onOpenDetail}
            />
          ))
        ) : (
          <MobileLocationsEmptyState onClearFilters={onClearFilters} />
        )}
      </div>

      <div className="mt-4 grid gap-3">
        <button
          className="red-glow-button flex min-h-[72px] w-full items-center justify-center gap-4 rounded-[14px] text-[17px] uppercase tracking-[0.08em]"
          onClick={onOpenMap}
          type="button"
        >
          <AssetIcon size={30} src="/assets/icons/map-pin-icon.png" />
          View On Map
        </button>
        <button
          className="flex min-h-[58px] w-full items-center justify-center gap-3 rounded-[14px] border border-[var(--sb-border)] bg-black/42 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          onClick={onShowNearest}
          type="button"
        >
          <AssetIcon size={23} src={icons.location} />
          Show nearest location
        </button>
      </div>
    </div>
  );
}

function MobileLocationCard({
  imagePriority,
  location,
  onOpenDetail,
}: {
  imagePriority: boolean;
  location: RestaurantLocation;
  onOpenDetail: (location: RestaurantLocation) => void;
}) {
  const meta = getMobileLocationMeta(location);

  return (
    <article className="grid min-h-[148px] grid-cols-[38%_1fr] overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="relative min-h-[148px] bg-black/30">
        <Image
          alt={location.name}
          className="object-cover"
          fill
          loading={imagePriority ? "eager" : "lazy"}
          priority={imagePriority}
          sizes="160px"
          src={location.imageUrl}
        />
        <span className="absolute left-2 top-2 rounded-full border border-[var(--sb-red-bright)]/50 bg-black/68 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)]">
          {meta.tag}
        </span>
      </div>
      <div className="min-w-0 p-4">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <h2 className="editorial-title min-w-0 text-[22px] leading-[1.04] text-white">
            {location.name}
          </h2>
          <button
            aria-label={`View ${location.name} details`}
            className="mt-7 shrink-0 text-[31px] leading-none text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
            onClick={() => onOpenDetail(location)}
            type="button"
          >
            <ChevronIcon direction="right" size={18} />
          </button>
        </div>

        <div className="mt-3 grid gap-2">
          <MobileLocationFact icon={icons.location} text={location.address} />
          <MobileLocationFact
            icon={icons.clock}
            text={location.hours}
            tone="gold"
          />
        </div>

        <button
          className="mt-3 text-left text-[14px] font-semibold text-[var(--sb-red-bright)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
          onClick={() => onOpenDetail(location)}
          type="button"
        >
          {meta.distance}
        </button>
      </div>
    </article>
  );
}
