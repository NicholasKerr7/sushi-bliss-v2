"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { icons } from "@/features/home/visualHomeData";
import { downloadCalendarEvent } from "@/lib/calendar";
import { formatDateTime } from "@/lib/dates";
import type { Reservation } from "@/types/reservation";

interface TabletReservationConfirmationViewProps {
  onBackHome: () => void;
  onViewReservations: () => void;
  reservation: Reservation;
}

export function TabletReservationConfirmationView({
  onBackHome,
  onViewReservations,
  reservation,
}: TabletReservationConfirmationViewProps) {
  const location = locations.find((item) => item.id === reservation.locationId);
  const experience = reservationExperiences.find(
    (item) => item.id === reservation.experienceId,
  );
  const handleAddToCalendar = () => {
    const startsAt = new Date(reservation.startsAt);
    const endsAt = new Date(
      startsAt.getTime() + (experience?.durationMinutes || 120) * 60_000,
    );

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
    <main className="mx-auto max-w-[1034px]">
      <section className="mt-8 text-center">
        <span className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-[var(--sb-gold)]/40 bg-[var(--sb-gold)]/8 shadow-[0_0_46px_rgba(229,184,103,0.18)]">
          <AssetIcon size={56} src={icons.star} />
        </span>
        <h1 className="editorial-title mt-8 text-[48px] uppercase tracking-[0.08em]">
          Reservation Confirmed
        </h1>
        <p className="mt-3 text-[18px] text-[var(--sb-gold-soft)]">
          Your exceptional experience awaits.
        </p>
      </section>

      <section className="mx-auto mt-7 max-w-[720px] rounded-[24px] border border-white/10 bg-white/[0.04] p-8">
        <p className="text-center text-[15px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          Your reservation code
        </p>
        <p className="mt-3 text-center font-mono text-[44px] text-[var(--sb-red-bright)]">
          {reservation.confirmationCode}
        </p>

        <div className="mt-7 grid gap-3 border-y border-white/10 py-5">
          <ConfirmationRow
            icon={icons.calendar}
            label="Date"
            value={formatDateTime(reservation.startsAt)}
          />
          <ConfirmationRow
            icon={icons.profile}
            label="Party size"
            value={`${reservation.partySize} guests`}
          />
          <ConfirmationRow
            icon={icons.location}
            label="Location"
            supporting={location?.address}
            value={location?.name || reservation.locationId}
          />
          <ConfirmationRow
            icon={icons.flower}
            label="Experience"
            supporting={reservation.seatingPreference}
            value={experience?.title || reservation.experienceId}
          />
        </div>

        <div className="mt-6 rounded-[16px] border border-[var(--sb-gold)]/24 bg-black/24 p-5">
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <AssetIcon size={36} src={icons.calendar} />
              <div>
                <h2 className="text-[18px] font-semibold text-[var(--sb-gold-soft)]">
                  Add to calendar
                </h2>
                <p className="mt-1 text-[14px] text-white/50">
                  Never miss your reservation.
                </p>
              </div>
            </div>
            <Button onClick={handleAddToCalendar} variant="secondary">
              Download calendar
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <Button
            className="red-glow-button h-[58px] rounded-[14px] uppercase tracking-[0.08em]"
            onClick={onViewReservations}
          >
            View reservations
          </Button>
          <Button
            className="h-[58px] rounded-[14px] uppercase tracking-[0.08em]"
            href="/home"
            onClick={onBackHome}
            variant="ghost"
          >
            Back to home
          </Button>
        </div>
      </section>
    </main>
  );
}

function ConfirmationRow({
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
    <div className="grid grid-cols-[44px_1fr] items-center gap-4 py-2">
      <AssetIcon size={30} src={icon} />
      <div className="flex items-center justify-between gap-4">
        <span>
          <span className="block text-[13px] uppercase tracking-[0.1em] text-white/42">
            {label}
          </span>
          {supporting ? (
            <span className="mt-1 block text-[13px] text-white/42">
              {supporting}
            </span>
          ) : null}
        </span>
        <span className="text-right text-[16px] text-white">{value}</span>
      </div>
    </div>
  );
}
