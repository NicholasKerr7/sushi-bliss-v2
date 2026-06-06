"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import {
  getOrderItemCount,
  getOrderStatusLabel,
  getOrderStatusTone,
  getOrderSummary,
} from "@/lib/orders";
import type { Order } from "@/types/order";

type OrderView = "active" | "past";

interface TabletOrderListViewProps {
  activeCount: number;
  onReorder: (order: Order) => void;
  onSelectOrder: (order: Order) => void;
  onViewChange: (view: OrderView) => void;
  orders: Order[];
  pastCount: number;
  reorderMessage: string;
  view: OrderView;
}

export function TabletOrderListView({
  activeCount,
  onReorder,
  onSelectOrder,
  onViewChange,
  orders,
  pastCount,
  reorderMessage,
  view,
}: TabletOrderListViewProps) {
  return (
    <main className="mx-auto max-w-[1034px]">
      <div className="mt-8 flex items-end justify-between gap-6">
        <div>
          <p className="text-[15px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            Orders
          </p>
          <h1 className="editorial-title mt-3 text-[46px] uppercase leading-none tracking-[0.08em]">
            Order Dashboard
          </h1>
          <p className="mt-3 text-[17px] text-[var(--sb-gold-soft)]">
            Track active orders and revisit past dining moments.
          </p>
        </div>
        <div
          aria-label="Order views"
          className="grid grid-cols-2 overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.04]"
          role="group"
        >
          <button
            aria-pressed={view === "active"}
            className={getTabClassName(view === "active")}
            onClick={() => onViewChange("active")}
            type="button"
          >
            Active
            <span>{activeCount}</span>
          </button>
          <button
            aria-pressed={view === "past"}
            className={getTabClassName(view === "past")}
            onClick={() => onViewChange("past")}
            type="button"
          >
            Past
            <span>{pastCount}</span>
          </button>
        </div>
      </div>

      {reorderMessage ? (
        <div className="mt-5 rounded-[14px] border border-[var(--sb-wasabi)]/30 bg-[var(--sb-wasabi)]/10 p-4 text-[14px] text-[var(--sb-wasabi)]">
          {reorderMessage}
        </div>
      ) : null}

      {orders.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {orders.map((order) => (
            <TabletOrderListCard
              key={order.id}
              onReorder={onReorder}
              onSelectOrder={onSelectOrder}
              order={order}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[22px] border border-white/10 bg-white/[0.04] p-10 text-center">
          <h2 className="text-[24px] font-semibold text-white">
            {view === "active" ? "No active orders" : "No past orders"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-6 text-white/56">
            {view === "active"
              ? "Checkout orders will appear here with live tracking."
              : "Completed orders will appear here for receipts and reorder."}
          </p>
          <Button className="mt-5" href="/menu" variant="secondary">
            Browse menu
          </Button>
        </div>
      )}
    </main>
  );
}

function TabletOrderListCard({
  onReorder,
  onSelectOrder,
  order,
}: {
  onReorder: (order: Order) => void;
  onSelectOrder: (order: Order) => void;
  order: Order;
}) {
  const firstItem = order.items[0];

  return (
    <article className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start gap-4">
        <div className="relative h-[92px] w-[104px] overflow-hidden rounded-[12px] bg-black/30">
          {firstItem ? (
            <Image
              alt={firstItem.menuItem.image.alt || firstItem.menuItem.name}
              className="object-cover"
              fill
              sizes="104px"
              src={firstItem.menuItem.image.publicUrl}
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <StatusBadge tone={getOrderStatusTone(order.status)}>
              {getOrderStatusLabel(order.status)}
            </StatusBadge>
            <span className="font-mono text-[15px] text-[var(--sb-gold-soft)]">
              {formatMoney(order.totals.totalCents)}
            </span>
          </div>
          <h2 className="mt-3 truncate text-[20px] font-semibold text-white">
            {getOrderSummary(order)}
          </h2>
          <p className="mt-1 text-[13px] leading-5 text-white/52">
            {order.confirmationCode} - {getOrderItemCount(order)} items
          </p>
          <p className="mt-2 text-[13px] leading-5 text-white/52">
            {order.mode === "delivery" ? "Delivery" : "Pickup"} at{" "}
            {formatDateTime(order.fulfillmentAt)}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button onClick={() => onSelectOrder(order)} variant="secondary">
          Details
        </Button>
        <Button onClick={() => onReorder(order)} variant="ghost">
          Reorder
        </Button>
      </div>
    </article>
  );
}

function getTabClassName(active: boolean) {
  return classNames(
    "flex min-w-[130px] items-center justify-center gap-3 px-5 py-3 text-[14px] font-semibold uppercase tracking-[0.1em] transition",
    active
      ? "bg-[var(--sb-red)] text-white"
      : "text-white/58 hover:bg-white/[0.04] hover:text-white",
  );
}
