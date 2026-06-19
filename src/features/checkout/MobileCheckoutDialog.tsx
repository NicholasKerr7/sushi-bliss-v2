"use client";

import { useEffect, useRef, useState } from "react";

import { useScrollLock } from "@/hooks/useScrollLock";
import type { CartLineItem } from "@/types/order";

import {
  MobileCheckoutHeader,
  MobileCheckoutProgress,
} from "./MobileCheckoutPrimitives";
import {
  AddressStep,
  FulfillmentStep,
  PaymentStep,
  ReviewStep,
} from "./MobileCheckoutSteps";
import type { MobileCheckoutState } from "./mobileCheckoutTypes";

type MobileCheckoutStep = "fulfillment" | "address" | "payment" | "review";

interface MobileCheckoutDialogProps {
  checkout: MobileCheckoutState;
  itemCount: number;
  items: CartLineItem[];
  onBackToCart?: () => void;
  onClose: () => void;
  onPlaceOrder: () => void;
  onRemoveItem: (id: string) => void;
  open: boolean;
}

const stepOrder: MobileCheckoutStep[] = [
  "fulfillment",
  "address",
  "payment",
  "review",
];

/** Coordinates the mobile checkout step flow while shared checkout logic stays in useCheckout. */
export function MobileCheckoutDialog({
  checkout,
  itemCount,
  items,
  onBackToCart,
  onClose,
  onPlaceOrder,
  onRemoveItem,
  open,
}: MobileCheckoutDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<MobileCheckoutStep>("fulfillment");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [instructions, setInstructions] = useState("");
  const stepIndex = stepOrder.indexOf(step);

  useScrollLock(open);

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: 0 });
    }
  }, [open, step]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const setStepAndScroll = (nextStep: MobileCheckoutStep) => {
    setStep(nextStep);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: 0 });
    });
  };

  const handleContinueToReview = () => {
    const promoValid = checkout.applyPromoCode();

    if (promoValid && checkout.validateCheckout(items)) {
      setStepAndScroll("review");
    }
  };

  return (
    <div
      aria-label="Checkout"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black text-white md:hidden"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <div
        className="relative h-dvh overflow-y-auto px-5 pb-8 pt-6"
        ref={scrollRef}
      >
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,#030303_0%,#090908_42%,#020202_100%)]" />
        <div className="pointer-events-none fixed inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(202,164,93,0.08),transparent)]" />

        <div className="mobile-frame relative z-10">
          <MobileCheckoutHeader
            itemCount={itemCount}
            onBackToCart={onBackToCart}
            onClose={onClose}
          />
          <MobileCheckoutProgress activeIndex={stepIndex} />

          {step === "fulfillment" ? (
            <FulfillmentStep
              checkout={checkout}
              itemCount={itemCount}
              items={items}
              onContinue={() => setStepAndScroll("address")}
              onSummaryOpenChange={setSummaryOpen}
              summaryOpen={summaryOpen}
            />
          ) : null}
          {step === "address" ? (
            <AddressStep
              checkout={checkout}
              instructions={instructions}
              onBack={() => setStepAndScroll("fulfillment")}
              onContinue={() => setStepAndScroll("payment")}
              onInstructionsChange={setInstructions}
            />
          ) : null}
          {step === "payment" ? (
            <PaymentStep
              checkout={checkout}
              itemCount={itemCount}
              items={items}
              onBack={() => setStepAndScroll("address")}
              onContinue={handleContinueToReview}
            />
          ) : null}
          {step === "review" ? (
            <ReviewStep
              checkout={checkout}
              instructions={instructions}
              itemCount={itemCount}
              items={items}
              onBack={() => setStepAndScroll("payment")}
              onEditAddress={() => setStepAndScroll("address")}
              onEditPayment={() => setStepAndScroll("payment")}
              onEditSchedule={() => setStepAndScroll("fulfillment")}
              onPlaceOrder={onPlaceOrder}
              onRemoveItem={onRemoveItem}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
