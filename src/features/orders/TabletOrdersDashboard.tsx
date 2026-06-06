"use client";

import { useState } from "react";

import { CartDrawer } from "@/features/cart/CartDrawer";
import {
  TabletMenuBottomNav,
  TabletMenuStatusBar,
} from "@/features/menu/TabletMenuChrome";
import type { Order } from "@/types/order";

import { TabletOrderListView } from "./TabletOrderListView";
import { TabletOrdersHeader } from "./TabletOrdersHeader";
import { TabletOrderTrackingView } from "./TabletOrderTrackingView";

type OrderView = "active" | "past";
type TabletOrderSurface = "tracking" | "list";

interface TabletOrdersDashboardProps {
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

/** Tablet-first orders surface matching the live tracking reference flow. */
export function TabletOrdersDashboard({
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
}: TabletOrdersDashboardProps) {
  const [surface, setSurface] = useState<TabletOrderSurface>("tracking");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const visibleOrders = view === "active" ? activeOrders : pastOrders;
  const fallbackOrder = activeOrders[0] || pastOrders[0] || null;
  const trackedOrder = selectedOrder || fallbackOrder;

  const handleSelectOrder = (order: Order) => {
    onSelectOrder(order);
    setDetailsOpen(false);
    setSurface("tracking");
  };

  const handleViewChange = (nextView: OrderView) => {
    onViewChange(nextView);
    onSelectOrder(null);
    setDetailsOpen(false);
    setSurface("list");
  };

  return (
    <section
      className="min-h-dvh bg-[#050607] px-[26px] pb-4 pt-3 text-white"
      id="orders"
    >
      <TabletMenuStatusBar />
      <TabletOrdersHeader cartCount={cartCount} onOpenCart={onOpenCart} />

      {surface === "tracking" && trackedOrder ? (
        <TabletOrderTrackingView
          detailsOpen={detailsOpen}
          onBackToOrders={() => {
            onSelectOrder(null);
            setDetailsOpen(false);
            setSurface("list");
          }}
          onReorder={onReorder}
          onToggleDetails={() => setDetailsOpen((current) => !current)}
          order={trackedOrder}
        />
      ) : (
        <TabletOrderListView
          activeCount={activeOrders.length}
          onReorder={onReorder}
          onSelectOrder={handleSelectOrder}
          onViewChange={handleViewChange}
          orders={visibleOrders}
          pastCount={pastOrders.length}
          reorderMessage={reorderMessage}
          view={view}
        />
      )}

      <TabletMenuBottomNav activeIndex={3} />
      <CartDrawer onOpenChange={onCartOpenChange} open={cartOpen} />
    </section>
  );
}
