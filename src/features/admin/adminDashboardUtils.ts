export type AdminStatusTone = "danger" | "neutral" | "success" | "warning";

export const statusToneClasses: Record<AdminStatusTone, string> = {
  danger: "bg-[var(--sb-red)]/20 text-[var(--sb-red-bright)]",
  neutral: "bg-white/10 text-white/76",
  success: "bg-emerald-500/16 text-emerald-300",
  warning: "bg-[var(--sb-gold)]/18 text-[var(--sb-gold-soft)]",
};

export function getStatusTone(status: string): AdminStatusTone {
  const normalized = status.toLowerCase();

  if (
    normalized.includes("pending") ||
    normalized.includes("preparing") ||
    normalized.includes("delivery") ||
    normalized.includes("maintenance") ||
    normalized.includes("scheduled")
  ) {
    return "warning";
  }

  if (normalized.includes("inactive") || normalized.includes("expired")) {
    return "danger";
  }

  if (normalized.includes("active") || normalized.includes("confirmed")) {
    return "success";
  }

  return "neutral";
}

export function isStatusValue(value: string): boolean {
  return [
    "active",
    "completed",
    "confirmed",
    "expired",
    "inactive",
    "maintenance",
    "out for delivery",
    "pending",
    "preparing",
    "scheduled",
  ].includes(value.toLowerCase());
}

export function getSparklinePoints(values: readonly number[]): string {
  const width = 180;
  const height = 54;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 10) - 5;

      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}
