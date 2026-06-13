"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { locations } from "@/data/locations";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { getNextTier, getTierProgress } from "@/lib/loyalty";
import type { LoyaltyAccount } from "@/types/loyalty";
import type { Reservation } from "@/types/reservation";
import type { UserProfile } from "@/types/user";

import {
  formatAddressLine,
  formatPaymentLabel,
  getPaymentMark,
  MobileProfileHeader,
  MobileProfileIconCircle,
  MobileProfilePanel,
} from "./MobileProfilePrimitives";
import { MobileProfileCommandCenter } from "./MobileProfileCommandCenter";

export type MobileProfileSurface =
  | "account"
  | "addresses"
  | "dashboard"
  | "payments"
  | "preferences";

interface MobileProfileDashboardViewProps {
  account: LoyaltyAccount;
  activeOrderCount: number;
  cartCount: number;
  favoriteCount: number;
  profile: UserProfile;
  unreadNotificationCount: number;
  upcomingReservations: Reservation[];
  onOpenCart: () => void;
  onOpenSurface: (surface: MobileProfileSurface) => void;
}

const quickActions = [
  { href: "/reservations", icon: icons.calendar, label: "Reserve" },
  { href: "/menu", icon: icons.bag, label: "Order" },
  { href: "/loyalty", icon: icons.star, label: "Rewards" },
  { href: "/gifts", icon: "/assets/icons/gift-icon.png", label: "Gifts" },
] as const;

