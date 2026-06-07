"use client";

import Link from "next/link";

import { primaryNavigation } from "@/data/navigation";
import { classNames } from "@/lib/classNames";

interface TabletBottomNavigationProps {
  activeId?: string;
  activeIndex?: number;
  ariaLabel?: string;
  compact?: boolean;
  fixed?: boolean;
}

/** Primary tablet route navigation used when tablet screens avoid top nav links. */
export function TabletBottomNavigation({
  activeId,
  activeIndex,
  ariaLabel = "Tablet bottom navigation",
  compact = false,
  fixed = true,
}: TabletBottomNavigationProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={classNames(
        "z-40 rounded-[14px] border border-white/10 p-1 backdrop-blur",
        fixed
          ? "fixed bottom-3 left-1/2 w-[calc(100%-36px)] max-w-[1034px] -translate-x-1/2 bg-[#080909]/96 shadow-[0_-18px_60px_rgba(0,0,0,0.48)]"
          : "mx-auto mt-auto w-full max-w-[1034px] bg-white/[0.035]",
      )}
    >
      <ul className="grid grid-cols-5">
        {primaryNavigation.map((item, index) => {
          const current =
            item.id === activeId ||
            (activeId === undefined && activeIndex === index);

          return (
            <li key={item.id}>
              <Link
                aria-current={current ? "page" : undefined}
                data-current={current ? "true" : "false"}
                className={classNames(
                  "tablet-bottom-nav-link flex flex-col items-center justify-center rounded-[12px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                  compact
                    ? "min-h-[54px] gap-0.5 text-[11px] min-[1080px]:min-h-[62px] min-[1080px]:gap-1 min-[1080px]:text-[13px]"
                    : "min-h-[78px] gap-2 text-[13px] min-[1080px]:min-h-[88px] min-[1080px]:text-[15px]",
                  !current && "hover:bg-white/[0.05] hover:text-white",
                )}
                href={item.href}
              >
                <TabletNavGlyph compact={compact} id={item.id} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function TabletNavGlyph({ compact, id }: { compact: boolean; id: string }) {
  const className = classNames(
    "shrink-0 fill-none stroke-current stroke-[1.7]",
    compact
      ? "h-[22px] w-[22px] min-[1080px]:h-[25px] min-[1080px]:w-[25px]"
      : "h-[26px] w-[26px] min-[1080px]:h-[32px] min-[1080px]:w-[32px]",
  );

  switch (id) {
    case "home":
      return (
        <svg
          aria-hidden="true"
          className={className}
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M3.5 11.2 12 4l8.5 7.2" />
          <path d="M5.8 10.5v9h12.4v-9" />
          <path d="M9.6 19.5v-6h4.8v6" />
        </svg>
      );
    case "menu":
      return (
        <svg
          aria-hidden="true"
          className={className}
          focusable="false"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="7.8" />
          <path d="M8 8.8h8" />
          <path d="M7.4 12h9.2" />
          <path d="M8 15.2h8" />
        </svg>
      );
    case "reservations":
      return (
        <svg
          aria-hidden="true"
          className={className}
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M6.2 4.6v3" />
          <path d="M17.8 4.6v3" />
          <path d="M4.3 8h15.4" />
          <rect height="15.1" rx="2.2" width="15.4" x="4.3" y="5.7" />
          <path d="M8 12h.1M12 12h.1M16 12h.1M8 16h.1M12 16h.1M16 16h.1" />
        </svg>
      );
    case "orders":
      return (
        <svg
          aria-hidden="true"
          className={className}
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M6.3 9.2h11.4l1 10.8H5.3z" />
          <path d="M9 9.2V7a3 3 0 0 1 6 0v2.2" />
        </svg>
      );
    case "profile":
      return (
        <svg
          aria-hidden="true"
          className={className}
          focusable="false"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="8.2" r="3.5" />
          <path d="M5 20.2c.8-4 3.1-6.1 7-6.1s6.2 2.1 7 6.1" />
        </svg>
      );
    default:
      return null;
  }
}
