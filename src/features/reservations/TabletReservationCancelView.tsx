"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { icons } from "@/features/home/visualHomeData";
import type { Reservation } from "@/types/reservation";

interface TabletReservationCancelViewProps {
  onConfirmCancel: () => void;
  onKeepReservation: () => void;
  reservation: Reservation;
}

/** Shows the policy and booking details before a tablet reservation is cancelled. */
export function TabletReservationCancelView({
  onConfirmCancel,
  onKeepReservation,
  reservation,
}: TabletReservationCancelViewProps) {
  const location = locations.find((item) => item.id === reservation.locationId);
  const experience = reservationExperiences.find(
    (item) => item.id === reservation.experienceId,
  );
  const startsAt = new Date(reservation.startsAt);

  return (
    <main className="mx-auto max-w-[1034px]">
      <section className="mt-8 text-center">
        <h1 className="editorial-title text-[54px] uppercase leading-none tracking-[0.1em]">
          Cancel Reservation
        </h1>
        <p className="mt-3 text-[19px] text-[var(--sb-gold-soft)]">
          Are you sure you want to cancel this reservation?
        </p>
      </section>

      <section className="mt-7 rounded-[24px] border border-white/12 bg-white/[0.04] p-7">
        <h2 className="text-[22px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Reservation details
        </h2>
        <div className="mt-5 grid grid-cols-[330px_1fr] gap-8">
          <div className="relative min-h-[330px] overflow-hidden rounded-[16px] bg-black/30">
            <Image
              alt={experience?.title || "Reservation"}
              className="object-cover"
              fill
              priority
              sizes="330px"
              src={
                experience?.imageUrl ||
                "/assets/gallery/cozy-night-at-sushi-bliss.webp"
              }
            />
          </div>

          <div className="grid content-center gap-5">
            <div className="grid grid-cols-2 gap-5">
              <CancelDetail
                icon={icons.calendar}
                label="Date"
                value={formatCancelDate(startsAt)}
              />
              <CancelDetail
                icon={icons.clock}
                label="Time"
                value={formatCancelTime(startsAt)}
              />
              <CancelDetail
                icon={icons.profile}
                label="Party size"
                value={`${reservation.partySize} guests`}
              />
              <CancelDetail
                icon={icons.crown}
                label="Table"
                value={reservation.seatingPreference || "Table A7"}
              />
            </div>

            <div className="border-y border-white/10 py-5">
              <CancelDetail
                icon={icons.location}
                label="Location"
                supporting={location?.address}
                value={location?.name || reservation.locationId}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <CancelDetail
                icon={icons.calendar}
                label="Reservation ID"
                value={reservation.confirmationCode}
              />
              <CancelDetail
                icon="/assets/icons/credit-card-icon.png"
                label="Booked on"
                value="Local booking"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-[360px_1fr] gap-6 rounded-[24px] border border-white/12 bg-white/[0.04] p-7">
        <div className="flex items-center gap-6 border-r border-white/10 pr-6">
          <span className="grid h-24 w-24 place-items-center rounded-full border border-[var(--sb-red)]/55 bg-[var(--sb-red)]/10 shadow-[0_0_34px_rgba(238,43,36,0.2)]">
            <AssetIcon size={48} src="/assets/icons/gold-alert-icon.png" />
          </span>
          <div>
            <h2 className="text-[22px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Cancellation policy
            </h2>
            <p className="mt-3 text-[17px] leading-7 text-white/66">
              Late cancellations may be subject to a fee.
            </p>
          </div>
        </div>
        <div className="grid content-center gap-5">
          {policyItems.map((item) => (
            <div className="flex items-start gap-4" key={item.title}>
              <span className="mt-1 grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-red)] text-[var(--sb-red-bright)]">
                <AssetIcon size={14} src={icons.x} />
              </span>
              <span>
                <span className="block text-[18px] text-white">
                  {item.title}
                </span>
                <span className="mt-1 block text-[14px] text-white/50">
                  {item.description}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-7 grid grid-cols-2 gap-4">
        <Button
          className="h-[70px] rounded-[14px] text-[18px] uppercase tracking-[0.1em]"
          onClick={onKeepReservation}
          variant="secondary"
        >
          Keep reservation
        </Button>
        <Button
          className="red-glow-button h-[70px] rounded-[14px] text-[18px] uppercase tracking-[0.1em]"
          onClick={onConfirmCancel}
          variant="danger"
        >
          Cancel reservation
        </Button>
      </div>

      <p className="mt-5 text-center text-[14px] text-white/48">
        If you prepaid, a refund will be issued according to our cancellation
        policy.
      </p>
    </main>
  );
}

const policyItems = [
  {
    description: "No charge. Full refund for any prepayment.",
    title: "Cancellations 24+ hours before reservation",
  },
  {
    description: "50% cancellation fee per person.",
    title: "Cancellations within 24 hours",
  },
  {
    description: "100% charge per person.",
    title: "No-shows",
  },
] as const;

function CancelDetail({
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
    <div className="grid grid-cols-[42px_1fr] items-start gap-4">
      <AssetIcon size={30} src={icon} />
      <span>
        <span className="block text-[13px] uppercase tracking-[0.1em] text-white/42">
          {label}
        </span>
        <span className="mt-2 block text-[18px] text-white lg:text-[21px]">
          {value}
        </span>
        {supporting ? (
          <span className="mt-1 block text-[14px] leading-5 text-white/48">
            {supporting}
          </span>
        ) : null}
      </span>
    </div>
  );
}

function formatCancelDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  }).format(date);
}

function formatCancelTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
