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
  const visibleAddresses = profile.addresses.slice(0, 2);

  return (
    <article className="relative min-h-[218px] overflow-hidden rounded-[14px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] min-[1080px]:min-h-[230px]">
      <span
        aria-hidden="true"
        className="absolute -right-14 -top-16 h-36 w-36 rounded-full bg-[var(--sb-gold)]/8 blur-2xl"
      />
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
      <div className="relative mt-4 grid gap-2">
        {visibleAddresses.map((address) => (
          <div
            className="grid min-h-[62px] grid-cols-[42px_minmax(0,1fr)_36px] items-center gap-3 rounded-[12px] border border-white/10 bg-black/28 px-3 py-2.5 shadow-[0_12px_26px_rgba(0,0,0,0.18)] min-[1080px]:min-h-[64px] min-[1080px]:grid-cols-[46px_minmax(0,1fr)_40px]"
            key={address.id}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/24 bg-black/42 min-[1080px]:h-11 min-[1080px]:w-11">
              <AssetIcon size={22} src={icons.location} />
            </span>
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <p className="truncate text-[13px] font-semibold text-white min-[1080px]:text-[16px]">
                  {address.label}
                </p>
                <span className="shrink-0 rounded-[6px] border border-white/10 bg-black/32 px-2 py-0.5 text-[9px] uppercase tracking-[0.06em] text-white/46">
                  {address.isDefault ? "Default" : "Saved"}
                </span>
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
        className="relative mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--sb-gold)]/28 bg-black/18 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[1080px]:text-[14px]"
        onClick={onOpenSettings}
        type="button"
      >
        <AssetIcon size={15} src="/assets/icons/plus-icon.png" />
        Add new address
      </button>
    </article>
  );
}
