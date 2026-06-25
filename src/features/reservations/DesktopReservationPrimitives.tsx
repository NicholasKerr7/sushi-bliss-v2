import Image from "next/image";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { classNames } from "@/lib/classNames";
import { APP_TIME_ZONE, formatTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { featuredAssets } from "@/features/home/visualHomeData";

export const desktopReservationHeroImage = featuredAssets.heroSushi.publicUrl;

export function DesktopReservationHero() {
  return (
    <section className="relative h-[190px] overflow-hidden rounded-b-[22px] border-x border-b border-white/10">
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
      <div className="relative z-10 px-14 py-6">
        <p className="text-[15px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
          Reserve your experience.
        </p>
        <h1 className="editorial-title mt-2 text-[52px] uppercase leading-none tracking-[0.12em]">
          Reser<span className="text-[var(--sb-red-bright)]">vations</span>
        </h1>
        <p className="mt-2 max-w-md text-[16px] leading-7 text-white/72">
          An unforgettable dining experience awaits. We can&apos;t wait to
          welcome you.
        </p>
      </div>
    </section>
  );
}

export function PanelBlock({
  children,
  className,
  step,
  title,
}: {
  children: ReactNode;
  className?: string;
  step: string;
  title: string;
}) {
  return (
    <section
      className={classNames(
        "border-l border-white/10 pl-5 first:border-l-0 first:pl-0",
        className,
      )}
    >
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

const calendarWeekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

interface DesktopReservationCalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

/** Renders a compact future-date calendar for desktop reservation booking. */
export function DesktopReservationCalendar({
  selectedDate,
  onSelectDate,
}: DesktopReservationCalendarProps) {
  const today = startOfLocalDay(new Date());
  const selected = parseDateInput(selectedDate) || today;
  const monthStart = new Date(selected.getFullYear(), selected.getMonth(), 1);
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(monthStart);
  const selectedLabel = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  }).format(selected);
  const firstCalendarDay = new Date(monthStart);
  firstCalendarDay.setDate(monthStart.getDate() - monthStart.getDay());
  const currentMonth = monthStart.getMonth();
  const canGoPrevious =
    monthStart >
    new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const day = new Date(firstCalendarDay);
    day.setDate(firstCalendarDay.getDate() + index);

    return day;
  });

  const changeMonth = (direction: -1 | 1) => {
    const nextMonth = new Date(
      selected.getFullYear(),
      selected.getMonth() + direction,
      1,
    );
    const safeDate = nextMonth < today ? today : nextMonth;

    onSelectDate(formatDateInput(safeDate));
  };

  return (
    <div className="mt-3 overflow-hidden rounded-[12px] border border-white/12 bg-black/24">
      <div className="flex h-9 items-center justify-between border-b border-white/10 px-3">
        <button
          aria-label="Previous month"
          className="grid h-10 w-10 place-items-center rounded-[8px] text-[var(--sb-gold-soft)] disabled:cursor-not-allowed disabled:opacity-35"
          disabled={!canGoPrevious}
          onClick={() => changeMonth(-1)}
          type="button"
        >
          <ChevronIcon direction="left" size={17} />
        </button>
        <p className="text-[14px] text-white">{monthLabel}</p>
        <button
          aria-label="Next month"
          className="grid h-10 w-10 place-items-center rounded-[8px] text-[var(--sb-gold-soft)]"
          onClick={() => changeMonth(1)}
          type="button"
        >
          <ChevronIcon direction="right" size={17} />
        </button>
      </div>
      <div className="grid grid-cols-7 px-3 pt-2 text-center text-[10px] uppercase tracking-[0.08em] text-white/52">
        {calendarWeekdays.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 justify-items-center gap-0 px-1 py-2">
        {calendarDays.map((day) => {
          const isCurrentMonth = day.getMonth() === currentMonth;
          const disabled = !isCurrentMonth || day < today;
          const selectedDay = isSameLocalDay(day, selected);

          return (
            <button
              aria-pressed={selectedDay}
              className={classNames(
                "grid h-10 place-items-center rounded-full text-[12px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                "w-10",
                selectedDay
                  ? "bg-[var(--sb-red)] text-white shadow-[0_0_16px_rgba(238,43,36,0.45)]"
                  : "text-white hover:bg-white/[0.06]",
                disabled &&
                  "cursor-not-allowed text-white/24 hover:bg-transparent",
              )}
              disabled={disabled}
              key={day.toISOString()}
              onClick={() => onSelectDate(formatDateInput(day))}
              type="button"
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
      <p className="flex items-center gap-3 border-t border-white/10 px-4 py-2 text-[13px] text-white/72">
        <AssetIcon size={16} src="/assets/icons/calendar-icon.png" />
        {selectedLabel}
      </p>
    </div>
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

function parseDateInput(value: string): Date | null {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function formatDateInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isSameLocalDay(first: Date, second: Date): boolean {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatDateOnly(value: string | Date) {
  const date =
    typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? new Date(`${value}T12:00:00.000Z`)
      : typeof value === "string"
        ? new Date(value)
        : value;

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: APP_TIME_ZONE,
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
