import Image from "next/image";

import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Order } from "@/types/order";

interface OrderTrackingPanelProps {
  order: Order;
}

export function OrderTrackingPanel({ order }: OrderTrackingPanelProps) {
  if (order.mode !== "delivery") {
    return (
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-sb-rice">Pickup status</h3>
        <p className="mt-2 text-sm leading-6 text-sb-muted">
          Your order will be held at the counter under {order.customer.name}.
        </p>
      </Card>
    );
  }

  return (
    <section className="space-y-3">
      <div className="relative aspect-[5/3] overflow-hidden rounded-card border border-sb-line bg-sb-panel-soft">
        <Image
          alt="Live delivery route map"
          className="object-cover"
          fill
          sizes="(min-width: 768px) 36rem, 100vw"
          src="/assets/maps/tokyo-delivery-route-tracker.webp"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge tone="warning">Live tracking</StatusBadge>
        </div>
      </div>

      {order.courier ? (
        <Card className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-sb-rice">
                {order.courier.name}
              </h3>
              <p className="mt-1 text-xs leading-5 text-sb-muted">
                {order.courier.vehicle} - {order.courier.phone}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg font-semibold text-sb-gold-soft">
                {order.courier.etaMinutes}m
              </p>
              <p className="text-xs text-sb-dim">ETA</p>
            </div>
          </div>
        </Card>
      ) : null}
    </section>
  );
}
