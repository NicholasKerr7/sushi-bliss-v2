import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";

import { tabletProfileQuickActions } from "./TabletProfileDashboardData";

export function TabletProfileQuickActions() {
  return (
    <section className="mt-3 rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:mt-4">
      <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)] min-[1080px]:text-[16px]">
        Quick actions
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2 lg:grid-cols-5 min-[1080px]:mt-5 min-[1080px]:gap-5">
        {tabletProfileQuickActions.map((action) => (
          <Link
            className={classNames(
              "flex min-h-[74px] flex-col items-center justify-center gap-2 rounded-[12px] border px-2 text-center text-[11px] uppercase leading-4 text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold lg:min-h-[80px] lg:text-[13px] min-[1080px]:min-h-[78px]",
              action.primary
                ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/24 shadow-[0_0_28px_rgba(226,23,29,0.45)]"
                : "border-white/10 bg-black/24 hover:border-[var(--sb-gold)]/35",
            )}
            href={action.href}
            key={action.label}
          >
            <AssetIcon size={28} src={action.icon} />
            {action.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
