import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredAssets } from "@/data/assets";
import { offers } from "@/data/offers";
import { FavoritesPreview } from "@/features/menu/FavoritesPreview";
import { MenuExplorer } from "@/features/menu/MenuExplorer";
import { PopularItems } from "@/features/menu/PopularItems";
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
          sizes="100vw"
          priority
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
              <Button href="#experience-preview" variant="secondary">
                Reserve table
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      <PopularItems />
      <MenuExplorer />
      <FavoritesPreview />

      <section
        id="orders-preview"
        className="border-b border-sb-line bg-sb-ink py-12 md:py-16"
      >
        <PageContainer>
          <Card className="grid gap-5 p-5 md:grid-cols-[1fr_1fr] md:p-8">
            <div>
              <Badge>Order status</Badge>
              <h2 className="mt-4 text-2xl font-semibold text-sb-rice">
                Active pickup and delivery updates will appear here.
              </h2>
            </div>
            <p className="text-sm leading-6 text-sb-muted">
              After checkout, guests can follow preparation, handoff, courier
              assignment, and receipt details from a single order view.
            </p>
          </Card>
        </PageContainer>
      </section>

      <section
        id="experience-preview"
        className="border-b border-sb-line bg-sb-ink py-12 md:py-16"
      >
        <PageContainer>
          <SectionHeader
            eyebrow={<Badge tone="premium">Experiences</Badge>}
            subtitle="Private tasting menus, seasonal offers, and celebratory dining packages."
            title="Omakase and offers"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {offers.map((offer) => (
              <Card key={offer.id} className="p-5">
                <Badge
                  tone={offer.accent === "premium" ? "premium" : "neutral"}
                >
                  {offer.accent === "premium" ? "Premium" : "Dining"}
                </Badge>
                <h2 className="mt-4 text-xl font-semibold text-sb-rice">
                  {offer.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-sb-muted">
                  {offer.description}
                </p>
              </Card>
            ))}
          </div>
        </PageContainer>
      </section>

      <section
        id="profile-preview"
        className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16"
      >
        <PageContainer>
          <Card className="grid gap-5 p-5 md:grid-cols-[1.2fr_0.8fr] md:p-8">
            <div>
              <Badge tone="success">Member dining</Badge>
              <h2 className="mt-4 text-2xl font-semibold text-sb-rice">
                Loyalty rewards, refined preferences, and saved dining details.
              </h2>
            </div>
            <p className="text-sm leading-6 text-sb-muted">
              Returning guests can keep preferred dining details close for
              smoother checkout, reservations, and rewards.
            </p>
          </Card>
        </PageContainer>
      </section>

      <section id="support-preview" className="bg-sb-ink py-12 md:py-16">
        <PageContainer>
          <Card className="grid gap-5 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div>
              <Badge>Concierge</Badge>
              <h2 className="mt-4 text-2xl font-semibold text-sb-rice">
                Quiet support for pickup, tasting menus, and private events.
              </h2>
            </div>
            <p className="text-sm leading-6 text-sb-muted">
              The concierge desk can help with allergies, special occasions,
              accessibility needs, and changes to the evening seating plan.
            </p>
          </Card>
        </PageContainer>
      </section>
    </div>
  );
}
