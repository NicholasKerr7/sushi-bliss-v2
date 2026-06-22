import { AssetIcon } from "@/components/icons/AssetIcon";
import { adminKpis, adminTabletMetrics } from "@/data/admin";

import { AdminDashboardWorkbench } from "./AdminDashboardWorkbench";
import { AdminOperationsIntelligence } from "./AdminOperationsIntelligence";
import {
  AdminKpiCard,
  AdminTopBar,
  TabletMetricCard,
} from "./AdminMetricWidgets";

export function AdminDashboard() {
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
              className="editorial-title text-[38px] leading-none text-white md:text-[44px] xl:text-[46px] 2xl:text-[50px]"
              id="admin-dashboard-title"
            >
              Admin Dashboard
            </h1>
            <p className="mt-3 text-[16px] text-[var(--sb-gold-soft)] md:text-[18px]">
              Welcome back, Hiroshi Tanaka
            </p>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <span className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-emerald-400/20 bg-emerald-400/[0.07] px-4 text-sm text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.82)]" />
              Live floor
            </span>
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
          className="mt-6 hidden gap-3 xl:grid xl:grid-cols-5 2xl:gap-4"
        >
          {adminKpis.map((metric) => (
            <div key={metric.id}>
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

        <AdminDashboardWorkbench />
        <AdminOperationsIntelligence />
      </div>
    </>
  );
}
