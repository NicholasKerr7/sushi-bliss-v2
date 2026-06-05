import { AboutSection } from "@/features/about/AboutSection";
import { ChefsSection } from "@/features/chefs/ChefsSection";
import { GiftExperienceSection } from "@/features/gifts/GiftExperienceSection";
import { LocationsDirectory } from "@/features/locations/LocationsDirectory";
import { LoyaltyDashboard } from "@/features/loyalty/LoyaltyDashboard";
import { FavoritesPage } from "@/features/menu/FavoritesPage";
import { MenuExplorer } from "@/features/menu/MenuExplorer";
import { NotificationsCenter } from "@/features/notifications/NotificationsCenter";
import { OmakaseExperienceSection } from "@/features/omakase/OmakaseExperienceSection";
import { PopularItems } from "@/features/menu/PopularItems";
import { OffersDashboard } from "@/features/offers/OffersDashboard";
import { OrdersDashboard } from "@/features/orders/OrdersDashboard";
import { ProfileDashboard } from "@/features/profile/ProfileDashboard";
import { ReservationsDashboard } from "@/features/reservations/ReservationsDashboard";
import { SupportCenter } from "@/features/support/SupportCenter";
import { VisualHomeDashboard } from "@/features/home/VisualHomeDashboard";
import { WelcomeScreen } from "@/features/home/WelcomeScreen";

export function HomeScreen() {
  return (
    <div id="home" className="overflow-hidden">
      <WelcomeScreen />
      <VisualHomeDashboard />
      <PopularItems />
      <MenuExplorer />
      <FavoritesPage />
      <OrdersDashboard />
      <ReservationsDashboard />
      <OmakaseExperienceSection />
      <GiftExperienceSection />
      <LocationsDirectory />
      <ProfileDashboard />
      <LoyaltyDashboard />
      <OffersDashboard />
      <NotificationsCenter />
      <SupportCenter />
      <AboutSection />
      <ChefsSection />
    </div>
  );
}
