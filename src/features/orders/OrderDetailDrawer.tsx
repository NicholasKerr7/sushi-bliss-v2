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

  return (
    <Drawer
      className="md:max-w-2xl"
      description={
        order
          ? `${order.confirmationCode} - ${formatDateTime(order.fulfillmentAt)}`
          : undefined
      }
      labelledById="order-detail-title"
      onOpenChange={onOpenChange}
      open={open && Boolean(order)}
      side={mode === "mobile" ? "bottom" : "right"}
      title="Order details"
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
          <OrderTrackingPanel order={order} />

          <section>
            <h3 className="text-sm font-semibold text-sb-rice">Receipt</h3>
            <div className="mt-3 space-y-3 rounded-card border border-sb-line bg-sb-ink/45 p-4">
              {getOrderReceiptLines(order).map((line) => (
                <div
                  className="flex items-center justify-between gap-4 text-sm"
                  key={line.id}
                >
                  <span className="text-sb-muted">{line.label}</span>
                  <span className="font-mono text-sb-rice">{line.value}</span>
                </div>
              ))}
              <CartSummary
                className="border-t border-sb-line pt-3"
                totals={order.totals}
              />
            </div>
          </section>

          <OrderTimeline order={order} />

          <section className="rounded-card border border-sb-line bg-sb-panel/60 p-4">
            <h3 className="text-sm font-semibold text-sb-rice">Handoff</h3>
            <p className="mt-2 text-sm leading-6 text-sb-muted">
              {order.mode === "delivery" && order.deliveryAddress
                ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.region}`
                : "Pickup at Sushi Bliss counter."}
            </p>
          </section>
        </div>
      ) : null}
    </Drawer>
  );
}
