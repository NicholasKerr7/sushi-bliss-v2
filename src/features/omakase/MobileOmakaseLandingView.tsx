"use client";

import Image from "next/image";
import Link from "next/link";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { premiumReservationCards } from "@/data/omakase";
import { formatMoney } from "@/lib/money";
import type { OmakasePackage } from "@/types/omakase";

import { MobileOmakasePanel } from "./MobileOmakasePrimitives";

interface MobileOmakaseLandingViewProps {
  packages: OmakasePackage[];
  selectedPackage: OmakasePackage;
  onOpenReview: () => void;
  onSelectPackage: (packageId: string) => void;
}

/** Mobile omakase package selector with course preview and reservation entry points. */
export function MobileOmakaseLandingView({
  packages,
  selectedPackage,
  onOpenReview,
  onSelectPackage,
}: MobileOmakaseLandingViewProps) {
  return (
    <>
      <section className="mt-8">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Omakase
        </p>
        <h1 className="editorial-title mt-3 text-[43px] uppercase leading-[0.96] text-white">
          Chef
          <span className="block text-[var(--sb-red-bright)]">Journey</span>
        </h1>
        <p className="mt-4 text-[16px] leading-6 text-white/62">
          Select a tasting package, preview the course arc, and move into a
          chef-counter reservation.
        </p>
      </section>

      <MobileOmakasePanel className="mt-6 overflow-hidden">
        <div className="relative min-h-[342px] p-5">
          <Image
            alt={selectedPackage.image.alt || selectedPackage.title}
            className="absolute inset-0 object-cover opacity-78"
            fill
            loading="eager"
            priority
            sizes="430px"
            src={selectedPackage.image.publicUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.86)_100%)]" />
          <div className="relative z-10 flex min-h-[302px] flex-col justify-end">
            <StatusBadge tone={selectedPackage.accent}>
              {selectedPackage.subtitle}
            </StatusBadge>
            <h2 className="editorial-title mt-4 text-[34px] uppercase leading-none text-white">
              {selectedPackage.title}
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-white/62">
              {selectedPackage.description}
            </p>
            <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-4">
              <p className="font-mono text-[24px] text-[var(--sb-gold-soft)]">
                {formatMoney(selectedPackage.priceCents)}
              </p>
              <button
                className="red-glow-button min-h-[52px] rounded-[13px] border px-5 text-[12px]"
                onClick={onOpenReview}
                type="button"
              >
                Review
              </button>
            </div>
          </div>
        </div>
      </MobileOmakasePanel>

      <div className="mt-5 grid gap-3">
        {packages.map((omakasePackage) => (
          <MobileOmakasePackageCard
            isSelected={selectedPackage.id === omakasePackage.id}
            key={omakasePackage.id}
            omakasePackage={omakasePackage}
            onSelectPackage={onSelectPackage}
          />
        ))}
      </div>

      <section className="mt-6">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Course preview
        </p>
        <div className="mt-3 grid gap-3">
          {selectedPackage.courses.map((course, index) => (
            <MobileOmakasePanel
              className="grid grid-cols-[86px_minmax(0,1fr)] gap-4 p-3"
              key={course.id}
            >
              <div className="relative min-h-[92px] overflow-hidden rounded-[13px] border border-white/10 bg-black/34">
                <Image
                  alt={course.image.alt || course.title}
                  className="object-cover"
                  fill
                  loading={
                    index === 0 ||
                    course.image.publicUrl === selectedPackage.image.publicUrl
                      ? "eager"
                      : "lazy"
                  }
                  sizes="86px"
                  src={course.image.publicUrl}
                />
              </div>
              <div className="py-1">
                <StatusBadge tone="neutral">{course.label}</StatusBadge>
                <h3 className="mt-3 text-[17px] font-semibold text-white">
                  {course.title}
                </h3>
                <p className="mt-1 text-[13px] leading-5 text-white/52">
                  {course.description}
                </p>
              </div>
            </MobileOmakasePanel>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Premium reservations
        </p>
        <div className="mt-3 grid gap-3">
          {premiumReservationCards.map((card) => (
            <Link
              className="grid min-h-[112px] grid-cols-[92px_minmax(0,1fr)] gap-4 rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl"
              href={card.href}
              key={card.id}
            >
              <span className="relative min-h-[88px] overflow-hidden rounded-[13px] border border-white/10 bg-black/34">
                <Image
                  alt={card.image.alt || card.title}
                  className="object-cover"
                  fill
                  sizes="92px"
                  src={card.image.publicUrl}
                />
              </span>
              <span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                  {card.label}
                </span>
                <span className="mt-2 block text-[17px] font-semibold text-white">
                  {card.title}
                </span>
                <span className="mt-1 block text-[13px] leading-5 text-white/52">
                  {card.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function MobileOmakasePackageCard({
  isSelected,
  omakasePackage,
  onSelectPackage,
}: {
  isSelected: boolean;
  omakasePackage: OmakasePackage;
  onSelectPackage: (packageId: string) => void;
}) {
  return (
    <button
      aria-pressed={isSelected}
      className="grid min-h-[126px] w-full grid-cols-[92px_minmax(0,1fr)_26px] gap-4 rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl"
      onClick={() => onSelectPackage(omakasePackage.id)}
      type="button"
    >
      <span className="relative min-h-[102px] overflow-hidden rounded-[14px] border border-white/10 bg-black/34">
        <Image
          alt={omakasePackage.image.alt || omakasePackage.title}
          className="object-cover"
          fill
          loading={isSelected ? "eager" : "lazy"}
          sizes="92px"
          src={omakasePackage.image.publicUrl}
        />
      </span>
      <span className="min-w-0 py-1">
        <StatusBadge tone={omakasePackage.accent}>
          {omakasePackage.subtitle}
        </StatusBadge>
        <span className="mt-3 block text-[18px] font-semibold leading-6 text-white">
          {omakasePackage.title}
        </span>
        <span className="mt-1 block text-[13px] leading-5 text-white/52">
          {omakasePackage.durationMinutes} min ·{" "}
          {formatMoney(omakasePackage.priceCents)}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="mt-2 grid h-[26px] w-[26px] place-items-center rounded-full border border-[var(--sb-red-bright)]/70"
      >
        {isSelected ? (
          <span className="h-[12px] w-[12px] rounded-full bg-[var(--sb-red-bright)]" />
        ) : null}
      </span>
    </button>
  );
}
