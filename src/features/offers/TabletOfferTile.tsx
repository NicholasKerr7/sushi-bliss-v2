"use client";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import {
  getOfferStatusLabel,
  getOfferTone,
  isOfferExpired,
} from "@/lib/offers";
import type { Offer } from "@/types/offer";

interface TabletOfferTileProps {
  currentTime: number;
  imagePriority: boolean;
  offer: Offer;
  onApplyOffer: (offer: Offer) => void;
  onViewOffer: (offer: Offer) => void;
}

export function TabletOfferTile({
  currentTime,
  imagePriority,
  offer,
  onApplyOffer,
  onViewOffer,
}: TabletOfferTileProps) {
  const expired = isOfferExpired(offer, currentTime);

  return (
    <article className="grid min-h-[112px] grid-cols-[76px_minmax(0,1fr)] overflow-hidden rounded-[15px] border border-[var(--sb-gold)]/22 bg-white/[0.04] lg:min-h-[118px] lg:grid-cols-[108px_minmax(0,1fr)] min-[1080px]:min-h-[150px] min-[1080px]:grid-cols-[156px_minmax(0,1fr)]">
      <div className="relative min-h-full bg-black/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={offer.title}
          className="h-full w-full object-cover"
          fetchPriority={imagePriority ? "high" : "auto"}
          loading={imagePriority ? "eager" : "lazy"}
          src={offer.imageUrl}
        />
      </div>
      <div className="grid min-w-0 content-between gap-2 p-2.5 lg:p-3 min-[1080px]:p-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge
              className="px-1.5 py-0.5 text-[9px] lg:px-2 lg:text-[10px]"
              tone={getOfferTone(offer, currentTime)}
            >
              {expired ? getOfferStatusLabel(offer, currentTime) : offer.code}
            </StatusBadge>
          </div>
          <h3 className="mt-1.5 line-clamp-2 text-[12px] font-semibold uppercase tracking-[0.02em] text-white lg:mt-2 lg:text-[16px] min-[1080px]:text-[18px]">
            {offer.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-[10px] leading-4 text-white/56 lg:line-clamp-2 lg:text-[12px] lg:leading-5 min-[1080px]:text-[13px]">
            {offer.subtitle}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="hidden text-[11px] text-white/46 lg:inline min-[1080px]:text-[12px]">
            {formatDateTime(offer.expiresAt)}
          </span>
          <Button
            className="h-8 min-h-0 rounded-[9px] px-2 text-[10px] uppercase tracking-[0.08em] lg:h-9 lg:rounded-[10px] lg:px-3 lg:text-[11px]"
            disabled={expired}
            onClick={() => {
              if (expired) {
                return;
              }

              if (offer.accent === "premium") {
                onViewOffer(offer);
                return;
              }

              onApplyOffer(offer);
            }}
            size="sm"
            variant={
              expired
                ? "ghost"
                : offer.accent === "premium"
                  ? "secondary"
                  : "primary"
            }
          >
            {expired
              ? "Expired"
              : offer.accent === "premium"
                ? "View"
                : "Apply"}
          </Button>
        </div>
      </div>
    </article>
  );
}
