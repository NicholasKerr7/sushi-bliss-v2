"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type {
  OmakasePackage,
  OmakaseReview,
  SakePairingOption,
} from "@/types/omakase";

import {
  MobileOmakaseBackButton,
  MobileOmakasePanel,
} from "./MobileOmakasePrimitives";

interface MobileOmakaseReviewViewProps {
  guestCount: number;
  review: OmakaseReview;
  sakePairingId: string;
  sakePairingOptions: SakePairingOption[];
  onBack: () => void;
  onGuestCountChange: (guestCount: number) => void;
  onSakePairingChange: (pairingId: string) => void;
}

/** Mobile omakase reservation review with guest count, pairing, and total controls. */
export function MobileOmakaseReviewView({
  guestCount,
  review,
  sakePairingId,
  sakePairingOptions,
  onBack,
  onGuestCountChange,
  onSakePairingChange,
}: MobileOmakaseReviewViewProps) {
  const selectedPackage = review.package;

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <MobileOmakaseBackButton
          label="Back to omakase packages"
          onClick={onBack}
        />
        <StatusBadge tone={selectedPackage.accent}>
          Reservation review
        </StatusBadge>
      </div>

      <MobileOmakasePanel className="mt-5 overflow-hidden">
        <div className="relative min-h-[286px] p-5">
          <Image
            alt={selectedPackage.image.alt || selectedPackage.title}
            className="absolute inset-0 object-cover opacity-78"
            fill
            loading="eager"
            priority
            sizes="430px"
            src={selectedPackage.image.publicUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.88)_100%)]" />
          <div className="relative z-10 flex min-h-[246px] flex-col justify-end">
            <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              {selectedPackage.subtitle}
            </p>
            <h1 className="editorial-title mt-3 text-[34px] uppercase leading-none text-white min-[390px]:text-[38px]">
              {selectedPackage.title}
            </h1>
            <p className="mt-4 font-mono text-[28px] text-[var(--sb-gold-soft)]">
              {formatMoney(review.totalCents)}
            </p>
          </div>
        </div>
      </MobileOmakasePanel>

      <MobileOmakaseGuestControl
        guestCount={guestCount}
        selectedPackage={selectedPackage}
        onGuestCountChange={onGuestCountChange}
      />

      <MobileOmakasePanel className="mt-4 p-5">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Sake pairing
        </p>
        <div className="mt-4 grid gap-3">
          <MobilePairingChoice
            active={!sakePairingId}
            label="No pairing"
            priceCents={0}
            onSelect={() => onSakePairingChange("")}
          >
            Keep the tasting focused on tea and house pairings.
          </MobilePairingChoice>
          {sakePairingOptions.map((pairing) => (
            <MobilePairingChoice
              active={sakePairingId === pairing.id}
              key={pairing.id}
              label={pairing.label}
              priceCents={pairing.priceCents}
              onSelect={() => onSakePairingChange(pairing.id)}
            >
              {pairing.description}
            </MobilePairingChoice>
          ))}
        </div>
      </MobileOmakasePanel>

      <MobileOmakasePanel className="mt-4 p-5">
        <ReviewRow label="Package" value={formatMoney(review.subtotalCents)} />
        <ReviewRow
          label="Pairing"
          value={
            review.sakePairing
              ? formatMoney(review.sakePairing.priceCents * guestCount)
              : "$0.00"
          }
        />
        <ReviewRow
          label="Total"
          premium
          value={formatMoney(review.totalCents)}
        />
      </MobileOmakasePanel>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          className="grid min-h-[54px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          href="/gifts"
        >
          Gift it
        </Link>
        <Link
          className="red-glow-button grid min-h-[54px] place-items-center rounded-[13px] border text-[12px]"
          href="/reservations"
        >
          Reserve
        </Link>
      </div>
    </section>
  );
}

function MobileOmakaseGuestControl({
  guestCount,
  selectedPackage,
  onGuestCountChange,
}: {
  guestCount: number;
  selectedPackage: OmakasePackage;
  onGuestCountChange: (guestCount: number) => void;
}) {
  return (
    <MobileOmakasePanel className="mt-4 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Guests
          </p>
          <p className="mt-2 text-[14px] text-white/52">
            {selectedPackage.guestRange.min}-{selectedPackage.guestRange.max}{" "}
            guests
          </p>
        </div>
        <div className="grid h-[46px] w-[138px] grid-cols-3 overflow-hidden rounded-full border border-[var(--sb-border)] bg-black/34">
          <button
            aria-label="Decrease guest count"
            className="text-[22px] text-[var(--sb-gold-soft)] disabled:opacity-35"
            disabled={guestCount <= selectedPackage.guestRange.min}
            onClick={() => onGuestCountChange(guestCount - 1)}
            type="button"
          >
            -
          </button>
          <span className="grid place-items-center border-x border-white/10 font-mono text-[20px] text-white">
            {guestCount}
          </span>
          <button
            aria-label="Increase guest count"
            className="text-[22px] text-[var(--sb-gold-soft)] disabled:opacity-35"
            disabled={guestCount >= selectedPackage.guestRange.max}
            onClick={() => onGuestCountChange(guestCount + 1)}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    </MobileOmakasePanel>
  );
}

function MobilePairingChoice({
  active,
  children,
  label,
  onSelect,
  priceCents,
}: {
  active: boolean;
  children: ReactNode;
  label: string;
  onSelect: () => void;
  priceCents: number;
}) {
  return (
    <button
      aria-pressed={active}
      className={classNames(
        "grid min-h-[84px] w-full grid-cols-[1fr_auto] gap-4 rounded-[14px] border px-4 py-3 text-left",
        active
          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/12"
          : "border-[var(--sb-border)] bg-black/26",
      )}
      onClick={onSelect}
      type="button"
    >
      <span>
        <span className="block text-[15px] font-semibold text-white">
          {label}
        </span>
        <span className="mt-1 block text-[13px] leading-5 text-white/52">
          {children}
        </span>
      </span>
      <span className="font-mono text-[15px] text-[var(--sb-gold-soft)]">
        {priceCents > 0 ? formatMoney(priceCents) : "Included"}
      </span>
    </button>
  );
}

function ReviewRow({
  label,
  premium = false,
  value,
}: {
  label: string;
  premium?: boolean;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 py-3 first:pt-0 last:border-b-0 last:pb-0">
      <span className="text-[12px] uppercase tracking-[0.1em] text-white/42">
        {label}
      </span>
      <span
        className={classNames(
          "font-mono",
          premium
            ? "text-[24px] text-[var(--sb-gold-soft)]"
            : "text-[15px] text-white/70",
        )}
      >
        {value}
      </span>
    </div>
  );
}
