"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { menuItemById } from "@/data/menu";
import { CheckoutDrawer } from "@/features/checkout/CheckoutDrawer";
import { useCart } from "@/hooks/useCart";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { getDefaultCustomizationsForItem } from "@/lib/cart";

import { CartLineItemRow } from "./CartLineItemRow";
import { CartSummary } from "./CartSummary";
import { MobileCartDialog } from "./MobileCartDialog";
import { TabletCartDialog } from "./TabletCartDialog";

interface CartDrawerProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function CartDrawer({ onOpenChange, open }: CartDrawerProps) {
  const mode = useResponsiveMode();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [tabletTipPercent, setTabletTipPercent] = useState(15);
  const [tabletCustomTipCents, setTabletCustomTipCents] = useState(0);
  const {
    addItem,
    clearCart,
    isEmpty,
    itemCount,
    items,
    removeItem,
    totals,
    updateQuantity,
  } = useCart();
  const suggestedMobileItem =
    menuItemById.get("uni-nigiri") || menuItemById.get("spicy-tuna-roll");

  const openCheckout = () => {
    onOpenChange(false);
    setCheckoutOpen(true);
  };

  const handleAddSuggestedItem = () => {
    if (!suggestedMobileItem) {
      return;
    }

    addItem({
      addOns: [],
      customizations: getDefaultCustomizationsForItem(suggestedMobileItem),
      menuItem: suggestedMobileItem,
      quantity: 1,
    });
  };

  const handleTabletTipPercentChange = (tipPercent: number) => {
    setTabletTipPercent(tipPercent);
    setTabletCustomTipCents(0);
  };

  const handleTabletCustomTipChange = (tipCents: number) => {
    setTabletCustomTipCents(tipCents);
    setTabletTipPercent(0);
  };

  if (mode === "mobile") {
    return (
      <>
        <MobileCartDialog
          itemCount={itemCount}
          items={items}
          open={open}
          suggestedItem={suggestedMobileItem}
          totals={totals}
          onAddSuggestedItem={handleAddSuggestedItem}
          onClearCart={clearCart}
          onClose={() => onOpenChange(false)}
          onOpenCheckout={openCheckout}
          onRemove={removeItem}
          onUpdateQuantity={updateQuantity}
        />
        <CheckoutDrawer
          initialTipPercent={15}
          onBackToCart={() => onOpenChange(true)}
          onOpenChange={setCheckoutOpen}
          open={checkoutOpen}
        />
      </>
    );
  }

  if (mode === "tablet") {
    return (
      <>
        <TabletCartDialog
          customTipCents={tabletCustomTipCents}
          itemCount={itemCount}
          items={items}
          open={open}
          tipPercent={tabletTipPercent}
          totals={totals}
          onClearCart={clearCart}
          onClose={() => onOpenChange(false)}
          onCustomTipChange={handleTabletCustomTipChange}
          onOpenCheckout={openCheckout}
          onRemove={removeItem}
          onTipPercentChange={handleTabletTipPercentChange}
          onUpdateQuantity={updateQuantity}
        />
        <CheckoutDrawer
          initialCustomTipCents={tabletCustomTipCents}
          initialTipPercent={tabletTipPercent}
          key={`tablet-checkout-${tabletTipPercent}-${tabletCustomTipCents}`}
          onBackToCart={() => onOpenChange(true)}
          onOpenChange={setCheckoutOpen}
          open={checkoutOpen}
        />
      </>
    );
  }

  return (
    <>
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
        side="right"
        title="Cart"
        footer={
          isEmpty ? null : (
            <div className="space-y-4">
              <CartSummary totals={totals} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Button onClick={clearCart} variant="ghost">
                  Clear cart
                </Button>
                <Button onClick={openCheckout}>Checkout</Button>
              </div>
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
      <CheckoutDrawer onOpenChange={setCheckoutOpen} open={checkoutOpen} />
    </>
  );
}
