"use client";

import { CartSummary } from "@/features/cart/CartSummary";
import { formatDateTime } from "@/lib/dates";
import { getOrderReceiptLines } from "@/lib/orders";
import type { Order } from "@/types/order";

interface TabletOrderReceiptPanelProps {
  order: Order;
}

export function TabletOrderReceiptPanel({
  order,
}: TabletOrderReceiptPanelProps) {
  return (
    <section className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Order details
          </h2>
          <p className="mt-2 text-[14px] text-white/52">
            {order.confirmationCode} - placed {formatDateTime(order.createdAt)}
          </p>
        </div>
        <span className="rounded-full border border-[var(--sb-gold)]/30 px-4 py-2 text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          {order.mode}
        </span>
      </div>

      <div className="mt-5 grid gap-3 rounded-[14px] border border-white/10 bg-black/22 p-4">
        {getOrderReceiptLines(order).map((line) => (
          <div
            className="flex items-center justify-between gap-4 text-[14px]"
            key={line.id}
          >
            <span className="text-white/64">{line.label}</span>
            <span className="font-mono text-white">{line.value}</span>
          </div>
        ))}
        <CartSummary
          className="border-t border-white/10 pt-4"
          totals={order.totals}
        />
      </div>

      <div className="mt-4 rounded-[14px] border border-white/10 bg-black/22 p-4">
        <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-white">
          Handoff
        </h3>
        <p className="mt-2 text-[14px] leading-6 text-white/58">
          {order.mode === "delivery" && order.deliveryAddress
            ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.region} ${order.deliveryAddress.postalCode}`
            : "Pickup at Sushi Bliss counter."}
        </p>
      </div>
    </section>
  );
}
