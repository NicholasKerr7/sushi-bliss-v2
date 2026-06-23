import Image from "next/image";

import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Order } from "@/types/order";

interface OrderTrackingPanelProps {
  order: Order;
}

export function OrderTrackingPanel({ order }: OrderTrackingPanelProps) {
  if (order.mode !== "delivery") {
    return (
      <section className="overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.022))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.38)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Pickup status
            </p>
            <h3 className="mt-2 text-lg leading-6 text-sb-rice">
              Counter hold ready
            </h3>
            <p className="mt-2 text-sm leading-6 text-sb-muted">
              Your order will be held at the counter under{" "}
              <span className="text-sb-rice">{order.customer.name}</span>.
            </p>
          </div>
          <StatusBadge tone="premium">Pickup</StatusBadge>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <div className="relative aspect-[5/3] overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-sb-panel-soft shadow-[0_20px_60px_rgba(0,0,0,0.42)]">
        <Image
          alt="Live delivery route map"
          className="object-cover"
          fill
          sizes="(min-width: 768px) 36rem, 100vw"
          src="/assets/maps/tokyo-delivery-route-tracker.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.5))]" />
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          <StatusBadge tone="warning">Live Tracking</StatusBadge>
          {order.courier ? (
            <span className="rounded-full border border-white/12 bg-black/62 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              {order.courier.etaMinutes} min away
            </span>
          ) : null}
        </div>
      </div>

      {order.courier ? (
        <section className="rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.022))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_48px_rgba(0,0,0,0.34)]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                Courier
              </p>
              <h3 className="mt-2 text-base font-semibold text-sb-rice">
                {order.courier.name}
              </h3>
              <p className="mt-1 text-xs leading-5 text-sb-muted">
                {order.courier.vehicle} - {order.courier.phone}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xl leading-none text-sb-gold-soft">
                {order.courier.etaMinutes}m
              </p>
              <p className="text-xs text-sb-dim">ETA</p>
            </div>
          </div>
        </section>
      ) : null}
    </section>
  );
}
