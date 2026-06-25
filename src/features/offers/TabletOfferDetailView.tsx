"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { brand, icons } from "@/features/home/homeDashboardData";
import { isOfferExpired } from "@/lib/offers";
import type { Offer } from "@/types/offer";

import { TabletOfferDetailBottomNav } from "./TabletOfferDetailBottomNav";

interface TabletOfferDetailViewProps {
  copyMessage: string;
  currentTime: number;
  offer: Offer;
  onApplyOffer: (offer: Offer) => void;
  onBack: () => void;
}

const heroImage =
  "/assets/omakase/specialties/lead-chef-omakase-nigiri-flight.webp";

const benefitStrip = [
  ["lotus-crown-icon.png", "Member exclusive"],
  ["floral-emblem-icon.png", "Seasonal selections"],
  ["dining-setting-icon.png", "Chef's special experience"],
  ["gift-icon.png", "Premium benefits"],
] as const;

const offerBenefits = [
  "15% off on all Omakase courses (Lunch & Dinner)",
  "Complimentary seasonal appetizer",
  "Priority reservation & seating",
  "Earn 2X Bliss Points on your visit",
] as const;

const offerTerms = [
  "Offer is valid for Sushi Bliss Members only.",
  "Advance reservation is required.",
  "Offer cannot be combined with other promotions or discounts.",
  "Not valid on blackout dates: May 10-11, May 24-25, June 14-15, 2026.",
  "Offer valid for dine-in only.",
  "Management reserves the right to modify or cancel this offer at any time.",
] as const;

