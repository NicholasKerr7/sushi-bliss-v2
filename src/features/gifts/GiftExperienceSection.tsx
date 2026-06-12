"use client";

import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GiftCheckoutModal } from "@/features/gifts/GiftCheckoutModal";
import { GiftConfirmationModal } from "@/features/gifts/GiftConfirmationModal";
import { GiftExperienceCard } from "@/features/gifts/GiftExperienceCard";
import { GiftHistoryPanel } from "@/features/gifts/GiftHistoryPanel";
import { useGifts } from "@/hooks/useGifts";
import { useProfile } from "@/hooks/useProfile";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import type { GiftConfirmation, GiftExperience } from "@/types/gift";

import { TabletGiftExperience } from "./TabletGiftExperience";
import { MobileGiftExperience } from "./MobileGiftExperience";

/** Routes gift experiences to mobile, tablet, or expanded desktop flows. */
export function GiftExperienceSection() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileGiftExperience />;
  }

  if (mode === "tablet") {
    return <TabletGiftExperienceShell />;
  }

  return <DesktopGiftExperience />;
}

function TabletGiftExperienceShell() {
  const { profile } = useProfile();
  const { giftExperiences, sendGift } = useGifts();

  return (
    <TabletGiftExperience
      giftExperiences={giftExperiences}
      paymentMethods={profile.paymentMethods}
      profile={profile}
      onSubmitGift={(draft) => sendGift(draft, profile.paymentMethods)}
    />
  );
}

function DesktopGiftExperience() {
  const { profile } = useProfile();
  const { confirmations, giftExperiences, sendGift } = useGifts();
  const [selectedGift, setSelectedGift] = useState<GiftExperience | null>(null);
  const [confirmation, setConfirmation] = useState<GiftConfirmation | null>(
    null,
  );

  return (
    <section
      className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16"
      id="gifts"
    >
      <PageContainer>
        <SectionHeader
          eyebrow={<Badge tone="premium">Gifts</Badge>}
          subtitle="Send omakase, tasting, and flexible Sushi Bliss experiences with real recipient and payment validation."
          title="Gift experiences"
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {giftExperiences.map((gift, index) => (
            <GiftExperienceCard
              eagerImage={index === 0}
              gift={gift}
              key={gift.id}
              onSelectGift={setSelectedGift}
            />
          ))}
        </div>

        <div className="mt-6">
          <GiftHistoryPanel confirmations={confirmations} />
        </div>
      </PageContainer>

      <GiftCheckoutModal
        gift={selectedGift}
        key={selectedGift?.id || "gift-checkout"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedGift(null);
          }
        }}
        onSubmitGift={(draft) => {
          const result = sendGift(draft, profile.paymentMethods);

          if (result.confirmation) {
            setConfirmation(result.confirmation);
            setSelectedGift(null);
          }

          return result;
        }}
        paymentMethods={profile.paymentMethods}
        profile={profile}
      />
      <GiftConfirmationModal
        confirmation={confirmation}
        onClose={() => setConfirmation(null)}
      />
    </section>
  );
}
