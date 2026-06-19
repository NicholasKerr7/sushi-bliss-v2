import { AssetIcon } from "@/components/icons/AssetIcon";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { classNames } from "@/lib/classNames";
import type { AdminMetric } from "@/types/admin";
import type { StatusTone } from "@/types/common";

interface AdminMetricCardProps {
  metric: AdminMetric;
}

const toneRingClasses: Record<StatusTone, string> = {
  danger:
    "border-sb-red/40 bg-sb-red/10 shadow-[0_0_18px_rgba(183,42,42,0.24)]",
  neutral: "border-white/12 bg-white/[0.035]",
  premium:
    "border-sb-gold/36 bg-sb-gold/10 shadow-[0_0_18px_rgba(215,168,79,0.18)]",
  success:
    "border-sb-wasabi/36 bg-sb-wasabi/10 shadow-[0_0_18px_rgba(138,161,90,0.14)]",
  warning:
    "border-sb-gold/36 bg-sb-gold/10 shadow-[0_0_18px_rgba(215,168,79,0.14)]",
};

export function AdminMetricCard({ metric }: AdminMetricCardProps) {
  return (
    <Card className="relative overflow-hidden p-5">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.62),transparent)]"
      />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span
            className={classNames(
              "grid h-11 w-11 place-items-center rounded-[13px] border",
              toneRingClasses[metric.tone],
            )}
          >
            <AssetIcon loading="eager" size={26} src={metric.iconUrl} />
          </span>
          <p className="mt-4 text-sm font-semibold text-sb-muted">
            {metric.label}
          </p>
          <p className="mt-2 font-mono text-[32px] font-semibold leading-none text-sb-rice">
            {metric.value}
          </p>
        </div>
        <StatusBadge className="shrink-0" tone={metric.tone}>
          Current
        </StatusBadge>
      </div>
      <p className="mt-4 border-t border-white/10 pt-3 text-sm leading-6 text-sb-muted">
        {metric.detail}
      </p>
    </Card>
  );
}
