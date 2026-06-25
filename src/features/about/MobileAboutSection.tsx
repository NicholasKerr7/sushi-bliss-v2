"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { appContent, brandContent } from "@/data/brand";
import { featuredAssets } from "@/data/assets";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { brand, icons } from "@/features/home/homeDashboardData";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import { classNames } from "@/lib/classNames";

const storyStats = [
  { label: "Nightly service", value: "7" },
  { label: "Chef courses", value: "12" },
  { label: "Member care", value: "24h" },
] as const;

/** Mobile editorial story page for the Sushi Bliss brand. */
export function MobileAboutSection() {
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const { unreadCount } = useNotifications();
  const primaryAmbience =
    featuredAssets.ambience[0]?.image || featuredAssets.heroSushi;
  const detailAmbience =
    featuredAssets.ambience[2]?.image || featuredAssets.heroSushi;

  return (
    <section
      className="relative min-h-dvh overflow-x-hidden bg-[#050607] px-4 pb-[236px] pt-5 text-white md:hidden"
      id="about"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_14%,rgba(239,47,37,0.18),transparent_30%),radial-gradient(circle_at_100%_8%,rgba(215,168,79,0.14),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0)_0%,#050607_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[url('/assets/gallery/elegant-japanese-inspired-dining-room-interior.webp')] bg-cover bg-center opacity-24"
      />

      <div className="mobile-frame relative z-10">
        <MobileAboutHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
          unreadNotificationCount={unreadCount}
        />

        <section className="mt-8">
          <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            About Sushi Bliss
          </p>
          <h1 className="editorial-title mt-3 text-[37px] uppercase leading-[0.96] text-white min-[390px]:text-[40px]">
            The
            <span className="block text-[var(--sb-red-bright)]">Story</span>
          </h1>
          <p className="mt-4 text-[16px] leading-6 text-white/62">
            {brandContent.tagline}, shaped for quiet service, precise sourcing,
            and chef-led hospitality.
          </p>
        </section>

        <MobileAboutPanel className="mt-6 overflow-hidden">
          <div className="relative min-h-[308px] p-5">
            <Image
              alt={primaryAmbience.alt || "Sushi Bliss dining room"}
              className="absolute inset-0 object-cover opacity-72"
              fill
              loading="eager"
              priority
              sizes="430px"
              src={primaryAmbience.publicUrl}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.88)_100%)]" />
            <div className="relative z-10 flex min-h-[268px] flex-col justify-end">
              <StatusBadge tone="premium">Nightly service</StatusBadge>
              <h2 className="editorial-title mt-4 text-[29px] uppercase leading-none text-white min-[390px]:text-[32px]">
                Modern sushi house
              </h2>
              <p className="mt-3 text-[15px] leading-6 text-white/62">
                A dark, polished dining room built around omakase pacing,
                premium photography, and member-aware service.
              </p>
            </div>
          </div>
        </MobileAboutPanel>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {storyStats.map((stat) => (
            <MobileAboutPanel className="p-3 text-center" key={stat.label}>
              <p className="font-mono text-[25px] text-[var(--sb-gold-soft)]">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-white/46">
                {stat.label}
              </p>
            </MobileAboutPanel>
          ))}
        </div>

        <MobileAboutPanel className="mt-4 p-5">
          <h2 className="text-[17px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
            Dining address
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-white/62">
            {appContent.location.label}
            <br />
            {appContent.location.street}
            <br />
            {appContent.location.postalLine}
          </p>
          <div className="mt-5 rounded-[14px] border border-white/10 bg-black/26 p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/42">
              Service
            </p>
            <p className="mt-2 text-[16px] font-semibold text-white">
              {appContent.hours.days}
            </p>
            <p className="mt-1 text-[14px] text-white/56">
              {appContent.hours.service}
            </p>
            <p className="mt-1 text-[12px] text-white/42">
              {appContent.hours.lastOrder}
            </p>
          </div>
        </MobileAboutPanel>

        <section className="mt-5">
          <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
            Standards
          </p>
          <div className="mt-3 grid gap-3">
            {appContent.benefits.map((benefit) => (
              <MobileAboutPanel className="p-4" key={benefit.id}>
                <StatusBadge tone="premium">{benefit.copy}</StatusBadge>
                <h2 className="mt-3 text-[17px] font-semibold text-white">
                  {benefit.title}
                </h2>
              </MobileAboutPanel>
            ))}
          </div>
        </section>

        <MobileAboutPanel className="mt-5 overflow-hidden">
          <div className="relative min-h-[176px]">
            <Image
              alt={detailAmbience.alt || "Chef counter dining room"}
              className="object-cover"
              fill
              sizes="430px"
              src={detailAmbience.publicUrl}
            />
          </div>
          <div className="p-5">
            <h2 className="text-[19px] font-semibold text-white">
              Hospitality standard
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-white/58">
              The app mirrors the dining room: quick ordering, clear
              reservations, visible preferences, and concierge support for
              details that need care.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                className="grid min-h-[50px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                href="/chefs"
              >
                Chefs
              </Link>
              <Link
                className="red-glow-button grid min-h-[50px] place-items-center rounded-[13px] border text-[12px]"
                href="/reservations"
              >
                Reserve
              </Link>
            </div>
          </div>
        </MobileAboutPanel>
      </div>

      <BottomNavigation activeId="home" ariaLabel="Mobile about navigation" />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}

function MobileAboutHeader({
  cartCount,
  onOpenCart,
  unreadNotificationCount,
}: {
  cartCount: number;
  onOpenCart: () => void;
  unreadNotificationCount: number;
}) {
  return (
    <header className="flex items-center justify-between">
      <Link
        className="flex min-w-0 items-center gap-3 rounded-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        href="/home"
      >
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          loading="eager"
          size={54}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[18px] leading-[0.95] tracking-[0.34em] text-white">
          Sushi
          <br />
          Bliss
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {cartCount > 0 ? (
          <button
            aria-label="Open cart"
            className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)]"
            onClick={onOpenCart}
            type="button"
          >
            <AssetIcon loading="eager" size={25} src={icons.cart} />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          </button>
        ) : null}
        <Link
          aria-label="Notifications"
          className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)]"
          href="/notifications"
        >
          <AssetIcon loading="eager" size={27} src={icons.bell} />
          {unreadNotificationCount > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red-bright)] px-1 text-[10px] font-bold text-white">
              {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}

function MobileAboutPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={classNames(
        "rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </section>
  );
}
