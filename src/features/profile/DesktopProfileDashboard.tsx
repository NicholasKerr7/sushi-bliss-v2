"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { ExploreDirectory } from "@/components/layout/ExploreDirectory";
import { Button } from "@/components/ui/Button";
import { DesktopBenefitStrip } from "@/features/menu/DesktopMenuChrome";
import { classNames } from "@/lib/classNames";
import type { LoyaltyAccount } from "@/types/loyalty";
import type { Reservation } from "@/types/reservation";
import type { UserProfile } from "@/types/user";

const dashboardTabs = [
  {
    id: "overview",
    label: "Overview",
    icon: "/assets/icons/calendar-icon.png",
  },
  {
    id: "reservations",
    label: "Reservations",
    icon: "/assets/icons/golden-ticket-icon.png",
    href: "/reservations",
  },
  {
    id: "orders",
    label: "Orders",
    icon: "/assets/icons/takeaway-bag-icon.png",
    href: "/orders",
  },
  {
    id: "loyalty",
    label: "Loyalty",
    icon: "/assets/icons/floral-emblem-icon.png",
    href: "/loyalty",
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: "/assets/icons/user-icon.png",
    opensSettings: true,
  },
  {
    id: "settings",
    label: "Settings",
    icon: "/assets/icons/user-settings-icon.png",
    opensSettings: true,
  },
] as const;

const diningPreferences = [
  ["Preferred Seating", "Sushi Bar"],
  ["Occasion", "Birthday, Anniversary"],
  ["Ambiance", "Quiet, Intimate"],
  ["Service Preference", "Standard"],
] as const;

const recentActivity = [
  [
    "Reservation Confirmed",
    "May 20, 2024 - 7:00 PM",
    "Sushi Bliss Downtown",
    "/reservations",
  ],
  [
    "Order Delivered",
    "May 18, 2024 - 6:30 PM",
    "Order #SB240518-001",
    "/orders",
  ],
  [
    "Points Earned",
    "May 18, 2024 - +350 PTS",
    "Dinner at Sushi Bliss",
    "/loyalty",
  ],
  [
    "Reward Redeemed",
    "May 15, 2024 - -1,000 PTS",
    "Spicy Tuna Roll",
    "/loyalty",
  ],
] as const;

function getProgressWidthClass(progress: number) {
  if (progress >= 90) {
    return "w-[90%]";
  }

  if (progress >= 75) {
    return "w-[75%]";
  }

  if (progress >= 60) {
    return "w-[60%]";
  }

  if (progress >= 45) {
    return "w-[45%]";
  }

  if (progress >= 30) {
    return "w-[30%]";
  }

  return "w-[15%]";
}

