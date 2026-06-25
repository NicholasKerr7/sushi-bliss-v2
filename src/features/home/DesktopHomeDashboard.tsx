"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { CarouselIndicator } from "@/components/ui/CarouselIndicator";
import { SegmentedProgressMeter } from "@/components/ui/SegmentedProgressMeter";
import { useAutoCarousel } from "@/hooks/useAutoCarousel";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

import { HomeMenuCard } from "./HomeMenuCard";
import {
  appContent,
  brand,
  chefAvatar,
  desktopNav,
  featuredAssets,
  icons,
} from "./homeDashboardData";

export function DesktopDashboardHeader({ cartCount }: { cartCount: number }) {
  return (
    <header className="hidden h-[88px] items-center border-b border-white/[0.06] px-[5.5vw] xl:flex">
      <Link
        aria-label="Sushi Bliss home"
        className="flex min-w-[220px] items-center gap-3 text-left text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sb-gold)] min-[1360px]:min-w-[250px] min-[1500px]:min-w-[270px] min-[1500px]:gap-4"
        href="/home"
      >
        <AssetIcon
          className="rounded-full"
          loading="eager"
          size={52}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[24px] leading-[0.88] tracking-[0.34em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <nav
        aria-label="Desktop primary"
        className="flex flex-1 items-center justify-center gap-5 min-[1360px]:gap-8 min-[1500px]:gap-11"
      >
        {desktopNav.map(([label, href], index) => (
          <Link
            className={`relative flex min-w-11 items-center justify-center whitespace-nowrap py-8 text-[12px] font-semibold uppercase text-white transition hover:text-[var(--sb-gold)] min-[1500px]:text-[13px] ${
              index === 0 ? "text-[var(--sb-red-bright)]" : ""
            }`}
            href={href}
            key={label}
          >
            {label}
            {index === 0 ? (
              <span className="absolute inset-x-0 bottom-[18px] h-px bg-[var(--sb-red-bright)]" />
            ) : null}
          </Link>
        ))}
      </nav>
      <div className="flex min-w-[250px] items-center justify-end gap-3 min-[1360px]:min-w-[290px] min-[1500px]:min-w-[330px] min-[1500px]:gap-5">
        <Link
          aria-label="Open cart"
          className="relative grid h-12 w-12 place-items-center text-[var(--sb-gold)]"
          href="/menu"
        >
          <AssetIcon size={34} src={icons.cart} />
          {cartCount > 0 ? (
            <span className="absolute right-0 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          ) : null}
        </Link>
        <Link
          aria-label="Open profile for Hiroshi Tanaka"
          className="flex items-center gap-3"
          href="/profile"
        >
          <Image
            alt=""
            className="h-14 w-14 rounded-full border border-[var(--sb-border)] object-cover"
            height={56}
            src={chefAvatar}
            width={56}
          />
          <span>
            <span className="block text-sm font-semibold text-white">
              Hiroshi Tanaka
            </span>
            <span className="block text-xs uppercase tracking-[0.12em] text-white/62">
              Bliss Member
            </span>
          </span>
          <ChevronIcon className="text-[var(--sb-gold)]" direction="down" />
        </Link>
      </div>
    </header>
  );
}

interface DesktopDashboardProps {
  items: MenuItem[];
  memberItem: MenuItem;
  specialItem: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const desktopHeroSlides = [
  {
    accent: "Bliss",
    description:
      "An unforgettable dining experience where tradition meets perfection.",
    eyebrow: "Timeless Japanese Artistry.",
    imageAlt: "Otoro nigiri presented on a dark luxury surface",
    imageClassName: "object-center",
    imageUrl: featuredAssets.heroSushi.publicUrl,
    title: "Sushi",
  },
  {
    accent: "Counter",
    description:
      "Seasonal chef selections, warm pacing, and intimate omakase service.",
    eyebrow: "Chef-Led Evenings.",
    imageAlt: "Premium sushi preparation still life",
    imageClassName: "object-center",
    imageUrl:
      featuredAssets.ambience[1]?.image.publicUrl ||
      "/assets/ambience/intimate-sushi-bar-dining-experience.webp",
    title: "Omakase",
  },
  {
    accent: "Pairings",
    description:
      "Rare sake, precise temperatures, and pours chosen for each course.",
    eyebrow: "Cellar Curated.",
    imageAlt: "Moonlit tea pairing still life with candlelight",
    imageClassName: "object-[50%_57%] brightness-[1.12] contrast-[1.05]",
    imageUrl: "/assets/editorial/moonlit-tea-pairing-still-life.webp",
    title: "Sake",
  },
  {
    accent: "Nights",
    description:
      "Dark wood, lantern glow, and a dining room designed for quiet celebration.",
    eyebrow: "Tokyo After Dark.",
    imageAlt: "Elegant sushi bar ambience at night",
    imageClassName: "object-center",
    imageUrl:
      featuredAssets.ambience[0]?.image.publicUrl ||
      "/assets/ambience/elegant-sushi-bar-ambience-at-night.webp",
    title: "Bliss",
  },
] as const;

export function DesktopDashboard({
  items,
  memberItem,
  specialItem,
  onAddToCart,
}: DesktopDashboardProps) {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const advanceHero = useCallback(() => {
    setActiveHeroIndex(
      (currentIndex) => (currentIndex + 1) % desktopHeroSlides.length,
    );
  }, []);
  const activeHero = desktopHeroSlides[activeHeroIndex] || desktopHeroSlides[0];

  useAutoCarousel({
    count: desktopHeroSlides.length,
    onAdvance: advanceHero,
    resetKey: activeHeroIndex,
  });

  return (
    <div className="hidden px-[3.2vw] pb-2 pt-0 xl:block xl:min-h-[calc(100svh-88px)]">
      <div className="overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-black/68 shadow-[0_30px_110px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
        <section className="relative min-h-[260px] overflow-hidden border-b border-[var(--sb-border)] px-8 py-4 xl:px-[6vw]">
          <Image
            alt={activeHero.imageAlt}
            className={classNames("object-cover", activeHero.imageClassName)}
            fill
            loading="eager"
            priority
            sizes="1200px"
            src={activeHero.imageUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.62)_34%,rgba(0,0,0,0.18)_72%,rgba(0,0,0,0.8)_100%)]" />
          <div className="relative z-10 grid min-h-[228px] grid-cols-1 gap-8 xl:grid-cols-[1fr_280px]">
            <div className="flex flex-col justify-center">
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--sb-gold)]">
                {activeHero.eyebrow}
              </p>
              <h1 className="editorial-title mt-3 text-[56px] leading-[0.9] text-white xl:text-[72px]">
                {activeHero.title}
                <span className="block text-[var(--sb-red-bright)]">
                  {activeHero.accent}
                </span>
              </h1>
              <p className="mt-4 max-w-sm text-base leading-6 text-white/78">
                {activeHero.description}
              </p>
              <div className="mt-6 flex gap-4">
                <Link
                  className="red-glow-button flex h-12 w-[205px] items-center justify-center rounded-[10px] text-xs font-semibold uppercase tracking-[0.16em] text-white"
                  href="/reservations"
                >
                  Reserve a Table
                  <span className="ml-3" aria-hidden="true">
                    <ChevronIcon direction="right" size={18} />
                  </span>
                </Link>
                <Link
                  className="flex h-12 w-[175px] items-center justify-center rounded-[10px] border border-[var(--sb-border)] bg-black/42 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold)]"
                  href="/menu"
                >
                  Order Now
                  <AssetIcon className="ml-3" size={20} src={icons.bag} />
                </Link>
              </div>
              <CarouselIndicator
                activeIndex={activeHeroIndex}
                ariaLabel="Desktop hero slides"
                className="mt-5"
                count={desktopHeroSlides.length}
                variant="progress"
                onSelect={setActiveHeroIndex}
              />
            </div>
            <DesktopInfoCard />
          </div>
        </section>

        <div className="grid gap-1.5 p-2 lg:grid-cols-12">
          <section className="rounded-[14px] border border-[var(--sb-border)] bg-black/42 p-3 lg:col-span-8">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-3 text-lg uppercase tracking-[0.12em] text-white">
                <AssetIcon size={24} src={icons.flower} />
                Featured Menu
              </h2>
              <Link
                aria-label="Explore menu"
                className="flex min-h-10 items-center gap-1 rounded-full px-2 text-xs uppercase tracking-[0.12em] text-[var(--sb-gold)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                href="/menu"
              >
                View Full Menu
                <ChevronIcon direction="right" size={18} />
              </Link>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {items.map((item, index) => (
                <HomeMenuCard
                  badge={
                    index === 0
                      ? "Nigiri"
                      : index === 1
                        ? "Hot"
                        : index === 2
                          ? "Special"
                          : "Sashimi"
                  }
                  item={item}
                  key={item.id}
                  onAddToCart={onAddToCart}
                  priority
                />
              ))}
            </div>
          </section>

          <DesktopReservationCard className="lg:col-span-4" />
          <DesktopRecentOrder className="lg:col-span-4" item={memberItem} />
          <DesktopRewardCard className="lg:col-span-4" />
          <DesktopChefSpecial className="lg:col-span-4" item={specialItem} />
        </div>
        <DesktopBenefitsStrip />
      </div>
    </div>
  );
}

