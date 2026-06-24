"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CartSummary } from "@/features/cart/CartSummary";
import { icons } from "@/features/home/visualHomeData";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import {
  getOrderItemCount,
  getOrderStatusLabel,
  getOrderStatusTone,
} from "@/lib/orders";
import type { CartLineItem, Order } from "@/types/order";

interface TabletOrderReceiptPanelProps {
  order: Order;
}

export function TabletOrderReceiptPanel({
  order,
}: TabletOrderReceiptPanelProps) {
  const primaryItem = order.items[0]?.menuItem;
  const handoffMessage =
    order.mode === "delivery" && order.deliveryAddress
      ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.region} ${order.deliveryAddress.postalCode}`
      : "Pickup at Sushi Bliss counter.";

  return (
    <section className="overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04]">
      <div className="relative min-h-[174px]">
        {primaryItem ? (
          <Image
            alt={primaryItem.image.alt || primaryItem.name}
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="1034px"
            src={primaryItem.image.publicUrl}
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.58)_62%,rgba(0,0,0,0.18)),radial-gradient(circle_at_20%_18%,rgba(239,47,37,0.24),transparent_34%)]" />
        <div className="relative z-10 flex min-h-[174px] flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
                Order details
              </p>
              <h2 className="editorial-title mt-2 truncate text-[30px] leading-none text-white">
                {order.confirmationCode}
              </h2>
            </div>
            <StatusBadge tone={getOrderStatusTone(order.status)}>
              {getOrderStatusLabel(order.status)}
            </StatusBadge>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5">
            <p className="min-w-0">
              <span className="block text-[12px] uppercase tracking-[0.12em] text-white/46">
                Placed
              </span>
              <span className="mt-1 block truncate text-[16px] text-white/76">
                {formatDateTime(order.createdAt)}
              </span>
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--sb-gold)]/30 bg-black/58 px-4 py-2 text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)] backdrop-blur">
              <AssetIcon size={18} src={icons.bag} />
              {getOrderItemCount(order)} items
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5">
        <div className="overflow-hidden rounded-[16px] border border-white/10 bg-black/22">
          {order.items.map((item) => (
            <TabletReceiptItem item={item} key={item.id} />
          ))}
        </div>

        <div className="rounded-[16px] border border-white/10 bg-black/22 p-4">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              Receipt totals
            </p>
            <span className="rounded-full border border-white/10 bg-black/34 px-3 py-1 text-[12px] uppercase tracking-[0.08em] text-white/56">
              {order.mode}
            </span>
          </div>
          <CartSummary
            className="border-t border-white/10 pt-4"
            totals={order.totals}
          />
        </div>

        <div className="grid grid-cols-[54px_minmax(0,1fr)] gap-4 rounded-[16px] border border-white/10 bg-black/22 p-4">
          <span className="grid h-[54px] w-[54px] place-items-center rounded-[14px] border border-[var(--sb-gold)]/28 bg-[var(--sb-gold)]/8">
            <AssetIcon size={28} src={icons.location} />
          </span>
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-white">
              Handoff
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-white/58">
              {handoffMessage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabletReceiptItem({ item }: { item: CartLineItem }) {
  const details = [
    ...item.customizations.map(
      (customization) =>
        `${customization.groupLabel}: ${customization.optionLabel}`,
    ),
    ...item.addOns.map((addOn) => addOn.label),
  ];

  return (
    <div className="grid grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
      <div className="relative h-[64px] overflow-hidden rounded-[13px] border border-white/10 bg-black/34">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          sizes="76px"
          src={item.menuItem.image.publicUrl}
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[16px] text-white">{item.menuItem.name}</p>
        <p className="mt-1 text-[13px] text-white/54">
          {item.quantity} x {formatMoney(item.menuItem.priceCents)}
        </p>
        {details.length > 0 ? (
          <p className="mt-1 line-clamp-1 text-[12px] text-white/42">
            {details.join(" • ")}
          </p>
        ) : null}
      </div>
      <p className="font-mono text-[16px] text-[var(--sb-gold-soft)]">
        {formatMoney(calculateCartLineSubtotal(item))}
      </p>
    </div>
  );
}
