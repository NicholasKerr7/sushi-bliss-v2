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
    <div className="mobile-frame relative z-10 pb-16">
      <MobileLocationsHeader cartCount={cartCount} onOpenCart={onOpenCart} />

      <section className="pt-8 min-[390px]:pt-10">
        <h1 className="editorial-title text-[34px] leading-[1.03] tracking-[0.04em] min-[390px]:text-[40px] min-[390px]:tracking-[0.06em]">
          Restaurant
          <span className="block text-[var(--sb-red-bright)]">Locations</span>
        </h1>
        <p className="mt-3 max-w-[270px] text-[16px] leading-6 text-[var(--sb-gold-soft)] min-[390px]:text-[17px]">
          Find a Sushi Bliss restaurant near you.
        </p>
      </section>

      <form
        className="mt-5 grid grid-cols-[minmax(0,1fr)_78px] gap-2.5 min-[390px]:mt-7 min-[390px]:grid-cols-[minmax(0,1fr)_88px] min-[390px]:gap-3"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="flex h-[52px] min-w-0 items-center gap-2.5 rounded-[13px] border border-[var(--sb-border)] bg-black/58 px-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl min-[390px]:h-[62px] min-[390px]:gap-3 min-[390px]:rounded-[14px] min-[390px]:px-4">
          <AssetIcon size={21} src={icons.search} />
          <span className="sr-only">
            Search by city, neighborhood, or address
          </span>
          <input
            className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/48 min-[390px]:text-[14px]"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search locations..."
            value={query}
          />
        </label>
        <button
          aria-expanded={filterOpen}
          className={classNames(
            "flex h-[52px] items-center justify-center gap-1 rounded-[13px] border text-[11px] uppercase tracking-[0.05em] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:h-[62px] min-[390px]:gap-1.5 min-[390px]:rounded-[14px] min-[390px]:text-[12px] min-[390px]:tracking-[0.06em]",
            filterOpen
              ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/20 text-[var(--sb-red-bright)]"
              : "border-[var(--sb-border)] bg-black/58 text-[var(--sb-gold-soft)]",
          )}
          onClick={onToggleFilter}
          type="button"
        >
          <AssetIcon size={18} src={icons.settings} />
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
              imagePriority={index < 3}
              key={location.id}
              location={location}
              onOpenDetail={onOpenDetail}
            />
          ))
        ) : (
          <MobileLocationsEmptyState onClearFilters={onClearFilters} />
        )}
      </div>

      <div className="mt-[calc(124px+var(--sb-safe-bottom))] grid gap-3 min-[390px]:mt-[calc(136px+var(--sb-safe-bottom))]">
        <button
          className="red-glow-button flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-[13px] text-[13px] uppercase tracking-[0.06em] min-[390px]:min-h-[64px] min-[390px]:gap-3 min-[390px]:rounded-[14px] min-[390px]:text-[15px] min-[390px]:tracking-[0.07em]"
          onClick={onOpenMap}
          type="button"
        >
          <AssetIcon size={25} src="/assets/icons/map-pin-icon.png" />
          View On Map
        </button>
        <button
          className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-[13px] border border-[var(--sb-border)] bg-black/42 text-[11px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:min-h-[58px] min-[390px]:text-[13px] min-[390px]:tracking-[0.07em]"
          onClick={onShowNearest}
          type="button"
        >
          <AssetIcon size={21} src={icons.location} />
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
    <article className="grid min-h-[132px] grid-cols-[34%_1fr] overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-xl min-[390px]:min-h-[148px] min-[390px]:grid-cols-[38%_1fr]">
      <div className="relative min-h-[132px] bg-black/30 min-[390px]:min-h-[148px]">
        <Image
          alt={`${location.name} map preview`}
          className="object-cover"
          fill
          loading={imagePriority ? "eager" : "lazy"}
          priority={imagePriority}
          sizes="160px"
          src={location.mapImageUrl}
        />
        <span className="absolute left-2 top-2 rounded-full border border-[var(--sb-red-bright)]/50 bg-black/68 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)]">
          {meta.tag}
        </span>
        <span className="absolute bottom-2 left-2 rounded-full border border-[var(--sb-red-bright)]/42 bg-black/72 px-2.5 py-1 text-[12px] font-semibold leading-none text-[var(--sb-red-bright)] shadow-[0_0_18px_rgba(239,47,37,0.26)]">
          {meta.distance}
        </span>
      </div>
      <div className="min-w-0 p-3 min-[390px]:p-4">
        <div className="flex min-w-0 items-start justify-between gap-2 min-[390px]:gap-3">
          <h2 className="editorial-title min-w-0 max-w-full break-normal text-balance text-[16px] leading-[1.03] tracking-[0.01em] text-white min-[390px]:text-[22px]">
            {location.name}
          </h2>
          <button
            aria-label={`View ${location.name} details`}
            className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--sb-border)] bg-black/28 text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:mt-4 min-[390px]:h-10 min-[390px]:w-10"
            onClick={() => onOpenDetail(location)}
            type="button"
          >
            <ChevronIcon direction="right" size={18} />
          </button>
        </div>

        <div className="mt-2 grid gap-1.5 min-[390px]:mt-3 min-[390px]:gap-2">
          <MobileLocationFact icon={icons.location} text={location.address} />
          <MobileLocationFact
            icon={icons.clock}
            text={location.hours}
            tone="gold"
          />
        </div>
      </div>
    </article>
  );
}
