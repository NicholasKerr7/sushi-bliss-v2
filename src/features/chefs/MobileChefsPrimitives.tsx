"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";

interface MobileChefsHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  unreadNotificationCount: number;
}

/** Shared mobile chefs header with brand, cart, and alerts access. */
export function MobileChefsHeader({
  cartCount,
  onOpenCart,
  unreadNotificationCount,
}: MobileChefsHeaderProps) {
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

export function MobileChefsBackButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="grid h-[52px] w-[52px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/46 text-[30px] leading-none text-[var(--sb-gold-soft)] shadow-[0_0_24px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
      onClick={onClick}
      type="button"
    >
      <ChevronIcon direction="left" size={24} />
    </button>
  );
}

export function MobileChefsPanel({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      className={classNames(
        "rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl",
        className,
      )}
      id={id}
    >
      {children}
    </section>
  );
}

export function MobileChefIcon({
  className,
  icon,
  size = 28,
}: {
  className?: string;
  icon?: string;
  size?: number;
}) {
  return (
    <span
      className={classNames(
        "grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full border border-[var(--sb-border)] bg-black/34",
        className,
      )}
    >
      <AssetIcon size={size} src={icon} />
    </span>
  );
}
