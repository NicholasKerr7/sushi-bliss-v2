import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { icons } from "@/features/home/homeDashboardData";
import { classNames } from "@/lib/classNames";
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
  const modifiedCount = [...upcomingReservations, ...pastReservations].filter(
    (reservation) => reservation.status === "modified",
  ).length;

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
          <div className="mt-6 grid max-w-[660px] grid-cols-3 gap-3">
            <HistoryMetric
              icon={icons.calendar}
              label="Upcoming"
              value={upcomingReservations.length}
            />
            <HistoryMetric
              icon={icons.flower}
              label="Past visits"
              value={pastReservations.length}
            />
            <HistoryMetric
              icon={icons.star}
              label="Modified"
              value={modifiedCount}
            />
          </div>
        </div>
      </section>
      <div className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
        {upcoming ? (
          <article className="relative grid grid-cols-[330px_1fr_300px] items-center gap-6 overflow-hidden rounded-[18px] border border-[var(--sb-red)]/34 bg-[linear-gradient(135deg,rgba(238,43,36,0.1),rgba(255,255,255,0.035))] p-5 shadow-[0_0_34px_rgba(238,43,36,0.16)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-5 left-[366px] w-px bg-[linear-gradient(180deg,transparent,var(--sb-red-bright),transparent)] opacity-60"
            />
            <ReservationImage reservation={upcoming} />
            <div>
              <StatusBadge tone={getReservationTone(upcoming.status)}>
                {upcoming.status}
              </StatusBadge>
              <ReservationDetails
                reservation={upcoming}
                title="Upcoming reservation"
              />
              <DesktopReservationLifecycleRail
                cancelled={upcoming.status === "cancelled"}
                complete={false}
                modified={upcoming.status === "modified"}
              />
            </div>
            <div className="grid gap-3 border-l border-white/10 pl-7">
              <Button
                className="red-glow-button h-12 rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
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
          <div className="flex items-center justify-between">
            <h2 className="editorial-title text-[18px] uppercase text-[var(--sb-gold-soft)]">
              Past reservations
            </h2>
            <p className="text-[13px] uppercase tracking-[0.1em] text-white/42">
              Latest experiences
            </p>
          </div>
          <div className="mt-4 grid gap-3">
            {pastReservations.slice(0, 5).map((reservation) => (
              <article
                className="grid grid-cols-[180px_minmax(0,1fr)_220px_150px] items-center gap-5 rounded-[14px] border border-white/10 bg-white/[0.035] p-3"
                key={reservation.id}
              >
                <ReservationImage compact reservation={reservation} />
                <div className="min-w-0">
                  <StatusBadge tone={getReservationTone(reservation.status)}>
                    {reservation.status}
                  </StatusBadge>
                  <ReservationDetails compact reservation={reservation} />
                </div>
                <DesktopReservationLifecycleRail
                  cancelled={reservation.status === "cancelled"}
                  complete
                  modified={reservation.status === "modified"}
                />
                <Button
                  className="h-11 rounded-[11px] text-[12px] uppercase tracking-[0.08em]"
                  onClick={() => onModifyReservation(reservation)}
                  variant="secondary"
                >
                  Reserve again
                  <ChevronIcon direction="right" size={16} />
                </Button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function HistoryMetric({
  icon,
  label,
  value,
}: {
  icon?: string;
  label: string;
  value: number;
}) {
  return (
    <article className="flex min-h-[78px] items-center gap-4 rounded-[14px] border border-white/12 bg-black/36 px-4 backdrop-blur">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/44 shadow-[0_0_18px_rgba(215,168,79,0.12)]">
        <AssetIcon size={23} src={icon} />
      </span>
      <span>
        <span className="block font-mono text-[27px] leading-none text-[var(--sb-gold-soft)]">
          {value}
        </span>
        <span className="mt-1 block text-[11px] uppercase tracking-[0.1em] text-white/54">
          {label}
        </span>
      </span>
    </article>
  );
}

function DesktopReservationLifecycleRail({
  cancelled,
  complete,
  modified,
}: {
  cancelled: boolean;
  complete: boolean;
  modified: boolean;
}) {
  const steps = [
    { active: true, label: "Booked" },
    { active: modified || complete || cancelled, label: "Updated" },
    { active: complete || cancelled, label: cancelled ? "Cancelled" : "Dined" },
  ] as const;

  return (
    <ol className="relative mt-4 grid grid-cols-3 gap-2">
      <span
        aria-hidden="true"
        className="absolute left-[16.66%] right-[16.66%] top-[10px] h-[5px] overflow-hidden rounded-full border border-white/[0.045] bg-black/52 shadow-[inset_0_0_10px_rgba(0,0,0,0.68)]"
      >
        <span className="absolute inset-y-[2px] left-2 right-2 rounded-full bg-white/10" />
        <span
          className={classNames(
            "absolute inset-y-[1px] left-0 rounded-full shadow-[0_0_14px_rgba(238,43,36,0.55)]",
            cancelled
              ? "w-full bg-[linear-gradient(90deg,var(--sb-red-bright),rgba(238,43,36,0.54))]"
              : complete
                ? "w-full bg-[linear-gradient(90deg,var(--sb-red-bright),var(--sb-gold-soft))]"
                : modified
                  ? "w-1/2 bg-[linear-gradient(90deg,var(--sb-red-bright),var(--sb-gold-soft))]"
                  : "w-[18%] bg-[var(--sb-red-bright)]",
          )}
        />
      </span>
      {steps.map((step) => (
        <li className="relative text-center" key={step.label}>
          <span
            className={classNames(
              "relative z-10 mx-auto block h-5 w-5 rounded-full border bg-black",
              step.active
                ? cancelled && step.label === "Cancelled"
                  ? "border-[var(--sb-red-bright)] shadow-[0_0_16px_rgba(238,43,36,0.45)]"
                  : "border-[var(--sb-gold)] shadow-[0_0_14px_rgba(215,168,79,0.22)]"
                : "border-white/16",
            )}
          />
          <span
            className={classNames(
              "mt-2 block text-[10px] uppercase tracking-[0.08em]",
              step.active ? "text-white/70" : "text-white/34",
            )}
          >
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function getReservationTone(status: Reservation["status"]) {
  if (status === "cancelled") {
    return "danger";
  }

  if (status === "modified") {
    return "warning";
  }

  return "success";
}
