import type { Metadata } from "next";

import { OffersDashboard } from "@/features/offers/OffersDashboard";

export const metadata: Metadata = {
  title: "Offers",
};

export default function OffersPage() {
  return <OffersDashboard />;
}
