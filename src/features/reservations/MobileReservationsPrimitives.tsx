"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { brand, icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import type {
  Reservation,
  ReservationDraft,
  ReservationStatus,
} from "@/types/reservation";

interface MobileReservationsHeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

const statusLabels: Record<ReservationStatus, string> = {
  cancelled: "Cancelled",
  confirmed: "Confirmed",
  modified: "Modified",
};

/** Shared mobile reservations header using the same brand treatment as customer screens. */
export function MobileReservationsHeader({
  cartCount = 0,
  onOpenCart,
}: MobileReservationsHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <Link
        className="flex min-w-0 items-center gap-3 rounded-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        href="/home"
      >
        <AssetIcon
          alt="Sushi Bliss"
          className="rounded-full"
          loading="eager"
          size={54}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[18px] leading-[0.95] tracking-[0.34em] text-white">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <div className="flex items-center gap-3">
        {cartCount > 0 && onOpenCart ? (
          <button
            aria-label="Open cart"
            className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)]"
            onClick={onOpenCart}
            type="button"
          >
            <AssetIcon loading="eager" size={25} src={icons.cart} />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold">
              {cartCount}
            </span>
          </button>
        ) : null}
        <Link
          aria-label="Notifications"
          className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)]"
          href="/notifications"
        >
          <AssetIcon loading="eager" size={27} src={icons.bell} />
          <span className="absolute right-2.5 top-2 h-3 w-3 rounded-full bg-[var(--sb-red-bright)]" />
        </Link>
      </div>
    </header>
  );
}

export function MobileReservationBackButton({
  label = "Back",
  onClick,
}: {
  label?: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="grid h-[50px] w-[50px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/46 text-[29px] leading-none text-[var(--sb-gold-soft)] shadow-[0_0_24px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
      onClick={onClick}
      type="button"
    >
      <span aria-hidden="true">&lsaquo;</span>
    </button>
  );
}

export function MobileReservationPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={classNames(
        "rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function MobileReservationIconCircle({
  className,
  icon,
  size = 28,
}: {
  className?: string;
  icon?: string;
  size?: number;
}) {
  return (
    <span
      className={classNames(
        "grid h-[56px] w-[56px] shrink-0 place-items-center rounded-full border border-[var(--sb-border)] bg-black/34",
        className,
      )}
    >
      <AssetIcon size={size} src={icon} />
    </span>
  );
}

export function MobileReservationStepRail({
  activeStep,
}: {
  activeStep: 1 | 2 | 3;
}) {
  const steps = [
    { id: 1, label: "Date & Time" },
    { id: 2, label: "Experience" },
    { id: 3, label: "Confirm" },
  ] as const;

  return (
    <nav aria-label="Reservation progress" className="mt-7">
      <ol className="grid grid-cols-3 items-start gap-2">
        {steps.map((step, index) => {
          const active = activeStep === step.id;
          const complete = activeStep > step.id;

          return (
            <li className="relative text-center" key={step.id}>
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className={classNames(
                    "absolute left-[-50%] top-[24px] h-px w-full",
                    complete || active
                      ? "bg-[var(--sb-red-bright)]"
                      : "bg-white/20",
                  )}
                />
              ) : null}
              <span
                className={classNames(
                  "relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full border text-[18px]",
                  active
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/24 text-white shadow-[0_0_24px_var(--sb-red-glow)]"
                    : complete
                      ? "border-[var(--sb-gold)] text-[var(--sb-gold-soft)]"
                      : "border-white/24 text-white/52",
                )}
              >
                {complete ? (
                  <AssetIcon size={18} src="/assets/icons/check-icon.png" />
                ) : (
                  step.id
                )}
              </span>
              <span
                className={classNames(
                  "mt-3 block text-[12px] uppercase leading-4 tracking-[0.04em]",
                  active
                    ? "text-[var(--sb-red-bright)]"
                    : complete
                      ? "text-[var(--sb-gold-soft)]"
                      : "text-white/54",
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function getReservationDisplay(reservation: Reservation) {
  const startsAt = new Date(reservation.startsAt);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    weekday: "long",
  }).format(startsAt);
  const dayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(startsAt);
  const timeLabel = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(startsAt);
  const location =
    locations.find((item) => item.id === reservation.locationId) ||
    locations[0];
  const experience =
    reservationExperiences.find(
      (item) => item.id === reservation.experienceId,
    ) || reservationExperiences[0];

  return {
    dateLabel,
    dayLabel,
    experience,
    location,
    statusLabel: statusLabels[reservation.status],
    timeLabel,
  };
}

export function getReservationDraftDisplay(draft: ReservationDraft) {
  const startsAt =
    draft.date && draft.time
      ? new Date(`${draft.date}T${draft.time}:00`)
      : null;
  const dateLabel =
    startsAt && !Number.isNaN(startsAt.getTime())
      ? new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          weekday: "long",
        }).format(startsAt)
      : "Choose a date";
  const shortDateLabel =
    startsAt && !Number.isNaN(startsAt.getTime())
      ? new Intl.DateTimeFormat("en-US", {
          day: "numeric",
          month: "short",
          weekday: "short",
        }).format(startsAt)
      : "Date";
  const timeLabel =
    startsAt && !Number.isNaN(startsAt.getTime())
      ? new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }).format(startsAt)
      : "Time";
  const location =
    locations.find((item) => item.id === draft.locationId) || locations[0];
  const experience =
    reservationExperiences.find((item) => item.id === draft.experienceId) ||
    reservationExperiences[0];

  return {
    dateLabel,
    experience,
    location,
    shortDateLabel,
    timeLabel,
  };
}
