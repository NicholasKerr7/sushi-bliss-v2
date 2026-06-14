"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { offers } from "@/data/offers";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { isOfferExpired, sortOffersByAvailability } from "@/lib/offers";
import type { Offer } from "@/types/offer";

import { DesktopOfferDetail } from "./DesktopOfferDetail";

const heroImage =
  "/assets/omakase/specialties/lead-chef-omakase-nigiri-flight.webp";

const offerActions: Record<
  string,
  { href: string; label: string; tag: string }
> = {
  "birthday-treat": {
    href: "/reservations",
    label: "Join now",
    tag: "Member exclusive",
  },
  "double-points": {
    href: "/loyalty",
    label: "Join now",
    tag: "Member exclusive",
  },
  "early-lunch": {
    href: "/menu",
    label: "Order now",
    tag: "Takeout offer",
  },
  "omakase-preview": {
    href: "/reservations",
    label: "Book now",
    tag: "Reservation perk",
  },
  "weekday-pickup": {
    href: "/menu",
    label: "Order now",
    tag: "Delivery offer",
  },
} as const;

const terms = [
  "Offers cannot be combined unless stated.",
  "One offer per order or reservation.",
  "Offers are subject to availability and may change without notice.",
  "Some exclusions may apply.",
] as const;

export function DesktopOffersDashboard() {
  const { itemCount } = useCart();
  const currentTime = useMemo(() => new Date().getTime(), []);
  const sortedOffers = useMemo(
    () => sortOffersByAvailability(offers, currentTime),
    [currentTime],
  );
  const offerCards = [
    ...sortedOffers.filter((offer) =>
      [
        "spicy-tuna-roll",
        "double-points",
        "birthday-treat",
        "omakase-preview",
        "early-lunch",
      ].includes(offer.id),
    ),
  ].slice(0, 4);
  const featuredOffer = sortedOffers.find(
    (offer) => !isOfferExpired(offer, currentTime),
  );
  const [promoCode, setPromoCode] = useState(featuredOffer?.code || "");
  const [statusMessage, setStatusMessage] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);

  const applyCode = () => {
    const normalizedCode = promoCode.trim().toUpperCase();
    const matchingOffer = offers.find((offer) => offer.code === normalizedCode);

    if (!matchingOffer) {
      setStatusMessage("Enter a valid Sushi Bliss offer code.");
      return;
    }

    if (isOfferExpired(matchingOffer, currentTime)) {
      setStatusMessage(`${matchingOffer.code} has expired.`);
      return;
    }

    setStatusMessage(`${matchingOffer.code} is ready for checkout.`);
  };

  if (detailOpen) {
    return (
      <DesktopOfferDetail
        cartCount={itemCount}
        onBack={() => setDetailOpen(false)}
      />
    );
  }

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="offers"
    >
      <div className="mx-auto min-h-dvh max-w-[1550px] border-x border-[var(--sb-border)] bg-[#050607]">
        <DesktopMenuHeader activeId="offers" cartCount={itemCount} />
        <main className="px-7 pb-4">
          <OfferHero onOpenDetail={() => setDetailOpen(true)} />

          <section className="mt-3 grid grid-cols-[minmax(0,1fr)_476px] gap-4">
            <article className="rounded-[16px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
              <h2 className="text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Exclusive offers for you
              </h2>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {offerCards.map((offer, index) => (
                  <OfferCard
                    currentTime={currentTime}
                    key={offer.id}
                    offer={offer}
                    priority={index < 4}
                  />
                ))}
              </div>
            </article>

            <aside className="grid gap-3">
              <article className="rounded-[16px] border border-[var(--sb-border)] bg-white/[0.035] p-4">
                <h2 className="flex items-center gap-3 text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  <AssetIcon size={24} src="/assets/icons/gift-icon.png" />
                  Redeem your offer
                </h2>
                <div className="mt-4 grid grid-cols-[1fr_96px] gap-3">
                  <label className="sr-only" htmlFor="desktop-promo-code">
                    Enter promo code
                  </label>
                  <input
                    className="h-11 rounded-[8px] border border-white/10 bg-black/28 px-4 text-[14px] text-white outline-none placeholder:text-white/40"
                    id="desktop-promo-code"
                    onChange={(event) => setPromoCode(event.target.value)}
                    placeholder="Enter promo code"
                    value={promoCode}
                  />
                  <button
                    className="h-11 rounded-[8px] border border-[var(--sb-gold)]/44 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                    onClick={applyCode}
                    type="button"
                  >
                    Apply
                  </button>
                </div>
                <p className="mt-3 text-[13px] text-white/58">
                  Available offers
                </p>
                {featuredOffer ? (
                  <div className="mt-3 grid grid-cols-[150px_1fr] items-center gap-4">
                    <span className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-[var(--sb-gold)]/34 px-3 font-mono text-[12px] text-white">
                      <AssetIcon
                        size={16}
                        src="/assets/icons/golden-ticket-icon.png"
                      />
                      {featuredOffer.code}
                    </span>
                    <span className="text-[13px] text-white/62">
                      {featuredOffer.subtitle}
                    </span>
                  </div>
                ) : null}
                {statusMessage ? (
                  <p
                    aria-live="polite"
                    className="mt-4 text-[13px] text-[var(--sb-gold-soft)]"
                  >
                    {statusMessage}
                  </p>
                ) : null}
                <Link
                  className="mt-4 flex justify-end gap-3 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                  href="/menu"
                >
                  Browse eligible items
                  <ChevronIcon direction="right" size={18} />
                </Link>
              </article>

              <article className="rounded-[16px] border border-[var(--sb-border)] bg-white/[0.035] p-4">
                <h2 className="flex items-center gap-3 text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  <AssetIcon size={24} src="/assets/icons/check-icon.png" />
                  Offer terms
                </h2>
                <ul className="mt-4 space-y-2.5 text-[14px] leading-6 text-white/62">
                  {terms.map((term) => (
                    <li className="flex gap-3" key={term}>
                      <AssetIcon
                        className="mt-1"
                        size={16}
                        src="/assets/icons/check-icon.png"
                      />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  className="mt-4 block w-full text-right text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                  href="/support"
                >
                  View full terms & conditions{" "}
                  <ChevronIcon direction="right" size={18} />
                </Link>
              </article>
            </aside>
          </section>

          <div className="mt-3">
            <DesktopBenefitStrip />
          </div>
        </main>
      </div>
    </section>
  );
}

function OfferHero({ onOpenDetail }: { onOpenDetail: () => void }) {
  return (
    <section className="relative min-h-[330px] overflow-hidden border-b border-[var(--sb-border)]">
      <Image
        alt=""
        className="object-cover object-[70%_48%]"
        fill
        loading="eager"
        priority
        sizes="1550px"
        src={heroImage}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98)_0%,rgba(5,6,7,0.82)_28%,rgba(5,6,7,0.20)_64%,rgba(5,6,7,0.88)_100%)]" />
      <div className="relative z-10 flex min-h-[330px] max-w-[660px] flex-col justify-center px-16 py-8">
        <p className="text-[16px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          Limited time experience
        </p>
        <h1 className="editorial-title mt-3 text-[50px] uppercase leading-[0.92] tracking-[0.08em]">
          Spring Omakase
          <span className="block text-[var(--sb-red-bright)]">
            Tasting Journey
          </span>
        </h1>
        <p className="mt-4 max-w-[420px] text-[17px] leading-7 text-[var(--sb-gold-soft)]">
          A seasonal celebration of the finest ingredients, crafted into an
          unforgettable 12-course omakase.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-8 text-[13px] text-white/68">
          <p className="flex gap-3">
            <AssetIcon size={24} src="/assets/icons/clock-icon.png" />
            <span>
              <span className="block uppercase text-white">
                Limited time only
              </span>
              May 1 - May 31, 2024
            </span>
          </p>
          <p className="flex gap-3">
            <AssetIcon size={24} src="/assets/icons/group-icon.png" />
            <span>
              <span className="block uppercase text-white">
                Exclusive seating
              </span>
              Limited to 10 guests per seating
            </span>
          </p>
        </div>
        <div className="mt-5 flex items-center gap-7">
          <Button
            className="red-glow-button h-[54px] w-[262px] rounded-[10px] text-[14px] uppercase tracking-[0.08em]"
            href="/reservations"
          >
            Book experience
            <ChevronIcon direction="right" size={18} />
          </Button>
          <button
            className="h-[54px] rounded-[10px] border border-[var(--sb-gold)]/38 px-6 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={onOpenDetail}
            type="button"
          >
            View offer details
          </button>
          <p className="text-[28px] text-[var(--sb-gold-soft)]">
            $180{" "}
            <span className="text-[13px] uppercase text-white/64">
              / per guest
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function OfferCard({
  currentTime,
  offer,
  priority,
}: {
  currentTime: number;
  offer: Offer;
  priority: boolean;
}) {
  const action = offerActions[offer.id] || {
    href: "/menu",
    label: "View offer",
    tag: "Exclusive offer",
  };
  const expired = isOfferExpired(offer, currentTime);

  return (
    <article className="overflow-hidden rounded-[12px] border border-white/12 bg-black/28">
      <div className="relative h-[128px]">
        <Image
          alt=""
          className="object-cover"
          fill
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes="250px"
          src={offer.imageUrl}
        />
        <span className="absolute left-3 top-3 rounded-[6px] bg-[var(--sb-red)] px-3 py-1 text-[10px] uppercase tracking-[0.08em] text-white">
          {action.tag}
        </span>
      </div>
      <div className="p-3.5">
        <h3 className="editorial-title min-h-[48px] text-[19px] uppercase leading-6 text-white">
          {offer.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-[13px] leading-5 text-white/62">
          {offer.description}
        </p>
        <p className="mt-3 text-[13px] text-white/46">
          Valid through May 31, 2024
        </p>
        <Button
          className="mt-3 h-[42px] w-full rounded-[8px] text-[12px] uppercase tracking-[0.08em]"
          disabled={expired}
          href={action.href}
          variant={expired ? "secondary" : "primary"}
        >
          {expired ? "Expired" : action.label}
        </Button>
      </div>
    </article>
  );
}
