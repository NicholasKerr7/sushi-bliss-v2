import Link from "next/link";

import { RouteNavGlyph } from "@/components/layout/RouteNavGlyph";
import { classNames } from "@/lib/classNames";

const offerDetailNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Explore", "/menu"],
  ["reservations", "Reserve", "/reservations"],
  ["orders", "Orders", "/orders"],
  ["profile", "Profile", "/profile"],
] as const;

/** Profile-active tablet footer for the offer-detail screen. */
export function TabletOfferDetailBottomNav() {
  return (
    <nav
      aria-label="Tablet offer detail navigation"
      className="relative mx-auto mt-auto grid h-[88px] w-full max-w-[1034px] grid-cols-5 overflow-hidden rounded-t-[18px] border border-white/10 bg-[#070909]/96 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_-12px_35px_rgba(0,0,0,.48)]"
    >
      {offerDetailNavItems.map(([id, label, href]) => {
        const active = id === "profile";

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
                className="pointer-events-none absolute bottom-0 left-1/2 h-[86px] w-[108px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,43,31,.28),transparent_68%)]"
              />
            ) : null}
            <RouteNavGlyph
              className={classNames(
                "relative z-10 h-[28px] w-[28px]",
                active && "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]",
              )}
              id={id}
            />
            <span className="relative z-10 max-w-[126px] truncate text-center leading-tight">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
