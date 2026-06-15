"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { SegmentedProgressMeter } from "@/components/ui/SegmentedProgressMeter";
import { mockUser } from "@/data/mockUser";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import type {
  LoyaltyAccount,
  LoyaltyTransaction,
  Reward,
} from "@/types/loyalty";

import { getQrCells } from "./MemberPass";

export const desktopLoyaltyHeroImage =
  "/assets/menu/sushi/deluxe-toro-caviar-nigiri.webp";
export const desktopLoyaltyTextureImage =
  "/assets/gallery/elegant-sushi-bar-with-amber-lighting.webp";

export const desktopLoyaltyPerks = [
  ["Earn 10 Points", "per $1 spent", "gold-alert-icon.png"],
  ["Birthday Reward", "500 bonus points", "calendar-icon.png"],
  ["Exclusive Access", "to special events", "golden-ticket-icon.png"],
  ["Priority Reservations", "& waitlist", "user-icon.png"],
] as const;

export function DesktopLoyaltyPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={classNames(
        "rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function DesktopTierProgress({
  account,
  compact = false,
  progress,
}: {
  account: LoyaltyAccount;
  compact?: boolean;
  progress: number;
}) {
  const nextTarget = account.nextTierPoints || 4000;
  const remaining = Math.max(nextTarget - account.lifetimePoints, 0);

  return (
    <div>
      <p className="text-[13px] uppercase tracking-[0.1em] text-white/62">
        Points balance
      </p>
      <p
        className={classNames(
          "mt-2 font-mono leading-none text-white",
          compact ? "text-[40px]" : "text-[46px]",
        )}
      >
        {account.points.toLocaleString()}
        <span className="ml-3 font-sans text-[18px] uppercase tracking-[0.12em]">
          pts
        </span>
      </p>
      <p className="mt-4 text-[13px] text-white/58">
        {remaining > 0
          ? `${remaining.toLocaleString()} pts to reach the next tier`
          : "Top tier benefits unlocked"}
      </p>
      <SegmentedProgressMeter
        ariaLabel="Tier progress"
        className="mt-3"
        max={100}
        size={compact ? "compact" : "default"}
        value={progress}
        valueLabel={`${account.lifetimePoints.toLocaleString()} / ${nextTarget.toLocaleString()}`}
      />
      <p className="mt-2 text-right font-mono text-[12px] text-white/56">
        {account.lifetimePoints.toLocaleString()} /{" "}
        {nextTarget.toLocaleString()}
      </p>
    </div>
  );
}

export function DesktopMemberQr({
  account,
  large = false,
}: {
  account: LoyaltyAccount;
  large?: boolean;
}) {
  return (
    <div
      aria-label={`Mock QR code for ${account.memberCode}`}
      className={classNames(
        "grid shrink-0 grid-cols-7 gap-1 rounded-[8px] border border-white/18 bg-white p-3 shadow-[0_0_24px_rgba(255,255,255,0.18)]",
        large ? "h-[152px] w-[152px]" : "h-[118px] w-[118px]",
      )}
      role="img"
    >
      {getQrCells(account.memberCode).map((active, index) => (
        <span
          className={classNames(
            "rounded-[2px]",
            active ? "bg-black" : "bg-white",
          )}
          key={`${account.memberCode}-${index}`}
        />
      ))}
    </div>
  );
}