/** Mobile member dashboard modeled after the account reference cards. */
export function MobileProfileDashboardView({
  account,
  activeOrderCount,
  cartCount,
  favoriteCount,
  profile,
  unreadNotificationCount,
  upcomingReservations,
  onOpenCart,
  onOpenSurface,
}: MobileProfileDashboardViewProps) {
  const nextTier = getNextTier(account.lifetimePoints);
  const progress = getTierProgress(account);
  const progressClassName = getProgressWidthClass(progress);
  const defaultAddress = profile.addresses.find((address) => address.isDefault);
  const defaultPayment = profile.paymentMethods.find(
    (paymentMethod) => paymentMethod.isDefault,
  );
  const upcomingReservation = upcomingReservations[0] || null;
  const reservationLocation = upcomingReservation
    ? locations.find(
        (location) => location.id === upcomingReservation.locationId,
      )
    : null;

  return (
    <>
      <div className="relative z-10 mx-auto max-w-[430px] pb-16">
        <MobileProfileHeader
          cartCount={cartCount}
          unreadNotificationCount={unreadNotificationCount}
          onOpenCart={onOpenCart}
        />

        <section className="mt-8 overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-black/48 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
          <div className="relative min-h-[250px] p-5">
            <Image
              alt=""
              className="absolute inset-0 object-cover object-[70%_50%] opacity-60"
              fill
              priority
              sizes="430px"
              src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.86)_100%)]" />
            <div className="relative z-10 flex min-h-[210px] flex-col justify-end">
              <div className="flex items-end gap-4">
                <div className="relative h-[96px] w-[96px] shrink-0">
                  <Image
                    alt=""
                    className="rounded-full border border-[var(--sb-gold)] object-cover"
                    fill
                    priority
                    sizes="96px"
                    src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
                  />
                </div>
                <div className="min-w-0">
                  <p className="whitespace-nowrap text-[11px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
                    Bliss member - {profile.tier} tier
                  </p>
                  <h1 className="editorial-title mt-2 text-[31px] uppercase leading-none tracking-[0.05em] text-white">
                    {profile.name}
                  </h1>
                  <p className="mt-2 text-[14px] text-white/64">
                    Member since January 15, 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MobileProfilePanel className="mt-4 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.13em] text-white/54">
                Points balance
              </p>
              <p className="mt-2 font-mono text-[32px] text-[var(--sb-gold-soft)]">
                {account.points.toLocaleString()}
              </p>
            </div>
            <Link
              className="rounded-full border border-[var(--sb-border)] px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              href="/loyalty"
            >
              Benefits
            </Link>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/12">
            <div
              className={classNames(
                "h-full rounded-full bg-[var(--sb-gold-soft)]",
                progressClassName,
              )}
            />
          </div>
          <p className="mt-3 text-[13px] text-white/52">
            {nextTier
              ? `${Math.max(nextTier.minimumPoints - account.lifetimePoints, 0).toLocaleString()} points to ${nextTier.label}`
              : "Top tier unlocked"}
          </p>
        </MobileProfilePanel>

        <section className="mt-4 grid grid-cols-4 gap-2">
          {quickActions.map((action) => (
            <Link
              className="flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-[16px] border border-[var(--sb-border)] bg-black/42 px-2 text-center text-[11px] uppercase tracking-[0.06em] text-white/72"
              href={action.href}
              key={action.label}
            >
              <AssetIcon size={28} src={action.icon} />
              {action.label}
            </Link>
          ))}
        </section>

        <section className="mt-4 grid grid-cols-3 gap-2">
          <MobileProfileMetric label="Orders" value={activeOrderCount} />
          <MobileProfileMetric
            label="Bookings"
            value={upcomingReservations.length}
          />
          <MobileProfileMetric
            label="Cards"
            value={profile.paymentMethods.length}
          />
        </section>

        <MobileProfileCommandCenter
          activeOrderCount={activeOrderCount}
          favoriteCount={favoriteCount}
          unreadNotificationCount={unreadNotificationCount}
          upcomingReservationCount={upcomingReservations.length}
          onOpenPreferences={() => onOpenSurface("preferences")}
        />

        <MobileProfilePanel className="mt-4 overflow-hidden">
          <ProfilePreviewHeader
            icon="/assets/icons/user-icon.png"
            label="Account information"
            onClick={() => onOpenSurface("account")}
          />
          <div className="px-4 pb-4">
            <p className="text-[17px] text-white">{profile.email}</p>
            <p className="mt-2 text-[15px] text-white/58">{profile.phone}</p>
          </div>
        </MobileProfilePanel>

        <MobileProfilePanel className="mt-4 overflow-hidden">
          <ProfilePreviewHeader
            icon="/assets/icons/map-pin-icon.png"
            label="Saved addresses"
            onClick={() => onOpenSurface("addresses")}
          />
          <div className="px-4 pb-4">
            {defaultAddress ? (
              <p className="text-[15px] leading-6 text-white/68">
                {formatAddressLine(defaultAddress)}
              </p>
            ) : (
              <p className="text-[15px] text-white/58">
                Add a delivery address for checkout.
              </p>
            )}
          </div>
        </MobileProfilePanel>

        <MobileProfilePanel className="mt-4 overflow-hidden">
          <ProfilePreviewHeader
            icon="/assets/icons/shopping-cart-icon.png"
            label="Payment methods"
            onClick={() => onOpenSurface("payments")}
          />
          <div className="px-4 pb-4">
            {defaultPayment ? (
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-[62px] place-items-center rounded-[8px] border border-white/12 bg-white/8 text-[12px] font-black italic text-white">
                  {getPaymentMark(defaultPayment)}
                </span>
                <p className="text-[15px] text-white/68">
                  {formatPaymentLabel(defaultPayment)}
                </p>
              </div>
            ) : (
              <p className="text-[15px] text-white/58">
                Add a payment method before checkout.
              </p>
            )}
          </div>
        </MobileProfilePanel>

        <MobileProfilePanel className="mt-4 overflow-hidden">
          <ProfilePreviewHeader
            href="/reservations"
            icon="/assets/icons/calendar-icon.png"
            label="Upcoming reservation"
          />
          <div className="px-4 pb-4">
            {upcomingReservation ? (
              <p className="text-[15px] leading-6 text-white/68">
                {reservationLocation?.name || "Sushi Bliss"} -{" "}
                {upcomingReservation.partySize} guests
              </p>
            ) : (
              <p className="text-[15px] text-white/58">
                No upcoming reservations.
              </p>
            )}
          </div>
        </MobileProfilePanel>

        <MobileProfilePanel className="mt-4 overflow-hidden">
          <ProfilePreviewHeader
            icon="/assets/icons/user-settings-icon.png"
            label="Preferences & security"
            onClick={() => onOpenSurface("preferences")}
          />
          <div className="grid divide-y divide-white/10 px-4 pb-2">
            <p className="py-3 text-[15px] text-white/64">
              {profile.preferences.dietaryTags.join(", ")}
            </p>
            <p className="py-3 text-[15px] capitalize text-white/64">
              Preferred {profile.preferences.fulfillmentMode}
            </p>
          </div>
        </MobileProfilePanel>
      </div>

      <BottomNavigation
        activeId="profile"
        ariaLabel="Mobile profile navigation"
      />
    </>
  );
}

function MobileProfileMetric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[15px] border border-[var(--sb-border)] bg-black/42 p-3 text-center">
      <p className="font-mono text-[23px] text-[var(--sb-gold-soft)]">
        {value}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-white/46">
        {label}
      </p>
    </div>
  );
}

function ProfilePreviewHeader({
  href,
  icon,
  label,
  onClick,
}: {
  href?: string;
  icon?: string;
  label: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      <span className="flex min-w-0 items-center gap-3">
        <MobileProfileIconCircle className="h-11 w-11" icon={icon} size={23} />
        <span className="text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          {label}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="text-[28px] text-[var(--sb-gold-soft)]"
      >
        <ChevronIcon direction="right" size={18} />
      </span>
    </>
  );

  const className =
    "flex min-h-[68px] w-full items-center justify-between gap-4 px-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]";

  if (href) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} type="button">
      {content}
    </button>
  );
}

function getProgressWidthClass(progress: number) {
  if (progress >= 95) return "w-full";
  if (progress >= 85) return "w-11/12";
  if (progress >= 75) return "w-10/12";
  if (progress >= 65) return "w-8/12";
  if (progress >= 55) return "w-7/12";
  if (progress >= 45) return "w-6/12";
  if (progress >= 35) return "w-5/12";
  if (progress >= 25) return "w-4/12";
  if (progress >= 15) return "w-3/12";
  if (progress > 0) return "w-2/12";

  return "w-0";
}
