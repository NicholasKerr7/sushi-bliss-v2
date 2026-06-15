"use client";

import { useMemo } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { mockOrders } from "@/data/orders";
import { getMockReservations } from "@/data/reservations";
import { GiftHistoryPanel } from "@/features/gifts/GiftHistoryPanel";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useGifts } from "@/hooks/useGifts";
import { useLoyalty } from "@/hooks/useLoyalty";
import { useNotifications } from "@/hooks/useNotifications";
import { useOrders } from "@/hooks/useOrders";
import { useProfile } from "@/hooks/useProfile";
import { useReservations } from "@/hooks/useReservations";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { AddressBook } from "./AddressBook";
import { DesktopProfileExperience } from "./DesktopProfileExperience";
import { MobileProfileExperience } from "./MobileProfileExperience";
import { PaymentMethodsPanel } from "./PaymentMethodsPanel";
import { PreferencesPanel } from "./PreferencesPanel";
import { ProfileDetailsForm } from "./ProfileDetailsForm";
import { ProfileSummary } from "./ProfileSummary";
import { SecurityPanel } from "./SecurityPanel";
import { TabletProfileExperience } from "./TabletProfileExperience";

export function ProfileDashboard() {
  const mode = useResponsiveMode();
  const {
    deleteAddress,
    deletePaymentMethod,
    makeDefaultAddress,
    makeDefaultPaymentMethod,
    profile,
    resetProfile,
    saveAddress,
    savePaymentMethod,
    saveProfileDetails,
    updateProfilePreferences,
  } = useProfile();
  const mockReservations = useMemo(() => getMockReservations(), []);
  const currentTime = useMemo(() => new Date().getTime(), []);
  const { favoriteItems } = useFavorites();
  const { confirmations } = useGifts();
  const { account } = useLoyalty();
  const { itemCount } = useCart();
  const { unreadCount } = useNotifications();
  const { activeOrders } = useOrders(mockOrders);
  const { upcomingReservations } = useReservations(
    mockReservations,
    currentTime,
  );

  if (mode === "mobile") {
    return (
      <MobileProfileExperience
        account={account}
        activeOrderCount={activeOrders.length}
        favoriteCount={favoriteItems.length}
        profile={profile}
        unreadNotificationCount={unreadCount}
        upcomingReservations={upcomingReservations}
        onDeleteAddress={deleteAddress}
        onDeletePaymentMethod={deletePaymentMethod}
        onMakeDefaultAddress={makeDefaultAddress}
        onMakeDefaultPaymentMethod={makeDefaultPaymentMethod}
        onResetProfile={resetProfile}
        onSaveAddress={saveAddress}
        onSavePaymentMethod={savePaymentMethod}
        onSaveProfileDetails={saveProfileDetails}
        onUpdatePreferences={updateProfilePreferences}
      />
    );
  }

  if (mode === "tablet") {
    return (
      <TabletProfileExperience
        account={account}
        activeOrderCount={activeOrders.length}
        profile={profile}
        upcomingReservations={upcomingReservations}
        onDeletePaymentMethod={deletePaymentMethod}
        onMakeDefaultPaymentMethod={makeDefaultPaymentMethod}
        onSavePaymentMethod={savePaymentMethod}
        onUpdatePreferences={updateProfilePreferences}
      />
    );
  }

  return (
    <>
      <DesktopProfileExperience
        account={account}
        activeOrderCount={activeOrders.length}
        cartCount={itemCount}
        profile={profile}
        upcomingReservations={upcomingReservations}
        onSaveProfileDetails={saveProfileDetails}
        onUpdatePreferences={updateProfilePreferences}
      />
      <section
        className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16 xl:hidden"
        id="profile-legacy"
      >
        <PageContainer>
          <SectionHeader
            eyebrow={<Badge tone="success">Profile</Badge>}
            subtitle="Manage dining details used across checkout, reservations, loyalty, orders, and concierge support."
            title="Member settings"
          />

          <div className="mt-6">
            <ProfileSummary
              activeOrderCount={activeOrders.length}
              loyaltyAccount={account}
              profile={profile}
              upcomingReservationCount={upcomingReservations.length}
            />
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5">
              <ProfileDetailsForm
                onSaveProfileDetails={saveProfileDetails}
                profile={profile}
              />
              <PreferencesPanel
                onUpdatePreferences={updateProfilePreferences}
                preferences={profile.preferences}
              />
            </div>

            <div className="space-y-5">
              <AddressBook
                addresses={profile.addresses}
                onDeleteAddress={deleteAddress}
                onMakeDefaultAddress={makeDefaultAddress}
                onSaveAddress={saveAddress}
              />
              <PaymentMethodsPanel
                onDeletePaymentMethod={deletePaymentMethod}
                onMakeDefaultPaymentMethod={makeDefaultPaymentMethod}
                onSavePaymentMethod={savePaymentMethod}
                paymentMethods={profile.paymentMethods}
              />
              <GiftHistoryPanel confirmations={confirmations} />
              <SecurityPanel
                onResetProfile={resetProfile}
                onUpdatePreferences={updateProfilePreferences}
                preferences={profile.preferences}
              />
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
