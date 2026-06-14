"use client";

import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { rewards } from "@/data/loyalty";
import { DesktopMenuHeader } from "@/features/menu/DesktopMenuChrome";
import { classNames } from "@/lib/classNames";
import { getTierLabel } from "@/lib/loyalty";
import type {
  LoyaltyAccount,
  LoyaltyTransaction,
  Reward,
} from "@/types/loyalty";

import {
  DesktopActivityList,
  DesktopLoyaltyPanel,
  DesktopMemberPassCard,
  DesktopRewardTile,
  DesktopTierProgress,
} from "./DesktopLoyaltyPrimitives";

type RewardFilter = "all" | "merchandise" | Reward["category"];

interface DesktopLoyaltyPassRewardsProps {
  account: LoyaltyAccount;
  cartCount: number;
  memberPoints: number;
  progress: number;
  transactions: LoyaltyTransaction[];
  onBack: () => void;
  onViewReward: (reward: Reward) => void;
}

const rewardFilters: Array<{ id: RewardFilter; label: string }> = [
  { id: "all", label: "All rewards" },
  { id: "dining", label: "Complimentary items" },
  { id: "experience", label: "Experiences" },
  { id: "upgrade", label: "Upgrades" },
  { id: "merchandise", label: "Merchandise" },
];

