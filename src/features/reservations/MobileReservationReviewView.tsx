"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/homeDashboardData";
import type { ReservationDraft } from "@/types/reservation";

import {
  getReservationDraftDisplay,
  MobileReservationBackButton,
  MobileReservationIconCircle,
  MobileReservationPanel,
  MobileReservationsHeader,
  MobileReservationStepRail,
} from "./MobileReservationsPrimitives";

interface MobileReservationReviewViewProps {
  cartCount: number;
  draft: ReservationDraft;
  onBack: () => void;
  onConfirm: () => void;
  onEditDetails: () => void;
  onOpenCart: () => void;
  unreadNotificationCount: number;
}

/** Mobile reservation review step before writing the reservation to local storage. */
export function MobileReservationReviewView({
  cartCount,
  draft,
  onBack,
  onConfirm,
  onEditDetails,
  onOpenCart,
  unreadNotificationCount,
}: MobileReservationReviewViewProps) {
  const display = getReservationDraftDisplay(draft);

  return (
    <div className="mobile-frame relative z-10">
      <MobileReservationsHeader
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        unreadNotificationCount={unreadNotificationCount}
      />

      <div className="mt-7 grid grid-cols-[50px_1fr] items-center gap-4">
        <MobileReservationBackButton
          label="Back to experience"
          onClick={onBack}
        />
        <p className="editorial-title text-[21px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Reservation
        </p>
      </div>

      <section className="mt-8">
        <p className="editorial-title text-[22px] uppercase text-[var(--sb-gold-soft)]">
          Review
        </p>
        <h1 className="editorial-title mt-3 text-[36px] leading-none tracking-[0.07em] text-white min-[390px]:text-[42px] min-[390px]:tracking-[0.08em]">
          Confirmation
        </h1>
        <p className="mt-4 text-[17px] leading-6 text-[var(--sb-gold-soft)]">
          Review your details and confirm your reservation.
        </p>
      </section>

      <MobileReservationStepRail activeStep={3} />

      <MobileReservationPanel className="mt-7 overflow-hidden">
        <div className="relative h-[170px]">
          <Image
            alt="Reservation summary sushi"
            className="object-cover object-[52%_58%]"
            fill
            loading="eager"
            priority
            sizes="430px"
            src="/assets/menu/sushi/otoro-nigiri.webp"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.66))]" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="editorial-title text-[17px] uppercase text-[var(--sb-gold-soft)]">
              {display.experience?.title}
            </p>
            <p className="mt-2 text-[14px] text-white/62">
              {display.experience?.priceLabel}
            </p>
          </div>
        </div>

        <div className="p-4">
          <h2 className="editorial-title text-[19px] uppercase text-[var(--sb-gold-soft)]">
            Reservation Summary
          </h2>
          <div className="mt-4 grid gap-3">
            <ReviewRow
              icon={icons.calendar}
              label="Date"
              value={display.dateLabel}
            />
            <ReviewRow
              icon={icons.clock}
              label="Time"
              value={display.timeLabel}
            />
            <ReviewRow
              icon={icons.profile}
              label="Guests"
              value={`${draft.partySize} ${
                draft.partySize === 1 ? "Guest" : "Guests"
              }`}
            />
            <ReviewRow
              icon={icons.location}
              label="Location"
              supporting={display.location?.address}
              value={display.location?.name || draft.locationId}
            />
            <ReviewRow
              icon={icons.flower}
              label="Table"
              value={draft.seatingPreference}
            />
            <ReviewRow
              icon={icons.star}
              label="Occasion"
              value={draft.occasion || "No occasion"}
            />
            <ReviewRow
              icon={icons.menu}
              label="Requests"
              value={draft.notes || "No special requests added."}
            />
          </div>
        </div>
      </MobileReservationPanel>

      <MobileReservationPanel className="mt-4 grid grid-cols-[64px_1fr] gap-4 p-4">
        <MobileReservationIconCircle icon={icons.star} />
        <p>
          <span className="editorial-title block text-[17px] uppercase text-[var(--sb-gold-soft)]">
            Our Reservation Policy
          </span>
          <span className="mt-2 block text-[14px] leading-6 text-white/58">
            We hold your table with care. Please arrive on time. You can modify
            or cancel your reservation from this page.
          </span>
        </p>
      </MobileReservationPanel>

      <button
        className="red-glow-button mt-5 flex h-[62px] w-full items-center justify-center rounded-[14px] text-[15px] min-[390px]:h-[72px] min-[390px]:rounded-[16px] min-[390px]:text-[17px]"
        onClick={onConfirm}
        type="button"
      >
        Confirm Reservation
      </button>
      <button
        className="mt-4 flex h-[56px] w-full items-center justify-center rounded-[14px] text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onEditDetails}
        type="button"
      >
        Edit Details
      </button>
    </div>
  );
}

function ReviewRow({
  icon,
  label,
  supporting,
  value,
}: {
  icon?: string;
  label: string;
  supporting?: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[46px_1fr] gap-4 border-b border-white/10 pb-3 last:border-b-0">
      <AssetIcon className="mt-1" size={29} src={icon} />
      <p className="min-w-0">
        <span className="block text-[12px] uppercase tracking-[0.08em] text-white/46">
          {label}
        </span>
        <span className="mt-1 block text-[17px] leading-6 text-white">
          {value}
        </span>
        {supporting ? (
          <span className="mt-1 block text-[13px] leading-5 text-white/48">
            {supporting}
          </span>
        ) : null}
      </p>
    </div>
  );
}
