import Image from "next/image";
import type { ReactNode } from "react";

import { classNames } from "@/lib/classNames";
import { formatTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { featuredAssets } from "@/features/home/visualHomeData";

export const desktopReservationHeroImage = featuredAssets.heroSushi.publicUrl;

export function DesktopReservationHero() {
  return (
    <section className="relative min-h-[180px] overflow-hidden rounded-b-[22px] border-x border-b border-white/10">
      <Image
        alt=""
        className="object-cover object-[76%_45%]"
        fill
        loading="eager"
        priority
        sizes="1500px"
        src={desktopReservationHeroImage}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,5,6,0.95),rgba(4,5,6,0.76)_42%,rgba(4,5,6,0.18)_78%)]" />
      <div className="relative z-10 px-14 py-8">
        <p className="text-[15px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
          Reserve your experience.
        </p>
        <h1 className="editorial-title mt-2 text-[54px] uppercase tracking-[0.12em]">
          Reser<span className="text-[var(--sb-red-bright)]">vations</span>
        </h1>
        <p className="mt-3 max-w-md text-[16px] leading-7 text-white/72">
          An unforgettable dining experience awaits. We can&apos;t wait to
          welcome you.
        </p>
      </div>
    </section>
  );
}

export function PanelBlock({
  children,
  step,
  title,
}: {
  children: ReactNode;
  step: string;
  title: string;
}) {
  return (
    <section className="border-l border-white/10 pl-5 first:border-l-0 first:pl-0">
      <h2 className="editorial-title flex items-center gap-3 text-[17px] uppercase tracking-[0.08em]">
        <span className="grid h-6 w-6 place-items-center rounded-full border border-[var(--sb-gold)]/52 text-[12px] text-[var(--sb-gold-soft)]">
          {step}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SummaryLine({
  label,
  strong = false,
  value,
}: {
  label: string;
  strong?: boolean;
  value: string;
}) {
  return (
    <p className="flex items-center justify-between gap-5 py-3 text-[14px] text-white/58">
      <span className="uppercase tracking-[0.08em]">{label}</span>
      <span
        className={classNames(
          "text-right text-white",
          strong && "font-mono text-[var(--sb-gold-soft)]",
        )}
      >
        {value}
      </span>
    </p>
  );
}

export function ReviewRow({
  detail,
  label,
  value,
}: {
  detail?: string;
  label: string;
  value: string;
}) {
  return (
    <p className="grid grid-cols-[190px_1fr] gap-5 border-b border-white/10 px-5 py-4 last:border-b-0">
      <span className="text-[13px] uppercase tracking-[0.08em] text-white/54">
        {label}
      </span>
      <span>
        <span className="block text-[16px] text-white">{value}</span>
        {detail ? (
          <span className="mt-1 block text-[13px] text-white/48">{detail}</span>
        ) : null}
      </span>
    </p>
  );
}

export function ReservationImage({
  compact = false,
  reservation,
}: {
  compact?: boolean;
  reservation: Reservation;
}) {
  const experience =
    reservationExperiences.find(
      (item) => item.id === reservation.experienceId,
    ) || reservationExperiences[0];

  return (
    <div
      className={classNames(
        "relative overflow-hidden rounded-[10px] border border-white/10",
        compact ? "h-[76px]" : "h-[176px]",
      )}
    >
      <Image
        alt=""
        className="object-cover"
        fill
        loading={compact ? "lazy" : "eager"}
        sizes={compact ? "180px" : "330px"}
        src={experience?.imageUrl || desktopReservationHeroImage}
      />
    </div>
  );
}

export function ReservationDetails({
  compact = false,
  reservation,
  title,
}: {
  compact?: boolean;
  reservation: Reservation;
  title?: string;
}) {
  const experience =
    reservationExperiences.find(
      (item) => item.id === reservation.experienceId,
    ) || reservationExperiences[0];
  const location =
    locations.find((item) => item.id === reservation.locationId) ||
    locations[0];
  const startsAt = new Date(reservation.startsAt);

  return (
    <div>
      {title ? (
        <p className="text-[13px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
          {title}
        </p>
      ) : null}
      <h3
        className={classNames(
          "editorial-title text-white",
          compact ? "text-[17px]" : "mt-2 text-[26px]",
        )}
      >
        {formatDateOnly(startsAt)}
      </h3>
      <div className="mt-4 grid grid-cols-4 gap-4 text-[14px] text-white/62">
        <span>{formatTime(startsAt)}</span>
        <span>{reservation.partySize} Guests</span>
        <span>{experience?.title}</span>
        <span>{reservation.seatingPreference || "Table A7"}</span>
      </div>
      {!compact ? (
        <p className="mt-4 text-[14px] leading-6 text-white/56">
          {location?.name} · {location?.address}
        </p>
      ) : null}
    </div>
  );
}

export function formatDateOnly(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  }).format(date);
}

export function formatTimeLabel(time: string) {
  if (!time) {
    return "Choose a time";
  }

  const [hoursValue, minutes] = time.split(":");
  const hours = Number(hoursValue);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${hour12}:${minutes} ${suffix}`;
}

export function getReservationEstimate(
  priceLabel: string | undefined,
  partySize: number,
) {
  const match = priceLabel?.match(/\$(\d+)/);

  if (!match) {
    return "$100.00";
  }

  return `$${Number(match[1]) * partySize}.00`;
}
