"use client";

import { useEffect, useState } from "react";

import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { getDefaultGiftCheckoutDraft } from "@/lib/gifts";
import type {
  GiftCheckoutDraft,
  GiftCheckoutResult,
  GiftConfirmation,
  GiftExperience,
} from "@/types/gift";
import type { PaymentMethod, UserProfile } from "@/types/user";

import { DesktopGiftCheckout } from "./DesktopGiftCheckoutView";
import { DesktopGiftConfirmation } from "./DesktopGiftConfirmationView";
import { getDefaultDeliveryDate } from "./DesktopGiftData";
import { DesktopGiftSelection } from "./DesktopGiftSelectionView";

interface DesktopGiftExperienceProps {
  giftExperiences: GiftExperience[];
  paymentMethods: PaymentMethod[];
  profile: UserProfile;
  onSubmitGift: (draft: GiftCheckoutDraft) => GiftCheckoutResult;
}

type DesktopGiftView = "selection" | "checkout" | "confirmation";

export function DesktopGiftExperience({
  giftExperiences,
  paymentMethods,
  profile,
  onSubmitGift,
}: DesktopGiftExperienceProps) {
  const { itemCount } = useCart();
  const defaultGift = giftExperiences[0];
  const defaultPaymentMethod =
    paymentMethods.find((method) => method.isDefault) || paymentMethods[0];
  const [view, setView] = useState<DesktopGiftView>("selection");
  const [selectedGiftId, setSelectedGiftId] = useState(defaultGift?.id || "");
  const [confirmation, setConfirmation] = useState<GiftConfirmation | null>(
    null,
  );
  const [validationMessage, setValidationMessage] = useState("");
  const [draft, setDraft] = useState<GiftCheckoutDraft>(() => ({
    ...getDefaultGiftCheckoutDraft(
      defaultGift?.id || "",
      profile.name,
      profile.email,
      defaultPaymentMethod?.id || "",
    ),
    deliveryDate: getDefaultDeliveryDate(),
    message:
      "A night of exceptional sushi, crafted with care. Enjoy every course.",
    recipientEmail: "emily.johnson@email.com",
    recipientName: "Emily Johnson",
  }));
  const selectedGift =
    giftExperiences.find((gift) => gift.id === selectedGiftId) || defaultGift;

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, [view]);

  const updateDraft = (field: keyof GiftCheckoutDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setValidationMessage("");
  };

  const selectGift = (giftId: string) => {
    setSelectedGiftId(giftId);
    setDraft((current) => ({ ...current, giftId }));
    setValidationMessage("");
  };

  const submitGift = () => {
    const result = onSubmitGift(draft);

    if (result.error) {
      setValidationMessage(result.error);
      return;
    }

    if (result.confirmation) {
      setConfirmation(result.confirmation);
      setView("confirmation");
    }
  };

  if (!selectedGift) {
    return null;
  }

  return (
    <section
      className="hidden min-h-dvh bg-[#030405] text-white xl:block"
      id="gifts"
    >
      <DesktopMenuHeader activeId="gifts" cartCount={itemCount} />
      <main className="mx-auto max-w-[1568px] px-5 pb-3 pt-0">
        <div className="overflow-hidden rounded-b-[20px] border-x border-b border-[var(--sb-border)] bg-[#050607] shadow-[0_30px_90px_rgba(0,0,0,0.56)]">
          {view === "confirmation" && confirmation ? (
            <DesktopGiftConfirmation
              confirmation={confirmation}
              gift={selectedGift}
              onSendAnother={() => {
                setConfirmation(null);
                setView("selection");
              }}
            />
          ) : view === "checkout" ? (
            <DesktopGiftCheckout
              draft={draft}
              gift={selectedGift}
              paymentMethods={paymentMethods}
              validationMessage={validationMessage}
              onBack={() => setView("selection")}
              onPurchase={submitGift}
              onUpdateDraft={updateDraft}
            />
          ) : (
            <DesktopGiftSelection
              draft={draft}
              giftExperiences={giftExperiences}
              selectedGift={selectedGift}
              onContinue={() => setView("checkout")}
              onSelectGift={selectGift}
              onUpdateDraft={updateDraft}
            />
          )}

          <div className="px-9 pb-4">
            <DesktopBenefitStrip />
          </div>
        </div>
      </main>
    </section>
  );
}
