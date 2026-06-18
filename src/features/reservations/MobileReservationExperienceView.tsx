"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
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

const mobileReservationLocationOptions = locations.map((location) => ({
  label: location.name,
  value: location.id,
}));

const mobileReservationSeatingOptions = seatingPreferences.map(
  (preference) => ({
    label: preference,
    value: preference,
  }),
);

const mobileReservationOccasionOptions = reservationOccasions.map(
  (occasion) => ({
    label: occasion,
    value: occasion,
  }),
);

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
    <div className="mobile-frame relative z-10">
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
        <h1 className="editorial-title text-[35px] leading-none tracking-[0.07em] text-white min-[390px]:text-[40px] min-[390px]:tracking-[0.08em]">
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
                "grid min-h-[112px] grid-cols-[94px_1fr_30px] items-center gap-3 rounded-[15px] border p-3 text-left transition min-[390px]:min-h-[126px] min-[390px]:grid-cols-[118px_1fr_36px] min-[390px]:gap-4 min-[390px]:rounded-[16px]",
                selected
                  ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/10 shadow-[0_0_24px_rgba(239,47,37,0.24)]"
                  : "border-[var(--sb-border)] bg-black/34",
              )}
              key={experience.id}
              onClick={() => onDraftChange("experienceId", experience.id)}
              type="button"
            >
              <span className="relative h-[78px] overflow-hidden rounded-[11px] bg-black/34 min-[390px]:h-[92px] min-[390px]:rounded-[12px]">
                <Image
                  alt={experience.title}
                  className="object-cover"
                  fill
                  loading={index < 3 ? "eager" : "lazy"}
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
          <MobileReservationSelectRow
            icon={icons.location}
            label="Reservation location"
            options={mobileReservationLocationOptions}
            value={draft.locationId}
            onChange={(value) => onDraftChange("locationId", value)}
          />

          <MobileReservationSelectRow
            icon={icons.flower}
            label="Seating preference"
            options={mobileReservationSeatingOptions}
            value={draft.seatingPreference}
            onChange={(value) => onDraftChange("seatingPreference", value)}
          />

          <MobileReservationSelectRow
            icon={icons.star}
            label="Reservation occasion"
            options={mobileReservationOccasionOptions}
            value={draft.occasion}
            onChange={(value) => onDraftChange("occasion", value)}
          />

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
        className="red-glow-button mt-5 flex h-[62px] w-full items-center justify-center gap-3 rounded-[14px] text-[15px] min-[390px]:h-[72px] min-[390px]:gap-4 min-[390px]:rounded-[16px] min-[390px]:text-[17px]"
        onClick={onContinue}
        type="button"
      >
        Continue to Confirm
        <ChevronIcon direction="right" size={18} />
      </button>
      <p className="mt-4 text-center text-[12px] text-white/42">
        Secure reservation. Card details will be requested later.
      </p>
    </div>
  );
}

function MobileReservationSelectRow({
  icon,
  label,
  onChange,
  options,
  value,
}: {
  icon?: string;
  label: string;
  options: ReadonlyArray<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid min-h-[66px] grid-cols-[42px_1fr_30px] items-center gap-3 rounded-[15px] border border-[var(--sb-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018))] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition focus-within:border-[var(--sb-gold)]/62 focus-within:shadow-[0_0_24px_rgba(215,168,79,0.14),inset_0_1px_0_rgba(255,255,255,0.08)]">
      <span className="grid h-[40px] w-[40px] place-items-center rounded-full border border-[var(--sb-gold)]/26 bg-black/38">
        <AssetIcon size={24} src={icon} />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]/72">
          {label}
        </span>
        <select
          aria-label={label}
          className="mt-0.5 w-full appearance-none bg-transparent text-[15px] font-semibold text-white outline-none"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          {options.map((option) => (
            <option
              className="bg-[#050607] text-white"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </span>
      <ChevronIcon
        className="text-[var(--sb-gold)] drop-shadow-[0_0_10px_rgba(215,168,79,0.35)]"
        direction="down"
        size={20}
      />
    </label>
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
