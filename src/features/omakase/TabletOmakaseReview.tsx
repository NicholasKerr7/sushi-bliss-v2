"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { OmakaseReview, SakePairingOption } from "@/types/omakase";

import { tabletOmakaseCourses } from "./tabletOmakaseContent";

interface TabletOmakaseReviewProps {
  review: OmakaseReview;
  sakePairingId: string;
  sakePairingOptions: SakePairingOption[];
  onBack: () => void;
  onSakePairingChange: (pairingId: string) => void;
}

const TAX_RATE = 0.08;

export function TabletOmakaseReview({
  review,
  sakePairingId,
  sakePairingOptions,
  onBack,
  onSakePairingChange,
}: TabletOmakaseReviewProps) {
  const selectedPairing =
    sakePairingOptions.find((pairing) => pairing.id === sakePairingId) ||
    sakePairingOptions[0];
  const packageSubtotal = review.package.priceCents * review.guestCount;
  const pairingSubtotal = sakePairingId
    ? selectedPairing.priceCents * review.guestCount
    : 0;
  const taxCents = Math.round((packageSubtotal + pairingSubtotal) * TAX_RATE);
  const totalCents = packageSubtotal + pairingSubtotal + taxCents;

  return (
    <main className="mx-auto w-full max-w-[1034px]">
      <section className="relative min-h-[164px] overflow-hidden rounded-b-[18px] border-x border-b border-white/10">
        <Image
          alt=""
          className="object-cover object-[70%_52%] opacity-76"
          fill
          loading="eager"
          priority
          sizes="1034px"
          src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98)_0%,rgba(5,6,7,0.82)_42%,rgba(5,6,7,0.12)_100%)]" />
        <div className="relative z-10 p-6">
          <button
            className="flex items-center gap-4 text-[13px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
            onClick={onBack}
            type="button"
          >
            <ChevronIcon direction="left" size={18} />
            Reservations / Select omakase / Review
          </button>
          <h1 className="editorial-title mt-5 text-[44px] uppercase leading-none text-white min-[1080px]:text-[50px]">
            Omakase package review
          </h1>
          <p className="mt-3 max-w-[460px] text-[15px] leading-6 text-[var(--sb-gold-soft)]">
            Review your omakase experience and details before confirming your
            reservation.
          </p>
        </div>
      </section>

      <section className="mt-3 rounded-[14px] border border-white/10 bg-white/[0.04] p-3">
        <div className="grid grid-cols-[250px_minmax(0,1fr)] gap-4">
          <div className="relative min-h-[126px] overflow-hidden rounded-[10px] border border-[var(--sb-gold)]/24">
            <Image
              alt=""
              className="object-cover"
              fill
              loading="eager"
              sizes="280px"
              src="/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp"
            />
          </div>
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Selected experience
                </p>
                <h2 className="editorial-title mt-2 text-[26px] leading-none text-white">
                  Chef&apos;s Omakase Experience
                </h2>
              </div>
              <span className="rounded-[6px] border border-[var(--sb-red-bright)] bg-[var(--sb-red)]/20 px-3 py-2 text-[11px] uppercase text-[var(--sb-red-bright)]">
                Most popular
              </span>
            </div>
            <p className="mt-2 max-w-[610px] text-[13px] leading-5 text-white/62">
              An immersive multi-course journey crafted by our master chefs,
              featuring the finest seasonal ingredients and artisanal
              techniques.
            </p>
            <div className="mt-3 grid grid-cols-4 gap-3 text-[12px] text-white/62">
              {[
                [
                  `Approx. ${review.package.durationMinutes} min`,
                  "/assets/icons/clock-icon.png",
                ],
                [`${review.guestCount} Guests`, "/assets/icons/group-icon.png"],
                ["Chef's Counter", "/assets/icons/dining-setting-icon.png"],
                [
                  "Seasonal Selection",
                  "/assets/icons/vegetarian-sushi-icon.webp",
                ],
              ].map(([label, icon]) => (
                <span
                  className="flex items-center gap-2 border-r border-white/10 last:border-r-0"
                  key={label}
                >
                  <AssetIcon size={22} src={icon} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-3 grid grid-cols-[1fr_324px] gap-3 min-[1080px]:gap-4">
        <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
          <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Course preview
          </h2>
          <div className="mt-3 grid gap-1">
            {tabletOmakaseCourses.map((course, index) => (
              <div
                className="grid h-[45px] grid-cols-[36px_82px_minmax(0,1fr)_170px] items-center gap-3"
                key={course.title}
              >
                <span className="grid h-6 w-6 place-items-center rounded-full border border-[var(--sb-gold)] text-[11px] text-[var(--sb-gold-soft)]">
                  {index + 1}
                </span>
                <div className="relative h-[40px] overflow-hidden rounded-[8px] border border-white/10">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    sizes="102px"
                    src={course.image}
                  />
                </div>
                <p className="text-[14px] font-semibold text-white">
                  {course.title}
                </p>
                <p className="line-clamp-2 text-[11px] leading-4 text-white/56">
                  {course.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-[var(--sb-gold-soft)]">
            *Course items are subject to change based on seasonal availability.
          </p>
        </article>

        <aside className="grid gap-3">
          <article className="rounded-[14px] border border-[var(--sb-gold)]/24 bg-white/[0.035] p-3">
            <h2 className="flex items-center gap-3 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              <AssetIcon
                size={24}
                src="/assets/icons/dining-setting-icon.png"
              />
              Chef&apos;s counter seating
            </h2>
            <div className="relative mt-3 h-[104px] overflow-hidden rounded-[10px]">
              <Image
                alt=""
                className="object-cover"
                fill
                loading="eager"
                sizes="300px"
                src="/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp"
              />
            </div>
            <p className="mt-3 text-[12px] leading-5 text-white/62">
              You&apos;ll be seated at our chef&apos;s counter for an up-close,
              personal dining experience.
            </p>
          </article>

          <article className="rounded-[14px] border border-[var(--sb-gold)]/24 bg-white/[0.035] p-3">
            <h2 className="text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Sake pairing <span className="text-[11px]">(optional)</span>
            </h2>
            <div className="mt-3 grid grid-cols-[98px_minmax(0,1fr)] gap-3">
              <div className="relative h-[70px] overflow-hidden rounded-[9px]">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="112px"
                  src="/assets/editorial/sake-vase-set-black-gold-floral.webp"
                />
              </div>
              <p className="text-[12px] leading-5 text-white/62">
                Premium sake pairing curated to complement each course.
              </p>
            </div>
            <div className="mt-3 overflow-hidden rounded-[10px] border border-white/10">
              <button
                aria-pressed={Boolean(sakePairingId)}
                className={classNames(
                  "grid h-10 w-full grid-cols-[30px_minmax(0,1fr)_80px] items-center gap-3 border-b border-white/10 px-3 text-left",
                  sakePairingId ? "text-white" : "text-white/58",
                )}
                onClick={() => onSakePairingChange(selectedPairing.id)}
                type="button"
              >
                <span
                  className={classNames(
                    "grid h-5 w-5 place-items-center rounded-full border",
                    sakePairingId
                      ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]"
                      : "border-white/30",
                  )}
                >
                  {sakePairingId ? "✓" : ""}
                </span>
                Add Sake Pairing
                <span className="text-right text-[var(--sb-gold-soft)]">
                  +{formatMoney(selectedPairing.priceCents * review.guestCount)}
                </span>
              </button>
              <button
                aria-pressed={!sakePairingId}
                className="grid h-9 w-full grid-cols-[30px_minmax(0,1fr)] items-center gap-3 px-3 text-left text-white/58"
                onClick={() => onSakePairingChange("")}
                type="button"
              >
                <span
                  className={classNames(
                    "h-5 w-5 rounded-full border",
                    !sakePairingId
                      ? "border-[var(--sb-gold)] bg-[var(--sb-gold)]/40"
                      : "border-white/30",
                  )}
                />
                No, thank you
              </button>
            </div>
          </article>
        </aside>
      </section>

      <section className="mt-3 rounded-[14px] border border-[var(--sb-gold)]/24 bg-white/[0.035] p-3">
        <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Reservation summary
        </h2>
        <div className="mt-3 grid grid-cols-5 rounded-[12px] border border-white/10 p-3 text-[12px] text-white/62">
          {[
            [
              "Experience",
              "Chef's Omakase Experience",
              "/assets/icons/vegetarian-sushi-icon.webp",
            ],
            [
              "Date & time",
              "Friday, May 24, 2024 7:00 PM",
              "/assets/icons/calendar-icon.png",
            ],
            [
              "Party size",
              `${review.guestCount} Guests`,
              "/assets/icons/group-icon.png",
            ],
            [
              "Seating",
              "Chef's Counter",
              "/assets/icons/dining-setting-icon.png",
            ],
            [
              "Sake pairing",
              sakePairingId
                ? `Added ${formatMoney(pairingSubtotal)}`
                : "Not added",
              "/assets/icons/golden-ticket-icon.png",
            ],
          ].map(([label, value, icon]) => (
            <div
              className="grid grid-cols-[28px_minmax(0,1fr)] gap-2 border-r border-white/10 pr-3 last:border-r-0"
              key={label}
            >
              <AssetIcon size={22} src={icon} />
              <span>
                <span className="block text-[11px] uppercase text-[var(--sb-gold-soft)]">
                  {label}
                </span>
                <span className="mt-1 block line-clamp-2 text-[13px] text-white/74">
                  {value}
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1fr_1fr_1fr_220px] overflow-hidden rounded-[12px] border border-white/10 bg-black/24 text-[13px]">
          <div className="p-3 text-white/68">
            Omakase Experience ({review.guestCount} x{" "}
            {formatMoney(review.package.priceCents)})
          </div>
          <div className="border-l border-white/10 p-3 text-white/68">
            Sake Pairing
            <span className="mt-1 block text-[var(--sb-gold-soft)]">
              {formatMoney(pairingSubtotal)}
            </span>
          </div>
          <div className="border-l border-white/10 p-3 text-white/68">
            Tax & Fees
            <span className="mt-1 block text-[var(--sb-gold-soft)]">
              {formatMoney(taxCents)}
            </span>
          </div>
          <div className="border-l border-white/10 p-3">
            <span className="text-[var(--sb-gold-soft)]">Total</span>
            <span className="float-right font-mono text-[24px] text-[var(--sb-gold-soft)]">
              {formatMoney(totalCents)}
            </span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-[220px_minmax(0,1fr)_334px] items-center gap-4">
          <Button
            className="h-[46px] rounded-[10px] uppercase tracking-[0.08em]"
            onClick={onBack}
            variant="secondary"
          >
            <ChevronIcon direction="left" size={18} /> Back to selection
          </Button>
          <p className="text-center text-[12px] text-white/54">
            Secure checkout powered by SSL encryption
          </p>
          <Button
            className="red-glow-button h-[46px] rounded-[10px] uppercase tracking-[0.08em]"
            href="/reservations"
          >
            Continue to reservation <ChevronIcon direction="right" size={18} />
          </Button>
        </div>
      </section>

      <div className="sr-only">
        <Link href="/reservations">Continue to reservation</Link>
      </div>
    </main>
  );
}
