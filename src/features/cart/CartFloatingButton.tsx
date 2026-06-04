"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { formatMoney } from "@/lib/money";

interface CartFloatingButtonProps {
  onOpenCart: () => void;
}

export function CartFloatingButton({ onOpenCart }: CartFloatingButtonProps) {
  const { itemCount, totals } = useCart();

  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-6">
      <Button
        aria-label={`Open cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}
        className="shadow-soft"
        onClick={onOpenCart}
        variant={itemCount > 0 ? "primary" : "secondary"}
      >
        Cart
        <span className="rounded-control bg-sb-ink/30 px-2 py-0.5 font-mono text-xs">
          {itemCount}
        </span>
        {itemCount > 0 ? (
          <span className="font-mono text-xs">
            {formatMoney(totals.totalCents)}
          </span>
        ) : null}
      </Button>
    </div>
  );
}
