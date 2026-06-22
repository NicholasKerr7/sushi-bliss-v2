import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";

import { tabletDiningRows } from "./TabletProfilePreferencesData";

export function TabletDiningPreferencesCard({
  onAccountAction,
}: {
  onAccountAction: (message: string) => void;
}) {
  return (
    <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:p-5">
      <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-white min-[1080px]:text-[16px]">
        <AssetIcon size={24} src="/assets/icons/floral-emblem-icon.png" />
        Dining preferences
      </h2>
      <div className="mt-4 overflow-hidden rounded-[12px] border border-white/10">
        {tabletDiningRows.map((row) => (
          <button
            className="grid min-h-[48px] w-full grid-cols-[34px_minmax(0,1fr)_minmax(100px,150px)_18px] items-center gap-3 border-b border-white/10 px-3 text-left last:border-b-0 min-[1080px]:min-h-[57px]"
            key={row.label}
            onClick={() =>
              onAccountAction(
                `${row.label} is ready for reservation personalization.`,
              )
            }
            type="button"
          >
            <AssetIcon size={22} src={row.icon} />
            <span className="truncate text-[13px] text-white min-[1080px]:text-[14px]">
              {row.label}
            </span>
            <span className="truncate text-right text-[12px] text-white/62">
              {row.detail}
            </span>
            <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
              <ChevronIcon direction="right" size={18} />
            </span>
          </button>
        ))}
      </div>
    </article>
  );
}
