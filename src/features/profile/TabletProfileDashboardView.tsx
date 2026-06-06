"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { Button } from "@/components/ui/Button";
import { locations } from "@/data/locations";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { getNextTier, getTierProgress } from "@/lib/loyalty";
import type { LoyaltyAccount } from "@/types/loyalty";
import type { Reservation } from "@/types/reservation";
import type { PaymentMethod, UserProfile } from "@/types/user";

import { TabletProfileHeader } from "./TabletProfileHeader";

interface TabletProfileDashboardViewProps {
  account: LoyaltyAccount;
  activeOrderCount: number;
  cartCount: number;
  profile: UserProfile;
  upcomingReservations: Reservation[];
  onOpenCart: () => void;
  onOpenSettings: () => void;
}

const quickActions = [
  {
    href: "/reservations",
    icon: icons.calendar,
    label: "Make a reservation",
    primary: true,
  },
  { href: "/menu", icon: icons.bag, label: "Order online", primary: false },
  { href: "/loyalty", icon: icons.star, label: "View loyalty", primary: false },
  {
    href: "/loyalty",
    icon: "/assets/icons/qr-code-icon.png",
    label: "Scan to earn",
    primary: false,
  },
  {
    href: "/gifts",
    icon: "/assets/icons/gift-icon.png",
    label: "Gift cards",
    primary: false,
  },
] as const;

const activityItems = [
  {
    amount: "+350 pts",
    icon: "/assets/icons/crossed-knives-icon.png",
    label: "Sushi Bliss Downtown",
    meta: "Dinner for 2 - May 20, 2024",
    tone: "positive",
  },
  {
    amount: "-1,000 pts",
    icon: "/assets/icons/gift-icon.png",
    label: "Reward Redeemed",
    meta: "Spicy Tuna Roll",
    tone: "negative",
  },
  {
    amount: "+250 pts",
    icon: "/assets/icons/crossed-knives-icon.png",
    label: "Lunch at Sushi Bliss",
    meta: "May 15, 2024",
    tone: "positive",
  },
  {
    amount: "+500 pts",
    icon: icons.star,
    label: "Bonus Points",
    meta: "Birthday Reward",
    tone: "positive",
  },
] as const;

const settingsLinks = [
  {
    description: "Manage your personal details",
    icon: icons.profile,
    label: "Account Information",
  },
  {
    description: "Manage your privacy settings",
    icon: "/assets/icons/chef-crest-icon.png",
    label: "Privacy & Security",
  },
  {
    description: "Customize how we reach you",
    icon: icons.bell,
    label: "Notifications",
  },
  {
    description: "View billing history and manage payments",
    icon: icons.cart,
    label: "Payment & Billing",
  },
] as const;

function formatAddress(address: UserProfile["addresses"][number]) {
  return [
    address.line1,
    address.line2,
    address.city,
    `${address.region} ${address.postalCode}`,
  ]
    .filter(Boolean)
    .join(", ");
}

function getCardLabel(paymentMethod: PaymentMethod) {
  if (paymentMethod.brand === "American Express") {
    return "AMEX";
  }

  return paymentMethod.brand;
}

function getCardClassName(paymentMethod: PaymentMethod) {
  if (paymentMethod.brand === "Visa") {
    return "bg-[#123fb4] text-white";
  }

  if (paymentMethod.brand === "Mastercard") {
    return "bg-[linear-gradient(90deg,#e2181d_0_48%,#f59b22_52%_100%)] text-transparent";
  }

  return "bg-[#1478c8] text-white";
}

function getProgressCells(progress: number) {
  const filledCells = Math.max(0, Math.min(Math.round(progress / 10), 10));

  return Array.from({ length: 10 }, (_, index) => index < filledCells);
}

function TabletPaymentMark({
  paymentMethod,
}: {
  paymentMethod: PaymentMethod;
}) {
  return (
    <span
      aria-label={paymentMethod.brand}
      className={classNames(
        "grid h-7 w-12 place-items-center rounded-[4px] text-[11px] font-black italic",
        getCardClassName(paymentMethod),
      )}
    >
      {paymentMethod.brand === "Mastercard" ? "" : getCardLabel(paymentMethod)}
    </span>
  );
}

