"use client";

import { useState } from "react";

import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { TabletExperienceHeader } from "@/components/layout/TabletExperienceHeader";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useProfile } from "@/hooks/useProfile";
import { useSupport } from "@/hooks/useSupport";
import type { HelpArticle } from "@/types/support";

import { TabletSupportArticleDetailView } from "./TabletSupportArticleDetailView";
import { TabletSupportContactView } from "./TabletSupportContactView";
import { TabletSupportHelpView } from "./TabletSupportHelpView";

type TabletSupportView = "contact" | "help";

/** Coordinates tablet support contact, help center, article detail, and cart access. */
export function TabletSupportCenter() {
  const { itemCount } = useCart();
  const { profile } = useProfile();
  const { messages, submitSupportMessage } = useSupport();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(
    null,
  );
  const [view, setView] = useState<TabletSupportView>("contact");

  const openHelp = () => {
    setSelectedArticle(null);
    setView("help");
  };

  const openContact = () => {
    setSelectedArticle(null);
    setView("contact");
  };

  return (
    <section
      className="flex min-h-dvh flex-col bg-[#050607] px-[18px] pb-3 pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pb-4 min-[1080px]:pt-3"
      id="support"
    >
      <TabletExperienceHeader
        cartCount={itemCount}
        onOpenCart={() => setCartOpen(true)}
        title="Concierge support"
      />

      <main className="mx-auto w-full max-w-[1034px]">
        {selectedArticle ? (
          <TabletSupportArticleDetailView
            article={selectedArticle}
            onBack={openHelp}
            onOpenContact={openContact}
          />
        ) : view === "help" ? (
          <TabletSupportHelpView
            onOpenArticle={setSelectedArticle}
            onOpenContact={openContact}
          />
        ) : (
          <TabletSupportContactView
            messages={messages}
            profile={profile}
            onOpenHelp={openHelp}
            onSubmitSupportMessage={submitSupportMessage}
          />
        )}
      </main>

      <TabletBottomNavigation
        activeId="profile"
        ariaLabel="Tablet support navigation"
        fixed={false}
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
