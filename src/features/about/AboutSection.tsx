"use client";

import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { appContent, brandContent } from "@/data/brand";
import { featuredAssets } from "@/data/assets";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { MobileAboutSection } from "./MobileAboutSection";
import { TabletAboutSection } from "./TabletAboutSection";

/** Switches the brand story between mobile-first and expanded editorial layouts. */
export function AboutSection() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileAboutSection />;
  }

  if (mode === "tablet") {
    return <TabletAboutSection />;
  }

  return <DesktopAboutSection />;
}

function DesktopAboutSection() {
  const primaryAmbience =
    featuredAssets.ambience[0]?.image || featuredAssets.heroSushi;
  const detailAmbience =
    featuredAssets.ambience[2]?.image || featuredAssets.heroSushi;

  return (
    <section
      className="border-b border-sb-line bg-sb-ink py-12 md:py-16"
      id="about"
    >
      <PageContainer>
        <SectionHeader
          eyebrow={<Badge tone="premium">About</Badge>}
          subtitle="A dark, polished sushi house shaped around daily sourcing, quiet service, and chef-led hospitality."
          title={`The ${brandContent.name} story`}
        />

        <div className="mt-6 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[24rem] overflow-hidden rounded-card border border-sb-line bg-sb-panel-soft">
            <Image
              alt={primaryAmbience.alt || "Sushi Bliss dining room"}
              className="object-cover"
              fill
              loading="eager"
              sizes="(min-width: 1280px) 52vw, 100vw"
              src={primaryAmbience.publicUrl}
            />
            <div className="absolute inset-0 bg-sb-ink/35" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
              <StatusBadge tone="premium">
                Opened for nightly service
              </StatusBadge>
              <p className="mt-4 max-w-xl text-2xl font-semibold leading-tight text-sb-rice md:text-3xl">
                {brandContent.tagline}, translated into a modern member dining
                room.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            <Card className="grid gap-5 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-6">
              <div>
                <h3 className="text-xl font-semibold text-sb-rice">
                  Dining address
                </h3>
                <p className="mt-2 text-sm leading-6 text-sb-muted">
                  {appContent.location.label}
                  <br />
                  {appContent.location.street}
                  <br />
                  {appContent.location.postalLine}
                </p>
              </div>
              <div className="rounded-card border border-sb-line bg-sb-ink/50 p-4">
                <p className="text-xs font-semibold uppercase text-sb-dim">
                  Service
                </p>
                <p className="mt-2 text-sm font-semibold text-sb-rice">
                  {appContent.hours.days}
                </p>
                <p className="mt-1 text-sm text-sb-muted">
                  {appContent.hours.service}
                </p>
                <p className="mt-1 text-xs text-sb-dim">
                  {appContent.hours.lastOrder}
                </p>
              </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              {appContent.benefits.map((benefit) => (
                <Card className="p-5" key={benefit.id}>
                  <StatusBadge tone="premium">{benefit.copy}</StatusBadge>
                  <h3 className="mt-3 text-base font-semibold text-sb-rice">
                    {benefit.title}
                  </h3>
                </Card>
              ))}
            </div>

            <Card className="grid gap-4 overflow-hidden md:grid-cols-[10rem_1fr]">
              <div className="relative min-h-44 bg-sb-panel-soft">
                <Image
                  alt={detailAmbience.alt || "Chef counter dining room"}
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 10rem, 100vw"
                  src={detailAmbience.publicUrl}
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-sb-rice">
                  Hospitality standard
                </h3>
                <p className="mt-3 text-sm leading-6 text-sb-muted">
                  The app mirrors the dining room: quick ordering, clear
                  reservations, visible preferences, and concierge support for
                  details that need care.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
