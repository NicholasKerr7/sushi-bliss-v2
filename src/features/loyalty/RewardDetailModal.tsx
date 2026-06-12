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
        <div className="space-y-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sb-panel-soft">
            <Image
              alt={reward.title}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 32rem, 100vw"
              src={reward.imageUrl}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={reward.isAvailable ? "premium" : "neutral"}>
              {reward.isAvailable ? reward.category : "Paused"}
            </StatusBadge>
            <StatusBadge tone={affordable ? "success" : "warning"}>
              {affordable ? "Enough points" : "More points needed"}
            </StatusBadge>
          </div>

          <div className="rounded-card border border-sb-line bg-sb-ink/50 p-4">
            <p className="text-xs font-semibold uppercase text-sb-dim">Terms</p>
            <p className="mt-2 text-sm leading-6 text-sb-muted">
              {reward.terms}
            </p>
          </div>

          {redemptionMessage ? (
            <p className="rounded-card border border-sb-gold/30 bg-sb-gold/10 p-3 text-sm font-semibold text-sb-gold-soft">
              {redemptionMessage}
            </p>
          ) : null}
        </div>
      ) : null}
    </Modal>
  );
}
