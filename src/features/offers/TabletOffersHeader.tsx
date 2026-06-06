"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { mockUser } from "@/data/mockUser";
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
    <header className="mt-1 grid h-[82px] grid-cols-[180px_minmax(0,1fr)_210px] items-center gap-3 lg:grid-cols-[260px_minmax(0,1fr)_292px] lg:gap-5">
      <Link className="flex items-center gap-3 lg:gap-8" href="/home">
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          size={66}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[22px] uppercase leading-[0.98] tracking-[0.24em] lg:text-[27px] lg:tracking-[0.35em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>

      <form
        className="mx-auto flex h-[50px] w-full max-w-[430px] items-center gap-3 rounded-[18px] border border-[var(--sb-gold)]/24 bg-white/[0.035] px-4 min-[1080px]:h-[58px] min-[1080px]:max-w-[486px] min-[1080px]:gap-4 min-[1080px]:rounded-[24px] min-[1080px]:px-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <AssetIcon size={24} src={icons.search} />
        <label className="sr-only" htmlFor="tablet-offers-search">
          Search offers
        </label>
        <input
          className="h-full w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/52 min-[1080px]:text-[16px]"
          id="tablet-offers-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search offers, codes, and rewards..."
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

      <div className="flex items-center justify-end gap-3 lg:gap-6">
        <Link
          className="relative grid h-11 w-11 place-items-center"
          href="/notifications"
        >
          <AssetIcon size={32} src={icons.bell} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
            3
          </span>
        </Link>
        <Link
          aria-label="Rewards"
          className="grid h-11 w-11 place-items-center"
          href="/loyalty"
        >
          <AssetIcon size={32} src="/assets/icons/gift-icon.png" />
        </Link>
        <Link className="flex items-center gap-4" href="/profile">
          <Image
            alt=""
            className="h-12 w-12 rounded-full border border-[var(--sb-border)] object-cover lg:h-[58px] lg:w-[58px]"
            height={58}
            src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
            width={58}
          />
          <span className="hidden text-left lg:block">
            <span className="block text-[15px] font-semibold text-white">
              {mockUser.name}
            </span>
            <span className="block text-[12px] uppercase tracking-[0.12em] text-white/52">
              Bliss member
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}
