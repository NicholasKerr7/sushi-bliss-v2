"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { referralProgress, rewards } from "@/data/loyalty";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { getTierLabel, getTierProgress } from "@/lib/loyalty";
import type { RewardRedemptionResult } from "@/lib/loyalty";
import type {
  LoyaltyAccount,
  LoyaltyTransaction,
  Reward,
} from "@/types/loyalty";

import {
  DesktopActivityList,
  DesktopLoyaltyPanel,
  DesktopMemberPassCard,
  DesktopPerkRow,
  DesktopRewardTile,
  DesktopTierProgress,
  desktopLoyaltyHeroImage,
  desktopLoyaltyTextureImage,
} from "./DesktopLoyaltyPrimitives";
import { DesktopLoyaltyPassRewards } from "./DesktopLoyaltyPassRewards";
import { RewardDetailModal } from "./RewardDetailModal";

interface DesktopLoyaltyDashboardProps {
  account: LoyaltyAccount;
  memberPoints: number;
  onRedeemReward: (reward: Reward) => RewardRedemptionResult;
  redemptionMessage: string;
  selectedReward: Reward | null;
  setRedemptionMessage: (message: string) => void;
  setSelectedReward: (reward: Reward | null) => void;
  transactions: LoyaltyTransaction[];
}

