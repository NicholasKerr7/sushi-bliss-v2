"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { locations } from "@/data/locations";
import { getMockReservations } from "@/data/reservations";
import { formatDateTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

const locationById = new Map(
  locations.map((location) => [location.id, location]),
);

export function AdminReservationManagement() {
  const [reservations, setReservations] = useState<Reservation[]>(
    getMockReservations(),
  );

  const updateReservationStatus = (
    reservationId: string,
    status: Reservation["status"],
  ) => {
    setReservations((current) =>
      current.map((reservation) =>
        reservation.id === reservationId
          ? {
              ...reservation,
              status,
            }
          : reservation,
      ),
    );
  };

  return (
    <Card className="p-5 md:p-6" id="reservations-admin">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-sb-rice">
            Reservation management
          </h2>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            Seating board for booking changes, cancellations, and location
            review.
          </p>
        </div>
        <StatusBadge tone="premium">{reservations.length} bookings</StatusBadge>
      </div>

      <div className="mt-5 grid gap-3">
        {reservations.map((reservation) => {
          const cancelled = reservation.status === "cancelled";
          const location = locationById.get(reservation.locationId);

          return (
            <div
              className="grid gap-4 rounded-card border border-sb-line bg-sb-ink/50 p-4 lg:grid-cols-[1fr_auto]"
              key={reservation.id}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-sb-rice">
                    {reservation.confirmationCode}
                  </p>
                  <StatusBadge tone={cancelled ? "danger" : "success"}>
                    {reservation.status}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-sb-muted">
                  {reservation.guestName} - {reservation.partySize} guests -{" "}
                  {location?.name || "Location pending"} -{" "}
                  {formatDateTime(reservation.startsAt)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Button
                  disabled={reservation.status === "modified"}
                  onClick={() =>
                    updateReservationStatus(reservation.id, "modified")
                  }
                  size="sm"
                  variant="ghost"
                >
                  {reservation.status === "modified" ? "Updated" : "Modify"}
                </Button>
                <Button
                  disabled={cancelled}
                  onClick={() =>
                    updateReservationStatus(reservation.id, "cancelled")
                  }
                  size="sm"
                  variant="danger"
                >
                  {cancelled ? "Cancelled" : "Cancel"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
