"use client";

import { ChevronIcon } from "@/components/icons/ChevronIcon";
import Image from "next/image";
import Link from "next/link";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { rewards } from "@/data/loyalty";
import type { Reward } from "@/types/loyalty";

import { MobileLoyaltyPanel } from "./MobileLoyaltyPrimitives";

interface MobileLoyaltyRewardsViewProps {
  memberPoints: number;
  onViewReward: (reward: Reward) => void;
}

export function MobileLoyaltyRewardsView({
  memberPoints,
  onViewReward,
}: MobileLoyaltyRewardsViewProps) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Reward catalog
          </p>
          <h2 className="mt-1 text-[22px] font-semibold text-white">
            Available experiences
          </h2>
        </div>
        <Link
          className="rounded-full border border-[var(--sb-border)] px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          href="/offers"
        >
          Offers
        </Link>
      </div>

      {rewards.map((reward, index) => {
        const affordable = memberPoints >= reward.pointsCost;

        return (
          <MobileLoyaltyPanel className="overflow-hidden" key={reward.id}>
            <button
              className="grid w-full grid-cols-[112px_minmax(0,1fr)] gap-4 p-3 text-left"
              onClick={() => onViewReward(reward)}
              type="button"
            >
              <span className="relative h-[124px] overflow-hidden rounded-[14px] bg-white/8">
                <Image
                  alt={reward.title}
                  className="object-cover"
                  fill
                  loading={index < 4 ? "eager" : "lazy"}
                  sizes="112px"
                  src={reward.imageUrl}
                />
              </span>
              <span className="min-w-0 py-1">
                <span className="flex flex-wrap gap-2">
                  <StatusBadge
                    tone={reward.isAvailable ? "premium" : "neutral"}
                  >
                    {reward.isAvailable ? reward.category : "Paused"}
                  </StatusBadge>
                  {reward.isAvailable && !affordable ? (
                    <StatusBadge tone="warning">Need points</StatusBadge>
                  ) : null}
                </span>
                <span className="mt-3 block text-[17px] font-semibold leading-5 text-white">
                  {reward.title}
                </span>
                <span className="mt-2 line-clamp-2 block text-[13px] leading-5 text-white/56">
                  {reward.description}
                </span>
                <span className="mt-3 flex items-center justify-between gap-3">
                  <span className="font-mono text-[14px] text-[var(--sb-gold-soft)]">
                    {reward.pointsCost.toLocaleString()} pts
                  </span>
                  <span className="text-[23px] leading-none text-[var(--sb-gold-soft)]">
                    <ChevronIcon direction="right" size={18} />
                  </span>
                </span>
              </span>
            </button>
          </MobileLoyaltyPanel>
        );
      })}
    </div>
  );
}
