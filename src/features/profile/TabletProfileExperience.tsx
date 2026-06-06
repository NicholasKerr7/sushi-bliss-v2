"use client";

import { useState } from "react";

import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import type { LoyaltyAccount } from "@/types/loyalty";
import type { Reservation } from "@/types/reservation";
import type { PaymentMethod, UserPreferences, UserProfile } from "@/types/user";

import { TabletProfileDashboardView } from "./TabletProfileDashboardView";
import { TabletProfilePreferencesView } from "./TabletProfilePreferencesView";

type PreferencesUpdate =
  | Partial<UserPreferences>
  | ((preferences: UserPreferences) => UserPreferences);

interface TabletProfileExperienceProps {
  account: LoyaltyAccount;
  activeOrderCount: number;
  profile: UserProfile;
  upcomingReservations: Reservation[];
  onDeletePaymentMethod: (id: string) => void;
  onMakeDefaultPaymentMethod: (id: string) => void;
  onSavePaymentMethod: (paymentMethod: PaymentMethod) => void;
  onUpdatePreferences: (nextPreferences: PreferencesUpdate) => void;
}

export function TabletProfileExperience({
  account,
  activeOrderCount,
  profile,
  upcomingReservations,
  onDeletePaymentMethod,
  onMakeDefaultPaymentMethod,
  onSavePaymentMethod,
  onUpdatePreferences,
}: TabletProfileExperienceProps) {
  const [activeView, setActiveView] = useState<"dashboard" | "settings">(
    "dashboard",
  );
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      {activeView === "settings" ? (
        <TabletProfilePreferencesView
          cartCount={itemCount}
          profile={profile}
          onBack={() => setActiveView("dashboard")}
          onDeletePaymentMethod={onDeletePaymentMethod}
          onMakeDefaultPaymentMethod={onMakeDefaultPaymentMethod}
          onOpenCart={() => setCartOpen(true)}
          onSavePaymentMethod={onSavePaymentMethod}
          onUpdatePreferences={onUpdatePreferences}
        />
      ) : (
        <TabletProfileDashboardView
          account={account}
          activeOrderCount={activeOrderCount}
          cartCount={itemCount}
          profile={profile}
          upcomingReservations={upcomingReservations}
          onOpenCart={() => setCartOpen(true)}
          onOpenSettings={() => setActiveView("settings")}
        />
      )}
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </>
  );
}
