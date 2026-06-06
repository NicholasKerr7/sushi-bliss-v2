"use client";

import { useEffect, useState } from "react";

import { TabletExperienceHeader } from "@/components/layout/TabletExperienceHeader";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { getDefaultGiftCheckoutDraft } from "@/lib/gifts";
import type {
  GiftCheckoutDraft,
  GiftCheckoutResult,
  GiftConfirmation,
  GiftExperience,
} from "@/types/gift";
import type { PaymentMethod, UserProfile } from "@/types/user";

import { TabletGiftCheckout } from "./TabletGiftCheckout";
import { TabletGiftConfirmation } from "./TabletGiftConfirmation";
import { TabletGiftSelection } from "./TabletGiftSelection";

interface TabletGiftExperienceProps {
  giftExperiences: GiftExperience[];
  paymentMethods: PaymentMethod[];
  profile: UserProfile;
  onSubmitGift: (draft: GiftCheckoutDraft) => GiftCheckoutResult;
}

type TabletGiftView = "selection" | "checkout" | "confirmation";

function getDefaultDeliveryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 9);

  return date.toISOString().slice(0, 10);
}

export function TabletGiftExperience({
  giftExperiences,
  paymentMethods,
  profile,
  onSubmitGift,
}: TabletGiftExperienceProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const defaultGift = giftExperiences[0];
  const defaultPaymentMethod =
    paymentMethods.find((method) => method.isDefault) || paymentMethods[0];
  const [view, setView] = useState<TabletGiftView>("selection");
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
      "Happy Birthday, Emma! Hope you enjoy this special experience.\nYou deserve something truly unforgettable.\n\nLove,\nHiroshi",
    recipientEmail: "emma.johnson@email.com",
    recipientName: "Emma Johnson",
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

  const completePayment = () => {
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
    <>
      <section className="flex h-dvh min-h-dvh flex-col overflow-hidden bg-[#050607] px-[10px] pb-[10px] pt-[10px] text-white">
        <TabletExperienceHeader
          active={view === "selection" ? undefined : "contact"}
          cartCount={itemCount}
          navVariant="gifts"
          onOpenCart={() => setCartOpen(true)}
          showContact={view !== "selection"}
        />
        {view === "confirmation" && confirmation ? (
          <TabletGiftConfirmation
            confirmation={confirmation}
            draft={draft}
            gift={selectedGift}
            onViewDetails={() => setView("checkout")}
          />
        ) : view === "checkout" ? (
          <TabletGiftCheckout
            draft={draft}
            gift={selectedGift}
            paymentMethods={paymentMethods}
            validationMessage={validationMessage}
            onBack={() => setView("selection")}
            onCompletePayment={completePayment}
            onUpdateDraft={updateDraft}
          />
        ) : (
          <TabletGiftSelection
            draft={draft}
            giftExperiences={giftExperiences}
            selectedGift={selectedGift}
            onContinue={() => setView("checkout")}
            onSelectGift={selectGift}
            onUpdateDraft={updateDraft}
          />
        )}
      </section>
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </>
  );
}
