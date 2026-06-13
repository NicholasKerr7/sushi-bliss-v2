"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import type { Reservation } from "@/types/reservation";

import {
  getReservationDisplay,
  MobileReservationIconCircle,
  MobileReservationPanel,
  MobileReservationsHeader,
} from "./MobileReservationsPrimitives";
import { MobileReservationCommandCenter } from "./MobileReservationCommandCenter";

type ReservationView = "upcoming" | "past";

interface MobileReservationsMainViewProps {
  cartCount: number;
  currentTime: number;
  onModifyReservation: (reservation: Reservation) => void;
  onOpenBooking: () => void;
  onOpenCart: () => void;
  onRequestCancel: (reservation: Reservation) => void;
  onViewChange: (view: ReservationView) => void;
  onViewReservation: (reservation: Reservation) => void;
  pastReservations: Reservation[];
  upcomingReservations: Reservation[];
  unreadNotificationCount: number;
  view: ReservationView;
}

/** Mobile reservations dashboard matching the reference list and booking entry. */
export function MobileReservationsMainView({
  cartCount,
  currentTime,
  onModifyReservation,
  onOpenBooking,
  onOpenCart,
  onRequestCancel,
  onViewChange,
  onViewReservation,
  pastReservations,
  upcomingReservations,
  unreadNotificationCount,
  view,
}: MobileReservationsMainViewProps) {
  const featuredReservation = upcomingReservations[0];
  const visibleReservations =
    view === "upcoming"
      ? upcomingReservations.slice(featuredReservation ? 1 : 0)
      : pastReservations;

  return (
    <>
      <div className="relative z-10 mx-auto max-w-[430px]">
        <MobileReservationsHeader
          cartCount={cartCount}
          onOpenCart={onOpenCart}
          unreadNotificationCount={unreadNotificationCount}
        />

        <section className="relative mt-10 overflow-hidden rounded-[22px] border border-transparent pb-5">
          <div className="absolute inset-x-0 top-0 h-[190px] opacity-70">
            <Image
              alt=""
              className="object-cover object-[64%_40%]"
              fill
              priority
              sizes="430px"
              src="/assets/gallery/elegant-table-setting-with-candlelight-and-berries.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.76)_54%,rgba(5,5,5,0.28)_100%)]" />
          </div>
          <div className="relative pt-8">
            <h1 className="editorial-title text-[40px] leading-none tracking-[0.08em] text-white">
              Reservations
            </h1>
            <p className="mt-4 max-w-[320px] text-[18px] leading-6 text-[var(--sb-gold-soft)]">
              Thoughtfully prepared. Unforgettable moments.
            </p>
          </div>
        </section>

        <MobileReservationCommandCenter
          featuredReservation={featuredReservation}
          onOpenBooking={onOpenBooking}
          onViewChange={onViewChange}
          onViewReservation={onViewReservation}
          pastReservations={pastReservations}
          upcomingReservations={upcomingReservations}
          view={view}
        />

        <section className="mt-4">
          <h2 className="editorial-title text-[23px] uppercase text-[var(--sb-gold-soft)]">
            Upcoming Reservation
          </h2>
          {featuredReservation ? (
            <FeaturedReservationCard
              onModifyReservation={onModifyReservation}
              onRequestCancel={onRequestCancel}
              onViewReservation={onViewReservation}
              reservation={featuredReservation}
            />
          ) : (
            <MobileReservationPanel className="mt-4 p-5 text-center">
              <AssetIcon className="mx-auto" size={54} src={icons.calendar} />
              <h3 className="editorial-title mt-4 text-[24px] text-white">
                No upcoming reservation
              </h3>
              <p className="mt-3 text-[15px] leading-6 text-white/58">
                Reserve a table to start planning your next Sushi Bliss visit.
              </p>
            </MobileReservationPanel>
          )}
        </section>

        <button
          className="red-glow-button mt-5 flex h-[72px] w-full items-center justify-center gap-4 rounded-[16px] text-[18px]"
          onClick={onOpenBooking}
          type="button"
        >
          <AssetIcon size={28} src={icons.calendar} />
          Reserve a Table
        </button>

        <div
          aria-label="Reservation views"
          className="mt-8 grid h-[62px] grid-cols-2 border-b border-white/12"
          role="group"
        >
          <ReservationTab
            active={view === "upcoming"}
            label="Upcoming"
            onClick={() => onViewChange("upcoming")}
          />
          <ReservationTab
            active={view === "past"}
            label="Past"
            onClick={() => onViewChange("past")}
          />
        </div>

        <section className="mt-4 grid gap-3">
          {visibleReservations.length > 0 ? (
            visibleReservations.map((reservation) => (
              <CompactReservationRow
                currentTime={currentTime}
                key={reservation.id}
                onModifyReservation={onModifyReservation}
                onRequestCancel={onRequestCancel}
                onViewReservation={onViewReservation}
                reservation={reservation}
              />
            ))
          ) : (
            <MobileReservationPanel className="p-5 text-center">
              <p className="text-[15px] leading-6 text-white/58">
                {view === "upcoming"
                  ? "Additional upcoming reservations will appear here."
                  : "Completed and cancelled reservations will appear here."}
              </p>
            </MobileReservationPanel>
          )}
        </section>
      </div>

      <BottomNavigation
        activeId="reservations"
        ariaLabel="Mobile reservations navigation"
      />
    </>
  );
}

function ReservationTab({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={classNames(
        "relative text-[14px] uppercase tracking-[0.08em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]",
        active ? "text-[var(--sb-red-bright)]" : "text-white/68",
      )}
      onClick={onClick}
      type="button"
    >
      {label}
      {active ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--sb-red-bright)] shadow-[0_0_18px_rgba(239,47,37,0.65)]"
        />
      ) : null}
    </button>
  );
}

