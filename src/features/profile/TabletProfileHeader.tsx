"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import type { UserProfile } from "@/types/user";

interface TabletProfileHeaderProps {
  cartCount: number;
  profile: UserProfile;
  section: "dashboard" | "account";
  onOpenCart: () => void;
}

const dashboardLinks = [
  { href: "/home", icon: icons.home, label: "Home" },
  { href: "/menu", icon: icons.menu, label: "Menu" },
  { href: "/reservations", icon: icons.calendar, label: "Reservations" },
  { href: "/menu", icon: icons.bag, label: "Order Online" },
  { href: "/loyalty", icon: icons.star, label: "Loyalty" },
] as const;

const accountLinks = [
  ["Home", "/home"],
  ["Menu", "/menu"],
  ["Reservations", "/reservations"],
  ["Order Online", "/menu"],
  ["Loyalty", "/loyalty"],
  ["About Us", "/about"],
  ["Account", "/profile"],
] as const;

export function TabletProfileHeader({
  cartCount,
  profile,
  section,
  onOpenCart,
}: TabletProfileHeaderProps) {
  return (
    <header className="mt-1 grid h-[64px] grid-cols-[150px_minmax(0,1fr)_146px] items-center gap-2 lg:h-[82px] lg:grid-cols-[190px_minmax(0,1fr)_252px] min-[1080px]:grid-cols-[210px_minmax(0,1fr)_300px]">
      <Link className="flex items-center gap-3" href="/home">
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          size={section === "account" ? 58 : 66}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[17px] uppercase leading-[1.02] tracking-[0.32em] text-white lg:text-[21px] min-[1080px]:text-[24px]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>

      {section === "dashboard" ? (
        <nav
          aria-label="Profile dashboard sections"
          className="mx-auto grid w-full max-w-[560px] grid-cols-5 gap-1"
        >
          {dashboardLinks.map((item) => (
            <Link
              className="flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-[10px] text-[10px] uppercase tracking-[0.02em] text-white/84 transition hover:text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold lg:text-[12px]"
              href={item.href}
              key={item.label}
            >
              <AssetIcon
                className="h-[18px] w-[18px] lg:h-[24px] lg:w-[24px]"
                src={item.icon}
              />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          ))}
        </nav>
      ) : (
        <nav
          aria-label="Account settings sections"
          className="mx-auto hidden w-full max-w-[620px] grid-cols-7 items-center text-center text-[12px] uppercase tracking-[0.02em] text-white/84 lg:grid"
        >
          {accountLinks.map(([label, href]) => {
            const active = label === "Account";

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={classNames(
                  "relative flex h-[64px] items-center justify-center transition hover:text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                  active ? "text-[var(--sb-red-bright)]" : "",
                )}
                href={href}
                key={label}
              >
                {label}
                {active ? (
                  <span className="absolute bottom-0 h-px w-10 bg-[var(--sb-red-bright)] shadow-[0_0_18px_rgba(226,23,29,0.9)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      )}

      <div className="flex items-center justify-end gap-2 lg:gap-4">
        <button
          aria-label={`Open cart with ${cartCount} items`}
          className="relative grid h-10 w-10 place-items-center text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold lg:h-11 lg:w-11"
          onClick={onOpenCart}
          type="button"
        >
          <AssetIcon size={30} src={icons.cart} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
            {cartCount}
          </span>
        </button>
        <Link className="flex items-center gap-3" href="/profile">
          <Image
            alt=""
            className="h-10 w-10 rounded-full border border-[var(--sb-border)] object-cover lg:h-[52px] lg:w-[52px]"
            height={52}
            src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
            width={52}
          />
          <span className="hidden text-left min-[1080px]:block">
            <span className="block text-[13px] font-semibold text-white">
              {profile.name}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.12em] text-white/52">
              Bliss member
            </span>
          </span>
        </Link>
        <span
          aria-hidden="true"
          className="hidden text-[var(--sb-gold-soft)] lg:inline"
        >
          v
        </span>
      </div>
    </header>
  );
}
