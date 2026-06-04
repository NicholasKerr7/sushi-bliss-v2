"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { CheckoutPromo } from "@/types/checkout";

interface CheckoutPromoSectionProps {
  appliedPromo: CheckoutPromo | null;
  onApplyPromoCode: () => void;
  onClearPromoCode: () => void;
  onPromoCodeChange: (value: string) => void;
  promoCode: string;
  validationMessage?: string;
}

export function CheckoutPromoSection({
  appliedPromo,
  onApplyPromoCode,
  onClearPromoCode,
  onPromoCodeChange,
  promoCode,
  validationMessage,
}: CheckoutPromoSectionProps) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-sb-rice">Offer code</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <Input
          error={validationMessage}
          hint="Try BLISS10 or OMAKASE15."
          id="checkout-promo"
          label="Promo code"
          onChange={(event) => onPromoCodeChange(event.target.value)}
          placeholder="BLISS10"
          value={promoCode}
        />
        <Button onClick={onApplyPromoCode} variant="secondary">
          Apply
        </Button>
      </div>
      {appliedPromo ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-card border border-sb-wasabi/30 bg-sb-wasabi/10 p-3">
          <p className="text-xs leading-5 text-sb-wasabi">
            {appliedPromo.code}: {appliedPromo.description}
          </p>
          <Button onClick={onClearPromoCode} size="sm" variant="ghost">
            Remove
          </Button>
        </div>
      ) : null}
    </section>
  );
}
