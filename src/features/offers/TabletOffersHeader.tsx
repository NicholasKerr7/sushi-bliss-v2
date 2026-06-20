"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
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
    <header className="mx-auto grid h-[104px] w-full max-w-[1034px] grid-cols-[190px_minmax(190px,1fr)_218px] items-center gap-4 min-[900px]:grid-cols-[230px_minmax(240px,1fr)_248px] min-[1080px]:grid-cols-[268px_minmax(0,390px)_290px] min-[1080px]:gap-6">
      <Link
        className="flex min-w-0 items-center gap-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold min-[1080px]:gap-5"
        href="/home"
      >
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          loading="eager"
          size={62}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[20px] uppercase leading-[1.05] tracking-[0.28em] min-[1080px]:text-[22px] min-[1080px]:tracking-[0.34em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>

      <form
        className="mx-auto flex h-[50px] min-w-0 w-full items-center gap-3 rounded-[18px] border border-[var(--sb-gold)]/24 bg-white/[0.035] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] min-[1080px]:gap-4 min-[1080px]:px-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <AssetIcon size={23} src={icons.search} />
        <label className="sr-only" htmlFor="tablet-offers-search">
          Search offers
        </label>
        <input
          className="h-full min-w-0 w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/54"
          id="tablet-offers-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search offers..."
          value={query}
        />
        {query ? (
          <button
            aria-label="Clear offer search"
            className="grid h-8 w-8 place-items-center rounded-full text-white/72 transition hover:bg-white/8 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            onClick={onClearQuery}
            type="button"
          >
            <ChevronIcon direction="x" size={16} />
          </button>
        ) : null}
      </form>

      <div className="flex min-w-0 items-center justify-end gap-5 min-[1080px]:gap-8">
        <Link
          aria-label="Notifications"
          className="relative grid min-w-[54px] place-items-center gap-1 text-[10px] uppercase tracking-[0.08em] text-white/58 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold min-[1080px]:min-w-[76px]"
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
          className="grid min-w-[54px] place-items-center gap-1 text-[10px] uppercase tracking-[0.08em] text-white/58 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold min-[1080px]:min-w-[58px]"
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
          className="grid min-w-[54px] place-items-center gap-1 text-[10px] uppercase tracking-[0.08em] text-white/58 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold min-[1080px]:min-w-[58px]"
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
