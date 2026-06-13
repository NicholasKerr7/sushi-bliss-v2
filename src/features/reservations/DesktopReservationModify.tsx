import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { DesktopBenefitStrip } from "@/features/menu/DesktopMenuChrome";
import { classNames } from "@/lib/classNames";
import type {
  Reservation,
  ReservationDraft,
  ReservationValidationState,
} from "@/types/reservation";

import {
  desktopReservationHeroImage,
  formatDateOnly,
  formatTimeLabel,
  SummaryLine,
} from "./DesktopReservationPrimitives";

interface DesktopReservationModifyProps {
  draft: ReservationDraft;
  editingReservation: Reservation | null;
  selectedDateTime: Date | null;
  selectedExperience: (typeof reservationExperiences)[number];
  timeOptions: Array<{
    disabled: boolean;
    label: string;
    value: string;
  }>;
  validation: ReservationValidationState;
  onBack: () => void;
  onDraftChange: <TField extends keyof ReservationDraft>(
    field: TField,
    value: ReservationDraft[TField],
  ) => void;
  onOpenReview: () => void;
  onRequestCancel: (reservation: Reservation) => void;
  onResetForm: () => void;
}

export function DesktopReservationModify({
  draft,
  editingReservation,
  selectedDateTime,
  selectedExperience,
  timeOptions,
  validation,
  onBack,
  onDraftChange,
  onOpenReview,
  onRequestCancel,
  onResetForm,
}: DesktopReservationModifyProps) {
  return (
    <main className="mx-auto max-w-[1580px] px-8 pb-7 pt-7">
      <button
        className="text-[14px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
        onClick={onBack}
        type="button"
      >
        Back to reservation history
      </button>
      <section className="relative mt-4 overflow-hidden rounded-[20px] border border-white/10 bg-black/40 p-8">
        <Image
          alt=""
          className="object-cover object-[74%_48%] opacity-50"
          fill
          priority
          sizes="1500px"
          src={desktopReservationHeroImage}
        />
        <div className="relative z-10">
          <p className="text-[15px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
            {editingReservation?.confirmationCode || "Upcoming reservation"}
          </p>
          <h1 className="editorial-title mt-2 text-[48px] uppercase tracking-[0.08em]">
            Modify Reservation
          </h1>
          <p className="mt-3 text-[16px] text-[var(--sb-gold-soft)]">
            Adjust date, time, party size, seating, and notes before saving.
          </p>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-[minmax(0,1fr)_405px] gap-5">
        <article className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
          <div className="grid grid-cols-[240px_1fr_1fr] gap-5">
            <label>
              <span className="text-[13px] uppercase tracking-[0.08em] text-white/50">
                Party size
              </span>
              <div className="mt-3 grid h-12 grid-cols-[44px_1fr_44px] overflow-hidden rounded-[10px] border border-white/12">
                <button
                  aria-label="Decrease party size"
                  className="text-[var(--sb-gold-soft)]"
                  onClick={() =>
                    onDraftChange("partySize", Math.max(1, draft.partySize - 1))
                  }
                  type="button"
                >
                  -
                </button>
                <span className="grid place-items-center border-x border-white/10">
                  {draft.partySize} Guests
                </span>
                <button
                  aria-label="Increase party size"
                  className="text-[var(--sb-gold-soft)]"
                  onClick={() =>
                    onDraftChange("partySize", draft.partySize + 1)
                  }
                  type="button"
                >
                  +
                </button>
              </div>
            </label>
            <label>
              <span className="text-[13px] uppercase tracking-[0.08em] text-white/50">
                Date
              </span>
              <input
                className="mt-3 h-12 w-full rounded-[10px] border border-white/12 bg-black/24 px-4 text-[14px] text-white outline-none focus:border-[var(--sb-gold)]"
                min={new Date().toISOString().slice(0, 10)}
                onChange={(event) => onDraftChange("date", event.target.value)}
                type="date"
                value={draft.date}
              />
              {validation.date ? (
                <span className="mt-2 block text-[12px] text-[var(--sb-red-bright)]">
                  {validation.date}
                </span>
              ) : null}
            </label>
            <label>
              <span className="text-[13px] uppercase tracking-[0.08em] text-white/50">
                Location
              </span>
              <select
                className="mt-3 h-12 w-full rounded-[10px] border border-white/12 bg-black/24 px-4 text-[14px] text-white outline-none focus:border-[var(--sb-gold)]"
                onChange={(event) =>
                  onDraftChange("locationId", event.target.value)
                }
                value={draft.locationId}
              >
                {locations.map((location) => (
                  <option
                    className="bg-[#080a0b]"
                    key={location.id}
                    value={location.id}
                  >
                    {location.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <section className="mt-6">
            <h2 className="editorial-title text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Select time
            </h2>
            <div className="mt-4 grid grid-cols-6 gap-2">
              {timeOptions.slice(0, 12).map((option) => (
                <button
                  aria-pressed={draft.time === option.value}
                  className={classNames(
                    "h-11 rounded-[10px] border text-[14px]",
                    draft.time === option.value
                      ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/52 text-white"
                      : "border-white/12 bg-black/24 text-white/72",
                  )}
                  disabled={option.disabled}
                  key={option.value}
                  onClick={() => onDraftChange("time", option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
            {validation.time ? (
              <p className="mt-3 text-[13px] text-[var(--sb-red-bright)]">
                {validation.time}
              </p>
            ) : null}
          </section>

          <section className="mt-6">
            <h2 className="editorial-title text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Experience
            </h2>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {reservationExperiences.map((experience, index) => (
                <button
                  aria-pressed={draft.experienceId === experience.id}
                  className={classNames(
                    "relative min-h-[138px] overflow-hidden rounded-[12px] border bg-black/30 text-left",
                    draft.experienceId === experience.id
                      ? "border-[var(--sb-red-bright)] shadow-[0_0_20px_rgba(238,43,36,0.24)]"
                      : "border-white/12",
                  )}
                  key={experience.id}
                  onClick={() => onDraftChange("experienceId", experience.id)}
                  type="button"
                >
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="220px"
                    src={experience.imageUrl}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-3 text-[13px] uppercase tracking-[0.04em] text-white">
                    {experience.title}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <label>
              <span className="text-[13px] uppercase tracking-[0.08em] text-white/50">
                Occasion
              </span>
              <input
                className="mt-3 h-12 w-full rounded-[10px] border border-white/12 bg-black/24 px-4 text-[14px] text-white outline-none focus:border-[var(--sb-gold)]"
                onChange={(event) =>
                  onDraftChange("occasion", event.target.value)
                }
                value={draft.occasion}
              />
            </label>
            <label>
              <span className="text-[13px] uppercase tracking-[0.08em] text-white/50">
                Seating
              </span>
              <input
                className="mt-3 h-12 w-full rounded-[10px] border border-white/12 bg-black/24 px-4 text-[14px] text-white outline-none focus:border-[var(--sb-gold)]"
                onChange={(event) =>
                  onDraftChange("seatingPreference", event.target.value)
                }
                value={draft.seatingPreference}
              />
            </label>
          </div>
        </article>

        <aside className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
          <h2 className="editorial-title text-[20px] uppercase tracking-[0.08em]">
            Change summary
          </h2>
          <div className="mt-5 divide-y divide-white/10">
            <SummaryLine
              label="Date"
              value={
                selectedDateTime ? formatDateOnly(selectedDateTime) : draft.date
              }
            />
            <SummaryLine label="Time" value={formatTimeLabel(draft.time)} />
            <SummaryLine
              label="Party size"
              value={`${draft.partySize} Guests`}
            />
            <SummaryLine label="Experience" value={selectedExperience.title} />
            <SummaryLine label="Seating" value={draft.seatingPreference} />
          </div>
          <div className="mt-5 rounded-[12px] border border-[var(--sb-gold)]/22 bg-black/24 p-4 text-[14px] leading-6 text-white/60">
            <AssetIcon
              className="mb-3"
              size={24}
              src="/assets/icons/gold-alert-icon.png"
            />
            Saving changes keeps your confirmation code and updates concierge
            notes for the dining room.
          </div>
          <Button
            className="mt-5 h-[58px] w-full rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
            onClick={onOpenReview}
          >
            Save changes
          </Button>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              className="h-11 rounded-[10px] border border-white/12 text-[12px] uppercase tracking-[0.08em] text-white/68"
              onClick={onResetForm}
              type="button"
            >
              Reset edit
            </button>
            <button
              className="h-11 rounded-[10px] border border-[var(--sb-red-bright)]/42 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)] disabled:cursor-not-allowed disabled:opacity-45"
              disabled={!editingReservation}
              onClick={() => {
                if (editingReservation) {
                  onRequestCancel(editingReservation);
                }
              }}
              type="button"
            >
              Cancel reservation
            </button>
          </div>
        </aside>
      </section>

      <div className="mt-4">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}
