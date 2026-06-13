import type { Metadata } from "next";

import { RecentlyViewedPage } from "@/features/menu/RecentlyViewedPage";

export const metadata: Metadata = {
  title: "Recently Viewed",
};

export default function RecentlyViewedRoutePage() {
  return <RecentlyViewedPage />;
}
