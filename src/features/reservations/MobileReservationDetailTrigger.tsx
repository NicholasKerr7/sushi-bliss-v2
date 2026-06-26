"use client";

import type { ReactNode } from "react";

import type { Reservation } from "@/types/reservation";

interface MobileReservationDetailTriggerProps {
  ariaLabel?: string;
  children: ReactNode;
  className: string;
  onViewReservation: (reservation: Reservation) => void;
  reservation: Reservation;
}

/**
 * Opens reservation details with a native URL fallback so early mobile taps
 * still work before the hydrated React handler is ready.
 */
export function MobileReservationDetailTrigger({
  ariaLabel,
  children,
  className,
  onViewReservation,
  reservation,
}: MobileReservationDetailTriggerProps) {
  return (
    <form
      action="/reservations"
      className="contents"
      method="get"
      onSubmit={(event) => {
        event.preventDefault();
        onViewReservation(reservation);
      }}
    >
      <input name="reservation" type="hidden" value={reservation.id} />
      <button aria-label={ariaLabel} className={className} type="submit">
        {children}
      </button>
    </form>
  );
}
