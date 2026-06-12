"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";

interface MobileGiftHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

/** Shared mobile gift header with brand, cart, and alerts access. */
export function MobileGiftHeader({
  cartCount,
  onOpenCart,
}: MobileGiftHeaderProps) {
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
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold">
              {cartCount}
            </span>
          </button>
        ) : null}
        <Link
          aria-label="Notifications"
          className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)]"
          href="/notifications"
        >
          <AssetIcon loading="eager" size={27} src={icons.bell} />
          <span className="absolute right-2.5 top-2 h-3 w-3 rounded-full bg-[var(--sb-red-bright)]" />
        </Link>
      </div>
    </header>
  );
}

export function MobileGiftBackButton({
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
      <span aria-hidden="true">&lsaquo;</span>
    </button>
  );
}

export function MobileGiftPanel({
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

export function MobileGiftTextField({
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "date" | "email" | "text";
  value: string;
}) {
  return (
    <label className="block">
      <span className="text-[12px] uppercase tracking-[0.1em] text-white/46">
        {label}
      </span>
      <input
        className="mt-2 h-12 w-full rounded-[12px] border border-white/10 bg-black/28 px-4 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[var(--sb-gold)]"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  );
}

export function MobileGiftChoice({
  active,
  children,
  label,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={classNames(
        "grid min-h-[58px] w-full grid-cols-[1fr_26px] items-center gap-3 rounded-[13px] border px-4 text-left transition",
        active
          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/12 text-white shadow-[0_0_24px_rgb(239_47_37_/_0.18)]"
          : "border-[var(--sb-border)] bg-black/26 text-white/68",
      )}
      onClick={onClick}
      type="button"
    >
      <span>
        <span className="block text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
          {label}
        </span>
        <span className="mt-1 block text-[14px] leading-5">{children}</span>
      </span>
      <span
        aria-hidden="true"
        className={classNames(
          "grid h-[26px] w-[26px] place-items-center rounded-full border",
          active
            ? "border-[var(--sb-red-bright)]"
            : "border-[var(--sb-border-strong)]",
        )}
      >
        {active ? (
          <span className="h-[12px] w-[12px] rounded-full bg-[var(--sb-red-bright)]" />
        ) : null}
      </span>
    </button>
  );
}
