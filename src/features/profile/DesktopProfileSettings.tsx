"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { classNames } from "@/lib/classNames";
import type { LoyaltyAccount } from "@/types/loyalty";
import type { UserPreferences, UserProfile } from "@/types/user";

const sidebarItems = [
  {
    id: "overview",
    label: "Account Overview",
    icon: "/assets/icons/user-icon.png",
    action: "back",
  },
  {
    id: "personal",
    label: "Personal Information",
    icon: "/assets/icons/user-icon.png",
    target: "desktop-profile-personal",
  },
  {
    id: "dietary",
    label: "Dietary Preferences",
    icon: "/assets/icons/vegetarian-sushi-icon.webp",
    target: "desktop-profile-dietary",
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    icon: "/assets/icons/chef-crest-icon.png",
    target: "desktop-profile-privacy",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "/assets/icons/notification-bell-icon.png",
    target: "desktop-profile-notifications",
  },
  {
    id: "payments",
    label: "Payment Methods",
    icon: "/assets/icons/credit-card-icon.png",
    target: "desktop-profile-payments",
  },
  {
    id: "loyalty",
    label: "Loyalty & Rewards",
    icon: "/assets/icons/floral-emblem-icon.png",
    href: "/loyalty",
  },
  {
    id: "orders",
    label: "Order History",
    icon: "/assets/icons/clock-icon.png",
    href: "/orders",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "/assets/icons/user-settings-icon.png",
    target: "desktop-profile-shortcuts",
  },
] as const;

