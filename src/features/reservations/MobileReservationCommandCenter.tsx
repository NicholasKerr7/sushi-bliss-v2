"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import { formatTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

import {
  getReservationDisplay,
  MobileReservationIconCircle,
  MobileReservationPanel,
} from "./MobileReservationsPrimitives";

type ReservationView = "upcoming" | "past";

interface MobileReservationCommandCenterProps {
  featuredReservation?: Reservation;
  onOpenBooking: () => void;
  onViewChange: (view: ReservationView) => void;
  onViewReservation: (reservation: Reservation) => void;
  pastReservations: Reservation[];
  upcomingReservations: Reservation[];
  view: ReservationView;
}

/** Summarizes reservation status and exposes the fastest mobile reservation actions. */
export function MobileReservationCommandCenter({
  featuredReservation,
  onOpenBooking,
  onViewChange,
  onViewReservation,
  pastReservations,
  upcomingReservations,
  view,
}: MobileReservationCommandCenterProps) {
  const display = featuredReservation
    ? getReservationDisplay(featuredReservation)
    : null;
  const nextView = view === "upcoming" ? "past" : "upcoming";

  return (
    <MobileReservationPanel className="mt-5 overflow-hidden p-4">
      <div className="grid grid-cols-[58px_1fr] gap-4">
        <MobileReservationIconCircle
          className="h-[58px] w-[58px] border-[var(--sb-gold)]/44"
          icon={featuredReservation ? icons.calendar : icons.flower}
          size={29}
        />
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/48">
            Reservation Command
          </p>
          <h2 className="editorial-title mt-2 text-[24px] leading-[1.02] text-white">
            {featuredReservation ? "Your next table is set" : "Plan a visit"}
          </h2>
          <p className="mt-2 text-[14px] leading-5 text-white/58">
            {featuredReservation && display
              ? `${featuredReservation.confirmationCode} • ${display.location?.name}`
              : "Choose a future date, experience, and table preference."}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-[14px] border border-white/10 bg-black/30">
        <CommandMetric
          label="Upcoming"
          value={String(upcomingReservations.length)}
        />
        <CommandMetric
          label={featuredReservation ? "Next" : "Status"}
          value={
            featuredReservation
              ? formatTime(featuredReservation.startsAt)
              : "Open"
          }
        />
        <CommandMetric
          label="History"
          value={String(pastReservations.length)}
        />
      </div>

      <div className="mt-4 grid grid-cols-[1.15fr_0.85fr] gap-3">
        {featuredReservation ? (
          <button
            className="red-glow-button flex min-h-[56px] items-center justify-center gap-3 rounded-[13px] text-[12px] uppercase tracking-[0.08em]"
            onClick={() => onViewReservation(featuredReservation)}
            type="button"
          >
            <AssetIcon size={24} src={icons.calendar} />
            View Next
          </button>
        ) : (
          <button
            className="red-glow-button flex min-h-[56px] items-center justify-center gap-3 rounded-[13px] text-[12px] uppercase tracking-[0.08em]"
            onClick={onOpenBooking}
            type="button"
          >
            <AssetIcon size={24} src={icons.calendar} />
            Book Table
          </button>
        )}

        <button
          className="min-h-[56px] rounded-[13px] border border-[var(--sb-border)] bg-black/34 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
          onClick={() => onViewChange(nextView)}
          type="button"
        >
          {nextView === "past" ? "History" : "Upcoming"}
        </button>
      </div>
    </MobileReservationPanel>
  );
}

function CommandMetric({ label, value }: { label: string; value: string }) {
  return (
    <p className="min-w-0 px-2 py-3 text-center">
      <span className="block truncate font-mono text-[15px] text-[var(--sb-gold-soft)] min-[390px]:text-[17px]">
        {value}
      </span>
      <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-white/44">
        {label}
      </span>
    </p>
  );
}
