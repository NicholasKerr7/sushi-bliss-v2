"use client";

import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { locations } from "@/data/locations";
import {
  getMockReservations,
  reservationExperiences,
} from "@/data/reservations";
import { getReservationStatusCounts } from "@/lib/admin";
import { formatDateTime } from "@/lib/dates";
import { titleCase } from "@/lib/format";
import type { Reservation } from "@/types/reservation";

const locationById = new Map(
  locations.map((location) => [location.id, location]),
);
const experienceById = new Map(
  reservationExperiences.map((experience) => [experience.id, experience]),
);

const reservationStatusTone: Record<
  Reservation["status"],
  "danger" | "premium" | "success"
> = {
  cancelled: "danger",
  confirmed: "success",
  modified: "premium",
};

export function AdminReservationManagement() {
  const [reservations, setReservations] = useState<Reservation[]>(
    getMockReservations(),
  );
  const reservationCounts = getReservationStatusCounts(reservations);
  const activeReservationCount =
    reservationCounts.confirmed + reservationCounts.modified;
  const reservedSeatCount = reservations
    .filter((reservation) => reservation.status !== "cancelled")
    .reduce((total, reservation) => total + reservation.partySize, 0);
  const reservationSummary = [
    {
      detail: "Live bookings",
      icon: "/assets/icons/calendar-icon.png",
      label: "Active",
      value: activeReservationCount,
    },
    {
      detail: "Dining room load",
      icon: "/assets/icons/group-icon.png",
      label: "Seats",
      value: reservedSeatCount,
    },
    {
      detail: "Guest changes",
      icon: "/assets/icons/gold-alert-icon.png",
      label: "Modified",
      value: reservationCounts.modified,
    },
  ] as const;

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
    <Card className="overflow-hidden p-0" id="reservations-admin">
      <div className="relative border-b border-white/10 bg-[radial-gradient(circle_at_14%_0%,rgba(215,168,79,0.12),transparent_34%),rgba(0,0,0,0.2)] p-5 md:p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.7),transparent)]"
        />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px] xl:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-sb-gold/30 bg-sb-gold/10">
                <AssetIcon
                  loading="eager"
                  size={26}
                  src="/assets/icons/calendar-icon.png"
                />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sb-gold-soft">
                  Seating board
                </p>
                <h2 className="mt-1 text-xl font-semibold text-sb-rice">
                  Reservation management
                </h2>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-sb-muted">
              Track booking changes, guest counts, location assignment, and
              cancellations from one compact board.
            </p>
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-[14px] border border-white/10 bg-black/24">
            {reservationSummary.map((item) => (
              <div
                className="min-w-0 border-l border-white/10 px-3 py-3 first:border-l-0 sm:px-4"
                key={item.label}
              >
                <div className="flex items-center gap-2">
                  <AssetIcon size={18} src={item.icon} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                    {item.label}
                  </p>
                </div>
                <p className="mt-1 font-mono text-lg font-semibold text-sb-rice">
                  {item.value}
                </p>
                <p className="mt-0.5 hidden truncate text-[11px] text-sb-dim sm:block">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-4 md:p-5">
        {reservations.map((reservation) => {
          const cancelled = reservation.status === "cancelled";
          const location = locationById.get(reservation.locationId);
          const experience = experienceById.get(reservation.experienceId);

          return (
            <div
              className="grid gap-4 rounded-[14px] border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] min-[900px]:grid-cols-[minmax(0,1fr)_190px_212px] min-[900px]:items-center xl:grid-cols-[minmax(0,1fr)_230px_236px]"
              key={reservation.id}
            >
              <div className="grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-[13px] border border-white/10 bg-black/32">
                  <AssetIcon
                    size={26}
                    src={
                      cancelled
                        ? "/assets/icons/x-icon.png"
                        : "/assets/icons/dining-setting-icon.png"
                    }
                  />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-sb-rice">
                      {reservation.confirmationCode}
                    </p>
                    <StatusBadge
                      tone={reservationStatusTone[reservation.status]}
                    >
                      {titleCase(reservation.status)}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-sb-muted">
                    {reservation.guestName} - {reservation.partySize} guests -{" "}
                    {experience?.title || "Dining experience"}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                    {reservation.occasion || "No occasion"} /{" "}
                    {reservation.seatingPreference || "Seating pending"}
                  </p>
                </div>
              </div>
              <div className="rounded-[12px] border border-white/10 bg-black/20 px-3 py-2 min-[900px]:text-right">
                <p className="truncate text-sm font-semibold text-sb-gold-soft">
                  {location?.name || "Location pending"}
                </p>
                <p className="mt-1 text-xs leading-5 text-sb-muted">
                  {formatDateTime(reservation.startsAt)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 min-[900px]:justify-end">
                <Button
                  aria-label={`Modify ${reservation.confirmationCode}`}
                  className="h-11 rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
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
                  aria-label={`Cancel ${reservation.confirmationCode}`}
                  className="h-11 rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
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
