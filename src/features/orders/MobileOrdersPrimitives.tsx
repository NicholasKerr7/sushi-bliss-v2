"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { formatTime } from "@/lib/dates";
import type { Order, OrderStatus } from "@/types/order";

interface MobileOrdersHeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
  unreadNotificationCount?: number;
}

const orderStatusWeight: Record<OrderStatus, number> = {
  cancelled: -1,
  completed: 4,
  confirmed: 1,
  draft: 0,
  "out-for-delivery": 3,
  preparing: 2,
  ready: 3,
};

/** Shared mobile orders header matching the reference logo and alert treatment. */
export function MobileOrdersHeader({
  cartCount = 0,
  onOpenCart,
  unreadNotificationCount = 0,
}: MobileOrdersHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <Link
        className="flex min-w-0 items-center gap-3 rounded-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        href="/home"
      >
        <AssetIcon
          alt="Sushi Bliss"
          className="rounded-full"
          loading="eager"
          size={54}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[18px] leading-[0.95] tracking-[0.34em] text-white">
          Sushi
          <br />
          Bliss
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {cartCount > 0 && onOpenCart ? (
          <button
            aria-label="Open cart"
            className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)]"
            onClick={onOpenCart}
            type="button"
          >
            <AssetIcon loading="eager" size={25} src={icons.cart} />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold text-white">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          </button>
        ) : null}
        <Link
          aria-label="Notifications"
          className="relative grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/46 shadow-[0_0_26px_rgba(202,164,93,0.12)]"
          href="/notifications"
        >
          <AssetIcon loading="eager" size={27} src={icons.bell} />
          {unreadNotificationCount > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red-bright)] px-1 text-[10px] font-bold text-white">
              {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}

export function MobileBackButton({
  label = "Back",
  onClick,
}: {
  label?: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="grid h-[52px] w-[52px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/46 text-[30px] leading-none text-[var(--sb-gold-soft)] shadow-[0_0_24px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
      onClick={onClick}
      type="button"
    >
      <ChevronIcon direction="left" size={24} />
    </button>
  );
}

export function MobileOrderPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={classNames(
        "rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.46)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function MobileIconCircle({
  className,
  icon,
  size = 30,
}: {
  className?: string;
  icon?: string;
  size?: number;
}) {
  return (
    <span
      className={classNames(
        "grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full border border-[var(--sb-border)] bg-black/34",
        className,
      )}
    >
      <AssetIcon size={size} src={icon} />
    </span>
  );
}

