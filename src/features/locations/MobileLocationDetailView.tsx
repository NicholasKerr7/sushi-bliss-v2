"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons } from "@/features/home/visualHomeData";
import type { RestaurantLocation } from "@/types/location";

import {
  getDirectionsUrl,
  getMobileLocationMeta,
  MobileDetailRow,
  MobileLocationsBackButton,
  MobileLocationsHeader,
} from "./MobileLocationsPrimitives";

interface MobileLocationDetailViewProps {
  cartCount: number;
  location: RestaurantLocation;
  onBack: () => void;
  onOpenCart: () => void;
  onOpenMap: () => void;
}

/** Mobile location detail view with directions, call, reservation, and loyalty actions. */
export function MobileLocationDetailView({
  cartCount,
  location,
  onBack,
  onOpenCart,
  onOpenMap,
}: MobileLocationDetailViewProps) {
  const meta = getMobileLocationMeta(location);
  const directionsUrl = getDirectionsUrl(location);

  return (
    <div className="mobile-frame relative z-10 pb-16">
      <MobileLocationsHeader cartCount={cartCount} onOpenCart={onOpenCart} />
      <div className="mt-5 grid grid-cols-[48px_1fr_48px] items-center min-[390px]:mt-7 min-[390px]:grid-cols-[52px_1fr_52px]">
        <MobileLocationsBackButton label="Back to locations" onClick={onBack} />
        <h1 className="editorial-title text-center text-[22px] uppercase tracking-[0.1em] text-white min-[390px]:text-[24px] min-[390px]:tracking-[0.12em]">
          Location Details
        </h1>
        <span aria-hidden="true" />
      </div>

      <section className="mt-5 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-black/42">
        <div className="relative h-[210px] min-[390px]:h-[250px]">
          <Image
            alt={`${location.name} map`}
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="430px"
            src={location.mapImageUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.2))]" />
          <button
            aria-label="Open map"
            className="absolute bottom-3 right-3 grid h-[52px] w-[52px] place-items-center rounded-[14px] border border-[var(--sb-border)] bg-black/62 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:bottom-4 min-[390px]:right-4 min-[390px]:h-[58px] min-[390px]:w-[58px] min-[390px]:rounded-[15px]"
            onClick={onOpenMap}
            type="button"
          >
            <AssetIcon size={28} src={icons.location} />
          </button>
        </div>
      </section>

      <section className="mt-4 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="relative min-h-[166px] p-4 min-[390px]:min-h-[198px] min-[390px]:p-5">
          <Image
            alt=""
            className="absolute inset-y-0 right-0 w-[48%] object-cover opacity-62"
            height={240}
            loading="eager"
            src={location.imageUrl}
            width={220}
          />
          <div className="absolute inset-y-0 right-0 w-[70%] bg-gradient-to-r from-transparent via-black/42 to-black/12" />
          <div className="relative z-10 max-w-[74%]">
            <p className="text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] min-[390px]:text-[14px] min-[390px]:tracking-[0.12em]">
              {location.neighborhood}
            </p>
            <h2 className="editorial-title mt-3 text-[28px] leading-[1.02] text-[var(--sb-gold-soft)] min-[390px]:mt-4 min-[390px]:text-[33px] min-[390px]:leading-[1.05]">
              {location.name}
            </h2>
            <p className="mt-3 text-[13px] leading-5 text-white/70 min-[390px]:mt-4 min-[390px]:text-[15px] min-[390px]:leading-6">
              {location.address}
            </p>
          </div>
        </div>

        <div className="divide-y divide-white/10 px-4 pb-2">
          <MobileDetailRow
            icon={icons.clock}
            label="Opening hours"
            supporting={location.hours}
            value="Daily service"
          />
          <MobileDetailRow
            icon="/assets/icons/phone-icon.png"
            label="Call"
            supporting={location.phone}
            value="Reservations and private events"
          />
          <MobileDetailRow
            icon={icons.location}
            label="Access"
            supporting={meta.access}
            value={meta.distance}
          />
          <MobileDetailRow
            icon={icons.bag}
            label="Parking"
            supporting={meta.parking}
            value="Arrival"
          />
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <a
          className="red-glow-button flex min-h-[58px] items-center justify-center gap-2 rounded-[13px] text-[11px] uppercase tracking-[0.05em] min-[390px]:min-h-[72px] min-[390px]:gap-3 min-[390px]:rounded-[14px] min-[390px]:text-[14px] min-[390px]:tracking-[0.08em]"
          href={directionsUrl}
          rel="noreferrer"
          target="_blank"
        >
          <AssetIcon size={26} src={icons.location} />
          Get directions
        </a>
        <a
          className="flex min-h-[58px] items-center justify-center gap-2 rounded-[13px] border border-[var(--sb-border)] bg-black/42 text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:min-h-[72px] min-[390px]:gap-3 min-[390px]:rounded-[14px] min-[390px]:text-[14px] min-[390px]:tracking-[0.08em]"
          href={`tel:${location.phone.replaceAll(" ", "")}`}
        >
          <AssetIcon size={26} src="/assets/icons/phone-icon.png" />
          Call
        </a>
      </div>

      <Link
        className="red-glow-button mt-4 flex min-h-[60px] w-full items-center justify-center gap-2.5 rounded-[13px] text-[13px] uppercase tracking-[0.06em] min-[390px]:min-h-[72px] min-[390px]:gap-4 min-[390px]:rounded-[14px] min-[390px]:text-[16px] min-[390px]:tracking-[0.08em]"
        href={`/reservations?location=${encodeURIComponent(location.id)}`}
      >
        <AssetIcon size={27} src={icons.calendar} />
        Reserve this location
      </Link>

      <Link
        className="mt-4 flex min-h-[96px] items-center gap-4 rounded-[16px] border border-[var(--sb-border)] bg-black/42 p-4"
        href="/loyalty"
      >
        <span className="grid h-[56px] w-[56px] shrink-0 place-items-center rounded-full border border-[var(--sb-border)] bg-black/42">
          <AssetIcon size={36} src={brand.assets.floralEmblem.publicUrl} />
        </span>
        <span className="min-w-0">
          <span className="block text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Earn points at this location
          </span>
          <span className="mt-2 block text-[14px] text-white/58">
            Scan in-store to earn Bliss Points.
          </span>
        </span>
      </Link>
    </div>
  );
}
