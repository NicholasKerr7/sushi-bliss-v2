import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { brand, chefAvatar, icons } from "@/features/home/visualHomeData";

interface TabletMenuHeaderProps {
  cartCount: number;
  query: string;
  onClearQuery: () => void;
  onOpenCart: () => void;
  onQueryChange: (query: string) => void;
  onSubmitQuery?: (query: string) => void;
}

export function TabletMenuHeader({
  cartCount,
  query,
  onClearQuery,
  onOpenCart,
  onQueryChange,
  onSubmitQuery,
}: TabletMenuHeaderProps) {
  return (
    <header className="mt-1 grid h-[82px] grid-cols-[190px_minmax(0,1fr)_190px] items-center gap-3 lg:grid-cols-[260px_minmax(0,1fr)_268px] lg:gap-5">
      <Link className="flex items-center gap-3 lg:gap-8" href="/home">
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          size={66}
          src={icons.flower}
        />
        <span className="font-serif text-[22px] font-normal uppercase leading-[0.98] tracking-[0.36em] lg:text-[27px] lg:tracking-[0.43em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <form
        className={`mx-auto flex h-[54px] w-full max-w-[486px] items-center gap-3 rounded-[20px] border bg-white/[0.035] px-4 lg:h-[58px] lg:gap-4 lg:rounded-[24px] lg:px-6 ${
          query ? "border-[var(--sb-gold)]" : "border-white/16"
        }`}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitQuery?.(query);
        }}
      >
        <AssetIcon size={24} src={icons.search} />
        <label className="sr-only" htmlFor="tablet-menu-search">
          Search menu items
        </label>
        <input
          className="h-full w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/58 lg:text-[16px]"
          id="tablet-menu-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search menu items, ingredients, or dishes..."
          value={query}
        />
        {query ? (
          <button
            aria-label="Clear search"
            className="grid h-7 w-7 place-items-center text-white/82"
            onClick={onClearQuery}
            type="button"
          >
            <AssetIcon size={18} src={icons.x} />
          </button>
        ) : null}
      </form>
      <div className="flex items-center justify-end gap-3 lg:gap-6">
        <TabletHeaderIcon badge={2} href="/notifications" icon={icons.bell} />
        <button
          aria-label="Open cart"
          className="relative grid h-11 w-11 place-items-center"
          onClick={onOpenCart}
          type="button"
        >
          <AssetIcon size={32} src={icons.cart} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
            {cartCount}
          </span>
        </button>
        <Link className="flex items-center gap-5" href="/profile">
          <Image
            alt=""
            className="h-12 w-12 rounded-full border border-[var(--sb-border)] object-cover lg:h-[58px] lg:w-[58px]"
            height={58}
            loading="eager"
            src={chefAvatar}
            width={58}
          />
          <ChevronIcon className="text-[var(--sb-gold)]" direction="down" />
        </Link>
      </div>
    </header>
  );
}

function TabletHeaderIcon({
  badge,
  href,
  icon,
}: {
  badge: number;
  href: string;
  icon?: string;
}) {
  return (
    <Link className="relative grid h-11 w-11 place-items-center" href={href}>
      <AssetIcon size={32} src={icon} />
      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
        {badge}
      </span>
    </Link>
  );
}

interface TabletMenuBottomNavProps {
  activeIndex: number;
  compact?: boolean;
}

export function TabletMenuBottomNav({
  activeIndex,
  compact = false,
}: TabletMenuBottomNavProps) {
  return (
    <div className={compact ? "mt-3" : "mt-4"}>
      <TabletBottomNavigation
        activeIndex={activeIndex}
        ariaLabel="Tablet menu navigation"
        compact={compact}
        fixed={false}
      />
    </div>
  );
}