export function MobileOrderProgress({ order }: { order: Order }) {
  const steps = getMobileOrderProgress(order);
  const completedCount = steps.filter((step) => step.completed).length;
  const currentStepIndex = Math.max(completedCount - 1, 0);

  return (
    <div className="relative px-1 pt-1">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[30px] h-[9px] rounded-full border border-white/[0.055] bg-[linear-gradient(90deg,rgba(202,164,93,0.10),rgba(255,255,255,0.14),rgba(202,164,93,0.10))] shadow-[inset_0_0_12px_rgba(0,0,0,0.78)]"
      />
      {completedCount > 1 ? (
        <span
          aria-hidden="true"
          className={classNames(
            "pointer-events-none absolute left-[12.5%] top-[30px] h-[9px] overflow-hidden rounded-full bg-[linear-gradient(90deg,#7f1712_0%,#ef2f25_48%,#d8a84f_100%)] shadow-[0_0_18px_rgba(239,47,37,0.50),0_0_30px_rgba(216,168,79,0.20)]",
            getMobileOrderProgressRailWidth(completedCount),
          )}
        >
          <span className="absolute inset-y-[3px] left-2 right-2 rounded-full bg-[repeating-linear-gradient(90deg,transparent_0_10px,rgba(255,235,188,0.74)_10px_16px,transparent_16px_28px)] opacity-80" />
          <span className="absolute right-[-5px] top-1/2 h-[16px] w-[16px] -translate-y-1/2 rounded-full bg-[var(--sb-gold)] shadow-[0_0_16px_rgba(216,168,79,0.82),0_0_22px_rgba(239,47,37,0.52)]" />
        </span>
      ) : null}

      <ol className="relative z-10 grid grid-cols-4 items-start gap-2">
        {steps.map((step, index) => {
          const current = step.completed && index === currentStepIndex;

          return (
            <li
              aria-current={current ? "step" : undefined}
              className="relative text-center"
              key={step.id}
            >
              <span
                className={classNames(
                  "relative z-10 mx-auto grid h-[58px] w-[58px] place-items-center overflow-hidden rounded-full border bg-[#050607]/88 transition duration-300",
                  step.completed
                    ? "border-[var(--sb-red-bright)] text-[var(--sb-red-bright)] shadow-[0_0_26px_rgba(239,47,37,0.38),inset_0_0_18px_rgba(239,47,37,0.12)]"
                    : "border-white/18 text-white/52 shadow-[inset_0_0_16px_rgba(255,255,255,0.035)]",
                  current
                    ? "scale-[1.04] after:absolute after:inset-[6px] after:rounded-full after:border after:border-[var(--sb-gold)]/34 after:content-['']"
                    : "",
                )}
              >
                {step.completed ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(239,47,37,0.24),transparent_64%)]"
                  />
                ) : null}
                {step.icon ? (
                  <AssetIcon
                    className={classNames(
                      "relative z-10",
                      step.completed
                        ? "drop-shadow-[0_0_8px_rgba(239,47,37,0.74)]"
                        : "opacity-48 grayscale",
                    )}
                    size={24}
                    src={step.icon}
                  />
                ) : null}
                {current ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[5px] h-[3px] w-8 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_12px_rgba(239,47,37,0.92)]"
                  />
                ) : null}
              </span>
              <span
                className={classNames(
                  "mt-3 block text-[12px] leading-4",
                  current
                    ? "text-[var(--sb-gold-soft)]"
                    : step.completed
                      ? "text-white"
                      : "text-white/54",
                )}
              >
                {step.label}
              </span>
              <span className="mt-1 block text-[12px] text-white/48">
                {step.timestamp || "Pending"}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function getMobileOrderProgressRailWidth(completedCount: number) {
  if (completedCount >= 4) {
    return "w-3/4";
  }

  if (completedCount === 3) {
    return "w-1/2";
  }

  if (completedCount === 2) {
    return "w-1/4";
  }

  return "w-0";
}

/** Collapses backend order statuses into the four-step mobile visual timeline. */
export function getMobileOrderProgress(order: Order) {
  const weight = orderStatusWeight[order.status];
  const pickup = order.mode === "pickup";

  return [
    {
      completed: weight >= 1,
      icon: icons.star,
      id: "placed",
      label: "Order Placed",
      timestamp: weight >= 1 ? formatTime(order.createdAt) : undefined,
    },
    {
      completed: weight >= 2,
      icon: icons.chef,
      id: "preparing",
      label: "Preparing",
      timestamp:
        weight >= 2
          ? formatTime(
              new Date(new Date(order.createdAt).getTime() + 8 * 60000),
            )
          : undefined,
    },
    {
      completed: weight >= 3,
      icon: pickup ? icons.bag : icons.location,
      id: "handoff",
      label: pickup ? "Ready" : "On the Way",
      timestamp:
        weight >= 3
          ? formatTime(
              new Date(new Date(order.createdAt).getTime() + 16 * 60000),
            )
          : undefined,
    },
    {
      completed: weight >= 4,
      icon: icons.bag,
      id: "delivered",
      label: pickup ? "Picked Up" : "Delivered",
      timestamp: weight >= 4 ? formatTime(order.fulfillmentAt) : undefined,
    },
  ];
}

export function getMobileOrderHeadline(order: Order) {
  if (order.status === "completed") {
    return order.mode === "pickup" ? "Picked Up" : "Delivered";
  }

  if (order.status === "out-for-delivery") {
    return "On the Way";
  }

  if (order.status === "ready") {
    return order.mode === "pickup" ? "Ready for Pickup" : "Awaiting Courier";
  }

  if (order.status === "preparing") {
    return "In Preparation";
  }

  return "Order Confirmed";
}

export function getMobileEtaCopy(order: Order) {
  if (order.status === "completed") {
    return "Completed";
  }

  if (order.courier) {
    return `About ${order.courier.etaMinutes} min away`;
  }

  return order.mode === "delivery" ? "About 25 min away" : "Pickup window";
}
