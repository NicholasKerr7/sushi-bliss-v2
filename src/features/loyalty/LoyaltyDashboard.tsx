"use client";

import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { referralProgress, rewards } from "@/data/loyalty";
import { useLoyalty } from "@/hooks/useLoyalty";
import { useNotifications } from "@/hooks/useNotifications";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import { getNextTier, getTierLabel, getTierProgress } from "@/lib/loyalty";
import type { Reward } from "@/types/loyalty";

import { MemberPass } from "./MemberPass";
import { MobileLoyaltyDashboard } from "./MobileLoyaltyDashboard";
import { ReferralPanel } from "./ReferralPanel";
import { RewardCard } from "./RewardCard";
import { RewardDetailModal } from "./RewardDetailModal";
import { TabletLoyaltyDashboard } from "./TabletLoyaltyDashboard";

function getProgressCells(progress: number) {
  const filledCells = Math.round(progress / 10);

  return Array.from({ length: 10 }, (_, index) => index < filledCells);
}

export function LoyaltyDashboard() {
  const { account, redeemReward, redeemedRewards, transactions } = useLoyalty();
  const { unreadCount } = useNotifications();
  const mode = useResponsiveMode();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redemptionMessage, setRedemptionMessage] = useState("");
  const progress = getTierProgress(account);
  const nextTier = getNextTier(account.lifetimePoints);

  const handleViewReward = (reward: Reward) => {
    setSelectedReward(reward);
    setRedemptionMessage("");
  };

  const handleRedeemReward = (reward: Reward) => {
    const result = redeemReward(reward);

    setRedemptionMessage(
      result.redemption
        ? `${result.message} Code ${result.redemption.confirmationCode}.`
        : result.message,
    );

    return result;
  };

  if (mode === "mobile") {
    return (
      <MobileLoyaltyDashboard
        account={account}
        memberPoints={account.points}
        onRedeemReward={handleRedeemReward}
        redeemedRewards={redeemedRewards}
        redemptionMessage={redemptionMessage}
        selectedReward={selectedReward}
        setRedemptionMessage={setRedemptionMessage}
        setSelectedReward={setSelectedReward}
        transactions={transactions}
        unreadNotificationCount={unreadCount}
      />
    );
  }

  if (mode === "tablet") {
    return (
      <TabletLoyaltyDashboard
        account={account}
        memberPoints={account.points}
        onRedeemReward={handleRedeemReward}
        redeemedRewards={redeemedRewards}
        redemptionMessage={redemptionMessage}
        selectedReward={selectedReward}
        setRedemptionMessage={setRedemptionMessage}
        setSelectedReward={setSelectedReward}
        transactions={transactions}
      />
    );
  }

  return (
    <section
      className="border-b border-sb-line bg-sb-ink py-12 md:py-16"
      id="loyalty"
    >
      <PageContainer>
        <SectionHeader
          eyebrow={<Badge tone="premium">Loyalty</Badge>}
          subtitle="Earn points after checkout, redeem valid rewards, and track member referrals."
          title="Rewards and referrals"
        />

        <div className="mt-6 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <Card className="p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-sb-rice">
                    {getTierLabel(account.tier)} balance
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-sb-muted">
                    Points post after confirmed checkout orders.
                  </p>
                </div>
                <p className="font-mono text-4xl font-semibold text-sb-gold-soft">
                  {account.points}
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase text-sb-dim">
                  <span>{getTierLabel(account.tier)}</span>
                  <span>{nextTier ? nextTier.label : "Top tier"}</span>
                </div>
                <div className="mt-3 grid grid-cols-10 gap-1">
                  {getProgressCells(progress).map((filled, index) => (
                    <span
                      className={classNames(
                        "h-2 rounded-control",
                        filled ? "bg-sb-gold" : "bg-sb-panel-soft",
                      )}
                      key={`tier-cell-${index}`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-sb-muted">
                  {nextTier
                    ? `${nextTier.minimumPoints - account.lifetimePoints} lifetime points to ${nextTier.label}.`
                    : "You have unlocked every current tier."}
                </p>
              </div>
            </Card>

            <MemberPass account={account} />
            <ReferralPanel progress={referralProgress} />
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-semibold text-sb-rice">
                Rewards list
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {rewards.map((reward, index) => (
                  <RewardCard
                    imagePriority={index < 4}
                    key={reward.id}
                    memberPoints={account.points}
                    onViewReward={handleViewReward}
                    reward={reward}
                  />
                ))}
              </div>
            </div>

            <Card className="p-5 md:p-6">
              <h3 className="text-xl font-semibold text-sb-rice">
                Redeemed rewards
              </h3>
              <div className="mt-4 grid gap-3">
                {redeemedRewards.length > 0 ? (
                  redeemedRewards.slice(0, 3).map((redemption) => (
                    <div
                      className="rounded-card border border-sb-line bg-sb-ink/50 p-4"
                      key={redemption.id}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-sb-rice">
                          {redemption.title}
                        </p>
                        <StatusBadge tone="premium">
                          {redemption.confirmationCode}
                        </StatusBadge>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-sb-muted">
                        {formatDateTime(redemption.redeemedAt)} ·{" "}
                        {redemption.pointsCost} points
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-card border border-sb-line bg-sb-ink/50 p-4 text-sm leading-6 text-sb-muted">
                    Redeemed rewards will appear here after a valid redemption.
                  </p>
                )}
              </div>
            </Card>

            <Card className="p-5 md:p-6">
              <h3 className="text-xl font-semibold text-sb-rice">
                Points activity
              </h3>
              <div className="mt-4 grid gap-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div
                    className="flex items-start justify-between gap-4 rounded-card border border-sb-line bg-sb-ink/50 p-4"
                    key={transaction.id}
                  >
                    <div>
                      <p className="text-sm font-semibold text-sb-rice">
                        {transaction.label}
                      </p>
                      <p className="mt-1 text-xs text-sb-muted">
                        {formatDateTime(transaction.createdAt)}
                      </p>
                    </div>
                    <span
                      className={classNames(
                        "font-mono text-sm font-semibold",
                        transaction.points > 0
                          ? "text-sb-wasabi"
                          : "text-sb-red",
                      )}
                    >
                      {transaction.points > 0 ? "+" : ""}
                      {transaction.points}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </PageContainer>

      <RewardDetailModal
        memberPoints={account.points}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedReward(null);
            setRedemptionMessage("");
          }
        }}
        onRedeemReward={handleRedeemReward}
        redemptionMessage={redemptionMessage}
        reward={selectedReward}
      />
    </section>
  );
}
