import type { ComponentType } from "react";

import type { CustomerRouteId } from "@/data/customerRoutes";
import { AboutSection } from "@/features/about/AboutSection";
import { ChefsSection } from "@/features/chefs/ChefsSection";
import { GiftExperienceSection } from "@/features/gifts/GiftExperienceSection";
import { HomeDashboardScreen } from "@/features/home/HomeDashboardScreen";
import { LocationsDirectory } from "@/features/locations/LocationsDirectory";
import { LoyaltyDashboard } from "@/features/loyalty/LoyaltyDashboard";
import { FavoritesPage } from "@/features/menu/FavoritesPage";
import { MenuExplorer } from "@/features/menu/MenuExplorer";
import { NotificationsCenter } from "@/features/notifications/NotificationsCenter";
import { OffersDashboard } from "@/features/offers/OffersDashboard";
import { OmakaseExperienceSection } from "@/features/omakase/OmakaseExperienceSection";
import { OrdersDashboard } from "@/features/orders/OrdersDashboard";
import { ProfileDashboard } from "@/features/profile/ProfileDashboard";
import { ReservationsDashboard } from "@/features/reservations/ReservationsDashboard";
import { SupportCenter } from "@/features/support/SupportCenter";

const customerRouteScreens = {
  about: AboutSection,
  chefs: ChefsSection,
  favorites: FavoritesPage,
  gifts: GiftExperienceSection,
  home: HomeDashboardScreen,
  locations: LocationsDirectory,
  loyalty: LoyaltyDashboard,
  menu: MenuExplorer,
  notifications: NotificationsCenter,
  offers: OffersDashboard,
  omakase: OmakaseExperienceSection,
  orders: OrdersDashboard,
  profile: ProfileDashboard,
  reservations: ReservationsDashboard,
  support: SupportCenter,
} satisfies Record<CustomerRouteId, ComponentType>;

/** Renders one customer feature screen for a route-level page. */
export function CustomerRouteScreen({ routeId }: { routeId: CustomerRouteId }) {
  const Screen = customerRouteScreens[routeId];

  return (
    <div className="min-h-dvh overflow-hidden">
      <Screen />
    </div>
  );
}
