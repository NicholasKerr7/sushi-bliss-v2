"use client";

import type { LoyaltyAccount } from "@/types/loyalty";
import type {
  ProfileDetailsDraft,
  UserPreferences,
  UserProfile,
} from "@/types/user";

import { DesktopAccountShortcutsCard } from "./DesktopAccountShortcutsCard";
import { DesktopDietarySettingsCard } from "./DesktopDietarySettingsCard";
import { DesktopLoyaltyCompactCard } from "./DesktopLoyaltyCompactCard";
import { DesktopMemberSinceCard } from "./DesktopMemberSinceCard";
import { DesktopNotificationSettingsCard } from "./DesktopNotificationSettingsCard";
import { DesktopPaymentSettingsCard } from "./DesktopPaymentSettingsCard";
import { DesktopPersonalInformationCard } from "./DesktopPersonalInformationCard";
import { DesktopPrivacySecurityCard } from "./DesktopPrivacySecurityCard";
import { desktopProfileDietaryOptions } from "./DesktopProfileSettingsData";
import { DesktopProfileSettingsSidebar } from "./DesktopProfileSettingsSidebar";

export function DesktopAccountSettings({
  account,
  message,
  profile,
  progress,
  onBack,
  onDietaryToggle,
  onNotificationToggle,
  onPrivacyToggle,
  onSaveProfileDetails,
  onStatus,
}: {
  account: LoyaltyAccount;
  message: string;
  profile: UserProfile;
  progress: number;
  onBack: () => void;
  onDietaryToggle: (option: string) => void;
  onNotificationToggle: (key: keyof UserPreferences["notifications"]) => void;
  onPrivacyToggle: (key: keyof UserPreferences["privacy"]) => void;
  onSaveProfileDetails: (draft: ProfileDetailsDraft) => void;
  onStatus: (message: string) => void;
}) {
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
          <DesktopProfileSettingsSidebar onBack={onBack} />

          <section className="grid grid-cols-2 gap-4">
            <DesktopPersonalInformationCard
              profile={profile}
              onSaveProfileDetails={onSaveProfileDetails}
              onStatus={onStatus}
            />
            <DesktopDietarySettingsCard
              options={desktopProfileDietaryOptions}
              selected={profile.preferences.dietaryTags}
              onDietaryToggle={onDietaryToggle}
            />
            <DesktopPrivacySecurityCard
              preferences={profile.preferences}
              onPrivacyToggle={onPrivacyToggle}
            />
            <DesktopNotificationSettingsCard
              preferences={profile.preferences.notifications}
              onNotificationToggle={onNotificationToggle}
            />
            <DesktopPaymentSettingsCard profile={profile} />
            <DesktopLoyaltyCompactCard account={account} progress={progress} />
            <DesktopMemberSinceCard />
            <DesktopAccountShortcutsCard />
          </section>
        </div>
      </div>
    </main>
  );
}
