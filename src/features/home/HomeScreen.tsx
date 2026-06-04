import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { ResponsiveGrid } from "@/components/responsive/ResponsiveGrid";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { featuredMenuItems, menuCategories } from "@/data/menu";
import { offers } from "@/data/offers";
import { getBrandContent } from "@/lib/data";
import { formatMoney } from "@/lib/money";

export function HomeScreen() {
  const brand = getBrandContent();

  return (
    <div id="home" className="overflow-hidden">
      <section className="relative min-h-[calc(100dvh-4rem)] border-b border-sb-line md:min-h-[calc(100dvh-5rem)]">
        <Image
          src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
          alt="Otoro nigiri presented on a dark luxury surface"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.62]"
        />
        <div className="absolute inset-0 bg-sb-ink/60" />
        <PageContainer className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-end pb-10 pt-20 md:min-h-[calc(100dvh-5rem)] md:pb-16">
          <div className="max-w-2xl">
            <Badge tone="premium">Clean rebuild foundation</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-sb-rice sm:text-5xl md:text-6xl">
              {brand.name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-sb-muted sm:text-lg">
              {brand.tagline} rebuilt as a mobile-first Next.js app for menu
              browsing, reservations, loyalty, gifts, and premium dining flows.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="#menu-preview">View menu preview</Button>
              <Button href="#experience-preview" variant="secondary">
                Explore experiences
              </Button>
              <Button disabled variant="ghost">
                Checkout coming soon
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      <section
        id="menu-preview"
        className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16"
      >
        <PageContainer>
          <SectionHeader
            eyebrow={<Badge>Menu data connected</Badge>}
            subtitle={
              <>
                Menu items are normalized from the copied
                <span className="font-mono text-sb-gold-soft">
                  {" "}
                  data.json
                </span>{" "}
                source and resolve images through public asset URLs.
              </>
            }
            title="Featured signatures"
          />

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {menuCategories.slice(0, 8).map((category) => (
              <Badge key={category.id} tone="neutral">
                {category.label} · {category.itemCount}
              </Badge>
            ))}
          </div>

          <ResponsiveGrid className="mt-6">
            {featuredMenuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image.publicUrl}
                    alt={item.image.alt || item.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-sb-rice">
                      {item.name}
                    </h3>
                    <span className="font-mono text-sm text-sb-gold-soft">
                      {formatMoney(item.priceCents)}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-sb-muted">
                    {item.chefNote}
                  </p>
                </div>
              </Card>
            ))}
          </ResponsiveGrid>
        </PageContainer>
      </section>

      <section
        id="experience-preview"
        className="border-b border-sb-line bg-sb-ink py-12 md:py-16"
      >
        <PageContainer className="grid gap-4 md:grid-cols-2">
          {offers.map((offer) => (
            <Card key={offer.id} className="p-5">
              <Badge tone={offer.accent === "premium" ? "premium" : "neutral"}>
                Sprint preview
              </Badge>
              <h2 className="mt-4 text-xl font-semibold text-sb-rice">
                {offer.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-sb-muted">
                {offer.description}
              </p>
              <div className="mt-5">
                <Button disabled variant="ghost">
                  Flow coming soon
                </Button>
              </div>
            </Card>
          ))}
        </PageContainer>
      </section>

      <section
        id="profile-preview"
        className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16"
      >
        <PageContainer>
          <Card className="grid gap-5 p-5 md:grid-cols-[1.2fr_0.8fr] md:p-8">
            <div>
              <Badge tone="success">Ready for stateful flows</Badge>
              <h2 className="mt-4 text-2xl font-semibold text-sb-rice">
                Profile, checkout, loyalty, and reservations will share typed
                state.
              </h2>
            </div>
            <p className="text-sm leading-6 text-sb-muted">
              Sprint 0 creates the hooks and data contracts without wiring fake
              actions into the UI. Later sprints can turn each preview into a
              complete working flow.
            </p>
          </Card>
        </PageContainer>
      </section>

      <section id="support-preview" className="bg-sb-ink py-12 md:py-16">
        <PageContainer>
          <div
            id="sprint-roadmap"
            className="grid gap-4 rounded-card border border-sb-line bg-sb-panel/70 p-5 md:grid-cols-3 md:p-8"
          >
            {[
              "Sprint 1: reusable UI shell",
              "Sprint 2: deeper data and asset layer",
              "Sprint 3: menu browsing and search",
            ].map((item, index) => (
              <div
                key={item}
                className="space-y-3 text-sm font-medium text-sb-muted"
              >
                <StatusBadge tone={index === 0 ? "success" : "neutral"}>
                  {index === 0 ? "Active" : "Next"}
                </StatusBadge>
                {item}
              </div>
            ))}
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
