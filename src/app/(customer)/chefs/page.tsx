import type { Metadata } from "next";

import { ChefsSection } from "@/features/chefs/ChefsSection";

export const metadata: Metadata = {
  title: "Chefs",
};

export default function ChefsPage() {
  return <ChefsSection />;
}
