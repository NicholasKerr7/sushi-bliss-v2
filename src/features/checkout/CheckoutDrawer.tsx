"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { Select } from "@/components/ui/Select";
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { useLoyalty } from "@/hooks/useLoyalty";
import { useOrders } from "@/hooks/useOrders";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import type { Order } from "@/types/order";

import { CheckoutAddressSection } from "./CheckoutAddressSection";
import { CheckoutModeSelector } from "./CheckoutModeSelector";
import { CheckoutPaymentSection } from "./CheckoutPaymentSection";
import { CheckoutPromoSection } from "./CheckoutPromoSection";
import { CheckoutReview } from "./CheckoutReview";
import { OrderConfirmation } from "./OrderConfirmation";
import { TabletCheckoutDialog } from "./TabletCheckoutDialog";

interface CheckoutDrawerProps {
  onBackToCart?: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function CheckoutDrawer({
  onBackToCart,
  onOpenChange,
  open,
}: CheckoutDrawerProps) {
  const mode = useResponsiveMode();
  const {
    clearCart,
    isEmpty,
    itemCount,
    items,
    removeItem,
    subtotalCents,
    updateQuantity,
  } = useCart();
  const { awardOrderPoints } = useLoyalty();
  const { addOrder } = useOrders();
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [confirmedPoints, setConfirmedPoints] = useState(0);
  const checkout = useCheckout(subtotalCents);

  const handlePlaceOrder = () => {
    const order = checkout.createCheckoutOrder(items);

    if (!order) {
      return;
    }

    addOrder(order);
    setConfirmedPoints(awardOrderPoints(order));
    clearCart();
    onOpenChange(false);
    setConfirmedOrder(order);
  };

  if (mode === "tablet") {
    return (
      <>
        <TabletCheckoutDialog
          checkout={checkout}
          itemCount={itemCount}
          items={items}
          key={open ? "tablet-checkout-open" : "tablet-checkout-closed"}
          onBackToCart={() => {
            onOpenChange(false);
            onBackToCart?.();
          }}
          onOpenChange={onOpenChange}
          onPlaceOrder={handlePlaceOrder}
          onRemoveItem={removeItem}
          onUpdateQuantity={updateQuantity}
          open={open}
        />
        <OrderConfirmation
          onClose={() => {
            setConfirmedOrder(null);
            setConfirmedPoints(0);
          }}
          order={confirmedOrder}
          pointsAwarded={confirmedPoints}
        />
      </>
    );
  }

  return (
    <>
      <Drawer
        className="md:max-w-2xl"
        description="Choose fulfillment, payment, offers, and review your receipt."
        labelledById="checkout-drawer-title"
        onOpenChange={onOpenChange}
        open={open}
        side={mode === "mobile" ? "bottom" : "right"}
        title="Checkout"
        footer={
          isEmpty ? null : (
            <Button className="w-full" onClick={handlePlaceOrder}>
              Place order
            </Button>
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
            message="Add customized menu items before opening checkout."
            title="No items to checkout"
          />
        ) : (
          <div className="space-y-7">
            <CheckoutModeSelector
              mode={checkout.mode}
              onModeChange={checkout.setMode}
            />

            <CheckoutAddressSection
              addressDraft={checkout.addressDraft}
              addressFormOpen={checkout.addressFormOpen}
              addresses={checkout.addresses}
              editingAddressId={checkout.editingAddressId}
              mode={checkout.mode}
              onCancelAddressForm={checkout.cancelAddressForm}
              onSaveAddressDraft={checkout.saveAddressDraft}
              onSelectAddress={checkout.setSelectedAddressId}
              onStartEditSelectedAddress={checkout.startEditSelectedAddress}
              onStartNewAddress={checkout.startNewAddress}
              onUpdateAddressDraft={checkout.updateAddressDraft}
              selectedAddressId={checkout.selectedAddressId}
              validationMessage={checkout.validation.address}
            />

            <section>
              <Select
                error={checkout.validation.time}
                id="checkout-time"
                label={
                  checkout.mode === "delivery" ? "Delivery time" : "Pickup time"
                }
                onChange={(event) =>
                  checkout.setSelectedTime(event.target.value)
                }
                options={checkout.timeSlots.map((slot) => ({
                  label: slot.label,
                  value: slot.value,
                }))}
                value={checkout.selectedTime}
              />
            </section>

            <CheckoutPaymentSection
              onSelectPaymentMethod={checkout.setSelectedPaymentMethodId}
              paymentMethods={checkout.paymentMethods}
              selectedPaymentMethodId={checkout.selectedPaymentMethodId}
              validationMessage={checkout.validation.payment}
            />

            <CheckoutPromoSection
              appliedPromo={checkout.appliedPromo}
              onApplyPromoCode={checkout.applyPromoCode}
              onClearPromoCode={checkout.clearPromoCode}
              onPromoCodeChange={checkout.setPromoCode}
              promoCode={checkout.promoCode}
              validationMessage={checkout.validation.promo}
            />

            <CheckoutReview
              fulfillmentAt={checkout.selectedTime}
              items={items}
              mode={checkout.mode}
              totals={checkout.reviewTotals}
            />
          </div>
        )}
      </Drawer>

      <OrderConfirmation
        onClose={() => {
          setConfirmedOrder(null);
          setConfirmedPoints(0);
        }}
        order={confirmedOrder}
        pointsAwarded={confirmedPoints}
      />
    </>
  );
}
