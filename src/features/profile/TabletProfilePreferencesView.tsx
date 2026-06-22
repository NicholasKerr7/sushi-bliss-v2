"use client";

import { useState } from "react";

import { togglePreferenceTag } from "@/lib/profile";
import type { PaymentMethod, UserPreferences, UserProfile } from "@/types/user";

import { TabletAccountBottomNavigation } from "./TabletAccountBottomNavigation";
import { TabletAccountManagementCard } from "./TabletAccountManagementCard";
import { TabletDietaryPreferencesCard } from "./TabletDietaryPreferencesCard";
import { TabletDiningPreferencesCard } from "./TabletDiningPreferencesCard";
import { TabletNotificationSettingsCard } from "./TabletNotificationSettingsCard";
import { TabletPrivacySettingsCard } from "./TabletPrivacySettingsCard";
import { TabletProfileAccountTopNav } from "./TabletProfileAccountTopNav";
import { TabletProfilePreferencesHero } from "./TabletProfilePreferencesHero";
import { TabletSavedCardsCard } from "./TabletSavedCardsCard";
import { TabletSupportLinksCard } from "./TabletSupportLinksCard";

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

  const handleDefaultCardChange = (id: string) => {
    onMakeDefaultPaymentMethod(id);
    setStatusMessage("Default card updated.");
  };

  const handleCardDelete = (id: string) => {
    onDeletePaymentMethod(id);
    setStatusMessage("Payment method removed.");
  };

  const handleNotificationChange = (
    preferenceKey: keyof UserPreferences["notifications"],
    checked: boolean,
  ) => {
    onUpdatePreferences({
      notifications: {
        ...profile.preferences.notifications,
        [preferenceKey]: checked,
      },
    });
  };

  const handleLoginAlertsChange = (checked: boolean) => {
    onUpdatePreferences({
      privacy: {
        ...profile.preferences.privacy,
        loginAlerts: checked,
      },
    });
  };

  return (
    <section className="flex h-dvh min-h-dvh flex-col overflow-hidden bg-[#050607] pb-[84px] text-white">
      <TabletProfileAccountTopNav
        cartCount={cartCount}
        profile={profile}
        onOpenCart={onOpenCart}
      />

      <TabletProfilePreferencesHero onBack={onBack} />

      <main className="mx-auto w-full max-w-[992px]">
        <section className="grid grid-cols-2 gap-3 min-[1080px]:gap-4">
          <TabletDiningPreferencesCard onAccountAction={setStatusMessage} />
          <TabletDietaryPreferencesCard
            selectedDietaryTags={selectedDietaryTags}
            onDietaryToggle={handleDietaryToggle}
          />
        </section>

        <section className="mt-3 grid grid-cols-2 items-start gap-3 min-[1080px]:mt-4 min-[1080px]:gap-5">
          <div className="grid gap-3 min-[1080px]:gap-5">
            <TabletNotificationSettingsCard
              preferences={profile.preferences}
              onNotificationChange={handleNotificationChange}
            />
            <TabletSupportLinksCard />
          </div>

          <div className="grid gap-3 min-[1080px]:gap-5">
            <TabletSavedCardsCard
              profile={profile}
              statusMessage={statusMessage}
              onAddCard={handleAddCard}
              onDeletePaymentMethod={handleCardDelete}
              onMakeDefaultPaymentMethod={handleDefaultCardChange}
            />
            <TabletPrivacySettingsCard
              preferences={profile.preferences}
              onAccountAction={setStatusMessage}
              onLoginAlertsChange={handleLoginAlertsChange}
            />
            <TabletAccountManagementCard onAccountAction={setStatusMessage} />
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
