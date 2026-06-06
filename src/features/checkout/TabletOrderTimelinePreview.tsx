"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { icons } from "@/features/home/visualHomeData";
import {
  getOrderStatusLabel,
  getOrderStatusTone,
  getOrderTimeline,
} from "@/lib/orders";
import type { Order } from "@/types/order";

interface TabletOrderTimelinePreviewProps {
  order: Order;
}

const timelineIcons = [icons.star, icons.chef, icons.bag, icons.location];

export function TabletOrderTimelinePreview({
  order,
}: TabletOrderTimelinePreviewProps) {
  const steps = getOrderTimeline(order).slice(0, 4);

  return (
    <section className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-semibold uppercase tracking-[0.08em] text-white">
            Order progress
          </h2>
          <p className="mt-1 text-[14px] text-white/52">
            Updates continue in Orders.
          </p>
        </div>
        <StatusBadge tone={getOrderStatusTone(order.status)}>
          {getOrderStatusLabel(order.status)}
        </StatusBadge>
      </div>

      <div className="mt-5 grid gap-3">
        {steps.map((step, index) => (
          <div
            className="grid grid-cols-[34px_1fr] gap-3 rounded-[14px] border border-white/10 bg-black/22 p-3"
            key={step.id}
          >
            <span
              className={`grid h-[34px] w-[34px] place-items-center rounded-full border ${
                step.completed
                  ? "border-[var(--sb-gold)]/52 bg-[var(--sb-gold)]/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <AssetIcon size={18} src={timelineIcons[index]} />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-white">
                {step.label}
              </p>
              <p className="mt-1 text-[13px] leading-5 text-white/52">
                {step.description}
              </p>
              {step.timestamp ? (
                <p className="mt-1 font-mono text-[12px] text-white/38">
                  {step.timestamp}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