function FeaturedReservationCard({
  onModifyReservation,
  onRequestCancel,
  onViewReservation,
  reservation,
}: {
  onModifyReservation: (reservation: Reservation) => void;
  onRequestCancel: (reservation: Reservation) => void;
  onViewReservation: (reservation: Reservation) => void;
  reservation: Reservation;
}) {
  const display = getReservationDisplay(reservation);

  return (
    <MobileReservationPanel className="mt-4 overflow-hidden">
      <div className="relative h-[180px]">
        <Image
          alt={display.experience?.title || "Upcoming reservation"}
          className="object-cover"
          fill
          loading="eager"
          sizes="430px"
          src={
            display.experience?.imageUrl ||
            "/assets/gallery/intimate-upscale-dining-room-setting.webp"
          }
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.74))]" />
        <span className="absolute left-4 top-4 rounded-full border border-[var(--sb-gold)]/40 bg-black/62 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          {display.statusLabel}
        </span>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-[56px_1fr] gap-4">
          <MobileReservationIconCircle icon={icons.calendar} />
          <div>
            <p className="editorial-title text-[18px] uppercase text-[var(--sb-gold-soft)]">
              {display.dayLabel}
            </p>
            <h3 className="mt-2 text-[26px] leading-8 text-white">
              {display.dateLabel}
            </h3>
            <ReservationMetaRow icon={icons.clock} value={display.timeLabel} />
            <ReservationMetaRow
              icon={icons.profile}
              value={`${reservation.partySize} ${
                reservation.partySize === 1 ? "Guest" : "Guests"
              }`}
            />
            <ReservationMetaRow
              icon={icons.location}
              value={`${display.location?.name || reservation.locationId} - ${
                display.location?.address || ""
              }`}
            />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
          <button
            className="h-[48px] rounded-[12px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.07em] text-[var(--sb-gold-soft)]"
            onClick={() => onModifyReservation(reservation)}
            type="button"
          >
            Modify
          </button>
          <button
            className="h-[48px] rounded-[12px] border border-white/10 bg-white/[0.035] text-[12px] uppercase tracking-[0.07em] text-white/70"
            onClick={() => onRequestCancel(reservation)}
            type="button"
          >
            Cancel
          </button>
        </div>
        <button
          className="mt-4 flex h-[54px] w-full items-center justify-center gap-4 rounded-full border border-[var(--sb-gold)]/62 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          onClick={() => onViewReservation(reservation)}
          type="button"
        >
          View Reservation
          <ChevronIcon direction="right" size={18} />
        </button>
      </div>
    </MobileReservationPanel>
  );
}

function CompactReservationRow({
  currentTime,
  onModifyReservation,
  onRequestCancel,
  onViewReservation,
  reservation,
}: {
  currentTime: number;
  onModifyReservation: (reservation: Reservation) => void;
  onRequestCancel: (reservation: Reservation) => void;
  onViewReservation: (reservation: Reservation) => void;
  reservation: Reservation;
}) {
  const display = getReservationDisplay(reservation);
  const canManage =
    reservation.status !== "cancelled" &&
    new Date(reservation.startsAt).getTime() >= currentTime;

  return (
    <MobileReservationPanel className="grid grid-cols-[104px_1fr] gap-4 p-3">
      <button
        className="relative h-[88px] overflow-hidden rounded-[12px] border border-white/10 bg-black/34"
        onClick={() => onViewReservation(reservation)}
        type="button"
      >
        <Image
          alt={display.experience?.title || "Reservation"}
          className="object-cover"
          fill
          loading="eager"
          sizes="104px"
          src={
            display.experience?.imageUrl ||
            "/assets/gallery/cozy-night-at-sushi-bliss.webp"
          }
        />
      </button>
      <div className="min-w-0">
        <p className="editorial-title text-[14px] uppercase text-[var(--sb-gold-soft)]">
          {display.dayLabel}
        </p>
        <h3 className="mt-1 line-clamp-2 text-[18px] leading-6 text-white">
          {display.dateLabel} - {display.timeLabel}
        </h3>
        <p className="mt-1 truncate text-[13px] text-white/54">
          {reservation.partySize} guests - {display.location?.name}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            className="h-[36px] rounded-[9px] border border-[var(--sb-border)] text-[11px] uppercase tracking-[0.07em] text-[var(--sb-gold-soft)]"
            onClick={() => onViewReservation(reservation)}
            type="button"
          >
            View
          </button>
          <button
            className="h-[36px] rounded-[9px] border border-white/10 bg-white/[0.035] text-[11px] uppercase tracking-[0.07em] text-white/70 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!canManage}
            onClick={() =>
              canManage
                ? onModifyReservation(reservation)
                : onViewReservation(reservation)
            }
            title={canManage ? "Modify reservation" : "Past reservation"}
            type="button"
          >
            Modify
          </button>
        </div>
        {canManage ? (
          <button
            className="mt-2 text-[11px] uppercase tracking-[0.08em] text-white/42"
            onClick={() => onRequestCancel(reservation)}
            type="button"
          >
            Cancel reservation
          </button>
        ) : null}
      </div>
    </MobileReservationPanel>
  );
}

function ReservationMetaRow({ icon, value }: { icon?: string; value: string }) {
  return (
    <p className="mt-3 flex items-start gap-3 text-[15px] leading-6 text-white/66">
      <AssetIcon className="mt-0.5" size={21} src={icon} />
      <span>{value}</span>
    </p>
  );
}
