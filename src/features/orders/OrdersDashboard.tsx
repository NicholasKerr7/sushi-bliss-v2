"use client";

import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { mockOrders } from "@/data/orders";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import { useOrders } from "@/hooks/useOrders";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { classNames } from "@/lib/classNames";
import { getReorderDrafts } from "@/lib/orders";
import type { Order } from "@/types/order";

import { MobileOrdersDashboard } from "./MobileOrdersDashboard";
import { OrderCard } from "./OrderCard";
import { OrderDetailDrawer } from "./OrderDetailDrawer";
import { TabletOrdersDashboard } from "./TabletOrdersDashboard";

type OrderView = "active" | "past";

export function OrdersDashboard() {
  const [view, setView] = useState<OrderView>("active");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [reorderMessage, setReorderMessage] = useState("");
  const mode = useResponsiveMode();
  const { addItem, itemCount } = useCart();
  const { unreadCount } = useNotifications();
  const { activeOrders, pastOrders } = useOrders(mockOrders);
  const visibleOrders = view === "active" ? activeOrders : pastOrders;

  const handleReorder = (order: Order) => {
    getReorderDrafts(order).forEach(addItem);
    setReorderMessage(`${order.confirmationCode} was added to your cart.`);
    setSelectedOrder(null);
    setCartOpen(true);
  };

  if (mode === "mobile") {
    return (
      <MobileOrdersDashboard
        activeOrders={activeOrders}
        cartCount={itemCount}
        cartOpen={cartOpen}
        onCartOpenChange={setCartOpen}
        onOpenCart={() => setCartOpen(true)}
        onReorder={handleReorder}
        onSelectOrder={setSelectedOrder}
        onViewChange={setView}
        pastOrders={pastOrders}
        reorderMessage={reorderMessage}
        selectedOrder={selectedOrder}
        unreadNotificationCount={unreadCount}
        view={view}
      />
    );
  }

  if (mode === "tablet") {
    return (
      <TabletOrdersDashboard
        activeOrders={activeOrders}
        cartCount={itemCount}
        cartOpen={cartOpen}
        onCartOpenChange={setCartOpen}
        onOpenCart={() => setCartOpen(true)}
        onReorder={handleReorder}
        onSelectOrder={setSelectedOrder}
        onViewChange={setView}
        pastOrders={pastOrders}
        reorderMessage={reorderMessage}
        selectedOrder={selectedOrder}
        view={view}
      />
    );
  }

  return (
    <section
      className="border-b border-sb-line bg-sb-ink py-12 md:py-16"
      id="orders"
    >
      <PageContainer>
        <SectionHeader
          actions={
            <div
              aria-label="Order views"
              className="inline-grid grid-cols-2 overflow-hidden rounded-control border border-sb-line bg-sb-panel/70"
              role="group"
            >
              {(["active", "past"] as const).map((item) => (
                <button
                  aria-pressed={view === item}
                  className={classNames(
                    "px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                    view === item
                      ? "bg-sb-gold/15 text-sb-gold-soft"
                      : "text-sb-muted hover:bg-sb-rice/5 hover:text-sb-rice",
                  )}
                  key={item}
                  onClick={() => setView(item)}
                  type="button"
                >
                  {item === "active" ? "Active" : "Past"}
                </button>
              ))}
            </div>
          }
          eyebrow={<Badge>Orders</Badge>}
          subtitle="Follow active pickup or delivery progress, review receipts, and reorder previous selections."
          title="Orders"
        />

        {reorderMessage ? (
          <div className="mt-5 rounded-card border border-sb-wasabi/30 bg-sb-wasabi/10 p-3 text-sm text-sb-wasabi">
            {reorderMessage}
          </div>
        ) : null}

        {visibleOrders.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleOrders.map((order) => (
              <OrderCard
                key={order.id}
                onReorder={handleReorder}
                onViewDetails={setSelectedOrder}
                order={order}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            action={
              <Button href="/menu" variant="secondary">
                Browse menu
              </Button>
            }
            className="mt-6"
            message={
              view === "active"
                ? "Active checkout orders will appear here with live status updates."
                : "Completed orders will appear here for receipts and reorder."
            }
            title={view === "active" ? "No active orders" : "No past orders"}
          />
        )}
      </PageContainer>

      <OrderDetailDrawer
        onOpenChange={(open) => {
          if (!open) {
            setSelectedOrder(null);
          }
        }}
        onReorder={handleReorder}
        open={Boolean(selectedOrder)}
        order={selectedOrder}
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
