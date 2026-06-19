import type { Metadata } from "next";
import { Suspense } from "react";

import { ReservationsDashboard } from "@/features/reservations/ReservationsDashboard";

export const metadata: Metadata = {
  title: "Reservations",
};

export default function ReservationsPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#040506]" />}>
      <ReservationsDashboard />
    </Suspense>
  );
}
