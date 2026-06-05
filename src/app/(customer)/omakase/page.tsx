import type { Metadata } from "next";

import { OmakaseExperienceSection } from "@/features/omakase/OmakaseExperienceSection";

export const metadata: Metadata = {
  title: "Omakase",
};

export default function OmakasePage() {
  return <OmakaseExperienceSection />;
}
