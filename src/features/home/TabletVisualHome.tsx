"use client";

import Image from "next/image";
import type { FormEvent } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

import {
  appContent,
  brand,
  featuredAssets,
  icons,
  mobileNav,
} from "./visualHomeData";

interface TabletDashboardProps {
  cartCount: number;
  items: MenuItem[];
  memberItem: MenuItem;
  query: string;
  onAddToCart: (item: MenuItem) => void;
  onQueryChange: (query: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function TabletDashboard({
  cartCount,
  items,
  memberItem,
  query,
  onAddToCart,
  onQueryChange,
  onSearchSubmit,
}: TabletDashboardProps) {
  return (
    <div className="hidden min-h-screen bg-[#050607] px-[26px] pb-3 pt-3 text-white md:block xl:hidden">
      <TabletStatusBar />
      <TabletHeader
        cartCount={cartCount}
        query={query}
        onQueryChange={onQueryChange}
        onSearchSubmit={onSearchSubmit}
      />
      <TabletHero />
      <div className="mt-5 grid grid-cols-[1fr_316px] gap-[18px]">
        <TabletFeaturedMenu items={items} onAddToCart={onAddToCart} />
        <TabletReservationCard />
      </div>
      <div className="mt-6 grid grid-cols-[460px_1fr] gap-[18px]">
        <TabletRecentOrder item={memberItem} />
        <TabletRewardsCard />
      </div>
      <TabletBenefitsStrip />
      <TabletBottomNav />
    </div>
  );
}

function TabletStatusBar() {
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

interface TabletHeaderProps {
  cartCount: number;
  query: string;
  onQueryChange: (query: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function TabletHeader({
  cartCount,
  query,
  onQueryChange,
  onSearchSubmit,
}: TabletHeaderProps) {
  return (
    <header className="mt-1 grid h-[82px] grid-cols-[312px_1fr_260px] items-center gap-5">
      <a className="flex items-center gap-8" href="#home-dashboard">
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
      </a>
      <form
        className="mx-auto flex h-[58px] w-full max-w-[386px] items-center gap-4 rounded-[24px] border border-white/16 bg-white/[0.035] px-6"
        onSubmit={onSearchSubmit}
      >
        <AssetIcon size={24} src={icons.search} />
        <label className="sr-only" htmlFor="tablet-dashboard-search">
          Search dishes, rolls, or more
        </label>
        <input
          className="h-full w-full bg-transparent text-[16px] text-white outline-none placeholder:text-white/58"
          id="tablet-dashboard-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search dishes, rolls, or more..."
          value={query}
        />
      </form>
      <div className="flex items-center justify-end gap-6">
        <TabletIconLink badge={2} href="#notifications" icon={icons.bell} />
        <TabletIconLink badge={cartCount || 4} href="#menu" icon={icons.cart} />
        <a className="flex items-center gap-5" href="#profile">
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
        </a>
      </div>
    </header>
  );
}

function TabletIconLink({
  badge,
  href,
  icon,
}: {
  badge: number;
  href: string;
  icon?: string;
}) {
  return (
    <a className="relative grid h-11 w-11 place-items-center" href={href}>
      <AssetIcon size={32} src={icon} />
      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
        {badge}
      </span>
    </a>
  );
}

function TabletHero() {
  return (
    <section className="relative mt-[18px] min-h-[460px] overflow-hidden rounded-[14px] border border-white/16">
      <Image
        alt=""
        className="object-cover object-[74%_54%]"
        fill
        priority
        sizes="1034px"
        src={featuredAssets.heroSushi.publicUrl}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.66)_38%,rgba(0,0,0,0.12)_72%,rgba(0,0,0,0.36)_100%)]" />
      <div className="relative z-10 flex min-h-[460px] flex-col justify-center px-[86px]">
        <p className="text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
          Timeless Japanese Artistry.
        </p>
        <h1 className="editorial-title mt-4 text-[84px] uppercase leading-[0.86] text-white">
          Sushi
          <span className="block text-[var(--sb-red-bright)]">Bliss</span>
        </h1>
        <p className="mt-6 max-w-[370px] text-[22px] leading-[1.32] text-[var(--sb-gold)]">
          An unforgettable dining experience where tradition meets perfection.
        </p>
        <div className="mt-8 flex gap-5">
          <a
            className="red-glow-button flex h-14 w-[255px] items-center justify-center gap-8 rounded-[10px] text-base uppercase tracking-[0.08em] text-white"
            href="#reservations"
          >
            Reserve a Table
            <span aria-hidden="true">&gt;</span>
          </a>
          <a
            className="flex h-14 w-[210px] items-center justify-center gap-6 rounded-[10px] border border-[var(--sb-border-strong)] bg-black/32 text-base uppercase tracking-[0.08em] text-[var(--sb-gold)]"
            href="#menu"
          >
            Order Now
            <AssetIcon size={22} src={icons.bag} />
          </a>
        </div>
        <div className="mt-7 flex gap-5">
          {[0, 1, 2, 3, 4].map((index) => (
            <span
              className={`h-[11px] w-[11px] rounded-full ${
                index === 0 ? "bg-[var(--sb-red-bright)]" : "bg-white/22"
              }`}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TabletFeaturedMenu({
  items,
  onAddToCart,
}: {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}) {
  const badges = ["Nigiri", "Hot", "Sashimi", "Special"];

  return (
    <section className="rounded-[14px] border border-white/14 bg-white/[0.035] p-[18px]">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-[18px] uppercase tracking-[0.05em] text-white">
          <AssetIcon size={26} src={icons.flower} />
          Featured Menu
        </h2>
        <a
          className="flex items-center gap-3 text-sm uppercase tracking-[0.08em] text-[var(--sb-gold)]"
          href="#menu"
        >
          View All
          <span aria-hidden="true">&gt;</span>
        </a>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-2.5">
        {items.map((item, index) => (
          <TabletMenuCard
            badge={badges[index] || "Special"}
            item={item}
            key={item.id}
            onAddToCart={onAddToCart}
            priority
          />
        ))}
      </div>
    </section>
  );
}

function TabletMenuCard({
  badge,
  item,
  onAddToCart,
  priority = false,
}: {
  badge: string;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  priority?: boolean;
}) {
  return (
    <article className="relative overflow-hidden rounded-[8px] border border-[var(--sb-border)] bg-black/48">
      <span className="absolute left-0 top-0 z-10 rounded-br-[12px] bg-[var(--sb-red)]/86 px-2.5 py-1 text-[10px] uppercase text-white">
        {badge}
      </span>
      <a href="#menu">
        <div className="relative h-[96px]">
          <Image
            alt=""
            className="object-cover"
            fill
            priority={priority}
            sizes="170px"
            src={item.image.publicUrl}
          />
        </div>
        <div className="p-3">
          <h3 className="editorial-title line-clamp-1 text-[16px] text-white">
            {item.name}
          </h3>
          <p className="mt-1 line-clamp-2 min-h-10 text-[12px] leading-5 text-white/72">
            {item.ingredients.slice(0, 3).join(", ")}
          </p>
          <p className="mt-4 text-[20px] text-[var(--sb-gold)]">
            {formatMoney(item.priceCents)}
          </p>
        </div>
      </a>
      <button
        aria-label={`Add ${item.name} to cart`}
        className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-border-strong)] bg-black/55"
        onClick={() => onAddToCart(item)}
        type="button"
      >
        <AssetIcon size={22} src={icons.plus} />
      </button>
    </article>
  );
}

function TabletReservationCard() {
  const { location } = appContent;

  return (
    <section className="rounded-[14px] border border-white/14 bg-white/[0.035] p-4">
      <h2 className="flex items-center gap-3 text-[18px] uppercase tracking-[0.05em] text-white">
        <AssetIcon size={26} src={icons.flower} />
        Make a Reservation
      </h2>
      <div className="mt-4 overflow-hidden rounded-[8px] border border-[var(--sb-border)]">
        <div className="grid grid-cols-[74px_1fr]">
          <div className="row-span-2 grid place-items-center border-r border-[var(--sb-border)] py-2 text-center">
            <span className="text-xs uppercase text-white/68">Sat</span>
            <span className="editorial-title text-[34px] leading-none text-white">
              24
            </span>
            <span className="text-xs uppercase text-white/68">May</span>
          </div>
          <div className="flex min-h-[42px] items-center border-b border-[var(--sb-border)] px-5 text-sm text-white/72">
            <span className="w-24">7:00 PM</span>
          </div>
          <a
            className="flex min-h-[48px] items-center justify-between px-5 text-sm text-white"
            href="#reservations"
          >
            2 Guests
            <span className="text-[var(--sb-gold)]" aria-hidden="true">
              v
            </span>
          </a>
        </div>
        <div className="flex gap-3 border-t border-[var(--sb-border)] px-5 py-2 text-sm text-white/78">
          <AssetIcon size={22} src={icons.location} />
          <span>
            Sushi Bliss Downtown
            <br />
            {location.street}, {location.city}
          </span>
        </div>
      </div>
      <a
        className="red-glow-button mt-3 flex h-11 items-center justify-center rounded-[8px] text-base uppercase tracking-[0.08em] text-white"
        href="#reservations"
      >
        Find a Table
      </a>
      <div className="mt-4 flex items-center justify-between text-[15px] text-white/68">
        <span className="flex items-center gap-2">
          <AssetIcon size={20} src={icons.reservations} />
          Table A7
        </span>
        <a className="text-[var(--sb-gold)]" href="#reservations">
          Change
        </a>
      </div>
    </section>
  );
}

function TabletRecentOrder({ item }: { item: MenuItem }) {
  return (
    <section className="rounded-[14px] border border-white/14 bg-white/[0.035] p-4">
      <h2 className="flex items-center gap-3 text-[18px] uppercase tracking-[0.05em] text-white">
        <AssetIcon size={26} src={icons.flower} />
        Recent Order
      </h2>
      <a
        className="mt-4 grid grid-cols-[138px_1fr_auto] items-center gap-4 rounded-[8px] border border-[var(--sb-border)] bg-black/38 p-3"
        href="#orders"
      >
        <div className="relative h-[74px] overflow-hidden rounded-[6px]">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="160px"
            src={item.image.publicUrl}
          />
        </div>
        <span>
          <span className="block text-[18px] text-white">
            Sushi Bliss Deluxe
          </span>
          <span className="mt-2 block text-[14px] text-white/58">
            May 10, 2024 · 5:50 PM
          </span>
          <span className="mt-2 block text-[20px] text-[var(--sb-gold)]">
            $85.00 <span className="ml-5 text-emerald-400">Delivered</span>
          </span>
        </span>
        <span className="text-[28px] text-[var(--sb-gold)]" aria-hidden="true">
          &gt;
        </span>
      </a>
    </section>
  );
}

function TabletRewardsCard() {
  return (
    <section className="grid grid-cols-[1fr_210px] overflow-hidden rounded-[14px] border border-white/14 bg-white/[0.035]">
      <div className="p-4">
        <h2 className="flex items-center gap-3 text-[18px] uppercase tracking-[0.05em] text-[var(--sb-gold)]">
          <AssetIcon size={26} src={icons.flower} />
          <span>
            Bliss Rewards
            <span className="block text-[14px]">Gold Tier</span>
          </span>
        </h2>
        <p className="mt-3 text-[22px] text-white">You have 3,250 points</p>
        <p className="mt-2 text-[15px] text-white/62">
          750 pts to reach Platinum
        </p>
        <div className="mt-3 flex items-center gap-3">
          <progress className="h-2 flex-1" max={4000} value={3250}>
            3250
          </progress>
          <span className="text-sm text-white/62">3,250 / 4,000</span>
        </div>
      </div>
      <a
        className="grid grid-rows-[1fr_48px] border-l border-[var(--sb-border)] text-center"
        href="#loyalty"
      >
        <span className="grid place-items-center bg-[radial-gradient(circle,rgba(202,164,93,0.18),transparent_58%)]">
          <AssetIcon size={92} src={icons.flower} />
        </span>
        <span className="flex items-center justify-center border-t border-[var(--sb-border)] text-base uppercase tracking-[0.08em] text-[var(--sb-gold)]">
          View Benefits
        </span>
      </a>
    </section>
  );
}

function TabletBenefitsStrip() {
  return (
    <section className="mt-5 grid grid-cols-4 rounded-[14px] border border-white/14 bg-white/[0.035]">
      {appContent.benefits.map((benefit) => (
        <div
          className="flex min-h-[98px] items-center justify-center gap-4 border-r border-white/10 px-5 last:border-r-0"
          key={benefit.id}
        >
          <AssetIcon
            size={38}
            src={icons[benefit.icon as keyof typeof icons]}
          />
          <span>
            <span className="block text-[14px] uppercase tracking-[0.08em] text-white/78">
              {benefit.title}
            </span>
            <span className="mt-1 block text-[14px] text-white/58">
              {benefit.copy}
            </span>
          </span>
        </div>
      ))}
    </section>
  );
}

function TabletBottomNav() {
  return (
    <nav
      aria-label="Tablet dashboard navigation"
      className="mt-9 rounded-[14px] border border-white/10 bg-white/[0.035] p-1"
    >
      <ul className="grid grid-cols-5">
        {mobileNav.map((item, index) => (
          <li key={item.label}>
            <a
              className={`flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-[12px] text-[15px] ${
                index === 0 ? "text-[var(--sb-red-bright)]" : "text-white/62"
              }`}
              href={item.href}
            >
              <AssetIcon size={30} src={item.icon} />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
