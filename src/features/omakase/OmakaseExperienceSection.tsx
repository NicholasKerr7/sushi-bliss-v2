"use client";

import Image from "next/image";
import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { premiumReservationCards } from "@/data/omakase";
import { useOmakase } from "@/hooks/useOmakase";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { formatMoney } from "@/lib/money";

import { OmakasePackageCard } from "./OmakasePackageCard";
import { OmakaseReviewModal } from "./OmakaseReviewModal";
import { MobileOmakaseExperience } from "./MobileOmakaseExperience";
import { PremiumReservationCard } from "./PremiumReservationCard";
import { TabletOmakaseExperience } from "./TabletOmakaseExperience";

/** Routes omakase experiences to mobile, tablet, or expanded desktop flows. */
export function OmakaseExperienceSection() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileOmakaseExperience />;
  }

  if (mode === "tablet") {
    return <TabletOmakaseExperience />;
  }

  return <DesktopOmakaseExperience />;
}

function DesktopOmakaseExperience() {
  const [reviewOpen, setReviewOpen] = useState(false);
  const {
    guestCount,
    omakasePackages,
    review,
    sakePairingId,
    sakePairingOptions,
    selectedPackage,
    selectPackage,
    setSakePairingId,
    updateGuestCount,
  } = useOmakase();

  return (
    <section
      className="border-b border-sb-line bg-sb-ink py-12 md:py-16"
      id="omakase"
    >
      <PageContainer>
        <SectionHeader
          actions={
            <Button onClick={() => setReviewOpen(true)} variant="secondary">
              Review package
            </Button>
          }
          eyebrow={<Badge tone="premium">Omakase</Badge>}
          subtitle="Choose a chef-led tasting, preview the course arc, add sake pairing, and move into reservation."
          title="Premium omakase experiences"
        />

        <div className="mt-6 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="overflow-hidden">
            <div className="relative aspect-[16/10] bg-sb-panel-soft">
              <Image
                alt={selectedPackage.image.alt || selectedPackage.title}
                className="object-cover"
                fill
                loading="eager"
                sizes="(min-width: 1280px) 46vw, 100vw"
                src={selectedPackage.image.publicUrl}
              />
            </div>
            <div className="p-5 md:p-6">
              <Badge tone="premium">Course preview</Badge>
              <h3 className="mt-4 text-2xl font-semibold text-sb-rice">
                {selectedPackage.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-sb-muted">
                {selectedPackage.description}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {selectedPackage.courses.map((course) => (
                  <div
                    className="rounded-card border border-sb-line bg-sb-ink/45 p-3"
                    key={course.id}
                  >
                    <p className="text-xs font-semibold uppercase text-sb-dim">
                      {course.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-sb-rice">
                      {course.title}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-card border border-sb-line bg-sb-panel-soft/60 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-sb-dim">
                    Review estimate
                  </p>
                  <p className="mt-1 font-mono text-xl text-sb-gold-soft">
                    {formatMoney(review.totalCents)}
                  </p>
                </div>
                <p className="text-sm text-sb-muted">
                  {guestCount} guest{guestCount === 1 ? "" : "s"}
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-4">
            {omakasePackages.map((omakasePackage, index) => (
              <OmakasePackageCard
                eagerImage={index === 0}
                isSelected={selectedPackage.id === omakasePackage.id}
                key={omakasePackage.id}
                omakasePackage={omakasePackage}
                onReview={() => {
                  selectPackage(omakasePackage.id);
                  setReviewOpen(true);
                }}
                onSelect={selectPackage}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-sb-rice">
                Premium reservation cards
              </h3>
              <p className="mt-2 text-sm leading-6 text-sb-muted">
                Move selected experiences into the reservation flow.
              </p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {premiumReservationCards.map((card) => (
              <PremiumReservationCard card={card} key={card.id} />
            ))}
          </div>
        </div>
      </PageContainer>

      <OmakaseReviewModal
        onGuestCountChange={updateGuestCount}
        onOpenChange={setReviewOpen}
        onSakePairingChange={setSakePairingId}
        open={reviewOpen}
        review={review}
        sakePairingId={sakePairingId}
        sakePairingOptions={sakePairingOptions}
      />
    </section>
  );
}
