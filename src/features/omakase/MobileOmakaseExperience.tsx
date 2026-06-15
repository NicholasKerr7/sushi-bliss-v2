"use client";

import { useState } from "react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import { useOmakase } from "@/hooks/useOmakase";

import { MobileOmakaseLandingView } from "./MobileOmakaseLandingView";
import { MobileOmakaseHeader } from "./MobileOmakasePrimitives";
import { MobileOmakaseReviewView } from "./MobileOmakaseReviewView";

/** Coordinates mobile omakase package selection, review totals, and reservation actions. */
export function MobileOmakaseExperience() {
  const [cartOpen, setCartOpen] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  const { itemCount } = useCart();
  const { unreadCount } = useNotifications();
  const {
    guestCount,
    omakasePackages,
    review,
    sakePairingId,
    sakePairingOptions,
    selectedPackage,
    selectPackage,
    setSakePairingId,
    updateGuestCount,
  } = useOmakase();

  return (
    <section
      className="relative min-h-dvh overflow-x-hidden bg-[#050607] px-4 pb-[236px] pt-5 text-white md:hidden"
      id="omakase"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_14%,rgba(239,47,37,0.18),transparent_30%),radial-gradient(circle_at_100%_8%,rgba(215,168,79,0.14),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0)_0%,#050607_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,rgba(17,6,5,0.78),transparent)]"
      />

      <div className="mobile-frame relative z-10">
        <MobileOmakaseHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
          unreadNotificationCount={unreadCount}
        />

        {reviewVisible ? (
          <MobileOmakaseReviewView
            guestCount={guestCount}
            review={review}
            sakePairingId={sakePairingId}
            sakePairingOptions={sakePairingOptions}
            onBack={() => setReviewVisible(false)}
            onGuestCountChange={updateGuestCount}
            onSakePairingChange={setSakePairingId}
          />
        ) : (
          <MobileOmakaseLandingView
            packages={omakasePackages}
            selectedPackage={selectedPackage}
            onOpenReview={() => setReviewVisible(true)}
            onSelectPackage={selectPackage}
          />
        )}
      </div>

      <BottomNavigation activeId="home" ariaLabel="Mobile omakase navigation" />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
