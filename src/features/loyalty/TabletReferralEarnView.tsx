"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { referralProgress } from "@/data/loyalty";
import { classNames } from "@/lib/classNames";

import { TabletReferralEarnBottomNav } from "./TabletReferralEarnBottomNav";
import { TabletReferralEarnHeader } from "./TabletReferralEarnHeader";
import {
  TabletReferralShareButton,
  type TabletReferralShareAction,
  type TabletReferralShareIcon,
} from "./TabletReferralShareButton";

interface TabletReferralEarnViewProps {
  cartCount: number;
  copyMessage: string;
  onBack: () => void;
  onCopyCode: () => void;
  onCopyLink: (link: string) => void;
  onOpenCart: () => void;
  unreadCount: number;
}

const referralSteps = [
  [
    "Invite friends",
    "Share your unique code or link with friends and family.",
    "/assets/icons/user-icon.png",
  ],
  [
    "They join & dine",
    "Your friends sign up and place their first order.",
    "/assets/icons/dining-setting-icon.png",
  ],
  [
    "You earn rewards",
    "You'll earn credit rewards and so will your friends.",
    "/assets/icons/gift-icon.png",
  ],
] as const;

const loveCards = [
  [
    "Invite friends",
    "It's easy to invite with your unique code or link.",
    "/assets/icons/share-icon.png",
  ],
  [
    "Track referrals",
    "Keep track of your referrals and reward progress.",
    "/assets/icons/golden-ticket-icon.png",
  ],
  [
    "Claim rewards",
    "Unlock and redeem exclusive credits and offers.",
    "/assets/icons/gift-icon.png",
  ],
] as const;

const shareActions = [
  ["Messages", "sms", "bg-[#23b33a]", "chat"],
  ["Email", "email", "bg-[#176bb5]", "email"],
  ["WhatsApp", "whatsapp", "bg-[#25c73f]", "chat"],
  ["Facebook", "facebook", "bg-[#3264b7]", "facebook"],
  ["More", "more", "bg-black/34", "more"],
] as const satisfies ReadonlyArray<
  readonly [string, TabletReferralShareAction, string, TabletReferralShareIcon]
>;

const progressSlots = 7;
const progressIndexes = Array.from(
  { length: progressSlots },
  (_, index) => index,
);

