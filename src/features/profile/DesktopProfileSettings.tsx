"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { classNames } from "@/lib/classNames";
import type { LoyaltyAccount } from "@/types/loyalty";
import type { UserPreferences, UserProfile } from "@/types/user";

const sidebarItems = [
  ["overview", "Account Overview", "/assets/icons/user-icon.png"],
  ["personal", "Personal Information", "/assets/icons/user-icon.png"],
  [
    "dietary",
    "Dietary Preferences",
    "/assets/icons/vegetarian-sushi-icon.webp",
  ],
  ["privacy", "Privacy & Security", "/assets/icons/chef-crest-icon.png"],
  [
    "notifications",
    "Notifications",
    "/assets/icons/notification-bell-icon.png",
  ],
  ["payments", "Payment Methods", "/assets/icons/credit-card-icon.png"],
  ["loyalty", "Loyalty & Rewards", "/assets/icons/floral-emblem-icon.png"],
  ["orders", "Order History", "/assets/icons/clock-icon.png"],
  ["settings", "Settings", "/assets/icons/user-settings-icon.png"],
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

export function DesktopAccountSettings({
  account,
  message,
  profile,
  progress,
  onBack,
  onDietaryToggle,
  onNotificationToggle,
  onStatus,
}: {
  account: LoyaltyAccount;
  message: string;
  profile: UserProfile;
  progress: number;
  onBack: () => void;
  onDietaryToggle: (option: string) => void;
  onNotificationToggle: (key: keyof UserPreferences["notifications"]) => void;
  onStatus: (message: string) => void;
}) {
  const dietaryOptions = [
    "No Shellfish",
    "No Pork",
    "No Dairy",
    "Gluten Sensitive",
  ];

  return (
    <main className="mx-auto max-w-[1672px] px-7 pb-6 pt-7">
      <div className="rounded-[24px] border border-[var(--sb-border)] bg-[#07090a] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.54)]">
        <p className="text-[15px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          My account
        </p>
        <h1 className="editorial-title mt-2 text-[36px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          My Account
        </h1>
        <p className="mt-2 text-[16px] text-white/72">
          Welcome back, Hiroshi. Manage your preferences and account settings.
        </p>

        {message ? (
          <p className="mt-5 rounded-[12px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/8 px-4 py-3 text-[14px] text-[var(--sb-gold-soft)]">
            {message}
          </p>
        ) : null}

        <div className="mt-6 grid grid-cols-[320px_minmax(0,1fr)] gap-5">
          <aside className="space-y-4">
            <nav
              className="overflow-hidden rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035]"
              aria-label="Account settings sections"
            >
              {sidebarItems.map(([id, label, icon]) => (
                <button
                  className={classNames(
                    "grid min-h-[50px] w-full grid-cols-[28px_1fr] items-center gap-3 border-b border-white/10 px-7 text-left text-[14px] uppercase tracking-[0.04em] last:border-b-0",
                    id === "personal"
                      ? "border-l-2 border-l-[var(--sb-red-bright)] text-[var(--sb-red-bright)]"
                      : "text-white/72",
                  )}
                  key={id}
                  onClick={() => onStatus(`${label} settings selected.`)}
                  type="button"
                >
                  <AssetIcon size={20} src={icon} />
                  {label}
                </button>
              ))}
            </nav>
            <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
              <h2 className="text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Need help?
              </h2>
              <p className="mt-2 text-[14px] text-white/58">
                Our team is here to assist you.
              </p>
              <Link
                className="mt-4 block text-[13px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)]"
                href="/support"
              >
                Contact support <ChevronIcon direction="right" size={18} />
              </Link>
            </article>
          </aside>

          <section className="grid grid-cols-2 gap-5">
            <PersonalInformationCard profile={profile} onStatus={onStatus} />
            <DietarySettingsCard
              options={dietaryOptions}
              selected={profile.preferences.dietaryTags}
              onDietaryToggle={onDietaryToggle}
            />
            <PrivacySecurityCard onStatus={onStatus} />
            <NotificationSettingsCard
              preferences={profile.preferences.notifications}
              onNotificationToggle={onNotificationToggle}
            />
            <LoyaltyCompactCard account={account} progress={progress} />
            <MemberSinceCard />
            <AccountShortcutsCard onBack={onBack} />
          </section>
        </div>
      </div>
    </main>
  );
}

function PersonalInformationCard({
  profile,
  onStatus,
}: {
  profile: UserProfile;
  onStatus: (message: string) => void;
}) {
  return (
    <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
      <div className="flex items-center justify-between">
        <CardTitle
          icon="/assets/icons/floral-emblem-icon.png"
          title="Personal information"
        />
        <button
          className="h-8 rounded-[8px] border border-[var(--sb-gold)]/36 px-4 text-[11px] uppercase text-[var(--sb-gold-soft)]"
          onClick={() => onStatus("Personal information edit mode is ready.")}
          type="button"
        >
          Edit
        </button>
      </div>
      <div className="mt-5 grid grid-cols-[120px_1fr] gap-5">
        <Image
          alt=""
          className="rounded-full border border-[var(--sb-border)] object-cover"
          height={108}
          src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
          width={108}
        />
        <div className="space-y-3 text-[13px]">
          <SettingLine label="Full name" value={profile.name} />
          <SettingLine label="Email address" value={profile.email} />
          <SettingLine label="Phone number" value={profile.phone} />
          <SettingLine label="Date of birth" value="May 15, 1990" />
        </div>
      </div>
    </article>
  );
}

function DietarySettingsCard({
  options,
  selected,
  onDietaryToggle,
}: {
  options: string[];
  selected: string[];
  onDietaryToggle: (option: string) => void;
}) {
  return (
    <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
      <div className="flex items-center justify-between">
        <CardTitle
          icon="/assets/icons/vegetarian-sushi-icon.webp"
          title="Dietary preferences"
        />
        <button
          className="h-8 rounded-[8px] border border-[var(--sb-gold)]/36 px-4 text-[11px] uppercase text-[var(--sb-gold-soft)]"
          type="button"
        >
          Edit
        </button>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {options.map((option) => {
          const active = selected.includes(option);

          return (
            <button
              aria-pressed={active}
              className={classNames(
                "rounded-full border px-4 py-2 text-[13px]",
                active
                  ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/22 text-white"
                  : "border-[var(--sb-gold)]/28 text-white/72",
              )}
              key={option}
              onClick={() => onDietaryToggle(option)}
              type="button"
            >
              {option}
              <span className="ml-3" aria-hidden="true">
                x
              </span>
            </button>
          );
        })}
      </div>
      <button
        className="mt-6 h-[58px] w-full rounded-[10px] border border-dashed border-[var(--sb-gold)]/26 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={() => onDietaryToggle("Chef Notes")}
        type="button"
      >
        + Add preference
      </button>
    </article>
  );
}

function PrivacySecurityCard({
  onStatus,
}: {
  onStatus: (message: string) => void;
}) {
  return (
    <SettingsCard
      title="Privacy & Security"
      icon="/assets/icons/chef-crest-icon.png"
    >
      {[
        "Password",
        "Two-factor authentication",
        "Login devices",
        "Data & privacy",
      ].map((row) => (
        <button
          className="flex min-h-[48px] w-full items-center justify-between border-b border-white/10 text-left text-[13px] last:border-b-0"
          key={row}
          onClick={() => onStatus(`${row} action selected.`)}
          type="button"
        >
          <span className="uppercase tracking-[0.04em] text-white/72">
            {row}
          </span>
          <span className="rounded-[8px] border border-[var(--sb-gold)]/36 px-3 py-1 text-[11px] uppercase text-[var(--sb-gold-soft)]">
            Manage
          </span>
        </button>
      ))}
    </SettingsCard>
  );
}

function NotificationSettingsCard({
  preferences,
  onNotificationToggle,
}: {
  preferences: UserPreferences["notifications"];
  onNotificationToggle: (key: keyof UserPreferences["notifications"]) => void;
}) {
  const rows: Array<[keyof UserPreferences["notifications"], string, string]> =
    [
      [
        "orderUpdates",
        "Order Confirmations",
        "Get notified about your order status",
      ],
      ["reservationReminders", "Reservations", "Reminders and booking updates"],
      ["offerAlerts", "Exclusive Offers", "Receive special offers"],
      ["rewardAlerts", "Loyalty Updates", "Points and rewards updates"],
      ["conciergeMessages", "Newsletter", "Monthly news from Sushi Bliss"],
    ];

  return (
    <SettingsCard
      title="Notifications"
      icon="/assets/icons/notification-bell-icon.png"
    >
      {rows.map(([key, label, copy]) => (
        <button
          className="flex min-h-[42px] w-full items-center justify-between border-b border-white/10 text-left last:border-b-0"
          key={key}
          onClick={() => onNotificationToggle(key)}
          type="button"
        >
          <span>
            <span className="block text-[13px] text-white">{label}</span>
            <span className="block text-[12px] text-white/52">{copy}</span>
          </span>
          <SwitchPill checked={preferences[key]} />
        </button>
      ))}
    </SettingsCard>
  );
}

function LoyaltyCompactCard({
  account,
  progress,
}: {
  account: LoyaltyAccount;
  progress: number;
}) {
  return (
    <SettingsCard
      title="Loyalty status"
      icon="/assets/icons/floral-emblem-icon.png"
    >
      <p className="font-mono text-[28px] text-white">
        {account.points.toLocaleString()} PTS
      </p>
      <p className="mt-1 text-[13px] text-white/58">
        750 pts to reach Platinum
      </p>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <span
          className={classNames(
            "block h-full rounded-full bg-[var(--sb-gold)]",
            getProgressWidthClass(progress),
          )}
        />
      </div>
    </SettingsCard>
  );
}

function MemberSinceCard() {
  return (
    <SettingsCard title="Member since" icon="/assets/icons/calendar-icon.png">
      <p className="editorial-title text-[30px] uppercase text-white">
        Jan 15, 2024
      </p>
      <p className="mt-2 text-[13px] text-white/58">Member for 4 months</p>
    </SettingsCard>
  );
}

function AccountShortcutsCard({ onBack }: { onBack: () => void }) {
  return (
    <SettingsCard
      title="Account shortcuts"
      icon="/assets/icons/chef-crest-icon.png"
    >
      {[
        "View order history",
        "Manage payment methods",
        "Download receipts",
      ].map((label) => (
        <button
          className="flex min-h-[38px] w-full items-center justify-between border-b border-white/10 text-left text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] last:border-b-0"
          key={label}
          onClick={onBack}
          type="button"
        >
          {label}
          <ChevronIcon direction="right" size={18} />
        </button>
      ))}
    </SettingsCard>
  );
}

function SettingsCard({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: string;
  title: string;
}) {
  return (
    <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
      <CardTitle icon={icon} title={title} />
      <div className="mt-4">{children}</div>
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

function SettingLine({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="block text-[11px] uppercase tracking-[0.08em] text-white/46">
        {label}
      </span>
      <span className="mt-1 block text-white">{value}</span>
    </p>
  );
}

function SwitchPill({ checked }: { checked: boolean }) {
  return (
    <span
      className={classNames(
        "relative h-[25px] w-[48px] rounded-full transition",
        checked ? "bg-[var(--sb-red)]" : "bg-white/18",
      )}
    >
      <span
        className={classNames(
          "absolute top-[3px] h-[19px] w-[19px] rounded-full bg-white transition",
          checked ? "left-[25px]" : "left-[4px]",
        )}
      />
    </span>
  );
}
