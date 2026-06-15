"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import type { Reservation } from "@/types/reservation";

import {
  getReservationDisplay,
  MobileReservationBackButton,
  MobileReservationIconCircle,
  MobileReservationPanel,
  MobileReservationsHeader,
} from "./MobileReservationsPrimitives";

interface MobileReservationDetailViewProps {
  cartCount: number;
  canManage: boolean;
  onBack: () => void;
  onModifyReservation: (reservation: Reservation) => void;
  onOpenCart: () => void;
  onRequestCancel: (reservation: Reservation) => void;
  reservation: Reservation;
  unreadNotificationCount: number;
}

interface MobileReservationConfirmationViewProps {
  cartCount: number;
  onBackHome: () => void;
  onOpenCart: () => void;
  onViewReservations: () => void;
  reservation: Reservation;
  unreadNotificationCount: number;
}

interface MobileReservationCancelViewProps {
  cartCount: number;
  onConfirmCancel: () => void;
  onKeepReservation: () => void;
  onOpenCart: () => void;
  reservation: Reservation;
  unreadNotificationCount: number;
}

export function MobileReservationDetailView({
  canManage,
  cartCount,
  onBack,
  onModifyReservation,
  onOpenCart,
  onRequestCancel,
  reservation,
  unreadNotificationCount,
}: MobileReservationDetailViewProps) {
  const display = getReservationDisplay(reservation);

  return (
    <div className="relative z-10 mx-auto max-w-[430px]">
      <MobileReservationsHeader
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        unreadNotificationCount={unreadNotificationCount}
      />

      <div className="mt-7 grid grid-cols-[50px_1fr] items-center gap-4">
        <MobileReservationBackButton
          label="Back to reservations"
          onClick={onBack}
        />
        <p className="editorial-title text-[21px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Reservation Details
        </p>
      </div>

      <MobileReservationPanel className="mt-7 overflow-hidden">
        <div className="relative h-[190px]">
          <Image
            alt={display.experience?.title || "Reservation"}
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="430px"
            src={
              display.experience?.imageUrl ||
              "/assets/gallery/intimate-upscale-dining-room-setting.webp"
            }
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.76))]" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="rounded-full border border-[var(--sb-gold)]/40 bg-black/62 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              {display.statusLabel}
            </span>
            <h1 className="editorial-title mt-4 text-[31px] leading-none text-white">
              {display.experience?.title}
            </h1>
          </div>
        </div>

        <div className="p-4">
          <p className="text-[12px] uppercase tracking-[0.12em] text-white/42">
            Confirmation
          </p>
          <p className="mt-2 break-words font-mono text-[18px] text-[var(--sb-gold-soft)]">
            {reservation.confirmationCode}
          </p>
          <div className="mt-5 grid gap-3">
            <DetailRow
              icon={icons.calendar}
              label="Date"
              value={display.dateLabel}
            />
            <DetailRow
              icon={icons.clock}
              label="Time"
              value={display.timeLabel}
            />
            <DetailRow
              icon={icons.profile}
              label="Party"
              value={`${reservation.partySize} ${
                reservation.partySize === 1 ? "Guest" : "Guests"
              }`}
            />
            <DetailRow
              icon={icons.location}
              label="Location"
              supporting={display.location?.address}
              value={display.location?.name || reservation.locationId}
            />
            <DetailRow
              icon={icons.flower}
              label="Seating"
              value={reservation.seatingPreference || "Dining table"}
            />
            <DetailRow
              icon={icons.star}
              label="Occasion"
              value={reservation.occasion || "No occasion"}
            />
            <DetailRow
              icon={icons.menu}
              label="Requests"
              value={reservation.notes || "No special requests added."}
            />
          </div>
        </div>
      </MobileReservationPanel>

      {canManage ? (
        <div className="mt-5 grid gap-3">
          <button
            className="red-glow-button flex h-[68px] w-full items-center justify-center rounded-[16px] text-[17px]"
            onClick={() => onModifyReservation(reservation)}
            type="button"
          >
            Modify Reservation
          </button>
          <button
            className="flex h-[58px] w-full items-center justify-center rounded-[14px] border border-[var(--sb-border)] bg-black/28 text-[15px] uppercase tracking-[0.08em] text-white/72"
            onClick={() => onRequestCancel(reservation)}
            type="button"
          >
            Cancel Reservation
          </button>
        </div>
      ) : (
        <Link
          className="mt-5 flex h-[62px] w-full items-center justify-center rounded-[14px] border border-[var(--sb-border)] bg-black/28 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          href="/support"
        >
          Contact Support
        </Link>
      )}
    </div>
  );
}

