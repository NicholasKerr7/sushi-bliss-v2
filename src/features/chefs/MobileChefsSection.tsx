"use client";

import { useState } from "react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { chefs } from "@/data/chefs";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import type { Chef } from "@/types/chef";

import { MobileChefDetailView } from "./MobileChefDetailView";
import { MobileChefsListView } from "./MobileChefsListView";
import { MobileChefsHeader } from "./MobileChefsPrimitives";

/** Coordinates the mobile chef roster, detail profile, cart drawer, and nav. */
export function MobileChefsSection() {
  const { itemCount } = useCart();
  const { unreadCount } = useNotifications();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);

  return (
    <section
      className="relative min-h-dvh overflow-x-hidden bg-[#050607] px-4 pb-[236px] pt-5 text-white md:hidden"
      id="chefs"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_14%,rgba(239,47,37,0.18),transparent_30%),radial-gradient(circle_at_100%_8%,rgba(215,168,79,0.14),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0)_0%,#050607_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[430px] bg-[url('/assets/chefs/sushi-bliss-master-chef-team.webp')] bg-cover bg-center opacity-20"
      />

      <div className="mobile-frame relative z-10">
        <MobileChefsHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
          unreadNotificationCount={unreadCount}
        />

        {selectedChef ? (
          <MobileChefDetailView
            chef={selectedChef}
            onBack={() => setSelectedChef(null)}
          />
        ) : (
          <MobileChefsListView chefs={chefs} onSelectChef={setSelectedChef} />
        )}
      </div>

      <BottomNavigation activeId="home" ariaLabel="Mobile chefs navigation" />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
