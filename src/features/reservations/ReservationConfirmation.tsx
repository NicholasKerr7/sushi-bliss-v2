"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { formatDateTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

interface ReservationConfirmationProps {
  onClose: () => void;
  reservation: Reservation | null;
}

export function ReservationConfirmation({
  onClose,
  reservation,
}: ReservationConfirmationProps) {
  const location = reservation
    ? locations.find((item) => item.id === reservation.locationId)
    : undefined;
  const experience = reservation
    ? reservationExperiences.find(
        (item) => item.id === reservation.experienceId,
      )
    : undefined;

  return (
    <Modal
      description={
        reservation ? formatDateTime(reservation.startsAt) : undefined
      }
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      open={Boolean(reservation)}
      title="Reservation confirmed"
      footer={
        <Button className="w-full" onClick={onClose}>
          Done
        </Button>
      }
    >
      {reservation ? (
        <div className="space-y-5">
          <div className="rounded-card border border-sb-gold/30 bg-sb-gold/10 p-4">
            <p className="text-xs font-semibold uppercase text-sb-dim">
              Confirmation
            </p>
            <p className="mt-2 font-mono text-2xl font-semibold text-sb-gold-soft">
              {reservation.confirmationCode}
            </p>
          </div>
          <div className="grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sb-muted">Experience</span>
              <span className="text-sb-rice">
                {experience?.title || reservation.experienceId}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sb-muted">Location</span>
              <span className="text-sb-rice">
                {location?.name || reservation.locationId}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sb-muted">Party</span>
              <span className="font-mono text-sb-rice">
                {reservation.partySize}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
