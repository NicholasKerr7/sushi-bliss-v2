import type { Metadata } from "next";

import { SupportCenter } from "@/features/support/SupportCenter";

export const metadata: Metadata = {
  title: "Support",
};

export default function SupportPage() {
  return <SupportCenter />;
}
