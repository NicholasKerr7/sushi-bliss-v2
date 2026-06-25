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
        eyebrow={order.mode}
        title={order.mode === "delivery" ? "Delivery to" : "Pickup at"}
      >
        {destinationLines.map((line) => (
          <span className="block" key={line}>
            {line}
          </span>
        ))}
      </StackedDetailCard>
      <StackedDetailCard
        eyebrow="Secure token"
        icon={icons.cart}
        title="Payment method"
      >
        {order.paymentMethod.brand.toUpperCase()} ••••{" "}
        {order.paymentMethod.last4}
      </StackedDetailCard>
      <StackedDetailCard
        actionHref="/loyalty"
        actionLabel="View membership benefits"
        eyebrow="Bliss member"
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
  eyebrow,
  icon,
  title,
  onAction,
}: {
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
  eyebrow?: string;
  icon?: string;
  title: string;
  onAction?: () => void;
}) {
  return (
    <section className="relative min-h-0 overflow-hidden rounded-[14px] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <span
        aria-hidden="true"
        className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-[var(--sb-gold)]/7 blur-2xl"
      />
      <div className="relative z-10 flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/28 bg-black/34">
          <AssetIcon size={27} src={icon} />
        </span>
        <div className="min-w-0">
          {eyebrow ? (
            <span className="inline-flex rounded-full border border-white/10 bg-black/28 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-white/42">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="mt-2 font-serif text-[15px] uppercase tracking-[0.09em] text-[var(--sb-gold-soft)]">
            {title}
          </h2>
          <p className="mt-2 line-clamp-3 text-[13px] leading-5 text-white/66">
            {children}
          </p>
          {actionHref && actionLabel ? (
            <Link
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--sb-gold)]/22 bg-black/18 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/44 hover:bg-[var(--sb-gold)]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
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
