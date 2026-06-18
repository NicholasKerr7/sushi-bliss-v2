"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/dates";
import { isOfferExpired } from "@/lib/offers";
import type { Offer } from "@/types/offer";

interface TabletFeaturedOfferProps {
  copyMessage: string;
  currentTime: number;
  offer: Offer;
  onApplyOffer: (offer: Offer) => void;
  onViewOffer: (offer: Offer) => void;
}

const featurePoints = [
  {
    icon: "/assets/icons/takeaway-bag-icon.png",
    label: "All menu items",
    value: "20% off",
  },
  {
    icon: "/assets/icons/golden-ticket-icon.png",
    label: "Order value",
    value: "No minimum",
  },
  {
    icon: "/assets/icons/clock-icon.png",
    label: "Special offer",
    value: "Limited time",
  },
] as const;

export function TabletFeaturedOffer({
  copyMessage,
  currentTime,
  offer,
  onApplyOffer,
  onViewOffer,
}: TabletFeaturedOfferProps) {
  const expired = isOfferExpired(offer, currentTime);

  return (
    <article className="mt-2 grid h-[264px] grid-cols-[minmax(0,1fr)_310px] gap-8 overflow-hidden rounded-[14px] border border-[var(--sb-gold)]/26 bg-[linear-gradient(135deg,rgba(13,22,23,0.98),rgba(7,8,9,0.98))] px-8 py-5 shadow-[0_18px_70px_rgba(0,0,0,0.32)]">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <span className="rounded-[5px] bg-[linear-gradient(180deg,var(--sb-gold-soft),var(--sb-gold))] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-black">
            Featured offer
          </span>
        </div>
        <h2 className="editorial-title mt-4 text-[38px] uppercase leading-none tracking-[0.08em] text-white">
          {offer.title}
        </h2>
        <p className="mt-2 text-[17px] font-semibold text-[var(--sb-gold-soft)]">
          {offer.subtitle}
        </p>
        <p className="mt-3 line-clamp-2 max-w-[560px] text-[14px] leading-6 text-white/56">
          {offer.description}
        </p>
        <div className="mt-5 grid max-w-[590px] grid-cols-3 gap-3 border-t border-white/10 pt-4">
          {featurePoints.map((point) => (
            <div className="flex items-center gap-3" key={point.label}>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/22">
                <AssetIcon size={20} src={point.icon} />
              </span>
              <span>
                <span className="block text-[13px] font-semibold text-white">
                  {point.value}
                </span>
                <span className="mt-1 block text-[12px] text-white/52">
                  {point.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid content-center justify-items-stretch gap-4">
        <span className="justify-self-end rounded-[5px] border border-[var(--sb-red)]/42 bg-[var(--sb-red)]/18 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-red-bright)]">
          Exclusive
        </span>
        <div className="px-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Valid until
          </p>
          <p className="mt-3 flex items-center gap-3 text-[18px] text-white/78">
            <AssetIcon size={21} src="/assets/icons/calendar-icon.png" />
            <span>{formatDateTime(offer.expiresAt)}</span>
          </p>
        </div>
        <Button
          className="red-glow-button h-[54px] rounded-[9px] text-[15px] uppercase tracking-[0.08em]"
          disabled={expired}
          onClick={() => onApplyOffer(offer)}
        >
          {expired ? "Expired" : copyMessage || "Apply offer"}
        </Button>
        <button
          className="inline-flex min-h-10 items-center justify-center gap-3 rounded-full px-2 text-[13px] uppercase tracking-[0.08em] text-white/62 transition hover:bg-white/5 hover:text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={() => onViewOffer(offer)}
          type="button"
        >
          View details
          <ChevronIcon direction="right" size={17} />
        </button>
      </div>
    </article>
  );
}