export function TabletReferralEarnView({
  cartCount,
  copyMessage,
  onBack,
  onCopyCode,
  onCopyLink,
  onOpenCart,
  unreadCount,
}: TabletReferralEarnViewProps) {
  const referralLink = `https://sushibliss.com/ref/${referralProgress.code}`;
  const remainingInvites =
    referralProgress.invitedGuests - referralProgress.completedInvites;

  return (
    <>
      <TabletReferralEarnHeader
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        unreadCount={unreadCount}
      />

      <main className="mx-auto w-full max-w-[1012px] pb-[96px]">
        <section className="relative h-[226px] overflow-hidden">
          <Image
            alt=""
            className="translate-x-[18%] scale-[1.1] object-cover object-center opacity-86"
            fill
            loading="eager"
            priority
            sizes="1012px"
            src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,1)_0%,rgba(5,6,7,0.91)_40%,rgba(5,6,7,0.18)_78%,rgba(5,6,7,0.58)),linear-gradient(180deg,rgba(5,6,7,0.06),rgba(5,6,7,0.96))]" />
          <div className="relative z-10 flex h-full flex-col justify-center">
            <button
              className="mb-5 w-fit text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
              onClick={onBack}
              type="button"
            >
              Back to rewards
            </button>
            <h1 className="editorial-title text-[58px] uppercase leading-[0.94] tracking-[0.12em] text-white">
              Referral &{" "}
              <span className="text-[var(--sb-red-bright)]">Earn</span>
            </h1>
            <p className="mt-4 text-[24px] leading-none text-[var(--sb-gold-soft)]">
              Share the bliss. Earn rewards.
            </p>
            <p className="mt-5 max-w-[430px] text-[18px] leading-7 text-white/66">
              Invite your friends to Sushi Bliss and you&apos;ll both enjoy
              exclusive rewards.
            </p>
          </div>
        </section>

        <section className="relative grid grid-cols-2 overflow-hidden rounded-[16px] border border-white/12 bg-[linear-gradient(145deg,rgba(14,22,23,0.96),rgba(7,8,9,0.98))] shadow-[0_22px_70px_rgba(0,0,0,0.32)]">
          <span className="absolute left-1/2 top-1/2 z-10 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-[#090b0c] text-[10px] uppercase text-[var(--sb-gold-soft)]">
            or
          </span>
          <article className="border-r border-white/10 p-8">
            <h2 className="text-[18px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
              Your referral code
            </h2>
            <div className="mt-5 grid h-[76px] place-items-center rounded-[10px] border border-dashed border-white/20 bg-black/22">
              <p className="font-mono text-[42px] font-semibold tracking-[0.08em] text-[var(--sb-red-bright)]">
                {referralProgress.code}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button
                className="red-glow-button h-[48px] rounded-[9px] text-[13px] uppercase tracking-[0.08em]"
                onClick={onCopyCode}
                type="button"
              >
                <span className="relative z-10">
                  {copyMessage === "Code copied" ? copyMessage : "Share code"}
                </span>
              </button>
              <button
                className="grid h-[48px] place-items-center rounded-[9px] border border-[var(--sb-gold)]/34 bg-black/18 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                onClick={onCopyCode}
                type="button"
              >
                Copy code
              </button>
            </div>
          </article>

          <article className="p-8">
            <h2 className="text-[18px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
              Your referral link
            </h2>
            <div className="mt-5 grid grid-cols-[1fr_58px] overflow-hidden rounded-[10px] border border-white/12 bg-black/22">
              <p className="truncate px-4 py-4 text-[15px] text-white/62">
                {referralLink}
              </p>
              <button
                aria-label="Copy referral link"
                className="grid place-items-center border-l border-white/10 text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                onClick={() => onCopyLink(referralLink)}
                type="button"
              >
                <AssetIcon size={23} src="/assets/icons/share-icon.png" />
              </button>
            </div>
            <button
              className="red-glow-button mt-4 h-[48px] w-full rounded-[9px] text-[13px] uppercase tracking-[0.08em]"
              onClick={() => onCopyLink(referralLink)}
              type="button"
            >
              <span className="relative z-10">
                {copyMessage === "Link copied" ? copyMessage : "Copy link"}
              </span>
            </button>
            <p className="mt-4 text-center text-[13px] text-white/48">
              Share your link anywhere
            </p>
            <div className="mt-3 flex items-center justify-center gap-6">
              {shareActions.map(([label, action, colorClass, icon]) => (
                <TabletReferralShareButton
                  action={action}
                  colorClass={colorClass}
                  icon={icon}
                  key={label}
                  label={label}
                  referralLink={referralLink}
                />
              ))}
            </div>
          </article>
        </section>

        <section className="mt-3 grid grid-cols-[190px_minmax(0,1fr)_210px] items-center gap-7 rounded-[12px] border border-white/12 bg-[linear-gradient(145deg,rgba(14,22,23,0.94),rgba(7,8,9,0.98))] px-8 py-5">
          <div className="border-r border-white/10 text-center">
            <p className="text-[12px] uppercase tracking-[0.12em] text-white/50">
              Friends referred
            </p>
            <p className="mt-2 font-mono text-[36px] leading-none text-[var(--sb-red-bright)]">
              {referralProgress.completedInvites}
            </p>
            <p className="mt-2 text-[14px] text-white/50">
              of {referralProgress.invitedGuests}
            </p>
          </div>

          <div>
            <div className="relative mx-auto grid max-w-[520px] grid-cols-7 items-center">
              <span className="absolute left-8 right-8 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/14" />
              <span
                aria-hidden="true"
                className="absolute left-8 top-1/2 h-[3px] w-[31%] -translate-y-1/2 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_16px_rgba(239,47,37,0.62)]"
              />
              {progressIndexes.map((index) => {
                const complete = index < referralProgress.completedInvites;

                return (
                  <span
                    className={classNames(
                      "relative z-10 mx-auto grid h-9 w-9 place-items-center rounded-full border",
                      complete
                        ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)] text-[var(--sb-gold-soft)] shadow-[0_0_18px_rgba(239,47,37,0.42)]"
                        : "border-white/10 bg-white/10 text-white/36",
                    )}
                    key={index}
                  >
                    <AssetIcon
                      size={20}
                      src={
                        complete
                          ? "/assets/icons/check-icon.png"
                          : "/assets/icons/gift-icon.png"
                      }
                    />
                  </span>
                );
              })}
            </div>
            <div className="mx-auto mt-4 h-px w-[420px] bg-[linear-gradient(90deg,transparent,var(--sb-red-bright),transparent)]" />
            <p className="mt-4 text-center text-[15px] text-[var(--sb-gold-soft)]">
              Next Reward: $20 OFF
            </p>
            <p className="mt-2 text-center text-[13px] text-white/50">
              {remainingInvites} more referrals to unlock $20 OFF
            </p>
          </div>

          <div className="text-center">
            <p className="text-[12px] uppercase tracking-[0.12em] text-white/50">
              Available reward
            </p>
            <p className="mt-3 font-mono text-[42px] leading-none text-[var(--sb-red-bright)]">
              $10
            </p>
            <p className="mt-1 text-[13px] uppercase tracking-[0.08em] text-white/50">
              in credit
            </p>
            <Button
              className="mt-4 h-[42px] w-[184px] whitespace-nowrap rounded-[9px] text-[11px]"
              onClick={onBack}
            >
              View rewards
            </Button>
          </div>
        </section>

        <section className="mt-3 rounded-[12px] border border-white/12 bg-[linear-gradient(145deg,rgba(14,22,23,0.94),rgba(7,8,9,0.98))] px-8 py-4">
          <h2 className="text-[18px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            How it works
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-5">
            {referralSteps.map(([title, copy, icon], index) => (
              <article
                className="grid grid-cols-[68px_minmax(0,1fr)] gap-4 border-l border-white/10 pl-5 first:border-l-0 first:pl-0"
                key={title}
              >
                <span className="grid h-[64px] w-[64px] place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/20">
                  <AssetIcon size={34} src={icon} />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
                    {index + 1}. {title}
                  </span>
                  <span className="mt-2 block text-[13px] leading-5 text-white/54">
                    {copy}
                  </span>
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-3 rounded-[12px] border border-white/12 bg-[linear-gradient(145deg,rgba(14,22,23,0.94),rgba(7,8,9,0.98))] px-8 py-4">
          <h2 className="text-[18px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            Why you&apos;ll love it
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-7">
            {loveCards.map(([title, copy, icon]) => (
              <Link
                className="grid min-h-[102px] grid-cols-[68px_minmax(0,1fr)_18px] items-center gap-4 rounded-[8px] border border-[var(--sb-gold)]/34 bg-black/18 px-4 transition hover:border-[var(--sb-gold)]/60 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                href="/loyalty"
                key={title}
              >
                <span className="grid h-[54px] w-[54px] place-items-center rounded-[12px] border border-[var(--sb-gold)]/42">
                  <AssetIcon size={31} src={icon} />
                </span>
                <span>
                  <span className="editorial-title block text-[15px] uppercase leading-5 text-white">
                    {title}
                  </span>
                  <span className="mt-2 block text-[12px] leading-5 text-white/54">
                    {copy}
                  </span>
                </span>
                <ChevronIcon
                  className="text-[var(--sb-gold)]"
                  direction="right"
                  size={19}
                />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-2 flex min-h-[54px] items-center justify-between rounded-[9px] border border-white/12 bg-[linear-gradient(145deg,rgba(14,22,23,0.94),rgba(7,8,9,0.98))] px-8">
          <p className="flex items-center gap-5 text-[14px] text-white/58">
            <AssetIcon size={23} src="/assets/icons/star-icon.png" />
            Both you and your friend will receive $10 OFF their first order over
            $50.
          </p>
          <Link
            className="text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/support"
          >
            Terms & conditions
          </Link>
        </section>
      </main>

      <TabletReferralEarnBottomNav />
    </>
  );
}
