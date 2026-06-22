import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";

import { tabletProfileSettingsLinks } from "./TabletProfileDashboardData";

export function TabletProfileSettingsLinksCard({
  onOpenSettings,
}: {
  onOpenSettings: () => void;
}) {
  return (
    <section className="mt-4 hidden rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:block">
      <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
        Preferences & settings
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {tabletProfileSettingsLinks.map((item) => (
          <button
            className="grid min-h-[48px] grid-cols-[42px_minmax(0,1fr)_20px] items-center gap-3 rounded-[10px] border border-white/10 bg-black/20 px-4 text-left transition hover:border-[var(--sb-gold)]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            key={item.label}
            onClick={onOpenSettings}
            type="button"
          >
            <AssetIcon size={26} src={item.icon} />
            <span>
              <span className="block text-[15px] font-semibold text-white">
                {item.label}
              </span>
              <span className="mt-1 block text-[12px] text-white/52">
                {item.description}
              </span>
            </span>
            <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
              <ChevronIcon direction="right" size={18} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
