"use client";

import Image from "next/image";
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
                className={classNames(
                  "flex flex-col items-center justify-center rounded-[12px] uppercase tracking-[0.02em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                  compact
                    ? "min-h-[54px] gap-0.5 text-[11px] min-[1080px]:min-h-[62px] min-[1080px]:gap-1 min-[1080px]:text-[13px]"
                    : "min-h-[56px] gap-1 text-[12px] min-[1080px]:min-h-[64px] min-[1080px]:text-[14px]",
                  current
                    ? "text-[var(--sb-red-bright)]"
                    : "text-[var(--sb-gold-soft)]/86 hover:bg-white/[0.05] hover:text-white",
                )}
                href={item.href}
              >
                {item.iconUrl ? (
                  <Image
                    alt=""
                    className={classNames(
                      "object-contain",
                      compact
                        ? "h-[22px] w-[22px] min-[1080px]:h-[25px] min-[1080px]:w-[25px]"
                        : "h-[23px] w-[23px] min-[1080px]:h-[28px] min-[1080px]:w-[28px]",
                    )}
                    height={26}
                    src={item.iconUrl}
                    width={26}
                  />
                ) : null}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
