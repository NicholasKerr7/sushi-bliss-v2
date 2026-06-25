"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/homeDashboardData";
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
    <MobileOrderPanel className="mt-4 overflow-hidden p-3.5 min-[390px]:mt-6 min-[390px]:p-4">
      <div className="grid grid-cols-[46px_1fr] gap-3 min-[390px]:grid-cols-[58px_1fr] min-[390px]:gap-4">
        <MobileIconCircle
          className={classNames(
            "h-[46px] w-[46px] min-[390px]:h-[58px] min-[390px]:w-[58px]",
            canTrack
              ? "border-[var(--sb-red-bright)]/62 shadow-[0_0_22px_rgba(239,47,37,0.3)]"
              : "border-[var(--sb-gold)]/42",
          )}
          icon={canTrack ? icons.location : icons.bag}
          size={23}
        />
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/48 min-[390px]:text-[11px] min-[390px]:tracking-[0.16em]">
            Order Command
          </p>
          <h2 className="editorial-title mt-1.5 text-[19px] leading-[1.02] text-white min-[390px]:mt-2 min-[390px]:text-[24px]">
            {featuredOrder ? "Kitchen handoff is active" : "No active handoff"}
          </h2>
          <p className="mt-1.5 text-[13px] leading-[18px] text-white/58 min-[390px]:mt-2 min-[390px]:text-[14px] min-[390px]:leading-5">
            {featuredOrder
              ? `${featuredOrder.confirmationCode} • ${getMobileEtaCopy(
                  featuredOrder,
                )}`
              : "Start a new order or review your previous Sushi Bliss receipts."}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 divide-x divide-white/10 rounded-[13px] border border-white/10 bg-black/30 min-[390px]:mt-4 min-[390px]:rounded-[14px]">
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

      <div className="mt-3 grid grid-cols-[1.15fr_0.85fr] gap-2.5 min-[390px]:mt-4 min-[390px]:gap-3">
        {canTrack && featuredOrder ? (
          <button
            className="red-glow-button flex min-h-[46px] items-center justify-center gap-2 rounded-[12px] text-[10px] uppercase tracking-[0.06em] min-[390px]:min-h-[56px] min-[390px]:gap-3 min-[390px]:rounded-[13px] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
            onClick={() => onTrackOrder(featuredOrder)}
            type="button"
          >
            <AssetIcon size={21} src={icons.location} />
            Track Active
          </button>
        ) : (
          <Link
            className="red-glow-button flex min-h-[46px] items-center justify-center gap-2 rounded-[12px] text-[10px] uppercase tracking-[0.06em] min-[390px]:min-h-[56px] min-[390px]:gap-3 min-[390px]:rounded-[13px] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
            href="/menu"
          >
            <AssetIcon size={21} src={icons.menu} />
            Start Order
          </Link>
        )}

        <button
          className="min-h-[46px] rounded-[12px] border border-[var(--sb-border)] bg-black/34 text-[11px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:min-h-[56px] min-[390px]:rounded-[13px] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
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
  const compactValue = value.length > 4;

  return (
    <p className="min-w-0 px-2 py-2.5 text-center min-[390px]:py-3">
      <span
        className={classNames(
          "block truncate font-mono text-[var(--sb-gold-soft)]",
          compactValue ? "text-[15px]" : "text-[17px]",
        )}
      >
        {value}
      </span>
      <span className="mt-1 block truncate text-[9px] uppercase tracking-[0.06em] text-white/44 min-[390px]:text-[10px] min-[390px]:tracking-[0.1em]">
        {label}
      </span>
    </p>
  );
}
