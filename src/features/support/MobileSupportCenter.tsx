"use client";

import { useState } from "react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useProfile } from "@/hooks/useProfile";
import { useSupport } from "@/hooks/useSupport";
import type { HelpArticle } from "@/types/support";

import { MobileSupportArticleDetailView } from "./MobileSupportArticleDetailView";
import { MobileSupportHeader } from "./MobileSupportPrimitives";
import { MobileSupportOverviewView } from "./MobileSupportOverviewView";
import { MobileSupportRequestView } from "./MobileSupportRequestView";

type MobileSupportView = "overview" | "request";

/** Coordinates mobile support overview, request form, article detail, and cart access. */
export function MobileSupportCenter() {
  const { profile } = useProfile();
  const { itemCount } = useCart();
  const { messages, submitSupportMessage } = useSupport();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(
    null,
  );
  const [view, setView] = useState<MobileSupportView>("overview");

  const openRequest = () => {
    setSelectedArticle(null);
    setView("request");
  };

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-[#050607] px-4 pb-[236px] pt-5 text-white md:hidden"
      id="support"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_14%,rgba(239,47,37,0.18),transparent_30%),radial-gradient(circle_at_100%_8%,rgba(215,168,79,0.15),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0)_0%,#050607_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[430px] bg-[url('/assets/ambience/elegant-sushi-bar-ambience-at-night.webp')] bg-cover bg-center opacity-24"
      />

      <div className="relative z-10 mx-auto max-w-[430px]">
        <MobileSupportHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
        />

        {selectedArticle ? (
          <MobileSupportArticleDetailView
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            onOpenRequest={openRequest}
          />
        ) : view === "request" ? (
          <MobileSupportRequestView
            profile={profile}
            onBack={() => setView("overview")}
            onSubmitSupportMessage={submitSupportMessage}
          />
        ) : (
          <MobileSupportOverviewView
            messages={messages}
            onOpenArticle={setSelectedArticle}
            onOpenRequest={openRequest}
          />
        )}
      </div>

      <BottomNavigation
        activeId="profile"
        ariaLabel="Mobile support navigation"
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
