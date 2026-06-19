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

const mobileLocationOverviewMap =
  "/assets/maps/tokyo-city-map-with-sushi-markers.webp";

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
      <div className="mt-5 grid grid-cols-[48px_1fr_48px] items-center min-[390px]:mt-7 min-[390px]:grid-cols-[52px_1fr_52px]">
        <MobileLocationsBackButton label="Back to locations" onClick={onBack} />
        <h1 className="editorial-title text-center text-[24px] uppercase tracking-[0.1em] text-white min-[390px]:text-[26px] min-[390px]:tracking-[0.12em]">
          Map View
        </h1>
        <button
          aria-label="Show nearest location"
          className="grid h-12 w-12 place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/52 min-[390px]:h-[52px] min-[390px]:w-[52px] min-[390px]:rounded-[14px]"
          onClick={onShowNearest}
          type="button"
        >
          <AssetIcon size={26} src={icons.location} />
        </button>
      </div>

      <section className="mt-6 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-black/42 shadow-[0_22px_60px_rgba(0,0,0,0.45)]">
        <div className="relative min-h-[326px] bg-[#050607] min-[390px]:min-h-[390px]">
          <Image
            alt="Tokyo map with Sushi Bliss location markers"
            className="object-contain object-top"
            fill
            loading="eager"
            priority
            sizes="430px"
            src={mobileLocationOverviewMap}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.32)_48%,rgba(0,0,0,0.82)_100%)]"
          />
          <div className="absolute bottom-4 left-4 right-4 rounded-[16px] border border-white/12 bg-black/72 p-4 backdrop-blur-xl min-[390px]:bottom-5 min-[390px]:left-5 min-[390px]:right-5">
            <div className="flex items-start justify-between gap-3 min-[390px]:gap-4">
              <div className="min-w-0">
                <p className="editorial-title text-[21px] leading-[1.03] text-white min-[390px]:text-[23px] min-[390px]:leading-[1.05]">
                  {selectedLocation.name}
                </p>
                <p className="mt-2 text-[13px] leading-[18px] text-white/58 min-[390px]:text-[14px] min-[390px]:leading-5">
                  {selectedLocation.address}
                </p>
              </div>
              <span className="shrink-0 text-[15px] font-semibold text-[var(--sb-red-bright)]">
                {getMobileLocationMeta(selectedLocation).distance}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5 min-[390px]:gap-3">
              <a
                aria-label="Open directions"
                className="red-glow-button flex min-h-[50px] items-center justify-center gap-1.5 rounded-[12px] text-[10px] uppercase tracking-[0.04em] min-[390px]:min-h-[52px] min-[390px]:gap-2 min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
                href={directionsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <AssetIcon size={18} src={icons.location} />
                <span className="min-[390px]:hidden">Route</span>
                <span className="hidden min-[390px]:inline">Directions</span>
              </a>
              <button
                className="min-h-[50px] rounded-[12px] border border-[var(--sb-border)] bg-black/36 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[390px]:min-h-[52px]"
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
