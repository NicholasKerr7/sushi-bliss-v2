import type { ReactNode } from "react";

import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { CartAddOnDefinition } from "@/types/order";

export function DesktopAddOnButton({
  addOn,
  checked,
  compact = false,
  onToggle,
}: {
  addOn: CartAddOnDefinition;
  checked: boolean;
  compact?: boolean;
  onToggle: (addOnId: string) => void;
}) {
  return (
    <label
      className={classNames(
        "relative grid cursor-pointer place-items-center rounded-[10px] border text-center transition",
        compact
          ? "min-h-[52px] px-2 text-[11px]"
          : "min-h-[58px] px-3 text-[12px]",
        checked
          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/12 text-white"
          : "border-white/12 bg-white/[0.025] text-white/62",
      )}
    >
      <input
        checked={checked}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={() => onToggle(addOn.id)}
        type="checkbox"
      />
      <span>{addOn.label}</span>
      <span className="font-mono text-[var(--sb-gold-soft)]">
        {formatMoney(addOn.priceCents)}
      </span>
    </label>
  );
}

export function DesktopQuantity({
  label,
  quantity,
  onQuantityChange,
}: {
  label: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}) {
  return (
    <div className="inline-grid h-12 grid-cols-[42px_1fr_42px] overflow-hidden rounded-[12px] border border-[var(--sb-gold)]/28 bg-black/24">
      <button
        aria-label={`Decrease ${label} quantity`}
        className="text-[var(--sb-gold-soft)] disabled:opacity-35"
        disabled={quantity <= 1}
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        type="button"
      >
        -
      </button>
      <span className="grid place-items-center border-x border-white/10 font-mono text-[15px]">
        {quantity}
      </span>
      <button
        aria-label={`Increase ${label} quantity`}
        className="text-[var(--sb-gold-soft)]"
        onClick={() => onQuantityChange(quantity + 1)}
        type="button"
      >
        +
      </button>
    </div>
  );
}

export function CustomizeGroup({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="border-t border-white/10 pt-4">
      <h2 className="editorial-title text-[16px] uppercase tracking-[0.08em]">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function InfoCard({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <article className="min-h-[128px] rounded-[16px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
      <h2 className="editorial-title text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-6 text-white/64">{children}</p>
    </article>
  );
}

export function TipSelector({
  selectedTip,
  subtotalCents,
  onTipChange,
}: {
  selectedTip: number;
  subtotalCents: number;
  onTipChange: (tip: number) => void;
}) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-sb-rice">Add a tip</h3>
      <div className="mt-3 grid grid-cols-4 overflow-hidden rounded-card border border-sb-line">
        {[10, 15, 20, 0].map((tip) => {
          const selected = selectedTip === tip;

          return (
            <button
              aria-pressed={selected}
              className={classNames(
                "min-h-12 border-l border-sb-line px-3 text-sm first:border-l-0",
                selected
                  ? "bg-[var(--sb-red)]/22 text-white"
                  : "bg-black/24 text-white/62",
              )}
              key={tip}
              onClick={() => onTipChange(tip)}
              type="button"
            >
              {tip === 0 ? "No tip" : `${tip}%`}
              {tip > 0 ? (
                <span className="block font-mono text-xs">
                  {formatMoney(Math.round(subtotalCents * (tip / 100)))}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
