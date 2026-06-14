import Image from "next/image";
import { ChevronIcon } from "@/components/icons/ChevronIcon";

import { Button } from "@/components/ui/Button";
import type { Reservation } from "@/types/reservation";

import {
  desktopReservationHeroImage,
  ReservationDetails,
  ReservationImage,
} from "./DesktopReservationPrimitives";

interface DesktopReservationHistoryProps {
  onBack: () => void;
  onCancelReservation: (reservation: Reservation) => void;
  onModifyReservation: (reservation: Reservation) => void;
  pastReservations: Reservation[];
  upcomingReservations: Reservation[];
}

export function DesktopReservationHistory({
  onBack,
  onCancelReservation,
  onModifyReservation,
  pastReservations,
  upcomingReservations,
}: DesktopReservationHistoryProps) {
  const upcoming = upcomingReservations[0];

  return (
    <main className="mx-auto max-w-[1580px] px-8 pb-7 pt-7">
      <button
        className="text-[14px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
        onClick={onBack}
        type="button"
      >
        Back to booking
      </button>
      <section className="relative mt-4 overflow-hidden rounded-[20px] border border-white/10 bg-black/40 p-8">
        <Image
          alt=""
          className="object-cover object-[74%_48%] opacity-50"
          fill
          loading="eager"
          priority
          sizes="1500px"
          src={desktopReservationHeroImage}
        />
        <div className="relative z-10">
          <h1 className="editorial-title text-[38px] uppercase tracking-[0.08em]">
            Reservation history
          </h1>
          <p className="mt-3 text-[16px] text-[var(--sb-gold-soft)]">
            Your unforgettable dining experiences.
          </p>
        </div>
      </section>
      <div className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
        {upcoming ? (
          <article className="grid grid-cols-[330px_1fr_300px] items-center gap-6 rounded-[16px] border border-white/10 bg-black/28 p-5">
            <ReservationImage reservation={upcoming} />
            <ReservationDetails
              reservation={upcoming}
              title="Upcoming reservation"
            />
            <div className="grid gap-3 border-l border-white/10 pl-7">
              <Button
                className="h-12 rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
                onClick={() => onModifyReservation(upcoming)}
              >
                Modify reservation
              </Button>
              <button
                className="h-12 rounded-[12px] border border-white/12 text-[13px] uppercase tracking-[0.08em] text-white/78"
                onClick={() => onCancelReservation(upcoming)}
                type="button"
              >
                Cancel reservation
              </button>
            </div>
          </article>
        ) : null}

        <section className="mt-5 rounded-[16px] border border-white/10 bg-black/20 p-4">
          <h2 className="editorial-title text-[17px] uppercase text-[var(--sb-gold-soft)]">
            Past reservations
          </h2>
          <div className="mt-3 divide-y divide-white/10">
            {pastReservations.slice(0, 5).map((reservation) => (
              <article
                className="grid grid-cols-[180px_1fr_170px_170px] items-center gap-5 py-3"
                key={reservation.id}
              >
                <ReservationImage compact reservation={reservation} />
                <ReservationDetails compact reservation={reservation} />
                <button
                  className="h-10 rounded-[10px] border border-[var(--sb-gold)]/30 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                  onClick={() => onModifyReservation(reservation)}
                  type="button"
                >
                  Reserve again
                </button>
                <button
                  className="text-[13px] text-[var(--sb-gold-soft)]"
                  onClick={() => onModifyReservation(reservation)}
                  type="button"
                >
                  View details <ChevronIcon direction="right" size={18} />
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
