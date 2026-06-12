"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { locations } from "@/data/locations";
import {
  reservationExperiences,
  reservationOccasions,
  seatingPreferences,
} from "@/data/reservations";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import type {
  Reservation,
  ReservationDraft,
  ReservationValidationState,
} from "@/types/reservation";

import {
  getReservationDraftDisplay,
  MobileReservationBackButton,
  MobileReservationPanel,
  MobileReservationsHeader,
  MobileReservationStepRail,
} from "./MobileReservationsPrimitives";

interface MobileReservationExperienceViewProps {
  cartCount: number;
  draft: ReservationDraft;
  editingReservation: Reservation | null;
  onBack: () => void;
  onContinue: () => void;
  onDraftChange: <TField extends keyof ReservationDraft>(
    field: TField,
    value: ReservationDraft[TField],
  ) => void;
  onOpenCart: () => void;
  unreadNotificationCount: number;
  validation: ReservationValidationState;
}

/** Mobile reservation step for experience, location, seating, and requests. */
export function MobileReservationExperienceView({
  cartCount,
  draft,
  editingReservation,
  onBack,
  onContinue,
  onDraftChange,
  onOpenCart,
  unreadNotificationCount,
  validation,
}: MobileReservationExperienceViewProps) {
  const display = getReservationDraftDisplay(draft);
  const notesUsed = draft.notes.length;

  return (
    <div className="relative z-10 mx-auto max-w-[430px]">
      <MobileReservationsHeader
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        unreadNotificationCount={unreadNotificationCount}
      />

      <div className="mt-7 grid grid-cols-[50px_1fr] items-center gap-4">
        <MobileReservationBackButton
          label="Back to date and time"
          onClick={onBack}
        />
        <p className="editorial-title text-[21px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          {editingReservation ? "Modify Reservation" : "New Reservation"}
        </p>
      </div>

      <MobileReservationStepRail activeStep={2} />

      <section className="mt-7">
        <h1 className="editorial-title text-[40px] leading-none tracking-[0.08em] text-white">
          Choose Your{" "}
          <span className="block text-[var(--sb-red-bright)]">Experience</span>
        </h1>
        <p className="mt-4 text-[17px] leading-6 text-[var(--sb-gold-soft)]">
          Select the dining experience that best suits your occasion.
        </p>
      </section>

      <section className="mt-6 grid gap-3">
        {reservationExperiences.map((experience, index) => {
          const selected = draft.experienceId === experience.id;

          return (
            <button
              aria-pressed={selected}
              className={classNames(
                "grid min-h-[126px] grid-cols-[118px_1fr_36px] items-center gap-4 rounded-[16px] border p-3 text-left transition",
                selected
                  ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/10 shadow-[0_0_24px_rgba(239,47,37,0.24)]"
                  : "border-[var(--sb-border)] bg-black/34",
              )}
              key={experience.id}
              onClick={() => onDraftChange("experienceId", experience.id)}
              type="button"
            >
              <span className="relative h-[92px] overflow-hidden rounded-[12px] bg-black/34">
                <Image
                  alt={experience.title}
                  className="object-cover"
                  fill
                  priority={index === 0}
                  sizes="118px"
                  src={experience.imageUrl}
                />
              </span>
              <span className="min-w-0">
                <span className="editorial-title block text-[18px] uppercase leading-6 text-white">
                  {experience.title}
                </span>
                <span className="mt-2 line-clamp-2 text-[13px] leading-5 text-white/58">
                  {experience.description}
                </span>
                <span className="mt-2 block text-[12px] text-[var(--sb-gold-soft)]">
                  {experience.priceLabel} - {experience.durationMinutes} min
                </span>
              </span>
              <span
                className={classNames(
                  "grid h-8 w-8 place-items-center rounded-full border",
                  selected
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]"
                    : "border-[var(--sb-gold)]/50",
                )}
              >
                {selected ? (
                  <AssetIcon size={16} src="/assets/icons/check-icon.png" />
                ) : null}
              </span>
            </button>
          );
        })}
        {validation.experience ? (
          <p className="text-[13px] text-[var(--sb-red-bright)]">
            {validation.experience}
          </p>
        ) : null}
      </section>

      <section className="mt-6">
        <h2 className="editorial-title text-[18px] uppercase text-[var(--sb-gold-soft)]">
          Make it Special
        </h2>
        <div className="mt-3 grid gap-3">
          <label className="grid min-h-[62px] grid-cols-[40px_1fr] items-center gap-3 rounded-[14px] border border-[var(--sb-border)] bg-black/38 px-4">
            <AssetIcon size={26} src={icons.location} />
            <span>
              <span className="sr-only">Reservation location</span>
              <select
                className="w-full bg-transparent text-[15px] text-white outline-none"
                onChange={(event) =>
                  onDraftChange("locationId", event.target.value)
                }
                value={draft.locationId}
              >
                {locations.map((location) => (
                  <option
                    className="bg-black"
                    key={location.id}
                    value={location.id}
                  >
                    {location.name}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <label className="grid min-h-[62px] grid-cols-[40px_1fr] items-center gap-3 rounded-[14px] border border-[var(--sb-border)] bg-black/38 px-4">
            <AssetIcon size={26} src={icons.flower} />
            <span>
              <span className="sr-only">Seating preference</span>
              <select
                className="w-full bg-transparent text-[15px] text-white outline-none"
                onChange={(event) =>
                  onDraftChange("seatingPreference", event.target.value)
                }
                value={draft.seatingPreference}
              >
                {seatingPreferences.map((preference) => (
                  <option
                    className="bg-black"
                    key={preference}
                    value={preference}
                  >
                    {preference}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <label className="grid min-h-[62px] grid-cols-[40px_1fr] items-center gap-3 rounded-[14px] border border-[var(--sb-border)] bg-black/38 px-4">
            <AssetIcon size={26} src={icons.star} />
            <span>
              <span className="sr-only">Reservation occasion</span>
              <select
                className="w-full bg-transparent text-[15px] text-white outline-none"
                onChange={(event) =>
                  onDraftChange("occasion", event.target.value)
                }
                value={draft.occasion}
              >
                {reservationOccasions.map((occasion) => (
                  <option className="bg-black" key={occasion} value={occasion}>
                    {occasion}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <label className="rounded-[14px] border border-[var(--sb-border)] bg-black/38 p-4">
            <span className="flex items-center gap-3 text-[15px] text-white/58">
              <AssetIcon size={25} src={icons.menu} />
              Add a note or special request
            </span>
            <textarea
              className="mt-3 min-h-[92px] w-full resize-none bg-transparent text-[15px] leading-6 text-white outline-none placeholder:text-white/42"
              maxLength={200}
              onChange={(event) => onDraftChange("notes", event.target.value)}
              placeholder="No wasabi, anniversary note, accessibility needs..."
              value={draft.notes}
            />
            <span className="block text-right text-[12px] text-white/42">
              {notesUsed}/200
            </span>
          </label>
        </div>
        {validation.location ? (
          <p className="mt-3 text-[13px] text-[var(--sb-red-bright)]">
            {validation.location}
          </p>
        ) : null}
      </section>

      <MobileReservationPanel className="mt-5 grid grid-cols-3 divide-x divide-white/10 overflow-hidden">
        <SummaryCell
          icon={icons.calendar}
          label={display.shortDateLabel}
          value={display.timeLabel}
        />
        <SummaryCell
          icon={icons.profile}
          label={`${draft.partySize}`}
          value={draft.partySize === 1 ? "Guest" : "Guests"}
        />
        <SummaryCell
          icon={icons.location}
          label={display.location?.neighborhood || "Location"}
          value="Selected"
        />
      </MobileReservationPanel>

      <button
        className="red-glow-button mt-5 flex h-[72px] w-full items-center justify-center gap-4 rounded-[16px] text-[17px]"
        onClick={onContinue}
        type="button"
      >
        Continue to Confirm
        <span aria-hidden="true">&gt;</span>
      </button>
      <p className="mt-4 text-center text-[12px] text-white/42">
        Secure reservation. Card details will be requested later.
      </p>
    </div>
  );
}

function SummaryCell({
  icon,
  label,
  value,
}: {
  icon?: string;
  label: string;
  value: string;
}) {
  return (
    <div className="min-h-[74px] px-3 py-4 text-center">
      <AssetIcon className="mx-auto" size={25} src={icon} />
      <span className="mt-2 block truncate text-[12px] uppercase text-white/46">
        {label}
      </span>
      <span className="mt-1 block truncate text-[13px] text-white/72">
        {value}
      </span>
    </div>
  );
}
