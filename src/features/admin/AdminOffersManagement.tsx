"use client";

import Image from "next/image";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { offers } from "@/data/offers";
import { formatDateTime } from "@/lib/dates";

export function AdminOffersManagement() {
  const [pausedOfferIds, setPausedOfferIds] = useState<string[]>([]);
  const [featuredOfferId, setFeaturedOfferId] = useState(offers[0]?.id || "");
  const featuredOffer = offers.find((offer) => offer.id === featuredOfferId);
  const liveOfferCount = offers.length - pausedOfferIds.length;
  const premiumOfferCount = offers.filter(
    (offer) => offer.accent === "premium",
  ).length;
  const offerSummary = [
    {
      detail: "Visible to members",
      icon: "/assets/icons/golden-ticket-icon.png",
      label: "Live",
      value: liveOfferCount,
    },
    {
      detail: "Premium creative",
      icon: "/assets/icons/lotus-crown-icon.png",
      label: "Premium",
      value: premiumOfferCount,
    },
    {
      detail: "Homepage placement",
      icon: "/assets/icons/star-icon.png",
      label: "Feature",
      value: featuredOffer?.code || "None",
    },
  ] as const;

  const toggleOffer = (offerId: string) => {
    setPausedOfferIds((current) =>
      current.includes(offerId)
        ? current.filter((id) => id !== offerId)
        : [...current, offerId],
    );
  };

  return (
    <Card className="overflow-hidden p-0" id="offers-admin">
      <div className="relative border-b border-white/10 bg-[radial-gradient(circle_at_14%_0%,rgba(215,168,79,0.12),transparent_34%),rgba(0,0,0,0.2)] p-5 md:p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.7),transparent)]"
        />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px] xl:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-sb-gold/30 bg-sb-gold/10">
                <AssetIcon
                  loading="eager"
                  size={26}
                  src="/assets/icons/golden-ticket-icon.png"
                />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sb-gold-soft">
                  Promotion studio
                </p>
                <h2 className="mt-1 text-xl font-semibold text-sb-rice">
                  Offers management
                </h2>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-sb-muted">
              Adjust member promotion visibility, premium creative, and the
              featured offer placement used across the customer app.
            </p>
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-[14px] border border-white/10 bg-black/24">
            {offerSummary.map((item, index) => (
              <div
                className="min-w-0 border-l border-white/10 px-3 py-3 first:border-l-0 sm:px-4"
                key={item.label}
              >
                <div className="flex items-center gap-2">
                  <AssetIcon size={18} src={item.icon} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                    {item.label}
                  </p>
                </div>
                <p
                  className={
                    index === 2
                      ? "mt-1 truncate text-sm font-semibold text-sb-gold-soft"
                      : "mt-1 font-mono text-lg font-semibold text-sb-rice"
                  }
                >
                  {item.value}
                </p>
                <p className="mt-0.5 hidden truncate text-[11px] text-sb-dim sm:block">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-4 md:p-5">
        {offers.map((offer) => {
          const paused = pausedOfferIds.includes(offer.id);
          const featured = featuredOfferId === offer.id;

          return (
            <div
              className="grid gap-4 rounded-[14px] border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] min-[900px]:grid-cols-[5rem_minmax(0,1fr)_236px] min-[900px]:items-center"
              key={offer.id}
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-[12px] border border-white/10 bg-sb-panel-soft">
                <Image
                  alt={offer.title}
                  className="object-cover"
                  fill
                  sizes="80px"
                  src={offer.imageUrl}
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-sb-rice">{offer.title}</p>
                  <StatusBadge tone={paused ? "warning" : "success"}>
                    {paused ? "Paused" : "Live"}
                  </StatusBadge>
                  {featured ? (
                    <StatusBadge tone="premium">Featured</StatusBadge>
                  ) : null}
                </div>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-sb-muted">
                  {offer.subtitle}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                  {offer.code} / Ends {formatDateTime(offer.expiresAt)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 min-[900px]:justify-end">
                <Button
                  aria-label={`${paused ? "Resume" : "Pause"} ${offer.title}`}
                  className="h-11 rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
                  onClick={() => toggleOffer(offer.id)}
                  size="sm"
                  variant={paused ? "secondary" : "ghost"}
                >
                  {paused ? "Resume" : "Pause"}
                </Button>
                <Button
                  aria-label={`Feature ${offer.title}`}
                  className="h-11 rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
                  disabled={featured}
                  onClick={() => setFeaturedOfferId(offer.id)}
                  size="sm"
                  variant={featured ? "ghost" : "primary"}
                >
                  {featured ? "Featured" : "Feature"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
