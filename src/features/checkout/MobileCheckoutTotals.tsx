import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { OrderTotals } from "@/types/order";

export function MobileTotalsCard({
  className,
  itemCount,
  totals,
}: {
  className?: string;
  itemCount?: number;
  totals: OrderTotals;
}) {
  return (
    <section
      className={classNames(
        "rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] p-4",
        className,
      )}
    >
      <div className="space-y-3 text-[15px]">
        <SummaryLine
          label={itemCount ? `Subtotal (${itemCount} items)` : "Subtotal"}
          value={formatMoney(totals.subtotalCents)}
        />
        {totals.discountCents > 0 ? (
          <SummaryLine
            label="Promo code"
            value={`-${formatMoney(totals.discountCents)}`}
            valueClassName="text-[var(--sb-wasabi)]"
          />
        ) : null}
        <SummaryLine
          label="Service fee"
          value={formatMoney(totals.serviceFeeCents)}
        />
        <SummaryLine label="Tax" value={formatMoney(totals.taxCents)} />
        {totals.tipCents > 0 ? (
          <SummaryLine label="Tip" value={formatMoney(totals.tipCents)} />
        ) : null}
      </div>
      <div className="mt-4 border-t border-white/10 pt-4">
        <SummaryLine
          large
          label="Total"
          value={formatMoney(totals.totalCents)}
        />
      </div>
    </section>
  );
}

export function MemberBenefitsCard({
  className,
  totals,
}: {
  className?: string;
  totals: OrderTotals;
}) {
  const pointsEarned = Math.max(0, Math.floor(totals.subtotalCents / 100));

  return (
    <section
      className={classNames(
        "grid min-h-[92px] grid-cols-[58px_1fr_auto] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4",
        className,
      )}
    >
      <span className="grid h-[54px] w-[54px] place-items-center rounded-full border border-[var(--sb-red-bright)]/70">
        <AssetIcon size={34} src={icons.flower} />
      </span>
      <p>
        <span className="block text-[16px] uppercase tracking-[0.09em] text-[var(--sb-gold-soft)]">
          Bliss member benefits
        </span>
        <span className="mt-1 block text-[14px] leading-5 text-white/56">
          You&apos;ll earn {pointsEarned} pts with this order.
        </span>
      </p>
      <span className="rounded-[8px] border border-[var(--sb-gold)]/60 px-3 py-1 text-[12px] uppercase text-[var(--sb-gold-soft)]">
        Gold
      </span>
    </section>
  );
}

function SummaryLine({
  label,
  large,
  value,
  valueClassName,
}: {
  label: string;
  large?: boolean;
  value: string;
  valueClassName?: string;
}) {
  return (
    <p className="flex items-center justify-between gap-4">
      <span className={large ? "editorial-title text-[26px]" : "text-white/66"}>
        {label}
      </span>
      <span
        className={classNames(
          large
            ? "font-mono text-[28px] text-[var(--sb-gold-soft)]"
            : "font-mono text-white/86",
          valueClassName,
        )}
      >
        {value}
      </span>
    </p>
  );
}
