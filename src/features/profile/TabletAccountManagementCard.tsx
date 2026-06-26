import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/homeDashboardData";

import { tabletAccountManagementRows } from "./TabletProfilePreferencesData";

export function TabletAccountManagementCard({
  onAccountAction,
}: {
  onAccountAction: (message: string) => void;
}) {
  return (
    <article className="hidden rounded-[14px] border border-white/10 bg-white/[0.035] p-2 min-[1080px]:block">
      <h2 className="flex items-center gap-2 px-1 text-[13px] uppercase tracking-[0.08em] text-white">
        <AssetIcon size={18} src={icons.profile} />
        Account management
      </h2>
      <div className="mt-2 overflow-hidden rounded-[12px] border border-white/10">
        {tabletAccountManagementRows.map(([label, message]) => (
          <button
            className="grid min-h-[24px] w-full grid-cols-[24px_minmax(0,1fr)_18px] items-center gap-2 border-b border-white/10 px-3 text-left"
            key={label}
            onClick={() => onAccountAction(message)}
            type="button"
          >
            <AssetIcon size={16} src={icons.settings} />
            <span className="text-[12px] text-white">{label}</span>
            <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
              <ChevronIcon direction="right" size={18} />
            </span>
          </button>
        ))}
        <button
          className="grid min-h-[24px] w-full grid-cols-[24px_minmax(0,1fr)] items-center gap-2 px-3 text-left text-[var(--sb-red-bright)]"
          onClick={() => onAccountAction("Signed out for this session.")}
          type="button"
        >
          <AssetIcon size={16} src="/assets/icons/user-settings-icon.png" />
          <span className="text-[12px]">Log Out</span>
        </button>
      </div>
    </article>
  );
}
