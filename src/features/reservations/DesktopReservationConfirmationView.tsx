"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { icons } from "@/features/home/homeDashboardData";
import { DesktopBenefitStrip } from "@/features/menu/DesktopMenuChrome";
import { downloadCalendarEvent } from "@/lib/calendar";
import { formatDateTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

interface DesktopReservationConfirmationViewProps {
  onMakeAnotherReservation: () => void;
  onViewReservations: () => void;
  reservation: Reservation;
}

export function DesktopReservationConfirmationView({
  onMakeAnotherReservation,
  onViewReservations,
  reservation,
}: DesktopReservationConfirmationViewProps) {
  const location =
    locations.find((item) => item.id === reservation.locationId) ||
    locations[0];
  const experience =
    reservationExperiences.find(
      (item) => item.id === reservation.experienceId,
    ) || reservationExperiences[0];
  const startsAt = new Date(reservation.startsAt);
  const endsAt = new Date(
    startsAt.getTime() + (experience?.durationMinutes || 120) * 60_000,
  );
  const heroImage =
    location?.imageUrl ||
    experience?.imageUrl ||
    "/assets/gallery/intimate-upscale-dining-room-setting.webp";

  const handleAddToCalendar = () => {
    downloadCalendarEvent({
      description: `Reservation ${reservation.confirmationCode} for ${reservation.partySize} guests.`,
      endsAt,
      fileName: `sushi-bliss-${reservation.confirmationCode}.ics`,
      location: [location?.name, location?.address].filter(Boolean).join(" - "),
      startsAt,
      summary: experience?.title || "Sushi Bliss Reservation",
      uid: `${reservation.confirmationCode}@sushi-bliss`,
    });
  };

  return (
    <main className="mx-auto max-w-[1494px] px-7 pb-7 pt-6">
      <section className="grid min-h-[430px] grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] overflow-hidden rounded-[24px] border border-[var(--sb-border)] bg-[#07090a] shadow-[0_30px_90px_rgba(0,0,0,0.54)]">
        <div className="flex flex-col justify-center px-10 py-8">
          <span className="grid h-[86px] w-[86px] place-items-center rounded-full border border-[var(--sb-gold)]/44 bg-[var(--sb-gold)]/8 shadow-[0_0_46px_rgba(229,184,103,0.18)]">
            <AssetIcon size={46} src={icons.star} />
          </span>
          <p className="mt-7 text-[14px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            Your experience is reserved
          </p>
          <h1 className="editorial-title mt-3 text-[52px] uppercase leading-[0.96] tracking-[0.06em] text-white">
            Reservation
            <span className="block text-[var(--sb-red-bright)]">Confirmed</span>
          </h1>
          <p className="mt-5 max-w-[560px] text-[17px] leading-7 text-white/66">
            We&apos;ll prepare {experience?.title || "your table"} for{" "}
            {reservation.partySize}{" "}
            {reservation.partySize === 1 ? "guest" : "guests"} at{" "}
            {location?.name || "Sushi Bliss"}.
          </p>

          <div className="mt-7 rounded-[18px] border border-[var(--sb-gold)]/24 bg-black/30 p-5">
            <p className="text-[12px] uppercase tracking-[0.16em] text-white/42">
              Confirmation code
            </p>
            <p className="mt-2 break-words font-mono text-[34px] leading-none text-[var(--sb-gold-soft)]">
              {reservation.confirmationCode}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-[1fr_190px_190px] gap-3">
            <Button
              className="h-[58px] rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
              onClick={onViewReservations}
            >
              View reservations
            </Button>
            <Button
              className="h-[58px] rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
              onClick={handleAddToCalendar}
              variant="secondary"
            >
              Calendar
            </Button>
            <Button
              className="h-[58px] rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
              onClick={onMakeAnotherReservation}
              variant="ghost"
            >
              Reserve again
            </Button>
          </div>
        </div>

        <div className="relative min-h-[430px]">
          <Image
            alt={experience?.title || "Sushi Bliss reservation"}
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="790px"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,10,0.62),rgba(7,9,10,0.08)_48%,rgba(7,9,10,0.56))]" />
          <div className="absolute bottom-7 left-7 right-7 rounded-[18px] border border-[var(--sb-border)] bg-black/62 p-5 backdrop-blur-md">
            <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              {formatDateTime(reservation.startsAt)}
            </p>
            <p className="mt-2 text-[19px] text-white">
              {experience?.title || reservation.experienceId}
            </p>
            <p className="mt-2 text-[14px] leading-6 text-white/58">
              {location?.address || "Sushi Bliss"} -{" "}
              {reservation.seatingPreference || "Dining table"}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-[minmax(0,1fr)_390px] gap-5">
        <div className="grid grid-cols-3 gap-4">
          <ConfirmationFact
            icon={icons.calendar}
            label="Date & time"
            value={formatDateTime(reservation.startsAt)}
          />
          <ConfirmationFact
            icon={icons.profile}
            label="Party"
            value={`${reservation.partySize} ${
              reservation.partySize === 1 ? "Guest" : "Guests"
            }`}
          />
          <ConfirmationFact
            icon={icons.flower}
            label="Occasion"
            value={reservation.occasion || "No occasion"}
          />
          <ConfirmationFact
            icon={icons.location}
            label="Location"
            supporting={location?.address}
            value={location?.name || reservation.locationId}
          />
          <ConfirmationFact
            icon={icons.star}
            label="Experience"
            supporting={experience?.priceLabel}
            value={experience?.title || reservation.experienceId}
          />
          <ConfirmationFact
            icon={icons.menu}
            label="Requests"
            value={reservation.notes || "No special requests added."}
          />
        </div>

        <aside className="overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
          <div className="relative h-[190px]">
            <Image
              alt={`${location?.name || "Sushi Bliss"} map`}
              className="object-cover"
              fill
              sizes="390px"
              src={location?.mapImageUrl || "/assets/maps/map-location.webp"}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]" />
          </div>
          <div className="p-5">
            <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              Arrival guidance
            </p>
            <p className="mt-2 text-[17px] text-white">
              {location?.neighborhood || "Tokyo"}
            </p>
            <p className="mt-2 text-[13px] leading-6 text-white/58">
              Please arrive 10 minutes early. Our host will seat your party by
              confirmation code.
            </p>
          </div>
        </aside>
      </section>

      <div className="mt-5">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}

function ConfirmationFact({
  icon,
  label,
  supporting,
  value,
}: {
  icon?: string;
  label: string;
  supporting?: string;
  value: string;
}) {
  return (
    <article className="min-h-[138px] rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.055)]">
      <AssetIcon size={28} src={icon} />
      <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-white/42">
        {label}
      </p>
      <p className="mt-2 line-clamp-2 text-[16px] leading-6 text-white">
        {value}
      </p>
      {supporting ? (
        <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-white/48">
          {supporting}
        </p>
      ) : null}
    </article>
  );
}
