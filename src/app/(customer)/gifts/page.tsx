import type { Metadata } from "next";

import { GiftExperienceSection } from "@/features/gifts/GiftExperienceSection";

export const metadata: Metadata = {
  title: "Gifts",
};

export default function GiftsPage() {
  return <GiftExperienceSection />;
}
