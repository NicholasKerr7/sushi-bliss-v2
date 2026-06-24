"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { ExploreDirectory } from "@/components/layout/ExploreDirectory";
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

const profilePreviewMarks: Record<string, string> = {
  "Account information": "ID",
  "Payment methods": "PM",
  "Preferences & security": "PS",
  "Saved addresses": "AD",
  "Upcoming reservation": "RS",
};

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
      <div className="mobile-frame relative z-10 pb-16">
        <MobileProfileHeader
          cartCount={cartCount}
          unreadNotificationCount={unreadNotificationCount}
          onOpenCart={onOpenCart}
        />

        <section className="mt-4 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-black/48 shadow-[0_24px_70px_rgba(0,0,0,0.42)] min-[390px]:mt-8 min-[390px]:rounded-[20px]">
          <div className="relative min-h-[194px] p-3.5 min-[390px]:min-h-[250px] min-[390px]:p-5">
            <Image
              alt=""
              className="absolute inset-0 object-cover object-[70%_50%] opacity-60"
              fill
              loading="eager"
              priority
              sizes="430px"
              src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.86)_100%)]" />
            <div className="relative z-10 flex min-h-[166px] flex-col justify-end min-[390px]:min-h-[210px]">
              <div className="flex items-end gap-2.5 min-[390px]:gap-4">
                <div className="relative h-[62px] w-[62px] shrink-0 min-[360px]:h-[70px] min-[360px]:w-[70px] min-[390px]:h-[96px] min-[390px]:w-[96px]">
                  <Image
                    alt=""
                    className="rounded-full border border-[var(--sb-gold)] object-cover"
                    fill
                    loading="eager"
                    priority
                    sizes="96px"
                    src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
                  />
                </div>
                <div className="min-w-0">
                  <p className="max-w-[152px] text-[9px] uppercase leading-[13px] tracking-[0.055em] text-[var(--sb-gold-soft)] min-[360px]:max-w-none min-[360px]:text-[11px] min-[360px]:leading-none min-[360px]:tracking-[0.1em]">
                    Bliss member - {profile.tier} tier
                  </p>
                  <h1 className="editorial-title mt-2 text-[24px] uppercase leading-none tracking-[0.03em] text-white min-[360px]:text-[28px] min-[390px]:text-[31px] min-[390px]:tracking-[0.05em]">
                    {profile.name}
                  </h1>
                  <p className="mt-2 text-[12px] leading-[17px] text-white/64 min-[390px]:text-[14px]">
                    Member since January 15, 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MobileProfilePanel className="mt-3 p-3.5 min-[390px]:mt-4 min-[390px]:p-4">
          <div className="flex items-center justify-between gap-3 min-[390px]:gap-4">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.11em] text-white/54 min-[390px]:text-[12px] min-[390px]:tracking-[0.13em]">
                Points balance
              </p>
              <p className="mt-1.5 font-mono text-[24px] leading-none text-[var(--sb-gold-soft)] min-[390px]:mt-2 min-[390px]:text-[32px]">
                {account.points.toLocaleString()}
              </p>
            </div>
            <Link
              className="inline-flex min-h-9 shrink-0 items-center rounded-full border border-[var(--sb-border)] px-3 text-[10px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:min-h-10 min-[390px]:px-4 min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
              href="/loyalty"
            >
              Benefits
            </Link>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-white/12 min-[390px]:mt-4 min-[390px]:h-2">
            <div
              className={classNames(
                "h-full rounded-full bg-[var(--sb-gold-soft)]",
                progressClassName,
              )}
            />
          </div>
          <p className="mt-2 text-[12px] text-white/52 min-[390px]:mt-3 min-[390px]:text-[13px]">
            {nextTier
              ? `${Math.max(nextTier.minimumPoints - account.lifetimePoints, 0).toLocaleString()} points to ${nextTier.label}`
              : "Top tier unlocked"}
          </p>
        </MobileProfilePanel>

        <section className="mt-3 grid grid-cols-4 gap-2 min-[390px]:mt-4">
          {quickActions.map((action) => (
            <Link
              className="flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-[13px] border border-[var(--sb-border)] bg-black/42 px-1 text-center text-[8.5px] uppercase tracking-[0.03em] text-white/72 min-[390px]:min-h-[82px] min-[390px]:gap-2 min-[390px]:rounded-[16px] min-[390px]:px-2 min-[390px]:text-[11px] min-[390px]:tracking-[0.06em]"
              href={action.href}
              key={action.label}
            >
              <AssetIcon size={21} src={action.icon} />
              {action.label}
            </Link>
          ))}
        </section>

        <section className="mt-3 grid grid-cols-3 gap-2 min-[390px]:mt-4">
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

        <ExploreDirectory variant="mobile" />

        <MobileProfilePanel className="mt-4 overflow-hidden">
          <ProfilePreviewHeader
            icon="/assets/icons/user-icon.png"
            label="Account information"
            onClick={() => onOpenSurface("account")}
          />
          <div className="px-4 pb-4">
            <p className="break-words text-[14px] leading-5 text-white min-[390px]:text-[17px]">
              {profile.email}
            </p>
            <p className="mt-2 text-[13px] text-white/58 min-[390px]:text-[15px]">
              {profile.phone}
            </p>
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
              <div className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-2.5 min-[390px]:grid-cols-[62px_minmax(0,1fr)] min-[390px]:gap-3">
                <span className="grid h-8 w-[52px] place-items-center rounded-[8px] border border-white/12 bg-white/8 text-[10px] font-black italic text-white min-[390px]:h-9 min-[390px]:w-[62px] min-[390px]:text-[12px]">
                  {getPaymentMark(defaultPayment)}
                </span>
                <p className="min-w-0 break-words text-[13px] leading-5 text-white/68 min-[390px]:text-[15px]">
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
    <div className="rounded-[13px] border border-[var(--sb-border)] bg-black/42 p-2 text-center min-[390px]:rounded-[15px] min-[390px]:p-3">
      <p className="font-mono text-[17px] leading-none text-[var(--sb-gold-soft)] min-[390px]:text-[23px]">
        {value}
      </p>
      <p className="mt-1 text-[9px] uppercase tracking-[0.04em] text-white/46 min-[390px]:text-[11px] min-[390px]:tracking-[0.08em]">
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
      <span className="flex min-w-0 items-center gap-2.5 min-[390px]:gap-3">
        <MobileProfileIconCircle
          className="h-10 w-10 min-[390px]:h-11 min-[390px]:w-11"
          icon={icon}
          mark={getProfilePreviewMark(label)}
          size={23}
        />
        <span className="min-w-0 break-words text-[12px] uppercase leading-4 tracking-[0.05em] text-[var(--sb-gold-soft)] min-[390px]:text-[15px] min-[390px]:tracking-[0.08em]">
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
    "flex min-h-[60px] w-full items-center justify-between gap-3 px-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:min-h-[68px] min-[390px]:gap-4 min-[390px]:px-4";

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

function getProfilePreviewMark(label: string) {
  const mappedMark = profilePreviewMarks[label];

  if (mappedMark) {
    return mappedMark;
  }

  const [firstWord = "", secondWord] = label.match(/[A-Za-z0-9]+/g) ?? [];

  if (!secondWord) {
    return firstWord.slice(0, 2).toUpperCase();
  }

  return `${firstWord[0]}${secondWord[0]}`.toUpperCase();
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
