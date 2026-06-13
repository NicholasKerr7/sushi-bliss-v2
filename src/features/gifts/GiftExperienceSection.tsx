"use client";

import { useGifts } from "@/hooks/useGifts";
import { useProfile } from "@/hooks/useProfile";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { DesktopGiftExperience } from "./DesktopGiftExperience";
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

  return <DesktopGiftExperienceShell />;
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

function DesktopGiftExperienceShell() {
  const { profile } = useProfile();
  const { giftExperiences, sendGift } = useGifts();

  return (
    <DesktopGiftExperience
      giftExperiences={giftExperiences}
      paymentMethods={profile.paymentMethods}
      profile={profile}
      onSubmitGift={(draft) => sendGift(draft, profile.paymentMethods)}
    />
  );
}
