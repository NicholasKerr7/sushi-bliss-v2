"use client";

import Link from "next/link";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { dietaryPreferenceOptions } from "@/data/profile";
import { icons } from "@/features/home/homeDashboardData";
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
import { MobileProfileSubflowSummary } from "./MobileProfileSubflowSummary";

type PreferencesUpdate =
  | Partial<UserPreferences>
  | ((preferences: UserPreferences) => UserPreferences);

interface MobileProfilePreferencesViewProps {
  cartCount: number;
  unreadNotificationCount: number;
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
  unreadNotificationCount,
  onBack,
  onOpenCart,
  onResetProfile,
  onUpdatePreferences,
  preferences,
}: MobileProfilePreferencesViewProps) {
  const [message, setMessage] = useState("");
  const enabledNotificationCount = Object.values(
    preferences.notifications,
  ).filter(Boolean).length;
  const enabledPrivacyCount = Object.values(preferences.privacy).filter(
    Boolean,
  ).length;
  const activeDietaryCount = preferences.dietaryTags.includes("No Preference")
    ? 0
    : preferences.dietaryTags.length;

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
      <div className="mobile-frame relative z-10 pb-16">
        <MobileProfileHeader
          cartCount={cartCount}
          unreadNotificationCount={unreadNotificationCount}
          onOpenCart={onOpenCart}
        />

        <div className="mt-6 grid grid-cols-[44px_minmax(0,1fr)_44px] items-center min-[390px]:mt-7 min-[390px]:grid-cols-[52px_1fr_52px]">
          <MobileProfileBackButton label="Back to profile" onClick={onBack} />
          <h1 className="editorial-title text-center text-[21px] uppercase tracking-[0.07em] text-white min-[390px]:text-[25px] min-[390px]:tracking-[0.1em]">
            Settings
          </h1>
          <span aria-hidden="true" />
        </div>

        <section className="mt-7 min-[390px]:mt-8">
          <h2 className="editorial-title text-[30px] uppercase leading-[1.03] text-white min-[390px]:text-[38px]">
            Preferences
            <span className="block text-[var(--sb-red-bright)]">
              & Security
            </span>
          </h2>
          <p className="mt-3 text-[14px] leading-[22px] text-white/62 min-[390px]:mt-4 min-[390px]:text-[16px] min-[390px]:leading-6">
            Tune your dining preferences, notification rules, and account
            controls.
          </p>
        </section>

        <MobileProfileSubflowSummary
          eyebrow="Personalization"
          icon={icons.settings}
          metrics={[
            { label: "Mode", value: preferences.fulfillmentMode },
            { label: "Diet", value: activeDietaryCount },
            { label: "Alerts", value: enabledNotificationCount },
          ]}
          subtitle={`${enabledPrivacyCount} privacy controls are enabled. Dietary notes currently read: ${preferences.dietaryTags.join(", ")}.`}
          title="Preferences synced locally"
          action={
            <Link
              className="grid min-h-[46px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/28 px-3 text-center text-[10px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:min-h-[48px] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
              href="/notifications"
            >
              Open notification center
            </Link>
          }
        />

        {message ? (
          <p className="mt-5 rounded-[14px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/10 p-3 text-[14px] text-[var(--sb-gold-soft)]">
            {message}
          </p>
        ) : null}

        <MobileProfilePanel className="mt-5 p-3 min-[390px]:mt-6 min-[390px]:p-4">
          <h3 className="text-[14px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:text-[16px] min-[390px]:tracking-[0.08em]">
            Preferred fulfillment
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-2.5 min-[390px]:mt-4 min-[390px]:gap-3">
            {(["delivery", "pickup"] as const).map((mode) => (
              <button
                aria-pressed={preferences.fulfillmentMode === mode}
                className={classNames(
                  "min-h-[48px] rounded-[13px] border text-[11px] uppercase tracking-[0.05em] transition min-[390px]:min-h-[56px] min-[390px]:rounded-[14px] min-[390px]:text-[13px] min-[390px]:tracking-[0.08em]",
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

        <MobileProfilePanel className="mt-4 p-3 min-[390px]:p-4">
          <h3 className="text-[14px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:text-[16px] min-[390px]:tracking-[0.08em]">
            Dietary preferences
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {dietaryPreferenceOptions.map((option) => {
              const selected = preferences.dietaryTags.includes(option);

              return (
                <button
                  aria-pressed={selected}
                  className={classNames(
                    "min-h-8 rounded-full border px-2.5 text-[9.5px] uppercase tracking-[0.035em] min-[390px]:min-h-10 min-[390px]:px-4 min-[390px]:text-[11px] min-[390px]:tracking-[0.06em]",
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
    <h3 className="flex min-h-[50px] items-center gap-2.5 border-b border-white/10 px-3 text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:min-h-[58px] min-[390px]:gap-3 min-[390px]:px-4 min-[390px]:text-[14px] min-[390px]:tracking-[0.08em]">
      <AssetIcon size={20} src={icon} />
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
    <div className="grid grid-cols-[minmax(0,1fr)_46px] items-center gap-2.5 border-b border-white/10 px-3 py-3 last:border-b-0 min-[390px]:grid-cols-[minmax(0,1fr)_52px] min-[390px]:gap-3 min-[390px]:px-4 min-[390px]:py-3.5">
      <span className="min-w-0">
        <span className="block break-words text-[12.5px] leading-[18px] text-white min-[390px]:text-[14px] min-[390px]:leading-5">
          {label}
        </span>
        <span className="mt-1 block text-[11px] leading-[15px] text-white/50 min-[390px]:text-[12px] min-[390px]:leading-[18px]">
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
      className="flex min-h-[52px] items-center justify-between gap-3 border-b border-white/10 px-3 text-[13px] text-white/72 last:border-b-0 min-[390px]:min-h-[58px] min-[390px]:px-4 min-[390px]:text-[15px]"
      href={href}
    >
      {label}
      <span
        aria-hidden="true"
        className="text-[24px] text-[var(--sb-gold-soft)]"
      >
        <ChevronIcon direction="right" size={18} />
      </span>
    </Link>
  );
}
