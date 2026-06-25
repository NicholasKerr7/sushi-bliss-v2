"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/homeDashboardData";

import { MobileFavoritesPanel } from "./MobileFavoritesPrimitives";

/** Mobile empty state for the favorites quick reorder list. */
export function MobileFavoritesEmptyState() {
  return (
    <MobileFavoritesPanel className="mt-5 p-6 text-center">
      <span className="mx-auto grid h-[74px] w-[74px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/34">
        <AssetIcon size={40} src={icons.star} />
      </span>
      <h2 className="editorial-title mt-5 text-[26px] uppercase text-white">
        No favorites saved
      </h2>
      <p className="mt-3 text-[14px] leading-6 text-white/56">
        Save menu items from the detail screen to build a faster reorder list.
      </p>
      <Link
        className="red-glow-button mt-6 grid min-h-[54px] place-items-center rounded-[13px] border text-[12px]"
        href="/menu"
      >
        Explore menu
      </Link>
    </MobileFavoritesPanel>
  );
}
