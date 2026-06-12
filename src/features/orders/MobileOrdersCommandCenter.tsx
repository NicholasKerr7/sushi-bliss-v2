"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { formatTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import { getOrderItemCount } from "@/lib/orders";
import type { Order } from "@/types/order";

import {
  getMobileEtaCopy,
  MobileIconCircle,
  MobileOrderPanel,
} from "./MobileOrdersPrimitives";

type OrderView = "active" | "past";

interface MobileOrdersCommandCenterProps {
  activeOrders: Order[];
  featuredOrder?: Order;
  onTrackOrder: (order: Order) => void;
  onViewChange: (view: OrderView) => void;
  pastOrders: Order[];
  view: OrderView;
}

/** Summarizes order activity and exposes the fastest mobile order actions. */
export function MobileOrdersCommandCenter({
  activeOrders,
  featuredOrder,
  onTrackOrder,
  onViewChange,
  pastOrders,
  view,
}: MobileOrdersCommandCenterProps) {
  const referenceOrder = featuredOrder || pastOrders[0];
  const canTrack =
    featuredOrder?.mode === "delivery" &&
    featuredOrder.status !== "completed" &&
    featuredOrder.status !== "cancelled";
  const nextView = view === "active" ? "past" : "active";

  return (
    <MobileOrderPanel className="mt-6 overflow-hidden p-4">
      <div className="grid grid-cols-[58px_1fr] gap-4">
        <MobileIconCircle
          className={classNames(
            "h-[58px] w-[58px]",
            canTrack
              ? "border-[var(--sb-red-bright)]/62 shadow-[0_0_22px_rgba(239,47,37,0.3)]"
              : "border-[var(--sb-gold)]/42",
          )}
          icon={canTrack ? icons.location : icons.bag}
          size={29}
        />
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/48">
            Order Command
          </p>
          <h2 className="editorial-title mt-2 text-[24px] leading-[1.02] text-white">
            {featuredOrder ? "Kitchen handoff is active" : "No active handoff"}
          </h2>
          <p className="mt-2 text-[14px] leading-5 text-white/58">
            {featuredOrder
              ? `${featuredOrder.confirmationCode} • ${getMobileEtaCopy(
                  featuredOrder,
                )}`
              : "Start a new order or review your previous Sushi Bliss receipts."}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-[14px] border border-white/10 bg-black/30">
        <CommandMetric label="Active" value={String(activeOrders.length)} />
        <CommandMetric
          label={featuredOrder ? "ETA" : "Last Total"}
          value={
            featuredOrder
              ? formatTime(featuredOrder.fulfillmentAt)
              : referenceOrder
                ? formatMoney(referenceOrder.totals.totalCents)
                : "$0"
          }
        />
        <CommandMetric
          label="Items"
          value={
            referenceOrder ? String(getOrderItemCount(referenceOrder)) : "0"
          }
        />
      </div>

      <div className="mt-4 grid grid-cols-[1.15fr_0.85fr] gap-3">
        {canTrack && featuredOrder ? (
          <button
            className="red-glow-button flex min-h-[56px] items-center justify-center gap-3 rounded-[13px] text-[12px] uppercase tracking-[0.08em]"
            onClick={() => onTrackOrder(featuredOrder)}
            type="button"
          >
            <AssetIcon size={24} src={icons.location} />
            Track Active
          </button>
        ) : (
          <Link
            className="red-glow-button flex min-h-[56px] items-center justify-center gap-3 rounded-[13px] text-[12px] uppercase tracking-[0.08em]"
            href="/menu"
          >
            <AssetIcon size={24} src={icons.menu} />
            Start Order
          </Link>
        )}

        <button
          className="min-h-[56px] rounded-[13px] border border-[var(--sb-border)] bg-black/34 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
          onClick={() => onViewChange(nextView)}
          type="button"
        >
          {nextView === "past" ? "Receipts" : "Active"}
        </button>
      </div>
    </MobileOrderPanel>
  );
}

function CommandMetric({ label, value }: { label: string; value: string }) {
  return (
    <p className="min-w-0 px-2 py-3 text-center">
      <span className="block truncate font-mono text-[17px] text-[var(--sb-gold-soft)]">
        {value}
      </span>
      <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-white/44">
        {label}
      </span>
    </p>
  );
}
