"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  primaryNavigation,
  primaryNavigationActivePositionClasses,
} from "@/data/navigation";
import { classNames } from "@/lib/classNames";

import { RouteNavGlyph } from "./RouteNavGlyph";

interface BottomNavigationProps {
  activeId?: string;
  ariaLabel?: string;
  fixed?: boolean;
}

/** Mobile customer navigation with the same active glow selector as tablet. */
export function BottomNavigation({
  activeId,
  ariaLabel = "Mobile navigation",
  fixed = true,
}: BottomNavigationProps) {
  const pathname = usePathname();
  const currentId = activeId || getCurrentNavigationId(pathname);
  const activePositionClass = primaryNavigationActivePositionClasses[currentId];

  return (
    <nav
      aria-label={ariaLabel}
      className={classNames(
        "z-40 grid h-[82px] grid-cols-5 items-center overflow-hidden rounded-[18px] border border-white/10 bg-[#070909] shadow-[inset_0_0_28px_rgba(0,0,0,.88),inset_0_1px_0_rgba(255,255,255,.08),0_12px_35px_rgba(0,0,0,.44)] min-[390px]:h-[88px] min-[390px]:rounded-[20px] md:hidden",
        fixed
          ? "mobile-bottom-nav-fixed fixed bottom-[calc(10px+var(--sb-safe-bottom))] left-1/2 -translate-x-1/2"
          : "mobile-bottom-nav-inline relative",
      )}
    >
      <span
        aria-hidden="true"
        className={classNames(
          "pointer-events-none absolute -top-5 h-[76px] w-[140px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,43,31,.18),transparent_72%)] blur-[2px]",
          activePositionClass,
        )}
      />
      <span
        aria-hidden="true"
        className={classNames(
          "pointer-events-none absolute bottom-0 h-[2px] w-[72px] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,45,31,.95),transparent)] shadow-[0_0_18px_rgba(255,45,31,.95),0_-9px_30px_rgba(255,45,31,.35)]",
          activePositionClass,
        )}
      />
      <span
        aria-hidden="true"
        className={classNames(
          "pointer-events-none absolute bottom-[-26px] h-[70px] w-[180px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,43,31,.16),transparent_68%)] blur-md",
          activePositionClass,
        )}
      />

      <ul className="relative z-10 col-span-5 grid h-full grid-cols-5">
        {primaryNavigation.map((item) => {
          const current = item.id === currentId;
          const displayLabel =
            item.id === "reservations" ? "Reserve" : item.label;

          return (
            <li
              className="h-full border-l border-white/[0.04] first:border-l-0"
              key={item.id}
            >
              <Link
                aria-current={current ? "page" : undefined}
                aria-label={item.label}
                data-current={current ? "true" : "false"}
                className={classNames(
                  "bottom-nav-link relative flex h-full flex-col items-center justify-center gap-0.5 overflow-hidden rounded-[13px] text-[8px] uppercase [text-shadow:0_2px_1px_rgba(0,0,0,.96)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[390px]:gap-1 min-[390px]:rounded-[14px] min-[390px]:text-[9px]",
                  !current && "hover:bg-white/[0.05] hover:text-white",
                )}
                href={item.href}
              >
                {current ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 h-[84px] w-[56px] rounded-full bg-[radial-gradient(circle,rgba(255,43,31,.16),rgba(255,43,31,.08)_30%,transparent_67%)] blur-[4px]"
                  />
                ) : null}
                <span
                  className={classNames(
                    "relative z-10 flex h-[28px] w-[28px] items-center justify-center min-[390px]:h-[30px] min-[390px]:w-[30px]",
                    current
                      ? "drop-shadow-[0_0_7px_rgba(255,43,31,.75)]"
                      : "drop-shadow-[0_2px_1px_rgba(0,0,0,.95)]",
                  )}
                >
                  <RouteNavGlyph
                    className="h-[21px] w-[21px] min-[390px]:h-[23px] min-[390px]:w-[23px]"
                    id={item.id}
                  />
                </span>
                <span className="relative z-10 max-w-[58px] truncate text-center font-medium leading-none">
                  {displayLabel}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function getCurrentNavigationId(pathname: string) {
  if (pathname === "/") {
    return "home";
  }

  return (
    primaryNavigation.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    )?.id || "home"
  );
}