export function DesktopMemberPassCard({
  account,
  large = false,
}: {
  account: LoyaltyAccount;
  large?: boolean;
}) {
  return (
    <DesktopLoyaltyPanel
      className={classNames(
        "relative overflow-hidden p-5",
        large ? "min-h-[194px]" : "min-h-[190px]",
      )}
    >
      <div className="absolute bottom-0 right-0 h-28 w-52 opacity-45 sb-wave-pattern" />
      <div
        className={classNames(
          "relative z-10 grid gap-5",
          large ? "grid-cols-[152px_1fr]" : "grid-cols-[118px_1fr]",
        )}
      >
        <DesktopMemberQr account={account} large={large} />
        <div>
          <p className="editorial-title text-[21px] uppercase tracking-[0.08em] text-white">
            {mockUser.name}
          </p>
          <p className="mt-1 text-[14px] text-[var(--sb-gold-soft)]">
            Bliss Member
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.1em] text-white/52">
            Member ID
          </p>
          <p className="mt-1 font-mono text-[14px] text-white/82">
            {account.memberCode}
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.1em] text-white/52">
            Joined
          </p>
          <p className="mt-1 text-[13px] text-white/74">Jan 15, 2024</p>
        </div>
      </div>
    </DesktopLoyaltyPanel>
  );
}

export function DesktopRewardTile({
  eagerImage = false,
  memberPoints,
  onViewReward,
  reward,
}: {
  eagerImage?: boolean;
  memberPoints: number;
  onViewReward: (reward: Reward) => void;
  reward: Reward;
}) {
  const canRedeem = reward.isAvailable && memberPoints >= reward.pointsCost;

  return (
    <article className="overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-black/36">
      <div className="relative h-[108px]">
        <Image
          alt=""
          className="object-cover"
          fill
          loading={eagerImage ? "eager" : "lazy"}
          priority={eagerImage}
          sizes="180px"
          src={reward.imageUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />
      </div>
      <div className="p-3.5">
        <p className="font-mono text-[12px] text-[var(--sb-gold-soft)]">
          {reward.pointsCost.toLocaleString()} pts
        </p>
        <h3 className="mt-1 min-h-9 text-[15px] font-semibold leading-[18px] text-white">
          {reward.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-9 text-[12px] leading-[18px] text-white/56">
          {reward.description}
        </p>
        <button
          className={classNames(
            "mt-4 h-9 w-full rounded-[8px] border text-[10px] uppercase tracking-[0.04em] whitespace-nowrap",
            canRedeem
              ? "border-[var(--sb-gold)]/46 text-[var(--sb-gold-soft)]"
              : "border-white/12 text-white/34",
          )}
          disabled={!canRedeem}
          onClick={() => onViewReward(reward)}
          type="button"
        >
          {canRedeem ? "Redeem reward" : "Locked"}
        </button>
      </div>
    </article>
  );
}

export function DesktopActivityList({
  transactions,
}: {
  transactions: LoyaltyTransaction[];
}) {
  return (
    <div className="divide-y divide-white/10">
      {transactions.slice(0, 4).map((transaction) => (
        <div
          className="grid grid-cols-[1fr_86px_86px] items-center gap-3 py-2.5 text-[13px]"
          key={transaction.id}
        >
          <div>
            <p className="text-white/82">{transaction.label}</p>
            <p className="mt-1 text-[12px] text-white/46">
              {transaction.type === "earn"
                ? "Earned Points"
                : "Reward Redeemed"}
            </p>
          </div>
          <p
            className={classNames(
              "text-right font-mono",
              transaction.points > 0
                ? "text-[var(--sb-gold-soft)]"
                : "text-[var(--sb-red-bright)]",
            )}
          >
            {transaction.points > 0 ? "+" : ""}
            {transaction.points} pts
          </p>
          <p className="text-right text-[11px] text-white/42">
            {formatDateTime(transaction.createdAt).split(" at ")[0]}
          </p>
        </div>
      ))}
    </div>
  );
}

export function DesktopPerkRow() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {desktopLoyaltyPerks.map(([title, copy, icon]) => (
        <article className="text-center" key={title}>
          <span className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/40 bg-black/28">
            <AssetIcon size={24} src={`/assets/icons/${icon}`} />
          </span>
          <p className="mt-2 text-[13px] text-white/82">{title}</p>
          <p className="mt-1 text-[12px] leading-5 text-white/54">{copy}</p>
        </article>
      ))}
    </div>
  );
}
