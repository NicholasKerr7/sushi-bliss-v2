"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { icons } from "@/features/home/visualHomeData";
import type { ReservationDraft } from "@/types/reservation";

interface TabletReservationReviewViewProps {
  draft: ReservationDraft;
  onBack: () => void;
  onConfirm: () => void;
}

export function TabletReservationReviewView({
  draft,
  onBack,
  onConfirm,
}: TabletReservationReviewViewProps) {
  const experience =
    reservationExperiences.find((item) => item.id === draft.experienceId) ||
    reservationExperiences[0];
  const location =
    locations.find((item) => item.id === draft.locationId) || locations[0];
  const estimate = getReservationEstimate(
    experience?.priceLabel,
    draft.partySize,
  );

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
        <h1 className="editorial-title text-[52px] uppercase leading-none tracking-[0.08em]">
          Review Your Reservation
        </h1>
        <p className="mt-4 text-[17px] text-[var(--sb-gold-soft)]">
          Almost ready to indulge.
        </p>
      </section>

      <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_450px]">
        <section className="rounded-[22px] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Reservation details
          </h2>
          <div className="mt-5 grid gap-3">
            <ReviewRow
              icon={icons.calendar}
              label="Date"
              onEdit={onBack}
              value={draft.date || "Choose a date"}
            />
            <ReviewRow
              icon={icons.clock}
              label="Time"
              onEdit={onBack}
              value={draft.time || "Choose a time"}
            />
            <ReviewRow
              icon={icons.profile}
              label="Party size"
              onEdit={onBack}
              value={`${draft.partySize} ${draft.partySize === 1 ? "guest" : "guests"}`}
            />
            <ReviewRow
              icon={icons.flower}
              label="Experience"
              onEdit={onBack}
              value={experience?.title || draft.experienceId}
              supporting={experience?.priceLabel}
            />
            <ReviewRow
              icon={icons.star}
              label="Occasion"
              onEdit={onBack}
              value={draft.occasion}
            />
            <ReviewRow
              icon={icons.location}
              label="Location"
              onEdit={onBack}
              value={location?.name || draft.locationId}
              supporting={location?.address}
            />
            <ReviewRow
              icon={icons.settings}
              label="Special requests"
              onEdit={onBack}
              value={draft.notes || "No special requests added."}
            />
          </div>
        </section>

        <aside className="overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04]">
          <div className="relative h-[330px] bg-black/30">
            <Image
              alt={experience?.title || "Reservation experience"}
              className="object-cover"
              fill
              priority
              sizes="450px"
              src={
                experience?.imageUrl ||
                "/assets/gallery/cozy-night-at-sushi-bliss.webp"
              }
            />
          </div>
          <div className="p-6">
            <h2 className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Experience summary
            </h2>
            <h3 className="editorial-title mt-4 text-[26px] uppercase text-white">
              {experience?.title}
            </h3>
            <p className="mt-3 text-[15px] leading-6 text-white/58">
              {experience?.description}
            </p>
            <div className="mt-5 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/64">
                  {experience?.priceLabel} x {draft.partySize}
                </span>
                <span className="font-mono text-[var(--sb-gold-soft)]">
                  {estimate}
                </span>
              </div>
              <p className="mt-4 text-[13px] leading-5 text-white/42">
                A card is used to secure your table. You will not be charged
                until you dine.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-5 rounded-[18px] border border-white/10 bg-white/[0.035] p-5">
        <div className="flex items-center gap-5">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-[var(--sb-gold)]/8">
            <AssetIcon size={26} src={icons.settings} />
          </span>
          <p className="text-[15px] leading-6 text-white/62">
            You may cancel or modify your reservation up to 24 hours in advance.
          </p>
        </div>
      </section>

      <Button
        className="red-glow-button mt-5 h-[68px] w-full rounded-[14px] text-[18px] uppercase tracking-[0.1em]"
        onClick={onConfirm}
      >
        Confirm reservation
      </Button>
    </main>
  );
}

function ReviewRow({
  icon,
  label,
  onEdit,
  supporting,
  value,
}: {
  icon?: string;
  label: string;
  onEdit: () => void;
  supporting?: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[42px_1fr_auto] items-center gap-4 rounded-[14px] border border-white/10 bg-black/22 p-4">
      <AssetIcon size={28} src={icon} />
      <span>
        <span className="block text-[12px] uppercase tracking-[0.08em] text-white/42">
          {label}
        </span>
        <span className="mt-1 block text-[16px] text-white">{value}</span>
        {supporting ? (
          <span className="mt-1 block text-[13px] text-white/48">
            {supporting}
          </span>
        ) : null}
      </span>
      <button
        className="text-[13px] text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
        onClick={onEdit}
        type="button"
      >
        Edit
      </button>
    </div>
  );
}

function getReservationEstimate(
  priceLabel: string | undefined,
  partySize: number,
) {
  if (!priceLabel) {
    return "A la carte";
  }

  const match = priceLabel.match(/\$(\d+)/);

  if (!match) {
    return priceLabel;
  }

  return `$${Number(match[1]) * partySize}.00`;
}
