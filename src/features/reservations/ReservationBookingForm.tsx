"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { locations } from "@/data/locations";
import {
  reservationExperiences,
  reservationOccasions,
  seatingPreferences,
} from "@/data/reservations";
import { getReservationTimeOptions } from "@/lib/reservations";
import { classNames } from "@/lib/classNames";
import type {
  ReservationDraft,
  ReservationValidationState,
} from "@/types/reservation";

interface ReservationBookingFormProps {
  draft: ReservationDraft;
  editing: boolean;
  onCancelEdit: () => void;
  onDraftChange: <TField extends keyof ReservationDraft>(
    field: TField,
    value: ReservationDraft[TField],
  ) => void;
  onSubmit: () => void;
  validation: ReservationValidationState;
}

const partySizeOptions = Array.from({ length: 8 }, (_, index) => ({
  label: `${index + 1} ${index === 0 ? "guest" : "guests"}`,
  value: String(index + 1),
}));

export function ReservationBookingForm({
  draft,
  editing,
  onCancelEdit,
  onDraftChange,
  onSubmit,
  validation,
}: ReservationBookingFormProps) {
  const today = new Date().toISOString().slice(0, 10);
  const timeOptions = getReservationTimeOptions(draft.date);
  const timeSelectOptions = [
    {
      disabled: true,
      label: draft.date ? "Choose a time" : "Choose a date first",
      value: "",
    },
    ...timeOptions,
  ];

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-sb-rice">
            {editing ? "Modify reservation" : "Book a table"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            Choose an experience, date, seating style, and location.
          </p>
        </div>
        {editing ? <StatusBadge tone="warning">Editing</StatusBadge> : null}
      </div>

      <section className="mt-6">
        <h4 className="text-sm font-semibold text-sb-rice">Experience</h4>
        <div className="mt-3 grid gap-3">
          {reservationExperiences.map((experience) => {
            const selected = draft.experienceId === experience.id;

            return (
              <button
                aria-pressed={selected}
                className={classNames(
                  "grid gap-3 rounded-card border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold sm:grid-cols-[92px_1fr]",
                  selected
                    ? "border-sb-gold bg-sb-gold/10"
                    : "border-sb-line bg-sb-panel/60 hover:bg-sb-rice/5",
                )}
                key={experience.id}
                onClick={() => onDraftChange("experienceId", experience.id)}
                type="button"
              >
                <span className="relative aspect-[4/3] overflow-hidden rounded-card bg-sb-panel-soft">
                  <Image
                    alt={experience.title}
                    className="object-cover"
                    fill
                    sizes="92px"
                    src={experience.imageUrl}
                  />
                </span>
                <span>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-sb-rice">
                      {experience.title}
                    </span>
                    {experience.premium ? (
                      <StatusBadge tone="premium">Premium</StatusBadge>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-sb-muted">
                    {experience.description}
                  </span>
                  <span className="mt-2 block font-mono text-xs text-sb-gold-soft">
                    {experience.priceLabel} - {experience.durationMinutes} min
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        {validation.experience ? (
          <p className="mt-2 text-xs text-sb-red">{validation.experience}</p>
        ) : null}
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <Select
          error={validation.location}
          id="reservation-location"
          label="Location"
          onChange={(event) => onDraftChange("locationId", event.target.value)}
          options={locations.map((location) => ({
            label: location.name,
            value: location.id,
          }))}
          value={draft.locationId}
        />
        <Select
          id="reservation-party"
          label="Party size"
          onChange={(event) =>
            onDraftChange("partySize", Number(event.target.value))
          }
          options={partySizeOptions}
          value={String(draft.partySize)}
        />
        <Input
          error={validation.date}
          id="reservation-date"
          label="Date"
          min={today}
          onChange={(event) => onDraftChange("date", event.target.value)}
          type="date"
          value={draft.date}
        />
        <Select
          error={validation.time}
          id="reservation-time"
          label="Time"
          onChange={(event) => onDraftChange("time", event.target.value)}
          options={timeSelectOptions}
          value={draft.time}
        />
        <Select
          id="reservation-seating"
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
          id="reservation-occasion"
          label="Occasion"
          onChange={(event) => onDraftChange("occasion", event.target.value)}
          options={reservationOccasions.map((occasion) => ({
            label: occasion,
            value: occasion,
          }))}
          value={draft.occasion}
        />
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input
          error={validation.guest}
          id="reservation-guest-name"
          label="Guest name"
          onChange={(event) => onDraftChange("guestName", event.target.value)}
          value={draft.guestName}
        />
        <Input
          id="reservation-guest-phone"
          label="Guest phone"
          onChange={(event) => onDraftChange("guestPhone", event.target.value)}
          value={draft.guestPhone}
        />
      </section>

      <section className="mt-6">
        <label
          className="block text-sm font-semibold text-sb-rice"
          htmlFor="reservation-notes"
        >
          Notes
        </label>
        <textarea
          className="mt-2 min-h-24 w-full resize-y rounded-card border border-sb-line bg-sb-ink/70 px-4 py-3 text-sm text-sb-rice outline-none transition placeholder:text-sb-dim focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25"
          id="reservation-notes"
          maxLength={220}
          onChange={(event) => onDraftChange("notes", event.target.value)}
          placeholder="Allergies, celebrations, accessibility needs"
          value={draft.notes}
        />
      </section>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button onClick={onSubmit}>
          {editing ? "Save changes" : "Confirm reservation"}
        </Button>
        {editing ? (
          <Button onClick={onCancelEdit} variant="ghost">
            Cancel edit
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
