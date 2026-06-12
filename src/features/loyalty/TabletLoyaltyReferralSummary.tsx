"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { referralProgress } from "@/data/loyalty";

interface TabletLoyaltyReferralSummaryProps {
  copyMessage: string;
  onCopyCode: () => void;
  onOpenReferral: () => void;
}

export function TabletLoyaltyReferralSummary({
  copyMessage,
  onCopyCode,
  onOpenReferral,
}: TabletLoyaltyReferralSummaryProps) {
  return (
    <article className="grid min-h-[190px] content-between rounded-[18px] border border-[var(--sb-red)]/24 bg-white/[0.04] p-4 min-[1080px]:min-h-[234px] min-[1080px]:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <StatusBadge tone="success">
            {referralProgress.completedInvites}/{referralProgress.invitedGuests}{" "}
            complete
          </StatusBadge>
          <h2 className="mt-3 text-[22px] font-semibold text-white min-[1080px]:text-[26px]">
            Invite and earn
          </h2>
          <p className="mt-1 text-[13px] leading-5 text-white/54 min-[1080px]:text-[14px] min-[1080px]:leading-6">
            Referrals award points after completed checkout orders.
          </p>
        </div>
        <AssetIcon size={48} src="/assets/icons/gift-icon.png" />
      </div>

      <div className="mt-4 rounded-[14px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/10 p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/44">
              Referral code
            </p>
            <p className="mt-1 font-mono text-[22px] font-semibold text-[var(--sb-gold-soft)] min-[1080px]:text-[26px]">
              {referralProgress.code}
            </p>
          </div>
          <Button
            className="h-9 min-h-0 rounded-[10px] px-3 text-[11px] uppercase tracking-[0.08em]"
            onClick={onCopyCode}
            size="sm"
            variant="secondary"
          >
            {copyMessage || "Copy"}
          </Button>
        </div>
      </div>

      <button
        className="mt-3 h-10 rounded-[10px] border border-[var(--sb-border)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
        onClick={onOpenReferral}
        type="button"
      >
        Referral & earn
      </button>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {referralProgress.milestones.map((milestone) => (
          <div
            className="rounded-[12px] border border-white/10 bg-black/24 px-3 py-2"
            key={milestone.label}
          >
            <p className="font-mono text-[15px] font-semibold text-[var(--sb-gold-soft)]">
              {milestone.count}
            </p>
            <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-white/48">
              {milestone.completed ? "Completed" : milestone.label}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
