"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { referralProgress } from "@/data/loyalty";

interface TabletReferralEarnViewProps {
  copyMessage: string;
  onBack: () => void;
  onCopyCode: () => void;
  onCopyLink: (link: string) => void;
}

const referralSteps = [
  ["Invite friends", "Share your unique code or link with friends and family."],
  ["They join & dine", "Your friends sign up and place their first order."],
  [
    "You earn rewards",
    "You will earn credit rewards and so will your friends.",
  ],
] as const;

export function TabletReferralEarnView({
  copyMessage,
  onBack,
  onCopyCode,
  onCopyLink,
}: TabletReferralEarnViewProps) {
  const referralLink = `https://sushibliss.com/ref/${referralProgress.code}`;

  return (
    <>
      <section className="relative mt-3 overflow-hidden rounded-[18px] border border-white/10 bg-black/42 min-[1080px]:mt-5">
        <Image
          alt=""
          className="object-cover object-right opacity-72"
          fill
          priority
          sizes="1034px"
          src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98),rgba(5,6,7,0.74)_48%,rgba(5,6,7,0.12))]" />
        <div className="relative z-10 min-h-[254px] px-7 py-7 min-[1080px]:min-h-[322px] min-[1080px]:px-9 min-[1080px]:py-9">
          <button
            className="mb-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]"
            onClick={onBack}
            type="button"
          >
            Back to rewards
          </button>
          <h1 className="editorial-title text-[58px] leading-[0.95] text-white min-[1080px]:text-[76px]">
            Referral & <span className="text-[var(--sb-red-bright)]">Earn</span>
          </h1>
          <p className="mt-4 text-[22px] text-[var(--sb-gold-soft)]">
            Share the bliss. Earn rewards.
          </p>
          <p className="mt-4 max-w-[430px] text-[17px] leading-7 text-white/64">
            Invite your friends to Sushi Bliss and you will both enjoy exclusive
            rewards.
          </p>
        </div>
      </section>

      <section className="mt-3 grid grid-cols-2 gap-4 rounded-[18px] border border-white/10 bg-white/[0.04] p-6">
        <article className="border-r border-white/10 pr-6">
          <h2 className="text-[18px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
            Your referral code
          </h2>
          <div className="mt-5 grid h-[82px] place-items-center rounded-[12px] border border-dashed border-white/20 bg-black/24">
            <p className="font-mono text-[42px] font-semibold tracking-[0.08em] text-[var(--sb-red-bright)]">
              {referralProgress.code}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              className="red-glow-button h-[48px] rounded-[11px] text-[12px] uppercase tracking-[0.08em]"
              onClick={onCopyCode}
              type="button"
            >
              {copyMessage || "Share code"}
            </button>
            <button
              className="h-[48px] rounded-[11px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              onClick={onCopyCode}
              type="button"
            >
              Copy code
            </button>
          </div>
        </article>

        <article className="pl-2">
          <h2 className="text-[18px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
            Your referral link
          </h2>
          <div className="mt-5 grid grid-cols-[1fr_54px] rounded-[12px] border border-white/12 bg-black/24">
            <p className="truncate px-4 py-4 text-[15px] text-white/58">
              {referralLink}
            </p>
            <button
              aria-label="Copy referral link"
              className="grid place-items-center border-l border-white/10"
              onClick={() => onCopyLink(referralLink)}
              type="button"
            >
              <AssetIcon size={24} src="/assets/icons/share-icon.png" />
            </button>
          </div>
          <button
            className="red-glow-button mt-4 h-[50px] w-full rounded-[11px] text-[12px] uppercase tracking-[0.08em]"
            onClick={() => onCopyLink(referralLink)}
            type="button"
          >
            Copy link
          </button>
          <p className="mt-4 text-center text-[13px] text-white/48">
            Share your link anywhere
          </p>
        </article>
      </section>

      <section className="mt-4 grid grid-cols-[0.2fr_1fr_0.24fr] items-center gap-6 rounded-[16px] border border-white/10 bg-white/[0.04] p-6">
        <div className="border-r border-white/10 text-center">
          <p className="text-[12px] uppercase tracking-[0.12em] text-white/50">
            Friends referred
          </p>
          <p className="mt-3 font-mono text-[38px] text-[var(--sb-red-bright)]">
            {referralProgress.completedInvites}
          </p>
          <p className="text-[14px] text-white/50">
            of {referralProgress.invitedGuests}
          </p>
        </div>
        <div>
          <div className="grid grid-cols-5 items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => {
              const complete = index < referralProgress.completedInvites;

              return (
                <div className="grid items-center gap-2" key={index}>
                  <span
                    className={
                      complete
                        ? "mx-auto grid h-10 w-10 place-items-center rounded-full bg-[var(--sb-red)] text-white"
                        : "mx-auto grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/40"
                    }
                  >
                    <AssetIcon
                      size={22}
                      src={
                        complete
                          ? "/assets/icons/check-icon.png"
                          : "/assets/icons/gift-icon.png"
                      }
                    />
                  </span>
                  {index < 4 ? (
                    <span className="h-1 rounded-full bg-white/14" />
                  ) : null}
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-center text-[15px] text-[var(--sb-gold-soft)]">
            Next Reward: $20 OFF
          </p>
          <p className="mt-2 text-center text-[13px] text-white/48">
            {referralProgress.invitedGuests - referralProgress.completedInvites}{" "}
            more referrals to unlock $20 OFF
          </p>
        </div>
        <div className="text-center">
          <p className="text-[12px] uppercase tracking-[0.12em] text-white/50">
            Available reward
          </p>
          <p className="mt-3 font-mono text-[38px] text-[var(--sb-red-bright)]">
            $10
          </p>
          <p className="text-[14px] uppercase text-white/50">in credit</p>
        </div>
      </section>

      <section className="mt-4 rounded-[16px] border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-[18px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
          How it works
        </h2>
        <div className="mt-5 grid grid-cols-3 gap-5">
          {referralSteps.map(([title, copy], index) => (
            <article
              className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 border-l border-white/10 pl-5 first:border-l-0 first:pl-0"
              key={title}
            >
              <span className="grid h-[72px] w-[72px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/24">
                <AssetIcon
                  size={38}
                  src={
                    index === 0
                      ? "/assets/icons/user-icon.png"
                      : index === 1
                        ? "/assets/icons/group-icon.png"
                        : "/assets/icons/gift-icon.png"
                  }
                />
              </span>
              <span>
                <span className="block text-[14px] font-semibold uppercase tracking-[0.08em] text-white">
                  {index + 1}. {title}
                </span>
                <span className="mt-2 block text-[13px] leading-6 text-white/54">
                  {copy}
                </span>
              </span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
