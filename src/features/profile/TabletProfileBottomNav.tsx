"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";

interface TabletProfileBottomNavProps {
  active?: "home" | "profile";
}

const profileNav = [
  {
    activeKey: "home",
    href: "/home",
    icon: icons.home,
    label: "Home",
  },
  {
    activeKey: "reservations",
    href: "/reservations",
    icon: icons.calendar,
    label: "Reservations",
  },
  { activeKey: "orders", href: "/orders", icon: icons.bag, label: "Orders" },
  {
    activeKey: "loyalty",
    href: "/loyalty",
    icon: icons.star,
    label: "Loyalty",
  },
  {
    activeKey: "profile",
    href: "/profile",
    icon: icons.profile,
    label: "Profile",
  },
] as const;

export function TabletProfileBottomNav({
  active = "profile",
}: TabletProfileBottomNavProps) {
  return (
    <nav
      aria-label="Tablet profile navigation"
      className="fixed bottom-3 left-1/2 z-30 w-[calc(100%-36px)] max-w-[1034px] -translate-x-1/2 rounded-[14px] border border-white/10 bg-[#080909]/96 p-1 shadow-[0_-18px_60px_rgba(0,0,0,0.48)] backdrop-blur"
    >
      <ul className="grid grid-cols-5">
        {profileNav.map((item) => {
          const current = item.activeKey === active;

          return (
            <li key={item.label}>
              <Link
                aria-current={current ? "page" : undefined}
                className={classNames(
                  "flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-[12px] text-[11px] uppercase tracking-[0.02em] lg:min-h-[64px] lg:gap-1 lg:text-[12px] min-[1080px]:min-h-[86px] min-[1080px]:gap-2 min-[1080px]:text-[15px]",
                  current
                    ? "text-[var(--sb-red-bright)]"
                    : "text-[var(--sb-gold-soft)]/86",
                )}
                href={item.href}
              >
                <AssetIcon
                  className="h-[22px] w-[22px] lg:h-[25px] lg:w-[25px] min-[1080px]:h-[30px] min-[1080px]:w-[30px]"
                  src={item.icon}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
