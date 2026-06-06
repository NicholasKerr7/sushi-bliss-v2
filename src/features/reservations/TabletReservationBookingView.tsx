"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { locations } from "@/data/locations";
import {
  reservationExperiences,
  reservationOccasions,
  seatingPreferences,
} from "@/data/reservations";
import { classNames } from "@/lib/classNames";
import { getReservationTimeOptions } from "@/lib/reservations";
import type {
  Reservation,
  ReservationDraft,
  ReservationValidationState,
} from "@/types/reservation";

interface TabletReservationBookingViewProps {
  draft: ReservationDraft;
  editingReservation: Reservation | null;
  onBack: () => void;
  onCancelEdit: () => void;
  onDraftChange: <TField extends keyof ReservationDraft>(
    field: TField,
    value: ReservationDraft[TField],
  ) => void;
  onReview: () => void;
  validation: ReservationValidationState;
}

const partySizeOptions = Array.from({ length: 8 }, (_, index) => ({
  label: `${index + 1} ${index === 0 ? "guest" : "guests"}`,
  value: String(index + 1),
}));

export function TabletReservationBookingView({
  draft,
  editingReservation,
  onBack,
  onCancelEdit,
  onDraftChange,
  onReview,
  validation,
}: TabletReservationBookingViewProps) {
  const today = new Date().toISOString().slice(0, 10);
  const timeOptions = [
    {
      disabled: true,
      label: draft.date ? "Choose a time" : "Choose a date first",
      value: "",
    },
    ...getReservationTimeOptions(draft.date),
  ];

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
        <p className="text-[22px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
          Choose your
        </p>
        <h1 className="editorial-title mt-2 text-[52px] uppercase leading-none tracking-[0.08em]">
          Reservation Experience
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-7 text-[var(--sb-gold-soft)]">
          Each experience is thoughtfully crafted to deliver exceptional moments
          and unforgettable flavors.
        </p>
      </section>

      <section className="mt-7 rounded-[20px] border border-white/10 bg-white/[0.035] p-4">
        <div className="grid gap-3">
          {reservationExperiences.map((experience, index) => {
            const selected = draft.experienceId === experience.id;

            return (
              <button
                aria-pressed={selected}
                className={classNames(
                  "grid min-h-[156px] grid-cols-[330px_1fr_54px] items-center gap-6 rounded-[14px] border p-4 text-left transition",
                  selected
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/8"
                    : "border-white/10 bg-black/22 hover:bg-white/[0.04]",
                )}
                key={experience.id}
                onClick={() => onDraftChange("experienceId", experience.id)}
                type="button"
              >
                <span className="relative h-[130px] overflow-hidden rounded-[12px] bg-black/30">
                  <Image
                    alt={experience.title}
                    className="object-cover"
                    fill
                    priority={index === 0}
                    sizes="330px"
                    src={experience.imageUrl}
                  />
                </span>
                <span>
                  <span className="flex items-center gap-3">
                    <span className="editorial-title text-[24px] uppercase tracking-[0.06em] text-white">
                      {experience.title}
                    </span>
                    {index === 0 ? (
                      <StatusBadge tone="premium">
                        Chef&apos;s choice
                      </StatusBadge>
                    ) : null}
                  </span>
                  <span className="mt-3 block max-w-md text-[15px] leading-6 text-white/58">
                    {experience.description}
                  </span>
                  <span className="mt-3 block font-mono text-[14px] text-[var(--sb-gold-soft)]">
                    {experience.priceLabel} - {experience.durationMinutes} min
                  </span>
                </span>
                <span
                  className={classNames(
                    "mx-auto h-7 w-7 rounded-full border",
                    selected
                      ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)] shadow-[0_0_20px_rgba(238,43,36,0.5)]"
                      : "border-[var(--sb-gold)]/50",
                  )}
                />
              </button>
            );
          })}
        </div>
        {validation.experience ? (
          <p className="mt-3 text-[13px] text-[var(--sb-red-bright)]">
            {validation.experience}
          </p>
        ) : null}
      </section>

      <section className="mt-5 rounded-[20px] border border-white/10 bg-white/[0.035] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[20px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Reservation details
            </h2>
            <p className="mt-2 text-[14px] text-white/52">
              Select date, time, party, seating, and guest details.
            </p>
          </div>
          {editingReservation ? (
            <StatusBadge tone="warning">Editing</StatusBadge>
          ) : null}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Select
            error={validation.location}
            id="tablet-reservation-location"
            label="Location"
            onChange={(event) =>
              onDraftChange("locationId", event.target.value)
            }
            options={locations.map((location) => ({
              label: location.name,
              value: location.id,
            }))}
            value={draft.locationId}
          />
          <Select
            id="tablet-reservation-party"
            label="Party size"
            onChange={(event) =>
              onDraftChange("partySize", Number(event.target.value))
            }
            options={partySizeOptions}
            value={String(draft.partySize)}
          />
          <Input
            error={validation.date}
            id="tablet-reservation-date"
            label="Date"
            min={today}
            onChange={(event) => onDraftChange("date", event.target.value)}
            type="date"
            value={draft.date}
          />
          <Select
            error={validation.time}
            id="tablet-reservation-time"
            label="Time"
            onChange={(event) => onDraftChange("time", event.target.value)}
            options={timeOptions}
            value={draft.time}
          />
          <Select
            id="tablet-reservation-seating"
            label="Seating"
            onChange={(event) =>
              onDraftChange("seatingPreference", event.target.value)
            }
            options={seatingPreferences.map((preference) => ({
              label: preference,
              value: preference,
            }))}
            value={draft.seatingPreference}
          />
          <Select
            id="tablet-reservation-occasion"
            label="Occasion"
            onChange={(event) => onDraftChange("occasion", event.target.value)}
            options={reservationOccasions.map((occasion) => ({
              label: occasion,
              value: occasion,
            }))}
            value={draft.occasion}
          />
          <Input
            error={validation.guest}
            id="tablet-reservation-guest-name"
            label="Guest name"
            onChange={(event) => onDraftChange("guestName", event.target.value)}
            value={draft.guestName}
          />
          <Input
            id="tablet-reservation-guest-phone"
            label="Guest phone"
            onChange={(event) =>
              onDraftChange("guestPhone", event.target.value)
            }
            value={draft.guestPhone}
          />
        </div>

        <label
          className="mt-5 block text-sm font-semibold text-sb-rice"
          htmlFor="tablet-reservation-notes"
        >
          Special requests
        </label>
        <textarea
          className="mt-2 min-h-24 w-full resize-none rounded-card border border-sb-line bg-sb-ink/70 px-4 py-3 text-sm text-sb-rice outline-none transition placeholder:text-sb-dim focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25"
          id="tablet-reservation-notes"
          maxLength={220}
          onChange={(event) => onDraftChange("notes", event.target.value)}
          placeholder="Allergies, celebrations, accessibility needs"
          value={draft.notes}
        />

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button
            className="red-glow-button h-[58px] rounded-[14px] uppercase tracking-[0.08em]"
            onClick={onReview}
          >
            Continue to review
          </Button>
          {editingReservation ? (
            <Button
              className="h-[58px] rounded-[14px]"
              onClick={onCancelEdit}
              variant="ghost"
            >
              Cancel edit
            </Button>
          ) : null}
        </div>
      </section>
    </main>
  );
}
