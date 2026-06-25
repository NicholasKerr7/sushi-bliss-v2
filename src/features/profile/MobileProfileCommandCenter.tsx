"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/homeDashboardData";
import { classNames } from "@/lib/classNames";

interface MobileProfileCommandCenterProps {
  activeOrderCount: number;
  favoriteCount: number;
  unreadNotificationCount: number;
  upcomingReservationCount: number;
  onOpenPreferences: () => void;
}

/** Groups live profile shortcuts without duplicating account state logic. */
export function MobileProfileCommandCenter({
  activeOrderCount,
  favoriteCount,
  unreadNotificationCount,
  upcomingReservationCount,
  onOpenPreferences,
}: MobileProfileCommandCenterProps) {
  return (
    <section
      aria-labelledby="mobile-profile-command-center-title"
      className="mt-4"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
            Member hub
          </p>
          <h2
            className="mt-1 text-[20px] font-semibold text-white"
            id="mobile-profile-command-center-title"
          >
            Dining controls
          </h2>
        </div>
        <Link
          className="inline-flex min-h-10 items-center rounded-full border border-[var(--sb-border)] bg-black/36 px-4 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href="/support"
        >
          Concierge
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 min-[390px]:gap-3">
        <CommandLink
          accent={unreadNotificationCount > 0 ? "red" : "gold"}
          href="/notifications"
          icon={icons.bell}
          label="Inbox"
          value={`${unreadNotificationCount} unread`}
        />
        <CommandLink
          href="/favorites"
          icon={icons.star}
          label="Favorites"
          value={`${favoriteCount} saved`}
        />
        <CommandLink
          href="/orders"
          icon={icons.bag}
          label="Orders"
          value={`${activeOrderCount} active`}
        />
        <CommandLink
          href="/reservations"
          icon={icons.calendar}
          label="Bookings"
          value={`${upcomingReservationCount} upcoming`}
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 min-[390px]:gap-3">
        <CommandButton
          icon={icons.settings}
          label="Settings"
          value="Preferences"
          onClick={onOpenPreferences}
        />
        <CommandLink
          href="/recently-viewed"
          icon={icons.clock}
          label="Viewed"
          value="History"
        />
        <CommandLink
          href="/offers"
          icon="/assets/icons/golden-ticket-icon.png"
          label="Offers"
          value="Member drops"
        />
        <CommandLink
          href="/support"
          icon="/assets/icons/headset-icon.png"
          label="Support"
          value="Concierge"
        />
      </div>
    </section>
  );
}

function CommandLink({
  accent = "gold",
  href,
  icon,
  label,
  value,
}: {
  accent?: "gold" | "red";
  href: string;
  icon?: string;
  label: string;
  value: string;
}) {
  return (
    <Link
      className={getCommandTileClassName(accent)}
      href={href}
      aria-label={`${label}: ${value}`}
    >
      <CommandTileContent icon={icon} label={label} value={value} />
    </Link>
  );
}

function CommandButton({
  icon,
  label,
  onClick,
  value,
}: {
  icon?: string;
  label: string;
  onClick: () => void;
  value: string;
}) {
  return (
    <button
      aria-label={`${label}: ${value}`}
      className={getCommandTileClassName("gold")}
      onClick={onClick}
      type="button"
    >
      <CommandTileContent icon={icon} label={label} value={value} />
    </button>
  );
}

function CommandTileContent({
  icon,
  label,
  value,
}: {
  icon?: string;
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <>
      <span className="flex items-center justify-between gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-border)] bg-black/42 min-[390px]:h-11 min-[390px]:w-11">
          <AssetIcon size={22} src={icon} />
        </span>
        <span aria-hidden="true" className="text-[24px] text-white/34">
          <ChevronIcon direction="right" size={18} />
        </span>
      </span>
      <span className="mt-4 block truncate text-[11px] uppercase tracking-[0.06em] text-white/48 min-[390px]:mt-5 min-[390px]:text-[13px] min-[390px]:tracking-[0.1em]">
        {label}
      </span>
      <span className="mt-1 line-clamp-2 block break-words text-[15px] font-semibold leading-5 text-white min-[390px]:text-[18px] min-[390px]:leading-6">
        {value}
      </span>
    </>
  );
}

function getCommandTileClassName(accent: "gold" | "red") {
  return classNames(
    "relative min-h-[112px] overflow-hidden rounded-[15px] border bg-black/42 p-3.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:min-h-[128px] min-[390px]:rounded-[17px] min-[390px]:p-4",
    accent === "red"
      ? "border-[var(--sb-red-bright)]/48 shadow-[0_0_28px_rgba(239,47,37,0.18),inset_0_1px_0_rgba(255,255,255,0.08)]"
      : "border-[var(--sb-border)]",
  );
}
