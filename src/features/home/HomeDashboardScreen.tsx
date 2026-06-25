import { HomeDashboard } from "@/features/home/HomeDashboard";

/** Renders the customer dashboard as its own screen instead of part of a long landing page. */
export function HomeDashboardScreen() {
  return (
    <div className="min-h-dvh overflow-hidden" id="home">
      <HomeDashboard />
    </div>
  );
}
