"use client";

import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCart } from "@/hooks/useCart";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { CartLineItemRow } from "./CartLineItemRow";
import { CartSummary } from "./CartSummary";

interface CartDrawerProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function CartDrawer({ onOpenChange, open }: CartDrawerProps) {
  const mode = useResponsiveMode();
  const {
    clearCart,
    isEmpty,
    itemCount,
    items,
    removeItem,
    totals,
    updateQuantity,
  } = useCart();

  return (
    <Drawer
      className="md:max-w-xl"
      description={
        isEmpty
          ? "Your cart is ready for chef selections."
          : `${itemCount} selected item${itemCount === 1 ? "" : "s"}`
      }
      labelledById="cart-drawer-title"
      onOpenChange={onOpenChange}
      open={open}
      side={mode === "mobile" ? "bottom" : "right"}
      title="Cart"
      footer={
        isEmpty ? null : (
          <div className="space-y-4">
            <CartSummary totals={totals} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Button onClick={clearCart} variant="ghost">
                Clear cart
              </Button>
              <Button disabled>Checkout next</Button>
            </div>
            <p className="text-xs leading-5 text-sb-dim">
              Checkout will open after delivery, pickup, and payment details are
              added.
            </p>
          </div>
        )
      }
    >
      {isEmpty ? (
        <EmptyState
          action={
            <Button onClick={() => onOpenChange(false)} variant="secondary">
              Browse menu
            </Button>
          }
          message="Open a menu item, choose your preferences, and add it here."
          title="Your cart is empty"
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <CartLineItemRow
              item={item}
              key={item.id}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>
      )}
    </Drawer>
  );
}
