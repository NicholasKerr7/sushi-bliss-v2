"use client";

import Image from "next/image";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
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
import { readStorageValue, writeStorageValue } from "@/lib/storage";
import type { Order } from "@/types/order";

type OrderView = "active" | "past";
const FAVORITE_ORDER_STORAGE_KEY = "sushi-bliss:favorite-orders";
const dashboardProgressLabels = [
  "Placed",
  "Preparing",
  "On the way",
  "Delivered",
] as const;

/** Guards locally persisted favorite order ids before rendering tablet filters. */
function parseFavoriteOrderIds(value: string | null): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is string => typeof item === "string" && item.length > 0,
    );
  } catch {
    return [];
  }
}

interface TabletOrderListViewProps {
  activeCount: number;
  activeOrders: Order[];
  onReorder: (order: Order) => void;
  onSelectOrder: (order: Order) => void;
  onTrackOrder: (order: Order) => void;
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
  onTrackOrder,
  onViewChange,
  pastCount,
  pastOrders,
  reorderMessage,
  view,
}: TabletOrderListViewProps) {
  const [favoriteOrderIds, setFavoriteOrderIds] = useState<string[]>(() =>
    parseFavoriteOrderIds(readStorageValue(FAVORITE_ORDER_STORAGE_KEY)),
  );
  const [showFavorites, setShowFavorites] = useState(false);
  const currentOrder = activeOrders[0];
  const visiblePastOrders = pastOrders.slice(0, 3);
  const allOrders = [...activeOrders, ...pastOrders];
  const favoriteOrders = allOrders.filter(
    (order, index) =>
      favoriteOrderIds.includes(order.id) &&
      allOrders.findIndex((candidate) => candidate.id === order.id) === index,
  );

  const toggleFavoriteOrder = (orderId: string) => {
    setFavoriteOrderIds((currentIds) => {
      const nextIds = currentIds.includes(orderId)
        ? currentIds.filter((id) => id !== orderId)
        : [orderId, ...currentIds];

      writeStorageValue(FAVORITE_ORDER_STORAGE_KEY, JSON.stringify(nextIds));

      return nextIds;
    });
  };

  const handleViewChange = (nextView: OrderView) => {
    setShowFavorites(false);
    onViewChange(nextView);
  };

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
            aria-pressed={!showFavorites && view === "active"}
            className={getTabClassName(!showFavorites && view === "active")}
            onClick={() => handleViewChange("active")}
            type="button"
          >
            Current ({activeCount})
          </button>
          <button
            aria-pressed={!showFavorites && view === "past"}
            className={getTabClassName(!showFavorites && view === "past")}
            onClick={() => handleViewChange("past")}
            type="button"
          >
            Past ({pastCount})
          </button>
          <button
            aria-pressed={showFavorites}
            className={getTabClassName(showFavorites)}
            onClick={() => setShowFavorites(true)}
            type="button"
          >
            Favorites ({favoriteOrders.length})
          </button>
        </div>
      </section>

      {reorderMessage ? (
        <div className="mt-4 rounded-[14px] border border-[var(--sb-wasabi)]/30 bg-[var(--sb-wasabi)]/10 p-3 text-[14px] text-[var(--sb-wasabi)]">
          {reorderMessage}
        </div>
      ) : null}

      {showFavorites ? (
        <PastOrdersPanel
          emptyDescription="Tap Save on any order to keep it here for fast reorders."
          emptyLabel="No favorite orders"
          favoriteOrderIds={favoriteOrderIds}
          onReorder={onReorder}
          onSelectOrder={onSelectOrder}
          onToggleFavorite={toggleFavoriteOrder}
          orders={favoriteOrders}
          standalone
          title="Favorite orders"
        />
      ) : view === "active" ? (
        <>
          {currentOrder ? (
            <FeaturedCurrentOrder
              isFavorite={favoriteOrderIds.includes(currentOrder.id)}
              onSelectOrder={onSelectOrder}
              onTrackOrder={onTrackOrder}
              onToggleFavorite={toggleFavoriteOrder}
              order={currentOrder}
            />
          ) : (
            <OrdersEmptyState label="No current orders" />
          )}

          <PastOrdersPanel
            onViewAllPast={() => handleViewChange("past")}
            favoriteOrderIds={favoriteOrderIds}
            onReorder={onReorder}
            onSelectOrder={onSelectOrder}
            onToggleFavorite={toggleFavoriteOrder}
            orders={visiblePastOrders}
            showViewAll={pastOrders.length > 0}
          />
        </>
      ) : (
        <PastOrdersPanel
          favoriteOrderIds={favoriteOrderIds}
          onReorder={onReorder}
          onSelectOrder={onSelectOrder}
          onToggleFavorite={toggleFavoriteOrder}
          orders={pastOrders}
          standalone
        />
      )}
    </main>
  );
}