function DesktopInfoCard() {
  const { hours, location } = appContent;

  return (
    <aside className="hidden self-center rounded-[14px] border border-[var(--sb-border)] bg-black/54 p-5 backdrop-blur-xl xl:block">
      <div className="flex gap-3">
        <AssetIcon size={25} src={icons.location} />
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-white">
            {location.city} · {location.country}
          </p>
          <p className="mt-2 text-sm leading-5 text-white/70">
            {location.street},
            <br />
            {location.postalLine}
            <br />
            {location.phone}
          </p>
        </div>
      </div>
      <div className="my-4 h-px bg-[var(--sb-border)]" />
      <div className="flex gap-3">
        <AssetIcon size={24} src={icons.clock} />
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-white">
            Hours
          </p>
          <p className="mt-2 text-sm leading-5 text-white/70">
            {hours.days}
            <br />
            {hours.service}
          </p>
        </div>
      </div>
      <Link
        className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-full border border-[var(--sb-border)] text-sm uppercase tracking-[0.14em] text-[var(--sb-gold)]"
        href="/locations"
      >
        View Details
        <ChevronIcon direction="right" size={18} />
      </Link>
    </aside>
  );
}

function DesktopReservationCard({ className = "" }: { className?: string }) {
  const { location } = appContent;

  return (
    <section
      className={`min-h-[236px] rounded-[14px] border border-[var(--sb-border)] bg-black/42 p-3 ${className}`}
    >
      <h2 className="flex items-center gap-3 text-lg uppercase tracking-[0.12em] text-white">
        <AssetIcon size={24} src={icons.flower} />
        Make a Reservation
      </h2>
      <div className="mt-3 grid grid-cols-[78px_minmax(0,1fr)_132px] overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-black/42">
        <div className="grid place-items-center border-r border-[var(--sb-border)] py-2 text-center">
          <span className="text-xs uppercase text-white/72">Sat</span>
          <span className="editorial-title text-3xl text-white">24</span>
          <span className="text-xs uppercase text-white/72">May</span>
        </div>
        <div className="min-w-0 px-4 py-3">
          <p className="text-xl text-white">7:00 PM</p>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-white/72">
            Sushi Bliss Downtown
            <br />
            {location.street}, {location.city}
          </p>
        </div>
        <Link
          className="flex min-h-11 items-center justify-center border-l border-[var(--sb-border)] px-3 text-sm text-[var(--sb-gold)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sb-gold"
          href="/reservations"
        >
          2 Guests
        </Link>
      </div>
      <Link
        className="red-glow-button mt-3 flex h-11 w-full items-center justify-center rounded-[10px] text-sm font-semibold uppercase tracking-[0.14em] text-white"
        href="/reservations"
      >
        Find a Table
      </Link>
      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-white/62">
        <span>4 Guests</span>
        <span>Table A7</span>
        <Link
          className="inline-flex min-h-10 items-center rounded-full border border-[var(--sb-border)] px-4 text-[var(--sb-red-bright)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href="/reservations"
        >
          Modify
        </Link>
      </div>
    </section>
  );
}