export function DesktopLoyaltyPassRewards({
  account,
  cartCount,
  memberPoints,
  progress,
  transactions,
  onBack,
  onViewReward,
}: DesktopLoyaltyPassRewardsProps) {
  const [activeFilter, setActiveFilter] = useState<RewardFilter>("all");
  const [notice, setNotice] = useState("");
  const visibleRewards =
    activeFilter === "all"
      ? rewards
      : activeFilter === "merchandise"
        ? rewards.filter((reward) => reward.category === "upgrade")
        : rewards.filter((reward) => reward.category === activeFilter);

  return (
    <section
      className="hidden min-h-dvh bg-[#030405] text-white xl:block"
      id="loyalty"
    >
      <DesktopMenuHeader activeId="loyalty" cartCount={cartCount} />
      <main className="mx-auto max-w-[1540px] px-6 pb-4 pt-4">
        <div className="rounded-[22px] border border-[var(--sb-border)] bg-[#050607]/96 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.56)]">
          <button
            className="flex items-center gap-3 text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]"
            onClick={onBack}
            type="button"
          >
            <ChevronIcon direction="left" size={18} />
            Back to loyalty
          </button>
          {notice ? (
            <p className="mt-4 inline-flex rounded-[10px] border border-[var(--sb-gold)]/28 bg-[var(--sb-gold)]/10 px-4 py-2 text-[13px] text-[var(--sb-gold-soft)]">
              {notice}
            </p>
          ) : null}

          <div className="mt-5 grid grid-cols-[minmax(0,1fr)_430px] gap-8">
            <div>
              <section className="grid grid-cols-[450px_minmax(0,1fr)] gap-7">
                <div>
                  <h1 className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    Your member pass
                  </h1>
                  <p className="mt-2 text-[14px] text-white/64">
                    Show this pass in-restaurant to earn points on every visit.
                  </p>
                  <div className="mt-4">
                    <DesktopMemberPassCard account={account} large />
                  </div>
                </div>

                <div>
                  <h2 className="text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    Your current tier
                  </h2>
                  <DesktopLoyaltyPanel className="mt-4 p-5">
                    <div className="mb-4 flex items-center gap-4">
                      <AssetIcon
                        size={56}
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
                    <DesktopTierProgress
                      account={account}
                      compact
                      progress={progress}
                    />
                    <button
                      className="mt-4 h-10 w-full rounded-[8px] border border-[var(--sb-gold)]/44 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                      onClick={() =>
                        setNotice(
                          "Tier benefits are shown across the earn, redeem, and rewards panels.",
                        )
                      }
                      type="button"
                    >
                      View tier benefits
                    </button>
                  </DesktopLoyaltyPanel>
                </div>
              </section>

              <section className="mt-5">
                <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Available rewards
                </h2>
                <nav
                  aria-label="Reward filters"
                  className="mt-3 flex flex-wrap gap-3"
                >
                  {rewardFilters.map((filter) => {
                    const active = filter.id === activeFilter;

                    return (
                      <button
                        aria-pressed={active}
                        className={classNames(
                          "h-10 rounded-[8px] border px-6 text-[12px] uppercase tracking-[0.08em]",
                          active
                            ? "border-[var(--sb-gold)] bg-[var(--sb-gold)]/82 text-black"
                            : "border-white/14 text-white/76",
                        )}
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        type="button"
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </nav>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {visibleRewards.map((reward, index) => (
                    <DesktopRewardTile
                      eagerImage={index < 4}
                      key={reward.id}
                      memberPoints={memberPoints}
                      reward={reward}
                      onViewReward={onViewReward}
                    />
                  ))}
                </div>
                <button
                  className="mx-auto mt-4 block h-10 w-[290px] rounded-[8px] border border-[var(--sb-gold)]/44 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                  onClick={() => setActiveFilter("all")}
                  type="button"
                >
                  View all rewards
                </button>
              </section>

              <DesktopLoyaltyPanel className="mt-4 grid grid-cols-[1fr_148px] items-center gap-5 p-4">
                <div className="flex items-center gap-5">
                  <AssetIcon
                    size={48}
                    src="/assets/icons/floral-emblem-icon.png"
                  />
                  <div>
                    <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                      Get more with Bliss
                    </h2>
                    <p className="mt-2 text-[13px] text-white/62">
                      Move up to the next tier and unlock even more exclusive
                      rewards and experiences.
                    </p>
                  </div>
                </div>
                <button
                  className="red-glow-button h-11 rounded-[8px] text-[12px]"
                  onClick={() => {
                    setActiveFilter("experience");
                    setNotice("Experience rewards are now filtered below.");
                  }}
                  type="button"
                >
                  Explore tiers
                </button>
              </DesktopLoyaltyPanel>
            </div>

            <aside className="grid content-start gap-3">
              <DesktopLoyaltyPanel className="p-5">
                <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Earn. Redeem. Indulge.
                </h2>
                <div className="mt-4 grid gap-4">
                  {[
                    [
                      "Earn points",
                      "Earn 10 points for every $1 spent.",
                      "gold-alert-icon.png",
                    ],
                    [
                      "Redeem rewards",
                      "Use your points for exclusive rewards.",
                      "floral-emblem-icon.png",
                    ],
                    [
                      "Exclusive access",
                      "Enjoy member-only events and offers.",
                      "golden-ticket-icon.png",
                    ],
                  ].map(([title, copy, icon]) => (
                    <article className="flex items-start gap-4" key={title}>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/42">
                        <AssetIcon size={21} src={`/assets/icons/${icon}`} />
                      </span>
                      <div>
                        <p className="text-[13px] uppercase tracking-[0.06em] text-white">
                          {title}
                        </p>
                        <p className="mt-1 text-[12px] leading-5 text-white/58">
                          {copy}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </DesktopLoyaltyPanel>

              <DesktopLoyaltyPanel className="p-5">
                <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  How to redeem
                </h2>
                <div className="mt-4 grid gap-3">
                  {[
                    "Browse available rewards and choose your favorite.",
                    "Tap Redeem Reward and confirm your selection.",
                    "Present your member pass in-restaurant to enjoy your reward.",
                  ].map((step, index) => (
                    <article
                      className="grid grid-cols-[42px_1fr] items-start gap-4"
                      key={step}
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-gold)]/44 font-mono text-[14px] text-[var(--sb-gold-soft)]">
                        {index + 1}
                      </span>
                      <p className="text-[13px] leading-5 text-white/66">
                        {step}
                      </p>
                    </article>
                  ))}
                </div>
              </DesktopLoyaltyPanel>

              <DesktopLoyaltyPanel className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    Recent activity
                  </h2>
                  <button
                    className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)]"
                    onClick={() =>
                      setNotice("All recent loyalty activity is visible here.")
                    }
                    type="button"
                  >
                    View all
                  </button>
                </div>
                <div className="mt-3">
                  <DesktopActivityList transactions={transactions} />
                </div>
                <button
                  className="mt-3 flex w-full items-center justify-end gap-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)]"
                  onClick={() =>
                    setNotice("All recent loyalty activity is visible here.")
                  }
                  type="button"
                >
                  View all activity
                  <ChevronIcon direction="right" size={18} />
                </button>
              </DesktopLoyaltyPanel>
            </aside>
          </div>
        </div>
      </main>
    </section>
  );
}
