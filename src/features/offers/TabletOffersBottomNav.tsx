"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";

const tabletOffersNav = [
  { href: "/home", icon: icons.home, label: "Home" },
  { href: "/menu", icon: icons.menu, label: "Menu" },
  { href: "/reservations", icon: icons.calendar, label: "Reservations" },
  { href: "/loyalty", icon: icons.star, label: "Rewards" },
  {
    href: "/offers",
    icon: "/assets/icons/golden-ticket-icon.png",
    label: "Offers",
  },
] as const;

export function TabletOffersBottomNav() {
  return (
    <nav
      aria-label="Tablet offers navigation"
      className="mx-auto mt-auto w-full max-w-[1034px] rounded-[14px] border border-white/10 bg-white/[0.035] p-1"
    >
      <ul className="grid grid-cols-5">
        {tabletOffersNav.map((item) => {
          const active = item.href === "/offers";

          return (
            <li key={item.label}>
              <Link
                className={classNames(
                  "flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-[12px] text-[12px] lg:min-h-[64px] lg:gap-1 lg:text-[13px] min-[1080px]:min-h-[86px] min-[1080px]:gap-2 min-[1080px]:text-[15px]",
                  active ? "text-[var(--sb-red-bright)]" : "text-white/62",
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
