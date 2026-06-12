import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { DesktopBenefitStrip } from "@/features/menu/DesktopMenuChrome";
import type { ReservationDraft } from "@/types/reservation";

import {
  desktopReservationHeroImage,
  formatDateOnly,
  formatTimeLabel,
  getReservationEstimate,
  ReviewRow,
  SummaryLine,
} from "./DesktopReservationPrimitives";

interface DesktopReservationReviewProps {
  draft: ReservationDraft;
  experience: (typeof reservationExperiences)[number];
  location: (typeof locations)[number];
  selectedDateTime: Date | null;
  onBack: () => void;
  onConfirm: () => void;
}

export function DesktopReservationReview({
  draft,
  experience,
  location,
  selectedDateTime,
  onBack,
  onConfirm,
}: DesktopReservationReviewProps) {
  const estimate = getReservationEstimate(
    experience?.priceLabel,
    draft.partySize,
  );

  return (
    <main className="mx-auto max-w-[1494px] px-7 pb-7 pt-6">
      <button
        className="text-[14px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
        onClick={onBack}
        type="button"
      >
        Reservations / Review
      </button>
      <section className="relative mt-4 overflow-hidden rounded-[20px] border border-white/10 bg-black/42 p-8">
        <Image
          alt=""
          className="object-cover object-[78%_42%] opacity-42"
          fill
          priority
          sizes="1500px"
          src={desktopReservationHeroImage}
        />
        <div className="relative z-10">
          <h1 className="editorial-title text-[44px] uppercase tracking-[0.07em]">
            Review your reservation
          </h1>
          <p className="mt-4 text-[17px] text-[var(--sb-gold-soft)]">
            Please review your details before confirming your reservation.
          </p>
        </div>
      </section>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_390px] gap-5">
        <section className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
          <h2 className="editorial-title text-[20px] uppercase text-[var(--sb-gold-soft)]">
            Your reservation details
          </h2>
          <div className="mt-5 overflow-hidden rounded-[14px] border border-white/10">
            <ReviewRow
              detail={location?.address}
              label="Restaurant"
              value={location?.name || ""}
            />
            <ReviewRow
              label="Date"
              value={
                selectedDateTime ? formatDateOnly(selectedDateTime) : draft.date
              }
            />
            <ReviewRow label="Time" value={formatTimeLabel(draft.time)} />
            <ReviewRow label="Party size" value={`${draft.partySize} Guests`} />
            <ReviewRow
              detail={experience?.description}
              label="Experience"
              value={experience?.title || ""}
            />
            <ReviewRow label="Occasion" value={draft.occasion} />
            <ReviewRow
              label="Special requests"
              value={draft.notes || "No special requests added."}
            />
          </div>
        </section>
        <aside className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
          <h2 className="editorial-title text-[20px] uppercase text-[var(--sb-gold-soft)]">
            Reservation summary
          </h2>
          <div className="mt-5 space-y-4 text-[15px]">
            <SummaryLine
              label="Date"
              value={
                selectedDateTime ? formatDateOnly(selectedDateTime) : draft.date
              }
            />
            <SummaryLine label="Time" value={formatTimeLabel(draft.time)} />
            <SummaryLine
              label="Party Size"
              value={`${draft.partySize} Guests`}
            />
            <SummaryLine label="Experience" value={experience?.title || ""} />
            <SummaryLine label="Deposit due today" value={estimate} strong />
          </div>
          <p className="mt-7 rounded-[14px] border border-[var(--sb-gold)]/22 bg-black/28 p-4 text-[13px] leading-6 text-white/58">
            A deposit is required to secure your reservation. Cancellations made
            at least 24 hours in advance receive a full refund.
          </p>
          <Button
            className="mt-5 h-[58px] w-full rounded-[12px] text-[15px] uppercase tracking-[0.08em]"
            onClick={onConfirm}
          >
            Confirm reservation
          </Button>
        </aside>
      </div>
      <div className="mt-5">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}
