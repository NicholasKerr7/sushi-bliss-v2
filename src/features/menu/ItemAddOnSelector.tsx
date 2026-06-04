"use client";

import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { CartAddOnDefinition } from "@/types/order";

interface ItemAddOnSelectorProps {
  addOns: CartAddOnDefinition[];
  onAddOnToggle: (addOnId: string) => void;
  selectedAddOnIds: string[];
}

export function ItemAddOnSelector({
  addOns,
  onAddOnToggle,
  selectedAddOnIds,
}: ItemAddOnSelectorProps) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-sb-rice">Add-ons</h3>
      <div className="mt-3 grid gap-2">
        {addOns.map((addOn) => {
          const selected = selectedAddOnIds.includes(addOn.id);

          return (
            <label
              className={classNames(
                "flex cursor-pointer items-start gap-3 rounded-card border p-3 transition",
                selected
                  ? "border-sb-gold bg-sb-gold/10"
                  : "border-sb-line bg-sb-panel/55 hover:bg-sb-rice/5",
              )}
              key={addOn.id}
            >
              <input
                checked={selected}
                className="mt-1 accent-sb-gold"
                onChange={() => onAddOnToggle(addOn.id)}
                type="checkbox"
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold text-sb-rice">
                    {addOn.label}
                  </span>
                  <span className="font-mono text-xs text-sb-gold-soft">
                    {formatMoney(addOn.priceCents)}
                  </span>
                </span>
                <span className="mt-1 block text-xs leading-5 text-sb-muted">
                  {addOn.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
