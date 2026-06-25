import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/homeDashboardData";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import type { Order } from "@/types/order";

export function TabletOrderSummaryPanel({ order }: { order: Order }) {
  const visibleItems = order.items.slice(0, 3);
  const hiddenItemCount = Math.max(order.items.length - visibleItems.length, 0);

  return (
    <section className="min-h-0 rounded-[14px] border border-white/12 bg-white/[0.035] p-5">
      <h2 className="flex items-center gap-3 font-serif text-[17px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
        <AssetIcon size={25} src={icons.bag} />
        Order summary
      </h2>

      <div className="mt-4 grid gap-3">
        {visibleItems.map((item) => (
          <article
            className="grid grid-cols-[84px_1fr_92px_54px_78px] items-center gap-3"
            key={item.id}
          >
            <div className="relative h-[60px] overflow-hidden rounded-[8px] border border-white/8 bg-white/[0.035]">
              <Image
                alt={item.menuItem.image.alt || item.menuItem.name}
                className="object-cover"
                fill
                sizes="84px"
                src={item.menuItem.image.publicUrl}
              />
            </div>
            <div className="min-w-0">
              <h3 className="line-clamp-1 text-[15px] font-semibold text-white">
                {item.menuItem.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-[12px] leading-4 text-white/54">
                {item.menuItem.description}
              </p>
            </div>
            <span className="font-mono text-[14px] text-[var(--sb-gold-soft)]">
              {formatMoney(calculateCartLineSubtotal(item) / item.quantity)}
            </span>
            <span className="text-center font-mono text-[13px] text-white/64">
              x {item.quantity}
            </span>
            <span className="text-right font-mono text-[14px] text-white">
              {formatMoney(calculateCartLineSubtotal(item))}
            </span>
          </article>
        ))}
        {hiddenItemCount > 0 ? (
          <p className="text-[12px] uppercase tracking-[0.1em] text-white/44">
            +{hiddenItemCount} more item{hiddenItemCount === 1 ? "" : "s"}
          </p>
        ) : null}
      </div>

      <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3 text-[14px]">
        <ReceiptLine
          label="Subtotal"
          value={formatMoney(order.totals.subtotalCents)}
        />
        <ReceiptLine
          label="Delivery fee"
          value={formatMoney(order.totals.serviceFeeCents)}
        />
        <ReceiptLine label="Tax" value={formatMoney(order.totals.taxCents)} />
        <div className="mt-2 border-t border-white/10 pt-2">
          <ReceiptLine
            large
            label="Total"
            value={formatMoney(order.totals.totalCents)}
          />
        </div>
      </div>
    </section>
  );
}

function ReceiptLine({
  label,
  large,
  value,
}: {
  label: string;
  large?: boolean;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <span
        className={
          large
            ? "font-serif text-[20px] text-[var(--sb-gold-soft)]"
            : "text-white/66"
        }
      >
        {label}
      </span>
      <span
        className={
          large
            ? "font-mono text-[26px] text-[var(--sb-gold-soft)]"
            : "font-mono text-white/82"
        }
      >
        {value}
      </span>
    </div>
  );
}
