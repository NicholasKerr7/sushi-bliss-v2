"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { offers as allOffers } from "@/data/offers";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import {
  isOfferExpired,
  offerMatchesQuery,
  sortOffersByAvailability,
} from "@/lib/offers";
import { scrollWindowToTopInstantly } from "@/lib/scroll";
import type { Offer } from "@/types/offer";

import { MobileOfferDetailView } from "./MobileOfferDetailView";
import { MobileOffersListView } from "./MobileOffersListView";
import type { MobileOfferFilter } from "./MobileOffersListView";
import { MobileOffersHeader } from "./MobileOffersPrimitives";

interface OfferCopyState {
  message: string;
  offerId: string;
}

/** Coordinates the mobile offers, referrals, detail, and copy-code flow. */
export function MobileOffersDashboard() {
  const searchParams = useSearchParams();
  const currentTime = useMemo(() => new Date().getTime(), []);
  const [cartOpen, setCartOpen] = useState(false);
  const [copyState, setCopyState] = useState<OfferCopyState | null>(null);
  const [filter, setFilter] = useState<MobileOfferFilter>("active");
  const [query, setQuery] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(() => {
    const offerId = searchParams.get("offer");

    return allOffers.find((offer) => offer.id === offerId) || null;
  });
  const { itemCount } = useCart();
  const { unreadCount } = useNotifications();

  const sortedOffers = useMemo(
    () => sortOffersByAvailability(allOffers, currentTime),
    [currentTime],
  );
  const featuredOffer = useMemo(
    () =>
      sortedOffers.find(
        (offer) =>
          offer.id === "omakase-preview" && !isOfferExpired(offer, currentTime),
      ) ||
      sortedOffers.find(
        (offer) =>
          offer.accent === "premium" && !isOfferExpired(offer, currentTime),
      ) ||
      sortedOffers.find((offer) => !isOfferExpired(offer, currentTime)) ||
      sortedOffers[0],
    [currentTime, sortedOffers],
  );
  const visibleOffers = useMemo(() => {
    const queryIsActive = Boolean(query.trim());

    return sortedOffers.filter((offer) => {
      if (!offerMatchesQuery(offer, query)) {
        return false;
      }

      if (filter === "active" && isOfferExpired(offer, currentTime)) {
        return false;
      }

      if (filter === "premium" && offer.accent !== "premium") {
        return false;
      }

      if (!queryIsActive && offer.id === featuredOffer?.id) {
        return false;
      }

      return true;
    });
  }, [currentTime, featuredOffer?.id, filter, query, sortedOffers]);

  useEffect(() => {
    scrollWindowToTopInstantly();
  }, [selectedOffer?.id]);

  const handleApplyOffer = async (offer: Offer) => {
    if (isOfferExpired(offer, currentTime)) {
      setCopyState({
        message: `${offer.code} has expired.`,
        offerId: offer.id,
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(offer.code);
      setCopyState({
        message: `${offer.code} copied.`,
        offerId: offer.id,
      });
    } catch {
      setCopyState({
        message: `${offer.code} ready for checkout.`,
        offerId: offer.id,
      });
    }
  };

  const handleSelectOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setCopyState(null);
  };

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-[#050607] px-4 pb-[236px] pt-5 text-white md:hidden"
      id="offers"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_14%,rgba(239,47,37,0.20),transparent_30%),radial-gradient(circle_at_100%_8%,rgba(215,168,79,0.16),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0)_0%,#050607_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-[url('/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp')] bg-cover bg-center opacity-24"
      />

      <div className="mobile-frame relative z-10">
        <MobileOffersHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
          unreadNotificationCount={unreadCount}
        />

        {selectedOffer ? (
          <MobileOfferDetailView
            copyMessage={
              copyState?.offerId === selectedOffer.id ? copyState.message : ""
            }
            currentTime={currentTime}
            offer={selectedOffer}
            onApplyOffer={handleApplyOffer}
            onBack={() => {
              setSelectedOffer(null);
              setCopyState(null);
            }}
          />
        ) : (
          <MobileOffersListView
            copiedOfferId={copyState?.offerId}
            copyMessage={copyState?.message || ""}
            currentTime={currentTime}
            featuredOffer={featuredOffer}
            filter={filter}
            offers={visibleOffers}
            query={query}
            onApplyOffer={handleApplyOffer}
            onClearQuery={() => {
              setQuery("");
              setCopyState(null);
            }}
            onFilterChange={(nextFilter) => {
              setFilter(nextFilter);
              setCopyState(null);
            }}
            onQueryChange={(nextQuery) => {
              setQuery(nextQuery);
              setCopyState(null);
            }}
            onViewOffer={handleSelectOffer}
          />
        )}
      </div>

      <BottomNavigation
        activeId="profile"
        ariaLabel="Mobile offers navigation"
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