function FeaturedCurrentOrder({
  isFavorite,
  onSelectOrder,
  onTrackOrder,
  onToggleFavorite,
  order,
}: {
  isFavorite: boolean;
  onSelectOrder: (order: Order) => void;
  onTrackOrder: (order: Order) => void;
  onToggleFavorite: (orderId: string) => void;
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
        <div className="flex items-center gap-3">
          <p className="font-mono text-[14px] text-white/58">
            {formatDateTime(order.fulfillmentAt)}
          </p>
          <button
            aria-label={
              isFavorite
                ? `Remove order ${order.confirmationCode} from favorites`
                : `Save order ${order.confirmationCode} to favorites`
            }
            aria-pressed={isFavorite}
            className={classNames(
              "grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-black/28 transition hover:border-[var(--sb-red-bright)]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
              isFavorite &&
                "border-[var(--sb-red-bright)]/70 bg-[var(--sb-red)]/18",
            )}
            onClick={() => onToggleFavorite(order.id)}
            type="button"
          >
            <AssetIcon size={21} src="/assets/icons/heart-icon.png" />
          </button>
        </div>
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
            {timeline.map((step, index) => (
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
                  {dashboardProgressLabels[index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-4 gap-3">
            {order.items.slice(0, 4).map((item) => (
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
              onClick={() => onTrackOrder(order)}
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
  emptyDescription = "Completed checkout orders will appear here with tracking and receipts.",
  emptyLabel = "No past orders",
  favoriteOrderIds,
  onViewAllPast,
  onReorder,
  onSelectOrder,
  onToggleFavorite,
  orders,
  showViewAll = false,
  standalone = false,
  title = "Past orders",
}: {
  emptyDescription?: string;
  emptyLabel?: string;
  favoriteOrderIds: string[];
  onViewAllPast?: () => void;
  onReorder: (order: Order) => void;
  onSelectOrder: (order: Order) => void;
  onToggleFavorite: (orderId: string) => void;
  orders: Order[];
  showViewAll?: boolean;
  standalone?: boolean;
  title?: string;
}) {
  return (
    <section className={standalone ? "mt-5" : "mt-6"}>
      <h2 className="text-[22px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
        {title}
      </h2>
      {orders.length > 0 ? (
        <div className="mt-3 grid gap-3">
          {orders.map((order) => (
            <PastOrderRow
              isFavorite={favoriteOrderIds.includes(order.id)}
              key={order.id}
              onReorder={onReorder}
              onSelectOrder={onSelectOrder}
              onToggleFavorite={onToggleFavorite}
              order={order}
            />
          ))}
        </div>
      ) : (
        <OrdersEmptyState description={emptyDescription} label={emptyLabel} />
      )}
      {showViewAll && onViewAllPast ? (
        <button
          className="mt-3 flex h-[58px] w-full items-center justify-center gap-5 rounded-[14px] border border-[var(--sb-gold)]/24 bg-white/[0.025] text-[14px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={onViewAllPast}
          type="button"
        >
          <AssetIcon size={24} src={icons.bag} />
          View all past orders
          <ChevronIcon direction="right" size={18} />
        </button>
      ) : null}
    </section>
  );
}

function PastOrderRow({
  isFavorite,
  onReorder,
  onSelectOrder,
  onToggleFavorite,
  order,
}: {
  isFavorite: boolean;
  onReorder: (order: Order) => void;
  onSelectOrder: (order: Order) => void;
  onToggleFavorite: (orderId: string) => void;
  order: Order;
}) {
  const firstItem = order.items[0];

  return (
    <article className="relative grid gap-4 overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.022)_44%,rgba(89,8,8,0.16))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_48px_rgba(0,0,0,0.28)] md:grid-cols-[260px_minmax(0,1fr)] md:gap-x-5 md:p-4 lg:min-h-[136px] lg:grid-cols-[250px_minmax(0,1fr)_150px_230px] lg:items-center lg:gap-5 lg:p-3">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(215,168,79,0.1),transparent_70%)]"
      />
      <div className="relative h-[176px] overflow-hidden rounded-[14px] border border-white/10 bg-black/30 shadow-[0_16px_38px_rgba(0,0,0,0.3)] md:row-span-3 md:h-full md:min-h-[220px] lg:row-span-1 lg:h-[118px] lg:min-h-0 lg:rounded-[10px]">
        {firstItem ? (
          <Image
            alt={firstItem.menuItem.image.alt || firstItem.menuItem.name}
            className="object-cover object-center md:object-contain lg:object-cover"
            fill
            loading="eager"
            sizes="(min-width: 1024px) 250px, (min-width: 768px) 260px, 100vw"
            src={firstItem.menuItem.image.publicUrl}
          />
        ) : null}
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(0,0,0,0.42))]" />
      </div>
      <div className="relative z-10 min-w-0 md:self-end lg:self-auto">
        <h3 className="truncate text-[20px] text-white lg:text-[18px]">
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
      <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 rounded-[14px] border border-white/10 bg-black/24 px-4 py-3 lg:block lg:rounded-none lg:border-x lg:border-y-0 lg:bg-transparent lg:px-5 lg:py-0">
        <p className="text-[13px] uppercase tracking-[0.12em] text-white/42 lg:normal-case lg:tracking-normal">
          Total
        </p>
        <p className="row-span-2 self-center font-mono text-[26px] leading-none text-[var(--sb-gold-soft)] lg:row-auto lg:mt-1 lg:text-[23px]">
          {formatMoney(order.totals.totalCents)}
        </p>
        <p className="mt-1 text-[13px] text-white/48">
          {getOrderItemCount(order)} Items
        </p>
      </div>
      <div className="relative z-10 grid gap-2 md:grid-cols-2 md:items-center lg:grid-cols-1">
        <Button
          className="h-[46px] rounded-[12px] uppercase tracking-[0.08em] md:col-span-2 lg:col-span-1"
          onClick={() => onReorder(order)}
          variant="secondary"
        >
          Reorder
        </Button>
        <button
          className="h-11 rounded-[12px] border border-white/10 bg-white/[0.035] px-4 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/35 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold lg:h-8 lg:border-0 lg:bg-transparent"
          onClick={() => onSelectOrder(order)}
          type="button"
        >
          View details
        </button>
        <button
          aria-pressed={isFavorite}
          className={classNames(
            "h-11 rounded-[12px] border border-white/10 bg-white/[0.025] px-4 text-[13px] uppercase tracking-[0.08em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold lg:h-8 lg:border-0 lg:bg-transparent",
            isFavorite
              ? "text-[var(--sb-red-bright)]"
              : "text-white/58 hover:text-[var(--sb-gold-soft)]",
          )}
          onClick={() => onToggleFavorite(order.id)}
          type="button"
        >
          {isFavorite ? "Remove favorite" : "Save favorite"}
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

function OrdersEmptyState({
  description = "Completed checkout orders will appear here with tracking and receipts.",
  label,
}: {
  description?: string;
  label: string;
}) {
  return (
    <div className="mt-5 rounded-[18px] border border-white/10 bg-white/[0.04] p-10 text-center">
      <h2 className="text-[24px] font-semibold text-white">{label}</h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-6 text-white/56">
        {description}
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
