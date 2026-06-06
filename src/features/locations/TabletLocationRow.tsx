"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { icons } from "@/features/home/visualHomeData";
import type { RestaurantLocation } from "@/types/location";

interface TabletLocationRowProps {
  featured: boolean;
  imagePriority: boolean;
  location: RestaurantLocation;
  onViewDetails: (location: RestaurantLocation) => void;
}

export function TabletLocationRow({
  featured,
  imagePriority,
  location,
  onViewDetails,
}: TabletLocationRowProps) {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.name} ${location.address}`,
  )}`;

  return (
    <article className="grid gap-5 rounded-[18px] border border-[var(--sb-red)]/26 bg-white/[0.04] p-4 lg:grid-cols-[300px_1fr_260px]">
      <div className="relative min-h-[190px] overflow-hidden rounded-[12px] bg-black/30">
        <Image
          alt={location.name}
          className="object-cover"
          fill
          loading={imagePriority ? "eager" : "lazy"}
          preload={imagePriority}
          sizes="300px"
          src={location.imageUrl}
        />
      </div>

      <div className="grid gap-4 py-2 lg:grid-cols-[1fr_220px]">
        <div>
          {featured ? <StatusBadge tone="danger">Flagship</StatusBadge> : null}
          <h2 className="editorial-title mt-3 text-[28px] text-white">
            {location.name}
          </h2>
          <p className="mt-2 text-[15px] leading-6 text-white/58">
            {location.address}
          </p>
          <p className="mt-4 flex items-center gap-2 text-[14px] text-white/54">
            <AssetIcon size={18} src="/assets/icons/phone-icon.png" />
            {location.phone}
          </p>
          <a
            className="mt-2 inline-flex items-center gap-2 text-[14px] text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            href={directionsUrl}
            rel="noreferrer"
            target="_blank"
          >
            <AssetIcon size={18} src={icons.location} />
            Get directions
          </a>
        </div>

        <div className="border-white/10 lg:border-l lg:pl-6">
          <p className="flex items-center gap-2 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            <AssetIcon size={20} src={icons.clock} />
            Hours
          </p>
          <p className="mt-3 text-[14px] leading-6 text-white/58">
            {location.hours}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {location.features.slice(0, 3).map((feature) => (
              <span
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] text-white/52"
                key={feature}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid content-center gap-3">
        <div className="relative h-[132px] overflow-hidden rounded-[10px] border border-white/10 bg-black/30">
          <Image
            alt={`${location.name} map`}
            className="object-cover"
            fill
            loading={imagePriority ? "eager" : "lazy"}
            preload={imagePriority}
            sizes="260px"
            src={location.mapImageUrl}
          />
          <span className="absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--sb-red)] shadow-[0_0_24px_rgba(238,43,36,0.55)]">
            <AssetIcon size={18} src={icons.location} />
          </span>
        </div>
        {featured ? (
          <Button
            className="red-glow-button h-[52px] rounded-[12px] uppercase tracking-[0.08em]"
            href="/reservations"
          >
            Reserve here
          </Button>
        ) : (
          <Button
            className="h-[52px] rounded-[12px] uppercase tracking-[0.08em]"
            onClick={() => onViewDetails(location)}
            variant="secondary"
          >
            View details
          </Button>
        )}
      </div>
    </article>
  );
}
