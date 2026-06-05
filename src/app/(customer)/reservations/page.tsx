import type { Metadata } from "next";

import { ReservationsDashboard } from "@/features/reservations/ReservationsDashboard";

export const metadata: Metadata = {
  title: "Reservations",
};

export default function ReservationsPage() {
  return <ReservationsDashboard />;
}
