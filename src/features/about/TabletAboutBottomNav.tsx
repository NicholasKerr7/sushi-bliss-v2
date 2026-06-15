import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { RouteNavGlyph } from "@/components/layout/RouteNavGlyph";
import { classNames } from "@/lib/classNames";

const aboutNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Explore", "/menu"],
  ["reservations", "Reserve", "/reservations"],
  ["orders", "Orders", "/orders"],
  ["profile", "Profile", "/profile"],
] as const;

/** Reference-matched tablet footer for the About story screen. */
export function TabletAboutBottomNav() {
  return (
    <nav
      aria-label="Tablet about navigation"
      className="fixed bottom-0 left-1/2 z-40 grid h-[92px] w-full max-w-[1086px] -translate-x-1/2 grid-cols-5 overflow-hidden border-t border-white/10 bg-[#070909]/96 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_-12px_35px_rgba(0,0,0,.48)]"
    >
      {aboutNavItems.map(([id, label, href]) => {
        const active = id === "reservations";

        return (
          <Link
            className={classNames(
              "relative flex h-full flex-col items-center justify-center gap-1 overflow-hidden border-l border-white/[0.04] text-[12px] uppercase transition first:border-l-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
              active
                ? "text-[var(--sb-red-bright)]"
                : "text-white/56 hover:text-white",
            )}
            href={href}
            key={id}
          >
            {active ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 h-[90px] w-[108px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,43,31,.36),transparent_68%)]"
              />
            ) : null}
            {active ? (
              <AssetIcon
                className="relative z-10 drop-shadow-[0_0_8px_rgba(255,43,31,.78)]"
                size={33}
                src="/assets/brand/marks/sushi-bliss-floral-emblem-icon.png"
              />
            ) : (
              <RouteNavGlyph
                className="relative z-10 h-[29px] w-[29px]"
                id={id}
              />
            )}
            <span className="relative z-10 max-w-[126px] truncate text-center leading-tight">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
