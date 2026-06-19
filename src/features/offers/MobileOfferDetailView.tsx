"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import {
  getOfferStatusLabel,
  getOfferTone,
  isOfferExpired,
} from "@/lib/offers";
import type { Offer } from "@/types/offer";

import {
  MobileOffersBackButton,
  MobileOffersPanel,
} from "./MobileOffersPrimitives";

interface MobileOfferDetailViewProps {
  copyMessage: string;
  currentTime: number;
  offer: Offer;
  onApplyOffer: (offer: Offer) => void;
  onBack: () => void;
}

export function MobileOfferDetailView({
  copyMessage,
  currentTime,
  offer,
  onApplyOffer,
  onBack,
}: MobileOfferDetailViewProps) {
  const expired = isOfferExpired(offer, currentTime);

  return (
    <>
      <div className="mt-6 flex items-center justify-between gap-4">
        <MobileOffersBackButton label="Back to offers" onClick={onBack} />
        <StatusBadge tone={getOfferTone(offer, currentTime)}>
          {getOfferStatusLabel(offer, currentTime)}
        </StatusBadge>
      </div>

      <MobileOffersPanel className="mt-5 overflow-hidden">
        <div className="relative min-h-[254px] min-[390px]:min-h-[318px]">
          <Image
            alt={offer.title}
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="430px"
            src={offer.imageUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.88)_78%,rgba(0,0,0,0.96)_100%)]" />
          <div className="relative z-10 flex min-h-[254px] flex-col justify-end p-4 min-[390px]:min-h-[318px] min-[390px]:p-5">
            <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Member code
            </p>
            <h1 className="editorial-title mt-3 text-[32px] uppercase leading-[0.96] text-white min-[390px]:text-[42px]">
              {offer.title}
            </h1>
            <p className="mt-2 text-[15px] font-semibold leading-6 text-[var(--sb-red-bright)] min-[390px]:mt-3 min-[390px]:text-[16px]">
              {offer.subtitle}
            </p>
          </div>
        </div>

        <div className="p-4 min-[390px]:p-5">
          <div className="grid grid-cols-[1fr_94px] overflow-hidden rounded-[14px] border border-[var(--sb-gold)]/28 bg-black/46 min-[390px]:grid-cols-[1fr_112px]">
            <div className="min-w-0 p-4">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/46">
                Offer code
              </p>
              <p className="mt-1 truncate font-mono text-[22px] text-white min-[390px]:text-[27px]">
                {offer.code}
              </p>
            </div>
            <button
              className="border-l border-[var(--sb-gold)]/20 px-3 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] disabled:text-white/34"
              disabled={expired}
              onClick={() => onApplyOffer(offer)}
              type="button"
            >
              {expired ? "Expired" : copyMessage || "Copy"}
            </button>
          </div>

          <p className="mt-5 text-[15px] leading-7 text-white/62">
            {offer.description}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              className="grid min-h-[54px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              href="/menu"
            >
              Order
            </Link>
            <Link
              className="red-glow-button grid min-h-[54px] place-items-center rounded-[13px] border text-[12px]"
              href="/reservations"
            >
              Reserve
            </Link>
          </div>

          {copyMessage ? (
            <p className="mt-4 rounded-[14px] border border-[var(--sb-gold)]/28 bg-[var(--sb-gold)]/10 p-3 text-[13px] font-semibold text-[var(--sb-gold-soft)]">
              {copyMessage}
            </p>
          ) : null}
        </div>
      </MobileOffersPanel>

      <MobileOffersPanel className="mt-4 p-5">
        <div className="flex items-start gap-3">
          <AssetIcon size={34} src="/assets/icons/golden-ticket-icon.png" />
          <div>
            <h2 className="text-[16px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              Eligibility
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-white/58">
              {offer.eligibility}
            </p>
          </div>
        </div>
      </MobileOffersPanel>

      <MobileOffersPanel className="mt-4 p-5">
        <h2 className="text-[16px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          Terms
        </h2>
        <ul className="mt-4 grid gap-3 text-[14px] leading-6 text-white/58">
          {offer.terms.map((term) => (
            <li className="flex gap-3" key={term}>
              <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[var(--sb-red-bright)] text-[10px] text-[var(--sb-red-bright)]">
                ✓
              </span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-[13px] border border-white/10 bg-black/24 p-3 text-[13px] leading-5 text-white/46">
          Valid through {formatDateTime(offer.expiresAt)}.
        </p>
      </MobileOffersPanel>
    </>
  );
}
