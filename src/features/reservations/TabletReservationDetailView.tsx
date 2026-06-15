"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { icons } from "@/features/home/visualHomeData";
import { formatDateTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

interface TabletReservationDetailViewProps {
  onBack: () => void;
  onModifyReservation: (reservation: Reservation) => void;
  onRequestCancel: (reservation: Reservation) => void;
  reservation: Reservation;
}

/** Presents a focused tablet reservation detail screen for history rows. */
export function TabletReservationDetailView({
  onBack,
  onModifyReservation,
  onRequestCancel,
  reservation,
}: TabletReservationDetailViewProps) {
  const experience = reservationExperiences.find(
    (item) => item.id === reservation.experienceId,
  );
  const location = locations.find((item) => item.id === reservation.locationId);
  const cancellable = reservation.status !== "cancelled";

  return (
    <main className="mx-auto max-w-[1034px]">
      <button
        className="mt-5 text-[14px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]"
        onClick={onBack}
        type="button"
      >
        Back
      </button>

      <section className="mt-5 overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04]">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr]">
          <div className="relative min-h-[500px] bg-black/30">
            <Image
              alt={experience?.title || "Reservation"}
              className="object-cover"
              fill
              loading="eager"
              priority
              sizes="420px"
              src={
                experience?.imageUrl ||
                "/assets/gallery/cozy-night-at-sushi-bliss.webp"
              }
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,6,7,0.86),rgba(5,6,7,0.05)_56%)]" />
            <div className="absolute bottom-6 left-6 right-6">
              <StatusBadge tone={getReservationTone(reservation.status)}>
                {reservation.status}
              </StatusBadge>
              <h1 className="editorial-title mt-4 text-[42px] uppercase leading-none tracking-[0.08em] text-white">
                {experience?.title || "Reservation"}
              </h1>
            </div>
          </div>

          <div className="p-8">
            <p className="text-[15px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              Reservation details
            </p>
            <p className="mt-3 font-mono text-[34px] text-[var(--sb-red-bright)]">
              {reservation.confirmationCode}
            </p>

            <div className="mt-7 grid gap-3">
              <DetailRow
                icon={icons.calendar}
                label="Date and time"
                value={formatDateTime(reservation.startsAt)}
              />
              <DetailRow
                icon={icons.profile}
                label="Party"
                value={`${reservation.partySize} guests`}
              />
              <DetailRow
                icon={icons.flower}
                label="Seating"
                value={reservation.seatingPreference || "Dining table"}
              />
              <DetailRow
                icon={icons.location}
                label="Location"
                supporting={location?.address}
                value={location?.name || reservation.locationId}
              />
              <DetailRow
                icon={icons.star}
                label="Occasion"
                value={reservation.occasion || "No occasion"}
              />
              <DetailRow
                icon={icons.settings}
                label="Special requests"
                value={reservation.notes || "No special requests added."}
              />
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button
                className="h-[58px] rounded-[14px] uppercase tracking-[0.08em]"
                onClick={() => onModifyReservation(reservation)}
                variant="secondary"
              >
                Modify
              </Button>
              {cancellable ? (
                <Button
                  className="h-[58px] rounded-[14px] uppercase tracking-[0.08em]"
                  onClick={() => onRequestCancel(reservation)}
                  variant="danger"
                >
                  Cancel reservation
                </Button>
              ) : (
                <Button
                  className="h-[58px] rounded-[14px] uppercase tracking-[0.08em]"
                  disabled
                  variant="ghost"
                >
                  Cancelled
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
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
    <div className="grid grid-cols-[44px_1fr] items-center gap-4 rounded-[14px] border border-white/10 bg-black/22 p-4">
      <AssetIcon size={30} src={icon} />
      <span>
        <span className="block text-[12px] uppercase tracking-[0.1em] text-white/42">
          {label}
        </span>
        <span className="mt-1 block text-[16px] text-white">{value}</span>
        {supporting ? (
          <span className="mt-1 block text-[13px] text-white/48">
            {supporting}
          </span>
        ) : null}
      </span>
    </div>
  );
}

function getReservationTone(status: Reservation["status"]) {
  if (status === "cancelled") {
    return "danger";
  }

  if (status === "modified") {
    return "warning";
  }

  return "success";
}
