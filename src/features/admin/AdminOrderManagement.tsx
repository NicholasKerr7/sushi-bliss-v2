"use client";

import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockOrders } from "@/data/orders";
import { getOrderStatusCounts } from "@/lib/admin";
import { formatDateTime } from "@/lib/dates";
import { titleCase } from "@/lib/format";
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
  const statusCounts = getOrderStatusCounts(orders);
  const activeOrderCount =
    statusCounts.confirmed +
    statusCounts.preparing +
    statusCounts.ready +
    statusCounts["out-for-delivery"];
  const revenueCents = orders.reduce(
    (total, order) => total + order.totals.totalCents,
    0,
  );
  const orderSummary = [
    {
      detail: "Open tickets",
      icon: "/assets/icons/chef-hat-icon.png",
      label: "Queue",
      value: activeOrderCount,
    },
    {
      detail: "Kitchen handoff",
      icon: "/assets/icons/takeaway-bag-icon.png",
      label: "Ready",
      value: statusCounts.ready,
    },
    {
      detail: "Mock total",
      icon: "/assets/icons/golden-ticket-icon.png",
      label: "Revenue",
      value: formatMoney(revenueCents),
    },
  ] as const;

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
    setMessage(`${order.confirmationCode} moved to ${titleCase(nextStatus)}.`);
  };

  return (
    <Card className="overflow-hidden p-0" id="orders-admin">
      <div className="relative border-b border-white/10 bg-[radial-gradient(circle_at_14%_0%,rgba(239,47,37,0.12),transparent_34%),rgba(0,0,0,0.2)] p-5 md:p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(239,47,37,0.72),transparent)]"
        />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px] xl:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-sb-red/35 bg-sb-red/10">
                <AssetIcon
                  loading="eager"
                  size={26}
                  src="/assets/icons/takeaway-bag-icon.png"
                />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sb-gold-soft">
                  Fulfillment board
                </p>
                <h2 className="mt-1 text-xl font-semibold text-sb-rice">
                  Order management
                </h2>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-sb-muted">
              Review kitchen status, delivery mode, order totals, and next
              action without leaving the admin queue.
            </p>
            <StatusBadge className="mt-4" tone="warning">
              {message}
            </StatusBadge>
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-[14px] border border-white/10 bg-black/24">
            {orderSummary.map((item, index) => (
              <div
                className="min-w-0 border-l border-white/10 px-3 py-3 first:border-l-0 sm:px-4"
                key={item.label}
              >
                <div className="flex items-center gap-2">
                  <AssetIcon size={18} src={item.icon} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                    {item.label}
                  </p>
                </div>
                <p
                  className={
                    index === 2
                      ? "mt-1 truncate font-mono text-base font-semibold text-sb-gold-soft"
                      : "mt-1 font-mono text-lg font-semibold text-sb-rice"
                  }
                >
                  {item.value}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-sb-dim">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-4 md:p-5">
        {orders.map((order) => {
          const nextStatus = nextOrderStatus[order.status];
          const itemCount = order.items.reduce(
            (total, item) => total + item.quantity,
            0,
          );
          const leadItem = order.items[0]?.menuItem.name || "Custom order";
          const statusLabel = titleCase(order.status);

          return (
            <div
              className="grid gap-4 rounded-[14px] border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] min-[900px]:grid-cols-[minmax(0,1fr)_180px_196px] min-[900px]:items-center xl:grid-cols-[minmax(0,1fr)_210px_220px]"
              key={order.id}
            >
              <div className="grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-[13px] border border-white/10 bg-black/32">
                  <AssetIcon
                    size={26}
                    src={
                      order.status === "completed"
                        ? "/assets/icons/check-icon.png"
                        : "/assets/icons/chef-crest-icon.png"
                    }
                  />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-sb-rice">
                      {order.confirmationCode}
                    </p>
                    <StatusBadge tone={statusTone[order.status]}>
                      {statusLabel}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-sb-muted">
                    {order.customer.name} - {titleCase(order.mode)} -{" "}
                    {itemCount} items
                  </p>
                  <p className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                    Lead item: {leadItem}
                  </p>
                </div>
              </div>
              <div className="rounded-[12px] border border-white/10 bg-black/20 px-3 py-2 min-[900px]:text-right">
                <p className="font-mono text-lg font-semibold text-sb-gold-soft">
                  {formatMoney(order.totals.totalCents)}
                </p>
                <p className="mt-1 text-xs leading-5 text-sb-muted">
                  {formatDateTime(order.fulfillmentAt)}
                </p>
              </div>
              <Button
                aria-label={
                  nextStatus
                    ? `Mark ${order.confirmationCode} ${titleCase(nextStatus)}`
                    : `${order.confirmationCode} is closed`
                }
                className="h-11 rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
                disabled={!nextStatus}
                onClick={() => advanceOrder(order)}
                size="sm"
                variant={nextStatus ? "secondary" : "ghost"}
              >
                {nextStatus ? `Mark ${titleCase(nextStatus)}` : "Closed"}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
