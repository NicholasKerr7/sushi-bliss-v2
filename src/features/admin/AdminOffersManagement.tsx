"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { offers } from "@/data/offers";
import { formatDateTime } from "@/lib/dates";

export function AdminOffersManagement() {
  const [pausedOfferIds, setPausedOfferIds] = useState<string[]>([]);
  const [featuredOfferId, setFeaturedOfferId] = useState(offers[0]?.id || "");

  const toggleOffer = (offerId: string) => {
    setPausedOfferIds((current) =>
      current.includes(offerId)
        ? current.filter((id) => id !== offerId)
        : [...current, offerId],
    );
  };

  return (
    <Card className="p-5 md:p-6" id="offers-admin">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-sb-rice">
            Offers management
          </h2>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            Adjust member promotion visibility and featured placement.
          </p>
        </div>
        <StatusBadge tone="premium">{offers.length} promotions</StatusBadge>
      </div>

      <div className="mt-5 grid gap-3">
        {offers.map((offer) => {
          const paused = pausedOfferIds.includes(offer.id);
          const featured = featuredOfferId === offer.id;

          return (
            <div
              className="grid gap-4 rounded-card border border-sb-line bg-sb-ink/50 p-3 sm:grid-cols-[5rem_1fr_auto]"
              key={offer.id}
            >
              <div className="relative aspect-square overflow-hidden rounded-card bg-sb-panel-soft">
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
                <p className="mt-1 text-sm leading-6 text-sb-muted">
                  {offer.code} - {offer.subtitle} - Ends{" "}
                  {formatDateTime(offer.expiresAt)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <Button
                  aria-label={`${paused ? "Resume" : "Pause"} ${offer.title}`}
                  onClick={() => toggleOffer(offer.id)}
                  size="sm"
                  variant={paused ? "secondary" : "ghost"}
                >
                  {paused ? "Resume" : "Pause"}
                </Button>
                <Button
                  aria-label={`Feature ${offer.title}`}
                  disabled={featured}
                  onClick={() => setFeaturedOfferId(offer.id)}
                  size="sm"
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
