"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { locations } from "@/data/locations";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { togglePreferenceTag } from "@/lib/profile";
import type { PaymentMethod, UserPreferences, UserProfile } from "@/types/user";

import { TabletAccountBottomNavigation } from "./TabletAccountBottomNavigation";
import { TabletProfileAccountTopNav } from "./TabletProfileAccountTopNav";

type PreferencesUpdate =
  | Partial<UserPreferences>
  | ((preferences: UserPreferences) => UserPreferences);

interface TabletProfilePreferencesViewProps {
  cartCount: number;
  profile: UserProfile;
  onBack: () => void;
  onDeletePaymentMethod: (id: string) => void;
  onMakeDefaultPaymentMethod: (id: string) => void;
  onOpenCart: () => void;
  onSavePaymentMethod: (paymentMethod: PaymentMethod) => void;
  onUpdatePreferences: (nextPreferences: PreferencesUpdate) => void;
}

const dietaryOptions = [
  "No Preference",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut Allergy",
  "Pescatarian",
  "Keto",
  "Other",
] as const;

const diningRows = [
  {
    detail: "2 Guests",
    icon: "/assets/icons/group-icon.png",
    label: "Default Party Size",
  },
  {
    detail: locations[2]?.name || "Sushi Bliss Downtown",
    icon: icons.location,
    label: "Preferred Location",
  },
  {
    detail: "Counter Seating",
    icon: "/assets/icons/dining-setting-icon.png",
    label: "Preferred Seating",
  },
  {
    detail: "Birthdays, Anniversaries",
    icon: "/assets/icons/gift-icon.png",
    label: "Special Occasions",
  },
] as const;

const supportRows = [
  {
    description: "Browse FAQs and guides",
    href: "/support",
    icon: "/assets/icons/headset-icon.png",
    label: "Help Center",
  },
  {
    description: "Get help from our team",
    href: "/support",
    icon: "/assets/icons/phone-icon.png",
    label: "Contact Support",
  },
  {
    description: "Help us improve your experience",
    href: "/support",
    icon: "/assets/icons/email-icon.png",
    label: "Send Feedback",
  },
  {
    description: "Let us know if something is wrong",
    href: "/support",
    icon: "/assets/icons/gold-alert-icon.png",
    label: "Report an Issue",
  },
] as const;

function getCardLabel(paymentMethod: PaymentMethod) {
  if (paymentMethod.brand === "American Express") {
    return "AMEX";
  }

  return paymentMethod.brand;
}

function getCardClassName(paymentMethod: PaymentMethod) {
  if (paymentMethod.brand === "Visa") {
    return "text-white";
  }

  if (paymentMethod.brand === "Mastercard") {
    return "text-[#f3a425]";
  }

  return "text-[#3aa6ff]";
}

function formatExpiryDate(value: string) {
  const [year, month] = value.split("-");

  if (!year || !month) {
    return value;
  }

  return `${month}/${year.slice(-2)}`;
}

function TabletSwitch({
  checked,
  id,
  label,
  onCheckedChange,
}: {
  checked: boolean;
  id: string;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className={classNames(
        "relative h-[30px] w-[54px] rounded-full border border-white/10 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
        checked ? "bg-[var(--sb-red)]" : "bg-white/18",
      )}
      id={id}
      onClick={() => onCheckedChange(!checked)}
      role="switch"
      type="button"
    >
      <span
        className={classNames(
          "absolute top-1 grid h-[22px] w-[22px] place-items-center rounded-full bg-white transition",
          checked ? "left-[26px]" : "left-1",
        )}
      />
    </button>
  );
}

function TabletPaymentMark({
  paymentMethod,
}: {
  paymentMethod: PaymentMethod;
}) {
  return (
    <span
      className={classNames(
        "w-[82px] text-[18px] font-black italic tracking-tight",
        getCardClassName(paymentMethod),
      )}
    >
      {getCardLabel(paymentMethod)}
    </span>
  );
}

