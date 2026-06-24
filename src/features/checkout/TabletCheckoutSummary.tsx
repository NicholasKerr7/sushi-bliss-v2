"use client";

import Image from "next/image";

import { ChevronIcon } from "@/components/icons/ChevronIcon";
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
    <aside className="rounded-[16px] border border-white/10 bg-white/[0.04] p-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Order Summary
          </h2>
          <p className="mt-1 text-[14px] text-white/54">
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

      <div className="mt-3 divide-y divide-white/10">
        {items.map((item) => (
          <TabletCheckoutLine
            item={item}
            key={item.id}
            onRemoveItem={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      <div className="mt-3 space-y-2 border-t border-white/10 pt-3 text-[13px]">
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
          label="Delivery fee"
          value={formatMoney(totals.serviceFeeCents)}
        />
        <SummaryRow label="Tax" value={formatMoney(totals.taxCents)} />
        {totals.tipCents > 0 ? (
          <SummaryRow label="Tip" value={formatMoney(totals.tipCents)} />
        ) : null}
      </div>

      <div className="mt-3 border-t border-white/10 pt-3">
        <SummaryRow
          large
          label="Total"
          value={formatMoney(totals.totalCents)}
        />
      </div>

      <div className="mt-3 rounded-[14px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/8 p-3">
        <p className="text-[14px] font-semibold text-[var(--sb-gold-soft)]">
          You&apos;ll earn {Math.floor(totals.totalCents / 100)} Bliss Points
        </p>
        <p className="mt-0.5 text-[12px] text-white/52">for this order</p>
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
    <article className="grid grid-cols-[62px_minmax(0,1fr)] gap-3 py-2.5 first:pt-0 last:pb-0 min-[1080px]:grid-cols-[68px_minmax(0,1fr)]">
      <div className="relative h-[54px] overflow-hidden rounded-[10px] bg-white/[0.04] min-[1080px]:h-[56px]">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          loading="eager"
          sizes="68px"
          src={item.menuItem.image.publicUrl}
        />
      </div>
      <div className="min-w-0">
        <div className="grid grid-cols-[minmax(0,1fr)_28px] items-start gap-2">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-[14px] font-semibold text-white">
              {item.menuItem.name}
            </h3>
            <p className="mt-0.5 line-clamp-1 text-[12px] leading-4 text-white/52">
              {item.menuItem.description}
            </p>
          </div>
          <button
            aria-label={`Remove ${item.menuItem.name}`}
            className="grid h-7 w-7 place-items-center rounded-full border border-[var(--sb-gold)]/32 text-[var(--sb-gold-soft)]"
            onClick={() => onRemoveItem(item.id)}
            type="button"
          >
            <ChevronIcon direction="x" size={14} />
          </button>
        </div>
        <div className="mt-2 grid gap-2 min-[1080px]:grid-cols-[auto_minmax(0,1fr)] min-[1080px]:items-center">
          <QuantityControl
            className="h-7 grid-cols-[1.85rem_2.1rem_1.85rem] rounded-[10px] border-[var(--sb-gold)]/28"
            max={99}
            min={0}
            onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
            value={item.quantity}
          />
          <span className="justify-self-start font-mono text-[13px] text-white min-[1080px]:justify-self-end">
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
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <span className={large ? "text-[18px] uppercase" : "text-white/72"}>
        {label}
      </span>
      <span
        className={classNames(
          large
            ? "font-mono text-[26px] text-[var(--sb-gold-soft)]"
            : "font-mono text-white",
          valueClassName,
        )}
      >
        {value}
      </span>
    </div>
  );
}
