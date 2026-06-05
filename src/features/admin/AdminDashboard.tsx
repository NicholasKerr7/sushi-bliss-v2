import { AdminAnalyticsCards } from "@/features/admin/AdminAnalyticsCards";
import { AdminCustomersOverview } from "@/features/admin/AdminCustomersOverview";
import { AdminLocationsManagement } from "@/features/admin/AdminLocationsManagement";
import { AdminMenuManagement } from "@/features/admin/AdminMenuManagement";
import { AdminOffersManagement } from "@/features/admin/AdminOffersManagement";
import { AdminOperationsAnalytics } from "@/features/admin/AdminOperationsAnalytics";
import { AdminOrderManagement } from "@/features/admin/AdminOrderManagement";
import { AdminReservationManagement } from "@/features/admin/AdminReservationManagement";

export function AdminDashboard() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section
        aria-labelledby="admin-dashboard-title"
        className="rounded-card border border-sb-line bg-sb-panel/70 p-5 md:p-6"
      >
        <p className="text-xs font-semibold uppercase text-sb-gold-soft">
          Internal console
        </p>
        <h1
          className="mt-2 text-3xl font-semibold text-sb-rice md:text-4xl"
          id="admin-dashboard-title"
        >
          Sushi Bliss admin
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-sb-muted md:text-base">
          Operational control for the current Sushi Bliss data set.
        </p>
      </section>

      <AdminAnalyticsCards />

      <div className="grid gap-6">
        <AdminMenuManagement />
        <AdminOrderManagement />
        <AdminReservationManagement />
        <AdminOffersManagement />
        <AdminLocationsManagement />
        <AdminCustomersOverview />
        <AdminOperationsAnalytics />
      </div>
    </div>
  );
}
