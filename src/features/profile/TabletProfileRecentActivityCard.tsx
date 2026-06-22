import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { classNames } from "@/lib/classNames";

import { tabletProfileActivityItems } from "./TabletProfileDashboardData";

export function TabletProfileRecentActivityCard() {
  return (
    <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Recent activity
        </h2>
        <Link
          className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          href="/loyalty"
        >
          View all <ChevronIcon direction="right" size={18} />
        </Link>
      </div>
      <div className="mt-4 grid gap-0 overflow-hidden rounded-[12px] border border-white/10">
        {tabletProfileActivityItems.map((item) => (
          <div
            className="grid min-h-[50px] grid-cols-[40px_minmax(0,1fr)_86px] items-center gap-3 border-b border-white/10 px-4 py-2 last:border-b-0"
            key={item.label}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-gold)]/30 bg-black/24">
              <AssetIcon size={22} src={item.icon} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-white">
                {item.label}
              </p>
              <p className="mt-1 truncate text-[12px] text-white/52">
                {item.meta}
              </p>
            </div>
            <span
              className={classNames(
                "text-right font-mono text-[14px]",
                item.tone === "positive"
                  ? "text-[var(--sb-gold-soft)]"
                  : "text-[var(--sb-red-bright)]",
              )}
            >
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
