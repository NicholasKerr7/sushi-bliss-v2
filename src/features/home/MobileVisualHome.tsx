"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { SegmentedProgressMeter } from "@/components/ui/SegmentedProgressMeter";
import type { MenuItem } from "@/types/menu";

import { HomeMenuCard } from "./HomeMenuCard";
import {
  brand,
  dashboardCategories,
  featuredAssets,
  icons,
} from "./visualHomeData";

interface MobileDashboardProps {
  activeCategory: string;
  cartCount: number;
  items: MenuItem[];
  memberItem: MenuItem;
  query: string;
  onAddToCart: (item: MenuItem) => void;
  onCategoryChange: (category: string) => void;
  onQueryChange: (query: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function MobileDashboard({
  activeCategory,
  cartCount,
  items,
  memberItem,
  query,
  onAddToCart,
  onCategoryChange,
  onQueryChange,
  onSearchSubmit,
}: MobileDashboardProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-5 pb-8 pt-5 md:hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_5%,rgba(184,20,20,0.28),transparent_26%),radial-gradient(circle_at_92%_18%,rgba(202,164,93,0.1),transparent_26%),linear-gradient(180deg,#080504_0%,#050505_42%,#050505_100%)]" />
        <div className="sb-wave-pattern absolute left-0 top-[42%] h-36 w-full opacity-18" />
      </div>

      <div className="mobile-frame relative z-10">
        <MobileDashboardHeader />
        <MobileSearchBar
          query={query}
          onQueryChange={onQueryChange}
          onSubmit={onSearchSubmit}
        />
        <MobileHeroCard />
        <CategoryRail
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
        <FeaturedMenuRail items={items} onAddToCart={onAddToCart} />
        <QuickActionGrid />
        <MemberCard
          cartCount={cartCount}
          item={memberItem}
          loyaltyPoints={3250}
        />
        <MobileDashboardNav />
      </div>
    </div>
  );
}

function MobileDashboardHeader() {
  return (
    <header className="mt-2 flex items-center justify-between">
      <Link className="flex items-center gap-3" href="/home">
        <AssetIcon
          alt="Sushi Bliss"
          className="rounded-full"
          size={48}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[18px] leading-[0.95] tracking-[0.34em] text-white">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <Link
        aria-label="Notifications"
        className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/52 shadow-[0_0_28px_rgba(202,164,93,0.12)] backdrop-blur-xl"
        href="/notifications"
      >
        <AssetIcon size={28} src={icons.bell} />
        <span className="absolute right-3 top-2.5 h-2.5 w-2.5 rounded-full bg-[var(--sb-red-bright)]" />
      </Link>
    </header>
  );
}

interface MobileSearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function MobileSearchBar({
  query,
  onQueryChange,
  onSubmit,
}: MobileSearchBarProps) {
  return (
    <form className="mt-6 grid grid-cols-[1fr_56px] gap-3" onSubmit={onSubmit}>
      <label className="flex h-14 items-center gap-3 rounded-[14px] border border-[var(--sb-border)] bg-black/52 px-4 backdrop-blur-xl">
        <AssetIcon size={23} src={icons.search} />
        <span className="sr-only">Search menu</span>
        <input
          className="h-full w-full bg-transparent text-[15px] text-white outline-none placeholder:text-[var(--sb-muted)]"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search menu..."
          value={query}
        />
      </label>
      <Link
        aria-label="Open filters"
        className="grid h-14 w-14 place-items-center rounded-[14px] border border-[var(--sb-border)] bg-black/52 backdrop-blur-xl"
        href="/menu"
      >
        <AssetIcon size={27} src={icons.settings} />
      </Link>
    </form>
  );
}

function MobileHeroCard() {
  return (
    <Link
      className="relative mt-4 block min-h-[190px] w-full overflow-hidden text-left"
      href="/menu"
    >
      <Image
        alt=""
        className="object-cover object-[72%_54%]"
        fill
        loading="eager"
        priority
        sizes="430px"
        src={featuredAssets.heroSushi.publicUrl}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.52)_42%,rgba(0,0,0,0.08)_75%),linear-gradient(180deg,rgba(0,0,0,0.54)_0%,rgba(0,0,0,0.1)_40%,rgba(0,0,0,0.74)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/45 to-transparent" />
      <div className="sb-wave-pattern absolute bottom-2 left-0 h-32 w-48 opacity-28" />
      <div className="relative z-10 flex min-h-[190px] flex-col justify-start px-1 py-7">
        <h2 className="editorial-title max-w-[340px] text-[27px] leading-[1.08] text-white min-[390px]:text-[30px]">
          Japanese Artistry.
          <span className="block text-[var(--sb-red-bright)]">
            Timeless Bliss.
          </span>
        </h2>
        <p className="mt-3 text-[15px] font-medium tracking-[0.04em] text-[var(--sb-gold)]">
          Authentic. Refined. Unforgettable.
        </p>
      </div>
    </Link>
  );
}

