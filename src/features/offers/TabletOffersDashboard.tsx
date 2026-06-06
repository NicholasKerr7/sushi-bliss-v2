"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { offers } from "@/data/offers";
import type { Offer } from "@/types/offer";

import { TabletFeaturedOffer } from "./TabletFeaturedOffer";
import { TabletOfferDetailView } from "./TabletOfferDetailView";
import { TabletOffersBottomNav } from "./TabletOffersBottomNav";
import { TabletOffersHeader } from "./TabletOffersHeader";
import { TabletOfferTile } from "./TabletOfferTile";

export function TabletOffersDashboard() {
  const [query, setQuery] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [copyMessage, setCopyMessage] = useState("");
  const featuredOffer = offers[0];
  const normalizedQuery = query.trim().toLowerCase();

  const visibleOffers = useMemo(() => {
    if (!normalizedQuery) {
      return offers.slice(1);
    }

    return offers.filter((offer) =>
      [
        offer.code,
        offer.description,
        offer.eligibility,
        offer.subtitle,
        offer.title,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const handleApplyOffer = async (offer: Offer) => {
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
      className="flex min-h-dvh flex-col bg-[#050607] px-[18px] pb-3 pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pb-4 min-[1080px]:pt-3"
      id="offers"
    >
      <TabletOffersHeader
        onClearQuery={() => setQuery("")}
        onQueryChange={setQuery}
        query={query}
      />

      <main className="mx-auto w-full max-w-[1034px]">
        <section className="relative mt-3 min-h-[168px] overflow-hidden rounded-[18px] border border-white/10 bg-black/40 lg:min-h-[190px] min-[1080px]:mt-5 min-[1080px]:min-h-[248px]">
          <Image
            alt=""
            className="object-cover opacity-72"
            fill
            loading="eager"
            priority
            sizes="1034px"
            src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98),rgba(5,6,7,0.76)_42%,rgba(5,6,7,0.12))]" />
          <div className="relative z-10 p-5 min-[1080px]:p-8">
            <h1 className="editorial-title text-[46px] leading-[0.94] text-white min-[1080px]:text-[62px]">
              Promotions
              <br />
              <span className="text-[var(--sb-red-bright)]">& Offers</span>
            </h1>
            <p className="mt-3 max-w-[360px] text-[15px] leading-6 text-white/58 min-[1080px]:mt-5 min-[1080px]:text-[19px]">
              Exclusive offers crafted to elevate your Sushi Bliss experience.
            </p>
          </div>
        </section>

        {featuredOffer ? (
          <TabletFeaturedOffer
            copyMessage={copyMessage}
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
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 lg:grid-cols-2 lg:gap-3 min-[1080px]:gap-4">
            {visibleOffers.length > 0 ? (
              visibleOffers.map((offer, index) => (
                <TabletOfferTile
                  imagePriority={index < 4}
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

        <section className="mt-3 hidden grid-cols-[auto_minmax(0,1fr)_220px] items-center gap-4 rounded-[16px] border border-white/10 bg-white/[0.04] p-4 lg:grid min-[1080px]:mt-5 min-[1080px]:grid-cols-[auto_minmax(0,1fr)_280px] min-[1080px]:p-5">
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
