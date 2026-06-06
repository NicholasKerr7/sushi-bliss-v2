"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";

const tabletLocationsNav = [
  { href: "/home", icon: icons.home, label: "Home" },
  { href: "/menu", icon: icons.menu, label: "Menu" },
  { href: "/reservations", icon: icons.calendar, label: "Reservations" },
  { href: "/loyalty", icon: icons.star, label: "Rewards" },
  { href: "/locations", icon: undefined, label: "More" },
] as const;

export function TabletLocationsBottomNav() {
  return (
    <nav
      aria-label="Tablet locations navigation"
      className="mx-auto mt-5 max-w-[1034px] rounded-[14px] border border-white/10 bg-white/[0.035] p-1"
    >
      <ul className="grid grid-cols-5">
        {tabletLocationsNav.map((item) => {
          const active = item.href === "/locations";

          return (
            <li key={item.label}>
              <Link
                className={`flex min-h-[86px] flex-col items-center justify-center gap-2 rounded-[12px] text-[15px] ${
                  active ? "text-[var(--sb-red-bright)]" : "text-white/62"
                }`}
                href={item.href}
              >
                {item.icon ? (
                  <AssetIcon size={30} src={item.icon} />
                ) : (
                  <span className="grid h-[30px] w-[30px] place-items-center rounded-full border border-current text-[18px] leading-none">
                    ...
                  </span>
                )}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
