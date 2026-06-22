"use client";

import { ExploreDirectory } from "@/components/layout/ExploreDirectory";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { locations } from "@/data/locations";
import { getNextTier, getTierProgress } from "@/lib/loyalty";
import type { LoyaltyAccount } from "@/types/loyalty";
import type { Reservation } from "@/types/reservation";
import type { UserProfile } from "@/types/user";

import { getTabletReservationDateSummary } from "./TabletProfileDashboardData";
import { TabletProfileHeader } from "./TabletProfileHeader";
import { TabletProfileHeroCard } from "./TabletProfileHeroCard";
import { TabletProfilePaymentMethodsCard } from "./TabletProfilePaymentMethodsCard";
import { TabletProfileQuickActions } from "./TabletProfileQuickActions";
import { TabletProfileRecentActivityCard } from "./TabletProfileRecentActivityCard";
import { TabletProfileSavedAddressesCard } from "./TabletProfileSavedAddressesCard";
import { TabletProfileSettingsLinksCard } from "./TabletProfileSettingsLinksCard";
import { TabletProfileUpcomingReservationCard } from "./TabletProfileUpcomingReservationCard";

interface TabletProfileDashboardViewProps {
  account: LoyaltyAccount;
  activeOrderCount: number;
  cartCount: number;
  profile: UserProfile;
  upcomingReservations: Reservation[];
  onOpenCart: () => void;
  onOpenSettings: () => void;
}

export function TabletProfileDashboardView({
  account,
  activeOrderCount,
  cartCount,
  profile,
  upcomingReservations,
  onOpenCart,
  onOpenSettings,
}: TabletProfileDashboardViewProps) {
  const nextTier = getNextTier(account.lifetimePoints);
  const progress = getTierProgress(account);
  const pointsToNextTier = nextTier
    ? Math.max(nextTier.minimumPoints - account.lifetimePoints, 0)
    : 0;
  const upcomingReservation = upcomingReservations[0];
  const reservationLocation = upcomingReservation
    ? locations.find(
        (location) => location.id === upcomingReservation.locationId,
      )
    : locations[0];
  const reservationDate = getTabletReservationDateSummary(
    upcomingReservation?.startsAt,
  );

  return (
    <section
      className="min-h-dvh overflow-x-hidden bg-[#050607] px-[18px] pb-3 pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pb-4 min-[1080px]:pt-3"
      id="profile"
    >
      <TabletProfileHeader
        cartCount={cartCount}
        profile={profile}
        section="dashboard"
        onOpenCart={onOpenCart}
      />

      <main className="mx-auto w-full max-w-[1034px] pb-[136px] min-[1080px]:pb-[148px]">
        <TabletProfileHeroCard
          account={account}
          activeOrderCount={activeOrderCount}
          nextTierMinimumLabel={
            nextTier?.minimumPoints.toLocaleString() || "Max"
          }
          pointsToNextTier={pointsToNextTier}
          profile={profile}
          progress={progress}
          onOpenSettings={onOpenSettings}
        />

        <TabletProfileQuickActions />

        <ExploreDirectory variant="tablet" />

        <section className="mt-3 grid grid-cols-2 gap-3 min-[1080px]:mt-4 min-[1080px]:gap-5">
          <TabletProfileSavedAddressesCard
            profile={profile}
            onOpenSettings={onOpenSettings}
          />
          <TabletProfilePaymentMethodsCard
            profile={profile}
            onOpenSettings={onOpenSettings}
          />
        </section>

        <section className="mt-4 hidden grid-cols-2 gap-5 min-[1080px]:grid">
          <TabletProfileRecentActivityCard />
          <TabletProfileUpcomingReservationCard
            reservation={upcomingReservation}
            reservationDate={reservationDate}
            reservationLocation={reservationLocation}
          />
        </section>

        <TabletProfileSettingsLinksCard onOpenSettings={onOpenSettings} />
      </main>

      <TabletBottomNavigation
        activeId="profile"
        ariaLabel="Tablet profile navigation"
      />
    </section>
  );
}
