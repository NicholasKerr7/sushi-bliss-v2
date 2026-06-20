import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { CartAddOnDefinition } from "@/types/order";

const addOnIconById: Record<string, string> = {
  "caviar-5g": "/assets/ingredients/caviar.webp",
  edamame: "/assets/food/edamame-in-a-rustic-bowl.webp",
  "edamame-side": "/assets/food/edamame-in-a-rustic-bowl.webp",
  "gold-flakes": "/assets/ingredients/gold-flakes.webp",
  "green-onion": "/assets/ingredients/green-onions.webp",
  "ikura-salmon-roe": "/assets/ingredients/ikura-salmon-roe.webp",
  "miso-soup-side": "/assets/food/steaming-miso-soup-in-a-dark-bowl.webp",
  "pickled-ginger-side": "/assets/ingredients/pickled-ginger.webp",
  "seaweed-salad-side": "/assets/ingredients/seaweed-salad.webp",
  "truffle-oil": "/assets/ingredients/truffle-oil.webp",
  "yuzu-zest": "/assets/ingredients/yuzu-zest.webp",
};

const addOnDisplayLabelById: Record<string, string> = {
  "caviar-5g": "Caviar 5g",
  "green-onion": "Scallion",
  "ikura-salmon-roe": "Ikura roe",
};

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
  const icon = addOnIconById[addOn.id] || "/assets/icons/plus-icon.png";
  const displayLabel = addOnDisplayLabelById[addOn.id] || addOn.label;

  return (
    <label
      className={classNames(
        "relative grid cursor-pointer items-center rounded-[10px] border text-left transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sb-gold",
        compact
          ? "min-h-[48px] grid-cols-[36px_minmax(0,1fr)_18px] gap-2 px-2 text-[11px]"
          : "min-h-[54px] grid-cols-[38px_minmax(0,1fr)_20px] gap-2 px-2.5 text-[11px]",
        checked
          ? "border-[var(--sb-red-bright)] bg-[linear-gradient(180deg,rgba(130,12,9,0.58),rgba(28,4,4,0.82))] text-white shadow-[inset_0_0_18px_rgba(255,35,22,0.16)]"
          : "border-white/12 bg-white/[0.025] text-white/66 hover:border-[var(--sb-gold)]/38 hover:bg-white/[0.045]",
      )}
    >
      <input
        checked={checked}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={() => onToggle(addOn.id)}
        type="checkbox"
      />
      <span
        className={classNames(
          "grid place-items-center overflow-hidden rounded-[8px] border border-white/10 bg-black/34 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
          compact ? "h-8 w-8" : "h-9 w-9",
        )}
      >
        <AssetIcon
          className="h-full w-full object-cover"
          size={compact ? 32 : 36}
          src={icon}
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate leading-4" title={addOn.label}>
          {displayLabel}
        </span>
        <span className="block font-mono text-[10px] leading-4 text-[var(--sb-gold-soft)]">
          +{formatMoney(addOn.priceCents)}
        </span>
      </span>
      <span
        className={classNames(
          "grid h-[18px] w-[18px] place-items-center self-center justify-self-end rounded-full border text-[11px]",
          checked
            ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]"
            : "border-white/14",
        )}
      >
        {checked ? (
          <AssetIcon size={11} src="/assets/icons/check-icon.png" />
        ) : null}
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
    <section className="border-t border-white/10 pt-2.5">
      <h2 className="editorial-title text-[14px] uppercase tracking-[0.08em]">
        {title}
      </h2>
      <div className="mt-1.5">{children}</div>
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
