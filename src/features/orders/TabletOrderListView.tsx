"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import {
  getOrderItemCount,
  getOrderStatusLabel,
  getOrderStatusTone,
  getOrderSummary,
  getOrderTimeline,
} from "@/lib/orders";
import type { Order } from "@/types/order";

type OrderView = "active" | "past";

interface TabletOrderListViewProps {
  activeCount: number;
  activeOrders: Order[];
  onReorder: (order: Order) => void;
  onSelectOrder: (order: Order) => void;
  onViewChange: (view: OrderView) => void;
  pastCount: number;
  pastOrders: Order[];
  reorderMessage: string;
  view: OrderView;
}

export function TabletOrderListView({
  activeCount,
  activeOrders,
  onReorder,
  onSelectOrder,
  onViewChange,
  pastCount,
  pastOrders,
  reorderMessage,
  view,
}: TabletOrderListViewProps) {
  const currentOrder = activeOrders[0];
  const visiblePastOrders = pastOrders.slice(0, 3);

  return (
    <main className="mx-auto max-w-[1034px]">
      <section className="mt-8 text-center">
        <h1 className="editorial-title text-[62px] uppercase leading-none tracking-[0.18em]">
          Orders
        </h1>
        <p className="mt-3 text-[18px] text-[var(--sb-gold-soft)]">
          Indulge. Track. Savor.
        </p>
        <div
          aria-label="Order views"
          className="mx-auto mt-4 grid max-w-[536px] grid-cols-3 overflow-hidden rounded-full border border-white/10 bg-black/42 p-1"
          role="group"
        >
          <button
            aria-pressed={view === "active"}
            className={getTabClassName(view === "active")}
            onClick={() => onViewChange("active")}
            type="button"
          >
            Current ({activeCount})
          </button>
          <button
            aria-pressed={view === "past"}
            className={getTabClassName(view === "past")}
            onClick={() => onViewChange("past")}
            type="button"
          >
            Past ({pastCount})
          </button>
          <button
            className={getTabClassName(false)}
            disabled
            title="Favorite orders coming soon"
            type="button"
          >
            Favorites
          </button>
        </div>
      </section>

      {reorderMessage ? (
        <div className="mt-4 rounded-[14px] border border-[var(--sb-wasabi)]/30 bg-[var(--sb-wasabi)]/10 p-3 text-[14px] text-[var(--sb-wasabi)]">
          {reorderMessage}
        </div>
      ) : null}

      {view === "active" ? (
        <>
          {currentOrder ? (
            <FeaturedCurrentOrder
              onSelectOrder={onSelectOrder}
              order={currentOrder}
            />
          ) : (
            <OrdersEmptyState label="No current orders" />
          )}

          <PastOrdersPanel
            onReorder={onReorder}
            onSelectOrder={onSelectOrder}
            orders={visiblePastOrders}
          />
        </>
      ) : (
        <PastOrdersPanel
          onReorder={onReorder}
          onSelectOrder={onSelectOrder}
          orders={pastOrders}
          standalone
        />
      )}
    </main>
  );
}

