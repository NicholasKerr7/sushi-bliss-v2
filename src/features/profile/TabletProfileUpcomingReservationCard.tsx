import Image from "next/image";
import Link from "next/link";

import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { locations } from "@/data/locations";
import type { RestaurantLocation } from "@/types/location";
import type { Reservation } from "@/types/reservation";

interface ReservationDateSummary {
  day: string;
  month: string;
  time: string;
  weekday: string;
}

export function TabletProfileUpcomingReservationCard({
  reservation,
  reservationDate,
  reservationLocation,
}: {
  reservation?: Reservation;
  reservationDate: ReservationDateSummary;
  reservationLocation?: RestaurantLocation;
}) {
  return (
    <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Upcoming reservation
        </h2>
        <Link
          className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          href="/reservations"
        >
          View details <ChevronIcon direction="right" size={18} />
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-[150px_minmax(0,1fr)] overflow-hidden rounded-[12px] border border-white/10">
        <div className="relative min-h-[122px]">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="150px"
            src={reservationLocation?.imageUrl || locations[0].imageUrl}
          />
        </div>
        <div className="grid grid-cols-[74px_minmax(0,1fr)]">
          <div className="grid place-items-center border-r border-white/10 text-center">
            <span>
              <span className="block text-[12px] uppercase text-white/58">
                {reservationDate.weekday}
              </span>
              <span className="editorial-title block text-[36px] leading-none text-white">
                {reservationDate.day}
              </span>
              <span className="block text-[12px] uppercase text-white/58">
                {reservationDate.month}
              </span>
            </span>
          </div>
          <div className="p-4">
            <p className="text-[15px] font-semibold text-white">
              {reservationDate.time}
            </p>
            <p className="mt-1 text-[13px] text-white/58">
              {reservation?.partySize || 2} Guests
            </p>
            <p className="mt-4 border-t border-white/10 pt-3 text-[14px] font-semibold text-white">
              {reservationLocation?.name || "Sushi Bliss Downtown"}
            </p>
            <p className="mt-1 text-[12px] text-white/52">
              {reservationLocation?.address || "123 Kai Street, Tokyo"}
            </p>
            <span className="mt-3 inline-flex rounded-full border border-[var(--sb-gold)]/34 px-3 py-1 text-[12px] text-[var(--sb-gold-soft)]">
              Chef&apos;s Omakase Experience
            </span>
          </div>
        </div>
      </div>
      <Button
        className="red-glow-button mt-3 h-[40px] w-full rounded-[10px] uppercase tracking-[0.08em]"
        href="/reservations"
      >
        Manage reservation
      </Button>
    </article>
  );
}
