import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";

import { tabletSupportRows } from "./TabletProfilePreferencesData";

export function TabletSupportLinksCard() {
  return (
    <article className="hidden rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:block min-[1080px]:p-5">
      <h2 className="flex items-center gap-3 text-[16px] uppercase tracking-[0.08em] text-white">
        <AssetIcon size={24} src="/assets/icons/headset-icon.png" />
        Support
      </h2>
      <div className="mt-4 overflow-hidden rounded-[12px] border border-white/10">
        {tabletSupportRows.map((row) => (
          <Link
            className="grid min-h-[49px] grid-cols-[34px_minmax(0,1fr)_18px] items-center gap-3 border-b border-white/10 px-3 text-left last:border-b-0"
            href={row.href}
            key={row.label}
          >
            <AssetIcon size={22} src={row.icon} />
            <span>
              <span className="block text-[14px] text-white">{row.label}</span>
              <span className="mt-1 block text-[12px] text-white/52">
                {row.description}
              </span>
            </span>
            <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
              <ChevronIcon direction="right" size={18} />
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}
