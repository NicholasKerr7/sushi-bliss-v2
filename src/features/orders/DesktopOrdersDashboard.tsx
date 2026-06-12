"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { classNames } from "@/lib/classNames";
import { formatFullDateTime, formatTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { Order } from "@/types/order";

interface DesktopOrdersDashboardProps {
  activeOrders: Order[];
  cartCount: number;
  onReorder: (order: Order) => void;
  onSelectOrder: (order: Order) => void;
  pastOrders: Order[];
  reorderMessage: string;
}

export function DesktopOrdersDashboard({
  activeOrders,
  cartCount,
  onReorder,
  onSelectOrder,
  pastOrders,
  reorderMessage,
}: DesktopOrdersDashboardProps) {
  const activeOrder = activeOrders[0];

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="orders"
    >
      <DesktopMenuHeader activeId="orders" cartCount={cartCount} />
      <main className="mx-auto max-w-[1672px] px-7 pb-6 pt-7">
        <div className="relative overflow-hidden rounded-[24px] border border-[var(--sb-border)] bg-[#060809] shadow-[0_30px_90px_rgba(0,0,0,0.54)]">
          <div className="absolute inset-0 bg-[radial-gradient(700px_260px_at_88%_12%,rgba(199,36,30,0.16),transparent_65%),radial-gradient(520px_260px_at_4%_92%,rgba(216,159,74,0.11),transparent_64%)]" />
          <div className="relative z-10 p-7">
            <p className="text-[15px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Track your orders
            </p>
            <h1 className="editorial-title mt-2 text-[46px] uppercase tracking-[0.08em]">
              Orders
            </h1>
            <p className="mt-2 text-[17px] text-[var(--sb-gold-soft)]">
              Track your orders and enjoy the experience.
            </p>

            {reorderMessage ? (
              <p className="mt-5 rounded-[12px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/8 px-4 py-3 text-[14px] text-[var(--sb-gold-soft)]">
                {reorderMessage}
              </p>
            ) : null}

            {activeOrder ? (
              <section className="mt-5 rounded-[18px] border border-[var(--sb-border)] bg-black/44 p-5">
                <h2 className="editorial-title flex items-center gap-3 text-[20px] uppercase text-white">
                  <AssetIcon
                    size={24}
                    src="/assets/icons/gold-alert-icon.png"
                  />
                  Active order
                </h2>
                <article className="mt-4 overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-[#080a0b]/92">
                  <div className="grid grid-cols-[0.24fr_0.2fr_0.56fr] border-b border-white/10">
                    <div className="p-5">
                      <p className="editorial-title text-[23px] uppercase text-white">
                        Order #{activeOrder.confirmationCode}
                      </p>
                      <p className="mt-3 text-[14px] text-white/60">
                        {formatFullDateTime(activeOrder.createdAt)}
                      </p>
                      <span className="mt-4 inline-grid rounded-[9px] border border-[var(--sb-red-bright)]/48 bg-[var(--sb-red)]/28 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white">
                        {activeOrder.mode}
                      </span>
                    </div>
                    <div className="border-l border-white/10 p-5 text-center">
                      <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                        Estimated delivery
                      </p>
                      <p className="mt-5 font-mono text-[30px] text-[var(--sb-red-bright)]">
                        {formatTime(activeOrder.fulfillmentAt)}
                      </p>
                      <p className="mt-2 text-[14px] text-white/56">
                        {activeOrder.courier?.etaMinutes || 25} min
                      </p>
                    </div>
                    <OrderStatusRail status={activeOrder.status} />
                  </div>
                  <div className="grid grid-cols-[minmax(0,1fr)_190px_220px_220px] items-center gap-5 p-5">
                    <OrderItemPreview order={activeOrder} />
                    <div>
                      <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                        Total
                      </p>
                      <p className="mt-2 font-mono text-[25px] text-[var(--sb-gold-soft)]">
                        {formatMoney(activeOrder.totals.totalCents)}
                      </p>
                    </div>
                    <button
                      className="h-[54px] rounded-[12px] border border-[var(--sb-gold)]/36 text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                      onClick={() => onSelectOrder(activeOrder)}
                      type="button"
                    >
                      View details
                    </button>
                    <Link
                      className="grid h-[54px] place-items-center rounded-[12px] border border-[var(--sb-red-bright)]/58 bg-[var(--sb-red)]/42 text-[14px] uppercase tracking-[0.08em] text-white shadow-[0_0_22px_rgba(238,43,36,0.28)]"
                      href="/support"
                    >
                      Contact support
                    </Link>
                  </div>
                </article>
              </section>
            ) : null}

            <section className="mt-5 rounded-[18px] border border-[var(--sb-border)] bg-black/38 p-5">
              <h2 className="editorial-title flex items-center gap-3 text-[20px] uppercase text-white">
                <AssetIcon size={24} src="/assets/icons/clock-icon.png" />
                Past orders
              </h2>
              <div className="mt-4 overflow-hidden rounded-[16px] border border-white/10">
                {pastOrders.slice(0, 5).map((order) => (
                  <PastOrderRow
                    key={order.id}
                    order={order}
                    onReorder={onReorder}
                    onSelectOrder={onSelectOrder}
                  />
                ))}
              </div>
              <button
                className="mx-auto mt-4 block text-[13px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
                onClick={() => pastOrders[0] && onSelectOrder(pastOrders[0])}
                type="button"
              >
                View all orders &gt;
              </button>
            </section>

            <div className="mt-5">
              <DesktopBenefitStrip />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

function OrderStatusRail({ status }: { status: Order["status"] }) {
  const steps = [
    ["preparing", "Preparing", "/assets/icons/chef-hat-icon.png"],
    [
      "out-for-delivery",
      "On the Way",
      "/assets/icons/delivery-scooter-icon.png",
    ],
    ["completed", "Delivered", "/assets/icons/check-icon.png"],
  ] as const;
  const activeIndex =
    status === "completed" ? 2 : status === "out-for-delivery" ? 1 : 0;

  return (
    <div className="border-l border-white/10 p-5">
      <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
        Order status
      </p>
      <div className="mt-5 grid grid-cols-3 items-start gap-3">
        {steps.map(([id, label, icon], index) => {
          const active = index <= activeIndex;

          return (
            <div className="relative text-center" key={id}>
              {index < steps.length - 1 ? (
                <span
                  className={classNames(
                    "absolute left-1/2 top-6 h-px w-full",
                    active ? "bg-[var(--sb-red-bright)]" : "bg-white/18",
                  )}
                />
              ) : null}
              <span
                className={classNames(
                  "relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full border bg-black",
                  active
                    ? "border-[var(--sb-red-bright)] shadow-[0_0_18px_rgba(238,43,36,0.42)]"
                    : "border-[var(--sb-gold)]/42",
                )}
              >
                <AssetIcon size={24} src={icon} />
              </span>
              <span
                className={classNames(
                  "mt-3 block text-[14px]",
                  index === activeIndex
                    ? "text-[var(--sb-red-bright)]"
                    : "text-white/58",
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderItemPreview({ order }: { order: Order }) {
  return (
    <div className="flex items-center gap-4">
      <p className="min-w-[92px] text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
        {order.items.length} items
      </p>
      <div className="flex items-center gap-3">
        {order.items.slice(0, 3).map((item) => (
          <div
            className="relative h-[62px] w-[104px] overflow-hidden rounded-[10px] border border-white/10 bg-black/30"
            key={item.id}
          >
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="104px"
              src={item.menuItem.image.publicUrl}
            />
          </div>
        ))}
        {order.items.length > 3 ? (
          <span className="grid h-[62px] w-[68px] place-items-center rounded-[10px] border border-white/10 bg-white/[0.035] text-[16px] text-white">
            +{order.items.length - 3}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function PastOrderRow({
  order,
  onReorder,
  onSelectOrder,
}: {
  order: Order;
  onReorder: (order: Order) => void;
  onSelectOrder: (order: Order) => void;
}) {
  return (
    <article className="grid grid-cols-[320px_minmax(0,1fr)_180px_190px_54px] items-center gap-5 border-b border-white/10 bg-black/24 px-5 py-3 last:border-b-0">
      <div>
        <h3 className="editorial-title text-[18px] uppercase text-white">
          Order #{order.confirmationCode}
        </h3>
        <p className="mt-1 text-[13px] text-white/58">
          {formatFullDateTime(order.createdAt)}
        </p>
      </div>
      <OrderItemPreview order={order} />
      <div>
        <p className="font-mono text-[17px] text-[var(--sb-gold-soft)]">
          {formatMoney(order.totals.totalCents)}
        </p>
        <p className="mt-1 text-[13px] text-white/54">Delivered</p>
      </div>
      <button
        className="h-11 rounded-[10px] border border-[var(--sb-gold)]/34 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={() => onReorder(order)}
        type="button"
      >
        Order again
      </button>
      <button
        aria-label={`View details for order ${order.confirmationCode}`}
        className="grid h-11 w-11 place-items-center text-[24px] text-[var(--sb-gold-soft)]"
        onClick={() => onSelectOrder(order)}
        type="button"
      >
        &gt;
      </button>
    </article>
  );
}
