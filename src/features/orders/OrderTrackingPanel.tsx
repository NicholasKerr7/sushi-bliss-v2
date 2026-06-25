import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { icons } from "@/features/home/homeDashboardData";
import { formatDateTime } from "@/lib/dates";
import type { Order } from "@/types/order";

interface OrderTrackingPanelProps {
  order: Order;
}

export function OrderTrackingPanel({ order }: OrderTrackingPanelProps) {
  if (order.mode !== "delivery") {
    return (
      <section className="overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[#07090a] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.38)]">
        <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-4 p-4">
          <span className="grid h-[92px] w-[92px] place-items-center rounded-[18px] border border-[var(--sb-gold)]/26 bg-[radial-gradient(circle,rgba(215,168,79,0.16),rgba(0,0,0,0.38)_72%)]">
            <AssetIcon size={46} src={icons.bag} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                Pickup status
              </p>
              <StatusBadge tone="premium">Pickup</StatusBadge>
            </div>
            <h3 className="mt-2 text-lg leading-6 text-sb-rice">
              Counter hold ready
            </h3>
            <p className="mt-2 text-sm leading-6 text-sb-muted">
              Your order will be held at the counter under{" "}
              <span className="text-sb-rice">{order.customer.name}</span>.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 border-t border-white/10 bg-black/22">
          <PickupSignal
            label="Ready window"
            value={formatDateTime(order.fulfillmentAt)}
          />
          <PickupSignal label="Confirmation" value={order.confirmationCode} />
        </div>
      </section>
    );
  }

  const destination = order.deliveryAddress
    ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}`
    : "Delivery address";
  const etaLabel = order.courier ? `${order.courier.etaMinutes} min` : "Live";

  return (
    <section className="space-y-3">
      <div className="relative aspect-[5/3] min-h-[230px] overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-sb-panel-soft shadow-[0_20px_60px_rgba(0,0,0,0.42)]">
        <Image
          alt="Live delivery route map"
          className="object-cover"
          fill
          sizes="(min-width: 768px) 36rem, 100vw"
          src="/assets/maps/tokyo-delivery-route-tracker.webp"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_44%,rgba(238,43,36,0.2),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.58))]" />
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          <StatusBadge tone="warning">Live Tracking</StatusBadge>
          {order.courier ? (
            <span className="rounded-full border border-white/12 bg-black/62 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              {order.courier.etaMinutes} min away
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-3 left-3 right-3 grid grid-cols-[minmax(0,1fr)_72px] items-center gap-3 rounded-[16px] border border-white/10 bg-black/64 p-3 shadow-[0_18px_42px_rgba(0,0,0,0.46)] backdrop-blur-md">
          <p className="min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.12em] text-white/46">
              Destination
            </span>
            <span className="mt-1 block truncate text-sm text-white">
              {destination}
            </span>
          </p>
          <span className="grid min-h-[48px] place-items-center rounded-[14px] border border-[var(--sb-gold)]/34 bg-[var(--sb-gold)]/12 font-mono text-[13px] text-[var(--sb-gold-soft)]">
            {etaLabel}
          </span>
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

function PickupSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-r border-white/10 px-4 py-3 last:border-r-0">
      <p className="text-[10px] uppercase tracking-[0.12em] text-white/42">
        {label}
      </p>
      <p className="mt-1 truncate font-mono text-[12px] text-white/72">
        {value}
      </p>
    </div>
  );
}
