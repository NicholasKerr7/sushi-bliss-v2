"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { brand, icons } from "@/features/home/visualHomeData";
import {
  TabletMenuBottomNav,
  TabletMenuStatusBar,
} from "@/features/menu/TabletMenuChrome";
import { formatDateTime } from "@/lib/dates";
import { getOrderItemCount } from "@/lib/orders";
import type { Order } from "@/types/order";

import { TabletOrderReceipt } from "./TabletOrderReceipt";
import { TabletOrderTimelinePreview } from "./TabletOrderTimelinePreview";

interface TabletOrderConfirmationProps {
  onClose: () => void;
  order: Order | null;
  pointsAwarded: number;
}

/** Tablet order confirmation view that preserves the tablet ordering chrome. */
export function TabletOrderConfirmation({
  onClose,
  order,
  pointsAwarded,
}: TabletOrderConfirmationProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!order) {
      return;
    }

    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [onClose, order]);

  if (!order) {
    return null;
  }

  return (
    <div
      aria-labelledby="tablet-order-confirmation-title"
      aria-modal="true"
      className="fixed inset-0 z-50 hidden overflow-y-auto bg-[#050607] px-[26px] pb-4 pt-3 text-white md:block xl:hidden"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <TabletMenuStatusBar />
      <TabletOrderConfirmationHeader onClose={onClose} />

      <main className="mx-auto max-w-[1034px]">
        <section className="mt-5 rounded-[26px] border border-white/10 bg-[#090b0b] p-8 shadow-[0_26px_90px_rgb(0_0_0_/_0.5)]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
            <div>
              <p className="text-[15px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
                Order confirmed
              </p>
              <h1
                className="editorial-title mt-3 text-[42px] uppercase leading-none tracking-[0.08em] lg:text-[46px]"
                id="tablet-order-confirmation-title"
              >
                Thank You
              </h1>
              <p className="mt-3 max-w-xl text-[17px] leading-7 text-[var(--sb-gold-soft)]">
                Your {order.mode === "delivery" ? "delivery" : "pickup"} order
                is confirmed for {formatDateTime(order.fulfillmentAt)}.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <ConfirmationMetric
                  label="Confirmation"
                  value={order.confirmationCode}
                />
                <ConfirmationMetric
                  label="Items"
                  value={`${getOrderItemCount(order)} confirmed`}
                />
                <ConfirmationMetric
                  label="Fulfillment"
                  value={order.mode === "delivery" ? "Delivery" : "Pickup"}
                />
                <ConfirmationMetric
                  label="Payment"
                  value={`${order.paymentMethod.brand} ${order.paymentMethod.last4}`}
                />
              </div>

              <section className="mt-5 rounded-[18px] border border-white/10 bg-black/22 p-5">
                <h2 className="text-[18px] font-semibold uppercase tracking-[0.08em] text-white">
                  {order.mode === "delivery" ? "Delivery address" : "Pickup"}
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/62">
                  {order.mode === "delivery" && order.deliveryAddress
                    ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.region} ${order.deliveryAddress.postalCode}`
                    : "Sushi Bliss, 88 Kintsugi Lane, New York, NY 10013"}
                </p>
              </section>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button
                  className="red-glow-button h-[58px] rounded-[14px] text-[16px] uppercase tracking-[0.08em]"
                  href="/orders"
                  onClick={onClose}
                >
                  Track order
                </Button>
                <Button
                  className="h-[58px] rounded-[14px] text-[16px] uppercase tracking-[0.08em]"
                  href="/menu"
                  onClick={onClose}
                  variant="secondary"
                >
                  Continue browsing
                </Button>
              </div>

              <div className="mt-6">
                <TabletOrderTimelinePreview order={order} />
              </div>
            </div>

            <TabletOrderReceipt order={order} pointsAwarded={pointsAwarded} />
          </div>
        </section>
      </main>

      <TabletMenuBottomNav activeIndex={3} />
    </div>
  );
}

function TabletOrderConfirmationHeader({ onClose }: { onClose: () => void }) {
  return (
    <header className="mt-1 grid h-[82px] grid-cols-[260px_1fr_268px] items-center gap-5">
      <Link className="flex items-center gap-8" href="/home" onClick={onClose}>
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          size={66}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[27px] uppercase leading-[0.98] tracking-[0.35em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>
      <p className="mx-auto text-[16px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
        Confirmed
      </p>
      <div className="flex items-center justify-end gap-6">
        <Link
          className="relative grid h-11 w-11 place-items-center"
          href="/notifications"
          onClick={onClose}
        >
          <AssetIcon size={32} src={icons.bell} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
            2
          </span>
        </Link>
        <Link
          aria-label="View orders"
          className="relative grid h-11 w-11 place-items-center"
          href="/orders"
          onClick={onClose}
        >
          <AssetIcon size={32} src={icons.bag} />
        </Link>
        <Link
          className="flex items-center gap-5"
          href="/profile"
          onClick={onClose}
        >
          <Image
            alt=""
            className="h-[58px] w-[58px] rounded-full border border-[var(--sb-border)] object-cover"
            height={58}
            src="/assets/chefs/aiko-nakamura-pastry-chef-standing.webp"
            width={58}
          />
          <span className="text-[var(--sb-gold)]" aria-hidden="true">
            v
          </span>
        </Link>
      </div>
    </header>
  );
}

function ConfirmationMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] border border-[var(--sb-gold)]/20 bg-[var(--sb-gold)]/8 p-4">
      <p className="text-[12px] uppercase tracking-[0.12em] text-white/46">
        {label}
      </p>
      <p className="mt-2 font-mono text-[18px] text-[var(--sb-gold-soft)]">
        {value}
      </p>
    </div>
  );
}
