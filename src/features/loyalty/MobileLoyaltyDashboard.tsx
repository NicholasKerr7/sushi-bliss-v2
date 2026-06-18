"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { referralProgress } from "@/data/loyalty";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { classNames } from "@/lib/classNames";
import {
  getNextTier,
  getTierLabel,
  getTierProgress,
  type RewardRedemptionResult,
} from "@/lib/loyalty";
import type {
  LoyaltyAccount,
  LoyaltyTransaction,
  RedeemedReward,
  Reward,
} from "@/types/loyalty";

import { MobileLoyaltyActivityView } from "./MobileLoyaltyActivityView";
import { MobileLoyaltyCommandCenter } from "./MobileLoyaltyCommandCenter";
import { MobileLoyaltyPassView } from "./MobileLoyaltyPassView";
import {
  MobileLoyaltyHeader,
  MobileLoyaltyIconCircle,
} from "./MobileLoyaltyPrimitives";
import { MobileLoyaltyReferralsView } from "./MobileLoyaltyReferralsView";
import { MobileLoyaltyRewardsView } from "./MobileLoyaltyRewardsView";
import { RewardDetailModal } from "./RewardDetailModal";

type MobileLoyaltyTab = "activity" | "pass" | "referrals" | "rewards";

interface MobileLoyaltyDashboardProps {
  account: LoyaltyAccount;
  memberPoints: number;
  onRedeemReward: (reward: Reward) => RewardRedemptionResult;
  redeemedRewards: RedeemedReward[];
  redemptionMessage: string;
  selectedReward: Reward | null;
  setRedemptionMessage: (message: string) => void;
  setSelectedReward: (reward: Reward | null) => void;
  transactions: LoyaltyTransaction[];
  unreadNotificationCount: number;
}

const mobileTabs: { id: MobileLoyaltyTab; label: string }[] = [
  { id: "rewards", label: "Rewards" },
  { id: "pass", label: "Pass" },
  { id: "referrals", label: "Refer" },
  { id: "activity", label: "Activity" },
];

/** Mobile-first loyalty experience for rewards, referrals, member pass, and activity. */
export function MobileLoyaltyDashboard({
  account,
  memberPoints,
  onRedeemReward,
  redeemedRewards,
  redemptionMessage,
  selectedReward,
  setRedemptionMessage,
  setSelectedReward,
  transactions,
  unreadNotificationCount,
}: MobileLoyaltyDashboardProps) {
  const [activeTab, setActiveTab] = useState<MobileLoyaltyTab>("rewards");
  const [cartOpen, setCartOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const { itemCount } = useCart();
  const tierLabel = getTierLabel(account.tier);
  const progress = getTierProgress(account);
  const nextTier = getNextTier(account.lifetimePoints);
  const progressCells = getProgressCells(progress);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralProgress.code);
      setCopyMessage("Referral code copied.");
    } catch {
      setCopyMessage("Referral code ready to share.");
    }
  };

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-[#050607] px-4 pb-[236px] pt-5 text-white"
      id="loyalty"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_12%,rgba(239,47,37,0.22),transparent_28%),radial-gradient(circle_at_100%_8%,rgba(215,168,79,0.15),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0)_0%,#050607_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[430px] bg-[url('/assets/ambience/elegant-sushi-bar-ambience-at-night.webp')] bg-cover bg-center opacity-28"
      />

      <div className="mobile-frame relative z-10">
        <MobileLoyaltyHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
          unreadNotificationCount={unreadNotificationCount}
        />

        <section className="mt-8 overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-black/54 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
          <div className="relative min-h-[236px] p-5">
            <Image
              alt=""
              className="absolute inset-0 object-cover opacity-50"
              fill
              loading="eager"
              priority
              sizes="430px"
              src="/assets/editorial/premium-sushi-preparation-still-life.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.88)_100%)]" />
            <div className="relative z-10 flex min-h-[196px] flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.15em] text-[var(--sb-gold-soft)]">
                    Bliss rewards
                  </p>
                  <h1 className="editorial-title mt-3 text-[36px] uppercase leading-[0.96] text-white min-[390px]:text-[40px]">
                    {tierLabel}
                    <span className="block text-[var(--sb-red-bright)]">
                      Member
                    </span>
                  </h1>
                </div>
                <MobileLoyaltyIconCircle
                  className="h-[58px] w-[58px] border-[var(--sb-gold)]/40 bg-black/58 min-[390px]:h-[70px] min-[390px]:w-[70px]"
                  icon="/assets/icons/golden-ticket-icon.png"
                  size={32}
                />
              </div>

              <div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.12em] text-white/58">
                      Points balance
                    </p>
                    <p className="mt-1 font-mono text-[30px] text-[var(--sb-gold-soft)] min-[390px]:text-[34px]">
                      {memberPoints.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    className="inline-flex min-h-10 items-center rounded-full border border-[var(--sb-gold)]/38 bg-black/36 px-4 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                    href="/offers"
                  >
                    Offers
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-10 gap-1">
                  {progressCells.map((filled, index) => (
                    <span
                      className={classNames(
                        "h-2 rounded-full",
                        filled ? "bg-[var(--sb-gold-soft)]" : "bg-white/14",
                      )}
                      key={`mobile-loyalty-progress-${index}`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-[13px] text-white/58">
                  {nextTier
                    ? `${Math.max(nextTier.minimumPoints - account.lifetimePoints, 0).toLocaleString()} points to ${nextTier.label}`
                    : "Top tier unlocked"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <MobileLoyaltyCommandCenter
          account={account}
          memberPoints={memberPoints}
          onViewReward={(reward) => {
            setSelectedReward(reward);
            setRedemptionMessage("");
          }}
        />

        <nav
          aria-label="Loyalty sections"
          className="mt-4 grid grid-cols-2 gap-1 rounded-[16px] border border-[var(--sb-border)] bg-black/46 p-1 min-[390px]:grid-cols-4"
        >
          {mobileTabs.map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                aria-pressed={active}
                className={classNames(
                  "min-h-[42px] min-w-0 rounded-[12px] border px-2 text-[10px] uppercase tracking-[0.04em] transition min-[390px]:min-h-[44px] min-[390px]:px-0.5 min-[390px]:text-[11px] min-[390px]:tracking-[0.06em]",
                  active
                    ? "border-[var(--sb-red)]/34 bg-[var(--sb-red)]/24 text-[var(--sb-red-bright)] shadow-[0_0_22px_rgba(239,47,37,0.22)]"
                    : "border-white/[0.06] bg-white/[0.025] text-white/58",
                )}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-4">
          {activeTab === "rewards" ? (
            <MobileLoyaltyRewardsView
              memberPoints={memberPoints}
              onViewReward={(reward) => {
                setSelectedReward(reward);
                setRedemptionMessage("");
              }}
            />
          ) : null}

          {activeTab === "pass" ? (
            <MobileLoyaltyPassView account={account} tierLabel={tierLabel} />
          ) : null}

          {activeTab === "referrals" ? (
            <MobileLoyaltyReferralsView
              copyMessage={copyMessage}
              onCopyCode={handleCopyCode}
            />
          ) : null}

          {activeTab === "activity" ? (
            <MobileLoyaltyActivityView
              redeemedRewards={redeemedRewards}
              transactions={transactions}
            />
          ) : null}
        </div>
      </div>

      <BottomNavigation
        activeId="profile"
        ariaLabel="Mobile loyalty navigation"
      />
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

function getProgressCells(progress: number) {
  const filledCells = Math.max(0, Math.min(Math.round(progress / 10), 10));

  return Array.from({ length: 10 }, (_, index) => index < filledCells);
}
