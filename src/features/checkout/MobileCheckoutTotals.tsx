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
        "rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] p-3 min-[390px]:p-4",
        className,
      )}
    >
      <div className="space-y-2.5 text-[13px] min-[390px]:space-y-3 min-[390px]:text-[15px]">
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
        "grid min-h-[88px] grid-cols-[42px_minmax(0,1fr)] items-center gap-x-3 gap-y-2 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-3 py-3 min-[390px]:min-h-[92px] min-[390px]:grid-cols-[58px_1fr_auto] min-[390px]:gap-4 min-[390px]:px-4 min-[390px]:py-0",
        className,
      )}
    >
      <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-red-bright)]/70 min-[390px]:h-[54px] min-[390px]:w-[54px]">
        <AssetIcon size={24} src={icons.flower} />
      </span>
      <p className="min-w-0">
        <span className="block text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:text-[16px] min-[390px]:tracking-[0.09em]">
          Bliss member benefits
        </span>
        <span className="mt-1 block text-[12px] leading-5 text-white/56 min-[390px]:text-[14px]">
          You&apos;ll earn {pointsEarned} pts with this order.
        </span>
      </p>
      <span className="col-start-2 w-max rounded-[8px] border border-[var(--sb-gold)]/60 px-2 py-1 text-[10px] uppercase text-[var(--sb-gold-soft)] min-[390px]:col-start-auto min-[390px]:px-3 min-[390px]:text-[12px]">
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
    <p className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2.5 min-[390px]:gap-3">
      <span
        className={classNames(
          "min-w-0 break-words",
          large
            ? "editorial-title text-[21px] min-[390px]:text-[26px]"
            : "text-white/66",
        )}
      >
        {label}
      </span>
      <span
        className={classNames(
          large
            ? "shrink-0 font-mono text-[21px] text-[var(--sb-gold-soft)] min-[390px]:text-[28px]"
            : "font-mono text-white/86",
          valueClassName,
        )}
      >
        {value}
      </span>
    </p>
  );
}
