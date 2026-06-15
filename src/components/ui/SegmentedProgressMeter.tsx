import { classNames } from "@/lib/classNames";

type SegmentedProgressMeterSize = "compact" | "default";
type SegmentedProgressMeterTone = "gold" | "redGold";

interface SegmentedProgressMeterProps {
  ariaLabel: string;
  className?: string;
  label?: string;
  max?: number;
  segments?: 10 | 12 | 16;
  size?: SegmentedProgressMeterSize;
  tone?: SegmentedProgressMeterTone;
  value: number;
  valueLabel?: string;
}

const segmentGridClasses = {
  10: "grid-cols-[repeat(10,minmax(0,1fr))]",
  12: "grid-cols-[repeat(12,minmax(0,1fr))]",
  16: "grid-cols-[repeat(16,minmax(0,1fr))]",
};

const activeToneClasses = {
  gold: "bg-[linear-gradient(90deg,var(--sb-gold),var(--sb-gold-soft))] shadow-[0_0_12px_rgba(215,168,79,0.36)]",
  redGold:
    "bg-[linear-gradient(90deg,var(--sb-red-bright),var(--sb-gold-soft))] shadow-[0_0_12px_rgba(239,47,37,0.35)]",
};

const sizeClasses = {
  compact: "h-2.5 gap-0.5 p-0.5",
  default: "h-3 gap-1 p-1",
};

/** Shared segmented meter for reward tiers, delivery goals, and premium progress states. */
export function SegmentedProgressMeter({
  ariaLabel,
  className,
  label,
  max = 100,
  segments = 16,
  size = "default",
  tone = "redGold",
  value,
  valueLabel,
}: SegmentedProgressMeterProps) {
  const safeMax = Math.max(max, 1);
  const safeValue = Math.min(Math.max(value, 0), safeMax);
  const activeSegments = Math.round((safeValue / safeMax) * segments);

  return (
    <div className={className}>
      {label ? (
        <div className="mb-2 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.12em] text-white/46">
          <span>{label}</span>
          {valueLabel ? (
            <span className="text-[var(--sb-gold-soft)]">{valueLabel}</span>
          ) : null}
        </div>
      ) : null}
      <div
        aria-label={ariaLabel}
        aria-valuemax={safeMax}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        aria-valuetext={valueLabel}
        className={classNames(
          "grid rounded-full border border-white/[0.06] bg-black/44 shadow-[inset_0_0_12px_rgba(0,0,0,0.72)]",
          segmentGridClasses[segments],
          sizeClasses[size],
        )}
        role="progressbar"
      >
        {Array.from({ length: segments }).map((_, index) => (
          <span
            aria-hidden="true"
            className={classNames(
              "rounded-full",
              index < activeSegments ? activeToneClasses[tone] : "bg-white/10",
            )}
            key={`${ariaLabel}-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
