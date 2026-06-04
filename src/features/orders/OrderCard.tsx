"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import {
  getOrderItemCount,
  getOrderStatusLabel,
  getOrderStatusTone,
  getOrderSummary,
} from "@/lib/orders";
import type { Order } from "@/types/order";

interface OrderCardProps {
  onReorder: (order: Order) => void;
  onViewDetails: (order: Order) => void;
  order: Order;
}

export function OrderCard({ onReorder, onViewDetails, order }: OrderCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <StatusBadge tone={getOrderStatusTone(order.status)}>
            {getOrderStatusLabel(order.status)}
          </StatusBadge>
          <h3 className="mt-3 truncate text-base font-semibold text-sb-rice">
            {getOrderSummary(order)}
          </h3>
          <p className="mt-1 text-xs leading-5 text-sb-muted">
            {order.confirmationCode} - {getOrderItemCount(order)} items
          </p>
        </div>
        <span className="font-mono text-sm text-sb-gold-soft">
          {formatMoney(order.totals.totalCents)}
        </span>
      </div>

      <div className="mt-4 grid gap-2 text-xs leading-5 text-sb-muted">
        <p>
          {order.mode === "delivery" ? "Delivery" : "Pickup"} at{" "}
          {formatDateTime(order.fulfillmentAt)}
        </p>
        <p>Placed {formatDateTime(order.createdAt)}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button onClick={() => onViewDetails(order)} variant="secondary">
          Details
        </Button>
        <Button onClick={() => onReorder(order)} variant="ghost">
          Reorder
        </Button>
      </div>
    </Card>
  );
}
