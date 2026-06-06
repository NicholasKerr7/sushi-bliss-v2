"use client";

import { useEffect, useRef, useState } from "react";

import { TabletMenuBottomNav } from "@/features/menu/TabletMenuChrome";
import type { CartLineItem } from "@/types/order";

import { TabletCheckoutBenefitStrip } from "./TabletCheckoutBenefitStrip";
import { TabletCheckoutDetails } from "./TabletCheckoutDetails";
import { TabletCheckoutHeader } from "./TabletCheckoutHeader";
import { TabletCheckoutReviewStep } from "./TabletCheckoutReviewStep";
import type { TabletCheckoutState } from "./tabletCheckoutTypes";

type TabletCheckoutStep = "details" | "review";

interface TabletCheckoutDialogProps {
  checkout: TabletCheckoutState;
  itemCount: number;
  items: CartLineItem[];
  onBackToCart: () => void;
  onOpenChange: (open: boolean) => void;
  onPlaceOrder: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  open: boolean;
}

/** Tablet-only checkout surface that reuses the shared checkout state machine. */
export function TabletCheckoutDialog({
  checkout,
  itemCount,
  items,
  onBackToCart,
  onOpenChange,
  onPlaceOrder,
  onRemoveItem,
  onUpdateQuantity,
  open,
}: TabletCheckoutDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<TabletCheckoutStep>("details");
  const [addressExpanded, setAddressExpanded] = useState(false);
  const [paymentsExpanded, setPaymentsExpanded] = useState(false);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (open) {
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [onOpenChange, open]);

  if (!open) {
    return null;
  }

  const setStepAndScroll = (nextStep: TabletCheckoutStep) => {
    setStep(nextStep);
    requestAnimationFrame(() => {
      dialogRef.current?.scrollTo({ top: 0 });
    });
  };

  const handleContinueToReview = () => {
    const promoValid = checkout.applyPromoCode();

    if (promoValid && checkout.validateCheckout()) {
      setStepAndScroll("review");
    }
  };

  return (
    <div
      aria-labelledby="tablet-checkout-title"
      aria-modal="true"
      className="fixed inset-0 z-50 hidden overflow-y-auto bg-[#050607] px-[26px] pb-4 pt-3 text-white md:block xl:hidden"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <TabletCheckoutHeader cartCount={itemCount} onBackToCart={onBackToCart} />

      <main className="mx-auto max-w-[1034px]">
        {step === "details" ? (
          <TabletCheckoutDetails
            addressExpanded={addressExpanded}
            checkout={checkout}
            instructions={instructions}
            itemCount={itemCount}
            items={items}
            onAddressExpandedChange={setAddressExpanded}
            onContinueToReview={handleContinueToReview}
            onEditCart={onBackToCart}
            onInstructionsChange={setInstructions}
            onPaymentsExpandedChange={setPaymentsExpanded}
            onRemoveItem={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
            paymentsExpanded={paymentsExpanded}
          />
        ) : (
          <TabletCheckoutReviewStep
            checkout={checkout}
            instructions={instructions}
            itemCount={itemCount}
            items={items}
            onBackToDetails={() => setStepAndScroll("details")}
            onEditCart={onBackToCart}
            onPlaceOrder={onPlaceOrder}
            onRemoveItem={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
          />
        )}

        <TabletCheckoutBenefitStrip />
      </main>

      <TabletMenuBottomNav activeIndex={4} />
    </div>
  );
}
