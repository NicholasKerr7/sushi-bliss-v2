import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons, mobileNav } from "@/features/home/visualHomeData";

interface TabletMenuHeaderProps {
  cartCount: number;
  query: string;
  onClearQuery: () => void;
  onOpenCart: () => void;
  onQueryChange: (query: string) => void;
}

export function TabletMenuStatusBar() {
  return (
    <div className="flex h-6 items-center justify-between text-[14px] font-semibold text-white">
      <span>9:41 AM&nbsp;&nbsp; Mon May 24</span>
      <span className="flex items-center gap-2">
        <span aria-hidden="true">Wi-Fi</span>
        <span>100%</span>
        <span
          aria-hidden="true"
          className="h-[11px] w-[24px] rounded-[4px] border border-white/82"
        />
      </span>
    </div>
  );
}

export function TabletMenuHeader({
  cartCount,
  query,
  onClearQuery,
  onOpenCart,
  onQueryChange,
}: TabletMenuHeaderProps) {
  return (
    <header className="mt-1 grid h-[82px] grid-cols-[260px_1fr_268px] items-center gap-5">
      <Link className="flex items-center gap-8" href="/home">
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          size={66}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[27px] uppercase leading-[0.98] tracking-[0.35em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <form
        className={`mx-auto flex h-[58px] w-full max-w-[486px] items-center gap-4 rounded-[24px] border bg-white/[0.035] px-6 ${
          query ? "border-[var(--sb-gold)]" : "border-white/16"
        }`}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <AssetIcon size={24} src={icons.search} />
        <label className="sr-only" htmlFor="tablet-menu-search">
          Search menu items
        </label>
        <input
          className="h-full w-full bg-transparent text-[16px] text-white outline-none placeholder:text-white/58"
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
      <div className="flex items-center justify-end gap-6">
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
            className="h-[58px] w-[58px] rounded-full border border-[var(--sb-border)] object-cover"
            height={58}
            src="/assets/chefs/aiko-nakamura-pastry-chef-standing.webp"
            width={58}
          />
          <span className="text-[var(--sb-gold)]" aria-hidden="true">
            v
          </span>
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

export function TabletMenuBottomNav({ activeIndex }: { activeIndex: number }) {
  return (
    <nav
      aria-label="Tablet menu navigation"
      className="mt-5 rounded-[14px] border border-white/10 bg-white/[0.035] p-1"
    >
      <ul className="grid grid-cols-5">
        {mobileNav.map((item, index) => (
          <li key={item.label}>
            <Link
              className={`flex min-h-[86px] flex-col items-center justify-center gap-2 rounded-[12px] text-[15px] ${
                index === activeIndex
                  ? "text-[var(--sb-red-bright)]"
                  : "text-white/62"
              }`}
              href={item.href}
            >
              <AssetIcon size={30} src={item.icon} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
