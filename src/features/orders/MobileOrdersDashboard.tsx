"use client";

import { useState } from "react";

import { CartDrawer } from "@/features/cart/CartDrawer";
import type { Order } from "@/types/order";

import { MobileOrderDetailsView } from "./MobileOrderDetailsView";
import { MobileOrderTrackingView } from "./MobileOrderTrackingView";
import { MobileOrdersListView } from "./MobileOrdersListView";

type OrderView = "active" | "past";
type MobileOrdersSurface = "list" | "details" | "tracking";

interface MobileOrdersDashboardProps {
  activeOrders: Order[];
  cartCount: number;
  cartOpen: boolean;
  onCartOpenChange: (open: boolean) => void;
  onOpenCart: () => void;
  onReorder: (order: Order) => void;
  onSelectOrder: (order: Order | null) => void;
  onViewChange: (view: OrderView) => void;
  pastOrders: Order[];
  reorderMessage: string;
  selectedOrder: Order | null;
  view: OrderView;
}

/** Coordinates the mobile-only list, detail, and live tracking order screens. */
export function MobileOrdersDashboard({
  activeOrders,
  cartCount,
  cartOpen,
  onCartOpenChange,
  onOpenCart,
  onReorder,
  onSelectOrder,
  onViewChange,
  pastOrders,
  reorderMessage,
  selectedOrder,
  view,
}: MobileOrdersDashboardProps) {
  const [surface, setSurface] = useState<MobileOrdersSurface>("list");
  const fallbackOrder = activeOrders[0] || pastOrders[0] || null;
  const currentOrder = selectedOrder || fallbackOrder;

  const handleViewChange = (nextView: OrderView) => {
    onViewChange(nextView);
    onSelectOrder(null);
    setSurface("list");
  };

  const handleViewDetails = (order: Order) => {
    onSelectOrder(order);
    setSurface("details");
  };

  const handleTrackOrder = (order: Order) => {
    onSelectOrder(order);
    setSurface("tracking");
  };

  const handleReorder = (order: Order) => {
    setSurface("list");
    onReorder(order);
  };

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-black px-5 pb-[124px] pt-5 text-white md:hidden"
      id="orders"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/assets/textures/red-moon-sakura-background.webp')] bg-cover bg-left-top opacity-58"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_97%_24%,rgba(188,20,18,0.18),transparent_22%),linear-gradient(180deg,rgba(0,0,0,0.42)_0%,#050505_34%,#030303_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[380px] bg-[radial-gradient(circle_at_50%_80%,rgba(202,164,93,0.12),transparent_54%)]"
      />

      {surface === "details" && currentOrder ? (
        <MobileOrderDetailsView
          cartCount={cartCount}
          onBack={() => setSurface("list")}
          onOpenCart={onOpenCart}
          onReorder={handleReorder}
          onTrackOrder={handleTrackOrder}
          order={currentOrder}
        />
      ) : surface === "tracking" && currentOrder ? (
        <MobileOrderTrackingView
          cartCount={cartCount}
          onBack={() => setSurface("details")}
          onOpenCart={onOpenCart}
          order={currentOrder}
        />
      ) : (
        <MobileOrdersListView
          activeOrders={activeOrders}
          cartCount={cartCount}
          onOpenCart={onOpenCart}
          onReorder={handleReorder}
          onViewChange={handleViewChange}
          onViewDetails={handleViewDetails}
          pastOrders={pastOrders}
          reorderMessage={reorderMessage}
          view={view}
        />
      )}

      <CartDrawer onOpenChange={onCartOpenChange} open={cartOpen} />
    </section>
  );
}
