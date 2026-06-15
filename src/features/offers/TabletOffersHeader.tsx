"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons } from "@/features/home/visualHomeData";

interface TabletOffersHeaderProps {
  onClearQuery: () => void;
  onQueryChange: (query: string) => void;
  query: string;
}

export function TabletOffersHeader({
  onClearQuery,
  onQueryChange,
  query,
}: TabletOffersHeaderProps) {
  return (
    <header className="mx-auto grid h-[104px] w-full max-w-[1034px] grid-cols-[268px_minmax(0,390px)_290px] items-center gap-6">
      <Link
        className="flex items-center gap-5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
        href="/home"
      >
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          loading="eager"
          size={66}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[22px] uppercase leading-[1.05] tracking-[0.34em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>

      <form
        className="mx-auto flex h-[50px] w-full items-center gap-4 rounded-[18px] border border-[var(--sb-gold)]/24 bg-white/[0.035] px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        onSubmit={(event) => event.preventDefault()}
      >
        <AssetIcon size={23} src={icons.search} />
        <label className="sr-only" htmlFor="tablet-offers-search">
          Search offers
        </label>
        <input
          className="h-full w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/54"
          id="tablet-offers-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search for sushi, rolls, and more..."
          value={query}
        />
        {query ? (
          <button
            aria-label="Clear offer search"
            className="grid h-7 w-7 place-items-center text-white/82"
            onClick={onClearQuery}
            type="button"
          >
            <AssetIcon size={18} src={icons.x} />
          </button>
        ) : null}
      </form>

      <div className="flex items-center justify-end gap-8">
        <Link
          aria-label="Notifications"
          className="relative grid min-w-[76px] place-items-center gap-1 text-[10px] uppercase tracking-[0.08em] text-white/58 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="/notifications"
        >
          <AssetIcon loading="eager" size={32} src={icons.bell} />
          <span className="absolute right-1 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
            3
          </span>
          Alerts
        </Link>
        <Link
          aria-label="Rewards"
          className="grid min-w-[58px] place-items-center gap-1 text-[10px] uppercase tracking-[0.08em] text-white/58 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="/loyalty"
        >
          <AssetIcon
            loading="eager"
            size={32}
            src="/assets/icons/gift-icon.png"
          />
          Rewards
        </Link>
        <Link
          className="grid min-w-[58px] place-items-center gap-1 text-[10px] uppercase tracking-[0.08em] text-white/58 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="/profile"
        >
          <span className="grid h-[39px] w-[39px] place-items-center rounded-full border border-[var(--sb-gold)]/56 text-[var(--sb-gold-soft)]">
            <AssetIcon
              loading="eager"
              size={25}
              src="/assets/icons/user-icon.png"
            />
          </span>
          Profile
        </Link>
      </div>
    </header>
  );
}
