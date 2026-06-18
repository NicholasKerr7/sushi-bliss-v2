"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { rewards } from "@/data/loyalty";
import { icons } from "@/features/home/visualHomeData";
import { getNextTier } from "@/lib/loyalty";
import type { LoyaltyAccount, Reward } from "@/types/loyalty";

import {
  MobileLoyaltyIconCircle,
  MobileLoyaltyPanel,
} from "./MobileLoyaltyPrimitives";

interface MobileLoyaltyCommandCenterProps {
  account: LoyaltyAccount;
  memberPoints: number;
  onViewReward: (reward: Reward) => void;
}

/** Summarizes reward eligibility and exposes the fastest valid loyalty action. */
export function MobileLoyaltyCommandCenter({
  account,
  memberPoints,
  onViewReward,
}: MobileLoyaltyCommandCenterProps) {
  const redeemableRewards = rewards.filter(
    (reward) => reward.isAvailable && memberPoints >= reward.pointsCost,
  );
  const closestReward = [...rewards]
    .filter((reward) => reward.isAvailable)
    .sort((a, b) => a.pointsCost - b.pointsCost)[0];
  const nextReward = redeemableRewards[0] || closestReward;
  const nextTier = getNextTier(account.lifetimePoints);
  const pointsToNextReward = nextReward
    ? Math.max(nextReward.pointsCost - memberPoints, 0)
    : 0;

  return (
    <MobileLoyaltyPanel className="mt-4 overflow-hidden p-4">
      <div className="grid grid-cols-[50px_1fr] gap-3 min-[390px]:grid-cols-[58px_1fr] min-[390px]:gap-4">
        <MobileLoyaltyIconCircle
          className="h-[50px] w-[50px] border-[var(--sb-gold)]/44 min-[390px]:h-[58px] min-[390px]:w-[58px]"
          icon="/assets/icons/golden-ticket-icon.png"
          size={25}
        />
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/48">
            Rewards Command
          </p>
          <h2 className="editorial-title mt-2 text-[21px] leading-[1.04] text-white min-[390px]:text-[24px] min-[390px]:leading-[1.02]">
            {redeemableRewards.length > 0
              ? "Ready to redeem"
              : "Earn toward the next reward"}
          </h2>
          <p className="mt-2 text-[14px] leading-5 text-white/58">
            {redeemableRewards.length > 0 && nextReward
              ? `${nextReward.title} can be redeemed now.`
              : nextReward
                ? `${pointsToNextReward.toLocaleString()} more points unlock ${nextReward.title}.`
                : "Rewards will appear as seasonal experiences become available."}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-[14px] border border-white/10 bg-black/30">
        <CommandMetric label="Balance" value={memberPoints.toLocaleString()} />
        <CommandMetric
          label="Redeemable"
          value={String(redeemableRewards.length)}
        />
        <CommandMetric
          label={nextTier ? "Next Tier" : "Tier"}
          value={nextTier ? nextTier.label : "Top"}
        />
      </div>

      <div className="mt-4 grid grid-cols-[1.15fr_0.85fr] gap-3">
        {redeemableRewards.length > 0 && nextReward ? (
          <button
            className="red-glow-button flex min-h-[50px] items-center justify-center gap-2.5 rounded-[12px] text-[11px] uppercase tracking-[0.07em] min-[390px]:min-h-[56px] min-[390px]:gap-3 min-[390px]:rounded-[13px] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
            onClick={() => onViewReward(nextReward)}
            type="button"
          >
            <AssetIcon size={21} src="/assets/icons/golden-ticket-icon.png" />
            Redeem Now
          </button>
        ) : (
          <Link
            className="red-glow-button flex min-h-[50px] items-center justify-center gap-2.5 rounded-[12px] text-[11px] uppercase tracking-[0.07em] min-[390px]:min-h-[56px] min-[390px]:gap-3 min-[390px]:rounded-[13px] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
            href="/menu"
          >
            <AssetIcon size={21} src={icons.menu} />
            Earn Points
          </Link>
        )}

        <Link
          className="grid min-h-[50px] place-items-center rounded-[12px] border border-[var(--sb-border)] bg-black/34 text-[11px] uppercase tracking-[0.07em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:min-h-[56px] min-[390px]:rounded-[13px] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
          href="/offers"
        >
          Offers
        </Link>
      </div>
    </MobileLoyaltyPanel>
  );
}

function CommandMetric({ label, value }: { label: string; value: string }) {
  return (
    <p className="min-w-0 px-2 py-3 text-center">
      <span className="block truncate font-mono text-[17px] text-[var(--sb-gold-soft)]">
        {value}
      </span>
      <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-white/44">
        {label}
      </span>
    </p>
  );
}
