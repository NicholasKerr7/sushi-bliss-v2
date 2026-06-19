"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { formatFullDateTime, formatTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import {
  getOrderItemCount,
  getOrderStatusLabel,
  getOrderSummary,
} from "@/lib/orders";
import type { Order } from "@/types/order";

import {
  getMobileEtaCopy,
  MobileIconCircle,
  MobileOrderPanel,
  MobileOrderProgress,
  MobileOrdersHeader,
} from "./MobileOrdersPrimitives";
import { MobileOrdersCommandCenter } from "./MobileOrdersCommandCenter";

type OrderView = "active" | "past";

interface MobileOrdersListViewProps {
  activeOrders: Order[];
  cartCount: number;
  onOpenCart: () => void;
  onReorder: (order: Order) => void;
  onTrackOrder: (order: Order) => void;
  onViewChange: (view: OrderView) => void;
  onViewDetails: (order: Order) => void;
  pastOrders: Order[];
  reorderMessage: string;
  unreadNotificationCount: number;
  view: OrderView;
}

/** Mobile orders list screen modeled after the active order reference screen. */
export function MobileOrdersListView({
  activeOrders,
  cartCount,
  onOpenCart,
  onReorder,
  onTrackOrder,
  onViewChange,
  onViewDetails,
  pastOrders,
  reorderMessage,
  unreadNotificationCount,
  view,
}: MobileOrdersListViewProps) {
  const visibleOrders = view === "active" ? activeOrders : pastOrders;
  const featuredOrder = activeOrders[0];
  const secondaryActiveOrders = activeOrders.slice(1);

  return (
    <>
      <div className="mobile-frame relative z-10">
        <MobileOrdersHeader
          cartCount={cartCount}
          onOpenCart={onOpenCart}
          unreadNotificationCount={unreadNotificationCount}
        />

        <section className="pt-8 text-center min-[390px]:pt-12">
          <h1 className="editorial-title text-[33px] leading-none tracking-[0.09em] min-[390px]:text-[40px] min-[390px]:tracking-[0.13em]">
            My <span className="text-[var(--sb-gold-soft)]">Orders</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[260px] text-[15px] leading-5 text-white/66 min-[390px]:mt-4 min-[390px]:max-w-none min-[390px]:text-[17px] min-[390px]:leading-6">
            Track your orders and view order history.
          </p>
        </section>

        <div
          aria-label="Order views"
          className="mx-auto mt-5 grid h-[52px] max-w-[330px] grid-cols-2 overflow-hidden rounded-full border border-[var(--sb-border)] bg-black/46 p-1 min-[390px]:mt-8 min-[390px]:h-[68px]"
          role="group"
        >
          <MobileOrderTab
            active={view === "active"}
            label="Active"
            onClick={() => onViewChange("active")}
          />
          <MobileOrderTab
            active={view === "past"}
            label="Past"
            onClick={() => onViewChange("past")}
          />
        </div>

        {reorderMessage ? (
          <div className="mt-5 rounded-[14px] border border-[var(--sb-wasabi)]/30 bg-[var(--sb-wasabi)]/10 p-3 text-[14px] leading-5 text-[var(--sb-wasabi)]">
            {reorderMessage}
          </div>
        ) : null}

        <MobileOrdersCommandCenter
          activeOrders={activeOrders}
          featuredOrder={featuredOrder}
          onTrackOrder={onTrackOrder}
          onViewChange={onViewChange}
          pastOrders={pastOrders}
          view={view}
        />

        {view === "active" ? (
          <section className="mt-6 min-[390px]:mt-8">
            <h2 className="editorial-title text-[23px] text-[var(--sb-gold-soft)] min-[390px]:text-[25px]">
              Active Order
            </h2>
            {featuredOrder ? (
              <MobileActiveOrderCard
                order={featuredOrder}
                onViewDetails={onViewDetails}
              />
            ) : (
              <MobileOrdersEmptyState
                message="Active checkout orders will appear here with live preparation and handoff updates."
                title="No active orders"
              />
            )}

            {secondaryActiveOrders.length > 0 ? (
              <div className="mt-5 grid gap-3">
                {secondaryActiveOrders.map((order) => (
                  <MobileCompactOrderRow
                    key={order.id}
                    onReorder={onReorder}
                    onViewDetails={onViewDetails}
                    order={order}
                  />
                ))}
              </div>
            ) : null}
          </section>
        ) : (
          <section className="mt-6 min-[390px]:mt-8">
            <h2 className="editorial-title text-[23px] text-[var(--sb-gold-soft)] min-[390px]:text-[25px]">
              Past Orders
            </h2>
            {visibleOrders.length > 0 ? (
              <div className="mt-4 grid gap-3">
                {visibleOrders.map((order) => (
                  <MobileCompactOrderRow
                    key={order.id}
                    onReorder={onReorder}
                    onViewDetails={onViewDetails}
                    order={order}
                  />
                ))}
              </div>
            ) : (
              <MobileOrdersEmptyState
                message="Completed orders will appear here for receipts and reorder."
                title="No past orders"
              />
            )}
          </section>
        )}
      </div>

      <BottomNavigation
        activeId="orders"
        ariaLabel="Mobile orders navigation"
      />
    </>
  );
}

