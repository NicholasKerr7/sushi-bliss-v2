"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { icons } from "@/features/home/homeDashboardData";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { formatTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import { getOrderItemCount } from "@/lib/orders";
import type { Order } from "@/types/order";

import {
  getMobileEtaCopy,
  getMobileOrderHeadline,
  MobileBackButton,
  MobileIconCircle,
  MobileOrderPanel,
  MobileOrdersHeader,
} from "./MobileOrdersPrimitives";

interface MobileOrderTrackingViewProps {
  cartCount: number;
  onBack: () => void;
  onOpenCart: () => void;
  order: Order;
  unreadNotificationCount: number;
}

/** Mobile live tracking view for active delivery and pickup orders. */
export function MobileOrderTrackingView({
  cartCount,
  onBack,
  onOpenCart,
  order,
  unreadNotificationCount,
}: MobileOrderTrackingViewProps) {
  const address =
    order.mode === "delivery" && order.deliveryAddress
      ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.postalCode}`
      : "Sushi Bliss pickup counter";
  const supportingAddress =
    order.mode === "delivery"
      ? order.deliveryAddress?.line2 || "Near Tokyo Tower"
      : "Show your confirmation code at arrival.";
  const courierPhone = order.courier?.phone.replaceAll(" ", "");
  const courierEta = order.courier
    ? `${order.courier.etaMinutes} min`
    : getMobileEtaCopy(order);
  const handoffCopy =
    order.mode === "delivery"
      ? order.courier
        ? `${order.courier.name} is handling final handoff.`
        : "Courier assignment is pending while the kitchen finishes packing."
      : "Your order will be held at the pickup counter.";

  return (
    <>
      <div className="mobile-frame relative z-10">
        <MobileOrdersHeader
          cartCount={cartCount}
          onOpenCart={onOpenCart}
          unreadNotificationCount={unreadNotificationCount}
        />

        <section className="mt-7 grid grid-cols-[44px_minmax(0,1fr)] gap-3 min-[390px]:mt-9 min-[390px]:grid-cols-[58px_1fr] min-[390px]:gap-4">
          <MobileBackButton label="Back to order details" onClick={onBack} />
          <div className="min-w-0">
            <div className="inline-grid max-w-full rounded-[12px] border border-[var(--sb-border)] bg-black/30 px-3 py-2">
              <span className="text-[9px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)] min-[390px]:text-[10px] min-[390px]:tracking-[0.16em]">
                Order tracking
              </span>
              <span className="mt-1 truncate font-mono text-[11px] uppercase tracking-[0.03em] text-white/72 min-[390px]:text-[13px] min-[390px]:tracking-[0.04em]">
                {order.confirmationCode}
              </span>
            </div>
            <h1 className="mt-4 text-[29px] leading-[0.98] text-white min-[390px]:mt-5 min-[390px]:text-[40px] min-[390px]:leading-[0.96]">
              {getMobileOrderHeadline(order)}
            </h1>
            <p className="mt-3 text-[14px] leading-[22px] text-[var(--sb-gold-soft)] min-[390px]:mt-4 min-[390px]:text-[19px] min-[390px]:leading-7">
              {order.mode === "delivery"
                ? "Your sushi is moving through the final handoff."
                : "Your sushi is being prepared for pickup."}
            </p>
          </div>
          <MobileOrderPanel className="col-start-2 p-3 text-left min-[390px]:p-4">
            <div className="flex items-center gap-2">
              <AssetIcon size={20} src={icons.clock} />
              <span className="text-[13px] uppercase tracking-[0.08em] text-white/70">
                ETA
              </span>
            </div>
            <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 min-[390px]:gap-4">
              <p className="min-w-0 text-[25px] leading-none text-white min-[390px]:text-[31px]">
                {formatTime(order.fulfillmentAt)}
              </p>
              <p className="max-w-[96px] text-right text-[11px] leading-4 text-[var(--sb-gold-soft)] min-[390px]:max-w-[112px] min-[390px]:text-[13px] min-[390px]:leading-5">
                {getMobileEtaCopy(order)}
              </p>
            </div>
          </MobileOrderPanel>
        </section>

        <MobileOrderPanel className="mt-8 min-w-0 overflow-hidden">
          <div className="relative h-[224px] w-full min-w-0 overflow-hidden min-[390px]:h-[246px] min-[480px]:h-[310px]">
            <Image
              alt="Live order tracking map"
              className="object-cover"
              fill
              loading="eager"
              priority
              sizes="430px"
              src="/assets/maps/tokyo-delivery-route-tracker.webp"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,rgba(0,0,0,0.46),transparent)]" />
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-[var(--sb-red-bright)]/38 bg-black/54 px-3 py-2 text-[10px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)] shadow-[0_0_22px_rgba(239,47,37,0.22)] backdrop-blur-md min-[390px]:left-4 min-[390px]:top-4 min-[390px]:px-4 min-[390px]:text-[11px] min-[390px]:tracking-[0.1em]">
              <span className="h-2 w-2 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_14px_rgba(239,47,37,0.95)]" />
              Live route
            </div>
            <div className="absolute bottom-3 left-3 right-3 grid min-w-0 grid-cols-[minmax(0,1fr)_64px] items-center gap-2 rounded-[14px] border border-white/10 bg-black/58 p-2.5 shadow-[0_18px_38px_rgba(0,0,0,0.46)] backdrop-blur-md min-[390px]:bottom-4 min-[390px]:left-4 min-[390px]:right-4 min-[390px]:grid-cols-[minmax(0,1fr)_74px] min-[390px]:gap-3 min-[390px]:rounded-[16px] min-[390px]:p-3">
              <p className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.1em] text-white/48 min-[390px]:text-[11px] min-[390px]:tracking-[0.12em]">
                  Current handoff
                </span>
                <span className="mt-1 block line-clamp-2 text-[12px] leading-4 text-white min-[390px]:text-[14px] min-[390px]:leading-5">
                  {handoffCopy}
                </span>
              </p>
              <span className="grid min-h-[44px] place-items-center rounded-[12px] border border-[var(--sb-gold)]/38 bg-[var(--sb-gold)]/12 px-2 text-center font-mono text-[12px] leading-4 text-[var(--sb-gold-soft)] shadow-[0_0_24px_rgba(216,168,79,0.16)] min-[390px]:min-h-[48px] min-[390px]:rounded-[14px] min-[390px]:text-[13px]">
                {courierEta}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3 border-t border-[var(--sb-border)] px-3 py-4 min-[390px]:grid-cols-[54px_1fr] min-[390px]:gap-4 min-[390px]:px-4 min-[390px]:py-5">
            <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-[var(--sb-gold)]/30 bg-[var(--sb-gold)]/8 min-[390px]:h-[54px] min-[390px]:w-[54px] min-[390px]:rounded-[14px]">
              <AssetIcon size={25} src={icons.location} />
            </span>
            <p className="min-w-0">
              <span className="editorial-title block text-[13px] uppercase text-[var(--sb-gold-soft)] min-[390px]:text-[16px]">
                {order.mode === "delivery" ? "Destination" : "Pickup"}
              </span>
              <span className="mt-1.5 block break-words text-[13px] leading-5 text-white min-[390px]:mt-2 min-[390px]:text-[18px] min-[390px]:leading-6">
                {address}
              </span>
              <span className="mt-1 block text-[12px] leading-[18px] text-white/52 min-[390px]:text-[14px] min-[390px]:leading-5">
                {supportingAddress}
              </span>
            </p>
          </div>
        </MobileOrderPanel>

        <div className="mt-4 grid grid-cols-2 gap-2.5 min-[390px]:gap-3">
          {order.courier && courierPhone ? (
            <TrackingActionLink
              href={`tel:${courierPhone}`}
              icon={icons.location}
              label="Call courier"
              primary
            />
          ) : (
            <TrackingActionLink
              href="/support"
              icon={icons.bell}
              label="Contact team"
              primary
            />
          )}
          <TrackingActionLink
            href="/support"
            icon={icons.bell}
            label="Message support"
          />
        </div>

        <MobileOrderPanel className="mt-5 p-3 min-[390px]:p-4">
          <div className="flex items-center justify-between">
            <h2 className="editorial-title text-[16px] uppercase text-[var(--sb-gold-soft)] min-[390px]:text-[18px]">
              Order Summary
            </h2>
            <p className="text-[12px] text-white/58 min-[390px]:text-[15px]">
              {getOrderItemCount(order)} items
            </p>
          </div>

          <div className="mt-4 divide-y divide-white/10">
            {order.items.map((item) => (
              <div
                className="grid grid-cols-[58px_minmax(0,1fr)] gap-2.5 py-3 first:pt-0 min-[390px]:grid-cols-[78px_1fr_auto] min-[390px]:gap-4 min-[390px]:py-4"
                key={item.id}
              >
                <div className="relative h-[54px] overflow-hidden rounded-[9px] border border-white/10 bg-black/34 min-[390px]:h-[60px]">
                  <Image
                    alt={item.menuItem.image.alt || item.menuItem.name}
                    className="object-cover"
                    fill
                    sizes="78px"
                    src={item.menuItem.image.publicUrl}
                  />
                </div>
                <p className="min-w-0">
                  <span className="block truncate text-[14px] text-white min-[390px]:text-[18px]">
                    {item.menuItem.name}
                  </span>
                  <span className="mt-1.5 block text-[12px] text-white/54 min-[390px]:mt-2 min-[390px]:text-[14px]">
                    {item.quantity}x {formatMoney(item.menuItem.priceCents)}
                  </span>
                </p>
                <span className="col-start-2 font-mono text-[12px] text-[var(--sb-gold-soft)] min-[390px]:col-start-auto min-[390px]:pt-1 min-[390px]:text-[17px]">
                  {formatMoney(calculateCartLineSubtotal(item))}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-white/10 pt-4 min-[390px]:pt-5">
            <span className="text-[18px] text-white min-[390px]:text-[22px]">
              Total
            </span>
            <span className="font-mono text-[20px] text-[var(--sb-gold-soft)] min-[390px]:text-[24px]">
              {formatMoney(order.totals.totalCents)}
            </span>
          </div>
        </MobileOrderPanel>

        <MobileOrderPanel className="mt-5 overflow-hidden">
          <div className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 p-3 min-[390px]:grid-cols-[64px_1fr] min-[390px]:gap-4 min-[390px]:p-4">
            <MobileIconCircle icon={icons.bag} size={25} />
            <p className="min-w-0">
              <span className="block break-words text-[14px] text-white min-[390px]:text-[16px]">
                {order.courier?.name || "Sushi Bliss team"}
              </span>
              <span className="mt-1.5 block text-[12px] leading-[18px] text-white/54 min-[390px]:mt-2 min-[390px]:text-[14px] min-[390px]:leading-6">
                {order.courier
                  ? `${order.courier.vehicle} assigned for a sealed handoff.`
                  : "We will update this screen when your handoff is assigned."}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-3 border-t border-white/10">
            <CourierSignal
              label="Status"
              value={order.courier ? "Assigned" : "Pending"}
            />
            <CourierSignal label="Courier arrival" value={courierEta} />
            <CourierSignal
              label="Mode"
              value={order.mode === "delivery" ? "Delivery" : "Pickup"}
            />
          </div>
        </MobileOrderPanel>
      </div>

      <BottomNavigation
        activeId="orders"
        ariaLabel="Mobile orders navigation"
      />
    </>
  );
}

function TrackingActionLink({
  href,
  icon,
  label,
  primary = false,
}: {
  href: string;
  icon?: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <Link
      className={
        primary
          ? "red-glow-button flex min-h-[56px] items-center justify-center gap-2 rounded-[14px] px-2 text-[10px] uppercase tracking-[0.05em] min-[390px]:min-h-[72px] min-[390px]:gap-3 min-[390px]:rounded-[15px] min-[390px]:text-[13px] min-[390px]:tracking-[0.08em]"
          : "flex min-h-[56px] items-center justify-center gap-2 rounded-[14px] border border-[var(--sb-gold)]/28 bg-black/34 px-2 text-[10px] uppercase tracking-[0.05em] text-[var(--sb-gold-soft)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_34px_rgba(0,0,0,0.32)] transition hover:border-[var(--sb-gold)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:min-h-[72px] min-[390px]:gap-3 min-[390px]:rounded-[15px] min-[390px]:text-[13px] min-[390px]:tracking-[0.08em]"
      }
      href={href}
    >
      <AssetIcon size={21} src={icon} />
      {label}
    </Link>
  );
}

function CourierSignal({ label, value }: { label: string; value: string }) {
  return (
    <p className="border-r border-white/10 px-2 py-3 text-center last:border-r-0 min-[390px]:px-3">
      <span className="block text-[8.5px] uppercase tracking-[0.07em] text-white/42 min-[390px]:text-[10px] min-[390px]:tracking-[0.12em]">
        {label}
      </span>
      <span className="mt-1 block text-[11px] text-[var(--sb-gold-soft)] min-[390px]:text-[13px]">
        {value}
      </span>
    </p>
  );
}
