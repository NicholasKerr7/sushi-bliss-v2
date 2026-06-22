import Link from "next/link";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import type { Order } from "@/types/order";

export function TabletOrderConfirmationDetails({
  destinationLines,
  order,
  onClose,
}: {
  destinationLines: string[];
  order: Order;
  onClose: () => void;
}) {
  return (
    <div className="grid min-h-0 grid-rows-[1fr_0.78fr_1fr] gap-3">
      <StackedDetailCard
        icon={icons.profile}
        title={order.mode === "delivery" ? "Delivery to" : "Pickup at"}
      >
        {destinationLines.map((line) => (
          <span className="block" key={line}>
            {line}
          </span>
        ))}
      </StackedDetailCard>
      <StackedDetailCard icon={icons.cart} title="Payment method">
        {order.paymentMethod.brand.toUpperCase()} ••••{" "}
        {order.paymentMethod.last4}
      </StackedDetailCard>
      <StackedDetailCard
        actionHref="/loyalty"
        actionLabel="View membership benefits"
        icon={icons.flower}
        title="Enjoy exclusive perks"
        onAction={onClose}
      >
        With your Bliss Membership.
      </StackedDetailCard>
    </div>
  );
}

function StackedDetailCard({
  actionHref,
  actionLabel,
  children,
  icon,
  title,
  onAction,
}: {
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
  icon?: string;
  title: string;
  onAction?: () => void;
}) {
  return (
    <section className="min-h-0 rounded-[14px] border border-white/12 bg-white/[0.035] p-4">
      <div className="flex items-start gap-4">
        <AssetIcon size={30} src={icon} />
        <div>
          <h2 className="font-serif text-[15px] uppercase tracking-[0.09em] text-[var(--sb-gold-soft)]">
            {title}
          </h2>
          <p className="mt-2 text-[13px] leading-5 text-white/62">{children}</p>
          {actionHref && actionLabel ? (
            <Link
              className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              href={actionHref}
              onClick={onAction}
            >
              {actionLabel}
              <ChevronIcon direction="right" size={18} />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
