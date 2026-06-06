"use client";

import Image from "next/image";

import { calculateCartLineSubtotal } from "@/lib/cart";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import { getOrderItemCount } from "@/lib/orders";
import type { Order } from "@/types/order";

interface TabletOrderReceiptProps {
  order: Order;
  pointsAwarded: number;
}

export function TabletOrderReceipt({
  order,
  pointsAwarded,
}: TabletOrderReceiptProps) {
  return (
    <aside className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Receipt
          </h2>
          <p className="mt-2 text-[15px] text-white/54">
            {getOrderItemCount(order)} items confirmed
          </p>
        </div>
        <span className="font-mono text-[14px] text-[var(--sb-gold-soft)]">
          {order.confirmationCode}
        </span>
      </div>

      <div className="mt-5 divide-y divide-white/10">
        {order.items.map((item) => (
          <article
            className="grid grid-cols-[82px_1fr_auto] gap-4 py-4 first:pt-0 last:pb-0"
            key={item.id}
          >
            <div className="relative h-[74px] overflow-hidden rounded-[10px] bg-white/[0.04]">
              <Image
                alt={item.menuItem.image.alt || item.menuItem.name}
                className="object-cover"
                fill
                sizes="82px"
                src={item.menuItem.image.publicUrl}
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold text-white">
                {item.menuItem.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-white/52">
                {item.menuItem.description}
              </p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.08em] text-white/42">
                Qty {item.quantity}
              </p>
            </div>
            <span className="self-center font-mono text-[15px] text-white">
              {formatMoney(calculateCartLineSubtotal(item))}
            </span>
          </article>
        ))}
      </div>

      <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-[15px]">
        <ReceiptRow
          label="Subtotal"
          value={formatMoney(order.totals.subtotalCents)}
        />
        {order.totals.discountCents > 0 ? (
          <ReceiptRow
            label="Promo discount"
            value={`-${formatMoney(order.totals.discountCents)}`}
            valueClassName="text-[var(--sb-wasabi)]"
          />
        ) : null}
        <ReceiptRow
          label="Service fee"
          value={formatMoney(order.totals.serviceFeeCents)}
        />
        <ReceiptRow label="Tax" value={formatMoney(order.totals.taxCents)} />
        {order.totals.tipCents > 0 ? (
          <ReceiptRow label="Tip" value={formatMoney(order.totals.tipCents)} />
        ) : null}
      </div>

      <div className="mt-5 border-t border-white/10 pt-5">
        <ReceiptRow
          large
          label="Total"
          value={formatMoney(order.totals.totalCents)}
        />
      </div>

      {pointsAwarded > 0 ? (
        <div className="mt-5 rounded-[16px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/8 p-4">
          <p className="text-[15px] font-semibold text-[var(--sb-gold-soft)]">
            +{pointsAwarded} Bliss Points earned
          </p>
          <p className="mt-1 text-[13px] text-white/52">
            Loyalty balance updated after checkout.
          </p>
        </div>
      ) : null}
    </aside>
  );
}

function ReceiptRow({
  label,
  large,
  value,
  valueClassName = "text-white",
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
            : "font-mono",
          !large && valueClassName,
        )}
      >
        {value}
      </span>
    </div>
  );
}
