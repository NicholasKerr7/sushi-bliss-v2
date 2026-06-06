"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { classNames } from "@/lib/classNames";

import { getQrCells } from "./MemberPass";

interface TabletLoyaltyMemberSummaryProps {
  lifetimePoints: number;
  memberCode: string;
  nextTierLabel: string;
  points: number;
  progress: number;
  tierLabel: string;
}

function getProgressCells(progress: number) {
  const filledCells = Math.round(progress / 10);

  return Array.from({ length: 10 }, (_, index) => index < filledCells);
}

export function TabletLoyaltyMemberSummary({
  lifetimePoints,
  memberCode,
  nextTierLabel,
  points,
  progress,
  tierLabel,
}: TabletLoyaltyMemberSummaryProps) {
  return (
    <article className="grid min-h-[190px] grid-cols-[minmax(0,1fr)_100px] gap-3 rounded-[18px] border border-[var(--sb-gold)]/28 bg-white/[0.045] p-4 min-[1080px]:min-h-[234px] min-[1080px]:grid-cols-[minmax(0,1fr)_126px] min-[1080px]:gap-5 min-[1080px]:p-5">
      <div className="min-w-0">
        <StatusBadge tone="premium">{tierLabel} member</StatusBadge>
        <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-white/46">
          Points balance
        </p>
        <p className="mt-1 font-mono text-[42px] font-semibold leading-none text-[var(--sb-gold-soft)] min-[1080px]:text-[54px]">
          {points}
        </p>
        <p className="mt-2 truncate font-mono text-[12px] text-white/52 min-[1080px]:text-[13px]">
          {memberCode}
        </p>

        <div className="mt-4">
          <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/44 min-[1080px]:text-[11px]">
            <span>{tierLabel}</span>
            <span>{nextTierLabel}</span>
          </div>
          <div className="mt-2 grid grid-cols-10 gap-1">
            {getProgressCells(progress).map((filled, index) => (
              <span
                className={classNames(
                  "h-2 rounded-full",
                  filled ? "bg-[var(--sb-gold)]" : "bg-white/10",
                )}
                key={`tablet-tier-cell-${index}`}
              />
            ))}
          </div>
          <p className="mt-2 text-[12px] leading-5 text-white/50">
            {lifetimePoints} lifetime points toward seasonal concierge perks.
          </p>
        </div>
      </div>
      <div
        aria-label={`Mock QR code for ${memberCode}`}
        className="grid h-[100px] w-[100px] shrink-0 grid-cols-7 gap-1 rounded-[14px] border border-[var(--sb-gold)]/34 bg-black/42 p-3 min-[1080px]:h-[126px] min-[1080px]:w-[126px]"
        role="img"
      >
        {getQrCells(memberCode).map((active, index) => (
          <span
            className={classNames(
              "rounded-[2px]",
              active ? "bg-[var(--sb-gold-soft)]" : "bg-white/10",
            )}
            key={`${memberCode}-tablet-${index}`}
          />
        ))}
      </div>
    </article>
  );
}