export function MobileReservationConfirmationView({
  cartCount,
  onBackHome,
  onOpenCart,
  onViewReservations,
  reservation,
  unreadNotificationCount,
}: MobileReservationConfirmationViewProps) {
  const display = getReservationDisplay(reservation);

  return (
    <div className="relative z-10 mx-auto max-w-[430px] text-center">
      <MobileReservationsHeader
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        unreadNotificationCount={unreadNotificationCount}
      />

      <main className="pt-14">
        <div className="mx-auto grid h-[132px] w-[132px] place-items-center rounded-full border border-[var(--sb-gold)] bg-black/42 shadow-[0_0_34px_rgb(215_168_79_/_0.24)]">
          <AssetIcon size={74} src="/assets/icons/check-icon.png" />
        </div>
        <h1 className="editorial-title mt-9 text-[40px] leading-none tracking-[0.06em] text-white">
          Reservation{" "}
          <span className="block text-[var(--sb-red-bright)]">Confirmed</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[340px] text-[17px] leading-7 text-[var(--sb-gold-soft)]">
          Your table is reserved at {display.location?.name}.
        </p>

        <MobileReservationPanel className="mt-8 overflow-hidden text-left">
          <DetailRow
            icon={icons.calendar}
            label="Date"
            value={display.dateLabel}
          />
          <DetailRow
            icon={icons.clock}
            label="Time"
            value={display.timeLabel}
          />
          <DetailRow
            icon={icons.profile}
            label="Guests"
            value={`${reservation.partySize} ${
              reservation.partySize === 1 ? "Guest" : "Guests"
            }`}
          />
          <DetailRow
            icon={icons.location}
            label="Location"
            supporting={display.location?.address}
            value={display.location?.name || reservation.locationId}
          />
          <DetailRow
            icon={icons.flower}
            label="Confirmation"
            value={reservation.confirmationCode}
          />
        </MobileReservationPanel>

        <button
          className="red-glow-button mt-7 flex h-[68px] w-full items-center justify-center rounded-[16px] text-[17px]"
          onClick={onViewReservations}
          type="button"
        >
          View Reservations
        </button>
        <button
          className="mt-4 flex h-[58px] w-full items-center justify-center rounded-[14px] border border-[var(--sb-border)] bg-black/28 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          onClick={onBackHome}
          type="button"
        >
          Back to Reservations
        </button>
      </main>
    </div>
  );
}

export function MobileReservationCancelView({
  cartCount,
  onConfirmCancel,
  onKeepReservation,
  onOpenCart,
  reservation,
  unreadNotificationCount,
}: MobileReservationCancelViewProps) {
  const display = getReservationDisplay(reservation);

  return (
    <div className="relative z-10 mx-auto max-w-[430px]">
      <MobileReservationsHeader
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        unreadNotificationCount={unreadNotificationCount}
      />

      <div className="mt-7">
        <MobileReservationBackButton
          label="Keep reservation"
          onClick={onKeepReservation}
        />
      </div>

      <MobileReservationPanel className="mt-8 p-6 text-center">
        <MobileReservationIconCircle
          className="mx-auto h-[82px] w-[82px]"
          icon="/assets/icons/gold-alert-icon.png"
          size={48}
        />
        <h1 className="editorial-title mt-6 text-[34px] leading-none text-white">
          Cancel Reservation?
        </h1>
        <p className="mt-4 text-[16px] leading-7 text-white/62">
          This will move {display.dateLabel} at {display.timeLabel} to your
          reservation history.
        </p>
        <div className="mt-6 rounded-[14px] border border-white/10 bg-black/28 p-4 text-left">
          <p className="text-[13px] uppercase tracking-[0.08em] text-white/42">
            {reservation.confirmationCode}
          </p>
          <p className="mt-2 text-[18px] text-white">
            {display.location?.name}
          </p>
          <p className="mt-1 text-[14px] text-white/52">
            {reservation.partySize} guests - {display.experience?.title}
          </p>
        </div>
      </MobileReservationPanel>

      <button
        className="red-glow-button mt-5 flex h-[68px] w-full items-center justify-center rounded-[16px] text-[17px]"
        onClick={onConfirmCancel}
        type="button"
      >
        Cancel Reservation
      </button>
      <button
        className="mt-4 flex h-[58px] w-full items-center justify-center rounded-[14px] border border-[var(--sb-border)] bg-black/28 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onKeepReservation}
        type="button"
      >
        Keep Reservation
      </button>
    </div>
  );
}

function DetailRow({
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
    <div className="grid grid-cols-[54px_1fr] gap-4 border-b border-white/10 px-4 py-4 last:border-b-0">
      <AssetIcon className="mt-1" size={31} src={icon} />
      <p className="min-w-0">
        <span className="editorial-title block text-[15px] uppercase text-[var(--sb-gold-soft)]">
          {label}
        </span>
        <span className="mt-2 block break-words text-[17px] leading-6 text-white">
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
