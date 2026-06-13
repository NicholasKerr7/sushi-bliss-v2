"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import type { RestaurantLocation } from "@/types/location";

const locationGallery = [
  "/assets/gallery/elegant-japanese-inspired-dining-room-interior.webp",
  "/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp",
  "/assets/gallery/serene-illuminated-courtyard-with-red-blossoms.webp",
] as const;

export function DesktopLocationDetail({
  cartCount,
  location,
  onBack,
}: {
  cartCount: number;
  location: RestaurantLocation;
  onBack: () => void;
}) {
  return (
    <section
      className="hidden min-h-dvh bg-[#030405] text-white xl:block"
      id="locations"
    >
      <DesktopMenuHeader activeId="contact" cartCount={cartCount} />
      <main className="mx-auto max-w-[1568px] px-5 pb-4">
        <div className="overflow-hidden rounded-b-[20px] border-x border-b border-[var(--sb-border)] bg-[#050607] shadow-[0_30px_90px_rgba(0,0,0,0.56)]">
          <div className="flex h-[58px] items-center gap-3 border-b border-white/10 px-9 text-[13px] uppercase tracking-[0.1em] text-white/46">
            <button
              className="text-[var(--sb-gold-soft)]"
              onClick={onBack}
              type="button"
            >
              Home
            </button>
            <ChevronIcon direction="right" size={18} />
            <button
              className="text-[var(--sb-gold-soft)]"
              onClick={onBack}
              type="button"
            >
              Locations
            </button>
            <ChevronIcon direction="right" size={18} />
            <span className="text-white">{location.neighborhood}</span>
          </div>

          <section className="grid grid-cols-[minmax(0,1fr)_440px] gap-5 px-9 py-6">
            <div className="grid gap-5">
              <article className="overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-[#07090a]">
                <div className="relative h-[330px]">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    priority
                    sizes="980px"
                    src={location.mapImageUrl}
                  />
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_290px] gap-5 p-6">
                  <div>
                    <p className="text-[15px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
                      Visit {location.neighborhood}
                    </p>
                    <h1 className="editorial-title mt-2 text-[54px] uppercase leading-none text-white">
                      {location.name}
                    </h1>
                    <p className="mt-4 max-w-[650px] text-[17px] leading-7 text-white/66">
                      {location.description}
                    </p>
                  </div>
                  <div className="rounded-[16px] border border-white/10 bg-black/28 p-5">
                    <h2 className="text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                      Location highlights
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {location.features.map((feature) => (
                        <span
                          className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white/58"
                          key={feature}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Button
                      className="mt-5 h-[50px] w-full rounded-[10px] text-[12px] uppercase tracking-[0.08em]"
                      href="/reservations"
                    >
                      Reserve here
                    </Button>
                  </div>
                </div>
              </article>

              <section className="grid grid-cols-3 gap-4">
                {locationGallery.map((image, index) => (
                  <article
                    className="relative h-[150px] overflow-hidden rounded-[16px] border border-white/10"
                    key={image}
                  >
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="300px"
                      src={image}
                    />
                  </article>
                ))}
              </section>
            </div>

            <aside className="grid gap-4">
              <section className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
                <h2 className="editorial-title text-[22px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Contact details
                </h2>
                {[
                  [
                    "Address",
                    location.address,
                    "/assets/icons/map-pin-icon.png",
                  ],
                  ["Phone", location.phone, "/assets/icons/phone-icon.png"],
                  ["Email", location.email, "/assets/icons/email-icon.png"],
                  ["Hours", location.hours, "/assets/icons/clock-icon.png"],
                ].map(([label, value, icon]) => (
                  <div
                    className="mt-4 grid grid-cols-[38px_1fr] items-start gap-3 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                    key={label}
                  >
                    <AssetIcon size={28} src={icon} />
                    <p>
                      <span className="block text-[12px] uppercase tracking-[0.08em] text-white/46">
                        {label}
                      </span>
                      <span className="mt-1 block text-[15px] leading-6 text-white/72">
                        {value}
                      </span>
                    </p>
                  </div>
                ))}
              </section>

              <section className="overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]">
                <div className="relative h-[176px]">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    loading="eager"
                    sizes="440px"
                    src="/assets/maps/map-route.webp"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    Delivery route
                  </h2>
                  <p className="mt-3 text-[14px] leading-6 text-white/62">
                    This location supports pickup, private dining arrivals, and
                    active delivery tracking.
                  </p>
                </div>
              </section>

              <section className="rounded-[18px] border border-[var(--sb-red)]/34 bg-[#130504] p-5">
                <h2 className="editorial-title text-[24px] uppercase leading-none text-white">
                  Plan your visit
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-white/62">
                  Add seating notes, occasion details, and dietary preferences
                  before confirmation.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Button
                    className="h-[48px] rounded-[10px] text-[12px] uppercase tracking-[0.08em]"
                    href="/reservations"
                  >
                    Reserve
                  </Button>
                  <Button
                    className="h-[48px] rounded-[10px] text-[12px] uppercase tracking-[0.08em]"
                    href="/support"
                    variant="secondary"
                  >
                    Concierge
                  </Button>
                </div>
              </section>
            </aside>
          </section>

          <div className="px-9 pb-5">
            <DesktopBenefitStrip />
          </div>
        </div>
      </main>
    </section>
  );
}
