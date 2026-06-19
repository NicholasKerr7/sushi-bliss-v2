"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { icons } from "@/features/home/visualHomeData";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { formatFullDateTime, formatTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import { getOrderStatusLabel } from "@/lib/orders";
import type { Order } from "@/types/order";

import {
  getMobileOrderHeadline,
  MobileBackButton,
  MobileIconCircle,
  MobileOrderPanel,
  MobileOrdersHeader,
} from "./MobileOrdersPrimitives";

interface MobileOrderDetailsViewProps {
  cartCount: number;
  onBack: () => void;
  onOpenCart: () => void;
  onReorder: (order: Order) => void;
  onTrackOrder: (order: Order) => void;
  order: Order;
  unreadNotificationCount: number;
}

/** Mobile receipt and order detail screen backed by the selected order data. */
export function MobileOrderDetailsView({
  cartCount,
  onBack,
  onOpenCart,
  onReorder,
  onTrackOrder,
  order,
  unreadNotificationCount,
}: MobileOrderDetailsViewProps) {
  const canTrack =
    order.status !== "completed" &&
    order.status !== "cancelled" &&
    order.mode === "delivery";
  const address =
    order.mode === "delivery" && order.deliveryAddress
      ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.postalCode}`
      : "Sushi Bliss pickup counter";

  return (
    <>
      <div className="mobile-frame relative z-10">
        <MobileOrdersHeader
          cartCount={cartCount}
          onOpenCart={onOpenCart}
          unreadNotificationCount={unreadNotificationCount}
        />

        <div className="mt-7 grid grid-cols-[52px_1fr_52px] items-center">
          <MobileBackButton label="Back to orders" onClick={onBack} />
          <h1 className="editorial-title text-center text-[25px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Order Details
          </h1>
          <span aria-hidden="true" />
        </div>

        <section className="mt-8 grid grid-cols-[1fr_auto] gap-4">
          <div className="min-w-0">
            <p className="editorial-title text-[18px] uppercase text-[var(--sb-gold-soft)]">
              Order #
            </p>
            <h2 className="mt-3 break-words text-[31px] leading-[0.98] text-white">
              {order.confirmationCode}
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-white/58">
              {formatFullDateTime(order.createdAt)}
            </p>
          </div>
          <div className="pt-3 text-right">
            <span className="inline-flex min-h-[42px] items-center rounded-full border border-[var(--sb-border)] bg-[var(--sb-gold)]/10 px-4 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              {getOrderStatusLabel(order.status)}
            </span>
            <p className="mt-4 text-[14px] text-white/50">
              {order.mode === "delivery" ? "Estimated delivery" : "Pickup"}
            </p>
            <p className="mt-2 text-[18px] text-white/72">
              {formatTime(order.fulfillmentAt)}
            </p>
          </div>
        </section>

        <MobileOrderPanel className="mt-6 overflow-hidden">
          <div className="p-4">
            <h3 className="editorial-title text-[19px] uppercase text-[var(--sb-gold-soft)]">
              Ordered Items
            </h3>
            <div className="mt-3 divide-y divide-white/10">
              {order.items.map((item, index) => (
                <div
                  className="grid grid-cols-[104px_1fr_auto] gap-4 py-4 first:pt-0"
                  key={item.id}
                >
                  <div className="relative h-[82px] overflow-hidden rounded-[11px] border border-white/10 bg-black/34">
                    <Image
                      alt={item.menuItem.image.alt || item.menuItem.name}
                      className="object-cover"
                      fill
                      loading="eager"
                      priority={index === 0}
                      sizes="104px"
                      src={item.menuItem.image.publicUrl}
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="line-clamp-2 text-[18px] leading-6 text-white">
                      {item.menuItem.name}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-white/54">
                      {item.menuItem.description}
                    </p>
                    <p className="mt-2 text-[14px] text-[var(--sb-gold-soft)]">
                      Qty {item.quantity}
                    </p>
                  </div>
                  <p className="pt-1 font-mono text-[16px] text-[var(--sb-gold-soft)]">
                    {formatMoney(calculateCartLineSubtotal(item))}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-3">
              <ReceiptLine
                label="Subtotal"
                value={order.totals.subtotalCents}
              />
              {order.totals.discountCents > 0 ? (
                <ReceiptLine
                  label="Promo"
                  value={-order.totals.discountCents}
                />
              ) : null}
              <ReceiptLine
                label="Service Fee"
                value={order.totals.serviceFeeCents}
              />
              <ReceiptLine label="Tax" value={order.totals.taxCents} />
              {order.totals.tipCents > 0 ? (
                <ReceiptLine label="Tip" value={order.totals.tipCents} />
              ) : null}
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[22px] text-white">Total</span>
                <span className="font-mono text-[24px] text-[var(--sb-gold-soft)]">
                  {formatMoney(order.totals.totalCents)}
                </span>
              </div>
            </div>
          </div>
        </MobileOrderPanel>

        <MobileOrderPanel className="mt-4 overflow-hidden">
          <DetailRow
            icon={icons.location}
            label={order.mode === "delivery" ? "Delivery Address" : "Pickup"}
            value={address}
          />
          <DetailRow
            icon={icons.cart}
            label="Payment Method"
            supporting={formatMoney(order.totals.totalCents)}
            value={`${order.paymentMethod.brand} •••• ${order.paymentMethod.last4}`}
          />
          <DetailRow
            icon={icons.menu}
            label="Order Status"
            value={getMobileOrderHeadline(order)}
          />
        </MobileOrderPanel>

        <div className="mt-4 grid gap-3 rounded-[18px] border border-[var(--sb-border)] bg-black/26 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_42px_rgba(0,0,0,0.36)]">
          {canTrack ? (
            <button
              className="red-glow-button flex min-h-[62px] w-full items-center justify-center gap-3 rounded-[14px] text-[15px] uppercase tracking-[0.07em] min-[390px]:min-h-[72px] min-[390px]:gap-4 min-[390px]:rounded-[15px] min-[390px]:text-[17px] min-[390px]:tracking-[0.08em]"
              onClick={() => onTrackOrder(order)}
              type="button"
            >
              <AssetIcon size={28} src={icons.location} />
              Track Order
              <ChevronIcon direction="right" size={18} />
            </button>
          ) : (
            <button
              className="red-glow-button flex min-h-[62px] w-full items-center justify-center gap-3 rounded-[14px] text-[15px] uppercase tracking-[0.07em] min-[390px]:min-h-[72px] min-[390px]:gap-4 min-[390px]:rounded-[15px] min-[390px]:text-[17px] min-[390px]:tracking-[0.08em]"
              onClick={() => onReorder(order)}
              type="button"
            >
              <AssetIcon size={28} src={icons.cart} />
              Reorder
              <ChevronIcon direction="right" size={18} />
            </button>
          )}
          <Link
            className="flex min-h-[62px] items-center justify-center gap-4 rounded-[15px] border border-[var(--sb-gold)]/28 bg-white/[0.035] text-[13px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
            href="/support"
          >
            <AssetIcon size={24} src={icons.bell} />
            Concierge help
          </Link>
        </div>
      </div>

      <BottomNavigation
        activeId="orders"
        ariaLabel="Mobile orders navigation"
      />
    </>
  );
}

function ReceiptLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-[15px]">
      <span className="text-white/58">{label}</span>
      <span className="font-mono text-white/76">{formatMoney(value)}</span>
    </div>
  );
}

function DetailRow({
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
    <div className="grid min-h-[94px] grid-cols-[58px_1fr_auto] items-center gap-4 border-b border-white/10 px-4 py-4 last:border-b-0">
      <MobileIconCircle className="h-[54px] w-[54px]" icon={icon} size={28} />
      <p className="min-w-0">
        <span className="editorial-title block text-[15px] uppercase text-[var(--sb-gold-soft)]">
          {label}
        </span>
        <span className="mt-2 block truncate text-[17px] text-white">
          {value}
        </span>
      </p>
      {supporting ? (
        <span className="font-mono text-[13px] text-[var(--sb-gold-soft)]">
          {supporting}
        </span>
      ) : (
        <span className="text-[28px] text-[var(--sb-gold-soft)]" aria-hidden>
          <ChevronIcon direction="right" size={18} />
        </span>
      )}
    </div>
  );
}
