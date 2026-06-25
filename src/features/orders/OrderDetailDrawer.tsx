"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CartSummary } from "@/features/cart/CartSummary";
import { icons } from "@/features/home/homeDashboardData";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import {
  getOrderItemCount,
  getOrderStatusLabel,
  getOrderStatusTone,
} from "@/lib/orders";
import type { CartLineItem, Order } from "@/types/order";

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
  const primaryItem = order?.items[0]?.menuItem;
  const itemCount = order ? getOrderItemCount(order) : 0;

  return (
    <Drawer
      className="sm:!w-[min(42rem,calc(100vw-2rem))] md:!w-[min(46rem,calc(100vw-2rem))]"
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
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.18fr)] gap-3">
            <Button className="min-w-0" href="/support" variant="ghost">
              Contact support
            </Button>
            <Button
              className="red-glow-button min-w-0"
              onClick={() => onReorder(order)}
            >
              Reorder
            </Button>
          </div>
        ) : null
      }
    >
      {order ? (
        <div className="space-y-5">
          <section className="relative overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-[#07090a] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_65px_rgba(0,0,0,0.42)]">
            <div className="relative min-h-[188px]">
              {primaryItem ? (
                <Image
                  alt={primaryItem.image.alt || primaryItem.name}
                  className="object-cover"
                  fill
                  loading="eager"
                  priority
                  sizes="736px"
                  src={primaryItem.image.publicUrl}
                />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.68)_56%,rgba(0,0,0,0.28)),radial-gradient(circle_at_18%_18%,rgba(239,47,37,0.24),transparent_34%)]" />
              <div className="relative z-10 flex min-h-[188px] flex-col justify-between p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                      Confirmation
                    </p>
                    <p className="mt-2 break-words font-mono text-[24px] leading-none text-white sm:text-[30px]">
                      {order.confirmationCode}
                    </p>
                  </div>
                  <StatusBadge tone={getOrderStatusTone(order.status)}>
                    {getOrderStatusLabel(order.status)}
                  </StatusBadge>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <p className="min-w-0">
                    <span className="block text-[13px] uppercase tracking-[0.1em] text-white/46">
                      {primaryItem ? "Chef lead item" : "Order summary"}
                    </span>
                    <span className="mt-1 block truncate text-[18px] text-white">
                      {primaryItem?.name || "Sushi Bliss order"}
                    </span>
                  </p>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-black/56 px-3 py-1.5 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] backdrop-blur">
                    <AssetIcon size={17} src={icons.bag} />
                    {itemCount} items
                  </span>
                </div>
              </div>
            </div>

            <dl className="grid gap-3 border-t border-white/10 bg-black/28 p-4 sm:grid-cols-3">
              <div className="min-w-0 rounded-[15px] border border-white/10 bg-black/24 p-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                  Ready time
                </dt>
                <dd className="mt-1 text-sm leading-5 text-sb-rice">
                  {formatDateTime(order.fulfillmentAt)}
                </dd>
              </div>
              <div className="min-w-0 rounded-[15px] border border-white/10 bg-black/24 p-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                  Payment
                </dt>
                <dd className="mt-1 truncate text-sm leading-5 text-sb-rice">
                  {paymentLabel}
                </dd>
              </div>
              <div className="min-w-0 rounded-[15px] border border-white/10 bg-black/24 p-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                  Mode
                </dt>
                <dd className="mt-1 text-sm leading-5 text-sb-rice">
                  {fulfillmentLabel}
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
                {order.items.length} lines
              </span>
            </div>

            <div className="mt-4 divide-y divide-white/10 overflow-hidden rounded-[16px] border border-white/10 bg-black/24">
              {order.items.map((item) => (
                <OrderReceiptItemRow item={item} key={item.id} />
              ))}
            </div>
            <div className="mt-4 rounded-[16px] border border-white/10 bg-black/20 p-4">
              <CartSummary totals={order.totals} />
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

function OrderReceiptItemRow({ item }: { item: CartLineItem }) {
  const detailParts = [
    ...item.customizations.map(
      (customization) =>
        `${customization.groupLabel}: ${customization.optionLabel}`,
    ),
    ...item.addOns.map((addOn) => addOn.label),
  ];

  return (
    <div className="grid grid-cols-[58px_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:px-4">
      <div className="relative h-[54px] overflow-hidden rounded-[12px] border border-white/10 bg-black/34 sm:h-[62px]">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          sizes="72px"
          src={item.menuItem.image.publicUrl}
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[14px] font-semibold text-white sm:text-[15px]">
          {item.menuItem.name}
        </p>
        <p className="mt-1 text-[12px] text-white/52">
          {item.quantity} x {formatMoney(item.menuItem.priceCents)}
        </p>
        {detailParts.length > 0 ? (
          <p className="mt-1 line-clamp-1 text-[11px] text-white/42">
            {detailParts.join(" • ")}
          </p>
        ) : null}
      </div>
      <p className="font-mono text-[13px] text-[var(--sb-gold-soft)] sm:text-[15px]">
        {formatMoney(calculateCartLineSubtotal(item))}
      </p>
    </div>
  );
}