const redemptionSteps = [
  [
    "calendar-icon.png",
    "Make a Reservation",
    "Select your date, time and party size.",
  ],
  [
    "golden-ticket-icon.png",
    "Apply Offer",
    "At checkout, select Sakura Omakase Offer.",
  ],
  [
    "user-settings-icon.png",
    "Verify Membership",
    "Ensure you're logged in as a Sushi Bliss Member.",
  ],
  [
    "check-icon.png",
    "Enjoy & Earn",
    "Enjoy your experience and earn 2X Bliss Points.",
  ],
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
    <section className="flex min-h-dvh flex-col bg-[#050607] px-[26px] pt-0 text-white">
      <header className="mx-auto grid h-[104px] w-full max-w-[1034px] grid-cols-[260px_minmax(0,1fr)_260px] items-center">
        <div className="flex items-center gap-4">
          <button
            aria-label="Back to offers"
            className="grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-white/[0.035] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            onClick={onBack}
            type="button"
          >
            <ChevronIcon direction="left" size={23} />
          </button>
          <Link
            className="flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/home"
          >
            <AssetIcon
              alt={brand.name}
              className="rounded-full"
              loading="eager"
              size={58}
              src={brand.assets.floralEmblem.publicUrl}
            />
            <span className="editorial-title text-[20px] uppercase leading-[1.05] tracking-[0.32em]">
              Sushi
              <br />
              Bliss
            </span>
          </Link>
        </div>

        <p className="text-center text-[16px] uppercase tracking-[0.2em] text-[var(--sb-gold-soft)]">
          Offer detail
        </p>

        <div className="flex items-center justify-end gap-8">
          <Link
            aria-label="Notifications"
            className="relative grid h-11 w-11 place-items-center text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/notifications"
          >
            <AssetIcon loading="eager" size={32} src={icons.bell} />
            <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
              3
            </span>
          </Link>
          <Link
            aria-label="Favorites"
            className="grid h-11 w-11 place-items-center text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/favorites"
          >
            <AssetIcon
              loading="eager"
              size={34}
              src="/assets/icons/heart-icon.png"
            />
          </Link>
          <Link
            aria-label="Profile"
            className="relative grid h-11 w-11 place-items-center text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/profile"
          >
            <AssetIcon
              loading="eager"
              size={32}
              src="/assets/icons/user-icon.png"
            />
            <span className="absolute right-0 top-1 h-2.5 w-2.5 rounded-full bg-[var(--sb-red-bright)]" />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1034px]">
        <section className="relative h-[396px] overflow-hidden">
          <Image
            alt="Sakura Omakase Experience"
            className="object-cover object-[72%_50%]"
            fill
            loading="eager"
            priority
            sizes="1034px"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,1),rgba(5,6,7,0.94)_44%,rgba(5,6,7,0.28)_72%,rgba(5,6,7,0.74)),linear-gradient(180deg,rgba(5,6,7,0.08),rgba(5,6,7,0.34)_54%,rgba(5,6,7,0.97))]" />
          <div className="relative z-10 flex h-full max-w-[540px] flex-col justify-center px-10 pb-7 pt-4">
            <span className="inline-flex w-fit items-center gap-3 rounded-[5px] border border-[var(--sb-gold)]/34 bg-black/24 px-5 py-3 text-[15px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              <AssetIcon size={20} src="/assets/icons/lotus-crown-icon.png" />
              Members only
            </span>
            <h1 className="editorial-title mt-5 text-[48px] uppercase leading-[0.95] tracking-[0.08em] text-white">
              Sakura
              <span className="mt-2 block text-[39px] text-[var(--sb-red-bright)]">
                Omakase Experience
              </span>
            </h1>
            <p className="mt-4 text-[19px] leading-7 text-white/62">
              A seasonal journey of the finest flavors
            </p>
            <div className="mt-5 grid w-[355px] grid-cols-[1fr_116px] overflow-hidden rounded-[10px] border border-[var(--sb-gold)]/34 bg-black/44 backdrop-blur-sm">
              <div className="p-4">
                <p className="text-[14px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                  Member exclusive
                </p>
                <p className="editorial-title mt-3 text-[42px] uppercase leading-none text-white">
                  15% off
                </p>
                <p className="mt-2 text-[15px] uppercase tracking-[0.08em] text-white/66">
                  Omakase courses
                </p>
              </div>
              <div className="grid place-items-center border-l border-[var(--sb-gold)]/20 p-4 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--sb-gold)]/56">
                  <AssetIcon
                    size={34}
                    src="/assets/icons/floral-emblem-icon.png"
                  />
                </span>
                <p className="mt-2 text-[12px] uppercase leading-4 tracking-[0.08em] text-white/58">
                  Spring seasonal
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid h-[78px] grid-cols-4 items-center rounded-[12px] border border-white/10 bg-white/[0.04] px-8">
          {benefitStrip.map(([icon, label]) => (
            <div className="flex items-center gap-4" key={label}>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/28">
                <AssetIcon size={24} src={`/assets/icons/${icon}`} />
              </span>
              <p className="max-w-[150px] text-[14px] uppercase leading-5 tracking-[0.08em] text-white/62">
                {label}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-3 rounded-[14px] border border-[var(--sb-gold)]/18 bg-[linear-gradient(145deg,rgba(13,22,23,0.96),rgba(8,9,10,0.98))] p-6">
          <div className="grid grid-cols-[1fr_1px_1fr] gap-7">
            <article>
              <h2 className="flex items-center gap-4 text-[18px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
                <AssetIcon size={25} src="/assets/icons/star-icon.png" />
                Offer benefits
              </h2>
              <ul className="mt-5 grid gap-2.5 text-[15px] leading-5 text-white/66">
                {offerBenefits.map((benefit) => (
                  <li className="flex items-center gap-4" key={benefit}>
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[var(--sb-red-bright)] text-[10px] text-[var(--sb-red-bright)]">
                      ✓
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </article>

            <div className="bg-[var(--sb-gold)]/18" />

            <article>
              <h2 className="flex items-center gap-4 text-[18px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
                <AssetIcon size={25} src="/assets/icons/calendar-icon.png" />
                Validity period
              </h2>
              <div className="mt-5 grid grid-cols-[64px_minmax(0,1fr)] items-center gap-4 rounded-[12px] border border-white/10 bg-black/24 p-4">
                <span className="grid h-14 w-14 place-items-center rounded-[12px] border border-[var(--sb-red-bright)]/38 bg-[var(--sb-red)]/12">
                  <AssetIcon size={30} src="/assets/icons/calendar-icon.png" />
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-white">
                    May 1, 2026 - June 30, 2026
                  </p>
                  <p className="mt-2 text-[14px] text-white/56">
                    All days - Lunch & Dinner
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[13px] italic text-white/48">
                Blackout dates apply. See terms below.
              </p>
            </article>
          </div>

          <article className="mt-5 rounded-[12px] border border-white/10 bg-black/18 p-4">
            <h2 className="flex items-center justify-between text-[17px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              <span className="flex items-center gap-4">
                <AssetIcon
                  size={24}
                  src="/assets/icons/golden-ticket-icon.png"
                />
                Terms & conditions
              </span>
              <ChevronIcon direction="down" size={20} />
            </h2>
            <ul className="mt-4 list-disc space-y-1 pl-7 text-[13px] leading-5 text-white/56">
              {offerTerms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </article>

          <article className="mt-2 rounded-[12px] border border-white/10 bg-black/18 p-4">
            <h2 className="flex items-center gap-4 text-[17px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              <AssetIcon size={24} src="/assets/icons/user-settings-icon.png" />
              How to redeem
            </h2>
            <ol className="mt-5 grid grid-cols-4 gap-4">
              {redemptionSteps.map(([icon, title, copy], index) => (
                <li
                  className="relative grid grid-cols-[56px_minmax(0,1fr)] gap-3"
                  key={title}
                >
                  <span className="relative grid h-12 w-12 place-items-center rounded-[12px] border border-white/10 bg-black/30">
                    <span className="absolute -left-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-semibold text-white">
                      {index + 1}
                    </span>
                    <AssetIcon size={25} src={`/assets/icons/${icon}`} />
                  </span>
                  <span>
                    <span className="block text-[12px] font-semibold text-white">
                      {title}
                    </span>
                    <span className="mt-1 block text-[11px] leading-4 text-white/48">
                      {copy}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </article>

          <section className="mt-5 grid grid-cols-[0.86fr_1fr] gap-4">
            <article className="grid grid-cols-[minmax(0,1fr)_130px] items-center gap-5 rounded-[12px] border border-white/10 bg-white/[0.025] p-4">
              <div>
                <h2 className="text-[15px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
                  Not a member yet?
                </h2>
                <p className="mt-2 text-[13px] leading-5 text-white/52">
                  Join Sushi Bliss to unlock exclusive offers and premium dining
                  privileges.
                </p>
              </div>
              <Button
                className="h-12 rounded-[9px] uppercase tracking-[0.08em]"
                href="/profile"
                variant="secondary"
              >
                Join now
              </Button>
            </article>

            <Button
              className="red-glow-button grid h-full min-h-[96px] rounded-[11px] uppercase tracking-[0.08em]"
              disabled={expired}
              onClick={() => onApplyOffer(offer)}
            >
              <span className="grid gap-2">
                <span className="editorial-title text-[21px]">
                  {expired ? "Offer expired" : "Reserve with offer"}
                </span>
                <span className="text-[13px] font-normal normal-case tracking-normal text-white/70">
                  {copyMessage || "You will apply the offer at checkout"}
                </span>
              </span>
            </Button>
          </section>
        </section>
      </main>

      <TabletOfferDetailBottomNav />
    </section>
  );
}
