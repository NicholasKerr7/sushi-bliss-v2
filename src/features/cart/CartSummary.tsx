import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { OrderTotals } from "@/types/order";

interface CartSummaryProps {
  className?: string;
  totals: OrderTotals;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-sb-muted">{label}</span>
      <span className="font-mono text-sb-rice">{value}</span>
    </div>
  );
}

export function CartSummary({ className, totals }: CartSummaryProps) {
  return (
    <div className={classNames("space-y-3", className)}>
      <SummaryRow label="Subtotal" value={formatMoney(totals.subtotalCents)} />
      {totals.discountCents > 0 ? (
        <SummaryRow
          label="Discount"
          value={`-${formatMoney(totals.discountCents)}`}
        />
      ) : null}
      <SummaryRow label="Estimated tax" value={formatMoney(totals.taxCents)} />
      <SummaryRow
        label="Service fee"
        value={formatMoney(totals.serviceFeeCents)}
      />
      <div className="flex items-center justify-between gap-4 border-t border-sb-line pt-3">
        <span className="text-sm font-semibold text-sb-rice">Total</span>
        <span className="font-mono text-lg font-semibold text-sb-gold-soft">
          {formatMoney(totals.totalCents)}
        </span>
      </div>
    </div>
  );
}
