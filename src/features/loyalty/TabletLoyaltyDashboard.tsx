"use client";

import Link from "next/link";
import { useState } from "react";

import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { referralProgress, rewards } from "@/data/loyalty";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import { classNames } from "@/lib/classNames";
import { getNextTier, getTierLabel, getTierProgress } from "@/lib/loyalty";
import type { RewardRedemptionResult } from "@/lib/loyalty";
import type {
  LoyaltyAccount,
  LoyaltyTransaction,
  RedeemedReward,
  Reward,
} from "@/types/loyalty";

import { RewardDetailModal } from "./RewardDetailModal";
import { TabletLoyaltyHeader } from "./TabletLoyaltyHeader";
import {
  TabletPointsActivityPanel,
  TabletRedeemedRewardsPanel,
} from "./TabletLoyaltyHistoryPanels";
import { TabletLoyaltyMemberSummary } from "./TabletLoyaltyMemberSummary";
import { TabletLoyaltyReferralSummary } from "./TabletLoyaltyReferralSummary";
import { TabletReferralEarnView } from "./TabletReferralEarnView";
import { TabletRewardTile } from "./TabletRewardTile";

interface TabletLoyaltyDashboardProps {
  account: LoyaltyAccount;
  memberPoints: number;
  onRedeemReward: (reward: Reward) => RewardRedemptionResult;
  redeemedRewards: RedeemedReward[];
  redemptionMessage: string;
  selectedReward: Reward | null;
  setRedemptionMessage: (message: string) => void;
  setSelectedReward: (reward: Reward | null) => void;
  transactions: LoyaltyTransaction[];
}

export function TabletLoyaltyDashboard({
  account,
  memberPoints,
  onRedeemReward,
  redeemedRewards,
  redemptionMessage,
  selectedReward,
  setRedemptionMessage,
  setSelectedReward,
  transactions,
}: TabletLoyaltyDashboardProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [view, setView] = useState<"dashboard" | "referrals">("dashboard");
  const { itemCount } = useCart();
  const { unreadCount } = useNotifications();
  const progress = getTierProgress(account);
  const nextTier = getNextTier(account.lifetimePoints);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralProgress.code);
      setCopyMessage("Code copied");
    } catch {
      setCopyMessage("Code ready");
    }
  };

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopyMessage("Link copied");
    } catch {
      setCopyMessage("Link ready");
    }
  };

  return (
    <section
      className={classNames(
        "flex min-h-dvh flex-col bg-[#050607] text-white",
        view === "referrals"
          ? "px-0 pb-0 pt-0"
          : "px-[18px] pb-3 pt-2 min-[1080px]:px-[26px] min-[1080px]:pb-4 min-[1080px]:pt-3",
      )}
      id="loyalty"
    >
      {view === "referrals" ? null : (
        <TabletLoyaltyHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
        />
      )}

      {view === "referrals" ? (
        <TabletReferralEarnView
          cartCount={itemCount}
          copyMessage={copyMessage}
          onBack={() => setView("dashboard")}
          onCopyCode={handleCopyCode}
          onCopyLink={handleCopyLink}
          onOpenCart={() => setCartOpen(true)}
          unreadCount={unreadCount}
        />
      ) : (
        <main className="mx-auto w-full max-w-[1034px]">
          <section className="mt-3 text-center lg:mt-4 min-[1080px]:mt-8">
            <h1 className="editorial-title text-[42px] uppercase leading-none tracking-[0.12em] min-[1080px]:text-[58px] min-[1080px]:tracking-[0.14em]">
              Rewards
            </h1>
            <p className="mt-2 text-[15px] text-[var(--sb-gold-soft)] min-[1080px]:mt-3 min-[1080px]:text-[18px]">
              Earn points. Redeem experiences. Invite guests.
            </p>
          </section>

          <section className="mt-3 grid grid-cols-[0.98fr_1.02fr] gap-3 lg:mt-4 min-[1080px]:mt-6 min-[1080px]:gap-4">
            <TabletLoyaltyMemberSummary
              lifetimePoints={account.lifetimePoints}
              memberCode={account.memberCode}
              nextTierLabel={nextTier?.label || "Top tier"}
              points={account.points}
              progress={progress}
              tierLabel={getTierLabel(account.tier)}
            />
            <TabletLoyaltyReferralSummary
              copyMessage={copyMessage}
              onCopyCode={handleCopyCode}
              onOpenReferral={() => setView("referrals")}
            />
          </section>

          <section className="mt-3 lg:mt-4 min-[1080px]:mt-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
                  Reward catalog
                </p>
                <h2 className="mt-1 text-[20px] font-semibold text-white min-[1080px]:text-[24px]">
                  Available experiences
                </h2>
              </div>
              <Link
                className="rounded-[12px] border border-[var(--sb-gold)]/40 bg-white/[0.035] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                href="/offers"
              >
                View offers
              </Link>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 lg:gap-3 min-[1080px]:gap-4">
              {rewards.map((reward, index) => (
                <TabletRewardTile
                  imagePriority={index < 4}
                  key={reward.id}
                  memberPoints={memberPoints}
                  onViewReward={(nextReward) => {
                    setSelectedReward(nextReward);
                    setRedemptionMessage("");
                  }}
                  reward={reward}
                />
              ))}
            </div>
          </section>

          <section className="mt-3 hidden grid-cols-[0.95fr_1.05fr] gap-3 lg:grid min-[1080px]:mt-5 min-[1080px]:gap-4">
            <TabletRedeemedRewardsPanel redeemedRewards={redeemedRewards} />
            <TabletPointsActivityPanel transactions={transactions} />
          </section>
        </main>
      )}

      {view === "referrals" ? null : (
        <TabletBottomNavigation
          ariaLabel="Tablet loyalty navigation"
          fixed={false}
        />
      )}
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
      <RewardDetailModal
        memberPoints={memberPoints}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedReward(null);
            setRedemptionMessage("");
          }
        }}
        onRedeemReward={onRedeemReward}
        redemptionMessage={redemptionMessage}
        reward={selectedReward}
      />
    </section>
  );
}
