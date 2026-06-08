"use client";

import { useState } from "react";

import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import type { LoyaltyAccount } from "@/types/loyalty";
import type { Reservation } from "@/types/reservation";
import type {
  Address,
  PaymentMethod,
  ProfileDetailsDraft,
  UserPreferences,
  UserProfile,
} from "@/types/user";

import {
  MobileProfileDashboardView,
  type MobileProfileSurface,
} from "./MobileProfileDashboardView";
import { MobileProfileAccountView } from "./MobileProfileAccountView";
import { MobileProfileAddressesView } from "./MobileProfileAddressesView";
import { MobileProfilePaymentsView } from "./MobileProfilePaymentsView";
import { MobileProfilePreferencesView } from "./MobileProfilePreferencesView";

type PreferencesUpdate =
  | Partial<UserPreferences>
  | ((preferences: UserPreferences) => UserPreferences);

interface MobileProfileExperienceProps {
  account: LoyaltyAccount;
  activeOrderCount: number;
  profile: UserProfile;
  upcomingReservations: Reservation[];
  onDeleteAddress: (id: string) => void;
  onDeletePaymentMethod: (id: string) => void;
  onMakeDefaultAddress: (id: string) => void;
  onMakeDefaultPaymentMethod: (id: string) => void;
  onResetProfile: () => void;
  onSaveAddress: (address: Address) => void;
  onSavePaymentMethod: (paymentMethod: PaymentMethod) => void;
  onSaveProfileDetails: (draft: ProfileDetailsDraft) => void;
  onUpdatePreferences: (nextPreferences: PreferencesUpdate) => void;
}

/** Coordinates mobile profile dashboard, account, address, payment, and settings screens. */
export function MobileProfileExperience({
  account,
  activeOrderCount,
  profile,
  upcomingReservations,
  onDeleteAddress,
  onDeletePaymentMethod,
  onMakeDefaultAddress,
  onMakeDefaultPaymentMethod,
  onResetProfile,
  onSaveAddress,
  onSavePaymentMethod,
  onSaveProfileDetails,
  onUpdatePreferences,
}: MobileProfileExperienceProps) {
  const [surface, setSurface] = useState<MobileProfileSurface>("dashboard");
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  const goDashboard = () => setSurface("dashboard");
  const openCart = () => setCartOpen(true);

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-black px-5 pb-[124px] pt-5 text-white md:hidden"
      id="profile"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/assets/textures/red-moon-sakura-background.webp')] bg-cover bg-left-top opacity-54"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_95%_16%,rgba(202,164,93,0.12),transparent_22%),radial-gradient(circle_at_0%_42%,rgba(188,20,18,0.18),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.32)_0%,#050505_35%,#030303_100%)]"
      />
      <div
        aria-hidden="true"
        className="sb-wave-pattern pointer-events-none absolute left-0 top-[19rem] h-64 w-full opacity-20"
      />

      {surface === "account" ? (
        <MobileProfileAccountView
          cartCount={itemCount}
          profile={profile}
          onBack={goDashboard}
          onOpenCart={openCart}
          onSaveProfileDetails={onSaveProfileDetails}
        />
      ) : surface === "addresses" ? (
        <MobileProfileAddressesView
          addresses={profile.addresses}
          cartCount={itemCount}
          onBack={goDashboard}
          onDeleteAddress={onDeleteAddress}
          onMakeDefaultAddress={onMakeDefaultAddress}
          onOpenCart={openCart}
          onSaveAddress={onSaveAddress}
        />
      ) : surface === "payments" ? (
        <MobileProfilePaymentsView
          cartCount={itemCount}
          onBack={goDashboard}
          onDeletePaymentMethod={onDeletePaymentMethod}
          onMakeDefaultPaymentMethod={onMakeDefaultPaymentMethod}
          onOpenCart={openCart}
          onSavePaymentMethod={onSavePaymentMethod}
          paymentMethods={profile.paymentMethods}
        />
      ) : surface === "preferences" ? (
        <MobileProfilePreferencesView
          cartCount={itemCount}
          preferences={profile.preferences}
          onBack={goDashboard}
          onOpenCart={openCart}
          onResetProfile={onResetProfile}
          onUpdatePreferences={onUpdatePreferences}
        />
      ) : (
        <MobileProfileDashboardView
          account={account}
          activeOrderCount={activeOrderCount}
          cartCount={itemCount}
          profile={profile}
          upcomingReservations={upcomingReservations}
          onOpenCart={openCart}
          onOpenSurface={setSurface}
        />
      )}

      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
