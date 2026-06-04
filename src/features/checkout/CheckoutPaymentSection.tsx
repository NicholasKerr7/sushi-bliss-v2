"use client";

import { classNames } from "@/lib/classNames";
import { isPaymentMethodUsable } from "@/lib/checkout";
import type { PaymentMethod } from "@/types/user";

interface CheckoutPaymentSectionProps {
  onSelectPaymentMethod: (paymentMethodId: string) => void;
  paymentMethods: PaymentMethod[];
  selectedPaymentMethodId: string | null;
  validationMessage?: string;
}

export function CheckoutPaymentSection({
  onSelectPaymentMethod,
  paymentMethods,
  selectedPaymentMethodId,
  validationMessage,
}: CheckoutPaymentSectionProps) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-sb-rice">Payment</h3>
      <div className="mt-3 grid gap-3">
        {paymentMethods.map((paymentMethod) => {
          const selected = paymentMethod.id === selectedPaymentMethodId;
          const usable = isPaymentMethodUsable(paymentMethod);

          return (
            <button
              aria-pressed={selected}
              className={classNames(
                "rounded-card border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-50",
                selected
                  ? "border-sb-gold bg-sb-gold/10"
                  : "border-sb-line bg-sb-panel/60 hover:bg-sb-rice/5",
              )}
              disabled={!usable}
              key={paymentMethod.id}
              onClick={() => onSelectPaymentMethod(paymentMethod.id)}
              type="button"
            >
              <span className="text-sm font-semibold text-sb-rice">
                {paymentMethod.brand} ending {paymentMethod.last4}
              </span>
              <span className="mt-1 block text-xs leading-5 text-sb-muted">
                Expires {paymentMethod.expiresAt}
                {!usable ? " · expired" : ""}
              </span>
            </button>
          );
        })}
      </div>
      {validationMessage ? (
        <p className="mt-3 text-xs leading-5 text-sb-red">
          {validationMessage}
        </p>
      ) : null}
    </section>
  );
}
