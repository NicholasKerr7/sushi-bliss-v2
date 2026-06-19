"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import type { RestaurantLocation } from "@/types/location";

interface DesktopLocationsDirectoryProps {
  cartCount: number;
  locations: RestaurantLocation[];
  onViewDetails: (location: RestaurantLocation) => void;
}

const comparisonRows = [
  ["Best for", "Celebrations", "Chef counter", "Rooftop dates"],
  ["Signature", "Garden dining", "Late-night nigiri", "Skyline omakase"],
  ["Seating", "Groups up to 10", "Counter for 14", "Private booths"],
] as const;

const featuredOrder = [
  "kintsugi-courtyard",
  "sushi-bar",
  "tokyo-rooftop",
] as const;

export function DesktopLocationsDirectory({
  cartCount,
  locations,
  onViewDetails,
}: DesktopLocationsDirectoryProps) {
  const orderedLocations = [...locations].sort(
    (a, b) =>
      featuredOrder.indexOf(a.id as (typeof featuredOrder)[number]) -
      featuredOrder.indexOf(b.id as (typeof featuredOrder)[number]),
  );
  const downtown = orderedLocations[0] || locations[0];

  return (
    <section
      className="hidden min-h-dvh bg-[#030405] text-white xl:block"
      id="locations"
    >
      <DesktopMenuHeader activeId="locations" cartCount={cartCount} />
      <main className="mx-auto max-w-[1568px] px-5 pb-3 pt-0">
        <div className="overflow-hidden rounded-b-[20px] border-x border-b border-[var(--sb-border)] bg-[#050607] shadow-[0_30px_90px_rgba(0,0,0,0.56)]">
          <section className="relative min-h-[254px] border-b border-white/10 px-16 py-8">
            <Image
              alt=""
              className="object-cover object-center opacity-60"
              fill
              loading="eager"
              priority
              sizes="1568px"
              src="/assets/maps/map-location.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.98)_0%,rgba(3,4,5,0.78)_40%,rgba(3,4,5,0.34)_100%)]" />
            <div className="relative z-10 flex min-h-[190px] max-w-[760px] flex-col justify-center">
              <p className="text-[16px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
                Tokyo dining rooms
              </p>
              <h1 className="editorial-title mt-3 text-[64px] uppercase leading-[0.9] text-white">
                Our
                <span className="block text-[var(--sb-red-bright)]">
                  Locations
                </span>
              </h1>
              <p className="mt-5 max-w-[560px] text-[17px] leading-7 text-white/72">
                Choose from an intimate sushi counter, skyline omakase lounge,
                or celebration-ready courtyard dining room.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-[minmax(0,1fr)_442px] gap-5 px-9 py-5">
            <div className="grid gap-5">
              <div className="grid grid-cols-3 gap-4">
                {orderedLocations.map((location, index) => (
                  <LocationFeatureCard
                    imagePriority={index < 3}
                    key={location.id}
                    location={location}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>

              <section className="overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88">
                <div className="grid grid-cols-[312px_1fr]">
                  <div className="relative min-h-[286px]">
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      sizes="312px"
                      src="/assets/maps/map-route.webp"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                      Find your perfect experience
                    </h2>
                    <div className="mt-5 overflow-hidden rounded-[12px] border border-white/10">
                      <div className="grid grid-cols-4 bg-white/[0.04] px-4 py-3 text-[11px] uppercase tracking-[0.1em] text-white/44">
                        <span>Compare</span>
                        {orderedLocations.map((location) => (
                          <span key={location.id}>{location.neighborhood}</span>
                        ))}
                      </div>
                      {comparisonRows.map(
                        ([label, downtownValue, bar, roof]) => (
                          <div
                            className="grid grid-cols-4 border-t border-white/10 px-4 py-4 text-[13px] text-white/64"
                            key={label}
                          >
                            <span className="text-white/84">{label}</span>
                            <span>{downtownValue}</span>
                            <span>{bar}</span>
                            <span>{roof}</span>
                          </div>
                        ),
                      )}
                    </div>
                    <div className="mt-5 flex gap-3">
                      <Button className="h-10" href="/reservations" size="sm">
                        Reserve a table
                      </Button>
                      <Button
                        className="h-10"
                        disabled={!downtown}
                        onClick={() => {
                          if (downtown) {
                            onViewDetails(downtown);
                          }
                        }}
                        size="sm"
                        variant="secondary"
                      >
                        View downtown
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="grid gap-4">
              <section className="overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88">
                <div className="relative h-[292px]">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    loading="eager"
                    priority
                    sizes="442px"
                    src="/assets/maps/map-location.webp"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    Tokyo map
                  </h2>
                  <p className="mt-3 text-[13px] leading-6 text-white/62">
                    All dining rooms are positioned for easy transfers between
                    Ginza, Shibuya, Chuo City, and Tokyo Bay.
                  </p>
                </div>
              </section>

              <section className="relative overflow-hidden rounded-[18px] border border-[var(--sb-red)]/36 bg-[#130504] p-5">
                <Image
                  alt=""
                  className="object-cover opacity-36"
                  fill
                  sizes="442px"
                  src="/assets/gallery/serene-illuminated-courtyard-with-red-blossoms.webp"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,5,4,0.96)_0%,rgba(19,5,4,0.56)_100%)]" />
                <div className="relative z-10">
                  <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                    Private dining
                  </p>
                  <h2 className="editorial-title mt-2 text-[34px] uppercase leading-none text-white">
                    Reserve a
                    <span className="block text-[var(--sb-red-bright)]">
                      celebration
                    </span>
                  </h2>
                  <p className="mt-4 text-[13px] leading-6 text-white/66">
                    Concierge seating, chef menu planning, and custom occasion
                    notes for private dining.
                  </p>
                  <Link
                    className="mt-5 inline-flex min-h-10 items-center rounded-full px-3 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                    href="/reservations"
                  >
                    Plan event
                  </Link>
                </div>
              </section>

              <section className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
                <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Location amenities
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    ["Valet", "delivery-scooter-icon.png"],
                    ["Chef counter", "chef-crest-icon.png"],
                    ["Gift pickup", "gift-icon.png"],
                    ["Private rooms", "lotus-crown-icon.png"],
                  ].map(([label, icon]) => (
                    <div
                      className="grid grid-cols-[34px_1fr] items-center gap-3 rounded-[10px] border border-white/10 bg-black/22 p-3"
                      key={label}
                    >
                      <AssetIcon size={28} src={`/assets/icons/${icon}`} />
                      <span className="text-[12px] uppercase tracking-[0.08em] text-white/62">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          <div className="px-9 pb-4">
            <DesktopBenefitStrip />
          </div>
        </div>
      </main>
    </section>
  );
}

function LocationFeatureCard({
  imagePriority,
  location,
  onViewDetails,
}: {
  imagePriority: boolean;
  location: RestaurantLocation;
  onViewDetails: (location: RestaurantLocation) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88">
      <div className="relative h-[178px]">
        <Image
          alt={`${location.name} map preview`}
          className="object-cover"
          fill
          loading={imagePriority ? "eager" : "lazy"}
          priority={imagePriority}
          sizes="340px"
          src={location.mapImageUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.74))]" />
        <p className="absolute bottom-4 left-4 text-[12px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          {location.neighborhood}
        </p>
      </div>
      <div className="p-5">
        <h2 className="editorial-title text-[24px] uppercase leading-tight text-white">
          {location.name}
        </h2>
        <p className="mt-3 min-h-[72px] text-[13px] leading-6 text-white/58">
          {location.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {location.features.slice(0, 3).map((feature) => (
            <span
              className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white/50"
              key={feature}
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button className="h-10" href="/reservations" size="sm">
            Reserve
          </Button>
          <Button
            className="h-10"
            onClick={() => onViewDetails(location)}
            size="sm"
            variant="secondary"
          >
            Details
          </Button>
        </div>
      </div>
    </article>
  );
}
