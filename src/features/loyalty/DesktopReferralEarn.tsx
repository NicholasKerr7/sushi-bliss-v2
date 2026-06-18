"use client";

import Image from "next/image";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { referralProgress, rewards } from "@/data/loyalty";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import type { LoyaltyAccount, LoyaltyTransaction } from "@/types/loyalty";

import { DesktopLoyaltyPanel } from "./DesktopLoyaltyPrimitives";

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
  ["Messages", "sms"],
  ["More", "share"],
] as const;

export function DesktopReferralEarn({
  cartCount,
  onBack,
  onViewRewards,
  transactions,
}: DesktopReferralEarnProps) {
  const [shareMessage, setShareMessage] = useState("");
  const referralLink = `https://sushibliss.example/r/${referralProgress.code}`;
  const recentPoints = transactions
    .filter((transaction) => transaction.type === "earn")
    .reduce((total, transaction) => total + transaction.points, 0);

  const copyReferral = async () => {
    if (!navigator.clipboard) {
      setShareMessage(referralLink);
      return;
    }

    try {
      await navigator.clipboard.writeText(referralLink);
      setShareMessage("Referral link copied.");
    } catch {
      setShareMessage(referralLink);
    }
  };

  const shareReferral = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          text: "Join me at Sushi Bliss.",
          title: "Sushi Bliss invitation",
          url: referralLink,
        });
        setShareMessage("Share sheet opened.");
        return;
      }

      await copyReferral();
    } catch {
      await copyReferral();
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
          <section className="relative min-h-[210px] overflow-hidden border-b border-white/10 px-16 py-6">
            <Image
              alt=""
              className="object-cover object-[72%_42%] opacity-62"
              fill
              loading="eager"
              priority
              sizes="1568px"
              src="/assets/menu/sushi/deluxe-toro-caviar-nigiri.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.98)_0%,rgba(3,4,5,0.78)_42%,rgba(3,4,5,0.18)_78%,rgba(3,4,5,0.82)_100%)]" />
            <div className="relative z-10 flex min-h-[198px] max-w-[610px] flex-col justify-center">
              <button
                className="mb-4 w-fit text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]"
                onClick={onBack}
                type="button"
              >
                Back to loyalty
              </button>
              <p className="text-[16px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                Share Sushi Bliss
              </p>
              <h1 className="editorial-title mt-2 text-[62px] uppercase leading-[0.92] tracking-[0.12em] text-white">
                Refer{" "}
                <span className="text-[var(--sb-red-bright)]">& Earn</span>
              </h1>
              <p className="mt-2 max-w-[420px] text-[17px] leading-7 text-[var(--sb-gold-soft)]">
                Share the joy of unforgettable dining. You&apos;ll earn rewards
                when your friends dine with us.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-[0.36fr_0.34fr_0.3fr] gap-4 px-6 py-4">
            <div className="grid gap-3">
              <DesktopLoyaltyPanel className="p-4">
                <h2 className="flex items-center gap-3 text-[15px] uppercase tracking-[0.08em] text-white">
                  <AssetIcon size={24} src="/assets/icons/gift-icon.png" />
                  Your referral code
                </h2>
                <div className="mt-4 rounded-[12px] border border-dashed border-[var(--sb-gold)]/34 bg-black/34 p-4">
                  <div className="grid grid-cols-[1fr_92px] items-center gap-4">
                    <p className="text-center font-mono text-[24px] uppercase tracking-[0.12em] text-white">
                      {referralProgress.code}
                    </p>
                    <button
                      className="h-10 rounded-[8px] border border-[var(--sb-gold)]/38 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                      onClick={copyReferral}
                      type="button"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="my-4 grid grid-cols-[1fr_40px_1fr] items-center gap-3 text-center text-[13px] text-white/48">
                  <span className="h-px bg-white/10" />
                  or
                  <span className="h-px bg-white/10" />
                </div>
                <div className="grid grid-cols-[1fr_112px] gap-3 rounded-[10px] border border-white/10 bg-black/24 p-3">
                  <p className="truncate text-[14px] text-white/76">
                    {referralLink}
                  </p>
                  <button
                    className="h-10 rounded-[8px] border border-[var(--sb-gold)]/38 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                    onClick={copyReferral}
                    type="button"
                  >
                    Copy link
                  </button>
                </div>
                {shareMessage ? (
                  <p
                    aria-live="polite"
                    className="mt-3 rounded-[10px] border border-[var(--sb-wasabi)]/24 bg-[var(--sb-wasabi)]/8 px-3 py-2 text-[12px] text-[var(--sb-wasabi)]"
                  >
                    {shareMessage}
                  </p>
                ) : null}
              </DesktopLoyaltyPanel>

              <DesktopLoyaltyPanel className="p-4">
                <h2 className="flex items-center gap-3 text-[15px] uppercase tracking-[0.08em] text-white">
                  <AssetIcon
                    size={22}
                    src="/assets/icons/golden-ticket-icon.png"
                  />
                  Share your invite
                </h2>
                <p className="mt-2 text-[13px] text-white/58">
                  Invite your friends via your favorite platforms.
                </p>
                <div className="mt-4 grid grid-cols-5 gap-3">
                  {shareOptions.map(([option, action]) => {
                    if (action === "email") {
                      return (
                        <a
                          className="grid h-[66px] place-items-center rounded-[10px] border border-white/12 bg-white/[0.035] text-center text-[11px] uppercase tracking-[0.04em] text-white/66"
                          href={`mailto:?subject=Sushi Bliss invitation&body=${encodeURIComponent(referralLink)}`}
                          key={option}
                        >
                          {option}
                        </a>
                      );
                    }

                    if (action === "sms") {
                      return (
                        <a
                          className="grid h-[66px] place-items-center rounded-[10px] border border-white/12 bg-white/[0.035] text-center text-[11px] uppercase tracking-[0.04em] text-white/66"
                          href={`sms:?body=${encodeURIComponent(referralLink)}`}
                          key={option}
                        >
                          {option}
                        </a>
                      );
                    }

                    return (
                      <button
                        className="h-[66px] rounded-[10px] border border-white/12 bg-white/[0.035] text-[11px] uppercase tracking-[0.04em] text-white/66 transition hover:border-[var(--sb-gold)]/38 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                        key={option}
                        onClick={
                          action === "copy" ? copyReferral : shareReferral
                        }
                        type="button"
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 grid min-h-[112px] grid-cols-[1fr_210px] overflow-hidden rounded-[12px] border border-white/10 bg-black/24">
                  <p className="p-4 text-[18px] uppercase leading-7 text-white">
                    An unforgettable experience awaits them and{" "}
                    <span className="text-[var(--sb-red-bright)]">rewards</span>{" "}
                    for you.
                  </p>
                  <span className="relative">
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      sizes="210px"
                      src="/assets/gallery/intimate-upscale-dining-room-setting.webp"
                    />
                  </span>
                </div>
              </DesktopLoyaltyPanel>
            </div>

            <div className="grid gap-3">
              <DesktopLoyaltyPanel className="p-4">
                <h2 className="flex items-center gap-3 text-[15px] uppercase tracking-[0.08em] text-white">
                  <AssetIcon size={24} src="/assets/icons/gift-icon.png" />
                  How it works
                </h2>
                <div className="mt-4 grid gap-4">
                  {[
                    [
                      "Share your invite link",
                      "Invite your friends to Sushi Bliss.",
                    ],
                    [
                      "They dine with us",
                      "Your friend completes their first reservation and dining experience.",
                    ],
                    [
                      "You earn rewards",
                      `You'll get ${referralProgress.rewardPoints} points for each successful referral.`,
                    ],
                  ].map(([title, copy], index) => (
                    <article
                      className="grid grid-cols-[44px_1fr] gap-4"
                      key={title}
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-red-bright)] bg-black/40 font-mono text-[13px] text-[var(--sb-gold-soft)]">
                        {index + 1}
                      </span>
                      <p>
                        <span className="block text-[16px] text-[var(--sb-gold-soft)]">
                          {title}
                        </span>
                        <span className="mt-1 block text-[13px] leading-5 text-white/58">
                          {copy}
                        </span>
                      </p>
                    </article>
                  ))}
                </div>
              </DesktopLoyaltyPanel>

              <DesktopLoyaltyPanel className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-[15px] uppercase tracking-[0.08em] text-white">
                    Your referral activity
                  </h2>
                  <p className="font-mono text-[13px] text-white/54">
                    +{recentPoints.toLocaleString()} pts recent
                  </p>
                </div>
                <div className="mt-3 overflow-hidden rounded-[12px] border border-white/10">
                  <div className="grid grid-cols-[1fr_136px_110px_86px] bg-white/[0.04] px-4 py-3 text-[11px] uppercase tracking-[0.12em] text-white/46">
                    <span>Friend</span>
                    <span>Status</span>
                    <span>Reward</span>
                    <span>Date</span>
                  </div>
                  {referralActivity.map(([name, status, reward, date]) => (
                    <div
                      className="grid grid-cols-[1fr_136px_110px_86px] border-t border-white/10 px-4 py-3 text-[13px] text-white/72"
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

            <div className="grid gap-3">
              <DesktopLoyaltyPanel className="p-4">
                <h2 className="text-[15px] uppercase tracking-[0.08em] text-white">
                  Your rewards preview
                </h2>
                <div className="mt-3 grid gap-2.5">
                  {rewards.slice(0, 3).map((reward) => (
                    <article
                      className="grid grid-cols-[1fr_118px] items-center gap-3 rounded-[10px] border border-white/10 bg-black/28 p-3"
                      key={reward.id}
                    >
                      <div>
                        <p className="font-mono text-[20px] text-[var(--sb-gold-soft)]">
                          {reward.pointsCost.toLocaleString()} pts
                        </p>
                        <p className="mt-1 text-[13px] text-white/76">
                          {reward.title}
                        </p>
                      </div>
                      <div className="relative h-[70px] overflow-hidden rounded-[10px]">
                        <Image
                          alt=""
                          className="object-cover"
                          fill
                          sizes="118px"
                          src={reward.imageUrl}
                        />
                      </div>
                    </article>
                  ))}
                </div>
                <button
                  className="mt-3 h-10 w-full rounded-[8px] border border-[var(--sb-gold)]/38 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                  onClick={onViewRewards}
                  type="button"
                >
                  View all rewards
                </button>
              </DesktopLoyaltyPanel>

              <DesktopLoyaltyPanel className="grid grid-cols-3 gap-3 p-4 text-center">
                <ReferralMetric label="Total referrals" value="12" />
                <ReferralMetric label="Successful referrals" value="8" />
                <ReferralMetric label="Points earned" value="4,000 pts" />
              </DesktopLoyaltyPanel>
              <Button className="h-[54px] w-full" onClick={onViewRewards}>
                Redeem points
              </Button>
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

function ReferralMetric({ label, value }: { label: string; value: string }) {
  return (
    <p className="border-l border-white/10 first:border-l-0">
      <span className="block font-mono text-[22px] text-white">{value}</span>
      <span className="mt-1 block text-[11px] uppercase tracking-[0.08em] text-white/52">
        {label}
      </span>
    </p>
  );
}
