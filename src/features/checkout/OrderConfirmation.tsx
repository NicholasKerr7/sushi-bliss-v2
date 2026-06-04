"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { Order } from "@/types/order";

interface OrderConfirmationProps {
  onClose: () => void;
  order: Order | null;
}

export function OrderConfirmation({ onClose, order }: OrderConfirmationProps) {
  return (
    <Modal
      description={
        order
          ? `${order.mode === "delivery" ? "Delivery" : "Pickup"} at ${formatDateTime(order.fulfillmentAt)}`
          : undefined
      }
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      open={Boolean(order)}
      title="Order confirmed"
      footer={
        <Button className="w-full" onClick={onClose}>
          Continue browsing
        </Button>
      }
    >
      {order ? (
        <div className="space-y-5">
          <div className="rounded-card border border-sb-gold/30 bg-sb-gold/10 p-4">
            <p className="text-xs font-semibold uppercase text-sb-dim">
              Confirmation
            </p>
            <p className="mt-2 font-mono text-2xl font-semibold text-sb-gold-soft">
              {order.confirmationCode}
            </p>
          </div>

          <div className="grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sb-muted">Guest</span>
              <span className="text-sb-rice">{order.customer.name}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sb-muted">Items</span>
              <span className="font-mono text-sb-rice">
                {order.items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sb-muted">Total</span>
              <span className="font-mono text-sb-gold-soft">
                {formatMoney(order.totals.totalCents)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sb-muted">Payment</span>
              <span className="text-sb-rice">
                {order.paymentMethod.brand} {order.paymentMethod.last4}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