export function DesktopLoyaltyDashboard({
  account,
  memberPoints,
  onRedeemReward,
  redemptionMessage,
  selectedReward,
  setRedemptionMessage,
  setSelectedReward,
  transactions,
}: DesktopLoyaltyDashboardProps) {
  const [surface, setSurface] = useState<"dashboard" | "pass">("dashboard");
  const { itemCount } = useCart();
  const progress = getTierProgress(account);

  const openReward = (reward: Reward) => {
    setSelectedReward(reward);
    setRedemptionMessage("");
  };

  if (surface === "pass") {
    return (
      <>
        <DesktopLoyaltyPassRewards
          account={account}
          cartCount={itemCount}
          memberPoints={memberPoints}
          progress={progress}
          transactions={transactions}
          onBack={() => setSurface("dashboard")}
          onViewReward={openReward}
        />
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
      </>
    );
  }

  return (
    <section
      className="hidden min-h-dvh bg-[#030405] text-white xl:block"
      id="loyalty"
    >
      <DesktopMenuHeader activeId="loyalty" cartCount={itemCount} />
      <main className="mx-auto max-w-[1568px] px-5 pb-3 pt-0">
        <div className="overflow-hidden rounded-b-[20px] border-x border-b border-[var(--sb-border)] bg-[#050607] shadow-[0_30px_90px_rgba(0,0,0,0.56)]">
          <section className="relative min-h-[314px]">
            <Image
              alt=""
              className="object-cover object-[58%_45%]"
              fill
              priority
              sizes="1568px"
              src={desktopLoyaltyHeroImage}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.98)_0%,rgba(3,4,5,0.82)_31%,rgba(3,4,5,0.18)_66%,rgba(3,4,5,0.86)_100%)]" />
            <div className="relative z-10 grid min-h-[314px] grid-cols-[minmax(0,1fr)_366px] gap-8 px-16 py-8">
              <div className="flex flex-col justify-center">
                <p className="text-[17px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                  Welcome back, Hiroshi.
                </p>
                <h1 className="editorial-title mt-3 text-[68px] uppercase leading-[0.92] text-white">
                  Loyalty
                  <span className="block text-[var(--sb-red-bright)]">
                    Rewards
                  </span>
                </h1>
                <p className="mt-5 max-w-[420px] text-[17px] leading-7 text-white/72">
                  Savor more than exceptional sushi. Earn points, unlock
                  exclusive rewards, and enjoy elevated dining experiences.
                </p>
              </div>
              <DesktopLoyaltyPanel className="self-center p-6">
                <div className="mb-5 flex items-center gap-4">
                  <AssetIcon
                    size={60}
                    src="/assets/icons/floral-emblem-icon.png"
                  />
                  <div>
                    <p className="editorial-title text-[18px] uppercase text-white">
                      Bliss member
                    </p>
                    <p className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                      {getTierLabel(account.tier)} tier
                    </p>
                  </div>
                </div>
                <DesktopTierProgress account={account} progress={progress} />
                <button
                  className="mt-5 h-10 w-full rounded-[8px] border border-[var(--sb-gold)]/44 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                  onClick={() => setSurface("pass")}
                  type="button"
                >
                  View benefits
                </button>
              </DesktopLoyaltyPanel>
            </div>
          </section>

          <div className="grid grid-cols-[318px_minmax(0,1fr)_396px] gap-4 px-9 pb-5">
            <div className="grid gap-4">
              <DesktopMemberPassCard account={account} />
              <DesktopLoyaltyPanel className="relative overflow-hidden p-5">
                <Image
                  alt=""
                  className="object-cover opacity-42"
                  fill
                  sizes="318px"
                  src={desktopLoyaltyTextureImage}
                />
                <div className="relative z-10">
                  <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    Refer & earn
                  </h2>
                  <p className="mt-4 max-w-[210px] text-[13px] leading-5 text-white/68">
                    Share Sushi Bliss with friends. You both earn{" "}
                    {referralProgress.rewardPoints} points.
                  </p>
                  <Link
                    className="mt-5 inline-grid h-10 place-items-center rounded-[8px] border border-[var(--sb-gold)]/44 px-5 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                    href="/offers"
                  >
                    Invite friends
                  </Link>
                </div>
              </DesktopLoyaltyPanel>
            </div>

            <div className="grid gap-4">
              <DesktopLoyaltyPanel className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    Redeem your points
                  </h2>
                  <button
                    className="text-[12px] text-[var(--sb-red-bright)]"
                    onClick={() => setSurface("pass")}
                    type="button"
                  >
                    View all rewards
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {rewards.map((reward) => (
                    <DesktopRewardTile
                      key={reward.id}
                      memberPoints={memberPoints}
                      reward={reward}
                      onViewReward={openReward}
                    />
                  ))}
                </div>
              </DesktopLoyaltyPanel>

              <DesktopLoyaltyPanel className="p-5">
                <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Member perks
                </h2>
                <div className="mt-5">
                  <DesktopPerkRow />
                </div>
              </DesktopLoyaltyPanel>
            </div>

            <div className="grid gap-4">
              <DesktopLoyaltyPanel className="relative min-h-[176px] overflow-hidden p-5">
                <Image
                  alt=""
                  className="object-cover object-[70%_45%] opacity-62"
                  fill
                  sizes="396px"
                  src="/assets/menu/sushi/uni-nigiri.webp"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,5,6,0.96)_0%,rgba(4,5,6,0.68)_55%,rgba(4,5,6,0.24)_100%)]" />
                <div className="relative z-10 max-w-[210px]">
                  <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    Chef&apos;s tasting rewards
                  </h2>
                  <p className="mt-4 text-[13px] leading-5 text-white/72">
                    Exclusive rewards for our most devoted members.
                  </p>
                  <button
                    className="mt-5 h-10 rounded-[8px] border border-[var(--sb-gold)]/44 px-5 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                    onClick={() => setSurface("pass")}
                    type="button"
                  >
                    Explore rewards
                  </button>
                </div>
              </DesktopLoyaltyPanel>

              <DesktopLoyaltyPanel className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    Recent rewards activity
                  </h2>
                  <button
                    className="text-[12px] text-[var(--sb-red-bright)]"
                    onClick={() => setSurface("pass")}
                    type="button"
                  >
                    View all activity
                  </button>
                </div>
                <div className="mt-3">
                  <DesktopActivityList transactions={transactions} />
                </div>
              </DesktopLoyaltyPanel>
            </div>
          </div>

          <div className="px-9 pb-4">
            <DesktopBenefitStrip />
          </div>
        </div>
      </main>

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
