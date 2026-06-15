"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

interface TabletReservationHistoryViewProps {
  onBack: () => void;
  onModifyReservation: (reservation: Reservation) => void;
  onRequestCancel: (reservation: Reservation) => void;
  onViewReservation: (reservation: Reservation) => void;
  pastReservations: Reservation[];
  upcomingReservations: Reservation[];
  view: "history" | "upcoming";
}

export function TabletReservationHistoryView({
  onBack,
  onModifyReservation,
  onRequestCancel,
  onViewReservation,
  pastReservations,
  upcomingReservations,
  view,
}: TabletReservationHistoryViewProps) {
  const reservations =
    view === "upcoming" ? upcomingReservations : pastReservations;
  const summaryItems = [
    {
      icon: icons.calendar,
      label: "Upcoming",
      value: String(upcomingReservations.length),
    },
    {
      icon: icons.flower,
      label: "Past",
      value: String(pastReservations.length),
    },
    {
      icon: icons.star,
      label: "Modified",
      value: String(
        [...upcomingReservations, ...pastReservations].filter(
          (reservation) => reservation.status === "modified",
        ).length,
      ),
    },
  ] as const;

  return (
    <main className="mx-auto max-w-[1034px]">
      <button
        className="mt-5 text-[14px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]"
        onClick={onBack}
        type="button"
      >
        Back
      </button>
      <section className="mt-4 text-center">
        <h1 className="editorial-title text-[52px] uppercase leading-none tracking-[0.08em]">
          {view === "upcoming" ? "Manage Reservations" : "Reservation History"}
        </h1>
        <p className="mt-4 text-[17px] text-[var(--sb-gold-soft)]">
          Modify, cancel, or review your Sushi Bliss experiences.
        </p>
      </section>

      <section className="mt-6 grid grid-cols-3 gap-3 rounded-[18px] border border-white/10 bg-black/28 p-3">
        {summaryItems.map((item) => (
          <article
            className="flex min-h-[84px] items-center gap-4 rounded-[14px] border border-white/10 bg-white/[0.035] px-4"
            key={item.label}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/44 shadow-[0_0_18px_rgba(215,168,79,0.12)]">
              <AssetIcon size={25} src={item.icon} />
            </span>
            <span>
              <span className="block font-mono text-[28px] leading-none text-[var(--sb-gold-soft)]">
                {item.value}
              </span>
              <span className="mt-1 block text-[12px] uppercase tracking-[0.1em] text-white/52">
                {item.label}
              </span>
            </span>
          </article>
        ))}
      </section>

      <div className="mt-5 grid gap-4">
        {reservations.map((reservation) => (
          <TabletReservationHistoryCard
            key={reservation.id}
            onModifyReservation={onModifyReservation}
            onRequestCancel={onRequestCancel}
            onViewReservation={onViewReservation}
            reservation={reservation}
            view={view}
          />
        ))}
      </div>
    </main>
  );
}

function TabletReservationHistoryCard({
  onModifyReservation,
  onRequestCancel,
  onViewReservation,
  reservation,
  view,
}: {
  onModifyReservation: (reservation: Reservation) => void;
  onRequestCancel: (reservation: Reservation) => void;
  onViewReservation: (reservation: Reservation) => void;
  reservation: Reservation;
  view: "history" | "upcoming";
}) {
  const experience = reservationExperiences.find(
    (item) => item.id === reservation.experienceId,
  );
  const location = locations.find((item) => item.id === reservation.locationId);
  const canManage = view === "upcoming" && reservation.status !== "cancelled";

  return (
    <article className="relative grid grid-cols-[210px_minmax(0,1fr)_168px] gap-4 overflow-hidden rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.024))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] min-[960px]:grid-cols-[238px_minmax(0,1fr)_196px] min-[960px]:gap-5 min-[960px]:p-4">
      <div className="relative min-h-[174px] overflow-hidden rounded-[14px] bg-black/30">
        <Image
          alt={experience?.title || "Reservation"}
          className="object-cover"
          fill
          loading="eager"
          sizes="220px"
          src={
            experience?.imageUrl ||
            "/assets/gallery/cozy-night-at-sushi-bliss.webp"
          }
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(0,0,0,0.84)_100%)]" />
        <p className="absolute bottom-3 left-3 text-[12px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          {location?.neighborhood || "Sushi Bliss"}
        </p>
      </div>
      <div className="min-w-0 py-1">
        <StatusBadge tone={getReservationTone(reservation.status)}>
          {reservation.status}
        </StatusBadge>
        <h2 className="editorial-title mt-3 text-[30px] leading-none text-white">
          {experience?.title || "Reservation"}
        </h2>
        <div className="mt-4 grid gap-2 text-[13px] text-white/58 min-[960px]:grid-cols-2 min-[960px]:gap-3">
          <ReservationHistoryFact
            icon={icons.calendar}
            value={formatDateTime(reservation.startsAt)}
          />
          <ReservationHistoryFact
            icon={icons.profile}
            value={`${reservation.partySize} guests`}
          />
          <ReservationHistoryFact
            icon={icons.location}
            value={location?.name || reservation.locationId}
          />
          <ReservationHistoryFact
            icon={icons.crown}
            value={reservation.seatingPreference || "Dining table"}
          />
        </div>
        <ReservationLifecycleRail
          cancelled={reservation.status === "cancelled"}
          complete={view === "history"}
          modified={reservation.status === "modified"}
        />
        <p className="mt-4 inline-flex rounded-full border border-[var(--sb-gold)]/24 bg-black/28 px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          {reservation.confirmationCode}
        </p>
      </div>
      <div className="grid content-center gap-3 border-l border-white/10 pl-4 min-[960px]:pl-5">
        <Button
          className="red-glow-button h-12 whitespace-nowrap rounded-[12px] text-[12px] uppercase tracking-[0.04em]"
          onClick={() => onViewReservation(reservation)}
        >
          View details
        </Button>
        {canManage ? (
          <>
            <Button
              className="h-12 rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
              onClick={() => onModifyReservation(reservation)}
              variant="secondary"
            >
              Modify
            </Button>
            <Button
              className="h-12 rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
              onClick={() => onRequestCancel(reservation)}
              variant="danger"
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            className="h-12 rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
            onClick={() => onModifyReservation(reservation)}
            variant="secondary"
          >
            Reserve again
          </Button>
        )}
      </div>
    </article>
  );
}

function ReservationHistoryFact({
  icon,
  value,
}: {
  icon?: string;
  value: string;
}) {
  return (
    <p className="flex min-w-0 items-center gap-2 rounded-[10px] border border-white/8 bg-black/20 px-3 py-2">
      <AssetIcon size={17} src={icon} />
      <span className="truncate">{value}</span>
    </p>
  );
}

function ReservationLifecycleRail({
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
        className="absolute left-[16.66%] right-[16.66%] top-[11px] h-[5px] overflow-hidden rounded-full border border-white/[0.045] bg-black/52 shadow-[inset_0_0_10px_rgba(0,0,0,0.68)]"
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
              "relative z-10 mx-auto block h-6 w-6 rounded-full border bg-black",
              step.active
                ? cancelled && step.label === "Cancelled"
                  ? "border-[var(--sb-red-bright)] shadow-[0_0_18px_rgba(238,43,36,0.48)]"
                  : "border-[var(--sb-gold)] shadow-[0_0_16px_rgba(215,168,79,0.24)]"
                : "border-white/16",
            )}
          />
          <span
            className={classNames(
              "mt-2 block text-[10px] uppercase tracking-[0.08em]",
              step.active ? "text-white/72" : "text-white/36",
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
