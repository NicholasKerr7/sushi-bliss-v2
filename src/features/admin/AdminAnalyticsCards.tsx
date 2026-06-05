import { AdminMetricCard } from "@/features/admin/AdminMetricCard";
import { getAdminMetrics } from "@/lib/admin";

export function AdminAnalyticsCards() {
  const metrics = getAdminMetrics();

  return (
    <section id="overview">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <AdminMetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
}
