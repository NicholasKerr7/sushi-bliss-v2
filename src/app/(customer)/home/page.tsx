import type { Metadata } from "next";

import { HomeDashboardScreen } from "@/features/home/HomeDashboardScreen";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return <HomeDashboardScreen />;
}
