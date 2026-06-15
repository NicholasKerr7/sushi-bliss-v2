"use client";

import { useState } from "react";

import { DesktopMenuHeader } from "@/features/menu/DesktopMenuChrome";
import { getTierProgress } from "@/lib/loyalty";
import { togglePreferenceTag } from "@/lib/profile";
import type { LoyaltyAccount } from "@/types/loyalty";
import type { Reservation } from "@/types/reservation";
import type {
  ProfileDetailsDraft,
  UserPreferences,
  UserProfile,
} from "@/types/user";

import { DesktopProfileDashboard } from "./DesktopProfileDashboard";
import { DesktopAccountSettings } from "./DesktopProfileSettings";

type ProfileView = "dashboard" | "settings";
type PreferencesUpdate =
  | Partial<UserPreferences>
  | ((preferences: UserPreferences) => UserPreferences);

interface DesktopProfileExperienceProps {
  account: LoyaltyAccount;
  activeOrderCount: number;
  cartCount: number;
  profile: UserProfile;
  upcomingReservations: Reservation[];
  onSaveProfileDetails: (draft: ProfileDetailsDraft) => void;
  onUpdatePreferences: (nextPreferences: PreferencesUpdate) => void;
}

export function DesktopProfileExperience({
  account,
  activeOrderCount,
  cartCount,
  profile,
  upcomingReservations,
  onSaveProfileDetails,
  onUpdatePreferences,
}: DesktopProfileExperienceProps) {
  const [view, setView] = useState<ProfileView>("dashboard");
  const [message, setMessage] = useState("");
  const progress = getTierProgress(account);
  const upcomingReservation = upcomingReservations[0];

  const handleDietaryToggle = (option: string) => {
    onUpdatePreferences((current) => ({
      ...current,
      dietaryTags: togglePreferenceTag(current.dietaryTags, option),
    }));
    setMessage(`${option} preference updated.`);
  };

  const handleNotificationToggle = (
    key: keyof UserPreferences["notifications"],
  ) => {
    onUpdatePreferences((current) => ({
      ...current,
      notifications: {
        ...current.notifications,
        [key]: !current.notifications[key],
      },
    }));
    setMessage("Notification preference updated.");
  };

  const handlePrivacyToggle = (key: keyof UserPreferences["privacy"]) => {
    onUpdatePreferences((current) => ({
      ...current,
      privacy: {
        ...current.privacy,
        [key]: !current.privacy[key],
      },
    }));
    setMessage("Privacy preference updated.");
  };

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="profile"
    >
      <DesktopMenuHeader activeId="profile" cartCount={cartCount} />
      {view === "settings" ? (
        <DesktopAccountSettings
          account={account}
          message={message}
          profile={profile}
          progress={progress}
          onBack={() => setView("dashboard")}
          onDietaryToggle={handleDietaryToggle}
          onNotificationToggle={handleNotificationToggle}
          onPrivacyToggle={handlePrivacyToggle}
          onSaveProfileDetails={onSaveProfileDetails}
          onStatus={setMessage}
        />
      ) : (
        <DesktopProfileDashboard
          account={account}
          activeOrderCount={activeOrderCount}
          message={message}
          profile={profile}
          progress={progress}
          upcomingReservation={upcomingReservation}
          onOpenSettings={() => setView("settings")}
        />
      )}
    </section>
  );
}
