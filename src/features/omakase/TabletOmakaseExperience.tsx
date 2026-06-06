"use client";

import { useState } from "react";

import { TabletExperienceHeader } from "@/components/layout/TabletExperienceHeader";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useOmakase } from "@/hooks/useOmakase";

import { TabletOmakaseLanding } from "./TabletOmakaseLanding";
import { TabletOmakaseReview } from "./TabletOmakaseReview";

export function TabletOmakaseExperience() {
  const [cartOpen, setCartOpen] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  const { itemCount } = useCart();
  const {
    omakasePackages,
    review,
    sakePairingId,
    sakePairingOptions,
    selectedPackage,
    selectPackage,
    setSakePairingId,
  } = useOmakase();

  const openReview = () => {
    if (selectedPackage.id === "counter-signature") {
      selectPackage("seasonal-mastery");
    }

    if (!sakePairingId && sakePairingOptions[0]) {
      setSakePairingId(sakePairingOptions[0].id);
    }

    setReviewVisible(true);
  };

  return (
    <>
      <section className="flex h-dvh min-h-dvh flex-col overflow-hidden bg-[#050607] px-[10px] pb-[10px] pt-[10px] text-white">
        <TabletExperienceHeader
          active={reviewVisible ? "reservations" : "omakase"}
          cartCount={itemCount}
          navVariant="omakase"
          onOpenCart={() => setCartOpen(true)}
        />
        {reviewVisible ? (
          <TabletOmakaseReview
            review={review}
            sakePairingId={sakePairingId}
            sakePairingOptions={sakePairingOptions}
            onBack={() => setReviewVisible(false)}
            onSakePairingChange={setSakePairingId}
          />
        ) : (
          <TabletOmakaseLanding
            omakasePackages={omakasePackages}
            selectedPackageId={selectedPackage.id}
            onOpenReview={openReview}
            onSelectPackage={selectPackage}
          />
        )}
      </section>
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </>
  );
}
