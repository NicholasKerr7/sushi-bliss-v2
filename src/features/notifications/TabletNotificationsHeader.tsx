"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons } from "@/features/home/visualHomeData";

interface TabletNotificationsHeaderProps {
  cartCount: number;
  unreadCount: number;
  onOpenCart: () => void;
}

/** Header chrome for the tablet notifications reference layout. */
export function TabletNotificationsHeader({
  cartCount,
  unreadCount,
  onOpenCart,
}: TabletNotificationsHeaderProps) {
  return (
    <header className="border-b border-white/[0.08] bg-[#050607]/98">
      <div className="mx-auto grid h-[104px] max-w-[1086px] grid-cols-[292px_minmax(0,384px)_210px] items-center gap-8 px-9">
        <Link
          className="flex items-center gap-5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="/home"
        >
          <AssetIcon
            className="rounded-full"
            loading="eager"
            size={62}
            src={brand.assets.floralEmblem.publicUrl}
          />
          <span>
            <span className="editorial-title block text-[22px] uppercase leading-none tracking-[0.24em]">
              Sushi Bliss
            </span>
            <span className="mt-2 block text-[12px] uppercase tracking-[0.45em] text-white/72">
              Omakase
            </span>
          </span>
        </Link>

        <form className="flex h-[50px] items-center gap-4 rounded-full border border-[var(--sb-border)] bg-black/24 px-5">
          <AssetIcon size={22} src={icons.search} />
          <label className="sr-only" htmlFor="tablet-notifications-search">
            Search notifications
          </label>
          <input
            className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/60"
            id="tablet-notifications-search"
            placeholder="Search menu, items, or categories"
            type="search"
          />
        </form>

        <div className="flex items-center justify-end gap-6">
          <Link
            aria-label={`Notifications with ${unreadCount} unread`}
            className="relative grid h-11 w-11 place-items-center text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/notifications"
          >
            <AssetIcon loading="eager" size={31} src={icons.bell} />
            {unreadCount > 0 ? (
              <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            ) : null}
          </Link>
          <button
            aria-label={`Open cart with ${cartCount} items`}
            className="relative grid h-11 w-11 place-items-center text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            onClick={onOpenCart}
            type="button"
          >
            <AssetIcon loading="eager" size={31} src={icons.cart} />
            {cartCount > 0 ? (
              <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
          <button
            aria-label="More notification options"
            className="grid h-10 w-8 place-items-center text-[28px] leading-none text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            type="button"
          >
            <span aria-hidden="true">⋮</span>
          </button>
        </div>
      </div>
    </header>
  );
}