function DesktopRecentOrder({
  className = "",
  item,
}: {
  className?: string;
  item: MenuItem;
}) {
  return (
    <section
      className={`h-[154px] rounded-[14px] border border-[var(--sb-border)] bg-black/42 p-2.5 ${className}`}
    >
      <h2 className="text-base uppercase tracking-[0.12em] text-white">
        Recent Order
      </h2>
      <Link
        className="mt-2 grid w-full grid-cols-[96px_1fr_auto] items-center gap-3 rounded-[10px] border border-[var(--sb-border)] bg-black/42 p-2 text-left"
        href="/orders"
      >
        <div className="relative h-14 overflow-hidden rounded-[8px]">
          <Image
            alt=""
            className="pointer-events-none object-cover"
            fill
            loading="eager"
            sizes="128px"
            src={item.image.publicUrl}
          />
        </div>
        <span>
          <span className="block text-base text-white">Sushi Bliss Deluxe</span>
          <span className="mt-1 block text-sm text-white/58">
            May 10, 2024 · 5:50 PM
          </span>
          <span className="mt-1 block text-base text-[var(--sb-gold)]">
            $85.00{" "}
            <span className="ml-4 text-sm text-emerald-400">Delivered</span>
          </span>
        </span>
        <span className="text-[var(--sb-gold)]" aria-hidden="true">
          <ChevronIcon direction="right" size={18} />
        </span>
      </Link>
    </section>
  );
}