function MobileOrderTab({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={classNames(
        "rounded-full text-[15px] uppercase tracking-[0.04em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:text-[18px]",
        active
          ? "border border-[var(--sb-red-bright)] bg-[radial-gradient(circle_at_50%_50%,rgba(239,47,37,0.26),rgba(239,47,37,0.05)_70%)] text-[var(--sb-red-bright)] shadow-[0_0_26px_rgba(239,47,37,0.35)]"
          : "text-white/68 hover:text-white",
      )}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

function MobileActiveOrderCard({
  onViewDetails,
  order,
}: {
  onViewDetails: (order: Order) => void;
  order: Order;
}) {
  const visibleItems = order.items.slice(0, 3);
  const remaining = Math.max(order.items.length - visibleItems.length, 0);

  return (
    <MobileOrderPanel className="mt-4 p-4">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex min-w-0 items-center gap-4">
          <MobileIconCircle icon={icons.bag} size={29} />
          <div className="min-w-0">
            <h3 className="text-[13px] uppercase tracking-[0.06em] text-white/76 min-[390px]:text-[14px] min-[390px]:tracking-[0.12em]">
              Order
            </h3>
            <p className="mt-1 break-words text-[16px] uppercase leading-5 text-white">
              {order.confirmationCode}
            </p>
            <p className="mt-2 text-[14px] text-white/56">
              {formatOrderStamp(order.createdAt)}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--sb-gold)]/42 bg-[var(--sb-gold)]/10 px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          {getOrderStatusLabel(order.status)}
        </span>
      </div>

      <div
        className={classNames(
          "mt-4 grid gap-3",
          remaining > 0
            ? "grid-cols-[repeat(3,minmax(0,1fr))_52px]"
            : "grid-cols-3",
        )}
      >
        {visibleItems.map((item, index) => (
          <div className="min-w-0 text-center" key={item.id}>
            <div className="relative aspect-square overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-black/36">
              <Image
                alt={item.menuItem.image.alt || item.menuItem.name}
                className="object-cover"
                fill
                loading="eager"
                priority={index === 0}
                sizes="90px"
                src={item.menuItem.image.publicUrl}
              />
            </div>
            <p className="mt-3 min-h-[32px] text-[12px] leading-4 text-white">
              {item.menuItem.name}
            </p>
            <p className="mt-1 text-[14px] text-[var(--sb-gold-soft)]">
              {formatMoney(item.menuItem.priceCents)}
            </p>
          </div>
        ))}
        {remaining > 0 ? (
          <button
            aria-label="View all order items"
            className="self-center rounded-[14px] border border-[var(--sb-border)] bg-white/[0.045] px-2 py-3 text-center text-white/74"
            onClick={() => onViewDetails(order)}
            type="button"
          >
            <span className="block text-[18px]">+{remaining}</span>
            <span className="mt-1 block text-[12px]">
              {remaining === 1 ? "item" : "items"}
            </span>
          </button>
        ) : null}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-y border-white/10 py-5">
        <OrderMetric
          icon={icons.star}
          label="Total"
          value={formatMoney(order.totals.totalCents)}
        />
        <OrderMetric
          icon={icons.clock}
          label="Estimated ETA"
          supporting={getMobileEtaCopy(order)}
          value={formatTime(order.fulfillmentAt)}
        />
      </div>

      <div className="mt-5">
        <MobileOrderProgress order={order} />
      </div>

      <div className="mt-7 grid gap-3">
        <button
          className="flex h-[62px] w-full items-center justify-center gap-4 rounded-full border border-[var(--sb-gold)]/70 bg-black/28 text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
          onClick={() => onViewDetails(order)}
          type="button"
        >
          View Details
          <ChevronIcon direction="right" size={18} />
        </button>
      </div>
    </MobileOrderPanel>
  );
}

