"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import type { LoyaltyTransaction, RedeemedReward } from "@/types/loyalty";

interface RedeemedRewardsPanelProps {
  redeemedRewards: RedeemedReward[];
}

interface PointsActivityPanelProps {
  transactions: LoyaltyTransaction[];
}

export function TabletRedeemedRewardsPanel({
  redeemedRewards,
}: RedeemedRewardsPanelProps) {
  return (
    <article className="rounded-[16px] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[16px] font-semibold text-white">
          Redeemed rewards
        </h2>
        <StatusBadge tone="premium">{redeemedRewards.length}</StatusBadge>
      </div>
      <div className="mt-3 grid gap-2">
        {redeemedRewards.length > 0 ? (
          redeemedRewards.slice(0, 2).map((redemption) => (
            <div
              className="flex items-center justify-between gap-3 rounded-[12px] border border-white/10 bg-black/24 px-3 py-2"
              key={redemption.id}
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-white">
                  {redemption.title}
                </p>
                <p className="mt-1 text-[11px] text-white/46">
                  {formatDateTime(redemption.redeemedAt)}
                </p>
              </div>
              <span className="font-mono text-[11px] text-[var(--sb-gold-soft)]">
                {redemption.confirmationCode}
              </span>
            </div>
          ))
        ) : (
          <p className="rounded-[12px] border border-white/10 bg-black/24 px-3 py-4 text-[13px] text-white/50">
            Valid redemptions appear here with confirmation codes.
          </p>
        )}
      </div>
    </article>
  );
}

export function TabletPointsActivityPanel({
  transactions,
}: PointsActivityPanelProps) {
  return (
    <article className="rounded-[16px] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[16px] font-semibold text-white">
          Points activity
        </h2>
        <StatusBadge tone="success">Checkout only</StatusBadge>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {transactions.slice(0, 4).map((transaction) => (
          <div
            className="rounded-[12px] border border-white/10 bg-black/24 px-3 py-2"
            key={transaction.id}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[12px] font-semibold text-white">
                {transaction.label}
              </p>
              <span
                className={classNames(
                  "font-mono text-[12px] font-semibold",
                  transaction.points > 0
                    ? "text-[var(--sb-wasabi)]"
                    : "text-[var(--sb-red-bright)]",
                )}
              >
                {transaction.points > 0 ? "+" : ""}
                {transaction.points}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-white/42">
              {formatDateTime(transaction.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
