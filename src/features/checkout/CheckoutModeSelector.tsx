"use client";

import { classNames } from "@/lib/classNames";
import type { FulfillmentMode } from "@/types/common";

interface CheckoutModeSelectorProps {
  mode: FulfillmentMode;
  onModeChange: (mode: FulfillmentMode) => void;
}

const fulfillmentOptions: Array<{
  description: string;
  label: string;
  value: FulfillmentMode;
}> = [
  {
    description: "Prepared for counter pickup.",
    label: "Pickup",
    value: "pickup",
  },
  {
    description: "Delivered by local courier.",
    label: "Delivery",
    value: "delivery",
  },
];

export function CheckoutModeSelector({
  mode,
  onModeChange,
}: CheckoutModeSelectorProps) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-sb-rice">Fulfillment</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {fulfillmentOptions.map((option) => {
          const selected = option.value === mode;

          return (
            <button
              aria-pressed={selected}
              className={classNames(
                "rounded-card border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                selected
                  ? "border-sb-gold bg-sb-gold/10"
                  : "border-sb-line bg-sb-panel/60 hover:bg-sb-rice/5",
              )}
              key={option.value}
              onClick={() => onModeChange(option.value)}
              type="button"
            >
              <span className="block text-sm font-semibold text-sb-rice">
                {option.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-sb-muted">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
