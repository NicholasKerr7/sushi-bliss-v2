"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Reward } from "@/types/loyalty";

interface RewardCardProps {
  memberPoints: number;
  onViewReward: (reward: Reward) => void;
  reward: Reward;
}

export function RewardCard({
  memberPoints,
  onViewReward,
  reward,
}: RewardCardProps) {
  const affordable = memberPoints >= reward.pointsCost;

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3] bg-sb-panel-soft">
        <Image
          alt={reward.title}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 768px) 45vw, 100vw"
          src={reward.imageUrl}
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={reward.isAvailable ? "premium" : "neutral"}>
            {reward.isAvailable ? reward.category : "Paused"}
          </StatusBadge>
          {!affordable && reward.isAvailable ? (
            <StatusBadge tone="warning">More points needed</StatusBadge>
          ) : null}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-sb-rice">
          {reward.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-sb-muted">
          {reward.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-mono text-sm text-sb-gold-soft">
            {reward.pointsCost} pts
          </span>
          <Button onClick={() => onViewReward(reward)} size="sm">
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
