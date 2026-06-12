"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { DesktopMenuHeader } from "@/features/menu/DesktopMenuChrome";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type {
  OmakasePackage,
  OmakaseReview,
  SakePairingOption,
} from "@/types/omakase";

import {
  DesktopPackageButton,
  desktopOmakaseHeroImage,
  desktopOmakaseSakeImage,
} from "./DesktopOmakasePrimitives";

const SERVICE_RATE = 0.1;
const TAX_RATE = 0.08;

interface DesktopOmakaseReviewProps {
  cartCount: number;
  guestCount: number;
  omakasePackages: OmakasePackage[];
  review: OmakaseReview;
  sakePairingId: string;
  sakePairingOptions: SakePairingOption[];
  selectedPackageId: string;
  onBack: () => void;
  onGuestCountChange: (guestCount: number) => void;
  onPackageChange: (packageId: string) => void;
  onSakePairingChange: (pairingId: string) => void;
}

export function DesktopOmakaseReview({
  cartCount,
  guestCount,
  omakasePackages,
  review,
  sakePairingId,
  sakePairingOptions,
  selectedPackageId,
  onBack,
  onGuestCountChange,
  onPackageChange,
  onSakePairingChange,
}: DesktopOmakaseReviewProps) {
  const selectedPairing = sakePairingOptions.find(
    (pairing) => pairing.id === sakePairingId,
  ) ||
    sakePairingOptions[0] || {
      description: "A curated seasonal sake pairing for the counter.",
      id: "seasonal-pairing-fallback",
      label: "Premium Sake Pairing",
      priceCents: 0,
    };
  const pairingSubtotal =
    selectedPairing && sakePairingId
      ? selectedPairing.priceCents * review.guestCount
      : 0;
  const packageSubtotal = review.package.priceCents * review.guestCount;
  const serviceCents = Math.round(
    (packageSubtotal + pairingSubtotal) * SERVICE_RATE,
  );
  const taxCents = Math.round(
    (packageSubtotal + pairingSubtotal + serviceCents) * TAX_RATE,
  );
  const totalCents =
    packageSubtotal + pairingSubtotal + serviceCents + taxCents;

  return (
    <section
      className="hidden min-h-dvh bg-[#030405] text-white xl:block"
      id="omakase"
    >
      <DesktopMenuHeader activeId="reservations" cartCount={cartCount} />
      <main className="mx-auto max-w-[1672px] px-[5.8vw] pb-7 pt-8">
        <div className="grid grid-cols-[minmax(0,1fr)_466px] gap-8">
          <section className="relative overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[#07090a]/92 p-7">
            <Image
              alt=""
              className="object-cover object-[58%_28%] opacity-42"
              fill
              priority
              sizes="1070px"
              src={desktopOmakaseHeroImage}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.96)_0%,rgba(3,4,5,0.84)_48%,rgba(3,4,5,0.56)_100%)]" />
            <div className="relative z-10">
              <button
                className="flex items-center gap-3 text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]"
                onClick={onBack}
                type="button"
              >
                <span aria-hidden="true">&lt;</span>
                Reservations
              </button>
              <h1 className="editorial-title mt-5 text-[58px] uppercase leading-[0.92] text-white">
                Omakase{" "}
                <span className="text-[var(--sb-red-bright)]">Experience</span>
              </h1>
              <p className="mt-3 text-[18px] text-[var(--sb-gold-soft)]">
                An unforgettable journey of precision, passion, and the finest
                seasonal ingredients.
              </p>

              <section className="mt-7 rounded-[18px] border border-white/10 bg-black/44 p-5">
                <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Choose your omakase package
                </h2>
                <p className="mt-2 text-[14px] text-white/60">
                  Each experience is crafted by our master chefs, showcasing the
                  art of Edomae sushi.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-4">
                  {omakasePackages.map((omakasePackage) => (
                    <DesktopPackageButton
                      isSelected={selectedPackageId === omakasePackage.id}
                      key={omakasePackage.id}
                      omakasePackage={omakasePackage}
                      onSelect={onPackageChange}
                    />
                  ))}
                </div>
              </section>

              <section className="mt-5 rounded-[18px] border border-[var(--sb-border)] bg-black/42 p-5">
                <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  All packages include
                </h2>
                <div className="mt-5 grid grid-cols-4 gap-4">
                  {[
                    ["Chef's seasonal selection", "chef-hat-icon.png"],
                    ["Premium ingredients", "floral-emblem-icon.png"],
                    ["Artful presentation", "gold-alert-icon.png"],
                    ["Unmatched hospitality", "chef-crest-icon.png"],
                  ].map(([label, icon]) => (
                    <span
                      className="flex items-center gap-3 text-[13px] text-white/66"
                      key={label}
                    >
                      <AssetIcon size={22} src={`/assets/icons/${icon}`} />
                      {label}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </section>

          <aside className="rounded-[22px] border border-[var(--sb-border)] bg-[#080a0b]/92 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
            <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Review your reservation
            </h2>
            <div className="mt-5 grid grid-cols-[124px_1fr] gap-5 border-b border-white/10 pb-5">
              <div className="relative h-[86px] overflow-hidden rounded-[10px] border border-[var(--sb-border)]">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="124px"
                  src={review.package.image.publicUrl}
                />
              </div>
              <div>
                <span className="rounded-[6px] border border-[var(--sb-gold)]/30 px-2 py-1 text-[10px] uppercase text-[var(--sb-gold-soft)]">
                  Selected package
                </span>
                <p className="editorial-title mt-3 text-[24px] uppercase text-white">
                  {review.package.title}
                </p>
                <p className="text-[13px] uppercase tracking-[0.08em] text-white/58">
                  {review.package.subtitle}
                </p>
              </div>
            </div>

            <div className="divide-y divide-white/10">
              <ReviewRow
                action="Change"
                icon="calendar-icon.png"
                label="Date"
                onAction={onBack}
                value="Friday, June 12, 2026"
              />
              <ReviewRow
                action="Change"
                icon="clock-icon.png"
                label="Time"
                onAction={onBack}
                value="7:00 PM"
              />
              <div className="grid grid-cols-[120px_1fr_118px] items-center gap-3 py-4">
                <p className="flex items-center gap-3 text-[12px] uppercase tracking-[0.1em] text-white/56">
                  <AssetIcon size={20} src="/assets/icons/group-icon.png" />
                  Party size
                </p>
                <div className="inline-grid w-[132px] grid-cols-[36px_1fr_36px] overflow-hidden rounded-[10px] border border-white/10 bg-black/32">
                  <button
                    aria-label="Decrease omakase guest count"
                    className="h-9 text-[var(--sb-gold-soft)] disabled:opacity-35"
                    disabled={guestCount <= review.package.guestRange.min}
                    onClick={() => onGuestCountChange(guestCount - 1)}
                    type="button"
                  >
                    -
                  </button>
                  <span className="grid place-items-center border-x border-white/10 font-mono text-[13px]">
                    {guestCount}
                  </span>
                  <button
                    aria-label="Increase omakase guest count"
                    className="h-9 text-[var(--sb-gold-soft)] disabled:opacity-35"
                    disabled={guestCount >= review.package.guestRange.max}
                    onClick={() => onGuestCountChange(guestCount + 1)}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <span className="text-right text-[12px] text-[var(--sb-red-bright)]">
                  {review.guestCount} Guests
                </span>
              </div>
            </div>

            <section className="border-b border-white/10 py-5">
              <h3 className="text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
                Add-on experience
              </h3>
              <button
                aria-pressed={Boolean(sakePairingId)}
                className={classNames(
                  "mt-4 grid w-full grid-cols-[96px_1fr_52px] items-center gap-4 rounded-[12px] border p-3 text-left transition",
                  sakePairingId
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/10"
                    : "border-white/10 bg-black/28",
                )}
                onClick={() =>
                  onSakePairingChange(sakePairingId ? "" : selectedPairing.id)
                }
                type="button"
              >
                <span className="relative h-[70px] overflow-hidden rounded-[8px]">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    sizes="96px"
                    src={desktopOmakaseSakeImage}
                  />
                </span>
                <span>
                  <span className="block text-[14px] text-white">
                    {selectedPairing.label}
                  </span>
                  <span className="mt-1 block text-[12px] leading-5 text-white/56">
                    {selectedPairing.description}
                  </span>
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-red-bright)] text-[var(--sb-red-bright)]">
                  {sakePairingId ? "✓" : "+"}
                </span>
              </button>
            </section>

            <section className="space-y-3 py-5">
              <TotalRow
                label={`${review.package.title} (${review.guestCount} Guests)`}
                value={packageSubtotal}
              />
              <TotalRow label="Premium Sake Pairing" value={pairingSubtotal} />
              <TotalRow label="Service Fee" value={serviceCents} />
              <TotalRow label="Tax & Fees" value={taxCents} />
            </section>
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <p className="editorial-title text-[18px] uppercase text-white">
                Total
              </p>
              <p className="font-mono text-[30px] text-[var(--sb-gold-soft)]">
                {formatMoney(totalCents)}
              </p>
            </div>
            <p className="mt-4 text-[13px] text-[var(--sb-gold-soft)]">
              You&apos;ll earn {Math.floor(totalCents / 100)} Bliss Points on
              this reservation.
            </p>
            <Link
              className="red-glow-button mt-5 flex h-[60px] w-full items-center justify-center gap-5 rounded-[12px] text-[17px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              href="/reservations"
            >
              Confirm reservation
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <p className="mt-5 flex items-center justify-center gap-2 text-[12px] text-white/54">
              <AssetIcon size={16} src="/assets/icons/lock-icon.png" />
              Secure reservation powered by SSL encryption
            </p>
          </aside>
        </div>
      </main>
    </section>
  );
}

function ReviewRow({
  action,
  icon,
  label,
  onAction,
  value,
}: {
  action: string;
  icon: string;
  label: string;
  onAction: () => void;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr_70px] items-center gap-3 py-4">
      <p className="flex items-center gap-3 text-[12px] uppercase tracking-[0.1em] text-white/56">
        <AssetIcon size={20} src={`/assets/icons/${icon}`} />
        {label}
      </p>
      <p className="text-[14px] text-white/82">{value}</p>
      <button
        className="text-right text-[12px] text-[var(--sb-red-bright)]"
        onClick={onAction}
        type="button"
      >
        {action}
      </button>
    </div>
  );
}

function TotalRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 text-[14px]">
      <span className="text-white/66">{label}</span>
      <span className="font-mono text-white/82">{formatMoney(value)}</span>
    </div>
  );
}