function DesktopRewardCard({ className = "" }: { className?: string }) {
  return (
    <section
      className={`rounded-[14px] border border-[var(--sb-border)] bg-black/42 p-2.5 ${className}`}
    >
      <h2 className="flex items-center gap-3 text-base uppercase tracking-[0.12em] text-[var(--sb-gold)]">
        <AssetIcon size={24} src={icons.flower} />
        Bliss Rewards
      </h2>
      <p className="text-lg uppercase text-[var(--sb-gold)]">Gold Tier</p>
      <p className="text-base text-white">You have 3,250 points</p>
      <p className="text-xs text-white/62">750 pts to reach Platinum</p>
      <SegmentedProgressMeter
        ariaLabel="Desktop rewards tier progress"
        className="mt-2"
        max={4000}
        size="compact"
        value={3250}
      />
      <Link
        className="mt-2 flex h-10 items-center justify-center rounded-[10px] border border-[var(--sb-border)] text-xs uppercase tracking-[0.14em] text-[var(--sb-gold)]"
        href="/loyalty"
      >
        View Benefits
      </Link>
    </section>
  );
}

function DesktopChefSpecial({
  className = "",
  item,
}: {
  className?: string;
  item: MenuItem;
}) {
  return (
    <section
      className={`relative h-[154px] overflow-hidden rounded-[14px] border border-[var(--sb-border)] bg-black/42 p-2.5 ${className}`}
    >
      <h2 className="flex items-center gap-3 text-base uppercase tracking-[0.12em] text-white">
        <AssetIcon size={24} src={icons.flower} />
        Chef&apos;s Special
      </h2>
      <Link
        className="mt-3 grid grid-cols-[minmax(136px,0.9fr)_1fr_auto] items-center gap-4 text-left"
        href="/menu"
      >
        <div className="relative h-14 overflow-hidden rounded-[9px]">
          <Image
            alt=""
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="260px"
            src={item.image.publicUrl}
          />
        </div>
        <span>
          <span className="block text-base text-white">{item.name}</span>
          <span className="mt-1 block line-clamp-2 text-xs leading-4 text-white/72">
            {item.description}
          </span>
          <span className="mt-1 block text-base text-[var(--sb-gold)]">
            {formatMoney(item.priceCents)}
          </span>
        </span>
        <span className="text-[var(--sb-gold)]" aria-hidden="true">
          <ChevronIcon direction="right" size={18} />
        </span>
      </Link>
    </section>
  );
}

function DesktopBenefitsStrip() {
  return (
    <div className="mx-2 mb-2 grid grid-cols-4 rounded-[14px] border border-[var(--sb-border)] bg-white/[0.04]">
      {appContent.benefits.map((benefit) => (
        <div
          className="flex items-center justify-center gap-3 border-r border-[var(--sb-border)] px-6 py-2 last:border-r-0"
          key={benefit.id}
        >
          <AssetIcon
            size={28}
            src={icons[benefit.icon as keyof typeof icons]}
          />
          <span>
            <span className="block text-[13px] uppercase tracking-[0.16em] text-white/82">
              {benefit.title}
            </span>
            <span className="block text-xs text-white/58">{benefit.copy}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