interface CategoryRailProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryRail({ activeCategory, onCategoryChange }: CategoryRailProps) {
  return (
    <div className="mt-4 grid grid-cols-4 rounded-[18px] border border-[var(--sb-border)] bg-black/72 p-1 shadow-[0_18px_42px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      {dashboardCategories.map(({ id, icon, label }) => {
        const active = activeCategory === id;
        return (
          <button
            className={`flex min-h-[62px] min-w-0 flex-col items-center justify-center gap-1 rounded-[13px] border px-1 uppercase transition min-[390px]:min-h-[70px] min-[390px]:rounded-[15px] ${
              active
                ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/28 text-[var(--sb-red-bright)] shadow-[0_0_28px_var(--sb-red-glow)]"
                : "border-transparent text-white/78 hover:text-[var(--sb-gold)]"
            }`}
            key={id}
            onClick={() => onCategoryChange(id)}
            type="button"
          >
            <AssetIcon
              className={active ? "brightness-125" : "opacity-82 grayscale"}
              size={21}
              src={icon}
            />
            <span className="block max-w-full truncate text-center text-[9px] leading-3">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

interface FeaturedMenuRailProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

function FeaturedMenuRail({ items, onAddToCart }: FeaturedMenuRailProps) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="editorial-title text-[20px] tracking-[0.12em] text-[var(--sb-gold)]">
          Featured Menu
        </h2>
        <Link
          aria-label="Explore menu"
          className="inline-flex min-h-10 items-center gap-1 rounded-full px-2 text-[15px] font-medium text-[var(--sb-red-bright)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href="/menu"
        >
          View All
          <ChevronIcon direction="right" size={18} />
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 min-[390px]:grid-cols-3">
        {items.slice(0, 3).map((item, index) => (
          <HomeMenuCard
            badge={
              index === 0 ? "Hot" : index === 1 ? "Popular" : "Chef's Specials"
            }
            item={item}
            key={item.id}
            onAddToCart={onAddToCart}
            priority={index < 3}
          />
        ))}
      </div>
    </section>
  );
}

function QuickActionGrid() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <Link
        className="red-glow-button flex min-h-[74px] items-center gap-2 rounded-[16px] px-3 text-left uppercase tracking-[0.04em] text-white min-[390px]:min-h-[82px] min-[390px]:gap-3 min-[390px]:rounded-[18px] min-[390px]:px-4"
        href="/reservations"
      >
        <AssetIcon size={26} src={icons.calendar} />
        <span className="min-w-0">
          <span className="editorial-title block text-[12px] leading-[1.15] min-[390px]:text-[13px]">
            Reserve a Table
          </span>
          <span className="mt-1 block text-[10px] leading-[1.25] normal-case tracking-normal text-white/75 min-[390px]:text-[11px]">
            Unforgettable dining awaits
          </span>
        </span>
      </Link>
      <Link
        className="flex min-h-[74px] items-center gap-2 rounded-[16px] border border-[var(--sb-border-strong)] bg-black/58 px-3 text-left uppercase tracking-[0.04em] text-[var(--sb-gold)] shadow-[0_0_24px_rgba(202,164,93,0.12)] min-[390px]:min-h-[82px] min-[390px]:gap-3 min-[390px]:rounded-[18px] min-[390px]:px-4"
        href="/menu"
      >
        <AssetIcon size={26} src={icons.bag} />
        <span className="min-w-0">
          <span className="editorial-title block text-[12px] leading-[1.15] min-[390px]:text-[13px]">
            Order Now
          </span>
          <span className="mt-1 block text-[10px] leading-[1.25] normal-case tracking-normal text-white/75 min-[390px]:text-[11px]">
            Sushi delivered to you
          </span>
        </span>
      </Link>
    </div>
  );
}

function MemberCard({
  cartCount,
  item,
  loyaltyPoints,
}: {
  cartCount: number;
  item: MenuItem;
  loyaltyPoints: number;
}) {
  const progressValue = Math.min(loyaltyPoints, 4000);

  return (
    <section className="relative mt-5 overflow-hidden rounded-[20px] border border-[var(--sb-gold)]/24 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.02)_38%,rgba(106,9,8,0.32))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_64px_rgba(0,0,0,0.42)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(215,168,79,0.2),transparent_68%)]"
      />
      <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_86px] gap-3">
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/32 bg-black/42 shadow-[0_0_24px_rgba(215,168,79,0.12)]">
              <AssetIcon size={40} src={icons.flower} />
            </div>
            <div className="min-w-0 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="editorial-title text-[16px] leading-none text-white">
                  Bliss Member
                </h2>
                <span className="rounded-full bg-[linear-gradient(180deg,var(--sb-gold-soft),var(--sb-gold))] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-black shadow-[0_0_18px_rgba(215,168,79,0.28)]">
                  Gold
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-5 text-white/70">
                <span className="font-semibold text-white">
                  {loyaltyPoints.toLocaleString()} pts
                </span>{" "}
                earned. 750 pts to Platinum.
              </p>
            </div>
          </div>
        </div>
        <div className="relative h-[92px] overflow-hidden rounded-[16px] border border-[var(--sb-gold)]/26 bg-black/42 shadow-[0_14px_36px_rgba(0,0,0,0.34)]">
          <Image
            alt=""
            className="object-cover"
            fill
            loading="lazy"
            sizes="86px"
            src={item.image.publicUrl}
          />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.36))]" />
        </div>
      </div>

      <div className="relative z-10 mt-4">
        <SegmentedProgressMeter
          ariaLabel="Loyalty tier progress"
          label="Gold progress"
          max={4000}
          value={progressValue}
          valueLabel={`${loyaltyPoints.toLocaleString()} / 4,000`}
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-[12px] leading-4 text-white/54">
            Priority drops, birthday omakase perks, and member-only offers.
          </span>
          <Link
            aria-label="View Benefits"
            className="flex h-10 shrink-0 items-center justify-center gap-1 rounded-full border border-[var(--sb-gold)]/28 bg-black/30 px-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold)] shadow-[0_0_18px_rgba(215,168,79,0.08)]"
            href="/loyalty"
          >
            Benefits
            <ChevronIcon direction="right" size={18} />
          </Link>
        </div>
      </div>
      <span className="sr-only">Cart contains {cartCount} items.</span>
    </section>
  );
}

function MobileDashboardNav() {
  return (
    <div className="mt-6">
      <BottomNavigation
        activeId="home"
        ariaLabel="Mobile home navigation"
        fixed={false}
      />
    </div>
  );
}
