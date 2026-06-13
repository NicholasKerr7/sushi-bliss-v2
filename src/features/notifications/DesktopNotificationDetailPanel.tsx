"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import type { AppNotification } from "@/types/notification";

const orderItems = [
  ["Otoro Nigiri", "2 pieces", "$24.00"],
  ["Dragon Roll", "1 roll", "$18.00"],
  ["Miso Soup", "1 bowl", "$6.00"],
] as const;

function getDetailTitle(notification: AppNotification) {
  if (notification.category === "order") {
    return "Order Delivered";
  }

  if (notification.category === "reservation") {
    return "Reservation Confirmed";
  }

  if (notification.category === "offer") {
    return "Offer Available";
  }

  return notification.title;
}

export function DesktopNotificationDetailPanel({
  notification,
  onBack,
}: {
  notification: AppNotification;
  onBack: () => void;
}) {
  const createdAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(notification.createdAt));

  return (
    <aside className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-7">
      <button
        className="mb-5 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]"
        onClick={onBack}
        type="button"
      >
        Back to preferences
      </button>
      <div className="grid h-16 w-16 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/42">
        <AssetIcon
          size={34}
          src={
            notification.category === "order"
              ? "/assets/icons/takeaway-bag-icon.png"
              : notification.category === "reservation"
                ? "/assets/icons/calendar-icon.png"
                : "/assets/icons/golden-ticket-icon.png"
          }
        />
      </div>
      <p className="mt-6 text-[13px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
        Notification detail
      </p>
      <h2 className="editorial-title mt-2 text-[38px] uppercase leading-none text-white">
        {getDetailTitle(notification)}
      </h2>
      <p className="mt-4 text-[15px] leading-6 text-white/62">
        {notification.body}
      </p>
      <div className="mt-5 rounded-[14px] border border-white/10 bg-black/24 p-4">
        <p className="flex justify-between py-2 text-[14px] text-white/58">
          <span>Reference</span>
          <span className="text-white">{notification.relatedLabel}</span>
        </p>
        <p className="flex justify-between border-t border-white/10 py-2 text-[14px] text-white/58">
          <span>Sent</span>
          <span className="text-white">{createdAt}</span>
        </p>
        <p className="flex justify-between border-t border-white/10 py-2 text-[14px] text-white/58">
          <span>Status</span>
          <span className="text-[var(--sb-gold-soft)]">Action available</span>
        </p>
      </div>

      {notification.category === "order" ? (
        <section className="mt-5 rounded-[14px] border border-white/10 bg-black/24 p-4">
          <h3 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Order details
          </h3>
          <div className="mt-3 divide-y divide-white/10">
            {orderItems.map(([name, quantity, price]) => (
              <p
                className="grid grid-cols-[1fr_82px_72px] py-3 text-[14px] text-white/62"
                key={name}
              >
                <span className="text-white">{name}</span>
                <span>{quantity}</span>
                <span className="text-right text-[var(--sb-gold-soft)]">
                  {price}
                </span>
              </p>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button
          className="h-[52px] rounded-[10px] text-[12px] uppercase tracking-[0.08em]"
          href={notification.href || "/notifications"}
        >
          View details
        </Button>
        <Link
          className="grid h-[52px] place-items-center rounded-[10px] border border-[var(--sb-gold)]/34 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          href="/support"
        >
          Need help
        </Link>
      </div>
    </aside>
  );
}