export function TabletProfilePreferencesView({
  cartCount,
  profile,
  onBack,
  onDeletePaymentMethod,
  onMakeDefaultPaymentMethod,
  onOpenCart,
  onSavePaymentMethod,
  onUpdatePreferences,
}: TabletProfilePreferencesViewProps) {
  const [statusMessage, setStatusMessage] = useState("");
  const selectedDietaryTags = profile.preferences.dietaryTags;

  const handleDietaryToggle = (option: string) => {
    onUpdatePreferences((current) => {
      if (option === "No Preference") {
        return { ...current, dietaryTags: ["No Preference"] };
      }

      return {
        ...current,
        dietaryTags: togglePreferenceTag(
          current.dietaryTags.filter((tag) => tag !== "No Preference"),
          option,
        ),
      };
    });
    setStatusMessage(`${option} preference updated.`);
  };

  const handleAddCard = () => {
    onSavePaymentMethod({
      billingPostalCode: "100-0001",
      brand: "Visa",
      expiresAt: "2029-04",
      id: `tablet-card-${Date.now()}`,
      label: "New Card",
      last4: "2048",
    });
    setStatusMessage("New payment method added.");
  };

  const handleAccountAction = (message: string) => {
    setStatusMessage(message);
  };

  return (
    <section className="flex h-dvh min-h-dvh flex-col overflow-hidden bg-[#050607] pb-[84px] text-white">
      <TabletProfileAccountTopNav
        cartCount={cartCount}
        profile={profile}
        onOpenCart={onOpenCart}
      />

      <section className="relative h-[181px] shrink-0 overflow-hidden bg-black/30">
        <Image
          alt=""
          className="object-cover object-[70%_52%] opacity-82"
          fill
          priority
          sizes="1086px"
          src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.99)_0%,rgba(5,6,7,0.9)_36%,rgba(5,6,7,0.28)_70%,rgba(5,6,7,0.08)_100%)]" />
        <div className="relative z-10 mx-auto w-full max-w-[992px] pt-10">
          <button
            className="mb-5 flex items-center gap-3 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={onBack}
            type="button"
          >
            <ChevronIcon direction="left" size={18} />
            Account settings
          </button>
          <h1 className="editorial-title text-[54px] uppercase leading-none tracking-[0.06em] text-white">
            Preferences
          </h1>
          <p className="mt-3 text-[16px] text-[var(--sb-gold-soft)]">
            Manage your account, preferences, and privacy settings.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[992px]">
        <section className="grid grid-cols-2 gap-3 min-[1080px]:gap-4">
          <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:p-5">
            <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-white min-[1080px]:text-[16px]">
              <AssetIcon size={24} src="/assets/icons/floral-emblem-icon.png" />
              Dining preferences
            </h2>
            <div className="mt-4 overflow-hidden rounded-[12px] border border-white/10">
              {diningRows.map((row) => (
                <button
                  className="grid min-h-[48px] w-full grid-cols-[34px_minmax(0,1fr)_minmax(100px,150px)_18px] items-center gap-3 border-b border-white/10 px-3 text-left last:border-b-0 min-[1080px]:min-h-[57px]"
                  key={row.label}
                  onClick={() =>
                    handleAccountAction(
                      `${row.label} is ready for reservation personalization.`,
                    )
                  }
                  type="button"
                >
                  <AssetIcon size={22} src={row.icon} />
                  <span className="truncate text-[13px] text-white min-[1080px]:text-[14px]">
                    {row.label}
                  </span>
                  <span className="truncate text-right text-[12px] text-white/62">
                    {row.detail}
                  </span>
                  <span
                    className="text-[var(--sb-gold-soft)]"
                    aria-hidden="true"
                  >
                    <ChevronIcon direction="right" size={18} />
                  </span>
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:p-5">
            <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-white min-[1080px]:text-[16px]">
              <AssetIcon
                size={24}
                src="/assets/icons/vegetarian-sushi-icon.webp"
              />
              Dietary preferences
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-2 min-[1080px]:gap-3">
              {dietaryOptions.map((option) => {
                const selected = selectedDietaryTags.includes(option);

                return (
                  <button
                    aria-pressed={selected}
                    className={classNames(
                      "flex h-[38px] items-center justify-center rounded-[9px] border px-2 text-[11px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[1080px]:h-[44px] min-[1080px]:text-[13px]",
                      selected
                        ? "border-[var(--sb-gold)] bg-[var(--sb-gold)]/80 text-black"
                        : "border-white/10 bg-black/24 text-white/76 hover:border-[var(--sb-gold)]/28",
                    )}
                    key={option}
                    onClick={() => handleDietaryToggle(option)}
                    type="button"
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 rounded-[12px] border border-white/10 bg-black/24 p-3 text-[12px] leading-5 text-white/58 min-[1080px]:mt-4 min-[1080px]:text-[13px]">
              We personalize menu recommendations from your current selections.
            </p>
          </article>
        </section>

        <section className="mt-3 grid grid-cols-2 items-start gap-3 min-[1080px]:mt-4 min-[1080px]:gap-5">
          <div className="grid gap-3 min-[1080px]:gap-5">
            <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:p-5">
              <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-white min-[1080px]:text-[16px]">
                <AssetIcon size={24} src={icons.bell} />
                Notifications
              </h2>
              <div className="mt-4 grid overflow-hidden rounded-[12px] border border-white/10">
                {[
                  [
                    "Order Confirmations",
                    "Receive updates about your orders",
                    "orderUpdates",
                  ],
                  [
                    "Reservation Reminders",
                    "Get reminders for upcoming reservations",
                    "reservationReminders",
                  ],
                  [
                    "Special Offers & Promotions",
                    "Receive exclusive offers and updates",
                    "offerAlerts",
                  ],
                  [
                    "New Menu Items",
                    "Be the first to know about new arrivals",
                    "conciergeMessages",
                  ],
                  [
                    "Bliss Rewards Updates",
                    "Points balance and reward alerts",
                    "rewardAlerts",
                  ],
                ].map(([label, description, key]) => {
                  const preferenceKey =
                    key as keyof UserPreferences["notifications"];
                  const checked =
                    profile.preferences.notifications[preferenceKey];

                  return (
                    <div
                      className="grid min-h-[46px] grid-cols-[minmax(0,1fr)_58px] items-center gap-3 border-b border-white/10 px-3 py-2 last:border-b-0 min-[1080px]:min-h-[50px]"
                      key={key}
                    >
                      <label htmlFor={`tablet-${key}`} className="min-w-0">
                        <span className="block truncate text-[13px] text-white min-[1080px]:text-[14px]">
                          {label}
                        </span>
                        <span className="mt-1 block truncate text-[11px] text-white/52 min-[1080px]:text-[12px]">
                          {description}
                        </span>
                      </label>
                      <TabletSwitch
                        checked={checked}
                        id={`tablet-${key}`}
                        label={label}
                        onCheckedChange={(nextChecked) =>
                          onUpdatePreferences({
                            notifications: {
                              ...profile.preferences.notifications,
                              [preferenceKey]: nextChecked,
                            },
                          })
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="hidden rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:block min-[1080px]:p-5">
              <h2 className="flex items-center gap-3 text-[16px] uppercase tracking-[0.08em] text-white">
                <AssetIcon size={24} src="/assets/icons/headset-icon.png" />
                Support
              </h2>
              <div className="mt-4 overflow-hidden rounded-[12px] border border-white/10">
                {supportRows.map((row) => (
                  <Link
                    className="grid min-h-[49px] grid-cols-[34px_minmax(0,1fr)_18px] items-center gap-3 border-b border-white/10 px-3 text-left last:border-b-0"
                    href={row.href}
                    key={row.label}
                  >
                    <AssetIcon size={22} src={row.icon} />
                    <span>
                      <span className="block text-[14px] text-white">
                        {row.label}
                      </span>
                      <span className="mt-1 block text-[12px] text-white/52">
                        {row.description}
                      </span>
                    </span>
                    <span
                      className="text-[var(--sb-gold-soft)]"
                      aria-hidden="true"
                    >
                      <ChevronIcon direction="right" size={18} />
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          </div>

          <div className="grid gap-3 min-[1080px]:gap-5">
            <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:p-5">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-white min-[1080px]:text-[16px]">
                  <AssetIcon size={24} src={icons.cart} />
                  Saved cards
                </h2>
                <button
                  className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                  onClick={handleAddCard}
                  type="button"
                >
                  + Add card
                </button>
              </div>
              <div className="mt-4 grid gap-2">
                {profile.paymentMethods.slice(0, 3).map((paymentMethod) => (
                  <div
                    className="grid h-[46px] grid-cols-[88px_minmax(0,1fr)_94px_54px_26px] items-center gap-2 rounded-[10px] border border-white/10 px-3 min-[1080px]:h-[56px]"
                    key={paymentMethod.id}
                  >
                    <TabletPaymentMark paymentMethod={paymentMethod} />
                    <span className="truncate text-[13px] text-white/86 min-[1080px]:text-[15px]">
                      .... {paymentMethod.last4}
                    </span>
                    <span className="hidden truncate text-[11px] text-white/42 min-[1080px]:block">
                      Expires {formatExpiryDate(paymentMethod.expiresAt)}
                    </span>
                    {paymentMethod.isDefault ? (
                      <span className="rounded-[5px] border border-[var(--sb-red-bright)] px-2 py-1 text-[9px] uppercase text-[var(--sb-red-bright)]">
                        Default
                      </span>
                    ) : (
                      <button
                        className="text-[10px] uppercase text-[var(--sb-gold-soft)]"
                        onClick={() => {
                          onMakeDefaultPaymentMethod(paymentMethod.id);
                          setStatusMessage("Default card updated.");
                        }}
                        type="button"
                      >
                        Set
                      </button>
                    )}
                    <button
                      aria-label={`Remove ${paymentMethod.brand} ending ${paymentMethod.last4}`}
                      className="text-[var(--sb-gold-soft)]"
                      disabled={paymentMethod.isDefault}
                      onClick={() => {
                        onDeletePaymentMethod(paymentMethod.id);
                        setStatusMessage("Payment method removed.");
                      }}
                      title={
                        paymentMethod.isDefault
                          ? "Default card cannot be removed"
                          : "Remove card"
                      }
                      type="button"
                    >
                      ...
                    </button>
                  </div>
                ))}
              </div>
              {statusMessage ? (
                <p className="mt-3 text-center text-[12px] font-semibold text-[var(--sb-gold-soft)]">
                  {statusMessage}
                </p>
              ) : null}
            </article>

            <article className="hidden rounded-[14px] border border-white/10 bg-white/[0.035] p-4 lg:block">
              <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-white min-[1080px]:text-[16px]">
                <AssetIcon size={24} src="/assets/icons/chef-crest-icon.png" />
                Privacy & settings
              </h2>
              <div className="mt-4 overflow-hidden rounded-[12px] border border-white/10">
                {[
                  ["Profile Visibility", "Manage what others see", "Private"],
                  ["Data & Privacy", "Manage your data and permissions", ""],
                  ["Marketing Preferences", "Manage how we use your data", ""],
                ].map(([label, description, value]) => (
                  <button
                    className="grid min-h-[40px] w-full grid-cols-[34px_minmax(0,1fr)_80px_18px] items-center gap-3 border-b border-white/10 px-3 text-left last:border-b-0"
                    key={label}
                    onClick={() => handleAccountAction(`${label} opened.`)}
                    type="button"
                  >
                    <AssetIcon size={22} src={icons.profile} />
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] text-white">
                        {label}
                      </span>
                      <span className="mt-1 block truncate text-[11px] text-white/52">
                        {description}
                      </span>
                    </span>
                    <span className="truncate text-right text-[12px] text-white/62">
                      {value}
                    </span>
                    <span
                      className="text-[var(--sb-gold-soft)]"
                      aria-hidden="true"
                    >
                      <ChevronIcon direction="right" size={18} />
                    </span>
                  </button>
                ))}
                <div className="grid min-h-[40px] grid-cols-[34px_minmax(0,1fr)_58px] items-center gap-3 px-3">
                  <AssetIcon size={22} src="/assets/icons/check-icon.png" />
                  <span>
                    <span className="block text-[13px] text-white">
                      Biometric Login
                    </span>
                    <span className="mt-1 block text-[11px] text-white/52">
                      Use Face ID / Touch ID to sign in
                    </span>
                  </span>
                  <TabletSwitch
                    checked={profile.preferences.privacy.loginAlerts}
                    id="tablet-biometric-login"
                    label="Biometric login"
                    onCheckedChange={(checked) =>
                      onUpdatePreferences({
                        privacy: {
                          ...profile.preferences.privacy,
                          loginAlerts: checked,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </article>

            <article className="hidden rounded-[14px] border border-white/10 bg-white/[0.035] p-2 min-[1080px]:block">
              <h2 className="flex items-center gap-2 px-1 text-[13px] uppercase tracking-[0.08em] text-white">
                <AssetIcon size={18} src={icons.profile} />
                Account management
              </h2>
              <div className="mt-2 overflow-hidden rounded-[12px] border border-white/10">
                {[
                  ["Change Password", "Password reset request prepared."],
                  ["Download My Data", "Account export prepared for download."],
                ].map(([label, message]) => (
                  <button
                    className="grid min-h-[24px] w-full grid-cols-[24px_minmax(0,1fr)_18px] items-center gap-2 border-b border-white/10 px-3 text-left"
                    key={label}
                    onClick={() => handleAccountAction(message)}
                    type="button"
                  >
                    <AssetIcon size={16} src={icons.settings} />
                    <span className="text-[12px] text-white">{label}</span>
                    <span
                      className="text-[var(--sb-gold-soft)]"
                      aria-hidden="true"
                    >
                      <ChevronIcon direction="right" size={18} />
                    </span>
                  </button>
                ))}
                <button
                  className="grid min-h-[24px] w-full grid-cols-[24px_minmax(0,1fr)] items-center gap-2 px-3 text-left text-[var(--sb-red-bright)]"
                  onClick={() =>
                    handleAccountAction("Signed out for this mock session.")
                  }
                  type="button"
                >
                  <AssetIcon size={16} src={icons.x} />
                  <span className="text-[12px]">Log Out</span>
                </button>
              </div>
            </article>
          </div>
        </section>

        <p className="mt-4 text-center text-[12px] text-white/48">
          App Version 2.3.0 - You are up to date
        </p>
      </main>

      <TabletAccountBottomNavigation />
    </section>
  );
}
