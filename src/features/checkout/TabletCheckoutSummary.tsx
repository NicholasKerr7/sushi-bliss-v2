"use client";

import Image from "next/image";

import { QuantityControl } from "@/components/ui/QuantityControl";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { CartLineItem, OrderTotals } from "@/types/order";

interface TabletCheckoutSummaryProps {
  itemCount: number;
  items: CartLineItem[];
  onEditCart: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  totals: OrderTotals;
}

export function TabletCheckoutSummary({
  itemCount,
  items,
  onEditCart,
  onRemoveItem,
  onUpdateQuantity,
  totals,
}: TabletCheckoutSummaryProps) {
  return (
    <aside className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Order Summary
          </h2>
          <p className="mt-2 text-[15px] text-white/54">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <button
          className="text-[14px] text-[var(--sb-red-bright)]"
          onClick={onEditCart}
          type="button"
        >
          Edit cart
        </button>
      </div>

      <div className="mt-5 divide-y divide-white/10">
        {items.map((item) => (
          <TabletCheckoutLine
            item={item}
            key={item.id}
            onRemoveItem={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-[15px]">
        <SummaryRow
          label={`Subtotal (${itemCount} items)`}
          value={formatMoney(totals.subtotalCents)}
        />
        {totals.discountCents > 0 ? (
          <SummaryRow
            label="Promo discount"
            value={`-${formatMoney(totals.discountCents)}`}
            valueClassName="text-[var(--sb-wasabi)]"
          />
        ) : null}
        <SummaryRow
          label="Service fee"
          value={formatMoney(totals.serviceFeeCents)}
        />
        <SummaryRow label="Tax" value={formatMoney(totals.taxCents)} />
      </div>

      <div className="mt-5 border-t border-white/10 pt-5">
        <SummaryRow
          large
          label="Total"
          value={formatMoney(totals.totalCents)}
        />
      </div>

      <div className="mt-5 rounded-[16px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/8 p-4">
        <p className="text-[15px] font-semibold text-[var(--sb-gold-soft)]">
          You&apos;ll earn {Math.floor(totals.totalCents / 100)} Bliss Points
        </p>
        <p className="mt-1 text-[13px] text-white/52">for this order</p>
      </div>
    </aside>
  );
}

function TabletCheckoutLine({
  item,
  onRemoveItem,
  onUpdateQuantity,
}: {
  item: CartLineItem;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}) {
  return (
    <article className="grid grid-cols-[86px_1fr] gap-4 py-4 first:pt-0 last:pb-0">
      <div className="relative h-[76px] overflow-hidden rounded-[10px] bg-white/[0.04]">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          loading="eager"
          sizes="86px"
          src={item.menuItem.image.publicUrl}
        />
      </div>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-semibold text-white">
              {item.menuItem.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-white/52">
              {item.menuItem.description}
            </p>
          </div>
          <button
            aria-label={`Remove ${item.menuItem.name}`}
            className="grid h-7 w-7 place-items-center rounded-full border border-[var(--sb-gold)]/32 text-[var(--sb-gold-soft)]"
            onClick={() => onRemoveItem(item.id)}
            type="button"
          >
            x
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <QuantityControl
            className="h-9 grid-cols-[2.25rem_2.5rem_2.25rem] rounded-[10px] border-[var(--sb-gold)]/28"
            max={99}
            min={0}
            onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
            value={item.quantity}
          />
          <span className="font-mono text-[15px] text-white">
            {formatMoney(calculateCartLineSubtotal(item))}
          </span>
        </div>
      </div>
    </article>
  );
}

function SummaryRow({
  label,
  large,
  value,
  valueClassName,
}: {
  label: string;
  large?: boolean;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={large ? "text-[20px] uppercase" : "text-white/72"}>
        {label}
      </span>
      <span
        className={classNames(
          large
            ? "font-mono text-[30px] text-[var(--sb-gold-soft)]"
            : "font-mono text-white",
          valueClassName,
        )}
      >
        {value}
      </span>
    </div>
  );
}
