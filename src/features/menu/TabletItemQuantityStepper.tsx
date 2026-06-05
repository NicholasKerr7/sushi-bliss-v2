"use client";

import { classNames } from "@/lib/classNames";

interface TabletQuantityStepperProps {
  className?: string;
  onChange: (quantity: number) => void;
  value: number;
}

export function TabletQuantityStepper({
  className,
  onChange,
  value,
}: TabletQuantityStepperProps) {
  return (
    <div
      className={classNames(
        "grid grid-cols-[52px_1fr_52px] items-center rounded-[18px] border border-white/10 bg-black/24 p-2",
        className,
      )}
    >
      <button
        aria-label="Decrease quantity"
        className="grid h-11 w-11 place-items-center rounded-[14px] bg-white/[0.055] text-[26px] text-white disabled:opacity-35"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
        type="button"
      >
        -
      </button>
      <p className="text-center">
        <span className="block text-[12px] uppercase tracking-[0.16em] text-white/38">
          Quantity
        </span>
        <span className="font-mono text-[24px] font-semibold text-white">
          {value}
        </span>
      </p>
      <button
        aria-label="Increase quantity"
        className="grid h-11 w-11 place-items-center rounded-[14px] bg-white/[0.055] text-[24px] text-white"
        onClick={() => onChange(Math.min(12, value + 1))}
        type="button"
      >
        +
      </button>
    </div>
  );
}
