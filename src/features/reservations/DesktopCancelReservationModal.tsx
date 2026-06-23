"use client";

import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { classNames } from "@/lib/classNames";
import type { Reservation } from "@/types/reservation";

const cancelReasons = [
  "Schedule changed",
  "Party size changed",
  "Booked another date",
  "Other",
] as const;

export function DesktopCancelReservationModal({
  reservation,
  onConfirm,
  onKeepReservation,
}: {
  reservation: Reservation | null;
  onConfirm: (reservation: Reservation) => void;
  onKeepReservation: () => void;
}) {
  const [reason, setReason] =
    useState<(typeof cancelReasons)[number]>("Schedule changed");

  if (!reservation) {
    return null;
  }

  return (
    <Modal
      className="sm:max-w-[610px]"
      description="This will move your upcoming booking to reservation history and notify concierge that the table can be released."
      footer={
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="h-[56px] rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
            onClick={onKeepReservation}
            variant="secondary"
          >
            Keep reservation
          </Button>
          <Button
            className="h-[56px] rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
            onClick={() => onConfirm(reservation)}
            variant="danger"
          >
            Cancel reservation
          </Button>
        </div>
      }
      onOpenChange={(open) => {
        if (!open) {
          onKeepReservation();
        }
      }}
      open={Boolean(reservation)}
      title="Cancel Reservation"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[var(--sb-red-bright)]/42 bg-[var(--sb-red)]/18 shadow-[0_0_28px_rgba(239,47,37,0.18)]">
            <AssetIcon size={34} src="/assets/icons/gold-alert-icon.png" />
          </span>
          <div className="min-w-0">
            <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              Confirmation code
            </p>
            <p className="mt-1 break-words font-mono text-[22px] leading-none text-white">
              {reservation.confirmationCode}
            </p>
          </div>
        </div>

        <div className="rounded-[16px] border border-white/10 bg-black/24 p-4">
          <div className="flex items-center gap-3">
            <AssetIcon size={24} src="/assets/icons/calendar-icon.png" />
            <h3 className="text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Reason for cancellation
            </h3>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {cancelReasons.map((item) => (
              <button
                aria-pressed={reason === item}
                className={classNames(
                  "min-h-12 rounded-[10px] border px-4 text-left text-[13px] uppercase tracking-[0.08em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]",
                  reason === item
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/26 text-white shadow-[0_0_22px_rgba(239,47,37,0.18)]"
                    : "border-white/10 text-white/60 hover:border-[var(--sb-gold)]/35 hover:text-white",
                )}
                key={item}
                onClick={() => setReason(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[14px] border border-[var(--sb-gold)]/20 bg-[var(--sb-gold)]/8 p-4 text-[14px] leading-6 text-white/62">
          <span className="mb-2 flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            <AssetIcon size={20} src="/assets/icons/gold-alert-icon.png" />
            Cancellation policy
          </span>
          Reservations can be cancelled without charge until 24 hours before the
          seating time. Concierge will follow up if a policy exception applies.
        </div>
      </div>
    </Modal>
  );
}
