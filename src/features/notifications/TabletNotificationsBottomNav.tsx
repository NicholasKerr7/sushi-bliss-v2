import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { RouteNavGlyph } from "@/components/layout/RouteNavGlyph";
import { classNames } from "@/lib/classNames";

const notificationBottomItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["orders", "Orders", "/orders"],
  ["reservations", "Reserve", "/reservations"],
  ["rewards", "Rewards", "/loyalty"],
  ["notifications", "Alerts", "/notifications"],
  ["account", "Account", "/profile"],
] as const;

/** Seven-item tablet footer for the notifications flow. */
export function TabletNotificationsBottomNav({
  unreadCount,
}: {
  unreadCount: number;
}) {
  return (
    <nav
      aria-label="Tablet notifications navigation"
      className="fixed bottom-0 left-1/2 z-40 grid h-[72px] w-full max-w-[1086px] -translate-x-1/2 grid-cols-7 overflow-hidden border-t border-white/10 bg-[#070909]/96 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_-12px_35px_rgba(0,0,0,.48)]"
    >
      {notificationBottomItems.map(([id, label, href]) => {
        const active = id === "notifications";

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={classNames(
              "relative flex h-full flex-col items-center justify-center gap-1 overflow-hidden border-l border-white/[0.04] text-[11px] uppercase transition first:border-l-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
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
                className="pointer-events-none absolute bottom-0 left-1/2 h-[70px] w-[82px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,43,31,.3),transparent_68%)]"
              />
            ) : null}
            <NotificationBottomIcon id={id} active={active} />
            <span className="relative z-10 max-w-[84px] truncate text-center leading-tight">
              {label}
            </span>
            {active && unreadCount > 0 ? (
              <span className="absolute right-[28%] top-3 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function NotificationBottomIcon({
  active,
  id,
}: {
  active: boolean;
  id: (typeof notificationBottomItems)[number][0];
}) {
  const className = classNames(
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

  if (id === "notifications") {
    return (
      <AssetIcon
        className={classNames(
          "relative z-10",
          active && "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]",
        )}
        size={25}
        src="/assets/icons/notification-bell-icon.png"
      />
    );
  }

  return (
    <RouteNavGlyph
      className={className}
      id={id === "account" ? "profile" : id}
    />
  );
}
