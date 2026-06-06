"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import type { Offer } from "@/types/offer";

interface TabletFeaturedOfferProps {
  copyMessage: string;
  offer: Offer;
  onApplyOffer: (offer: Offer) => void;
  onViewOffer: (offer: Offer) => void;
}

const featurePoints = [
  {
    icon: "/assets/icons/golden-ticket-icon.png",
    label: "Member value",
  },
  {
    icon: "/assets/icons/clock-icon.png",
    label: "Limited time",
  },
  {
    icon: "/assets/icons/check-icon.png",
    label: "Checkout ready",
  },
] as const;

export function TabletFeaturedOffer({
  copyMessage,
  offer,
  onApplyOffer,
  onViewOffer,
}: TabletFeaturedOfferProps) {
  return (
    <article className="mt-3 grid min-h-[162px] grid-cols-[minmax(0,1fr)_230px] gap-4 rounded-[18px] border border-[var(--sb-gold)]/26 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-4 shadow-[0_18px_70px_rgba(0,0,0,0.32)] lg:mt-4 min-[1080px]:mt-5 min-[1080px]:min-h-[206px] min-[1080px]:grid-cols-[minmax(0,1fr)_310px] min-[1080px]:gap-6 min-[1080px]:p-6">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <StatusBadge tone="premium">Featured offer</StatusBadge>
          <StatusBadge tone={offer.accent === "premium" ? "danger" : "neutral"}>
            {offer.code}
          </StatusBadge>
        </div>
        <h2 className="editorial-title mt-3 text-[30px] leading-none text-white min-[1080px]:text-[40px]">
          {offer.title}
        </h2>
        <p className="mt-2 text-[15px] font-semibold text-[var(--sb-gold-soft)] min-[1080px]:text-[17px]">
          {offer.subtitle}
        </p>
        <p className="mt-2 line-clamp-2 max-w-[560px] text-[13px] leading-5 text-white/55 min-[1080px]:mt-3 min-[1080px]:text-[15px] min-[1080px]:leading-6">
          {offer.description}
        </p>
        <div className="mt-4 grid max-w-[590px] grid-cols-3 gap-3 border-t border-white/10 pt-3 min-[1080px]:mt-5 min-[1080px]:pt-4">
          {featurePoints.map((point) => (
            <div className="flex items-center gap-2" key={point.label}>
              <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/22 min-[1080px]:h-10 min-[1080px]:w-10">
                <AssetIcon size={18} src={point.icon} />
              </span>
              <span className="text-[11px] uppercase tracking-[0.08em] text-white/56 min-[1080px]:text-[12px]">
                {point.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid content-center gap-3">
        <div className="rounded-[14px] border border-white/10 bg-black/24 p-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Valid until
          </p>
          <p className="mt-2 text-[15px] text-white/78 min-[1080px]:text-[18px]">
            {formatDateTime(offer.expiresAt)}
          </p>
        </div>
        <Button
          className="red-glow-button h-[44px] rounded-[12px] text-[12px] uppercase tracking-[0.1em] min-[1080px]:h-[52px] min-[1080px]:text-[14px]"
          onClick={() => onApplyOffer(offer)}
        >
          {copyMessage || "Apply offer"}
        </Button>
        <button
          className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/62 transition hover:text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={() => onViewOffer(offer)}
          type="button"
        >
          View details
        </button>
      </div>
    </article>
  );
}
