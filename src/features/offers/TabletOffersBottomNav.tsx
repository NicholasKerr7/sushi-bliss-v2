import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { RouteNavGlyph } from "@/components/layout/RouteNavGlyph";
import { classNames } from "@/lib/classNames";

const offersBottomItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["orders", "Orders", "/orders"],
  ["rewards", "Rewards", "/loyalty"],
  ["offers", "Promotions", "/offers"],
  ["more", "More", "/profile"],
] as const;

/** Seven-item tablet footer used by the promotions reference layout. */
export function TabletOffersBottomNav() {
  return (
    <nav
      aria-label="Tablet offers navigation"
      className="relative mx-auto mt-auto grid h-[72px] w-full max-w-[1034px] grid-cols-7 overflow-hidden rounded-t-[22px] border border-white/10 bg-[#070909]/96 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_-12px_35px_rgba(0,0,0,.48)]"
    >
      {offersBottomItems.map(([id, label, href]) => {
        const active = id === "offers";

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={classNames(
              "relative flex h-full flex-col items-center justify-center gap-1 border-l border-white/[0.04] text-[11px] uppercase transition first:border-l-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
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
                className="pointer-events-none absolute bottom-0 left-1/2 h-[70px] w-[140px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,43,31,.3),transparent_68%)]"
              />
            ) : null}
            <TabletOffersBottomIcon active={active} id={id} />
            <span className="relative z-10">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function TabletOffersBottomIcon({
  active,
  id,
}: {
  active: boolean;
  id: (typeof offersBottomItems)[number][0];
}) {
  const iconClassName = classNames(
    "relative z-10 h-[24px] w-[24px]",
    active && "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]",
  );

  if (id === "rewards") {
    return (
      <AssetIcon
        className={classNames(
          "relative z-10",
          active && "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]",
        )}
        size={25}
        src="/assets/icons/star-icon.png"
      />
    );
  }

  if (id === "offers") {
    return (
      <AssetIcon
        className={classNames(
          "relative z-10",
          active && "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]",
        )}
        size={25}
        src="/assets/icons/golden-ticket-icon.png"
      />
    );
  }

  if (id === "more") {
    return (
      <span
        aria-hidden="true"
        className={classNames(
          "relative z-10 flex h-[24px] w-[24px] items-center justify-center text-[23px] leading-none",
          active && "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]",
        )}
      >
        ...
      </span>
    );
  }

  return <RouteNavGlyph className={iconClassName} id={id} />;
}
