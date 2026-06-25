"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { icons } from "@/features/home/homeDashboardData";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import type { LoyaltyTransaction, RedeemedReward } from "@/types/loyalty";

import { MobileLoyaltyPanel } from "./MobileLoyaltyPrimitives";

interface MobileLoyaltyActivityViewProps {
  redeemedRewards: RedeemedReward[];
  transactions: LoyaltyTransaction[];
}

export function MobileLoyaltyActivityView({
  redeemedRewards,
  transactions,
}: MobileLoyaltyActivityViewProps) {
  return (
    <div className="grid gap-4">
      <MobileLoyaltyPanel className="overflow-hidden">
        <SectionTitle
          icon="/assets/icons/golden-ticket-icon.png"
          label="Redeemed rewards"
        />
        {redeemedRewards.length > 0 ? (
          redeemedRewards.slice(0, 3).map((redemption) => (
            <div
              className="border-b border-white/10 px-4 py-4 last:border-b-0"
              key={redemption.id}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-semibold text-white">
                  {redemption.title}
                </p>
                <StatusBadge tone="premium">
                  {redemption.confirmationCode}
                </StatusBadge>
              </div>
              <p className="mt-2 text-[13px] text-white/48">
                {formatDateTime(redemption.redeemedAt)} -{" "}
                {redemption.pointsCost} points
              </p>
            </div>
          ))
        ) : (
          <p className="px-4 py-5 text-[14px] leading-6 text-white/56">
            Redeemed rewards will appear here after a valid redemption.
          </p>
        )}
      </MobileLoyaltyPanel>

      <MobileLoyaltyPanel className="overflow-hidden">
        <SectionTitle icon={icons.star} label="Points activity" />
        {transactions.slice(0, 6).map((transaction) => (
          <div
            className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 last:border-b-0"
            key={transaction.id}
          >
            <div>
              <p className="text-[15px] text-white">{transaction.label}</p>
              <p className="mt-1 text-[13px] text-white/48">
                {formatDateTime(transaction.createdAt)}
              </p>
            </div>
            <span
              className={classNames(
                "font-mono text-[15px] font-semibold",
                transaction.points > 0
                  ? "text-[var(--sb-wasabi)]"
                  : "text-[var(--sb-red-bright)]",
              )}
            >
              {transaction.points > 0 ? "+" : ""}
              {transaction.points}
            </span>
          </div>
        ))}
      </MobileLoyaltyPanel>
    </div>
  );
}

function SectionTitle({ icon, label }: { icon?: string; label: string }) {
  return (
    <h3 className="flex min-h-[58px] items-center gap-3 border-b border-white/10 px-4 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
      <AssetIcon size={24} src={icon} />
      {label}
    </h3>
  );
}