function FeaturedCurrentOrder({
  onSelectOrder,
  order,
}: {
  onSelectOrder: (order: Order) => void;
  order: Order;
}) {
  const timeline = getOrderTimeline(order).slice(0, 4);
  const etaLabel =
    order.status === "preparing"
      ? "25-30 min"
      : order.courier
        ? `${order.courier.etaMinutes} min`
        : "25-30 min";

  return (
    <section className="mt-5 rounded-[22px] border border-[var(--sb-red)]/38 bg-white/[0.035] p-5 shadow-[0_0_42px_rgba(238,43,36,0.1)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-4">
          <StatusBadge tone={getOrderStatusTone(order.status)}>
            {getOrderStatusLabel(order.status)}
          </StatusBadge>
          <p className="text-[15px] text-white/66">
            Order #{order.confirmationCode}
          </p>
        </div>
        <p className="font-mono text-[14px] text-white/58">
          {formatDateTime(order.fulfillmentAt)}
        </p>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[376px_minmax(0,1fr)]">
        <div className="rounded-[14px] border border-white/10 bg-black/24 p-5">
          <div className="flex items-center gap-5">
            <span className="grid h-[78px] w-[78px] place-items-center rounded-full border border-[var(--sb-red-bright)] bg-[var(--sb-red)]/12 shadow-[0_0_24px_rgba(238,43,36,0.42)]">
              <AssetIcon size={38} src={icons.chef} />
            </span>
            <div>
              <h2 className="editorial-title text-[25px] text-white">
                {order.status === "preparing"
                  ? "Preparing your order"
                  : "Your order is moving"}
              </h2>
              <p className="mt-2 text-[15px] leading-6 text-white/58">
                {order.status === "preparing"
                  ? "Our chefs are crafting your sushi with care."
                  : "The courier is carrying your selection."}
              </p>
            </div>
          </div>

          <p className="mt-7 text-[14px] text-white/52">Estimated time</p>
          <p className="mt-1 font-mono text-[30px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)]">
            {etaLabel}
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {timeline.map((step) => (
              <div className="min-w-0" key={step.id}>
                <span
                  className={classNames(
                    "block h-1.5 rounded-full",
                    step.completed
                      ? "bg-[var(--sb-red-bright)] shadow-[0_0_14px_rgba(238,43,36,0.48)]"
                      : "bg-white/12",
                  )}
                />
                <span
                  className={classNames(
                    "mt-2 block truncate text-[12px]",
                    step.completed
                      ? "text-[var(--sb-red-bright)]"
                      : "text-white/46",
                  )}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-5 gap-3">
            {order.items.slice(0, 5).map((item) => (
              <OrderItemPreview item={item} key={item.id} />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="text-[17px] text-white/72">
              {getOrderItemCount(order)} Items
            </p>
            <p className="flex items-baseline gap-5">
              <span className="text-[16px] text-white/72">Total</span>
              <span className="font-mono text-[30px] text-[var(--sb-gold-soft)]">
                {formatMoney(order.totals.totalCents)}
              </span>
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <Button
              className="h-[54px] rounded-[12px] uppercase tracking-[0.08em]"
              onClick={() => onSelectOrder(order)}
              variant="secondary"
            >
              View details
            </Button>
            <Button
              className="red-glow-button h-[54px] rounded-[12px] uppercase tracking-[0.08em]"
              onClick={() => onSelectOrder(order)}
            >
              Track order
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PastOrdersPanel({
  onReorder,
  onSelectOrder,
  orders,
  standalone = false,
}: {
  onReorder: (order: Order) => void;
  onSelectOrder: (order: Order) => void;
  orders: Order[];
  standalone?: boolean;
}) {
  return (
    <section className={standalone ? "mt-5" : "mt-6"}>
      <h2 className="text-[22px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
        Past orders
      </h2>
      {orders.length > 0 ? (
        <div className="mt-3 grid gap-3">
          {orders.map((order) => (
            <PastOrderRow
              key={order.id}
              onReorder={onReorder}
              onSelectOrder={onSelectOrder}
              order={order}
            />
          ))}
        </div>
      ) : (
        <OrdersEmptyState label="No past orders" />
      )}
    </section>
  );
}

function PastOrderRow({
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
    <article className="grid min-h-[128px] gap-4 rounded-[14px] border border-white/10 bg-white/[0.035] p-3 min-[1080px]:grid-cols-[250px_minmax(0,1fr)_150px_230px] min-[1080px]:items-center min-[1080px]:gap-5">
      <div className="relative h-[104px] overflow-hidden rounded-[10px] bg-black/30">
        {firstItem ? (
          <Image
            alt={firstItem.menuItem.image.alt || firstItem.menuItem.name}
            className="object-cover"
            fill
            loading="eager"
            sizes="250px"
            src={firstItem.menuItem.image.publicUrl}
          />
        ) : null}
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-[18px] text-white">
          Order #{order.confirmationCode}
        </h3>
        <p className="mt-1 text-[14px] text-white/52">
          {formatDateTime(order.createdAt)}
        </p>
        <p className="mt-2 truncate text-[14px] text-white/62">
          {getOrderSummary(order)}
        </p>
        <p className="mt-1 text-[13px] text-[var(--sb-wasabi)]">Delivered</p>
      </div>
      <div className="border-y border-white/10 py-3 min-[1080px]:border-x min-[1080px]:border-y-0 min-[1080px]:px-5 min-[1080px]:py-0">
        <p className="text-[13px] text-white/48">Total</p>
        <p className="mt-1 font-mono text-[23px] text-[var(--sb-gold-soft)]">
          {formatMoney(order.totals.totalCents)}
        </p>
        <p className="mt-1 text-[13px] text-white/48">
          {getOrderItemCount(order)} Items
        </p>
      </div>
      <div className="grid gap-2">
        <Button
          className="h-[46px] rounded-[10px] uppercase tracking-[0.08em]"
          onClick={() => onReorder(order)}
          variant="secondary"
        >
          Reorder
        </Button>
        <button
          className="h-8 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          onClick={() => onSelectOrder(order)}
          type="button"
        >
          View details
        </button>
      </div>
    </article>
  );
}

function OrderItemPreview({ item }: { item: Order["items"][number] }) {
  return (
    <div className="relative min-h-[164px] overflow-hidden rounded-[12px] border border-white/10 bg-black/30">
      <Image
        alt={item.menuItem.image.alt || item.menuItem.name}
        className="object-cover"
        fill
        loading="eager"
        sizes="140px"
        src={item.menuItem.image.publicUrl}
      />
      <span className="absolute left-2 top-2 grid h-7 min-w-7 place-items-center rounded-full border border-[var(--sb-gold)]/50 bg-black/72 px-1 font-mono text-[13px] text-[var(--sb-gold-soft)]">
        {item.quantity}
      </span>
      <p className="absolute inset-x-0 bottom-0 bg-black/76 px-3 py-2 text-center text-[13px] font-semibold text-white">
        {item.menuItem.name}
      </p>
    </div>
  );
}

function OrdersEmptyState({ label }: { label: string }) {
  return (
    <div className="mt-5 rounded-[18px] border border-white/10 bg-white/[0.04] p-10 text-center">
      <h2 className="text-[24px] font-semibold text-white">{label}</h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-6 text-white/56">
        Completed checkout orders will appear here with tracking and receipts.
      </p>
      <Button className="mt-5" href="/menu" variant="secondary">
        Browse menu
      </Button>
    </div>
  );
}

function getTabClassName(active: boolean) {
  return classNames(
    "flex min-h-[44px] items-center justify-center rounded-full px-4 text-[13px] font-semibold uppercase tracking-[0.08em] transition disabled:cursor-not-allowed disabled:opacity-45",
    active
      ? "red-glow-button text-white"
      : "text-white/70 hover:bg-white/[0.04] hover:text-white",
  );
}
