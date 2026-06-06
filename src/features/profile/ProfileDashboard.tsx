"use client";

import { useMemo } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { mockOrders } from "@/data/orders";
import { getMockReservations } from "@/data/reservations";
import { GiftHistoryPanel } from "@/features/gifts/GiftHistoryPanel";
import { useGifts } from "@/hooks/useGifts";
import { useLoyalty } from "@/hooks/useLoyalty";
import { useOrders } from "@/hooks/useOrders";
import { useProfile } from "@/hooks/useProfile";
import { useReservations } from "@/hooks/useReservations";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { AddressBook } from "./AddressBook";
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
  const { confirmations } = useGifts();
  const { account } = useLoyalty();
  const { activeOrders } = useOrders(mockOrders);
  const { upcomingReservations } = useReservations(
    mockReservations,
    currentTime,
  );

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
    <section
      className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16"
      id="profile"
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
  );
}
