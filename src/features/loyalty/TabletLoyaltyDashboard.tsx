"use client";

import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { referralProgress, rewards } from "@/data/loyalty";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { icons } from "@/features/home/visualHomeData";
import { useCart } from "@/hooks/useCart";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import { getNextTier, getTierLabel, getTierProgress } from "@/lib/loyalty";
import type { RewardRedemptionResult } from "@/lib/loyalty";
import type {
  LoyaltyAccount,
  LoyaltyTransaction,
  RedeemedReward,
  Reward,
} from "@/types/loyalty";

import { getQrCells } from "./MemberPass";
import { RewardDetailModal } from "./RewardDetailModal";
import { TabletLoyaltyHeader } from "./TabletLoyaltyHeader";
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

const tabletLoyaltyNav = [
  { href: "/home", icon: icons.home, label: "Home" },
  { href: "/menu", icon: icons.menu, label: "Menu" },
  { href: "/reservations", icon: icons.calendar, label: "Reservations" },
  { href: "/loyalty", icon: icons.star, label: "Rewards" },
  { href: "/profile", icon: undefined, label: "More" },
] as const;

function getProgressCells(progress: number) {
  const filledCells = Math.round(progress / 10);

  return Array.from({ length: 10 }, (_, index) => index < filledCells);
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
  const { itemCount } = useCart();
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

  return (
    <section
      className="flex min-h-dvh flex-col bg-[#050607] px-[18px] pb-3 pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pb-4 min-[1080px]:pt-3"
      id="loyalty"
    >
      <TabletLoyaltyHeader
        cartCount={itemCount}
        onOpenCart={() => setCartOpen(true)}
      />

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
          <MemberSummaryCard
            lifetimePoints={account.lifetimePoints}
            memberCode={account.memberCode}
            nextTierLabel={nextTier?.label || "Top tier"}
            points={account.points}
            progress={progress}
            tierLabel={getTierLabel(account.tier)}
          />
          <ReferralSummaryCard
            copyMessage={copyMessage}
            onCopyCode={handleCopyCode}
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
          <RedeemedRewardsPanel redeemedRewards={redeemedRewards} />
          <PointsActivityPanel transactions={transactions} />
        </section>
      </main>

      <TabletLoyaltyBottomNav />
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

function MemberSummaryCard({
  lifetimePoints,
  memberCode,
  nextTierLabel,
  points,
  progress,
  tierLabel,
}: {
  lifetimePoints: number;
  memberCode: string;
  nextTierLabel: string;
  points: number;
  progress: number;
  tierLabel: string;
}) {
  return (
    <article className="grid min-h-[190px] grid-cols-[minmax(0,1fr)_100px] gap-3 rounded-[18px] border border-[var(--sb-gold)]/28 bg-white/[0.045] p-4 min-[1080px]:min-h-[234px] min-[1080px]:grid-cols-[minmax(0,1fr)_126px] min-[1080px]:gap-5 min-[1080px]:p-5">
      <div className="min-w-0">
        <StatusBadge tone="premium">{tierLabel} member</StatusBadge>
        <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-white/46">
          Points balance
        </p>
        <p className="mt-1 font-mono text-[42px] font-semibold leading-none text-[var(--sb-gold-soft)] min-[1080px]:text-[54px]">
          {points}
        </p>
        <p className="mt-2 truncate font-mono text-[12px] text-white/52 min-[1080px]:text-[13px]">
          {memberCode}
        </p>

        <div className="mt-4">
          <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/44 min-[1080px]:text-[11px]">
            <span>{tierLabel}</span>
            <span>{nextTierLabel}</span>
          </div>
          <div className="mt-2 grid grid-cols-10 gap-1">
            {getProgressCells(progress).map((filled, index) => (
              <span
                className={classNames(
                  "h-2 rounded-full",
                  filled ? "bg-[var(--sb-gold)]" : "bg-white/10",
                )}
                key={`tablet-tier-cell-${index}`}
              />
            ))}
          </div>
          <p className="mt-2 text-[12px] leading-5 text-white/50">
            {lifetimePoints} lifetime points toward seasonal concierge perks.
          </p>
        </div>
      </div>
      <div
        aria-label={`Mock QR code for ${memberCode}`}
        className="grid h-[100px] w-[100px] shrink-0 grid-cols-7 gap-1 rounded-[14px] border border-[var(--sb-gold)]/34 bg-black/42 p-3 min-[1080px]:h-[126px] min-[1080px]:w-[126px]"
        role="img"
      >
        {getQrCells(memberCode).map((active, index) => (
          <span
            className={classNames(
              "rounded-[2px]",
              active ? "bg-[var(--sb-gold-soft)]" : "bg-white/10",
            )}
            key={`${memberCode}-tablet-${index}`}
          />
        ))}
      </div>
    </article>
  );
}

function ReferralSummaryCard({
  copyMessage,
  onCopyCode,
}: {
  copyMessage: string;
  onCopyCode: () => void;
}) {
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

function RedeemedRewardsPanel({
  redeemedRewards,
}: {
  redeemedRewards: TabletLoyaltyDashboardProps["redeemedRewards"];
}) {
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

function PointsActivityPanel({
  transactions,
}: {
  transactions: TabletLoyaltyDashboardProps["transactions"];
}) {
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

function TabletLoyaltyBottomNav() {
  return (
    <nav
      aria-label="Tablet loyalty navigation"
      className="mx-auto mt-auto w-full max-w-[1034px] rounded-[14px] border border-white/10 bg-white/[0.035] p-1"
    >
      <ul className="grid grid-cols-5">
        {tabletLoyaltyNav.map((item) => {
          const active = item.href === "/loyalty";

          return (
            <li key={item.label}>
              <Link
                className={classNames(
                  "flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-[12px] text-[12px] lg:min-h-[64px] lg:gap-1 lg:text-[13px] min-[1080px]:min-h-[86px] min-[1080px]:gap-2 min-[1080px]:text-[15px]",
                  active ? "text-[var(--sb-red-bright)]" : "text-white/62",
                )}
                href={item.href}
              >
                {item.icon ? (
                  <AssetIcon
                    className="h-[22px] w-[22px] lg:h-[25px] lg:w-[25px] min-[1080px]:h-[30px] min-[1080px]:w-[30px]"
                    src={item.icon}
                  />
                ) : (
                  <span className="grid h-[22px] w-[22px] place-items-center rounded-full border border-current text-[13px] leading-none lg:h-[25px] lg:w-[25px] lg:text-[15px] min-[1080px]:h-[30px] min-[1080px]:w-[30px] min-[1080px]:text-[18px]">
                    ...
                  </span>
                )}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
