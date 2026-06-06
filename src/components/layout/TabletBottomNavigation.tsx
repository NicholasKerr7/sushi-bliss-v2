"use client";

import Image from "next/image";
import Link from "next/link";

import { primaryNavigation } from "@/data/navigation";
import { classNames } from "@/lib/classNames";

interface TabletBottomNavigationProps {
  activeId?: string;
  fixed?: boolean;
}

/** Primary tablet route navigation used when tablet screens avoid top nav links. */
export function TabletBottomNavigation({
  activeId,
  fixed = true,
}: TabletBottomNavigationProps) {
  return (
    <nav
      aria-label="Tablet bottom navigation"
      className={classNames(
        "z-40 rounded-[14px] border border-white/10 bg-[#080909]/96 p-1 shadow-[0_-18px_60px_rgba(0,0,0,0.48)] backdrop-blur",
        fixed
          ? "fixed bottom-3 left-1/2 w-[calc(100%-36px)] max-w-[1034px] -translate-x-1/2"
          : "mx-auto mt-auto w-full max-w-[1034px]",
      )}
    >
      <ul className="grid grid-cols-5">
        {primaryNavigation.map((item) => {
          const current = item.id === activeId;

          return (
            <li key={item.id}>
              <Link
                aria-current={current ? "page" : undefined}
                className={classNames(
                  "flex min-h-[50px] flex-col items-center justify-center gap-1 rounded-[12px] text-[11px] uppercase tracking-[0.02em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                  current
                    ? "text-[var(--sb-red-bright)]"
                    : "text-[var(--sb-gold-soft)]/86 hover:bg-white/[0.05] hover:text-white",
                )}
                href={item.href}
              >
                {item.iconUrl ? (
                  <Image
                    alt=""
                    className="h-[22px] w-[22px] object-contain"
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
