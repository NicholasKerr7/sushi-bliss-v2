"use client";

import { classNames } from "@/lib/classNames";

interface QuantityControlProps {
  className?: string;
  decrementLabel?: string;
  incrementLabel?: string;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  value: number;
}

export function QuantityControl({
  className,
  decrementLabel = "Decrease quantity",
  incrementLabel = "Increase quantity",
  max = 99,
  min = 0,
  onChange,
  value,
}: QuantityControlProps) {
  const nextDecrement = Math.max(value - 1, min);
  const nextIncrement = Math.min(value + 1, max);
  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <div
      className={classNames(
        "inline-grid h-11 grid-cols-[2.75rem_3rem_2.75rem] overflow-hidden rounded-control border border-sb-line bg-sb-ink/60",
        className,
      )}
    >
      <button
        aria-label={decrementLabel}
        className="flex items-center justify-center text-lg font-semibold text-sb-muted transition hover:bg-sb-rice/5 hover:text-sb-rice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!canDecrement}
        onClick={() => onChange(nextDecrement)}
        type="button"
      >
        -
      </button>
      <output
        aria-label="Quantity"
        className="flex items-center justify-center border-x border-sb-line font-mono text-sm text-sb-rice"
      >
        {value}
      </output>
      <button
        aria-label={incrementLabel}
        className="flex items-center justify-center text-lg font-semibold text-sb-muted transition hover:bg-sb-rice/5 hover:text-sb-rice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!canIncrement}
        onClick={() => onChange(nextIncrement)}
        type="button"
      >
        +
      </button>
    </div>
  );
}