export function DesktopProfileDashboard({
  account,
  activeOrderCount,
  message,
  profile,
  progress,
  upcomingReservation,
  onOpenSettings,
}: {
  account: LoyaltyAccount;
  activeOrderCount: number;
  message: string;
  profile: UserProfile;
  progress: number;
  upcomingReservation?: Reservation;
  onOpenSettings: () => void;
}) {
  return (
    <main className="mx-auto max-w-[1672px] px-7 pb-5 pt-3">
      <div className="overflow-hidden rounded-[24px] border border-[var(--sb-border)] bg-[#07090a] shadow-[0_30px_90px_rgba(0,0,0,0.54)]">
        <section className="relative grid min-h-[210px] grid-cols-[190px_minmax(0,1fr)_286px] items-center gap-7 border-b border-white/10 px-8">
          <Image
            alt=""
            className="object-cover object-[68%_46%] opacity-72"
            fill
            priority
            sizes="1600px"
            src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,10,0.98),rgba(7,9,10,0.82)_38%,rgba(7,9,10,0.25)_70%,rgba(7,9,10,0.94))]" />
          <div className="relative z-10">
            <Image
              alt=""
              className="rounded-full border border-[var(--sb-gold)] object-cover"
              height={150}
              priority
              src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
              width={150}
            />
          </div>
          <div className="relative z-10">
            <p className="text-[15px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Welcome back
            </p>
            <h1 className="editorial-title mt-2 text-[38px] uppercase tracking-[0.08em]">
              {profile.name}
              <span className="ml-4 rounded-full border border-[var(--sb-gold)]/38 px-3 py-1 align-middle text-[12px] text-[var(--sb-gold-soft)]">
                Bliss member
              </span>
            </h1>
            <div className="mt-3 grid max-w-[460px] gap-1.5 text-[14px] text-white/72">
              <p>{profile.email}</p>
              <p>{profile.phone}</p>
            </div>
            <div className="mt-4 grid max-w-[460px] grid-cols-2 gap-8 text-[15px]">
              <p>
                <span className="block text-white/48">Member Since</span>
                <span className="mt-1 block text-[20px] text-white">
                  Jan 15, 2024
                </span>
              </p>
              <p className="border-l border-white/18 pl-8">
                <span className="block text-white/48">Member ID</span>
                <span className="mt-1 block text-[20px] text-white">
                  {account.memberCode.replace("SB-GOLD-", "SB")}
                </span>
              </p>
            </div>
          </div>
          <LoyaltyStatusCard account={account} progress={progress} />
        </section>

        <nav
          className="grid grid-cols-6 border-b border-white/10 bg-black/28"
          aria-label="Profile dashboard tabs"
        >
          {dashboardTabs.map((item) => {
            const tabClassName = classNames(
              "flex min-h-[54px] items-center justify-center gap-3 border-l border-white/8 text-[13px] uppercase tracking-[0.08em] transition first:border-l-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--sb-gold)] disabled:cursor-default disabled:opacity-100",
              item.id === "overview"
                ? "bg-white/[0.025] text-[var(--sb-red-bright)]"
                : "text-white/72 hover:text-white",
            );

            if ("href" in item) {
              return (
                <Link className={tabClassName} href={item.href} key={item.id}>
                  <AssetIcon size={20} src={item.icon} />
                  {item.label}
                </Link>
              );
            }

            return (
              <button
                aria-current={item.id === "overview" ? "page" : undefined}
                aria-pressed={item.id === "overview"}
                className={tabClassName}
                disabled={item.id === "overview"}
                key={item.id}
                onClick={"opensSettings" in item ? onOpenSettings : undefined}
                type="button"
              >
                <AssetIcon size={20} src={item.icon} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {message ? (
          <p className="mx-6 mt-5 rounded-[12px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/8 px-4 py-3 text-[14px] text-[var(--sb-gold-soft)]">
            {message}
          </p>
        ) : null}

        <section className="grid grid-cols-4 gap-3 p-4">
          <SavedAddressesCard
            profile={profile}
            onOpenSettings={onOpenSettings}
          />
          <PaymentMethodsCard
            profile={profile}
            onOpenSettings={onOpenSettings}
          />
          <DiningPreferencesCard onOpenSettings={onOpenSettings} />
          <DietaryPreferencesCard
            profile={profile}
            onOpenSettings={onOpenSettings}
          />
        </section>

        <section className="grid grid-cols-[0.48fr_0.52fr] gap-4 px-4 pb-4">
          <UpcomingReservationCard
            activeOrderCount={activeOrderCount}
            reservation={upcomingReservation}
          />
          <RecentActivityCard />
        </section>

        <div className="px-4 pb-4">
          <ExploreDirectory variant="desktop" />
        </div>

        <div className="px-4 pb-4">
          <DesktopBenefitStrip />
        </div>
      </div>
    </main>
  );
}

function LoyaltyStatusCard({
  account,
  progress,
}: {
  account: LoyaltyAccount;
  progress: number;
}) {
  return (
    <article className="relative z-10 rounded-[16px] border border-[var(--sb-border)] bg-black/58 p-5">
      <div className="flex items-center gap-4">
        <AssetIcon size={48} src="/assets/icons/floral-emblem-icon.png" />
        <div>
          <p className="text-[13px] uppercase tracking-[0.1em] text-white/72">
            Bliss member
          </p>
          <p className="editorial-title mt-1 text-[18px] uppercase text-[var(--sb-gold-soft)]">
            {account.tier} tier
          </p>
        </div>
      </div>
      <p className="mt-5 text-[13px] uppercase tracking-[0.08em] text-white/54">
        Points balance
      </p>
      <p className="mt-2 font-mono text-[32px] text-white">
        {account.points.toLocaleString()}{" "}
        <span className="text-[16px]">PTS</span>
      </p>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <span
          className={classNames(
            "block h-full rounded-full bg-[var(--sb-gold)]",
            getProgressWidthClass(progress),
          )}
        />
      </div>
      <Link
        className="mt-4 flex h-9 w-full items-center justify-center rounded-[10px] border border-[var(--sb-gold)]/38 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        href="/loyalty"
      >
        View benefits
      </Link>
    </article>
  );
}

function SavedAddressesCard({
  profile,
  onOpenSettings,
}: {
  profile: UserProfile;
  onOpenSettings: () => void;
}) {
  return (
    <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-3.5">
      <CardTitle
        icon="/assets/icons/map-pin-icon.png"
        title="Saved addresses"
      />
      <div className="mt-3 space-y-2">
        {profile.addresses.slice(0, 2).map((address) => (
          <div
            className="rounded-[10px] border border-white/10 bg-black/24 p-2.5"
            key={address.id}
          >
            <p className="flex items-center justify-between text-[13px] text-white">
              {address.label}
              {address.isDefault ? (
                <span className="rounded-full border border-[var(--sb-gold)]/32 px-2 py-0.5 text-[10px] uppercase text-[var(--sb-gold-soft)]">
                  Default
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-[12px] leading-5 text-white/58">
              {address.line1}, {address.city}
              <br />
              {address.region}, {address.postalCode}
            </p>
          </div>
        ))}
      </div>
      <button
        className="mt-2.5 h-8 w-full rounded-[9px] border border-white/10 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onOpenSettings}
        type="button"
      >
        + Add new address
      </button>
    </article>
  );
}

function PaymentMethodsCard({
  profile,
  onOpenSettings,
}: {
  profile: UserProfile;
  onOpenSettings: () => void;
}) {
  return (
    <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-3.5">
      <CardTitle
        icon="/assets/icons/credit-card-icon.png"
        title="Payment methods"
      />
      <div className="mt-3 space-y-2">
        {profile.paymentMethods.slice(0, 2).map((method) => (
          <div
            className="grid grid-cols-[58px_1fr] items-center gap-3 rounded-[10px] border border-white/10 bg-black/24 p-2.5"
            key={method.id}
          >
            <span className="grid h-11 place-items-center rounded-[8px] border border-white/10 font-mono text-[12px] text-white">
              {method.brand === "Mastercard" ? "MC" : method.brand}
            </span>
            <p className="text-[13px] text-white">
              {method.brand} **** {method.last4}
              <span className="mt-1 block text-[12px] text-white/54">
                Expires {method.expiresAt}
              </span>
            </p>
          </div>
        ))}
      </div>
      <button
        className="mt-2.5 h-8 w-full rounded-[9px] border border-white/10 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onOpenSettings}
        type="button"
      >
        + Add payment method
      </button>
    </article>
  );
}

function DiningPreferencesCard({
  onOpenSettings,
}: {
  onOpenSettings: () => void;
}) {
  return (
    <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-3.5">
      <CardTitle
        icon="/assets/icons/crossed-knives-icon.png"
        title="Dining preferences"
      />
      <div className="mt-3 overflow-hidden rounded-[10px] border border-white/10">
        {diningPreferences.map(([label, value]) => (
          <p
            className="flex min-h-[36px] items-center justify-between border-b border-white/10 px-3 text-[12px] last:border-b-0"
            key={label}
          >
            <span className="text-white/58">{label}</span>
            <span className="text-white">{value}</span>
          </p>
        ))}
      </div>
      <button
        className="mt-2.5 h-8 w-full rounded-[9px] border border-white/10 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onOpenSettings}
        type="button"
      >
        Edit preferences
      </button>
    </article>
  );
}

function DietaryPreferencesCard({
  profile,
  onOpenSettings,
}: {
  profile: UserProfile;
  onOpenSettings: () => void;
}) {
  const tags = profile.preferences.dietaryTags.length
    ? profile.preferences.dietaryTags
    : ["No Preference"];

  return (
    <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-3.5">
      <CardTitle
        icon="/assets/icons/vegetarian-sushi-icon.webp"
        title="Dietary preferences"
      />
      <div className="mt-3 overflow-hidden rounded-[10px] border border-white/10">
        {["Japanese Dietary", "Allergies", "Avoid", "Spice Level"].map(
          (label, index) => (
            <p
              className="flex min-h-[36px] items-center justify-between border-b border-white/10 px-3 text-[12px] last:border-b-0"
              key={label}
            >
              <span className="text-white/58">{label}</span>
              <span className="text-white">
                {index === 0
                  ? tags.join(", ")
                  : index === 1
                    ? "Shellfish, Peanuts"
                    : index === 2
                      ? "Gluten, Dairy"
                      : "Mild"}
              </span>
            </p>
          ),
        )}
      </div>
      <button
        className="mt-2.5 h-8 w-full rounded-[9px] border border-white/10 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onOpenSettings}
        type="button"
      >
        Edit preferences
      </button>
    </article>
  );
}

function UpcomingReservationCard({
  activeOrderCount,
  reservation,
}: {
  activeOrderCount: number;
  reservation?: Reservation;
}) {
  return (
    <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-3.5">
      <div className="flex items-center justify-between">
        <CardTitle
          icon="/assets/icons/calendar-icon.png"
          title="Upcoming reservation"
        />
        <Link
          className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          href="/reservations"
        >
          View all <ChevronIcon direction="right" size={18} />
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-[252px_1fr] overflow-hidden rounded-[12px] border border-white/10 bg-black/24">
        <div className="relative min-h-[128px]">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="270px"
            src="/assets/food/luxury-sushi-platter-on-marble-surface.webp"
          />
        </div>
        <div className="p-4">
          <p className="font-mono text-[24px] text-white">
            {reservation ? "7:00 PM" : "No upcoming time"}
          </p>
          <p className="mt-2 text-[16px] text-white">
            {reservation ? "Sushi Bliss Downtown" : "Book your next visit"}
          </p>
          <p className="mt-2 text-[13px] text-white/56">
            Active orders: {activeOrderCount}
          </p>
          <Button
            className="mt-4 h-10 w-[230px] rounded-[10px] whitespace-nowrap text-[12px] uppercase tracking-[0.08em]"
            href="/reservations"
          >
            View reservation
          </Button>
        </div>
      </div>
    </article>
  );
}

function RecentActivityCard() {
  return (
    <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-3.5">
      <div className="flex items-center justify-between">
        <CardTitle
          icon="/assets/icons/clock-icon.png"
          title="Recent activity"
        />
        <Link
          className="inline-flex items-center text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          href="/orders"
        >
          View all <ChevronIcon direction="right" size={18} />
        </Link>
      </div>
      <div className="mt-3 overflow-hidden rounded-[12px] border border-white/10">
        {recentActivity.map(([label, date, detail, href]) => (
          <Link
            className="grid min-h-[38px] w-full grid-cols-[180px_minmax(0,1fr)_220px_20px] items-center gap-4 border-b border-white/10 px-4 text-left text-[13px] transition last:border-b-0 hover:bg-white/[0.035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--sb-gold)]"
            href={href}
            key={label}
          >
            <span className="text-white">{label}</span>
            <span className="text-white/56">{date}</span>
            <span className="text-white/56">{detail}</span>
            <span className="text-[var(--sb-gold-soft)]" aria-hidden="true">
              <ChevronIcon direction="right" size={18} />
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}

function CardTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <h2 className="flex items-center gap-3 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
      <AssetIcon size={22} src={icon} />
      {title}
    </h2>
  );
}
