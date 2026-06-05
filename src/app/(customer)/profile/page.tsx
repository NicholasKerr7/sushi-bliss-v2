import type { Metadata } from "next";

import { ProfileDashboard } from "@/features/profile/ProfileDashboard";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return <ProfileDashboard />;
}
