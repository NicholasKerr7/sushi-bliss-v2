"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import type { RestaurantLocation } from "@/types/location";

import {
  getDirectionsUrl,
  getMobileLocationMeta,
  MobileLocationsBackButton,
  MobileLocationsHeader,
} from "./MobileLocationsPrimitives";

interface MobileLocationMapViewProps {
  cartCount: number;
  locations: RestaurantLocation[];
  onBack: () => void;
  onOpenCart: () => void;
  onOpenDetail: (location: RestaurantLocation) => void;
  onSelectLocation: (location: RestaurantLocation) => void;
  onShowNearest: () => void;
  selectedLocation: RestaurantLocation;
}

/** Mobile map state that lets guests switch locations or open directions/details. */
export function MobileLocationMapView({
  cartCount,
  locations,
  onBack,
  onOpenCart,
  onOpenDetail,
  onSelectLocation,
  onShowNearest,
  selectedLocation,
}: MobileLocationMapViewProps) {
  const directionsUrl = getDirectionsUrl(selectedLocation);

  return (
    <div className="mobile-frame relative z-10 pb-16">
      <MobileLocationsHeader cartCount={cartCount} onOpenCart={onOpenCart} />
      <div className="mt-7 grid grid-cols-[52px_1fr_52px] items-center">
        <MobileLocationsBackButton label="Back to locations" onClick={onBack} />
        <h1 className="editorial-title text-center text-[26px] uppercase tracking-[0.12em] text-white">
          Map View
        </h1>
        <button
          aria-label="Show nearest location"
          className="grid h-[52px] w-[52px] place-items-center rounded-[14px] border border-[var(--sb-border)] bg-black/52"
          onClick={onShowNearest}
          type="button"
        >
          <AssetIcon size={26} src={icons.location} />
        </button>
      </div>

      <section className="mt-6 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-black/42 shadow-[0_22px_60px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-[0.92] min-h-[390px]">
          <Image
            alt={`${selectedLocation.name} map`}
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="430px"
            src={selectedLocation.mapImageUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.1)_56%,rgba(0,0,0,0.82)_100%)]" />
          <div className="absolute left-5 top-5 rounded-[14px] border border-[var(--sb-border)] bg-black/66 px-4 py-3 backdrop-blur-xl">
            <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              {selectedLocation.neighborhood}
            </p>
            <p className="mt-1 text-[18px] text-white">
              {selectedLocation.name}
            </p>
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-[16px] border border-white/12 bg-black/72 p-4 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="editorial-title text-[23px] leading-[1.05] text-white">
                  {selectedLocation.name}
                </p>
                <p className="mt-2 text-[14px] leading-5 text-white/58">
                  {selectedLocation.address}
                </p>
              </div>
              <span className="shrink-0 text-[15px] font-semibold text-[var(--sb-red-bright)]">
                {getMobileLocationMeta(selectedLocation).distance}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                className="red-glow-button flex min-h-[52px] items-center justify-center gap-2 rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
                href={directionsUrl}
                rel="noreferrer"
                target="_blank"
              >
                <AssetIcon size={20} src={icons.location} />
                Directions
              </a>
              <button
                className="min-h-[52px] rounded-[12px] border border-[var(--sb-border)] bg-black/36 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                onClick={() => onOpenDetail(selectedLocation)}
                type="button"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <p className="text-[12px] uppercase tracking-[0.12em] text-white/52">
          Choose location
        </p>
        <div className="mt-3 grid gap-2">
          {locations.map((location) => {
            const active = location.id === selectedLocation.id;

            return (
              <button
                aria-pressed={active}
                className={classNames(
                  "flex min-h-[64px] items-center justify-between gap-3 rounded-[14px] border px-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]",
                  active
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/16"
                    : "border-white/12 bg-black/40",
                )}
                key={location.id}
                onClick={() => onSelectLocation(location)}
                type="button"
              >
                <span className="min-w-0">
                  <span className="block text-[16px] text-white">
                    {location.name}
                  </span>
                  <span className="mt-1 block text-[13px] text-white/52">
                    {location.neighborhood}
                  </span>
                </span>
                <span className="shrink-0 text-[13px] text-[var(--sb-red-bright)]">
                  {getMobileLocationMeta(location).distance}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
