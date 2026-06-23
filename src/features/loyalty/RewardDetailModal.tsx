"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { RewardRedemptionResult } from "@/lib/loyalty";
import type { Reward } from "@/types/loyalty";

interface RewardDetailModalProps {
  memberPoints: number;
  onOpenChange: (open: boolean) => void;
  onRedeemReward: (reward: Reward) => RewardRedemptionResult;
  redemptionMessage: string;
  reward: Reward | null;
}

export function RewardDetailModal({
  memberPoints,
  onOpenChange,
  onRedeemReward,
  redemptionMessage,
  reward,
}: RewardDetailModalProps) {
  const affordable = reward ? memberPoints >= reward.pointsCost : false;
  const neededPoints = reward
    ? Math.max(reward.pointsCost - memberPoints, 0)
    : 0;

  return (
    <Modal
      description={reward?.description}
      onOpenChange={onOpenChange}
      open={Boolean(reward)}
      title={reward?.title || "Reward"}
      footer={
        reward ? (
          <Button
            className="w-full"
            disabled={!reward.isAvailable || !affordable}
            onClick={() => onRedeemReward(reward)}
          >
            {!reward.isAvailable
              ? "Unavailable"
              : affordable
                ? `Redeem ${reward.pointsCost} points`
                : `Need ${neededPoints.toLocaleString()} more points`}
          </Button>
        ) : null
      }
    >
      {reward ? (
        <div className="space-y-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-black/40 shadow-[0_18px_54px_rgba(0,0,0,0.36)]">
            <Image
              alt={reward.title}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 32rem, 100vw"
              src={reward.imageUrl}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.58))]" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <p className="max-w-[18rem] text-[13px] leading-5 text-white/78">
                {reward.description}
              </p>
              <span className="rounded-full border border-[var(--sb-gold)]/45 bg-black/58 px-3 py-1 font-mono text-[12px] text-[var(--sb-gold-soft)]">
                {reward.pointsCost.toLocaleString()} pts
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={reward.isAvailable ? "premium" : "neutral"}>
              {reward.isAvailable ? reward.category : "Paused"}
            </StatusBadge>
            <StatusBadge tone={affordable ? "success" : "warning"}>
              {affordable ? "Enough points" : "More points needed"}
            </StatusBadge>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                Your Balance
              </p>
              <p className="mt-2 font-mono text-[22px] leading-none text-sb-rice">
                {memberPoints.toLocaleString()}
              </p>
            </div>
            <div className="rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                More Needed
              </p>
              <p className="mt-2 font-mono text-[22px] leading-none text-sb-rice">
                {neededPoints.toLocaleString()}
              </p>
            </div>
          </div>

          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.016)),rgba(0,0,0,0.3)] p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              Terms
            </h3>
            <p className="mt-2 text-sm leading-6 text-sb-muted">
              {reward.terms}
            </p>
          </section>

          {redemptionMessage ? (
            <p className="rounded-[16px] border border-[var(--sb-gold)]/36 bg-[var(--sb-gold)]/10 p-3 text-sm font-semibold text-sb-gold-soft">
              {redemptionMessage}
            </p>
          ) : null}
        </div>
      ) : null}
    </Modal>
  );
}
