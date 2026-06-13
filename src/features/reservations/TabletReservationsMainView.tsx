"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { icons } from "@/features/home/visualHomeData";
import { formatDateTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

interface TabletReservationsMainViewProps {
  onModifyReservation: (reservation: Reservation) => void;
  onOpenBooking: () => void;
  onOpenHistory: () => void;
  onRequestCancel: (reservation: Reservation) => void;
  onViewReservation: (reservation: Reservation) => void;
  pastReservations: Reservation[];
  upcomingReservations: Reservation[];
}

const benefits = [
  { icon: icons.calendar, label: "Priority access", value: "for members" },
  { icon: icons.crown, label: "Exclusive", value: "seating" },
  { icon: icons.star, label: "Special occasion", value: "privileges" },
] as const;

export function TabletReservationsMainView({
  onModifyReservation,
  onOpenBooking,
  onOpenHistory,
  onRequestCancel,
  onViewReservation,
  pastReservations,
  upcomingReservations,
}: TabletReservationsMainViewProps) {
  const upcoming = upcomingReservations[0];

  return (
    <main className="mx-auto max-w-[1034px]">
      <section className="relative mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-black/30 px-8 py-10">
        <Image
          alt=""
          className="object-cover opacity-58"
          fill
          priority
          sizes="1034px"
          src="/assets/gallery/elegant-table-setting-with-candlelight-and-berries.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98)_0%,rgba(5,6,7,0.86)_42%,rgba(5,6,7,0.25)_100%)]" />
        <div className="relative max-w-[560px]">
          <p className="text-[18px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
            Timeless moments. Perfectly reserved.
          </p>
          <h1 className="editorial-title mt-4 text-[56px] uppercase leading-[0.98] tracking-[0.08em]">
            Reservations
            <span className="mt-1 block text-[var(--sb-red-bright)]">
              Crafted for You
            </span>
          </h1>
          <p className="mt-5 max-w-md text-[18px] leading-8 text-[var(--sb-gold-soft)]">
            An elevated dining experience begins with the perfect table.
          </p>
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-4">
            {benefits.map((benefit) => (
              <div
                className="border-r border-white/10 pr-4 last:border-r-0"
                key={benefit.label}
              >
                <AssetIcon size={30} src={benefit.icon} />
                <p className="mt-3 text-[13px] leading-5 text-white/62">
                  {benefit.label}
                  <span className="block">{benefit.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {upcoming ? (
        <UpcomingReservationCard
          onModifyReservation={onModifyReservation}
          onRequestCancel={onRequestCancel}
          onViewReservation={onViewReservation}
          reservation={upcoming}
        />
      ) : null}

      <Button
        className="red-glow-button mt-5 h-[70px] w-full rounded-[14px] text-[19px] uppercase tracking-[0.1em]"
        onClick={onOpenBooking}
      >
        Make a reservation
      </Button>

      <section className="mt-7">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Reservation history
          </h2>
          <button
            className="text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={onOpenHistory}
            type="button"
          >
            View all
          </button>
        </div>
        <div className="mt-4 grid gap-3">
          {pastReservations.length > 0 ? (
            pastReservations
              .slice(0, 3)
              .map((reservation) => (
                <HistoryReservationRow
                  key={reservation.id}
                  onViewReservation={onViewReservation}
                  reservation={reservation}
                />
              ))
          ) : (
            <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-5 text-[15px] text-white/52">
              Completed and cancelled reservations will appear here.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function UpcomingReservationCard({
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
  const location = locations.find((item) => item.id === reservation.locationId);
  const experience = reservationExperiences.find(
    (item) => item.id === reservation.experienceId,
  );

  return (
    <article className="mt-5 grid grid-cols-[330px_1fr_150px] gap-6 rounded-[26px] border border-[var(--sb-red)]/38 bg-white/[0.035] p-5 shadow-[0_0_34px_rgba(238,43,36,0.18)]">
      <div className="relative min-h-[220px] overflow-hidden rounded-[14px] bg-black/30">
        <Image
          alt={experience?.title || "Upcoming reservation"}
          className="object-cover"
          fill
          loading="eager"
          sizes="330px"
          src="/assets/gallery/intimate-upscale-dining-room-setting.webp"
        />
      </div>
      <div className="py-2">
        <p className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Upcoming reservation
        </p>
        <h2 className="editorial-title mt-3 text-[32px] leading-none text-white">
          {formatDateTime(reservation.startsAt)}
        </h2>
        <div className="mt-4 grid gap-2 text-[15px] leading-6 text-white/62">
          <p>
            {reservation.partySize} guests - {reservation.seatingPreference}
          </p>
          <p>{location?.name || reservation.locationId}</p>
          <p>{location?.address}</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            onClick={() => onModifyReservation(reservation)}
            variant="secondary"
          >
            Modify reservation
          </Button>
          <Button onClick={() => onRequestCancel(reservation)} variant="ghost">
            Cancel
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between rounded-[18px] border border-[var(--sb-gold)]/24 bg-black/24 p-4 text-center">
        <div>
          <p className="text-[14px] uppercase text-white/48">Table</p>
          <p className="editorial-title mt-2 text-[52px] text-[var(--sb-gold-soft)]">
            A7
          </p>
        </div>
        <button
          className="text-[14px] text-[var(--sb-gold-soft)]"
          onClick={() => onViewReservation(reservation)}
          type="button"
        >
          View details
        </button>
      </div>
    </article>
  );
}

function HistoryReservationRow({
  onViewReservation,
  reservation,
}: {
  onViewReservation: (reservation: Reservation) => void;
  reservation: Reservation;
}) {
  const experience = reservationExperiences.find(
    (item) => item.id === reservation.experienceId,
  );
  const location = locations.find((item) => item.id === reservation.locationId);

  return (
    <button
      className="grid grid-cols-[220px_1fr_150px_30px] items-center gap-5 rounded-[14px] border border-white/10 bg-white/[0.035] p-2.5 text-left"
      onClick={() => onViewReservation(reservation)}
      type="button"
    >
      <span className="relative h-[76px] overflow-hidden rounded-[10px] bg-black/30">
        <Image
          alt={experience?.title || "Reservation"}
          className="object-cover"
          fill
          loading="eager"
          sizes="220px"
          src={
            experience?.imageUrl ||
            "/assets/gallery/cozy-night-at-sushi-bliss.webp"
          }
        />
      </span>
      <span>
        <span className="block text-[15px] text-white/72">
          {formatDateTime(reservation.startsAt)}
        </span>
        <span className="mt-1 block text-[14px] text-white/52">
          {location?.name || reservation.locationId}
        </span>
        <span className="mt-1 block text-[14px] text-white/52">
          {reservation.seatingPreference} - {reservation.partySize} guests
        </span>
      </span>
      <span className="text-right">
        <StatusBadge
          tone={reservation.status === "cancelled" ? "danger" : "success"}
        >
          {reservation.status}
        </StatusBadge>
      </span>
      <span aria-hidden="true" className="text-[var(--sb-gold-soft)]">
        <ChevronIcon direction="right" size={18} />
      </span>
    </button>
  );
}
