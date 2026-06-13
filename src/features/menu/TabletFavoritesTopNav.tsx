"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, chefAvatar, icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";

const tabletFavoritesNavItems = [
  ["home", "Home", "/home"],
  ["menu", "Menu", "/menu"],
  ["reservations", "Reservations", "/reservations"],
  ["favorites", "Favorites", "/favorites"],
  ["loyalty", "Loyalty", "/loyalty"],
  ["about", "About Us", "/about"],
] as const;

interface TabletFavoritesTopNavProps {
  cartCount: number;
  onOpenCart: () => void;
}

/** Renders the desktop-like tablet chrome used by the favorites reference. */
export function TabletFavoritesTopNav({
  cartCount,
  onOpenCart,
}: TabletFavoritesTopNavProps) {
  return (
    <header className="border-b border-white/[0.08] bg-[#050607]/98">
      <div className="mx-auto grid h-[89px] max-w-[1086px] grid-cols-[178px_minmax(0,1fr)_274px] items-center px-7">
        <Link
          className="flex items-center gap-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
          href="/home"
        >
          <AssetIcon
            className="rounded-full"
            loading="eager"
            size={53}
            src={brand.assets.floralEmblem.publicUrl}
          />
          <span className="editorial-title text-[20px] uppercase leading-[0.92] tracking-[0.28em]">
            Sushi
            <br />
            Bliss
          </span>
        </Link>

        <nav
          aria-label="Tablet favorites primary"
          className="flex items-center justify-center gap-6"
        >
          {tabletFavoritesNavItems.map(([id, label, href]) => {
            const isActive = id === "favorites";

            return (
              <Link
                className={classNames(
                  "relative flex h-[89px] items-center text-[13px] font-semibold uppercase transition hover:text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold",
                  isActive ? "text-[var(--sb-red-bright)]" : "text-white",
                )}
                href={href}
                key={id}
              >
                {label}
                {isActive ? (
                  <span className="absolute inset-x-0 bottom-[15px] h-px bg-[var(--sb-red-bright)] shadow-[0_0_18px_var(--sb-red-glow)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-5">
          <button
            aria-label="Open cart"
            className="relative grid h-11 w-11 place-items-center text-[var(--sb-gold)] transition hover:text-[var(--sb-gold-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            onClick={onOpenCart}
            type="button"
          >
            <AssetIcon loading="eager" size={31} src={icons.cart} />
            {cartCount > 0 ? (
              <span className="absolute right-0 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>

          <Link
            className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sb-gold"
            href="/profile"
          >
            <Image
              alt=""
              className="h-12 w-12 rounded-full border border-[var(--sb-border)] object-cover"
              height={48}
              priority
              src={chefAvatar}
              width={48}
            />
            <span>
              <span className="block text-sm font-semibold text-white">
                Hiroshi Tanaka
              </span>
              <span className="block text-xs uppercase tracking-[0.12em] text-white/62">
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