export function TabletProfileDashboardView({
  account,
  activeOrderCount,
  cartCount,
  profile,
  upcomingReservations,
  onOpenCart,
  onOpenSettings,
}: TabletProfileDashboardViewProps) {
  const [statusMessage, setStatusMessage] = useState("");
  const nextTier = getNextTier(account.lifetimePoints);
  const progress = getTierProgress(account);
  const pointsToNextTier = nextTier
    ? Math.max(nextTier.minimumPoints - account.lifetimePoints, 0)
    : 0;
  const upcomingReservation = upcomingReservations[0];
  const reservationLocation = upcomingReservation
    ? locations.find(
        (location) => location.id === upcomingReservation.locationId,
      )
    : locations[0];

  return (
    <section
      className="flex h-dvh min-h-dvh flex-col overflow-hidden bg-[#050607] px-[18px] pb-3 pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pb-4 min-[1080px]:pt-3"
      id="profile"
    >
      <TabletProfileHeader
        cartCount={cartCount}
        profile={profile}
        section="dashboard"
        onOpenCart={onOpenCart}
      />

      <main className="mx-auto w-full max-w-[1034px]">
        <section className="mt-3 grid min-h-[142px] grid-cols-[142px_minmax(0,1fr)_230px] items-center gap-5 rounded-[14px] border border-white/10 bg-white/[0.035] p-4 lg:min-h-[178px] lg:grid-cols-[170px_minmax(0,1fr)_300px] min-[1080px]:mt-4 min-[1080px]:min-h-[194px] min-[1080px]:grid-cols-[180px_minmax(0,1fr)_320px] min-[1080px]:gap-7 min-[1080px]:p-5">
          <div className="relative mx-auto h-[112px] w-[112px] lg:h-[150px] lg:w-[150px] min-[1080px]:h-[164px] min-[1080px]:w-[164px]">
            <Image
              alt=""
              className="rounded-full border border-[var(--sb-gold)] object-cover"
              fill
              priority
              sizes="164px"
              src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
            />
            <button
              aria-label="Update profile photo"
              className="absolute bottom-0 right-0 grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)] bg-[#090909] text-[var(--sb-gold-soft)] shadow-[0_0_20px_rgba(215,160,75,0.25)]"
              onClick={() =>
                setStatusMessage(
                  "Profile photo upload is ready for storage wiring.",
                )
              }
              type="button"
            >
              <AssetIcon size={22} src="/assets/icons/user-settings-icon.png" />
            </button>
          </div>

          <div className="min-w-0">
            <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)] lg:text-[15px]">
              Bliss member - {profile.tier} tier
            </p>
            <h1 className="editorial-title mt-2 text-[34px] uppercase leading-none tracking-[0.05em] text-white lg:text-[42px] min-[1080px]:text-[48px]">
              {profile.name}
            </h1>
            <p className="mt-2 text-[13px] text-white/72 lg:text-[16px]">
              Member since January 15, 2024
            </p>
            <div className="mt-4 flex flex-wrap gap-2 lg:gap-3">
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-[var(--sb-gold)]/34 bg-black/24 px-4 text-[13px] text-[var(--sb-gold-soft)]">
                <AssetIcon size={18} src={icons.star} />
                {account.points.toLocaleString()} pts
              </span>
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-[var(--sb-gold)]/34 bg-black/24 px-4 text-[13px] text-[var(--sb-gold-soft)]">
                <AssetIcon
                  size={18}
                  src="/assets/icons/golden-ticket-icon.png"
                />
                {profile.tier} Tier
              </span>
              <span className="hidden h-9 items-center gap-2 rounded-full border border-[var(--sb-gold)]/34 bg-black/24 px-4 text-[13px] text-[var(--sb-gold-soft)] min-[1080px]:inline-flex">
                <AssetIcon size={18} src={icons.bag} />
                {activeOrderCount} Active
              </span>
            </div>
            {statusMessage ? (
              <p className="mt-2 text-[12px] font-semibold text-[var(--sb-gold-soft)]">
                {statusMessage}
              </p>
            ) : null}
          </div>

          <div className="hidden lg:block">
            <div className="flex items-center justify-between gap-3 text-[13px] uppercase tracking-[0.12em] text-white/70">
              <span>{pointsToNextTier.toLocaleString()} pts to platinum</span>
              <span>
                {account.lifetimePoints.toLocaleString()} /{" "}
                {nextTier?.minimumPoints.toLocaleString() || "Max"}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-10 gap-1">
              {getProgressCells(progress).map((filled, index) => (
                <span
                  className={classNames(
                    "h-2 rounded-full",
                    filled ? "bg-[var(--sb-gold-soft)]" : "bg-white/12",
                  )}
                  key={`profile-tier-${index}`}
                />
              ))}
            </div>
            <Button
              className="mt-7 h-[48px] w-full rounded-[10px] uppercase tracking-[0.08em]"
              href="/loyalty"
              variant="secondary"
            >
              View benefits
            </Button>
          </div>
        </section>

        <section className="mt-3 rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:mt-4">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)] min-[1080px]:text-[16px]">
            Quick actions
          </p>
          <div className="mt-3 grid grid-cols-5 gap-2 min-[1080px]:mt-5 min-[1080px]:gap-5">
            {quickActions.map((action) => (
              <Link
                className={classNames(
                  "flex min-h-[74px] flex-col items-center justify-center gap-2 rounded-[12px] border px-2 text-center text-[11px] uppercase leading-4 text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold lg:min-h-[80px] lg:text-[13px] min-[1080px]:min-h-[78px]",
                  action.primary
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/24 shadow-[0_0_28px_rgba(226,23,29,0.45)]"
                    : "border-white/10 bg-black/24 hover:border-[var(--sb-gold)]/35",
                )}
                href={action.href}
                key={action.label}
              >
                <AssetIcon size={28} src={action.icon} />
                {action.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-3 grid grid-cols-2 gap-3 min-[1080px]:mt-4 min-[1080px]:gap-5">
          <article className="min-h-[218px] rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:min-h-[230px]">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[1080px]:text-[16px]">
                <AssetIcon size={22} src={icons.location} />
                Saved addresses
              </h2>
              <button
                className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                onClick={onOpenSettings}
                type="button"
              >
                View all &gt;
              </button>
            </div>
            <div className="mt-4 overflow-hidden rounded-[12px] border border-white/10">
              {profile.addresses.slice(0, 2).map((address) => (
                <div
                  className="flex min-h-[62px] items-center justify-between gap-3 border-b border-white/10 px-4 py-3 last:border-b-0 min-[1080px]:min-h-[58px]"
                  key={address.id}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {address.isDefault ? (
                        <span className="rounded-[6px] border border-[var(--sb-gold)]/40 px-2 py-0.5 text-[10px] text-[var(--sb-gold-soft)]">
                          Default
                        </span>
                      ) : null}
                      <p className="truncate text-[13px] font-semibold text-white min-[1080px]:text-[16px]">
                        {address.label}
                      </p>
                    </div>
                    <p className="mt-1 truncate text-[11px] text-white/52 min-[1080px]:text-[13px]">
                      {formatAddress(address)}
                    </p>
                  </div>
                  <button
                    aria-label={`Manage ${address.label}`}
                    className="text-[var(--sb-gold-soft)]"
                    onClick={onOpenSettings}
                    type="button"
                  >
                    ...
                  </button>
                </div>
              ))}
            </div>
            <button
              className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--sb-gold)]/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[1080px]:h-10 min-[1080px]:text-[14px]"
              onClick={onOpenSettings}
              type="button"
            >
              + Add new address
            </button>
          </article>

          <article className="min-h-[218px] rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:min-h-[230px]">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[1080px]:text-[16px]">
                <AssetIcon size={22} src={icons.cart} />
                Payment methods
              </h2>
              <button
                className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                onClick={onOpenSettings}
                type="button"
              >
                View all &gt;
              </button>
            </div>
            <div className="mt-4 grid gap-2 min-[1080px]:gap-3">
              {profile.paymentMethods.slice(0, 3).map((paymentMethod) => (
                <div
                  className="flex h-[44px] items-center justify-between rounded-[10px] border border-white/10 px-3 min-[1080px]:h-[48px]"
                  key={paymentMethod.id}
                >
                  <div className="flex items-center gap-3">
                    <TabletPaymentMark paymentMethod={paymentMethod} />
                    <span className="text-[13px] text-white/82 min-[1080px]:text-[16px]">
                      .... {paymentMethod.last4}
                    </span>
                    {paymentMethod.isDefault ? (
                      <span className="rounded-[6px] border border-[var(--sb-gold)]/40 px-2 py-0.5 text-[10px] text-[var(--sb-gold-soft)]">
                        Default
                      </span>
                    ) : null}
                  </div>
                  <button
                    aria-label={`Manage ${paymentMethod.brand} ending ${paymentMethod.last4}`}
                    className="text-[var(--sb-gold-soft)]"
                    onClick={onOpenSettings}
                    type="button"
                  >
                    ...
                  </button>
                </div>
              ))}
            </div>
            <button
              className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--sb-gold)]/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[1080px]:h-10 min-[1080px]:text-[14px]"
              onClick={onOpenSettings}
              type="button"
            >
              + Add payment method
            </button>
          </article>
        </section>

        <section className="mt-4 hidden grid-cols-2 gap-5 min-[1080px]:grid">
          <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Recent activity
              </h2>
              <Link
                className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                href="/loyalty"
              >
                View all &gt;
              </Link>
            </div>
            <div className="mt-4 grid gap-0 overflow-hidden rounded-[12px] border border-white/10">
              {activityItems.map((item) => (
                <div
                  className="grid min-h-[50px] grid-cols-[40px_minmax(0,1fr)_86px] items-center gap-3 border-b border-white/10 px-4 py-2 last:border-b-0"
                  key={item.label}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-gold)]/30 bg-black/24">
                    <AssetIcon size={22} src={item.icon} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="mt-1 truncate text-[12px] text-white/52">
                      {item.meta}
                    </p>
                  </div>
                  <span
                    className={classNames(
                      "text-right font-mono text-[14px]",
                      item.tone === "positive"
                        ? "text-[var(--sb-gold-soft)]"
                        : "text-[var(--sb-red-bright)]",
                    )}
                  >
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Upcoming reservation
              </h2>
              <Link
                className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                href="/reservations"
              >
                View details &gt;
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-[150px_minmax(0,1fr)] overflow-hidden rounded-[12px] border border-white/10">
              <div className="relative min-h-[122px]">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="150px"
                  src={reservationLocation?.imageUrl || locations[0].imageUrl}
                />
              </div>
              <div className="grid grid-cols-[74px_minmax(0,1fr)]">
                <div className="grid place-items-center border-r border-white/10 text-center">
                  <span>
                    <span className="block text-[12px] uppercase text-white/58">
                      Fri
                    </span>
                    <span className="editorial-title block text-[36px] leading-none text-white">
                      24
                    </span>
                    <span className="block text-[12px] uppercase text-white/58">
                      May
                    </span>
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-[15px] font-semibold text-white">
                    7:00 PM
                  </p>
                  <p className="mt-1 text-[13px] text-white/58">
                    {upcomingReservation?.partySize || 2} Guests
                  </p>
                  <p className="mt-4 border-t border-white/10 pt-3 text-[14px] font-semibold text-white">
                    {reservationLocation?.name || "Sushi Bliss Downtown"}
                  </p>
                  <p className="mt-1 text-[12px] text-white/52">
                    {reservationLocation?.address || "123 Kai Street, Tokyo"}
                  </p>
                  <span className="mt-3 inline-flex rounded-full border border-[var(--sb-gold)]/34 px-3 py-1 text-[12px] text-[var(--sb-gold-soft)]">
                    Chef&apos;s Omakase Experience
                  </span>
                </div>
              </div>
            </div>
            <Button
              className="red-glow-button mt-3 h-[40px] w-full rounded-[10px] uppercase tracking-[0.08em]"
              href="/reservations"
            >
              Manage reservation
            </Button>
          </article>
        </section>

        <section className="mt-4 hidden rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:block">
          <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Preferences & settings
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {settingsLinks.map((item) => (
              <button
                className="grid min-h-[48px] grid-cols-[42px_minmax(0,1fr)_20px] items-center gap-3 rounded-[10px] border border-white/10 bg-black/20 px-4 text-left transition hover:border-[var(--sb-gold)]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                key={item.label}
                onClick={onOpenSettings}
                type="button"
              >
                <AssetIcon size={26} src={item.icon} />
                <span>
                  <span className="block text-[15px] font-semibold text-white">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[12px] text-white/52">
                    {item.description}
                  </span>
                </span>
                <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
                  &gt;
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <TabletBottomNavigation
        activeId="profile"
        ariaLabel="Tablet profile navigation"
      />
    </section>
  );
}
