"use client";

import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { dietaryPreferenceOptions } from "@/data/profile";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { togglePreferenceTag } from "@/lib/profile";
import type { FulfillmentMode } from "@/types/common";
import type { UserPreferences } from "@/types/user";

import {
  MobileProfileBackButton,
  MobileProfileHeader,
  MobileProfilePanel,
  MobileProfileSwitch,
} from "./MobileProfilePrimitives";

type PreferencesUpdate =
  | Partial<UserPreferences>
  | ((preferences: UserPreferences) => UserPreferences);

interface MobileProfilePreferencesViewProps {
  cartCount: number;
  onBack: () => void;
  onOpenCart: () => void;
  onResetProfile: () => void;
  onUpdatePreferences: (nextPreferences: PreferencesUpdate) => void;
  preferences: UserPreferences;
}

const notificationRows = [
  {
    description: "Pickup, delivery, and receipt updates.",
    key: "orderUpdates",
    label: "Order updates",
  },
  {
    description: "Reservation confirmations and reminders.",
    key: "reservationReminders",
    label: "Reservation reminders",
  },
  {
    description: "Reward balance and redemption updates.",
    key: "rewardAlerts",
    label: "Reward alerts",
  },
  {
    description: "Seasonal offers and member dining drops.",
    key: "offerAlerts",
    label: "Offer alerts",
  },
  {
    description: "Messages about support and private dining.",
    key: "conciergeMessages",
    label: "Concierge messages",
  },
] as const;

const privacyRows = [
  {
    description: "Alert me when a new device signs in.",
    key: "loginAlerts",
    label: "Login alerts",
  },
  {
    description: "Use dining history to personalize suggestions.",
    key: "personalizedRecommendations",
    label: "Recommendations",
  },
  {
    description: "Share dining history with concierge support.",
    key: "shareDiningHistory",
    label: "Share dining history",
  },
  {
    description: "Mock two-step protection for future auth.",
    key: "twoFactorEnabled",
    label: "Two-factor enabled",
  },
] as const;

