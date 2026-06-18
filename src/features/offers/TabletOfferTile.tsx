"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/dates";
import { getOfferStatusLabel, isOfferExpired } from "@/lib/offers";
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
  const primaryAction = !expired && offer.accent !== "premium";

  return (
    <article className="grid h-[184px] grid-cols-[150px_minmax(0,1fr)] overflow-hidden rounded-[14px] border border-[var(--sb-gold)]/24 bg-[linear-gradient(135deg,rgba(13,22,23,0.96),rgba(9,10,11,0.98))]">
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
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_126px] gap-3 p-4">
        <div className="min-w-0">
          <span
            className={
              expired
                ? "inline-flex rounded-[5px] border border-white/14 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/48"
                : offer.accent === "premium"
                  ? "inline-flex rounded-[5px] bg-[linear-gradient(180deg,var(--sb-gold-soft),var(--sb-gold))] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-black"
                  : "inline-flex rounded-[5px] border border-[var(--sb-red)]/40 bg-[var(--sb-red)]/22 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--sb-red-bright)]"
            }
          >
            {expired ? getOfferStatusLabel(offer, currentTime) : offer.code}
          </span>
          <h3 className="editorial-title mt-3 line-clamp-2 text-[19px] uppercase leading-[1.08] tracking-[0.05em] text-white">
            {offer.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-white/62">
            {offer.subtitle}
          </p>
        </div>
        <div className="grid content-end justify-items-stretch gap-3">
          <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
            <span className="flex items-center gap-2">
              <AssetIcon size={16} src="/assets/icons/calendar-icon.png" />
              Valid until
            </span>
            <span className="mt-1 block text-[15px] normal-case tracking-normal text-white/78">
              {formatDateTime(offer.expiresAt)}
            </span>
          </span>
          <Button
            className={
              primaryAction
                ? "red-glow-button h-10 min-h-10 whitespace-nowrap rounded-[8px] px-3 text-[12px] uppercase tracking-[0.08em]"
                : "h-10 min-h-10 whitespace-nowrap rounded-[8px] px-3 text-[12px] uppercase tracking-[0.08em]"
            }
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
                ? "Learn more"
                : "Apply"}
          </Button>
        </div>
      </div>
    </article>
  );
}
