"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, icons } from "@/features/home/homeDashboardData";
import { classNames } from "@/lib/classNames";
import type { Address, PaymentMethod } from "@/types/user";

export function MobileProfileHeader({
  cartCount,
  unreadNotificationCount,
  onOpenCart,
}: {
  cartCount: number;
  unreadNotificationCount: number;
  onOpenCart: () => void;
}) {
  return (
    <header className="flex items-center justify-between gap-2.5">
      <Link
        className="flex min-w-0 items-center gap-2 rounded-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:gap-3"
        href="/home"
      >
        <AssetIcon
          alt="Sushi Bliss"
          className="h-[42px] w-[42px] rounded-full min-[390px]:h-[54px] min-[390px]:w-[54px]"
          loading="eager"
          size={54}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[13px] leading-[0.95] tracking-[0.22em] text-white min-[390px]:text-[18px] min-[390px]:tracking-[0.34em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <div className="flex shrink-0 items-center gap-1.5 min-[390px]:gap-3">
        {cartCount > 0 ? (
          <button
            aria-label="Open cart"
            className="relative grid h-[42px] w-[42px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)] min-[390px]:h-[52px] min-[390px]:w-[52px]"
            onClick={onOpenCart}
            type="button"
          >
            <AssetIcon loading="eager" size={22} src={icons.cart} />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold">
              {cartCount}
            </span>
          </button>
        ) : null}
        <Link
          aria-label="Notifications"
          className="relative grid h-[42px] w-[42px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)] min-[390px]:h-[52px] min-[390px]:w-[52px]"
          href="/notifications"
        >
          <AssetIcon loading="eager" size={23} src={icons.bell} />
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

export function MobileProfileBackButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="grid h-[44px] w-[44px] place-items-center rounded-[12px] border border-[var(--sb-border)] bg-black/46 text-[30px] leading-none text-[var(--sb-gold-soft)] shadow-[0_0_24px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:h-[52px] min-[390px]:w-[52px] min-[390px]:rounded-[13px]"
      onClick={onClick}
      type="button"
    >
      <ChevronIcon direction="left" size={24} />
    </button>
  );
}

export function MobileProfilePanel({
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

export function MobileProfileIconCircle({
  className,
  icon,
  mark,
  size = 28,
}: {
  className?: string;
  icon?: string;
  mark?: string;
  size?: number;
}) {
  return (
    <span
      className={classNames(
        "grid h-[48px] w-[48px] shrink-0 place-items-center rounded-full border border-[var(--sb-border)] bg-black/34 min-[390px]:h-[56px] min-[390px]:w-[56px]",
        className,
      )}
    >
      {mark ? (
        <>
          <AssetIcon
            className="absolute opacity-20 brightness-125 contrast-125 saturate-150"
            size={size + 8}
            src={icon}
          />
          <span className="relative z-10 font-mono text-[11px] font-black uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
            {mark}
          </span>
        </>
      ) : (
        <AssetIcon
          className="brightness-125 contrast-125 saturate-150"
          size={size}
          src={icon}
        />
      )}
    </span>
  );
}

export function MobileProfileSwitch({
  checked,
  label,
  onCheckedChange,
}: {
  checked: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className={classNames(
        "relative h-7 w-[46px] shrink-0 rounded-full border border-white/12 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:h-8 min-[390px]:w-[52px]",
        checked ? "bg-[var(--sb-red)]" : "bg-white/16",
      )}
      onClick={() => onCheckedChange(!checked)}
      role="switch"
      type="button"
    >
      <span
        className={classNames(
          "absolute top-[3px] grid h-5 w-5 rounded-full bg-white transition min-[390px]:h-6 min-[390px]:w-6",
          checked ? "left-[22px] min-[390px]:left-[25px]" : "left-[3px]",
        )}
      />
    </button>
  );
}

export function formatAddressLine(address: Address) {
  return [
    address.line1,
    address.line2,
    address.city,
    `${address.region} ${address.postalCode}`,
  ]
    .filter(Boolean)
    .join(", ");
}

export function formatPaymentLabel(paymentMethod: PaymentMethod) {
  return `${paymentMethod.brand} ending ${paymentMethod.last4}`;
}

export function getPaymentMark(paymentMethod: PaymentMethod) {
  if (paymentMethod.brand === "American Express") return "AMEX";
  if (paymentMethod.brand === "Mastercard") return "MC";
  if (paymentMethod.brand === "Discover") return "DISC";

  return paymentMethod.brand.toUpperCase();
}
