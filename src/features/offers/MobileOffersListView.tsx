"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import {
  getOfferStatusLabel,
  getOfferTone,
  isOfferExpired,
} from "@/lib/offers";
import type { Offer } from "@/types/offer";

import { MobileOffersPanel } from "./MobileOffersPrimitives";

type MobileOfferFilter = "active" | "all" | "premium";

interface MobileOffersListViewProps {
  copiedOfferId?: string;
  copyMessage: string;
  currentTime: number;
  featuredOffer?: Offer;
  filter: MobileOfferFilter;
  offers: Offer[];
  query: string;
  onApplyOffer: (offer: Offer) => void;
  onClearQuery: () => void;
  onFilterChange: (filter: MobileOfferFilter) => void;
  onQueryChange: (query: string) => void;
  onViewOffer: (offer: Offer) => void;
}

const offerFilters: { id: MobileOfferFilter; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "premium", label: "Premium" },
  { id: "all", label: "All" },
];

export function MobileOffersListView({
  copiedOfferId,
  copyMessage,
  currentTime,
  featuredOffer,
  filter,
  offers,
  query,
  onApplyOffer,
  onClearQuery,
  onFilterChange,
  onQueryChange,
  onViewOffer,
}: MobileOffersListViewProps) {
  return (
    <>
      <section className="mt-8">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Member offers
        </p>
        <h1 className="editorial-title mt-3 text-[37px] uppercase leading-[0.96] text-white min-[390px]:text-[40px]">
          Promotions
          <span className="block text-[var(--sb-red-bright)]">& Referrals</span>
        </h1>
        <p className="mt-4 text-[16px] leading-6 text-white/62">
          Copy member codes, review eligibility, and jump into checkout-ready
          dining offers.
        </p>
      </section>

      {featuredOffer ? (
        <MobileFeaturedOffer
          copyMessage={copyMessage}
          copiedOfferId={copiedOfferId}
          currentTime={currentTime}
          offer={featuredOffer}
          onApplyOffer={onApplyOffer}
          onViewOffer={onViewOffer}
        />
      ) : null}

      <MobileOffersPanel className="mt-4 p-4">
        <label className="grid gap-2" htmlFor="mobile-offer-search">
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/46">
            Search offers
          </span>
          <span className="flex min-h-[54px] items-center gap-3 rounded-[14px] border border-white/10 bg-black/34 px-3">
            <AssetIcon size={22} src="/assets/icons/search-icon.png" />
            <input
              className="min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/38"
              id="mobile-offer-search"
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Code, reward, or offer"
              value={query}
            />
            {query ? (
              <button
                className="rounded-full px-2 py-1 text-[12px] uppercase text-[var(--sb-gold-soft)]"
                onClick={onClearQuery}
                type="button"
              >
                Clear
              </button>
            ) : null}
          </span>
        </label>

        <div
          aria-label="Offer filters"
          className="mt-4 grid grid-cols-3 gap-2"
          role="group"
        >
          {offerFilters.map((item) => (
            <button
              aria-pressed={filter === item.id}
              className={classNames(
                "min-h-[44px] rounded-[12px] border text-[12px] uppercase tracking-[0.08em]",
                filter === item.id
                  ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/22 text-[var(--sb-red-bright)]"
                  : "border-white/12 bg-black/24 text-white/56",
              )}
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </MobileOffersPanel>

      <section className="mt-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Current offers
            </p>
            <p className="mt-1 text-[13px] text-white/46">
              {offers.length} result{offers.length === 1 ? "" : "s"}
            </p>
          </div>
          <Link
            className="rounded-full border border-[var(--sb-border)] px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            href="/loyalty"
          >
            Rewards
          </Link>
        </div>

        <div className="mt-3 grid gap-3">
          {offers.length > 0 ? (
            offers.map((offer, index) => (
              <MobileOfferCard
                currentTime={currentTime}
                imagePriority={index < 2}
                key={offer.id}
                offer={offer}
                copyMessage={
                  copiedOfferId === offer.id ? copyMessage : undefined
                }
                onApplyOffer={onApplyOffer}
                onViewOffer={onViewOffer}
              />
            ))
          ) : (
            <MobileOffersPanel className="p-5 text-center">
              <AssetIcon
                className="mx-auto"
                size={44}
                src="/assets/icons/floral-emblem-icon.png"
              />
              <h2 className="mt-4 text-[18px] font-semibold text-white">
                No matching offers
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-white/54">
                Try another code, reward, or offer name.
              </p>
            </MobileOffersPanel>
          )}
        </div>
      </section>
    </>
  );
}

function MobileFeaturedOffer({
  copyMessage,
  copiedOfferId,
  currentTime,
  offer,
  onApplyOffer,
  onViewOffer,
}: {
  copyMessage: string;
  copiedOfferId?: string;
  currentTime: number;
  offer: Offer;
  onApplyOffer: (offer: Offer) => void;
  onViewOffer: (offer: Offer) => void;
}) {
  const expired = isOfferExpired(offer, currentTime);

  return (
    <MobileOffersPanel className="mt-6 overflow-hidden">
      <div className="relative min-h-[248px] p-5">
        <Image
          alt=""
          className="absolute inset-0 object-cover opacity-58"
          fill
          loading="eager"
          priority
          sizes="430px"
          src={offer.imageUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.88)_100%)]" />
        <div className="relative z-10 flex min-h-[208px] flex-col justify-end">
          <StatusBadge tone={getOfferTone(offer, currentTime)}>
            {getOfferStatusLabel(offer, currentTime)}
          </StatusBadge>
          <h2 className="editorial-title mt-4 text-[30px] uppercase leading-none text-white min-[390px]:text-[32px]">
            {offer.title}
          </h2>
          <p className="mt-3 text-[15px] font-semibold text-[var(--sb-gold-soft)]">
            {offer.subtitle}
          </p>
          <div className="mt-4 grid grid-cols-[1fr_96px] overflow-hidden rounded-[14px] border border-[var(--sb-gold)]/28 bg-black/46 min-[390px]:grid-cols-[1fr_118px]">
            <div className="min-w-0 p-3">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/46">
                Code
              </p>
              <p className="mt-1 truncate font-mono text-[20px] text-white min-[390px]:text-[23px]">
                {offer.code}
              </p>
            </div>
            <button
              className="border-l border-[var(--sb-gold)]/20 px-3 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] disabled:text-white/34"
              disabled={expired}
              onClick={() => onApplyOffer(offer)}
              type="button"
            >
              {expired
                ? "Expired"
                : copiedOfferId === offer.id
                  ? copyMessage
                  : "Copy"}
            </button>
          </div>
          <button
            className="mt-4 min-h-[48px] rounded-[13px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={() => onViewOffer(offer)}
            type="button"
          >
            View details
          </button>
        </div>
      </div>
    </MobileOffersPanel>
  );
}

function MobileOfferCard({
  copyMessage,
  currentTime,
  imagePriority,
  offer,
  onApplyOffer,
  onViewOffer,
}: {
  copyMessage?: string;
  currentTime: number;
  imagePriority: boolean;
  offer: Offer;
  onApplyOffer: (offer: Offer) => void;
  onViewOffer: (offer: Offer) => void;
}) {
  const expired = isOfferExpired(offer, currentTime);

  return (
    <MobileOffersPanel className="overflow-hidden">
      <div className="grid grid-cols-[112px_minmax(0,1fr)] gap-4 p-3">
        <button
          aria-label={`View offer details for ${offer.title}`}
          className="relative h-[128px] overflow-hidden rounded-[14px] bg-white/8"
          onClick={() => onViewOffer(offer)}
          type="button"
        >
          <Image
            alt={offer.title}
            className="object-cover"
            fill
            loading={imagePriority ? "eager" : "lazy"}
            priority={imagePriority}
            sizes="112px"
            src={offer.imageUrl}
          />
        </button>
        <div className="min-w-0 py-1">
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone={getOfferTone(offer, currentTime)}>
              {getOfferStatusLabel(offer, currentTime)}
            </StatusBadge>
            <StatusBadge
              tone={offer.accent === "premium" ? "premium" : "neutral"}
            >
              {offer.code}
            </StatusBadge>
          </div>
          <button
            className="mt-3 block text-left text-[17px] font-semibold leading-5 text-white"
            onClick={() => onViewOffer(offer)}
            type="button"
          >
            {offer.title}
          </button>
          <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-white/56">
            {offer.subtitle}
          </p>
          <p className="mt-2 text-[12px] text-white/42">
            Ends {formatDateTime(offer.expiresAt)}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              className="min-h-[40px] rounded-[11px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)]"
              onClick={() => onViewOffer(offer)}
              type="button"
            >
              Details
            </button>
            <button
              className="min-h-[40px] rounded-[11px] border border-[var(--sb-red-bright)]/45 text-[12px] uppercase tracking-[0.06em] text-[var(--sb-red-bright)] disabled:border-white/12 disabled:text-white/34"
              disabled={expired}
              onClick={() => onApplyOffer(offer)}
              type="button"
            >
              {expired ? "Expired" : copyMessage || "Copy"}
            </button>
          </div>
        </div>
      </div>
    </MobileOffersPanel>
  );
}

export type { MobileOfferFilter };
