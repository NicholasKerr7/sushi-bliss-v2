import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { featuredAssets } from "@/data/assets";
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
import { getBrandContent } from "@/lib/data";

export function HomeScreen() {
  const brand = getBrandContent();

  return (
    <div id="home" className="overflow-hidden">
      <section className="relative min-h-[calc(100dvh-4rem)] border-b border-sb-line md:min-h-[calc(100dvh-5rem)]">
        <Image
          src={featuredAssets.heroSushi.publicUrl}
          alt={
            featuredAssets.heroSushi.alt ||
            "Otoro nigiri presented on a dark luxury surface"
          }
          fill
          loading="eager"
          preload
          sizes="100vw"
          className="object-cover opacity-[0.62]"
        />
        <div className="absolute inset-0 bg-sb-ink/60" />
        <PageContainer className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-end pb-10 pt-20 md:min-h-[calc(100dvh-5rem)] md:pb-16">
          <div className="max-w-2xl">
            <Badge tone="premium">Tokyo sushi house</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-sb-rice sm:text-5xl md:text-6xl">
              {brand.name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-sb-muted sm:text-lg">
              {brand.tagline} with chef-led nigiri, seasonal sashimi, quiet
              omakase service, and polished pickup dining.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="#menu">Explore menu</Button>
              <Button href="#reservations" variant="secondary">
                Reserve table
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

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
