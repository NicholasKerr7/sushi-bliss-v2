import type { Metadata } from "next";
import { Suspense } from "react";

import { OffersDashboard } from "@/features/offers/OffersDashboard";

export const metadata: Metadata = {
  title: "Offers",
};

export default function OffersPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#050607]" />}>
      <OffersDashboard />
    </Suspense>
  );
}
