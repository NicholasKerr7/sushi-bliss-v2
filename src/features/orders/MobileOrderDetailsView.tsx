"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { icons } from "@/features/home/homeDashboardData";
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

        <div className="mt-6 grid grid-cols-[44px_minmax(0,1fr)_44px] items-center min-[390px]:mt-7 min-[390px]:grid-cols-[52px_1fr_52px]">
          <MobileBackButton label="Back to orders" onClick={onBack} />
          <h1 className="editorial-title text-center text-[20px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:text-[25px] min-[390px]:tracking-[0.08em]">
            Order Details
          </h1>
          <span aria-hidden="true" />
        </div>

        <section className="mt-7 grid grid-cols-[minmax(0,1fr)_auto] gap-3 min-[390px]:mt-8 min-[390px]:gap-4">
          <div className="min-w-0">
            <p className="editorial-title text-[15px] uppercase text-[var(--sb-gold-soft)] min-[390px]:text-[18px]">
              Order #
            </p>
            <h2 className="mt-2 break-words text-[25px] leading-[0.98] text-white min-[390px]:mt-3 min-[390px]:text-[31px]">
              {order.confirmationCode}
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-white/58 min-[390px]:mt-3 min-[390px]:text-[15px] min-[390px]:leading-6">
              {formatFullDateTime(order.createdAt)}
            </p>
          </div>
          <div className="pt-2 text-right min-[390px]:pt-3">
            <span className="inline-flex min-h-9 items-center rounded-full border border-[var(--sb-border)] bg-[var(--sb-gold)]/10 px-2.5 text-[9px] uppercase tracking-[0.05em] text-[var(--sb-gold-soft)] min-[390px]:min-h-[42px] min-[390px]:px-4 min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]">
              {getOrderStatusLabel(order.status)}
            </span>
            <p className="mt-3 text-[11px] text-white/50 min-[390px]:mt-4 min-[390px]:text-[14px]">
              {order.mode === "delivery" ? "Estimated delivery" : "Pickup"}
            </p>
            <p className="mt-1.5 text-[15px] text-white/72 min-[390px]:mt-2 min-[390px]:text-[18px]">
              {formatTime(order.fulfillmentAt)}
            </p>
          </div>
        </section>

        <MobileOrderPanel className="mt-6 overflow-hidden">
          <div className="p-3 min-[390px]:p-4">
            <h3 className="editorial-title text-[17px] uppercase text-[var(--sb-gold-soft)] min-[390px]:text-[19px]">
              Ordered Items
            </h3>
            <div className="mt-3 divide-y divide-white/10">
              {order.items.map((item, index) => (
                <div
                  className="grid grid-cols-[68px_minmax(0,1fr)] gap-2.5 py-3 first:pt-0 min-[390px]:grid-cols-[104px_1fr_auto] min-[390px]:gap-4 min-[390px]:py-4"
                  key={item.id}
                >
                  <div className="relative h-[64px] overflow-hidden rounded-[11px] border border-white/10 bg-black/34 min-[390px]:h-[82px]">
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
                    <h4 className="line-clamp-2 text-[14px] leading-5 text-white min-[390px]:text-[18px] min-[390px]:leading-6">
                      {item.menuItem.name}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-[16px] text-white/54 min-[390px]:text-[13px] min-[390px]:leading-5">
                      {item.menuItem.description}
                    </p>
                    <p className="mt-1.5 text-[12px] text-[var(--sb-gold-soft)] min-[390px]:mt-2 min-[390px]:text-[14px]">
                      Qty {item.quantity}
                    </p>
                  </div>
                  <p className="col-start-2 font-mono text-[12px] text-[var(--sb-gold-soft)] min-[390px]:col-start-auto min-[390px]:pt-1 min-[390px]:text-[16px]">
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
              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-white/10 pt-4">
                <span className="text-[18px] text-white min-[390px]:text-[22px]">
                  Total
                </span>
                <span className="shrink-0 font-mono text-[20px] text-[var(--sb-gold-soft)] min-[390px]:text-[24px]">
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
              className="red-glow-button flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-[14px] text-[12px] uppercase tracking-[0.06em] min-[390px]:min-h-[72px] min-[390px]:gap-4 min-[390px]:rounded-[15px] min-[390px]:text-[17px] min-[390px]:tracking-[0.08em]"
              onClick={() => onTrackOrder(order)}
              type="button"
            >
              <AssetIcon size={28} src={icons.location} />
              Track Order
              <ChevronIcon direction="right" size={18} />
            </button>
          ) : (
            <button
              className="red-glow-button flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-[14px] text-[12px] uppercase tracking-[0.06em] min-[390px]:min-h-[72px] min-[390px]:gap-4 min-[390px]:rounded-[15px] min-[390px]:text-[17px] min-[390px]:tracking-[0.08em]"
              onClick={() => onReorder(order)}
              type="button"
            >
              <AssetIcon size={28} src={icons.cart} />
              Reorder
              <ChevronIcon direction="right" size={18} />
            </button>
          )}
          <Link
            className="flex min-h-[54px] items-center justify-center gap-2.5 rounded-[14px] border border-[var(--sb-gold)]/28 bg-white/[0.035] text-[11px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:min-h-[62px] min-[390px]:gap-4 min-[390px]:rounded-[15px] min-[390px]:text-[13px] min-[390px]:tracking-[0.1em]"
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
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-1.5 text-[13px] min-[390px]:text-[15px]">
      <span className="min-w-0 text-white/58">{label}</span>
      <span className="shrink-0 font-mono text-white/76">
        {formatMoney(value)}
      </span>
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
    <div className="grid min-h-[82px] grid-cols-[44px_minmax(0,1fr)] items-center gap-2.5 border-b border-white/10 px-3 py-3 last:border-b-0 min-[390px]:min-h-[94px] min-[390px]:grid-cols-[58px_1fr_auto] min-[390px]:gap-4 min-[390px]:px-4 min-[390px]:py-4">
      <MobileIconCircle
        className="h-11 w-11 min-[390px]:h-[54px] min-[390px]:w-[54px]"
        icon={icon}
        size={24}
      />
      <p className="min-w-0">
        <span className="editorial-title block text-[13px] uppercase text-[var(--sb-gold-soft)] min-[390px]:text-[15px]">
          {label}
        </span>
        <span className="mt-1.5 block break-words text-[13px] leading-5 text-white min-[390px]:mt-2 min-[390px]:text-[17px]">
          {value}
        </span>
      </p>
      {supporting ? (
        <span className="col-start-2 font-mono text-[12px] text-[var(--sb-gold-soft)] min-[390px]:col-start-auto min-[390px]:text-[13px]">
          {supporting}
        </span>
      ) : (
        <span
          className="hidden text-[28px] text-[var(--sb-gold-soft)] min-[390px]:block"
          aria-hidden
        >
          <ChevronIcon direction="right" size={18} />
        </span>
      )}
    </div>
  );
}