function OrderMetric({
  icon,
  label,
  supporting,
  value,
}: {
  icon?: string;
  label: string;
  supporting?: string;
  value: string;
}) {
  return (
    <div className="grid min-w-0 grid-cols-1 justify-items-center gap-2 text-center min-[390px]:grid-cols-[48px_1fr] min-[390px]:items-center min-[390px]:justify-items-start min-[390px]:gap-3 min-[390px]:text-left">
      <MobileIconCircle
        className="h-[44px] w-[44px] min-[390px]:h-[48px] min-[390px]:w-[48px]"
        icon={icon}
        size={23}
      />
      <p className="min-w-0 max-w-full">
        <span className="block truncate text-[9px] uppercase tracking-[0.08em] text-white/48 min-[390px]:text-[10px] min-[390px]:tracking-[0.12em]">
          {label}
        </span>
        <span className="mt-1 block truncate text-[18px] leading-none text-[var(--sb-gold-soft)] min-[390px]:text-[20px]">
          {value}
        </span>
        {supporting ? (
          <span className="mt-1 line-clamp-2 block text-[10px] leading-4 text-white/46 min-[390px]:text-[11px]">
            {supporting}
          </span>
        ) : null}
      </p>
    </div>
  );
}

function MobileCompactOrderRow({
  onReorder,
  onViewDetails,
  order,
}: {
  onReorder: (order: Order) => void;
  onViewDetails: (order: Order) => void;
  order: Order;
}) {
  const firstItem = order.items[0];

  return (
    <MobileOrderPanel className="grid grid-cols-[86px_1fr] gap-4 p-3">
      <button
        className="relative h-[86px] overflow-hidden rounded-[12px] border border-white/10 bg-black/38"
        onClick={() => onViewDetails(order)}
        type="button"
      >
        {firstItem ? (
          <Image
            alt={firstItem.menuItem.image.alt || firstItem.menuItem.name}
            className="object-cover"
            fill
            sizes="86px"
            src={firstItem.menuItem.image.publicUrl}
          />
        ) : null}
      </button>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[16px] text-white">
              {getOrderSummary(order)}
            </h3>
            <p className="mt-1 text-[12px] text-white/50">
              {formatFullDateTime(order.createdAt)}
            </p>
            <p className="mt-1 text-[12px] text-[var(--sb-gold-soft)]">
              {getOrderItemCount(order)} items
            </p>
          </div>
          <span className="font-mono text-[15px] text-[var(--sb-gold-soft)]">
            {formatMoney(order.totals.totalCents)}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            className="h-[38px] rounded-[10px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.07em] text-[var(--sb-gold-soft)]"
            onClick={() => onViewDetails(order)}
            type="button"
          >
            Details
          </button>
          <button
            className="h-[38px] rounded-[10px] border border-white/10 bg-white/[0.035] text-[12px] uppercase tracking-[0.07em] text-white/70"
            onClick={() => onReorder(order)}
            type="button"
          >
            Reorder
          </button>
        </div>
      </div>
    </MobileOrderPanel>
  );
}

function MobileOrdersEmptyState({
  message,
  title,
}: {
  message: string;
  title: string;
}) {
  return (
    <MobileOrderPanel className="mt-4 p-6 text-center">
      <AssetIcon className="mx-auto" size={56} src={icons.bag} />
      <h3 className="editorial-title mt-4 text-[24px] text-white">{title}</h3>
      <p className="mt-3 text-[15px] leading-6 text-white/56">{message}</p>
      <Link
        className="red-glow-button mt-5 flex h-[58px] items-center justify-center rounded-[14px] text-[15px]"
        href="/menu"
      >
        Browse menu
      </Link>
    </MobileOrderPanel>
  );
}

function formatOrderStamp(value: string) {
  return formatFullDateTime(value).replace(/,([^,]*)$/, " •$1");
}
