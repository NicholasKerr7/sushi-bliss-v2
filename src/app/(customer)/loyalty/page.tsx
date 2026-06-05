import type { Metadata } from "next";

import { LoyaltyDashboard } from "@/features/loyalty/LoyaltyDashboard";

export const metadata: Metadata = {
  title: "Loyalty",
};

export default function LoyaltyPage() {
  return <LoyaltyDashboard />;
}
