"use client";

import Image from "next/image";

import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { CartAddOnDefinition } from "@/types/order";

import { getAddOnImageSrc, getCompactAddOnLabel } from "./addOnVisuals";

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
          const imageSrc = getAddOnImageSrc(addOn.id);
          const displayLabel = getCompactAddOnLabel(addOn.id, addOn.label);

          return (
            <label
              className={classNames(
                "grid cursor-pointer grid-cols-[54px_minmax(0,1fr)_24px] items-center gap-3 rounded-card border p-2.5 transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sb-gold",
                selected
                  ? "border-sb-gold bg-sb-gold/10 shadow-[0_0_22px_rgba(215,168,79,0.12)]"
                  : "border-sb-line bg-sb-panel/55 hover:bg-sb-rice/5",
              )}
              key={addOn.id}
            >
              <input
                checked={selected}
                className="sr-only"
                onChange={() => onAddOnToggle(addOn.id)}
                type="checkbox"
              />
              <span className="relative h-[54px] w-[54px] overflow-hidden rounded-[14px] border border-sb-line bg-black/34">
                <Image
                  alt=""
                  className="h-full w-full object-cover"
                  height={54}
                  loading="eager"
                  sizes="54px"
                  src={imageSrc}
                  width={54}
                />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.28))]" />
              </span>
              <span className="min-w-0">
                <span className="flex items-start justify-between gap-3">
                  <span
                    className="truncate text-sm font-semibold text-sb-rice"
                    title={addOn.label}
                  >
                    {displayLabel}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-sb-gold-soft">
                    {formatMoney(addOn.priceCents)}
                  </span>
                </span>
                <span className="mt-1 line-clamp-2 block text-xs leading-5 text-sb-muted">
                  {addOn.description}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={classNames(
                  "grid h-6 w-6 place-items-center justify-self-end rounded-full border text-[11px]",
                  selected
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)] text-white"
                    : "border-white/14 text-transparent",
                )}
              >
                ✓
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
