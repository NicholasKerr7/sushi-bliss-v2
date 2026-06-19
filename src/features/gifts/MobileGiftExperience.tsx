"use client";

import { useEffect, useMemo, useState } from "react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useGifts } from "@/hooks/useGifts";
import { useNotifications } from "@/hooks/useNotifications";
import { useProfile } from "@/hooks/useProfile";
import { addDays } from "@/lib/dates";
import { getDefaultGiftCheckoutDraft } from "@/lib/gifts";
import type { GiftCheckoutDraft, GiftConfirmation } from "@/types/gift";

import { MobileGiftCheckoutView } from "./MobileGiftCheckoutView";
import { MobileGiftConfirmationView } from "./MobileGiftConfirmationView";
import { MobileGiftHeader } from "./MobileGiftPrimitives";
import { MobileGiftSelectionView } from "./MobileGiftSelectionView";

type MobileGiftView = "selection" | "checkout" | "confirmation";

/** Coordinates mobile gift package selection, checkout, confirmation, and cart access. */
export function MobileGiftExperience() {
  const { itemCount } = useCart();
  const { unreadCount } = useNotifications();
  const { profile } = useProfile();
  const { confirmations, giftExperiences, sendGift } = useGifts();
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState<MobileGiftView>("selection");
  const [confirmation, setConfirmation] = useState<GiftConfirmation | null>(
    null,
  );
  const [validationMessage, setValidationMessage] = useState("");
  const defaultGift = giftExperiences[0];
  const defaultPaymentMethod =
    profile.paymentMethods.find((method) => method.isDefault) ||
    profile.paymentMethods[0];
  const [selectedGiftId, setSelectedGiftId] = useState(defaultGift?.id || "");
  const [draft, setDraft] = useState<GiftCheckoutDraft>(() =>
    getDefaultGiftCheckoutDraft(
      defaultGift?.id || "",
      profile.name,
      profile.email,
      defaultPaymentMethod?.id || "",
    ),
  );
  const minDeliveryDate = useMemo(
    () => addDays(new Date(), 1).toISOString().slice(0, 10),
    [],
  );
  const selectedGift =
    giftExperiences.find((gift) => gift.id === selectedGiftId) || defaultGift;

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [view]);

  if (!selectedGift) {
    return null;
  }

  const updateDraft = (field: keyof GiftCheckoutDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setValidationMessage("");
  };

  const selectGift = (giftId: string) => {
    setSelectedGiftId(giftId);
    setDraft((current) => ({ ...current, giftId }));
    setValidationMessage("");
  };

  const openCheckout = () => {
    setDraft((current) => ({ ...current, giftId: selectedGift.id }));
    setValidationMessage("");
    setView("checkout");
  };

  const submitGift = () => {
    const result = sendGift(draft, profile.paymentMethods);

    if (result.error) {
      setValidationMessage(result.error);
      return;
    }

    if (result.confirmation) {
      setConfirmation(result.confirmation);
      setValidationMessage("");
      setView("confirmation");
    }
  };

  const sendAnother = () => {
    setConfirmation(null);
    setDraft(
      getDefaultGiftCheckoutDraft(
        selectedGift.id,
        profile.name,
        profile.email,
        defaultPaymentMethod?.id || "",
      ),
    );
    setValidationMessage("");
    setView("selection");
  };

  return (
    <section
      className="relative min-h-dvh overflow-x-hidden bg-[#050607] px-4 pb-[236px] pt-5 text-white md:hidden"
      id="gifts"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_14%,rgba(239,47,37,0.18),transparent_30%),radial-gradient(circle_at_100%_8%,rgba(215,168,79,0.14),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0)_0%,#050607_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[430px] bg-[url('/assets/gallery/elegant-table-setting-with-candlelight-and-berries.webp')] bg-cover bg-center opacity-20"
      />

      <div className="mobile-frame relative z-10">
        <MobileGiftHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
          unreadNotificationCount={unreadCount}
        />

        {view === "confirmation" && confirmation ? (
          <MobileGiftConfirmationView
            confirmation={confirmation}
            onSendAnother={sendAnother}
          />
        ) : view === "checkout" ? (
          <MobileGiftCheckoutView
            draft={draft}
            gift={selectedGift}
            minDeliveryDate={minDeliveryDate}
            paymentMethods={profile.paymentMethods}
            validationMessage={validationMessage}
            onBack={() => setView("selection")}
            onSubmit={submitGift}
            onUpdateDraft={updateDraft}
          />
        ) : (
          <MobileGiftSelectionView
            confirmations={confirmations}
            giftExperiences={giftExperiences}
            selectedGift={selectedGift}
            onContinue={openCheckout}
            onSelectGift={selectGift}
          />
        )}
      </div>

      <BottomNavigation
        activeId="profile"
        ariaLabel="Mobile gifts navigation"
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
