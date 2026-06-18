"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
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
      className="relative hidden min-h-dvh overflow-hidden bg-[#040506] text-white xl:block"
      id="orders"
    >
      <DesktopMenuHeader activeId="orders" cartCount={cartCount} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[76px]"
      >
        <Image
          alt=""
          className="object-cover opacity-20"
          fill
          loading="eager"
          priority
          sizes="1672px"
          src="/assets/ambience/elegant-sushi-bar-ambience-at-night.webp"
        />
        <div className="absolute inset-0 bg-[radial-gradient(640px_300px_at_82%_7%,rgba(198,38,30,0.16),transparent_66%),radial-gradient(520px_240px_at_3%_94%,rgba(216,159,74,0.13),transparent_64%),linear-gradient(180deg,rgba(4,5,6,0.72),#040506_82%)]" />
      </div>
      <main className="relative z-10 mx-auto max-w-[1478px] px-0 pb-2 pt-4">
        <div className="relative overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-[#060809]/88 shadow-[0_30px_90px_rgba(0,0,0,0.54)] backdrop-blur-sm">
          <div className="absolute inset-0 bg-[radial-gradient(700px_260px_at_88%_9%,rgba(199,36,30,0.12),transparent_65%),radial-gradient(520px_220px_at_8%_86%,rgba(215,168,79,0.08),transparent_70%)]" />
          <div className="relative z-10 px-7 pb-4 pt-4">
            <h1 className="editorial-title text-[44px] uppercase leading-none tracking-[0.08em]">
              Orders
            </h1>
            <p className="mt-1 text-[17px] text-[var(--sb-gold-soft)]">
              Track your orders and enjoy the experience.
            </p>

            {reorderMessage ? (
              <p className="mt-5 rounded-[12px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/8 px-4 py-3 text-[14px] text-[var(--sb-gold-soft)]">
                {reorderMessage}
              </p>
            ) : null}

            {activeOrder ? (
              <section className="mt-3 rounded-[18px] border border-[var(--sb-border)] bg-black/44 p-3">
                <h2 className="editorial-title flex items-center gap-3 text-[19px] uppercase text-white">
                  <AssetIcon
                    size={22}
                    src="/assets/icons/gold-alert-icon.png"
                  />
                  Active order
                </h2>
                <article className="mt-2 overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-[#080a0b]/92">
                  <div className="grid grid-cols-[0.24fr_0.2fr_0.56fr] border-b border-white/10">
                    <div className="p-3.5">
                      <p className="editorial-title text-[21px] uppercase text-white">
                        Order #{activeOrder.confirmationCode}
                      </p>
                      <p className="mt-2 text-[14px] text-white/60">
                        {formatFullDateTime(activeOrder.createdAt)}
                      </p>
                      <span className="mt-3 inline-grid rounded-[9px] border border-[var(--sb-red-bright)]/48 bg-[var(--sb-red)]/28 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white">
                        {activeOrder.mode}
                      </span>
                    </div>
                    <div className="border-l border-white/10 p-3.5 text-center">
                      <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                        Estimated delivery
                      </p>
                      <p className="mt-3 font-mono text-[29px] text-[var(--sb-red-bright)]">
                        {formatTime(activeOrder.fulfillmentAt)}
                      </p>
                      <p className="mt-1 text-[14px] text-white/56">
                        {activeOrder.courier?.etaMinutes || 25} min
                      </p>
                    </div>
                    <OrderStatusRail status={activeOrder.status} />
                  </div>
                  <div className="grid grid-cols-[minmax(0,1fr)_160px_200px_200px] items-center gap-5 p-3.5">
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
                      className="h-12 rounded-[12px] border border-[var(--sb-gold)]/36 text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                      onClick={() => onSelectOrder(activeOrder)}
                      type="button"
                    >
                      View details
                    </button>
                    <Link
                      className="grid h-12 place-items-center rounded-[12px] border border-[var(--sb-red-bright)]/58 bg-[var(--sb-red)]/42 text-[14px] uppercase tracking-[0.08em] text-white shadow-[0_0_22px_rgba(238,43,36,0.28)]"
                      href="/support"
                    >
                      Contact support
                    </Link>
                  </div>
                </article>
              </section>
            ) : null}

            <section className="mt-3 rounded-[18px] border border-[var(--sb-border)] bg-black/38 p-3">
              <h2 className="editorial-title flex items-center gap-3 text-[19px] uppercase text-white">
                <AssetIcon size={22} src="/assets/icons/clock-icon.png" />
                Past orders
              </h2>
              <div className="mt-2 overflow-hidden rounded-[16px] border border-white/10">
                {pastOrders.slice(0, 3).map((order) => (
                  <PastOrderRow
                    key={order.id}
                    order={order}
                    onReorder={onReorder}
                    onSelectOrder={onSelectOrder}
                  />
                ))}
              </div>
              <button
                className="mx-auto mt-2 flex min-h-10 items-center gap-2 rounded-full px-3 text-[13px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                onClick={() => pastOrders[0] && onSelectOrder(pastOrders[0])}
                type="button"
              >
                View all orders
                <ChevronIcon direction="right" size={18} />
              </button>
            </section>

            <div className="mt-2">
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
    <div className="border-l border-white/10 p-3.5">
      <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
        Order status
      </p>
      <div className="relative mt-3 px-2 py-1">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[16.666%] right-[16.666%] top-[27px] h-2 rounded-full border border-white/[0.055] bg-[linear-gradient(90deg,rgba(216,168,79,0.10),rgba(255,255,255,0.13),rgba(216,168,79,0.10))] shadow-[inset_0_0_12px_rgba(0,0,0,0.82)]"
        />
        <span
          aria-hidden="true"
          className={classNames(
            "pointer-events-none absolute left-[16.666%] top-[27px] h-2 overflow-hidden rounded-full bg-[linear-gradient(90deg,#741610_0%,#ef2f25_48%,#d8a84f_100%)] shadow-[0_0_18px_rgba(239,47,37,0.46),0_0_28px_rgba(216,168,79,0.16)]",
            getDesktopOrderStatusRailWidth(activeIndex),
          )}
        >
          <span className="absolute inset-y-[3px] left-2 right-2 rounded-full bg-[repeating-linear-gradient(90deg,transparent_0_9px,rgba(255,235,188,0.72)_9px_14px,transparent_14px_24px)] opacity-80" />
          <span className="absolute right-[-4px] top-1/2 h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-[var(--sb-gold)] shadow-[0_0_14px_rgba(216,168,79,0.82),0_0_20px_rgba(239,47,37,0.52)]" />
        </span>

        <ol className="relative z-10 grid grid-cols-3 items-start gap-3">
          {steps.map(([id, label, icon], index) => {
            const active = index <= activeIndex;
            const current = index === activeIndex;

            return (
              <li
                aria-current={current ? "step" : undefined}
                className="relative text-center"
                key={id}
              >
                <span
                  className={classNames(
                    "relative z-10 mx-auto grid h-12 w-12 place-items-center overflow-hidden rounded-full border bg-[#050607]/92 transition duration-300",
                    active
                      ? "border-[var(--sb-red-bright)] shadow-[0_0_18px_rgba(238,43,36,0.42),inset_0_0_16px_rgba(239,47,37,0.12)]"
                      : "border-[var(--sb-gold)]/34 shadow-[inset_0_0_14px_rgba(255,255,255,0.035)]",
                    current
                      ? "scale-[1.06] after:absolute after:inset-[5px] after:rounded-full after:border after:border-[var(--sb-gold)]/32 after:content-['']"
                      : "",
                  )}
                >
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(239,47,37,0.24),transparent_66%)]"
                    />
                  ) : null}
                  <AssetIcon
                    className={classNames(
                      "relative z-10",
                      active
                        ? "drop-shadow-[0_0_7px_rgba(239,47,37,0.72)]"
                        : "opacity-52 grayscale",
                    )}
                    size={24}
                    src={icon}
                  />
                  {current ? (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[4px] h-[2px] w-7 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_10px_rgba(239,47,37,0.9)]"
                    />
                  ) : null}
                </span>
                <span
                  className={classNames(
                    "mt-2 block text-[14px]",
                    current
                      ? "text-[var(--sb-gold-soft)]"
                      : active
                        ? "text-white"
                        : "text-white/58",
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function getDesktopOrderStatusRailWidth(activeIndex: number) {
  if (activeIndex <= 0) {
    return "w-1/3";
  }

  return "w-2/3";
}

function OrderItemPreview({
  compact = false,
  order,
  showCount = true,
}: {
  compact?: boolean;
  order: Order;
  showCount?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      {showCount ? (
        <p className="min-w-[92px] text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          {order.items.length} items
        </p>
      ) : null}
      <div className="flex min-w-0 items-center gap-3">
        {order.items.slice(0, 3).map((item) => (
          <div
            className={classNames(
              "relative shrink-0 overflow-hidden rounded-[10px] border border-white/10 bg-black/30",
              compact ? "h-[46px] w-[82px]" : "h-[56px] w-[94px]",
            )}
            key={item.id}
          >
            <Image
              alt=""
              className="object-cover"
              fill
              sizes={compact ? "82px" : "94px"}
              src={item.menuItem.image.publicUrl}
            />
          </div>
        ))}
        {order.items.length > 3 ? (
          <span
            className={classNames(
              "grid shrink-0 place-items-center rounded-[10px] border border-white/10 bg-white/[0.035] text-[16px] text-white",
              compact ? "h-[46px] w-[56px]" : "h-[56px] w-[62px]",
            )}
          >
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
    <article className="grid grid-cols-[310px_minmax(0,1fr)_160px_170px_44px] items-center gap-5 border-b border-white/10 bg-black/24 px-5 py-2 last:border-b-0">
      <div>
        <h3 className="editorial-title text-[18px] uppercase text-white">
          Order #{order.confirmationCode}
        </h3>
        <p className="mt-1 text-[13px] text-white/58">
          {formatFullDateTime(order.createdAt)}
        </p>
      </div>
      <OrderItemPreview compact order={order} showCount={false} />
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
        <ChevronIcon direction="right" size={18} />
      </button>
    </article>
  );
}
