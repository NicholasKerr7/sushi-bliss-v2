"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, icons } from "@/features/home/homeDashboardData";
import { classNames } from "@/lib/classNames";
import type { UserProfile } from "@/types/user";

const accountNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["order", "Order Online", "/menu"],
  ["loyalty", "Loyalty", "/loyalty"],
  ["about", "About Us", "/about"],
  ["account", "Account", "/profile"],
] as const;

interface TabletProfileAccountTopNavProps {
  cartCount: number;
  profile: UserProfile;
  onOpenCart: () => void;
}

/** Top navigation used by the tablet account settings screen. */
export function TabletProfileAccountTopNav({
  cartCount,
  profile,
  onOpenCart,
}: TabletProfileAccountTopNavProps) {
  return (
    <header className="border-b border-white/[0.08] bg-[#050607]/98">
      <div className="mx-auto grid h-[77px] max-w-[1086px] grid-cols-[178px_minmax(0,1fr)_274px] items-center px-6">
        <Link
          className="flex items-center gap-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="/home"
        >
          <AssetIcon
            className="rounded-full"
            loading="eager"
            size={52}
            src={brand.assets.floralEmblem.publicUrl}
          />
          <span className="editorial-title text-[18px] uppercase leading-[0.92] tracking-[0.28em]">
            Sushi
            <br />
            Bliss
          </span>
        </Link>

        <nav
          aria-label="Tablet account primary"
          className="flex items-center justify-center gap-6"
        >
          {accountNavItems.map(([id, label, href]) => {
            const isActive = id === "account";

            return (
              <Link
                className={classNames(
                  "relative flex h-[77px] min-w-11 items-center justify-center text-[12px] font-semibold uppercase transition hover:text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold",
                  isActive ? "text-[var(--sb-red-bright)]" : "text-white",
                )}
                href={href}
                key={id}
              >
                {label}
                {isActive ? (
                  <span className="absolute inset-x-0 bottom-[3px] h-px bg-[var(--sb-red-bright)] shadow-[0_0_18px_var(--sb-red-glow)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <button
            aria-label={`Open cart with ${cartCount} items`}
            className="relative grid h-10 w-11 place-items-center text-[var(--sb-gold)] transition hover:text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            onClick={onOpenCart}
            type="button"
          >
            <AssetIcon loading="eager" size={30} src={icons.cart} />
            {cartCount > 0 ? (
              <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>

          <Link
            className="flex min-w-11 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/profile"
          >
            <Image
              alt=""
              className="h-11 w-11 rounded-full border border-[var(--sb-border)] object-cover"
              height={44}
              loading="eager"
              priority
              src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
              width={44}
            />
            <span>
              <span className="block text-[13px] font-semibold text-white">
                {profile.name}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.12em] text-white/62">
                Bliss Member
              </span>
            </span>
            <ChevronIcon
              className="text-[var(--sb-gold)]"
              direction="down"
              size={16}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
