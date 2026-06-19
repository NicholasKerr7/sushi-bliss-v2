import { AdminAnalyticsCards } from "@/features/admin/AdminAnalyticsCards";
import { AdminCustomersOverview } from "@/features/admin/AdminCustomersOverview";
import { AdminLocationsManagement } from "@/features/admin/AdminLocationsManagement";
import { AdminMenuManagement } from "@/features/admin/AdminMenuManagement";
import { AdminOffersManagement } from "@/features/admin/AdminOffersManagement";
import { AdminOperationsAnalytics } from "@/features/admin/AdminOperationsAnalytics";
import { AdminOrderManagement } from "@/features/admin/AdminOrderManagement";
import { AdminReservationManagement } from "@/features/admin/AdminReservationManagement";

const adminModeCells = [
  ["Data", "Mock"],
  ["Source", "Local"],
  ["Status", "Ready"],
] as const;

export function AdminDashboard() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section
        aria-labelledby="admin-dashboard-title"
        className="relative overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[radial-gradient(circle_at_12%_0%,rgba(215,168,79,0.13),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.018)),rgba(17,15,14,0.78)] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.42)] md:p-6"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.72),transparent)]"
        />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sb-gold-soft">
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
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-[14px] border border-white/10 bg-black/24">
            {adminModeCells.map(([label, value]) => (
              <div
                className="min-w-0 border-l border-white/10 px-2.5 py-3 first:border-l-0 min-[390px]:px-4"
                key={label}
              >
                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.06em] text-sb-dim min-[390px]:text-[11px] min-[390px]:tracking-[0.12em]">
                  {label}
                </p>
                <p className="mt-1 text-sm font-semibold text-sb-gold-soft">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
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
