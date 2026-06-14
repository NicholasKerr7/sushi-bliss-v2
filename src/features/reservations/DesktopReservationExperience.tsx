import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
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
    <main className="mx-auto max-w-[1518px] px-10 pb-6 pt-5">
      <button
        className="inline-flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
        onClick={onBack}
        type="button"
      >
        <ChevronIcon direction="left" size={18} />
        Back to date & time
      </button>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_434px] gap-9">
        <section>
          <p className="text-[16px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
            Step 3 of 4
          </p>
          <h1 className="editorial-title mt-2 text-[48px] uppercase leading-none tracking-[0.08em]">
            Choose your{" "}
            <span className="text-[var(--sb-red-bright)]">experience</span>
          </h1>
          <p className="mt-3 max-w-xl text-[17px] leading-7 text-[var(--sb-gold-soft)]">
            Each experience is thoughtfully crafted to deliver unforgettable
            moments.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {reservationExperiences.map((experience, index) => (
              <button
                aria-pressed={draft.experienceId === experience.id}
                className={classNames(
                  "relative min-h-[162px] overflow-hidden rounded-[14px] border bg-white/[0.025] text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                  draft.experienceId === experience.id
                    ? "border-[var(--sb-red-bright)] shadow-[0_0_24px_rgba(238,43,36,0.2)]"
                    : "border-white/12 hover:border-[var(--sb-gold)]/40",
                )}
                key={experience.id}
                onClick={() => onDraftChange("experienceId", experience.id)}
                type="button"
              >
                <span className="grid min-h-[162px] grid-cols-[220px_1fr]">
                  <span className="relative overflow-hidden">
                    {index === 0 || experience.premium ? (
                      <span className="absolute left-3 top-3 z-20 rounded-[7px] border border-[var(--sb-gold)]/34 bg-black/64 px-3 py-1 text-[10px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                        {index === 0 ? "Recommended" : "Premium"}
                      </span>
                    ) : null}
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      loading={index < 3 ? "eager" : "lazy"}
                      priority={index === 0}
                      sizes="220px"
                      src={experience.imageUrl}
                    />
                    <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.12),rgba(0,0,0,0.5))]" />
                  </span>
                  <span className="relative grid content-center p-5 pr-14">
                    <span className="editorial-title block text-[19px] uppercase text-white">
                      {experience.title}
                    </span>
                    <span className="mt-2 block text-[14px] leading-6 text-white/62">
                      {experience.description}
                    </span>
                    <span className="mt-4 flex items-center justify-between gap-4 text-[13px] text-[var(--sb-gold-soft)]">
                      <span>{experience.priceLabel}</span>
                      <span>{experience.durationMinutes} min</span>
                    </span>
                  </span>
                </span>
                <span
                  className={classNames(
                    "absolute right-4 top-4 z-20 grid h-8 w-8 place-items-center rounded-full border bg-black/50",
                    draft.experienceId === experience.id
                      ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)] shadow-[0_0_18px_rgba(238,43,36,0.45)]"
                      : "border-[var(--sb-gold)]/50",
                  )}
                >
                  {draft.experienceId === experience.id ? (
                    <AssetIcon size={17} src="/assets/icons/check-icon.png" />
                  ) : null}
                </span>
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
      <div className="mt-5">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}
