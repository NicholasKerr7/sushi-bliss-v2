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
    <article className="grid grid-cols-[156px_minmax(0,1fr)_154px] gap-3 rounded-[16px] border border-[var(--sb-red)]/26 bg-white/[0.04] p-3 min-[1080px]:grid-cols-[260px_minmax(0,1fr)_220px] min-[1080px]:gap-5 min-[1080px]:rounded-[18px] min-[1080px]:p-4">
      <div className="relative min-h-[146px] overflow-hidden rounded-[10px] bg-black/30 min-[1080px]:min-h-[190px] min-[1080px]:rounded-[12px]">
        <Image
          alt={`${location.name} map preview`}
          className="object-cover"
          fill
          loading={imagePriority ? "eager" : "lazy"}
          priority={imagePriority}
          sizes="300px"
          src={location.mapImageUrl}
        />
      </div>

      <div className="grid min-w-0 gap-3 py-1 min-[1080px]:grid-cols-[minmax(0,1fr)_180px] min-[1080px]:gap-4 min-[1080px]:py-2">
        <div>
          {featured ? <StatusBadge tone="danger">Flagship</StatusBadge> : null}
          <h2 className="editorial-title mt-2 text-[23px] leading-[1.04] text-white min-[1080px]:mt-3 min-[1080px]:text-[28px] min-[1080px]:leading-normal">
            {location.name}
          </h2>
          <p className="mt-2 text-[13px] leading-5 text-white/58 min-[1080px]:text-[15px] min-[1080px]:leading-6">
            {location.address}
          </p>
          <p className="mt-2 flex items-center gap-2 text-[12px] text-white/54 min-[1080px]:mt-4 min-[1080px]:text-[14px]">
            <AssetIcon size={18} src="/assets/icons/phone-icon.png" />
            {location.phone}
          </p>
          <a
            className="mt-1 inline-flex min-h-10 items-center gap-2 rounded-full pr-3 text-[12px] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[1080px]:mt-2 min-[1080px]:text-[14px]"
            href={directionsUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <AssetIcon size={18} src={icons.location} />
            Get directions
          </a>
        </div>

        <div className="border-white/10 min-[1080px]:border-l min-[1080px]:pl-6">
          <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[1080px]:text-[15px]">
            <AssetIcon size={20} src={icons.clock} />
            Hours
          </p>
          <p className="mt-1 text-[12px] leading-5 text-white/58 min-[1080px]:mt-3 min-[1080px]:text-[14px] min-[1080px]:leading-6">
            {location.hours}
          </p>
          <div className="mt-2 hidden flex-wrap gap-2 min-[1080px]:mt-4 min-[1080px]:flex">
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

      <div className="grid min-w-0 content-center gap-2 min-[1080px]:gap-3">
        <div className="relative h-[78px] overflow-hidden rounded-[9px] border border-white/10 bg-black/30 min-[1080px]:h-[132px] min-[1080px]:rounded-[10px]">
          <Image
            alt={`${location.name} map`}
            className="object-cover"
            fill
            loading={imagePriority ? "eager" : "lazy"}
            priority={imagePriority}
            sizes="260px"
            src={location.mapImageUrl}
          />
        </div>
        {featured ? (
          <Button
            className="red-glow-button h-[44px] rounded-[11px] text-[12px] uppercase tracking-[0.08em] min-[1080px]:h-[52px] min-[1080px]:rounded-[12px] min-[1080px]:text-[14px]"
            href="/reservations"
          >
            Reserve here
          </Button>
        ) : (
          <Button
            className="h-[44px] rounded-[11px] text-[12px] uppercase tracking-[0.08em] min-[1080px]:h-[52px] min-[1080px]:rounded-[12px] min-[1080px]:text-[14px]"
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
