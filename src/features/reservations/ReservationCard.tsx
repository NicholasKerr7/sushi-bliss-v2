"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { formatDateTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

interface ReservationCardProps {
  onCancel: (reservationId: string) => void;
  onModify: (reservation: Reservation) => void;
  reservation: Reservation;
}

function getStatusTone(status: Reservation["status"]) {
  if (status === "cancelled") {
    return "danger";
  }

  if (status === "modified") {
    return "warning";
  }

  return "success";
}

export function ReservationCard({
  onCancel,
  onModify,
  reservation,
}: ReservationCardProps) {
  const location = locations.find((item) => item.id === reservation.locationId);
  const experience = reservationExperiences.find(
    (item) => item.id === reservation.experienceId,
  );
  const cancellable = reservation.status !== "cancelled";

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <StatusBadge tone={getStatusTone(reservation.status)}>
            {reservation.status}
          </StatusBadge>
          <h3 className="mt-3 text-base font-semibold text-sb-rice">
            {experience?.title || "Reservation"}
          </h3>
          <p className="mt-1 text-xs leading-5 text-sb-muted">
            {reservation.confirmationCode} - {reservation.partySize} guests
          </p>
        </div>
        <p className="text-right font-mono text-sm text-sb-gold-soft">
          {formatDateTime(reservation.startsAt)}
        </p>
      </div>

      <div className="mt-4 space-y-1 text-xs leading-5 text-sb-muted">
        <p>{location?.name || reservation.locationId}</p>
        <p>
          {reservation.seatingPreference || "Dining table"} -{" "}
          {reservation.occasion || "No occasion"}
        </p>
      </div>

      {cancellable ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button onClick={() => onModify(reservation)} variant="secondary">
            Modify
          </Button>
          <Button onClick={() => onCancel(reservation.id)} variant="ghost">
            Cancel
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
