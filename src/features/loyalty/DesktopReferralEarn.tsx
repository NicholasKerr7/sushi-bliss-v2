"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { referralProgress, rewards } from "@/data/loyalty";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { LoyaltyAccount, LoyaltyTransaction } from "@/types/loyalty";

import {
  DesktopLoyaltyPanel,
  DesktopMemberPassCard,
  DesktopTierProgress,
} from "./DesktopLoyaltyPrimitives";

interface DesktopReferralEarnProps {
  account: LoyaltyAccount;
  cartCount: number;
  onBack: () => void;
  onViewRewards: () => void;
  progress: number;
  transactions: LoyaltyTransaction[];
}

const referralActivity = [
  ["Emily K.", "Joined", "250 pts", "Jun 9"],
  ["Daniel R.", "First order", "250 pts", "Jun 7"],
  ["Mika S.", "Invite sent", "Pending", "Jun 5"],
] as const;

const shareOptions = [
  ["Copy link", "copy"],
  ["Email", "email"],
  ["Messages", "disabled"],
  ["QR code", "disabled"],
] as const;

export function DesktopReferralEarn({
  account,
  cartCount,
  onBack,
  onViewRewards,
  progress,
  transactions,
}: DesktopReferralEarnProps) {
  const referralLink = `https://sushibliss.example/r/${referralProgress.code}`;
  const recentPoints = transactions
    .filter((transaction) => transaction.type === "earn")
    .reduce((total, transaction) => total + transaction.points, 0);

  const copyReferral = async () => {
    if (!navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(referralLink);
    } catch {
      return;
    }
  };

  return (
    <section
      className="hidden min-h-dvh bg-[#030405] text-white xl:block"
      id="loyalty"
    >
      <DesktopMenuHeader activeId="loyalty" cartCount={cartCount} />
      <main className="mx-auto max-w-[1568px] px-5 pb-3 pt-0">
        <div className="overflow-hidden rounded-b-[20px] border-x border-b border-[var(--sb-border)] bg-[#050607] shadow-[0_30px_90px_rgba(0,0,0,0.56)]">
          <section className="relative grid min-h-[272px] grid-cols-[minmax(0,1fr)_396px] gap-8 border-b border-white/10 px-16 py-8">
            <Image
              alt=""
              className="object-cover object-[64%_46%] opacity-54"
              fill
              loading="eager"
              priority
              sizes="1568px"
              src="/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.98)_0%,rgba(3,4,5,0.88)_44%,rgba(3,4,5,0.48)_100%)]" />
            <div className="relative z-10 flex flex-col justify-center">
              <button
                className="mb-6 w-fit text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]"
                onClick={onBack}
                type="button"
              >
                Back to loyalty
              </button>
              <p className="text-[16px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                Member referrals
              </p>
              <h1 className="editorial-title mt-3 text-[64px] uppercase leading-[0.9] text-white">
                Refer
                <span className="block text-[var(--sb-red-bright)]">
                  & Earn
                </span>
              </h1>
              <p className="mt-5 max-w-[548px] text-[17px] leading-7 text-white/72">
                Share Sushi Bliss with friends. They receive a first tasting
                credit, and you earn {referralProgress.rewardPoints} points
                after their first completed order.
              </p>
            </div>
            <DesktopLoyaltyPanel className="relative z-10 self-center p-6">
              <DesktopTierProgress
                account={account}
                compact
                progress={progress}
              />
              <Button className="mt-5 w-full" onClick={onViewRewards} size="sm">
                Redeem points
              </Button>
            </DesktopLoyaltyPanel>
          </section>

          <div className="grid grid-cols-[360px_minmax(0,1fr)_376px] gap-4 px-9 py-5">
            <div className="grid gap-4">
              <DesktopMemberPassCard account={account} large />
              <DesktopLoyaltyPanel className="p-5">
                <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Referral rewards
                </h2>
                <div className="mt-4 grid gap-3">
                  {referralProgress.milestones.map((milestone) => (
                    <div
                      className="grid grid-cols-[40px_1fr] items-center gap-3 rounded-[10px] border border-white/10 bg-black/26 p-3"
                      key={milestone.label}
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/34 font-mono text-[13px] text-[var(--sb-gold-soft)]">
                        {milestone.count}
                      </span>
                      <div>
                        <p className="text-[13px] text-white/82">
                          {milestone.label}
                        </p>
                        <p className="mt-1 text-[12px] uppercase tracking-[0.08em] text-white/44">
                          {milestone.completed ? "Completed" : "In progress"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </DesktopLoyaltyPanel>
            </div>

            <div className="grid gap-4">
              <DesktopLoyaltyPanel className="p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-[18px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
                      Your referral code
                    </h2>
                    <p className="mt-2 max-w-[460px] text-[14px] leading-6 text-white/58">
                      Send your personal code to friends planning a special
                      dinner, birthday, or omakase night.
                    </p>
                  </div>
                  <AssetIcon
                    size={54}
                    src="/assets/icons/golden-ticket-icon.png"
                  />
                </div>
                <div className="mt-6 rounded-[16px] border border-[var(--sb-gold)]/34 bg-black/42 p-5">
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.12em] text-white/48">
                        Code
                      </p>
                      <p className="mt-2 font-mono text-[42px] leading-none tracking-[0.08em] text-white">
                        {referralProgress.code}
                      </p>
                    </div>
                    <Button onClick={copyReferral} size="sm">
                      Copy link
                    </Button>
                  </div>
                  <p className="mt-4 truncate rounded-[10px] border border-white/10 bg-white/[0.035] px-4 py-3 font-mono text-[13px] text-white/64">
                    {referralLink}
                  </p>
                </div>
                <div className="mt-5 grid grid-cols-4 gap-3">
                  {shareOptions.map(([option, action]) =>
                    action === "email" ? (
                      <a
                        className="grid h-11 place-items-center rounded-[10px] border border-white/12 bg-white/[0.035] text-[12px] uppercase tracking-[0.08em] text-white/66 transition hover:border-[var(--sb-gold)]/42 hover:text-[var(--sb-gold-soft)]"
                        href={`mailto:?subject=Sushi Bliss invitation&body=${encodeURIComponent(referralLink)}`}
                        key={option}
                      >
                        {option}
                      </a>
                    ) : (
                      <button
                        className="h-11 rounded-[10px] border border-white/12 bg-white/[0.035] text-[12px] uppercase tracking-[0.08em] text-white/66 transition hover:border-[var(--sb-gold)]/42 hover:text-[var(--sb-gold-soft)] disabled:cursor-not-allowed disabled:opacity-45"
                        disabled={action === "disabled"}
                        key={option}
                        onClick={action === "copy" ? copyReferral : undefined}
                        title={
                          action === "disabled"
                            ? `${option} sharing coming soon`
                            : undefined
                        }
                        type="button"
                      >
                        {option}
                      </button>
                    ),
                  )}
                </div>
              </DesktopLoyaltyPanel>

              <DesktopLoyaltyPanel className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                    Your referral activity
                  </h2>
                  <p className="font-mono text-[13px] text-white/54">
                    +{recentPoints.toLocaleString()} pts recent
                  </p>
                </div>
                <div className="mt-4 overflow-hidden rounded-[12px] border border-white/10">
                  <div className="grid grid-cols-[1fr_136px_110px_86px] bg-white/[0.04] px-4 py-3 text-[11px] uppercase tracking-[0.12em] text-white/46">
                    <span>Friend</span>
                    <span>Status</span>
                    <span>Reward</span>
                    <span>Date</span>
                  </div>
                  {referralActivity.map(([name, status, reward, date]) => (
                    <div
                      className="grid grid-cols-[1fr_136px_110px_86px] border-t border-white/10 px-4 py-4 text-[13px] text-white/72"
                      key={name}
                    >
                      <span>{name}</span>
                      <span>{status}</span>
                      <span className="text-[var(--sb-gold-soft)]">
                        {reward}
                      </span>
                      <span className="text-white/48">{date}</span>
                    </div>
                  ))}
                </div>
              </DesktopLoyaltyPanel>
            </div>

            <div className="grid gap-4">
              <DesktopLoyaltyPanel className="p-5">
                <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Rewards preview
                </h2>
                <div className="mt-4 grid gap-3">
                  {rewards.slice(0, 3).map((reward) => (
                    <article
                      className="grid grid-cols-[74px_1fr] gap-3 rounded-[12px] border border-white/10 bg-black/28 p-3"
                      key={reward.id}
                    >
                      <div className="relative h-[74px] overflow-hidden rounded-[10px]">
                        <Image
                          alt=""
                          className="object-cover"
                          fill
                          sizes="74px"
                          src={reward.imageUrl}
                        />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-white/86">
                          {reward.title}
                        </p>
                        <p className="mt-1 font-mono text-[12px] text-[var(--sb-gold-soft)]">
                          {reward.pointsCost.toLocaleString()} pts
                        </p>
                        <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-white/48">
                          {reward.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </DesktopLoyaltyPanel>

              <DesktopLoyaltyPanel className="p-5">
                <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  How it works
                </h2>
                <div className="mt-4 grid gap-4">
                  {[
                    "Share your personal referral code.",
                    "Your friend receives a first-order tasting credit.",
                    `You earn ${referralProgress.rewardPoints} points after checkout.`,
                  ].map((step, index) => (
                    <div
                      className="grid grid-cols-[34px_1fr] items-center gap-3"
                      key={step}
                    >
                      <span className="grid h-[34px] w-[34px] place-items-center rounded-full border border-[var(--sb-gold)]/34 font-mono text-[12px] text-[var(--sb-gold-soft)]">
                        {index + 1}
                      </span>
                      <p className="text-[13px] leading-5 text-white/66">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </DesktopLoyaltyPanel>

              <DesktopLoyaltyPanel className="p-5">
                <p className="text-[12px] uppercase tracking-[0.1em] text-white/42">
                  Estimated value
                </p>
                <p className="mt-2 font-mono text-[38px] leading-none text-white">
                  {formatMoney(referralProgress.rewardPoints * 10)}
                </p>
                <p className="mt-3 text-[13px] leading-5 text-white/54">
                  Referral value is awarded only after the first eligible order.
                  Last updated {formatDateTime(new Date().toISOString())}.
                </p>
              </DesktopLoyaltyPanel>
            </div>
          </div>

          <div className="px-9 pb-4">
            <DesktopBenefitStrip />
          </div>
        </div>
      </main>
    </section>
  );
}
