"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Reward } from "@/types/loyalty";

interface TabletRewardTileProps {
  imagePriority: boolean;
  memberPoints: number;
  onViewReward: (reward: Reward) => void;
  reward: Reward;
}

export function TabletRewardTile({
  imagePriority,
  memberPoints,
  onViewReward,
  reward,
}: TabletRewardTileProps) {
  const affordable = memberPoints >= reward.pointsCost;

  return (
    <article className="grid min-h-[152px] grid-cols-[112px_minmax(0,1fr)] overflow-hidden rounded-[15px] border border-[var(--sb-red)]/24 bg-white/[0.04] min-[1080px]:min-h-[178px] min-[1080px]:grid-cols-[138px_minmax(0,1fr)]">
      <div className="relative min-h-full bg-black/30">
        <Image
          alt={reward.title}
          className="object-cover"
          fill
          loading={imagePriority ? "eager" : "lazy"}
          sizes="180px"
          src={reward.imageUrl}
        />
      </div>
      <div className="grid min-w-0 content-between p-3 min-[1080px]:p-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <StatusBadge
              className="px-2 py-0.5 text-[10px]"
              tone={reward.isAvailable ? "premium" : "neutral"}
            >
              {reward.isAvailable ? reward.category : "Paused"}
            </StatusBadge>
            {reward.isAvailable && !affordable ? (
              <StatusBadge className="px-2 py-0.5 text-[10px]" tone="warning">
                Need points
              </StatusBadge>
            ) : null}
          </div>
          <h3 className="mt-2 truncate text-[16px] font-semibold text-white min-[1080px]:text-[18px]">
            {reward.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-white/56 min-[1080px]:text-[13px]">
            {reward.description}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-mono text-[12px] font-semibold text-[var(--sb-gold-soft)] min-[1080px]:text-[13px]">
            {reward.pointsCost} pts
          </span>
          <Button
            className="h-10 rounded-[10px] px-3 text-[11px] uppercase tracking-[0.08em]"
            onClick={() => onViewReward(reward)}
            size="sm"
            variant={reward.isAvailable && affordable ? "primary" : "secondary"}
          >
            Details
          </Button>
        </div>
      </div>
    </article>
  );
}
