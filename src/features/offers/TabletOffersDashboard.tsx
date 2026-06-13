"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { offers } from "@/data/offers";
import {
  isOfferExpired,
  offerMatchesQuery,
  sortOffersByAvailability,
} from "@/lib/offers";
import type { Offer } from "@/types/offer";

import { TabletFeaturedOffer } from "./TabletFeaturedOffer";
import { TabletOffersBottomNav } from "./TabletOffersBottomNav";
import { TabletOfferDetailView } from "./TabletOfferDetailView";
import { TabletOffersHeader } from "./TabletOffersHeader";
import { TabletOfferTile } from "./TabletOfferTile";

const tabletOfferOrder = [
  "spicy-tuna-roll",
  "double-points",
  "birthday-treat",
  "weekend-special",
  "early-lunch",
  "omakase-preview",
] as const;

export function TabletOffersDashboard() {
  const [query, setQuery] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [copyMessage, setCopyMessage] = useState("");
  const currentTime = useMemo(() => new Date().getTime(), []);
  const sortedOffers = useMemo(
    () => sortOffersByAvailability(offers, currentTime),
    [currentTime],
  );
  const featuredOffer =
    sortedOffers.find(
      (offer) =>
        offer.accent === "premium" && !isOfferExpired(offer, currentTime),
    ) || sortedOffers[0];
  const normalizedQuery = query.trim().toLowerCase();

  const visibleOffers = useMemo(() => {
    if (!normalizedQuery) {
      return sortedOffers
        .filter((offer) => offer.id !== featuredOffer?.id)
        .sort(
          (first, second) =>
            getTabletOfferOrderIndex(first.id) -
            getTabletOfferOrderIndex(second.id),
        );
    }

    return sortedOffers.filter((offer) => offerMatchesQuery(offer, query));
  }, [featuredOffer?.id, normalizedQuery, query, sortedOffers]);

  const handleApplyOffer = async (offer: Offer) => {
    if (isOfferExpired(offer, currentTime)) {
      setCopyMessage(`${offer.code} expired`);
      return;
    }

    try {
      await navigator.clipboard.writeText(offer.code);
      setCopyMessage(`${offer.code} copied`);
    } catch {
      setCopyMessage(`${offer.code} ready`);
    }
  };

  if (selectedOffer) {
    return (
      <TabletOfferDetailView
        copyMessage={copyMessage}
        currentTime={currentTime}
        offer={selectedOffer}
        onApplyOffer={handleApplyOffer}
        onBack={() => {
          setSelectedOffer(null);
          setCopyMessage("");
        }}
      />
    );
  }

  return (
    <section
      className="flex min-h-dvh flex-col bg-[#050607] px-[26px] pt-0 text-white"
      id="offers"
    >
      <TabletOffersHeader
        onClearQuery={() => setQuery("")}
        onQueryChange={setQuery}
        query={query}
      />

      <main className="mx-auto w-full max-w-[1034px]">
        <section className="relative min-h-[248px] overflow-hidden bg-black/20">
          <Image
            alt=""
            className="translate-x-[28%] scale-[1.05] object-cover object-center opacity-92"
            fill
            loading="eager"
            priority
            sizes="1034px"
            src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
            unoptimized
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,1),rgba(5,6,7,0.84)_34%,rgba(5,6,7,0.18)_67%,rgba(5,6,7,0.66)),linear-gradient(180deg,rgba(5,6,7,0.15),rgba(5,6,7,0.96))]" />
          <div className="relative z-10 flex min-h-[248px] flex-col justify-center px-8">
            <h1 className="editorial-title text-[62px] leading-[0.94] text-white">
              Promotions
              <br />
              <span className="text-[var(--sb-red-bright)]">& Offers</span>
            </h1>
            <p className="mt-5 max-w-[360px] text-[19px] leading-7 text-white/62">
              Exclusive offers crafted to elevate your Sushi Bliss experience.
            </p>
          </div>
        </section>

        {featuredOffer ? (
          <TabletFeaturedOffer
            copyMessage={copyMessage}
            currentTime={currentTime}
            offer={featuredOffer}
            onApplyOffer={handleApplyOffer}
            onViewOffer={setSelectedOffer}
          />
        ) : null}

        <section className="mt-3 lg:mt-4 min-[1080px]:mt-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
                Current offers
              </p>
              {query ? (
                <p className="mt-1 text-[12px] text-white/46">
                  Showing {visibleOffers.length} result
                  {visibleOffers.length === 1 ? "" : "s"}
                </p>
              ) : null}
            </div>
            <button
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-red-bright)] transition hover:text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={() => setQuery("")}
              type="button"
            >
              View all offers
              <ChevronIcon direction="right" size={18} />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-4">
            {visibleOffers.length > 0 ? (
              visibleOffers.map((offer, index) => (
                <TabletOfferTile
                  imagePriority={index < 4}
                  currentTime={currentTime}
                  key={offer.id}
                  offer={offer}
                  onApplyOffer={handleApplyOffer}
                  onViewOffer={setSelectedOffer}
                />
              ))
            ) : (
              <div className="col-span-2">
                <EmptyState
                  action={
                    <Button onClick={() => setQuery("")} variant="secondary">
                      Clear search
                    </Button>
                  }
                  message="Try a different code, reward, or offer name."
                  title="No matching offers"
                />
              </div>
            )}
          </div>
        </section>

        <section className="mt-5 grid grid-cols-[auto_minmax(0,1fr)_280px] items-center gap-4 rounded-[14px] border border-white/10 bg-white/[0.04] px-7 py-5">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/28 min-[1080px]:h-14 min-[1080px]:w-14">
            <AssetIcon size={30} src="/assets/icons/gift-icon.png" />
          </span>
          <div>
            <h2 className="text-[16px] font-semibold text-white min-[1080px]:text-[18px]">
              Don&apos;t miss out
            </h2>
            <p className="mt-1 text-[13px] text-white/50 min-[1080px]:text-[14px]">
              New offers are added regularly. Check back often for exclusive
              deals.
            </p>
          </div>
          <Button
            className="red-glow-button h-[44px] rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
            href="/notifications"
          >
            Enable notifications
          </Button>
        </section>
      </main>

      <TabletOffersBottomNav />
    </section>
  );
}

function getTabletOfferOrderIndex(offerId: string) {
  const index = tabletOfferOrder.indexOf(
    offerId as (typeof tabletOfferOrder)[number],
  );

  return index === -1 ? tabletOfferOrder.length : index;
}
