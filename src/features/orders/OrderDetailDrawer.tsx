"use client";

import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { CartSummary } from "@/features/cart/CartSummary";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { formatDateTime } from "@/lib/dates";
import { getOrderReceiptLines } from "@/lib/orders";
import type { Order } from "@/types/order";

import { OrderTimeline } from "./OrderTimeline";
import { OrderTrackingPanel } from "./OrderTrackingPanel";

interface OrderDetailDrawerProps {
  onOpenChange: (open: boolean) => void;
  onReorder: (order: Order) => void;
  open: boolean;
  order: Order | null;
}

export function OrderDetailDrawer({
  onOpenChange,
  onReorder,
  open,
  order,
}: OrderDetailDrawerProps) {
  const mode = useResponsiveMode();
  const paymentLabel = order
    ? order.paymentMethod.label ||
      `${order.paymentMethod.brand} ending ${order.paymentMethod.last4}`
    : "";
  const fulfillmentLabel = order
    ? order.mode === "delivery"
      ? "Delivery"
      : "Pickup"
    : "";
  const handoffMessage =
    order?.mode === "delivery" && order.deliveryAddress
      ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.region}`
      : "Pickup at Sushi Bliss counter.";

  return (
    <Drawer
      className="md:max-w-[42rem]"
      description={
        order
          ? `${order.confirmationCode} - ${formatDateTime(order.fulfillmentAt)}`
          : undefined
      }
      labelledById="order-detail-title"
      onOpenChange={onOpenChange}
      open={open && Boolean(order)}
      side={mode === "mobile" ? "bottom" : "right"}
      title="Order Details"
      footer={
        order ? (
          <Button className="w-full" onClick={() => onReorder(order)}>
            Reorder
          </Button>
        ) : null
      }
    >
      {order ? (
        <div className="space-y-6">
          <section className="overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-[radial-gradient(circle_at_16%_0%,rgba(239,47,37,0.2),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_65px_rgba(0,0,0,0.42)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                  Confirmation
                </p>
                <p className="mt-2 break-words font-mono text-2xl leading-none text-white">
                  {order.confirmationCode}
                </p>
              </div>
              <span className="rounded-full border border-[var(--sb-gold)]/32 bg-[var(--sb-gold)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
                {fulfillmentLabel}
              </span>
            </div>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[15px] border border-white/10 bg-black/24 p-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                  Ready time
                </dt>
                <dd className="mt-1 text-sm leading-5 text-sb-rice">
                  {formatDateTime(order.fulfillmentAt)}
                </dd>
              </div>
              <div className="rounded-[15px] border border-white/10 bg-black/24 p-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                  Payment
                </dt>
                <dd className="mt-1 text-sm leading-5 text-sb-rice">
                  {paymentLabel}
                </dd>
              </div>
            </dl>
          </section>

          <OrderTrackingPanel order={order} />

          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_55px_rgba(0,0,0,0.34)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                  Receipt
                </p>
                <h3 className="mt-1 text-sm font-semibold text-sb-rice">
                  Ordered Items
                </h3>
              </div>
              <span className="rounded-full border border-white/10 bg-black/34 px-3 py-1 text-xs text-sb-muted">
                {order.items.length} items
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {getOrderReceiptLines(order).map((line) => (
                <div
                  className="flex items-center justify-between gap-4 rounded-[14px] border border-white/8 bg-black/22 px-3 py-2 text-sm"
                  key={line.id}
                >
                  <span className="text-sb-muted">{line.label}</span>
                  <span className="font-mono text-sb-rice">{line.value}</span>
                </div>
              ))}
              <CartSummary
                className="border-t border-[var(--sb-border)] pt-3"
                totals={order.totals}
              />
            </div>
          </section>

          <OrderTimeline order={order} />

          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_55px_rgba(0,0,0,0.34)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Handoff
            </p>
            <h3 className="mt-1 text-sm font-semibold text-sb-rice">
              {fulfillmentLabel} details
            </h3>
            <p className="mt-2 text-sm leading-6 text-sb-muted">
              {handoffMessage}
            </p>
          </section>
        </div>
      ) : null}
    </Drawer>
  );
}
