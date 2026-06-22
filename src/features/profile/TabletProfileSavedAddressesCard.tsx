import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import type { UserProfile } from "@/types/user";

import { formatTabletProfileAddress } from "./TabletProfileDashboardData";

export function TabletProfileSavedAddressesCard({
  profile,
  onOpenSettings,
}: {
  profile: UserProfile;
  onOpenSettings: () => void;
}) {
  return (
    <article className="min-h-[218px] rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:min-h-[230px]">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[1080px]:text-[16px]">
          <AssetIcon size={22} src={icons.location} />
          Saved addresses
        </h2>
        <button
          className="inline-flex min-h-10 items-center gap-1 rounded-full px-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={onOpenSettings}
          type="button"
        >
          View all <ChevronIcon direction="right" size={18} />
        </button>
      </div>
      <div className="mt-4 overflow-hidden rounded-[12px] border border-white/10">
        {profile.addresses.slice(0, 2).map((address) => (
          <div
            className="flex min-h-[62px] items-center justify-between gap-3 border-b border-white/10 px-4 py-3 last:border-b-0 min-[1080px]:min-h-[58px]"
            key={address.id}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {address.isDefault ? (
                  <span className="rounded-[6px] border border-[var(--sb-gold)]/40 px-2 py-0.5 text-[10px] text-[var(--sb-gold-soft)]">
                    Default
                  </span>
                ) : null}
                <p className="truncate text-[13px] font-semibold text-white min-[1080px]:text-[16px]">
                  {address.label}
                </p>
              </div>
              <p className="mt-1 truncate text-[11px] text-white/52 min-[1080px]:text-[13px]">
                {formatTabletProfileAddress(address)}
              </p>
            </div>
            <button
              aria-label={`Manage ${address.label}`}
              className="-mr-2 grid h-10 w-11 place-items-center rounded-full text-[var(--sb-gold-soft)] transition hover:bg-white/6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={onOpenSettings}
              type="button"
            >
              <ChevronIcon direction="right" size={18} />
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--sb-gold)]/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[1080px]:text-[14px]"
        onClick={onOpenSettings}
        type="button"
      >
        + Add new address
      </button>
    </article>
  );
}
