"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons } from "@/features/home/homeDashboardData";

interface TabletAboutHeaderProps {
  unreadCount: number;
}

/** Header chrome for the tablet About / Our Story screen. */
export function TabletAboutHeader({ unreadCount }: TabletAboutHeaderProps) {
  return (
    <header className="border-b border-white/[0.08] bg-[#050607]/98">
      <div className="mx-auto grid h-[112px] max-w-[1086px] grid-cols-[272px_minmax(0,420px)_244px] items-center gap-8 px-8">
        <Link
          className="flex items-center gap-5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="/home"
        >
          <AssetIcon
            alt={brand.name}
            className="rounded-full"
            loading="eager"
            size={62}
            src={brand.assets.floralEmblem.publicUrl}
          />
          <span className="editorial-title text-[22px] uppercase leading-[1.05] tracking-[0.32em]">
            Sushi
            <br />
            Bliss
          </span>
        </Link>

        <form
          action="/menu"
          className="flex h-[54px] items-center gap-4 rounded-full border border-white/14 bg-black/24 px-6"
        >
          <AssetIcon size={22} src={icons.search} />
          <label className="sr-only" htmlFor="tablet-about-search">
            Search menu items
          </label>
          <input
            className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/58"
            id="tablet-about-search"
            name="q"
            placeholder="Search menu items..."
            type="search"
          />
        </form>

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
          </Link>
          <Link
            aria-label="Gift experiences"
            className="relative grid h-12 w-12 place-items-center text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/gifts"
          >
            <AssetIcon
              loading="eager"
              size={33}
              src="/assets/icons/gift-icon.png"
            />
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[var(--sb-red-bright)]" />
          </Link>
          <Link
            aria-label="Profile"
            className="grid h-12 w-12 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-[var(--sb-gold)]/12 text-[var(--sb-gold-soft)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/profile"
          >
            <AssetIcon loading="eager" size={29} src={icons.profile} />
          </Link>
        </div>
      </div>
    </header>
  );
}
