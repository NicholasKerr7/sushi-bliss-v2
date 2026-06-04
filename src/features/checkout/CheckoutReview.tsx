import { Card } from "@/components/ui/Card";
import { CartSummary } from "@/features/cart/CartSummary";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { FulfillmentMode } from "@/types/common";
import type { CartLineItem, OrderTotals } from "@/types/order";

interface CheckoutReviewProps {
  fulfillmentAt: string;
  items: CartLineItem[];
  mode: FulfillmentMode;
  totals: OrderTotals;
}

export function CheckoutReview({
  fulfillmentAt,
  items,
  mode,
  totals,
}: CheckoutReviewProps) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-sb-rice">Review</h3>
      <Card className="mt-3 p-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div
              className="flex items-start justify-between gap-4 text-sm"
              key={item.id}
            >
              <div>
                <p className="font-semibold text-sb-rice">
                  {item.quantity} x {item.menuItem.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-sb-muted">
                  {item.customizations
                    .map(
                      (customization) =>
                        `${customization.groupLabel}: ${customization.optionLabel}`,
                    )
                    .join(" - ")}
                </p>
              </div>
              <span className="font-mono text-xs text-sb-gold-soft">
                {formatMoney(calculateCartLineSubtotal(item))}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-sb-line pt-4">
          <p className="mb-3 text-xs leading-5 text-sb-muted">
            {mode === "delivery" ? "Delivery" : "Pickup"} at{" "}
            {fulfillmentAt ? formatDateTime(fulfillmentAt) : "selected time"}
          </p>
          <CartSummary totals={totals} />
        </div>
      </Card>
    </section>
  );
}
