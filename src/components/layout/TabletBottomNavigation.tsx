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

const activePositionClasses: Record<string, string> = {
  home: "left-[10%]",
  menu: "left-[30%]",
  reservations: "left-[50%]",
  orders: "left-[70%]",
  profile: "left-[90%]",
};

/** Primary tablet route navigation used when tablet screens avoid top nav links. */
export function TabletBottomNavigation({
  activeId,
  activeIndex,
  ariaLabel = "Tablet bottom navigation",
  compact = false,
  fixed = true,
}: TabletBottomNavigationProps) {
  const currentId =
    activeId ??
    (activeIndex !== undefined
      ? primaryNavigation[activeIndex]?.id
      : undefined);
  const activePositionClass = currentId
    ? activePositionClasses[currentId]
    : undefined;

  return (
    <nav
      aria-label={ariaLabel}
      className={classNames(
        "relative z-40 grid grid-cols-5 items-center overflow-hidden rounded-[22px] border border-white/10 bg-[#070909] shadow-[inset_0_0_28px_rgba(0,0,0,.88),inset_0_1px_0_rgba(255,255,255,.08),0_12px_35px_rgba(0,0,0,.44)]",
        compact ? "h-[82px]" : "h-[114px]",
        fixed
          ? "fixed bottom-3 left-1/2 w-[calc(100%-36px)] max-w-[1034px] -translate-x-1/2"
          : "mx-auto mt-auto w-full max-w-[1034px]",
      )}
    >
      {activePositionClass ? (
        <>
          <span
            aria-hidden="true"
            className={classNames(
              "pointer-events-none absolute -top-5 h-[92px] w-[190px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,43,31,.18),transparent_72%)] blur-[2px]",
              activePositionClass,
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              "pointer-events-none absolute bottom-0 h-[2px] w-[92px] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,45,31,.95),transparent)] shadow-[0_0_18px_rgba(255,45,31,.95),0_-9px_30px_rgba(255,45,31,.35)]",
              activePositionClass,
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              "pointer-events-none absolute bottom-[-26px] h-[80px] w-[250px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,43,31,.16),transparent_68%)] blur-md",
              activePositionClass,
            )}
          />
        </>
      ) : null}
      <ul className="relative z-10 col-span-5 grid h-full grid-cols-5">
        {primaryNavigation.map((item, index) => {
          const current =
            item.id === activeId ||
            (activeId === undefined && activeIndex === index);

          return (
            <li
              className="h-full border-l border-white/[0.04] first:border-l-0"
              key={item.id}
            >
              <Link
                aria-current={current ? "page" : undefined}
                data-current={current ? "true" : "false"}
                className={classNames(
                  "tablet-bottom-nav-link relative flex h-full flex-col items-center justify-center rounded-[14px] uppercase [text-shadow:0_2px_1px_rgba(0,0,0,.96)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                  compact
                    ? "gap-1 text-[12px] min-[1080px]:text-[13px]"
                    : "gap-[6px] text-[13px] min-[1080px]:text-[15px]",
                  !current && "hover:bg-white/[0.05] hover:text-white",
                )}
                href={item.href}
              >
                {current ? (
                  <span
                    aria-hidden="true"
                    className={classNames(
                      "pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(255,43,31,.16),rgba(255,43,31,.08)_30%,transparent_67%)] blur-[4px]",
                      compact
                        ? "top-0 h-[78px] w-[96px]"
                        : "top-1 h-[106px] w-[112px]",
                    )}
                  />
                ) : null}
                <span
                  className={classNames(
                    "relative z-10 flex items-center justify-center",
                    compact ? "h-[30px] w-[30px]" : "h-[38px] w-[38px]",
                    current
                      ? "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]"
                      : "drop-shadow-[0_2px_1px_rgba(0,0,0,.95)]",
                  )}
                >
                  <TabletNavGlyph compact={compact} id={item.id} />
                </span>
                <span className="relative z-10 font-medium">{item.label}</span>
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
