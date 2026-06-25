import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { icons } from "@/features/home/homeDashboardData";
import { classNames } from "@/lib/classNames";
import type { LoyaltyAccount } from "@/types/loyalty";
import type { UserProfile } from "@/types/user";

import { getTabletProfileProgressCells } from "./TabletProfileDashboardData";

export function TabletProfileHeroCard({
  account,
  activeOrderCount,
  nextTierMinimumLabel,
  pointsToNextTier,
  profile,
  progress,
  onOpenSettings,
}: {
  account: LoyaltyAccount;
  activeOrderCount: number;
  nextTierMinimumLabel: string;
  pointsToNextTier: number;
  profile: UserProfile;
  progress: number;
  onOpenSettings: () => void;
}) {
  return (
    <section className="mt-3 grid min-h-[142px] grid-cols-[142px_minmax(0,1fr)_230px] items-center gap-5 rounded-[14px] border border-white/10 bg-white/[0.035] p-4 lg:min-h-[178px] lg:grid-cols-[170px_minmax(0,1fr)_300px] min-[1080px]:mt-4 min-[1080px]:min-h-[194px] min-[1080px]:grid-cols-[180px_minmax(0,1fr)_320px] min-[1080px]:gap-7 min-[1080px]:p-5">
      <div className="relative mx-auto h-[112px] w-[112px] lg:h-[150px] lg:w-[150px] min-[1080px]:h-[164px] min-[1080px]:w-[164px]">
        <Image
          alt=""
          className="rounded-full border border-[var(--sb-gold)] object-cover"
          fill
          loading="eager"
          priority
          sizes="164px"
          src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
        />
        <button
          aria-label="Open profile settings"
          className="absolute bottom-0 right-0 grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)] bg-[#090909] text-[var(--sb-gold-soft)] shadow-[0_0_20px_rgba(215,160,75,0.25)]"
          onClick={onOpenSettings}
          type="button"
        >
          <AssetIcon size={22} src="/assets/icons/user-settings-icon.png" />
        </button>
      </div>

      <div className="min-w-0">
        <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)] lg:text-[15px]">
          Bliss member - {profile.tier} tier
        </p>
        <h1 className="editorial-title mt-2 text-[34px] uppercase leading-none tracking-[0.05em] text-white lg:text-[42px] min-[1080px]:text-[48px]">
          {profile.name}
        </h1>
        <p className="mt-2 text-[13px] text-white/72 lg:text-[16px]">
          Member since January 15, 2024
        </p>
        <div className="mt-4 flex flex-wrap gap-2 lg:gap-3">
          <span className="inline-flex h-9 items-center gap-2 rounded-full border border-[var(--sb-gold)]/34 bg-black/24 px-4 text-[13px] text-[var(--sb-gold-soft)]">
            <AssetIcon size={18} src={icons.star} />
            {account.points.toLocaleString()} pts
          </span>
          <span className="inline-flex h-9 items-center gap-2 rounded-full border border-[var(--sb-gold)]/34 bg-black/24 px-4 text-[13px] text-[var(--sb-gold-soft)]">
            <AssetIcon size={18} src="/assets/icons/golden-ticket-icon.png" />
            {profile.tier} Tier
          </span>
          <span className="hidden h-9 items-center gap-2 rounded-full border border-[var(--sb-gold)]/34 bg-black/24 px-4 text-[13px] text-[var(--sb-gold-soft)] min-[1080px]:inline-flex">
            <AssetIcon size={18} src={icons.bag} />
            {activeOrderCount} Active
          </span>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex items-center justify-between gap-3 text-[13px] uppercase tracking-[0.12em] text-white/70">
          <span>{pointsToNextTier.toLocaleString()} pts to platinum</span>
          <span>
            {account.lifetimePoints.toLocaleString()} / {nextTierMinimumLabel}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-10 gap-1">
          {getTabletProfileProgressCells(progress).map((filled, index) => (
            <span
              className={classNames(
                "h-2 rounded-full",
                filled ? "bg-[var(--sb-gold-soft)]" : "bg-white/12",
              )}
              key={`profile-tier-${index}`}
            />
          ))}
        </div>
        <Button
          className="mt-7 h-[48px] w-full rounded-[10px] uppercase tracking-[0.08em]"
          href="/loyalty"
          variant="secondary"
        >
          View benefits
        </Button>
      </div>
    </section>
  );
}
