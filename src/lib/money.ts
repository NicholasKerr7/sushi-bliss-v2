import {
  DEFAULT_CURRENCY,
  SALES_TAX_RATE,
  SERVICE_FEE_CENTS,
} from "@/lib/constants";
import type { OrderTotals } from "@/types/order";

/** Converts dollar values from JSON/content into integer cents for calculations. */
export function dollarsToCents(amount: number): number {
  return Math.round(amount * 100);
}

/** Formats integer cents as localized currency display text. */
export function formatMoney(
  cents: number,
  currency = DEFAULT_CURRENCY,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

/** Calculates a percentage-based tip from the pre-discount subtotal. */
export function calculateTipCents(
  subtotalCents: number,
  tipPercent: number,
): number {
  if (subtotalCents <= 0 || tipPercent <= 0) {
    return 0;
  }

  return Math.round(subtotalCents * (tipPercent / 100));
}

/** Calculates the mock order total model used by cart and checkout previews. */
export function calculateOrderTotals(
  subtotalCents: number,
  discountCents = 0,
  tipCents = 0,
): OrderTotals {
  const taxableCents = Math.max(subtotalCents - discountCents, 0);
  const taxCents = Math.round(taxableCents * SALES_TAX_RATE);
  const serviceFeeCents = subtotalCents > 0 ? SERVICE_FEE_CENTS : 0;
  const normalizedTipCents = Math.max(Math.round(tipCents), 0);

  return {
    subtotalCents,
    taxCents,
    serviceFeeCents,
    discountCents,
    tipCents: normalizedTipCents,
    totalCents: taxableCents + taxCents + serviceFeeCents + normalizedTipCents,
  };
}
