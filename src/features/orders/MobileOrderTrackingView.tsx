"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { icons } from "@/features/home/visualHomeData";
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
        ? `${order.courier.name} is handling your final delivery handoff.`
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

        <section className="mt-9 grid grid-cols-[58px_1fr] gap-4">
          <MobileBackButton label="Back to order details" onClick={onBack} />
          <div className="min-w-0">
            <p className="editorial-title text-[19px] uppercase tracking-[0.04em] text-[var(--sb-gold-soft)]">
              Order {order.confirmationCode}
            </p>
            <h1 className="mt-5 text-[34px] leading-[0.98] text-white min-[390px]:text-[40px] min-[390px]:leading-[0.96]">
              {getMobileOrderHeadline(order)}
            </h1>
            <p className="mt-4 text-[16px] leading-6 text-[var(--sb-gold-soft)] min-[390px]:text-[19px] min-[390px]:leading-7">
              {order.mode === "delivery"
                ? "Your sushi is moving through the final handoff."
                : "Your sushi is being prepared for pickup."}
            </p>
          </div>
          <MobileOrderPanel className="col-start-2 p-4 text-left">
            <div className="flex items-center gap-2">
              <AssetIcon size={20} src={icons.clock} />
              <span className="text-[13px] uppercase tracking-[0.08em] text-white/70">
                ETA
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="text-[31px] leading-none text-white">
                {formatTime(order.fulfillmentAt)}
              </p>
              <p className="max-w-[112px] text-right text-[13px] leading-5 text-[var(--sb-gold-soft)]">
                {getMobileEtaCopy(order)}
              </p>
            </div>
          </MobileOrderPanel>
        </section>

        <MobileOrderPanel className="mt-8 overflow-hidden">
          <div className="relative aspect-[1.68] min-h-[246px] overflow-hidden">
            <Image
              alt="Live order tracking map"
              className="object-cover"
              fill
              loading="eager"
              priority
              sizes="430px"
              src="/assets/maps/tokyo-delivery-route-tracker.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.26))]" />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-[var(--sb-red-bright)]/38 bg-black/54 px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-[var(--sb-red-bright)] shadow-[0_0_22px_rgba(239,47,37,0.22)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_14px_rgba(239,47,37,0.95)]" />
              Live route
            </div>
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-[minmax(0,1fr)_74px] items-center gap-3 rounded-[16px] border border-white/10 bg-black/58 p-3 shadow-[0_18px_38px_rgba(0,0,0,0.46)] backdrop-blur-md">
              <p className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.12em] text-white/48">
                  Current handoff
                </span>
                <span className="mt-1 block line-clamp-2 text-[14px] leading-5 text-white">
                  {handoffCopy}
                </span>
              </p>
              <span className="grid min-h-[48px] place-items-center rounded-[14px] border border-[var(--sb-gold)]/38 bg-[var(--sb-gold)]/12 px-2 text-center font-mono text-[13px] leading-4 text-[var(--sb-gold-soft)] shadow-[0_0_24px_rgba(216,168,79,0.16)]">
                {courierEta}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[54px_1fr] items-center gap-4 border-t border-[var(--sb-border)] px-4 py-5">
            <span className="grid h-[54px] w-[54px] place-items-center rounded-[14px] border border-[var(--sb-gold)]/30 bg-[var(--sb-gold)]/8">
              <AssetIcon size={30} src={icons.location} />
            </span>
            <p className="min-w-0">
              <span className="editorial-title block text-[16px] uppercase text-[var(--sb-gold-soft)]">
                {order.mode === "delivery" ? "Destination" : "Pickup"}
              </span>
              <span className="mt-2 block text-[18px] leading-6 text-white">
                {address}
              </span>
              <span className="mt-1 block text-[14px] leading-5 text-white/52">
                {supportingAddress}
              </span>
            </p>
          </div>
        </MobileOrderPanel>

        <div className="mt-4 grid grid-cols-2 gap-3">
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

        <MobileOrderPanel className="mt-5 p-4">
          <div className="flex items-center justify-between">
            <h2 className="editorial-title text-[18px] uppercase text-[var(--sb-gold-soft)]">
              Order Summary
            </h2>
            <p className="text-[15px] text-white/58">
              {getOrderItemCount(order)} items
            </p>
          </div>

          <div className="mt-4 divide-y divide-white/10">
            {order.items.map((item) => (
              <div
                className="grid grid-cols-[78px_1fr_auto] gap-4 py-4 first:pt-0"
                key={item.id}
              >
                <div className="relative h-[60px] overflow-hidden rounded-[9px] border border-white/10 bg-black/34">
                  <Image
                    alt={item.menuItem.image.alt || item.menuItem.name}
                    className="object-cover"
                    fill
                    sizes="78px"
                    src={item.menuItem.image.publicUrl}
                  />
                </div>
                <p className="min-w-0">
                  <span className="block truncate text-[18px] text-white">
                    {item.menuItem.name}
                  </span>
                  <span className="mt-2 block text-[14px] text-white/54">
                    {item.quantity}x {formatMoney(item.menuItem.priceCents)}
                  </span>
                </p>
                <span className="pt-1 font-mono text-[17px] text-[var(--sb-gold-soft)]">
                  {formatMoney(calculateCartLineSubtotal(item))}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="text-[22px] text-white">Total</span>
            <span className="font-mono text-[24px] text-[var(--sb-gold-soft)]">
              {formatMoney(order.totals.totalCents)}
            </span>
          </div>
        </MobileOrderPanel>

        <MobileOrderPanel className="mt-5 overflow-hidden">
          <div className="grid grid-cols-[64px_1fr] gap-4 p-4">
            <MobileIconCircle icon={icons.bag} />
            <p>
              <span className="block text-[16px] text-white">
                {order.courier?.name || "Sushi Bliss team"}
              </span>
              <span className="mt-2 block text-[14px] leading-6 text-white/54">
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
          ? "red-glow-button flex min-h-[62px] items-center justify-center gap-2.5 rounded-[14px] text-[12px] uppercase tracking-[0.07em] min-[390px]:min-h-[72px] min-[390px]:gap-3 min-[390px]:rounded-[15px] min-[390px]:text-[13px] min-[390px]:tracking-[0.08em]"
          : "flex min-h-[62px] items-center justify-center gap-2.5 rounded-[14px] border border-[var(--sb-gold)]/28 bg-black/34 text-[12px] uppercase tracking-[0.07em] text-[var(--sb-gold-soft)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_34px_rgba(0,0,0,0.32)] transition hover:border-[var(--sb-gold)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:min-h-[72px] min-[390px]:gap-3 min-[390px]:rounded-[15px] min-[390px]:text-[13px] min-[390px]:tracking-[0.08em]"
      }
      href={href}
    >
      <AssetIcon size={24} src={icon} />
      {label}
    </Link>
  );
}

function CourierSignal({ label, value }: { label: string; value: string }) {
  return (
    <p className="border-r border-white/10 px-3 py-3 text-center last:border-r-0">
      <span className="block text-[10px] uppercase tracking-[0.12em] text-white/42">
        {label}
      </span>
      <span className="mt-1 block text-[13px] text-[var(--sb-gold-soft)]">
        {value}
      </span>
    </p>
  );
}
