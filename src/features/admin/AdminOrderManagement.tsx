"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockOrders } from "@/data/orders";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { Order, OrderStatus } from "@/types/order";

const nextOrderStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  confirmed: "preparing",
  draft: "confirmed",
  "out-for-delivery": "completed",
  preparing: "ready",
  ready: "completed",
};

const statusTone: Record<
  OrderStatus,
  "danger" | "neutral" | "success" | "warning"
> = {
  cancelled: "danger",
  completed: "success",
  confirmed: "neutral",
  draft: "neutral",
  "out-for-delivery": "warning",
  preparing: "warning",
  ready: "success",
};

export function AdminOrderManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [message, setMessage] = useState("Kitchen queue is current.");

  const advanceOrder = (order: Order) => {
    const nextStatus = nextOrderStatus[order.status];

    if (!nextStatus) {
      return;
    }

    setOrders((current) =>
      current.map((candidate) =>
        candidate.id === order.id
          ? {
              ...candidate,
              status: nextStatus,
            }
          : candidate,
      ),
    );
    setMessage(`${order.confirmationCode} moved to ${nextStatus}.`);
  };

  return (
    <Card className="p-5 md:p-6" id="orders-admin">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-sb-rice">
            Order management
          </h2>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            Review order status, totals, fulfillment mode, and next action.
          </p>
        </div>
        <StatusBadge tone="warning">{message}</StatusBadge>
      </div>

      <div className="mt-5 grid gap-3">
        {orders.map((order) => {
          const nextStatus = nextOrderStatus[order.status];

          return (
            <div
              className="grid gap-4 rounded-card border border-sb-line bg-sb-ink/50 p-4 lg:grid-cols-[1fr_auto_auto]"
              key={order.id}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-sb-rice">
                    {order.confirmationCode}
                  </p>
                  <StatusBadge tone={statusTone[order.status]}>
                    {order.status}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm leading-6 text-sb-muted">
                  {order.customer.name} - {order.mode} -{" "}
                  {formatDateTime(order.fulfillmentAt)}
                </p>
              </div>
              <p className="font-mono text-lg font-semibold text-sb-gold-soft">
                {formatMoney(order.totals.totalCents)}
              </p>
              <Button
                disabled={!nextStatus}
                onClick={() => advanceOrder(order)}
                size="sm"
                variant={nextStatus ? "secondary" : "ghost"}
              >
                {nextStatus ? `Mark ${nextStatus}` : "Closed"}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
