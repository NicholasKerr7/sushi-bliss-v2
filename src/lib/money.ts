import {
  DEFAULT_CURRENCY,
  SALES_TAX_RATE,
  SERVICE_FEE_CENTS,
} from "@/lib/constants";
import type { OrderTotals } from "@/types/order";

export function dollarsToCents(amount: number): number {
  return Math.round(amount * 100);
}

export function formatMoney(
  cents: number,
  currency = DEFAULT_CURRENCY,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function calculateOrderTotals(
  subtotalCents: number,
  discountCents = 0,
): OrderTotals {
  const taxableCents = Math.max(subtotalCents - discountCents, 0);
  const taxCents = Math.round(taxableCents * SALES_TAX_RATE);
  const serviceFeeCents = subtotalCents > 0 ? SERVICE_FEE_CENTS : 0;

  return {
    subtotalCents,
    taxCents,
    serviceFeeCents,
    discountCents,
    totalCents: taxableCents + taxCents + serviceFeeCents,
  };
}
