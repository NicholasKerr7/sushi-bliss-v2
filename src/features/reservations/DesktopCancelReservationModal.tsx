"use client";

import { useEffect, useId, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
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
  const titleId = useId();
  const [reason, setReason] =
    useState<(typeof cancelReasons)[number]>("Schedule changed");

  useEffect(() => {
    if (!reservation) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onKeepReservation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeepReservation, reservation]);

  if (!reservation) {
    return null;
  }

  return (
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/74 px-6 backdrop-blur-sm"
      role="dialog"
    >
      <section className="w-full max-w-[610px] rounded-[22px] border border-[var(--sb-border)] bg-[#07090a] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.66)]">
        <div className="grid h-16 w-16 place-items-center rounded-full border border-[var(--sb-red-bright)]/42 bg-[var(--sb-red)]/18">
          <AssetIcon size={34} src="/assets/icons/gold-alert-icon.png" />
        </div>
        <p className="mt-6 text-[14px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
          {reservation.confirmationCode}
        </p>
        <h2
          className="editorial-title mt-2 text-[42px] uppercase leading-none text-white"
          id={titleId}
        >
          Cancel Reservation
        </h2>
        <p className="mt-4 text-[15px] leading-6 text-white/62">
          This will move your upcoming booking to reservation history and notify
          concierge that the table can be released.
        </p>

        <div className="mt-6 rounded-[16px] border border-white/10 bg-black/24 p-4">
          <h3 className="text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Reason for cancellation
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {cancelReasons.map((item) => (
              <button
                aria-pressed={reason === item}
                className={classNames(
                  "h-12 rounded-[10px] border px-4 text-left text-[13px] uppercase tracking-[0.08em]",
                  reason === item
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/26 text-white"
                    : "border-white/10 text-white/60",
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

        <div className="mt-5 rounded-[14px] border border-[var(--sb-gold)]/20 bg-[var(--sb-gold)]/8 p-4 text-[14px] leading-6 text-white/62">
          <span className="block text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Cancellation policy
          </span>
          Reservations can be cancelled without charge until 24 hours before the
          seating time. Concierge will follow up if a policy exception applies.
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            className="h-[56px] rounded-[12px] border border-[var(--sb-gold)]/34 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={onKeepReservation}
            type="button"
          >
            Keep reservation
          </button>
          <Button
            className="h-[56px] rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
            onClick={() => onConfirm(reservation)}
            variant="danger"
          >
            Cancel reservation
          </Button>
        </div>
      </section>
    </div>
  );
}
