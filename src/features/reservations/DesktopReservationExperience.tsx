import Image from "next/image";
import { ChevronIcon } from "@/components/icons/ChevronIcon";

import { Button } from "@/components/ui/Button";
import { reservationExperiences } from "@/data/reservations";
import { DesktopBenefitStrip } from "@/features/menu/DesktopMenuChrome";
import { classNames } from "@/lib/classNames";
import type { ReservationDraft } from "@/types/reservation";

import {
  formatDateOnly,
  formatTimeLabel,
  SummaryLine,
} from "./DesktopReservationPrimitives";

interface DesktopExperienceChooserProps {
  draft: ReservationDraft;
  selectedExperienceId: string;
  onBack: () => void;
  onDraftChange: <TField extends keyof ReservationDraft>(
    field: TField,
    value: ReservationDraft[TField],
  ) => void;
  onOpenReview: () => void;
}

export function DesktopExperienceChooser({
  draft,
  selectedExperienceId,
  onBack,
  onDraftChange,
  onOpenReview,
}: DesktopExperienceChooserProps) {
  const selectedExperience =
    reservationExperiences.find((item) => item.id === selectedExperienceId) ||
    reservationExperiences[0];

  return (
    <main className="mx-auto max-w-[1518px] px-10 pb-7 pt-8">
      <button
        className="text-[14px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
        onClick={onBack}
        type="button"
      >
        Back to date & time
      </button>
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_434px] gap-9">
        <section>
          <p className="text-[16px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
            Step 3 of 4
          </p>
          <h1 className="editorial-title mt-3 text-[48px] uppercase tracking-[0.08em]">
            Choose your{" "}
            <span className="text-[var(--sb-red-bright)]">experience</span>
          </h1>
          <p className="mt-3 max-w-xl text-[17px] leading-7 text-[var(--sb-gold-soft)]">
            Each experience is thoughtfully crafted to deliver unforgettable
            moments.
          </p>
          <div className="mt-7 grid gap-4">
            {reservationExperiences.map((experience, index) => (
              <button
                aria-pressed={draft.experienceId === experience.id}
                className={classNames(
                  "grid min-h-[150px] grid-cols-[220px_1fr_44px] items-center gap-6 rounded-[14px] border p-3 text-left",
                  draft.experienceId === experience.id
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/8"
                    : "border-white/12 bg-white/[0.025]",
                )}
                key={experience.id}
                onClick={() => onDraftChange("experienceId", experience.id)}
                type="button"
              >
                <span className="relative h-[124px] overflow-hidden rounded-[10px]">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    loading={index < 3 ? "eager" : "lazy"}
                    priority={index === 0}
                    sizes="220px"
                    src={experience.imageUrl}
                  />
                </span>
                <span>
                  <span className="editorial-title block text-[20px] uppercase">
                    {experience.title}
                  </span>
                  <span className="mt-2 block text-[14px] leading-6 text-white/62">
                    {experience.description}
                  </span>
                  <span className="mt-3 block text-[13px] text-[var(--sb-gold-soft)]">
                    {experience.priceLabel} · {experience.durationMinutes} min
                  </span>
                </span>
                <span
                  className={classNames(
                    "h-7 w-7 rounded-full border",
                    draft.experienceId === experience.id
                      ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]"
                      : "border-[var(--sb-gold)]/50",
                  )}
                />
              </button>
            ))}
          </div>
        </section>
        <aside className="h-max rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
          <h2 className="editorial-title text-[20px] uppercase text-[var(--sb-gold-soft)]">
            Your reservation
          </h2>
          <div className="mt-6 space-y-4 text-[15px] text-white/62">
            <SummaryLine label="Date" value={formatDateOnly(draft.date)} />
            <SummaryLine label="Time" value={formatTimeLabel(draft.time)} />
            <SummaryLine
              label="Party size"
              value={`${draft.partySize} Guests`}
            />
            <SummaryLine
              label="Experience"
              value={selectedExperience?.title || "Not selected"}
            />
          </div>
          <p className="mt-7 rounded-[14px] border border-[var(--sb-gold)]/22 bg-[var(--sb-gold)]/8 p-4 text-[14px] leading-6 text-white/66">
            Your perfect table awaits. We&apos;ll hold your table while you
            complete your reservation.
          </p>
          <Button
            className="mt-5 h-[58px] w-full rounded-[12px] text-[15px] uppercase tracking-[0.08em]"
            onClick={onOpenReview}
          >
            Continue to confirmation
            <ChevronIcon direction="right" size={18} />
          </Button>
          <button
            className="mt-3 h-12 w-full rounded-[12px] border border-white/12 text-[13px] uppercase tracking-[0.08em] text-white/70"
            onClick={onBack}
            type="button"
          >
            Back to date & time
          </button>
        </aside>
      </div>
      <div className="mt-6">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}
