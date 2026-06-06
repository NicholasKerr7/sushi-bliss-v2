"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { formatDateTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

interface TabletReservationHistoryViewProps {
  onBack: () => void;
  onModifyReservation: (reservation: Reservation) => void;
  onRequestCancel: (reservation: Reservation) => void;
  onViewReservation: (reservation: Reservation) => void;
  pastReservations: Reservation[];
  upcomingReservations: Reservation[];
  view: "history" | "upcoming";
}

export function TabletReservationHistoryView({
  onBack,
  onModifyReservation,
  onRequestCancel,
  onViewReservation,
  pastReservations,
  upcomingReservations,
  view,
}: TabletReservationHistoryViewProps) {
  const reservations =
    view === "upcoming" ? upcomingReservations : pastReservations;

  return (
    <main className="mx-auto max-w-[1034px]">
      <button
        className="mt-5 text-[14px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]"
        onClick={onBack}
        type="button"
      >
        Back
      </button>
      <section className="mt-4 text-center">
        <h1 className="editorial-title text-[52px] uppercase leading-none tracking-[0.08em]">
          {view === "upcoming" ? "Manage Reservations" : "Reservation History"}
        </h1>
        <p className="mt-4 text-[17px] text-[var(--sb-gold-soft)]">
          Modify, cancel, or review your Sushi Bliss experiences.
        </p>
      </section>

      <div className="mt-7 grid gap-4">
        {reservations.map((reservation) => (
          <TabletReservationHistoryCard
            key={reservation.id}
            onModifyReservation={onModifyReservation}
            onRequestCancel={onRequestCancel}
            onViewReservation={onViewReservation}
            reservation={reservation}
          />
        ))}
      </div>
    </main>
  );
}

function TabletReservationHistoryCard({
  onModifyReservation,
  onRequestCancel,
  onViewReservation,
  reservation,
}: {
  onModifyReservation: (reservation: Reservation) => void;
  onRequestCancel: (reservation: Reservation) => void;
  onViewReservation: (reservation: Reservation) => void;
  reservation: Reservation;
}) {
  const experience = reservationExperiences.find(
    (item) => item.id === reservation.experienceId,
  );
  const location = locations.find((item) => item.id === reservation.locationId);
  const cancellable = reservation.status !== "cancelled";

  return (
    <article className="grid grid-cols-[220px_1fr_220px] gap-5 rounded-[18px] border border-white/10 bg-white/[0.04] p-4">
      <div className="relative min-h-[150px] overflow-hidden rounded-[12px] bg-black/30">
        <Image
          alt={experience?.title || "Reservation"}
          className="object-cover"
          fill
          sizes="220px"
          src={
            experience?.imageUrl ||
            "/assets/gallery/cozy-night-at-sushi-bliss.webp"
          }
        />
      </div>
      <div>
        <StatusBadge tone={getReservationTone(reservation.status)}>
          {reservation.status}
        </StatusBadge>
        <h2 className="editorial-title mt-3 text-[28px] text-white">
          {experience?.title || "Reservation"}
        </h2>
        <p className="mt-2 text-[15px] leading-6 text-white/62">
          {formatDateTime(reservation.startsAt)} - {reservation.partySize}{" "}
          guests
        </p>
        <p className="mt-1 text-[14px] text-white/52">
          {location?.name || reservation.locationId}
        </p>
        <p className="mt-1 font-mono text-[13px] text-[var(--sb-gold-soft)]">
          {reservation.confirmationCode}
        </p>
      </div>
      <div className="grid content-center gap-3">
        <Button
          onClick={() => onViewReservation(reservation)}
          variant="secondary"
        >
          View details
        </Button>
        {cancellable ? (
          <>
            <Button
              onClick={() => onModifyReservation(reservation)}
              variant="ghost"
            >
              Modify
            </Button>
            <Button
              onClick={() => onRequestCancel(reservation)}
              variant="danger"
            >
              Cancel
            </Button>
          </>
        ) : null}
      </div>
    </article>
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
