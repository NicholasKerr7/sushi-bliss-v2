"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, icons } from "@/features/home/homeDashboardData";

interface TabletReferralEarnHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  unreadCount: number;
}

/** Header chrome for the tablet referral screen. */
export function TabletReferralEarnHeader({
  cartCount,
  onOpenCart,
  unreadCount,
}: TabletReferralEarnHeaderProps) {
  return (
    <header className="bg-[#050607]/98">
      <div className="mx-auto grid h-[112px] max-w-[1086px] grid-cols-[260px_minmax(0,380px)_300px] items-center gap-8 px-9">
        <Link
          className="flex items-center gap-5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="/home"
        >
          <AssetIcon
            alt={brand.name}
            className="rounded-full"
            loading="eager"
            size={60}
            src={brand.assets.floralEmblem.publicUrl}
          />
          <span className="editorial-title text-[22px] uppercase leading-[1.05] tracking-[0.32em]">
            Sushi
            <br />
            Bliss
          </span>
        </Link>

        <Link
          className="mx-auto flex h-[52px] w-full max-w-[368px] items-center justify-between rounded-full border border-white/12 bg-black/24 px-6 text-[15px] text-white/70 transition hover:border-[var(--sb-gold)]/42 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="/locations"
        >
          <span className="flex min-w-0 items-center gap-4">
            <AssetIcon size={22} src="/assets/icons/map-pin-icon.png" />
            <span className="truncate">West Hollywood, CA</span>
          </span>
          <ChevronIcon
            className="text-[var(--sb-gold-soft)]"
            direction="down"
            size={18}
          />
        </Link>

        <div className="flex items-center justify-end gap-7">
          <Link
            aria-label={`Notifications with ${unreadCount} unread`}
            className="relative grid h-12 w-12 place-items-center text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/notifications"
          >
            <AssetIcon loading="eager" size={33} src={icons.bell} />
            {unreadCount > 0 ? (
              <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            ) : null}
            <span className="absolute -bottom-4 text-[9px] uppercase tracking-[0.1em] text-white/48">
              Notifications
            </span>
          </Link>

          <button
            aria-label={`Open cart with ${cartCount} items`}
            className="relative grid h-12 w-12 place-items-center text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            onClick={onOpenCart}
            type="button"
          >
            <AssetIcon loading="eager" size={33} src={icons.cart} />
            {cartCount > 0 ? (
              <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
            <span className="absolute -bottom-4 text-[9px] uppercase tracking-[0.1em] text-white/48">
              Cart
            </span>
          </button>

          <Link
            aria-label="Open menu"
            className="relative grid h-12 w-12 place-items-center text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/menu"
          >
            <AssetIcon
              loading="eager"
              size={31}
              src="/assets/icons/menu-light-icon.png"
            />
            <span className="absolute -bottom-4 text-[9px] uppercase tracking-[0.1em] text-white/48">
              Menu
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
