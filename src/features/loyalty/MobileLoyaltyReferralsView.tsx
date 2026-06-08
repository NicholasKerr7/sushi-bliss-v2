"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { referralProgress } from "@/data/loyalty";

import {
  MobileLoyaltyIconCircle,
  MobileLoyaltyPanel,
} from "./MobileLoyaltyPrimitives";

interface MobileLoyaltyReferralsViewProps {
  copyMessage: string;
  onCopyCode: () => void;
}

export function MobileLoyaltyReferralsView({
  copyMessage,
  onCopyCode,
}: MobileLoyaltyReferralsViewProps) {
  return (
    <div className="grid gap-4">
      <MobileLoyaltyPanel className="overflow-hidden p-4">
        <div className="flex items-start gap-4">
          <MobileLoyaltyIconCircle icon="/assets/icons/gift-icon.png" />
          <div className="min-w-0">
            <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Referral code
            </p>
            <p className="mt-2 font-mono text-[27px] text-white">
              {referralProgress.code}
            </p>
          </div>
        </div>
        <button
          className="red-glow-button mt-5 flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[14px] text-[15px] uppercase tracking-[0.08em]"
          onClick={onCopyCode}
          type="button"
        >
          <AssetIcon size={24} src="/assets/icons/golden-ticket-icon.png" />
          Copy referral code
        </button>
        {copyMessage ? (
          <p className="mt-3 rounded-[12px] border border-[var(--sb-gold)]/26 bg-[var(--sb-gold)]/10 p-3 text-center text-[14px] text-[var(--sb-gold-soft)]">
            {copyMessage}
          </p>
        ) : null}
      </MobileLoyaltyPanel>

      <MobileLoyaltyPanel className="overflow-hidden">
        {referralProgress.milestones.map((milestone) => (
          <div
            className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 last:border-b-0"
            key={milestone.label}
          >
            <div>
              <p className="text-[15px] text-white">{milestone.label}</p>
              <p className="mt-1 text-[13px] text-white/48">
                {milestone.count} guest{" "}
                {milestone.count === 1 ? "order" : "orders"}
              </p>
            </div>
            <StatusBadge tone={milestone.completed ? "success" : "neutral"}>
              {milestone.completed ? "Done" : "Open"}
            </StatusBadge>
          </div>
        ))}
      </MobileLoyaltyPanel>

      <MobileLoyaltyPanel className="p-4">
        <p className="text-[13px] uppercase tracking-[0.14em] text-white/52">
          Next milestone
        </p>
        <p className="mt-2 text-[16px] leading-6 text-white/70">
          Five completed guest orders unlock{" "}
          <span className="text-[var(--sb-gold-soft)]">
            {referralProgress.rewardPoints} bonus points
          </span>
          .
        </p>
      </MobileLoyaltyPanel>
    </div>
  );
}
