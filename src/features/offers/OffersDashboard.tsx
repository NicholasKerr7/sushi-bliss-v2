"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { offers } from "@/data/offers";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { formatDateTime } from "@/lib/dates";
import {
  getOfferStatusLabel,
  getOfferTone,
  isOfferExpired,
  sortOffersByAvailability,
} from "@/lib/offers";
import type { Offer } from "@/types/offer";

import { MobileOffersDashboard } from "./MobileOffersDashboard";
import { OfferDetailModal } from "./OfferDetailModal";
import { TabletOffersDashboard } from "./TabletOffersDashboard";

export function OffersDashboard() {
  const mode = useResponsiveMode();
  const currentTime = useMemo(() => new Date().getTime(), []);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const sortedOffers = useMemo(
    () => sortOffersByAvailability(offers, currentTime),
    [currentTime],
  );

  if (mode === "mobile") {
    return <MobileOffersDashboard />;
  }

  if (mode === "tablet") {
    return <TabletOffersDashboard />;
  }

  return (
    <section
      className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16"
      id="offers"
    >
      <PageContainer>
        <SectionHeader
          eyebrow={<Badge tone="premium">Offers</Badge>}
          subtitle="Member promotions, referral credits, and copyable offer codes."
          title="Offers and referrals"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedOffers.map((offer, index) => (
            <Card className="overflow-hidden" key={offer.id}>
              <div className="relative aspect-[4/3] bg-sb-panel-soft">
                <Image
                  alt={offer.title}
                  className="object-cover"
                  fetchPriority={index < 3 ? "high" : "auto"}
                  fill
                  loading={index < 3 ? "eager" : "lazy"}
                  priority={index < 3}
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                  src={offer.imageUrl}
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={getOfferTone(offer, currentTime)}>
                    {getOfferStatusLabel(offer, currentTime)}
                  </StatusBadge>
                  <StatusBadge
                    tone={offer.accent === "premium" ? "premium" : "neutral"}
                  >
                    {offer.code}
                  </StatusBadge>
                  <StatusBadge tone="warning">
                    {formatDateTime(offer.expiresAt)}
                  </StatusBadge>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-sb-rice">
                  {offer.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-sb-gold-soft">
                  {offer.subtitle}
                </p>
                <p className="mt-3 text-sm leading-6 text-sb-muted">
                  {offer.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button onClick={() => setSelectedOffer(offer)} size="sm">
                    Details
                  </Button>
                  <Button
                    disabled={isOfferExpired(offer, currentTime)}
                    href="/menu"
                    size="sm"
                    variant="ghost"
                  >
                    Order
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>

      <OfferDetailModal
        currentTime={currentTime}
        offer={selectedOffer}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedOffer(null);
          }
        }}
      />
    </section>
  );
}