const privacyRows = [
  ["Password", "Supabase Auth connection required"],
  ["Two-factor authentication", "Supabase Auth connection required"],
  ["Login devices", "Supabase Auth connection required"],
  ["Data & privacy", "Contact support"],
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
    <main className="mx-auto max-w-[1672px] px-7 pb-5 pt-4">
      <div className="rounded-[24px] border border-[var(--sb-border)] bg-[#07090a] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.54)]">
        <p className="text-[15px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          My account
        </p>
        <h1 className="editorial-title mt-1.5 text-[32px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          My Account
        </h1>
        <p className="mt-1.5 text-[15px] text-white/72">
          Welcome back, Hiroshi. Manage your preferences and account settings.
        </p>

        {message ? (
          <p className="mt-4 rounded-[12px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/8 px-4 py-3 text-[14px] text-[var(--sb-gold-soft)]">
            {message}
          </p>
        ) : null}

        <div className="mt-4 grid grid-cols-[304px_minmax(0,1fr)] gap-4">
          <aside className="space-y-3">
            <nav
              className="overflow-hidden rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035]"
              aria-label="Account settings sections"
            >
              {sidebarItems.map((item) => {
                const itemClassName = classNames(
                  "grid min-h-[44px] w-full grid-cols-[28px_1fr] items-center gap-3 border-b border-white/10 px-6 text-left text-[13px] uppercase tracking-[0.04em] transition last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--sb-gold)]",
                  item.id === "personal"
                    ? "border-l-2 border-l-[var(--sb-red-bright)] text-[var(--sb-red-bright)]"
                    : "text-white/72 hover:text-white",
                );
                const content = (
                  <>
                    <AssetIcon size={20} src={item.icon} />
                    {item.label}
                  </>
                );

                if ("href" in item) {
                  return (
                    <Link
                      className={itemClassName}
                      href={item.href}
                      key={item.id}
                    >
                      {content}
                    </Link>
                  );
                }

                if ("target" in item) {
                  return (
                    <a
                      className={itemClassName}
                      href={`#${item.target}`}
                      key={item.id}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <button
                    className={itemClassName}
                    key={item.id}
                    onClick={onBack}
                    type="button"
                  >
                    {content}
                  </button>
                );
              })}
            </nav>
            <article className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
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

          <section className="grid grid-cols-2 gap-4">
            <PersonalInformationCard profile={profile} onStatus={onStatus} />
            <DietarySettingsCard
              options={dietaryOptions}
              selected={profile.preferences.dietaryTags}
              onDietaryToggle={onDietaryToggle}
            />
            <PrivacySecurityCard />
            <NotificationSettingsCard
              preferences={profile.preferences.notifications}
              onNotificationToggle={onNotificationToggle}
            />
            <PaymentSettingsCard profile={profile} />
            <LoyaltyCompactCard account={account} progress={progress} />
            <MemberSinceCard />
            <AccountShortcutsCard />
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
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    birthDate: "May 15, 1990",
    email: profile.email,
    name: profile.name,
    phone: profile.phone,
  });

  const updateDraft = (key: keyof typeof draft, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    onStatus("Personal information saved locally.");
  };

  return (
    <article
      className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4"
      id="desktop-profile-personal"
    >
      <div className="flex items-center justify-between">
        <CardTitle
          icon="/assets/icons/floral-emblem-icon.png"
          title="Personal information"
        />
        <button
          className="h-8 rounded-[8px] border border-[var(--sb-gold)]/36 px-4 text-[11px] uppercase text-[var(--sb-gold-soft)]"
          onClick={() => setIsEditing((current) => !current)}
          type="button"
        >
          {isEditing ? "Close" : "Edit"}
        </button>
      </div>
      <div className="mt-4 grid grid-cols-[104px_1fr] gap-5">
        <Image
          alt=""
          className="rounded-full border border-[var(--sb-border)] object-cover"
          height={96}
          src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
          width={96}
        />
        {isEditing ? (
          <form
            className="grid gap-2.5"
            onSubmit={(event) => {
              event.preventDefault();
              handleSave();
            }}
          >
            {(
              [
                ["name", "Full name"],
                ["email", "Email address"],
                ["phone", "Phone number"],
                ["birthDate", "Date of birth"],
              ] as const
            ).map(([key, label]) => (
              <label className="grid gap-1" key={key}>
                <span className="text-[10px] uppercase tracking-[0.08em] text-white/46">
                  {label}
                </span>
                <input
                  className="h-9 rounded-[8px] border border-white/10 bg-black/24 px-3 text-[13px] text-white outline-none focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/22"
                  onChange={(event) => updateDraft(key, event.target.value)}
                  type={key === "email" ? "email" : "text"}
                  value={draft[key]}
                />
              </label>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                className="h-9 rounded-[8px] border border-white/10 text-[11px] uppercase tracking-[0.08em] text-white/68"
                onClick={() => {
                  setDraft({
                    birthDate: "May 15, 1990",
                    email: profile.email,
                    name: profile.name,
                    phone: profile.phone,
                  });
                  setIsEditing(false);
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                className="h-9 rounded-[8px] border border-[var(--sb-red-bright)]/60 bg-[var(--sb-red)]/22 text-[11px] uppercase tracking-[0.08em] text-white"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-2.5 text-[13px]">
            <SettingLine label="Full name" value={draft.name} />
            <SettingLine label="Email address" value={draft.email} />
            <SettingLine label="Phone number" value={draft.phone} />
            <SettingLine label="Date of birth" value={draft.birthDate} />
          </div>
        )}
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
    <article
      className="rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4"
      id="desktop-profile-dietary"
    >
      <div className="flex items-center justify-between">
        <CardTitle
          icon="/assets/icons/vegetarian-sushi-icon.webp"
          title="Dietary preferences"
        />
        <span className="rounded-full border border-[var(--sb-gold)]/28 px-3 py-1 text-[10px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Active
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((option) => {
          const active = selected.includes(option);

          return (
            <button
              aria-pressed={active}
              className={classNames(
                "rounded-full border px-4 py-1.5 text-[13px]",
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
        className="mt-5 h-[50px] w-full rounded-[10px] border border-dashed border-[var(--sb-gold)]/26 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={() => onDietaryToggle("Chef Notes")}
        type="button"
      >
        + Add preference
      </button>
    </article>
  );
}

function PrivacySecurityCard() {
  return (
    <SettingsCard
      title="Privacy & Security"
      icon="/assets/icons/chef-crest-icon.png"
      id="desktop-profile-privacy"
    >
      {privacyRows.map(([row, action]) =>
        row === "Data & privacy" ? (
          <Link
            className="flex min-h-[42px] w-full items-center justify-between border-b border-white/10 text-left text-[13px] transition last:border-b-0 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--sb-gold)]"
            href="/support"
            key={row}
          >
            <span className="uppercase tracking-[0.04em] text-white/72">
              {row}
            </span>
            <span className="rounded-[8px] border border-[var(--sb-gold)]/36 px-3 py-1 text-[11px] uppercase text-[var(--sb-gold-soft)]">
              {action}
            </span>
          </Link>
        ) : (
          <button
            className="flex min-h-[42px] w-full cursor-not-allowed items-center justify-between border-b border-white/10 text-left text-[13px] opacity-70 last:border-b-0"
            disabled
            key={row}
            title={action}
            type="button"
          >
            <span className="uppercase tracking-[0.04em] text-white/72">
              {row}
            </span>
            <span className="rounded-[8px] border border-white/12 px-3 py-1 text-[11px] uppercase text-white/46">
              Auth setup
            </span>
          </button>
        ),
      )}
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
      id="desktop-profile-notifications"
    >
      {rows.map(([key, label, copy]) => (
        <button
          className="flex min-h-[36px] w-full items-center justify-between border-b border-white/10 text-left last:border-b-0"
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

function PaymentSettingsCard({ profile }: { profile: UserProfile }) {
  return (
    <SettingsCard
      title="Payment methods"
      icon="/assets/icons/credit-card-icon.png"
      id="desktop-profile-payments"
    >
      <div className="space-y-2">
        {profile.paymentMethods.map((method) => (
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
      <Link
        className="mt-3 flex h-9 items-center justify-center rounded-[9px] border border-[var(--sb-gold)]/32 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        href="/checkout"
      >
        Use at checkout
      </Link>
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
      id="desktop-profile-loyalty"
    >
      <p className="font-mono text-[26px] text-white">
        {account.points.toLocaleString()} PTS
      </p>
      <p className="mt-1 text-[13px] text-white/58">
        750 pts to reach Platinum
      </p>
      <div className="mt-3 h-2 rounded-full bg-white/10">
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
    <SettingsCard
      title="Member since"
      icon="/assets/icons/calendar-icon.png"
      id="desktop-profile-member"
    >
      <p className="editorial-title text-[30px] uppercase text-white">
        Jan 15, 2024
      </p>
      <p className="mt-2 text-[13px] text-white/58">Member for 4 months</p>
    </SettingsCard>
  );
}

function AccountShortcutsCard() {
  const shortcuts = [
    { label: "View order history", href: "/orders" },
    { label: "Manage payment methods", target: "desktop-profile-payments" },
    { label: "Download receipts", href: "/orders" },
  ] as const;

  return (
    <SettingsCard
      title="Account shortcuts"
      icon="/assets/icons/chef-crest-icon.png"
      id="desktop-profile-shortcuts"
    >
      {shortcuts.map((shortcut) => {
        const shortcutClassName =
          "flex min-h-[38px] w-full items-center justify-between border-b border-white/10 text-left text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] transition last:border-b-0 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--sb-gold)]";

        if ("href" in shortcut) {
          return (
            <Link
              className={shortcutClassName}
              href={shortcut.href}
              key={shortcut.label}
            >
              {shortcut.label}
              <ChevronIcon direction="right" size={18} />
            </Link>
          );
        }

        return (
          <a
            className={shortcutClassName}
            href={`#${shortcut.target}`}
            key={shortcut.label}
          >
            {shortcut.label}
            <ChevronIcon direction="right" size={18} />
          </a>
        );
      })}
    </SettingsCard>
  );
}

function SettingsCard({
  children,
  icon,
  id,
  title,
}: {
  children: ReactNode;
  icon: string;
  id?: string;
  title: string;
}) {
  return (
    <article
      className="scroll-mt-6 rounded-[14px] border border-[var(--sb-border)] bg-white/[0.035] p-4"
      id={id}
    >
      <CardTitle icon={icon} title={title} />
      <div className="mt-3">{children}</div>
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
