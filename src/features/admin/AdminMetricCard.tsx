import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { AdminMetric } from "@/types/admin";

interface AdminMetricCardProps {
  metric: AdminMetric;
}

export function AdminMetricCard({ metric }: AdminMetricCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-sb-muted">{metric.label}</p>
          <p className="mt-3 font-mono text-3xl font-semibold text-sb-rice">
            {metric.value}
          </p>
        </div>
        <StatusBadge tone={metric.tone}>Current</StatusBadge>
      </div>
      <p className="mt-3 text-sm leading-6 text-sb-muted">{metric.detail}</p>
    </Card>
  );
}
