import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import {
  adminKpis,
  adminLocationRows,
  adminManagementSections,
  adminMenuRows,
  adminOfferRows,
  adminRecentOrders,
  adminReservationQueue,
  adminTabletMetrics,
} from "@/data/admin";

import {
  AdminPanel,
  AnalyticsSummary,
  CompactTable,
  CustomerOverviewPanel,
  CustomerSummaryPanel,
  ManagementCard,
  ManagementTable,
  RevenueOverview,
  TopMenuPanel,
} from "./AdminManagementWidgets";
import {
  AdminKpiCard,
  AdminTopBar,
  TabletMetricCard,
} from "./AdminMetricWidgets";
import { AdminOperationsWorkspace } from "./AdminOperationsWorkspace";

export function AdminDashboard() {
  const recentOrderRows = adminRecentOrders.map(
    ([orderId, customer, , amount, status, time]) =>
      [orderId, customer, amount, status, time] as const,
  );
  const offerRows = adminOfferRows.map(
    ([offer, , discount, status, validUntil]) =>
      [offer, discount, status, validUntil] as const,
  );

  return (
    <>
      <AdminTopBar />
      <div className="mx-auto w-full max-w-[1900px] px-4 pb-10 pt-6 sm:px-5 md:px-8 md:pt-8 xl:px-10 2xl:px-12">
        <section
          aria-labelledby="admin-dashboard-title"
          className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
          id="overview"
        >
          <div className="min-w-0">
            <h1
              className="editorial-title text-[38px] leading-none text-white md:text-[44px] xl:text-[42px] 2xl:text-[36px]"
              id="admin-dashboard-title"
            >
              Admin Dashboard
            </h1>
            <p className="mt-3 text-[16px] text-[var(--sb-gold-soft)] md:text-[18px]">
              Welcome back, Hiroshi Tanaka
            </p>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Link
              className="hidden items-center gap-3 rounded-full border border-[var(--sb-gold)]/24 bg-black/28 px-3 py-2 xl:flex"
              href="/chefs/hiroshi-tanaka"
            >
              <Image
                alt="Hiroshi Tanaka"
                className="h-12 w-12 rounded-full border border-[var(--sb-gold)]/34 object-cover"
                height={48}
                priority
                src="/assets/chefs/hiroshi-tanaka-profile-photo.webp"
                width={48}
              />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">
                  Hiroshi Tanaka
                </span>
                <span className="mt-0.5 block text-[12px] text-white/58">
                  Super Admin
                </span>
              </span>
              <ChevronIcon
                className="text-[var(--sb-gold-soft)]"
                direction="down"
              />
            </Link>
            <span className="inline-flex min-h-11 items-center gap-3 rounded-[10px] border border-[var(--sb-gold)]/28 bg-black/24 px-4 text-sm text-[var(--sb-gold-soft)]">
              <AssetIcon
                loading="eager"
                size={19}
                src="/assets/icons/calendar-icon.png"
              />
              May 18 - May 24, 2024
            </span>
          </div>
        </section>

        <section
          aria-label="Admin key metrics"
          className="mt-6 hidden gap-4 xl:grid xl:grid-cols-4 2xl:grid-cols-5"
        >
          {adminKpis.map((metric) => (
            <div
              className={metric.id === "aov" ? "hidden 2xl:block" : ""}
              key={metric.id}
            >
              <AdminKpiCard metric={metric} />
            </div>
          ))}
        </section>

        <section
          aria-label="Admin mobile and tablet metrics"
          className="mt-6 grid gap-4 md:hidden"
        >
          <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2">
            {adminTabletMetrics.map((metric) => (
              <TabletMetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        <section
          aria-label="Tablet admin metrics"
          className="mt-6 hidden gap-4 md:grid md:grid-cols-2 xl:hidden"
        >
          {adminTabletMetrics.map((metric) => (
            <TabletMetricCard key={metric.id} metric={metric} />
          ))}
        </section>

        <AdminOperationsWorkspace />

        <section
          aria-label="Admin management shortcuts"
          className="mt-6 grid gap-4 xl:grid-cols-2 2xl:hidden"
        >
          {adminManagementSections.map((section) => (
            <ManagementCard key={section.id} section={section} />
          ))}
        </section>

        <section
          aria-label="Admin operations tables"
          className="mt-6 hidden gap-4 2xl:grid 2xl:grid-cols-[1.18fr_1fr_1fr]"
        >
          <AdminPanel action="View All" id="orders-admin" title="Recent Orders">
            <CompactTable
              headers={["Order", "Customer", "Amount", "Status", "Time"]}
              rows={recentOrderRows}
            />
          </AdminPanel>
          <AdminPanel
            action="View All"
            id="reservations-admin"
            title="Reservation Queue"
          >
            <CompactTable
              headers={["Time", "Customer", "Party Size", "Table", "Status"]}
              rows={adminReservationQueue}
            />
          </AdminPanel>
          <TopMenuPanel />
        </section>

        <section
          aria-label="Admin management tables"
          className="mt-4 hidden gap-4 2xl:grid 2xl:grid-cols-3"
        >
          <ManagementTable
            actionLabel="Add New Item"
            headers={["Item", "Category", "Price", "Status"]}
            id="menu-admin"
            rows={adminMenuRows}
            title="Menu Management"
          />
          <ManagementTable
            actionLabel="Create New Offer"
            headers={["Offer", "Discount", "Status", "Valid"]}
            id="offers-admin"
            rows={offerRows}
            title="Offers Management"
          />
          <ManagementTable
            actionLabel="Add New Location"
            headers={["Location", "Manager", "Status", "Orders Today"]}
            id="locations-admin"
            rows={adminLocationRows}
            title="Locations Management"
          />
        </section>

        <section className="mt-4 hidden gap-4 2xl:grid 2xl:grid-cols-[1.35fr_1fr_1fr]">
          <RevenueOverview />
          <CustomerOverviewPanel />
          <CustomerSummaryPanel />
        </section>

        <div className="mt-4 2xl:hidden">
          <AnalyticsSummary />
        </div>
      </div>
    </>
  );
}
