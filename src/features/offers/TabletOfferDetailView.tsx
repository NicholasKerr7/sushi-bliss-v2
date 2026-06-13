"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { brand, icons } from "@/features/home/visualHomeData";
import { formatDateTime } from "@/lib/dates";
import {
  getOfferStatusLabel,
  getOfferTone,
  isOfferExpired,
} from "@/lib/offers";
import type { Offer } from "@/types/offer";

interface TabletOfferDetailViewProps {
  copyMessage: string;
  currentTime: number;
  offer: Offer;
  onApplyOffer: (offer: Offer) => void;
  onBack: () => void;
}

const benefitLabels = [
  "Member exclusive",
  "Seasonal selection",
  "Chef's special",
  "Premium benefits",
] as const;

export function TabletOfferDetailView({
  copyMessage,
  currentTime,
  offer,
  onApplyOffer,
  onBack,
}: TabletOfferDetailViewProps) {
  const expired = isOfferExpired(offer, currentTime);

  return (
    <section className="flex min-h-dvh flex-col bg-[#050607] px-[18px] pb-3 pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pb-4 min-[1080px]:pt-3">
      <header className="mt-1 grid h-[82px] grid-cols-[210px_minmax(0,1fr)_180px] items-center gap-3 lg:grid-cols-[260px_minmax(0,1fr)_260px]">
        <div className="flex items-center gap-3 lg:gap-6">
          <button
            aria-label="Back to offers"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.035] text-[var(--sb-gold-soft)]"
            onClick={onBack}
            type="button"
          >
            <span aria-hidden="true" className="text-[22px] leading-none">
              <ChevronIcon direction="left" size={18} />
            </span>
          </button>
          <Link className="flex items-center gap-3" href="/home">
            <AssetIcon
              alt={brand.name}
              className="rounded-full"
              size={56}
              src={brand.assets.floralEmblem.publicUrl}
            />
            <span className="editorial-title text-[20px] uppercase leading-[0.98] tracking-[0.24em]">
              Sushi
              <br />
              Bliss
            </span>
          </Link>
        </div>
        <p className="mx-auto text-[13px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)] lg:text-[16px] lg:tracking-[0.22em]">
          Offer detail
        </p>
        <div className="flex items-center justify-end gap-4">
          <Link
            className="relative grid h-11 w-11 place-items-center"
            href="/notifications"
          >
            <AssetIcon size={30} src={icons.bell} />
            <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-[var(--sb-red)]" />
          </Link>
          <Link className="grid h-11 w-11 place-items-center" href="/loyalty">
            <AssetIcon size={30} src={icons.star} />
          </Link>
          <Link className="grid h-11 w-11 place-items-center" href="/profile">
            <AssetIcon size={30} src={icons.profile} />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1034px]">
        <section className="relative mt-3 min-h-[246px] overflow-hidden rounded-[18px] border border-white/10 bg-black/40 min-[1080px]:mt-5 min-[1080px]:min-h-[360px]">
          <Image
            alt={offer.title}
            className="object-cover object-right opacity-86"
            fill
            loading="eager"
            priority
            sizes="1034px"
            src={offer.imageUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98),rgba(5,6,7,0.76)_44%,rgba(5,6,7,0.14)_76%,rgba(5,6,7,0.04))]" />
          <div className="relative z-10 max-w-[560px] p-6 min-[1080px]:p-9">
            <StatusBadge tone={getOfferTone(offer, currentTime)}>
              {getOfferStatusLabel(offer, currentTime)}
            </StatusBadge>
            <StatusBadge
              tone={offer.accent === "premium" ? "premium" : "neutral"}
            >
              {offer.code}
            </StatusBadge>
            <h1 className="editorial-title mt-5 text-[42px] leading-none text-white min-[1080px]:text-[62px]">
              {offer.title}
            </h1>
            <p className="mt-2 text-[22px] uppercase tracking-[0.04em] text-[var(--sb-red-bright)] min-[1080px]:text-[34px]">
              {offer.subtitle}
            </p>
            <p className="mt-4 max-w-[520px] text-[14px] leading-6 text-white/62 min-[1080px]:text-[17px]">
              {offer.description}
            </p>
            <div className="mt-5 grid w-full max-w-[420px] grid-cols-[1fr_118px] overflow-hidden rounded-[14px] border border-[var(--sb-gold)]/28 bg-black/42 min-[1080px]:mt-7 min-[1080px]:max-w-[500px] min-[1080px]:grid-cols-[1fr_150px]">
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
                  Member exclusive
                </p>
                <p className="mt-2 font-mono text-[32px] text-white min-[1080px]:text-[44px]">
                  {offer.code}
                </p>
              </div>
              <div className="grid place-items-center border-l border-[var(--sb-gold)]/18 p-4 text-center">
                <AssetIcon
                  size={42}
                  src="/assets/icons/floral-emblem-icon.png"
                />
                <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-white/54">
                  Seasonal
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 grid grid-cols-4 gap-2 rounded-[16px] border border-white/10 bg-white/[0.04] p-3 min-[1080px]:mt-4 min-[1080px]:gap-4 min-[1080px]:p-5">
          {benefitLabels.map((label, index) => (
            <div className="flex items-center gap-3" key={label}>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/28 min-[1080px]:h-11 min-[1080px]:w-11">
                <AssetIcon
                  size={22}
                  src={
                    index === 0
                      ? "/assets/icons/chef-crest-icon.png"
                      : index === 1
                        ? "/assets/icons/floral-emblem-icon.png"
                        : index === 2
                          ? "/assets/icons/dining-setting-icon.png"
                          : "/assets/icons/gift-icon.png"
                  }
                />
              </span>
              <p className="text-[11px] uppercase leading-4 tracking-[0.08em] text-white/58 min-[1080px]:text-[13px]">
                {label}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-3 grid grid-cols-[1fr_0.86fr] gap-3 min-[1080px]:mt-4 min-[1080px]:gap-4">
          <article className="rounded-[16px] border border-white/10 bg-white/[0.04] p-4 min-[1080px]:p-5">
            <h2 className="text-[15px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              Offer benefits
            </h2>
            <ul className="mt-3 grid gap-2 text-[13px] leading-5 text-white/62 min-[1080px]:text-[14px]">
              {[
                offer.subtitle,
                offer.eligibility,
                ...offer.terms.slice(0, 2),
              ].map((benefit) => (
                <li className="flex gap-3" key={benefit}>
                  <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[var(--sb-red-bright)] text-[10px] text-[var(--sb-red-bright)]">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[16px] border border-white/10 bg-white/[0.04] p-4 min-[1080px]:p-5">
            <h2 className="text-[15px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              Validity period
            </h2>
            <div className="mt-3 rounded-[14px] border border-white/10 bg-black/24 p-4">
              <p className="text-[15px] font-semibold text-white">
                Ends {formatDateTime(offer.expiresAt)}
              </p>
              <p className="mt-2 text-[13px] leading-5 text-white/52">
                Apply the code before checkout or show it when booking a
                reservation.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-3 rounded-[16px] border border-white/10 bg-white/[0.04] p-4 min-[1080px]:mt-4 min-[1080px]:p-5">
          <h2 className="text-[15px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
            Terms & conditions
          </h2>
          <ul className="mt-3 grid gap-1 text-[12px] leading-5 text-white/52 min-[1080px]:text-[13px]">
            {offer.terms.map((term) => (
              <li key={term}>• {term}</li>
            ))}
          </ul>
        </section>

        <section className="mt-3 grid grid-cols-[0.85fr_1.15fr] gap-3 min-[1080px]:mt-4 min-[1080px]:gap-4">
          <article className="rounded-[16px] border border-white/10 bg-white/[0.04] p-4">
            <h2 className="text-[15px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              Not a member yet?
            </h2>
            <p className="mt-2 text-[13px] leading-5 text-white/52">
              Join Sushi Bliss to unlock exclusive offers and premium dining
              privileges.
            </p>
          </article>
          <div className="grid grid-cols-2 gap-3">
            <Button
              className="h-full rounded-[14px] uppercase tracking-[0.08em]"
              href="/profile"
              variant="secondary"
            >
              Join now
            </Button>
            <Button
              className="red-glow-button h-full rounded-[14px] uppercase tracking-[0.08em]"
              disabled={expired}
              onClick={() => onApplyOffer(offer)}
            >
              {expired ? "Offer expired" : copyMessage || "Reserve with offer"}
            </Button>
          </div>
        </section>
      </main>

      <TabletBottomNavigation
        ariaLabel="Tablet offers navigation"
        fixed={false}
      />
    </section>
  );
}