/** Mobile preferences and privacy screen with persisted profile settings. */
export function MobileProfilePreferencesView({
  cartCount,
  onBack,
  onOpenCart,
  onResetProfile,
  onUpdatePreferences,
  preferences,
}: MobileProfilePreferencesViewProps) {
  const [message, setMessage] = useState("");

  const updateFulfillmentMode = (fulfillmentMode: FulfillmentMode) => {
    onUpdatePreferences({ fulfillmentMode });
    setMessage(`Preferred ${fulfillmentMode} saved.`);
  };

  const updateDietaryTag = (tag: string) => {
    onUpdatePreferences((current) => {
      if (tag === "No Preference") {
        return { ...current, dietaryTags: ["No Preference"] };
      }

      return {
        ...current,
        dietaryTags: togglePreferenceTag(
          current.dietaryTags.filter((item) => item !== "No Preference"),
          tag,
        ),
      };
    });
    setMessage(`${tag} preference updated.`);
  };

  return (
    <>
      <div className="relative z-10 mx-auto max-w-[430px] pb-16">
        <MobileProfileHeader cartCount={cartCount} onOpenCart={onOpenCart} />

        <div className="mt-7 grid grid-cols-[52px_1fr_52px] items-center">
          <MobileProfileBackButton label="Back to profile" onClick={onBack} />
          <h1 className="editorial-title text-center text-[25px] uppercase tracking-[0.1em] text-white">
            Settings
          </h1>
          <span aria-hidden="true" />
        </div>

        <section className="mt-8">
          <h2 className="editorial-title text-[38px] uppercase leading-[1.03] text-white">
            Preferences
            <span className="block text-[var(--sb-red-bright)]">
              & Security
            </span>
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-white/62">
            Tune your dining preferences, notification rules, and account
            controls.
          </p>
        </section>

        {message ? (
          <p className="mt-5 rounded-[14px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/10 p-3 text-[14px] text-[var(--sb-gold-soft)]">
            {message}
          </p>
        ) : null}

        <MobileProfilePanel className="mt-6 p-4">
          <h3 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Preferred fulfillment
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {(["delivery", "pickup"] as const).map((mode) => (
              <button
                aria-pressed={preferences.fulfillmentMode === mode}
                className={classNames(
                  "min-h-[58px] rounded-[14px] border text-[15px] uppercase tracking-[0.08em] transition",
                  preferences.fulfillmentMode === mode
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/20 text-[var(--sb-red-bright)] shadow-[0_0_24px_rgba(239,47,37,0.24)]"
                    : "border-white/12 bg-black/34 text-white/62",
                )}
                key={mode}
                onClick={() => updateFulfillmentMode(mode)}
                type="button"
              >
                {mode}
              </button>
            ))}
          </div>
        </MobileProfilePanel>

        <MobileProfilePanel className="mt-4 p-4">
          <h3 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Dietary preferences
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {dietaryPreferenceOptions.map((option) => {
              const selected = preferences.dietaryTags.includes(option);

              return (
                <button
                  aria-pressed={selected}
                  className={classNames(
                    "min-h-[40px] rounded-full border px-4 text-[12px] uppercase tracking-[0.06em]",
                    selected
                      ? "border-[var(--sb-gold)] bg-[var(--sb-gold)]/16 text-[var(--sb-gold-soft)]"
                      : "border-white/12 bg-black/34 text-white/58",
                  )}
                  key={option}
                  onClick={() => updateDietaryTag(option)}
                  type="button"
                >
                  {option}
                </button>
              );
            })}
          </div>
        </MobileProfilePanel>

        <MobileProfilePanel className="mt-4 overflow-hidden">
          <SectionTitle icon={icons.bell} label="Notifications" />
          {notificationRows.map((row) => (
            <PreferenceSwitchRow
              checked={preferences.notifications[row.key]}
              description={row.description}
              key={row.key}
              label={row.label}
              onCheckedChange={(checked) => {
                onUpdatePreferences({
                  marketingOptIn:
                    row.key === "offerAlerts"
                      ? checked
                      : preferences.marketingOptIn,
                  notifications: {
                    ...preferences.notifications,
                    [row.key]: checked,
                  },
                });
                setMessage(`${row.label} updated.`);
              }}
            />
          ))}
        </MobileProfilePanel>

        <MobileProfilePanel className="mt-4 overflow-hidden">
          <SectionTitle
            icon="/assets/icons/chef-crest-icon.png"
            label="Privacy"
          />
          {privacyRows.map((row) => (
            <PreferenceSwitchRow
              checked={preferences.privacy[row.key]}
              description={row.description}
              key={row.key}
              label={row.label}
              onCheckedChange={(checked) => {
                onUpdatePreferences({
                  privacy: {
                    ...preferences.privacy,
                    [row.key]: checked,
                  },
                });
                setMessage(`${row.label} updated.`);
              }}
            />
          ))}
        </MobileProfilePanel>

        <MobileProfilePanel className="mt-4 overflow-hidden">
          <SectionTitle icon="/assets/icons/headset-icon.png" label="Support" />
          <LinkRow href="/support" label="Help center" />
          <LinkRow href="/support" label="Contact support" />
          <LinkRow href="/notifications" label="Notification center" />
        </MobileProfilePanel>

        <div className="mt-4 grid gap-3">
          <button
            className="min-h-[58px] rounded-[14px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={() => {
              onResetProfile();
              setMessage("Profile reset to starter data.");
            }}
            type="button"
          >
            Reset profile mock
          </button>
          <button
            className="min-h-[58px] rounded-[14px] border border-[var(--sb-red-bright)]/45 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)]"
            onClick={() =>
              setMessage("Logout is ready for Supabase Auth wiring.")
            }
            type="button"
          >
            Log out
          </button>
        </div>
      </div>

      <BottomNavigation
        activeId="profile"
        ariaLabel="Mobile profile navigation"
      />
    </>
  );
}

function SectionTitle({ icon, label }: { icon?: string; label: string }) {
  return (
    <h3 className="flex min-h-[58px] items-center gap-3 border-b border-white/10 px-4 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
      <AssetIcon size={24} src={icon} />
      {label}
    </h3>
  );
}

function PreferenceSwitchRow({
  checked,
  description,
  label,
  onCheckedChange,
}: {
  checked: boolean;
  description: string;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 last:border-b-0">
      <span className="min-w-0">
        <span className="block text-[15px] text-white">{label}</span>
        <span className="mt-1 block text-[13px] leading-5 text-white/50">
          {description}
        </span>
      </span>
      <MobileProfileSwitch
        checked={checked}
        label={label}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}

function LinkRow({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="flex min-h-[58px] items-center justify-between border-b border-white/10 px-4 text-[15px] text-white/72 last:border-b-0"
      href={href}
    >
      {label}
      <span
        aria-hidden="true"
        className="text-[24px] text-[var(--sb-gold-soft)]"
      >
        &rsaquo;
      </span>
    </Link>
  );
}
