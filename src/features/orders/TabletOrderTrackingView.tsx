"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { icons } from "@/features/home/homeDashboardData";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import {
  getOrderItemCount,
  getOrderStatusLabel,
  getOrderStatusTone,
  getOrderTimeline,
} from "@/lib/orders";
import type { Order } from "@/types/order";

import { TabletOrderReceiptPanel } from "./TabletOrderReceiptPanel";

interface TabletOrderTrackingViewProps {
  detailsOpen: boolean;
  onBackToOrders: () => void;
  onReorder: (order: Order) => void;
  onToggleDetails: () => void;
  order: Order;
}

const progressIcons = [icons.star, icons.chef, icons.bag, icons.location];

function getTabletTrackingRailWidth(completedCount: number): string {
  if (completedCount >= 4) {
    return "w-full";
  }

  if (completedCount === 3) {
    return "w-[68%]";
  }

  if (completedCount === 2) {
    return "w-[42%]";
  }

  return "w-[16%]";
}

export function TabletOrderTrackingView({
  detailsOpen,
  onBackToOrders,
  onReorder,
  onToggleDetails,
  order,
}: TabletOrderTrackingViewProps) {
  const timeline = getOrderTimeline(order);
  const destination =
    order.mode === "delivery" && order.deliveryAddress
      ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.region}`
      : "Sushi Bliss counter";
  const etaLabel =
    order.mode === "delivery"
      ? order.courier
        ? `${order.courier.etaMinutes} min`
        : "25-30 min"
      : "Ready window";
  const visibleTimeline = timeline.slice(0, 4);
  const completedStepCount = visibleTimeline.filter(
    (step) => step.completed,
  ).length;

  return (
    <main className="mx-auto max-w-[1034px]">
      <section className="mt-8 text-center">
        <h1 className="editorial-title text-[46px] uppercase leading-none tracking-[0.16em] lg:text-[54px]">
          {order.mode === "delivery" ? "Live Order Tracking" : "Order Details"}
        </h1>
        <p className="mt-3 text-[17px] text-[var(--sb-gold-soft)]">
          {order.mode === "delivery"
            ? "Your order is on its way."
            : "Your pickup order is being prepared."}
        </p>
      </section>

      <section className="mt-6 rounded-[18px] border border-white/10 bg-white/[0.04]">
        <div className="flex items-center justify-between gap-5 border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-5">
            <StatusBadge tone={getOrderStatusTone(order.status)}>
              {getOrderStatusLabel(order.status)}
            </StatusBadge>
            <p className="text-[15px] text-white/62">
              Order #{order.confirmationCode}
            </p>
          </div>
          <p className="font-mono text-[14px] text-white/56">
            {formatDateTime(order.fulfillmentAt)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 px-6 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <TrackingMetric
            icon={icons.bag}
            label={
              order.mode === "delivery" ? "Estimated Delivery" : "Pickup Time"
            }
            value={etaLabel}
            valueTone="red"
            supporting={
              order.mode === "delivery"
                ? `Arriving around ${formatDateTime(order.fulfillmentAt)}`
                : formatDateTime(order.fulfillmentAt)
            }
          />
          <TrackingMetric
            icon={icons.flower}
            label="Sushi Bliss"
            value={
              order.mode === "delivery" ? "Downtown Kitchen" : "Pickup Counter"
            }
            supporting="88 Kintsugi Lane, New York"
          />
          <TrackingMetric
            icon={icons.location}
            label={order.mode === "delivery" ? "Your Location" : "Guest"}
            value={destination}
            supporting={order.customer.name}
          />
        </div>
      </section>

      <section className="relative mt-4 h-[260px] overflow-hidden rounded-[18px] border border-white/10 bg-black/40">
        <Image
          alt="Live delivery tracking map"
          className="object-cover opacity-82"
          fill
          loading="eager"
          priority
          sizes="(min-width: 768px) 1034px, 100vw"
          src="/assets/maps/tokyo-delivery-route-tracker.webp"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_44%,rgba(238,43,36,0.22),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.38))]" />
        <div className="absolute left-5 top-5 rounded-[12px] border border-[var(--sb-gold)]/30 bg-black/72 px-4 py-2 text-[13px] text-[var(--sb-gold-soft)]">
          Real-time updates
        </div>
        <div className="absolute right-6 top-6 rounded-[12px] border border-white/10 bg-black/72 px-4 py-3 text-center">
          <p className="font-mono text-[22px] text-white">
            {order.courier ? `${order.courier.etaMinutes}m` : "Live"}
          </p>
          <p className="text-[12px] text-white/48">
            {order.mode === "delivery" ? "away" : "pickup"}
          </p>
        </div>
      </section>

      <section className="mt-4 rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
        <ol className="relative isolate grid grid-cols-4 gap-3">
          <span
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[27px] h-[7px] overflow-hidden rounded-full border border-white/[0.045] bg-black/54 shadow-[inset_0_0_10px_rgba(0,0,0,0.72)]"
          >
            <span className="absolute inset-y-[2px] left-2 right-2 rounded-full bg-white/10" />
            <span
              className={classNames(
                "absolute inset-y-[1px] left-0 rounded-full bg-[linear-gradient(90deg,var(--sb-red-bright),var(--sb-gold-soft))] shadow-[0_0_18px_rgba(238,43,36,0.64)]",
                getTabletTrackingRailWidth(completedStepCount),
              )}
            />
            <span
              className={classNames(
                "absolute inset-y-[2px] left-2 rounded-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.38)_0_8px,transparent_8px_16px)] opacity-40",
                getTabletTrackingRailWidth(completedStepCount),
              )}
            />
          </span>
          {visibleTimeline.map((step, index) => {
            const isCurrent = index === Math.max(completedStepCount - 1, 0);

            return (
              <li
                aria-current={isCurrent ? "step" : undefined}
                className="relative flex flex-col items-center gap-3 text-center"
                key={step.id}
              >
                <span
                  className={classNames(
                    "relative z-10 grid h-[58px] w-[58px] place-items-center rounded-full border bg-black/60 transition",
                    step.completed
                      ? "border-[var(--sb-red-bright)] shadow-[0_0_24px_rgba(238,43,36,0.36),inset_0_0_18px_rgba(238,43,36,0.18)]"
                      : "border-white/18 shadow-[inset_0_0_16px_rgba(0,0,0,0.62)]",
                  )}
                >
                  <AssetIcon size={24} src={progressIcons[index]} />
                  {isCurrent ? (
                    <span className="absolute -bottom-1 h-1.5 w-9 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_16px_rgba(238,43,36,0.78)]" />
                  ) : null}
                </span>
                <span
                  className={classNames(
                    "text-[13px] font-semibold uppercase tracking-[0.08em]",
                    step.completed
                      ? "text-[var(--sb-red-bright)]"
                      : "text-white/58",
                  )}
                >
                  {step.label}
                </span>
                <span className="font-mono text-[12px] text-white/44">
                  {step.timestamp || "Pending"}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <CourierPanel order={order} />
        <NoContactPanel />
      </section>

      <section className="mt-4 rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <p className="text-[15px] text-[var(--sb-gold-soft)]">
              {getOrderItemCount(order)} items
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-5">
              {order.items.slice(0, 5).map((item) => (
                <div
                  className="relative min-h-[130px] overflow-hidden rounded-[14px] border border-white/10 bg-black/28"
                  key={item.id}
                >
                  <Image
                    alt={item.menuItem.image.alt || item.menuItem.name}
                    className="object-cover"
                    fill
                    sizes="150px"
                    src={item.menuItem.image.publicUrl}
                  />
                  <span className="absolute left-2 top-2 grid h-6 min-w-6 place-items-center rounded-full border border-[var(--sb-gold)]/50 bg-black/70 px-1 font-mono text-[12px] text-[var(--sb-gold-soft)]">
                    {item.quantity}
                  </span>
                  <p className="absolute inset-x-0 bottom-0 bg-black/72 px-3 py-2 text-[13px] font-semibold text-white">
                    {item.menuItem.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            <Button
              className="h-[58px] rounded-[14px] uppercase tracking-[0.08em]"
              onClick={onToggleDetails}
              variant="secondary"
            >
              {detailsOpen ? "Hide order details" : "View order details"}
            </Button>
            <Button
              className="red-glow-button h-[58px] rounded-[14px] uppercase tracking-[0.08em]"
              onClick={onBackToOrders}
            >
              Back to orders
            </Button>
            <Button
              className="h-[48px] rounded-[14px]"
              onClick={() => onReorder(order)}
              variant="ghost"
            >
              Reorder
            </Button>
          </div>
        </div>
      </section>

      {detailsOpen ? (
        <div className="mt-4">
          <TabletOrderReceiptPanel order={order} />
        </div>
      ) : null}
    </main>
  );
}

function TrackingMetric({
  icon,
  label,
  supporting,
  value,
  valueTone,
}: {
  icon?: string;
  label: string;
  supporting: string;
  value: string;
  valueTone?: "red";
}) {
  return (
    <div className="flex min-w-0 items-center gap-4 rounded-[14px] border border-white/10 bg-black/22 p-4">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-[var(--sb-gold)]/8">
        <AssetIcon size={30} src={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] text-white/52">{label}</p>
        <p
          className={`mt-1 truncate text-[19px] ${
            valueTone === "red" ? "text-[var(--sb-red-bright)]" : "text-white"
          }`}
        >
          {value}
        </p>
        <p className="mt-1 truncate text-[13px] text-white/44">{supporting}</p>
      </div>
    </div>
  );
}

function CourierPanel({ order }: { order: Order }) {
  const courier = order.courier;

  return (
    <section className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
      <div className="grid grid-cols-[96px_1fr] gap-5">
        <Image
          alt=""
          className="h-24 w-24 rounded-full border border-[var(--sb-gold)]/34 object-cover"
          height={96}
          src="/assets/icons/delivery-rider-avatar.png"
          width={96}
        />
        <div>
          <p className="text-[14px] text-[var(--sb-gold-soft)]">
            {order.mode === "delivery" ? "Your Courier" : "Kitchen Team"}
          </p>
          <h2 className="editorial-title mt-2 text-[28px] leading-none text-white">
            {courier?.name || "Sushi Bliss"}
          </h2>
          <p className="mt-2 text-[14px] text-white/52">
            {courier
              ? `${courier.vehicle} - ${courier.phone}`
              : "Your order is waiting for assignment updates."}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {courier ? (
              <>
                <Button
                  className="red-glow-button h-[46px] rounded-[12px]"
                  href={`tel:${courier.phone.replaceAll(" ", "")}`}
                >
                  Contact driver
                </Button>
                <Button
                  className="h-[46px] rounded-[12px]"
                  href={`sms:${courier.phone.replaceAll(" ", "")}`}
                  variant="ghost"
                >
                  Message
                </Button>
              </>
            ) : (
              <>
                <Button className="h-[46px] rounded-[12px]" disabled>
                  Contact pending
                </Button>
                <Button
                  className="h-[46px] rounded-[12px]"
                  disabled
                  variant="ghost"
                >
                  Message pending
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function NoContactPanel() {
  return (
    <section className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--sb-gold)]/30 bg-[var(--sb-gold)]/8">
          <AssetIcon size={30} src={icons.bag} />
        </span>
        <div>
          <h2 className="text-[17px] font-semibold text-[var(--sb-gold-soft)]">
            No-contact handoff
          </h2>
          <p className="mt-2 text-[14px] leading-6 text-white/52">
            Delivery orders can be left safely at your door. Pickup orders are
            held under your profile name.
          </p>
        </div>
      </div>
    </section>
  );
}
