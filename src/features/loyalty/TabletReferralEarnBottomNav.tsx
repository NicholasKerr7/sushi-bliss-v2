import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { RouteNavGlyph } from "@/components/layout/RouteNavGlyph";
import { classNames } from "@/lib/classNames";

const referralNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["orders", "Orders", "/orders"],
  ["reservations", "Reserve", "/reservations"],
  ["rewards", "Rewards", "/loyalty"],
  ["locations", "Locations", "/locations"],
  ["profile", "Profile", "/profile"],
] as const;

/** Rewards-active tablet footer matching the referral reference screen. */
export function TabletReferralEarnBottomNav() {
  return (
    <nav
      aria-label="Tablet referral navigation"
      className="fixed bottom-0 left-1/2 z-40 grid h-[86px] w-full max-w-[1086px] -translate-x-1/2 grid-cols-7 overflow-hidden border-t border-white/10 bg-[#070909]/96 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_-12px_35px_rgba(0,0,0,.48)]"
    >
      {referralNavItems.map(([id, label, href]) => {
        const active = id === "rewards";

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={classNames(
              "relative flex h-full flex-col items-center justify-center gap-1 overflow-hidden border-l border-white/[0.04] text-[12px] uppercase transition first:border-l-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
              active
                ? "text-[var(--sb-red-bright)]"
                : "text-white/52 hover:text-white",
            )}
            href={href}
            key={id}
          >
            {active ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 h-[84px] w-[92px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,43,31,.34),transparent_68%)]"
              />
            ) : null}
            <ReferralNavIcon active={active} id={id} />
            <span className="relative z-10 max-w-[84px] truncate text-center leading-tight">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function ReferralNavIcon({
  active,
  id,
}: {
  active: boolean;
  id: (typeof referralNavItems)[number][0];
}) {
  const iconClassName = classNames(
    "relative z-10 h-[27px] w-[27px]",
    active && "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]",
  );

  if (id === "rewards") {
    return (
      <AssetIcon
        className={classNames(
          "relative z-10",
          active && "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]",
        )}
        size={29}
        src="/assets/icons/gift-icon.png"
      />
    );
  }

  if (id === "locations") {
    return (
      <AssetIcon
        className={classNames(
          "relative z-10",
          active && "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]",
        )}
        size={29}
        src="/assets/icons/map-pin-icon.png"
      />
    );
  }

  return <RouteNavGlyph className={iconClassName} id={id} />;
}
