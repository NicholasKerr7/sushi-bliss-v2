import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { RouteNavGlyph } from "@/components/layout/RouteNavGlyph";
import { classNames } from "@/lib/classNames";

const accountBottomItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reserve", "/reservations"],
  ["order", "Order", "/menu"],
  ["loyalty", "Loyalty", "/loyalty"],
  ["account", "Account", "/profile"],
] as const;

/** Compact six-item account footer used by the tablet preferences reference. */
export function TabletAccountBottomNavigation() {
  return (
    <nav
      aria-label="Tablet account navigation"
      className="fixed bottom-3 left-1/2 z-40 grid h-[60px] w-[calc(100%-76px)] max-w-[1010px] -translate-x-1/2 grid-cols-6 overflow-hidden rounded-[14px] border border-white/10 bg-[#070909]/96 shadow-[inset_0_0_28px_rgba(0,0,0,.88),inset_0_1px_0_rgba(255,255,255,.08),0_12px_35px_rgba(0,0,0,.44)]"
    >
      {accountBottomItems.map(([id, label, href]) => {
        const active = id === "account";

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={classNames(
              "relative flex h-full flex-col items-center justify-center gap-1 overflow-hidden border-l border-white/[0.04] text-[11px] uppercase transition first:border-l-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
              active
                ? "text-[var(--sb-red-bright)]"
                : "text-white/58 hover:text-white",
            )}
            href={href}
            key={id}
          >
            {active ? (
              <>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-1/2 h-px w-20 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,var(--sb-red-bright),transparent)] shadow-[0_0_18px_var(--sb-red-glow)]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[-28px] left-1/2 h-[64px] w-[92px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,43,31,.24),transparent_67%)] blur-md"
                />
              </>
            ) : null}
            <AccountBottomIcon
              active={active}
              className={classNames(
                active && "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]",
              )}
              id={id}
            />
            <span className="relative z-10 max-w-[92px] truncate text-center leading-tight">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function AccountBottomIcon({
  active,
  className,
  id,
}: {
  active: boolean;
  className?: string;
  id: (typeof accountBottomItems)[number][0];
}) {
  if (id === "loyalty") {
    return (
      <AssetIcon
        className={classNames("relative z-10", className)}
        size={22}
        src="/assets/icons/floral-emblem-icon.png"
      />
    );
  }

  return (
    <RouteNavGlyph
      className={classNames(
        "relative z-10 h-[22px] w-[22px]",
        active ? "stroke-[var(--sb-red-bright)]" : "stroke-current",
        className,
      )}
      id={id === "account" ? "profile" : id === "order" ? "orders" : id}
    />
  );
}
