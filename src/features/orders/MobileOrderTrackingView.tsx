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
}

/** Mobile live tracking view for active delivery and pickup orders. */
export function MobileOrderTrackingView({
  cartCount,
  onBack,
  onOpenCart,
  order,
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

  return (
    <>
      <div className="relative z-10 mx-auto max-w-[430px]">
        <MobileOrdersHeader onOpenCart={onOpenCart} showCart={cartCount > 0} />

        <section className="mt-9 grid grid-cols-[58px_1fr] gap-4">
          <MobileBackButton label="Back to order details" onClick={onBack} />
          <div className="min-w-0">
            <p className="editorial-title text-[19px] uppercase tracking-[0.04em] text-[var(--sb-gold-soft)]">
              Order {order.confirmationCode}
            </p>
            <h1 className="mt-5 text-[44px] leading-[0.96] text-white">
              {getMobileOrderHeadline(order)}
            </h1>
            <p className="mt-4 text-[19px] leading-7 text-[var(--sb-gold-soft)]">
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
              priority
              sizes="430px"
              src="/assets/maps/map-route.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.26))]" />
          </div>

          <div className="grid grid-cols-[50px_1fr_auto] items-center gap-4 border-t border-[var(--sb-border)] px-4 py-5">
            <AssetIcon size={30} src={icons.location} />
            <p className="min-w-0">
              <span className="editorial-title block text-[16px] uppercase text-[var(--sb-gold-soft)]">
                {order.mode === "delivery" ? "Delivery Address" : "Pickup"}
              </span>
              <span className="mt-2 block text-[18px] leading-6 text-white">
                {address}
              </span>
              <span className="mt-1 block text-[14px] text-white/52">
                {supportingAddress}
              </span>
            </p>
            <span
              className="text-[30px] text-[var(--sb-gold-soft)]"
              aria-hidden
            >
              &rsaquo;
            </span>
          </div>
        </MobileOrderPanel>

        <MobileOrderPanel className="mt-4 grid grid-cols-2 divide-x divide-white/10 overflow-hidden">
          {order.courier && courierPhone ? (
            <Link
              className="flex min-h-[76px] items-center justify-center gap-3 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              href={`tel:${courierPhone}`}
            >
              <AssetIcon size={26} src={icons.location} />
              Call Courier
            </Link>
          ) : (
            <Link
              className="flex min-h-[76px] items-center justify-center gap-3 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              href="/support"
            >
              <AssetIcon size={26} src={icons.bell} />
              Contact Sushi Bliss
            </Link>
          )}
          <Link
            className="flex min-h-[76px] items-center justify-center gap-3 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            href="/support"
          >
            <AssetIcon size={26} src={icons.bell} />
            Message Support
          </Link>
        </MobileOrderPanel>

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

        <MobileOrderPanel className="mt-5 grid grid-cols-[64px_1fr] gap-4 p-4">
          <MobileIconCircle icon={icons.bag} />
          <p>
            <span className="block text-[16px] text-white">
              {order.courier?.name || "Sushi Bliss team"}
            </span>
            <span className="mt-2 block text-[14px] leading-6 text-white/54">
              {order.courier
                ? `${order.courier.vehicle} is assigned to your order.`
                : "We will update this screen when your handoff is assigned."}
            </span>
          </p>
        </MobileOrderPanel>
      </div>

      <BottomNavigation
        activeId="orders"
        ariaLabel="Mobile orders navigation"
      />
    </>
  );
}
