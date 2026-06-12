import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { reservationExperiences } from "@/data/reservations";
import { DesktopBenefitStrip } from "@/features/menu/DesktopMenuChrome";
import { classNames } from "@/lib/classNames";
import { formatFullDateTime } from "@/lib/dates";
import type {
  Reservation,
  ReservationDraft,
  ReservationValidationState,
} from "@/types/reservation";

import {
  DesktopReservationHero,
  formatDateOnly,
  formatTimeLabel,
  PanelBlock,
  SummaryLine,
} from "./DesktopReservationPrimitives";

interface DesktopReservationMainProps {
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
  onDraftChange: <TField extends keyof ReservationDraft>(
    field: TField,
    value: ReservationDraft[TField],
  ) => void;
  onOpenExperience: () => void;
  onOpenHistory: () => void;
  onOpenReview: () => void;
  onResetForm: () => void;
}

export function DesktopReservationMain({
  draft,
  editingReservation,
  selectedDateTime,
  selectedExperience,
  timeOptions,
  validation,
  onDraftChange,
  onOpenExperience,
  onOpenHistory,
  onOpenReview,
  onResetForm,
}: DesktopReservationMainProps) {
  return (
    <main className="mx-auto max-w-[1518px] px-5 pb-5">
      <DesktopReservationHero />
      <div className="grid grid-cols-[minmax(0,1fr)_470px] gap-4">
        <section className="rounded-[18px] border border-[var(--sb-border)] bg-black/42 p-5">
          <div className="grid grid-cols-[250px_1fr_360px] gap-5">
            <PanelBlock title="Party details" step="1">
              <div className="mt-6 grid h-10 grid-cols-[40px_1fr_40px] overflow-hidden rounded-[10px] border border-white/12">
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
              <p className="mt-8 rounded-[12px] border border-[var(--sb-gold)]/28 bg-[var(--sb-gold)]/8 p-4 text-[14px] leading-6 text-white/62">
                Perfect for {draft.partySize}. Intimate dining experience in a
                refined setting.
              </p>
            </PanelBlock>

            <PanelBlock title="Select date" step="2">
              <input
                className="mt-5 h-11 w-full rounded-[10px] border border-white/12 bg-black/24 px-4 text-[14px] text-white outline-none focus:border-[var(--sb-gold)]"
                min={new Date().toISOString().slice(0, 10)}
                onChange={(event) => onDraftChange("date", event.target.value)}
                type="date"
                value={draft.date}
              />
              <p className="mt-4 flex items-center gap-3 rounded-[10px] border border-white/10 bg-black/26 p-3 text-[14px] text-white/72">
                <AssetIcon size={19} src="/assets/icons/calendar-icon.png" />
                {selectedDateTime
                  ? formatFullDateTime(selectedDateTime)
                  : "Choose date and time"}
              </p>
              {validation.date ? (
                <p className="mt-3 text-[13px] text-[var(--sb-red-bright)]">
                  {validation.date}
                </p>
              ) : null}
            </PanelBlock>

            <PanelBlock title="Select time" step="3">
              <div className="mt-5 grid grid-cols-3 gap-2">
                {timeOptions.slice(0, 12).map((option) => (
                  <button
                    aria-pressed={draft.time === option.value}
                    className={classNames(
                      "h-10 rounded-[10px] border text-[14px]",
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
            </PanelBlock>
          </div>

          <div className="mt-5">
            <h2 className="editorial-title text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Choose your experience
            </h2>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {reservationExperiences.map((experience, index) => (
                <button
                  aria-pressed={draft.experienceId === experience.id}
                  className={classNames(
                    "relative min-h-[168px] overflow-hidden rounded-[12px] border bg-black/30 text-left",
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
                    priority={index === 0}
                    sizes="260px"
                    src={experience.imageUrl}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black via-black/52 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block text-[15px] uppercase tracking-[0.04em] text-white">
                      {experience.title}
                    </span>
                    <span className="mt-1 block text-[12px] leading-5 text-white/58">
                      {experience.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <button
              className="mt-4 text-[13px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
              onClick={onOpenExperience}
              type="button"
            >
              Open experience chooser &gt;
            </button>
          </div>
        </section>

        <DesktopReservationSummary
          draft={draft}
          editingReservation={editingReservation}
          selectedDateTime={selectedDateTime}
          selectedExperience={selectedExperience}
          onOpenExperience={onOpenExperience}
          onOpenHistory={onOpenHistory}
          onOpenReview={onOpenReview}
          onResetForm={onResetForm}
        />
      </div>
      <div className="mt-4">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}

function DesktopReservationSummary({
  draft,
  editingReservation,
  selectedDateTime,
  selectedExperience,
  onOpenExperience,
  onOpenHistory,
  onOpenReview,
  onResetForm,
}: {
  draft: ReservationDraft;
  editingReservation: Reservation | null;
  selectedDateTime: Date | null;
  selectedExperience: (typeof reservationExperiences)[number];
  onOpenExperience: () => void;
  onOpenHistory: () => void;
  onOpenReview: () => void;
  onResetForm: () => void;
}) {
  return (
    <aside className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
      <h2 className="editorial-title text-[20px] uppercase tracking-[0.08em]">
        Your reservation
      </h2>
      <div className="mt-5 divide-y divide-white/10">
        <SummaryLine
          label="Date"
          value={
            selectedDateTime ? formatDateOnly(selectedDateTime) : draft.date
          }
        />
        <SummaryLine label="Time" value={formatTimeLabel(draft.time)} />
        <SummaryLine label="Party size" value={`${draft.partySize} Guests`} />
        <SummaryLine
          label="Experience"
          value={selectedExperience?.title || "Not selected"}
        />
        <SummaryLine label="Occasion" value={draft.occasion} />
      </div>
      <button
        className="mt-4 w-full rounded-[12px] border border-[var(--sb-gold)]/24 bg-black/22 p-4 text-left text-[14px] leading-6 text-white/64"
        onClick={onOpenExperience}
        type="button"
      >
        Special request or experience change? Open the full experience chooser.
      </button>
      <Button
        className="mt-5 h-[62px] w-full rounded-[12px] text-[15px] uppercase tracking-[0.08em]"
        onClick={onOpenReview}
      >
        Confirm reservation
      </Button>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          className="h-11 rounded-[10px] border border-white/12 text-[12px] uppercase tracking-[0.08em] text-white/68"
          onClick={onOpenHistory}
          type="button"
        >
          View history
        </button>
        <button
          className="h-11 rounded-[10px] border border-white/12 text-[12px] uppercase tracking-[0.08em] text-white/68 disabled:cursor-not-allowed disabled:opacity-45"
          disabled={!editingReservation}
          onClick={onResetForm}
          type="button"
        >
          Reset edit
        </button>
      </div>
      <p className="mt-4 text-center text-[12px] text-white/42">
        Secure booking powered by SSL encryption
      </p>
    </aside>
  );
}
