"use client";

import { useState, useSyncExternalStore } from "react";

import { CartDrawer } from "@/features/cart/CartDrawer";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { useMenu } from "@/hooks/useMenu";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { getDefaultCustomizations } from "@/lib/cart";
import type { MenuItem } from "@/types/menu";

import { DesktopMenuExperience } from "./DesktopMenuExperience";
import { ItemDetailDrawer } from "./ItemDetailDrawer";
import { MobileMenuExplorer } from "./MobileMenuExplorer";
import { TabletMenuExplorer } from "./TabletMenuExplorer";

function subscribeToClientReady(onStoreChange: () => void) {
  const timeoutId = window.setTimeout(onStoreChange, 0);

  return () => window.clearTimeout(timeoutId);
}

function getClientReadySnapshot() {
  return true;
}

function getServerReadySnapshot() {
  return false;
}

export function MenuExplorer() {
  const mode = useResponsiveMode();
  const [cartOpen, setCartOpen] = useState(false);
  const responsiveReady = useSyncExternalStore(
    subscribeToClientReady,
    getClientReadySnapshot,
    getServerReadySnapshot,
  );
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const {
    categories,
    category,
    clearFilters,
    filteredItems,
    hasActiveFilters,
    itemCount,
    query,
    selectedCategory,
    setCategory,
    setQuery,
    totalItemCount,
  } = useMenu();
  const { isFavorite, toggleFavorite } = useFavorites();
  const {
    addItem,
    itemCount: cartItemCount,
    subtotalCents: cartSubtotalCents,
    uniqueItemCount,
  } = useCart();

  const handleItemAdded = () => {
    setSelectedItem(null);
    setCartOpen(true);
  };

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      addOns: [],
      customizations: getDefaultCustomizations(),
      menuItem: item,
      quantity: 1,
    });
    setCartOpen(true);
  };

  return (
    <section
      className="border-b border-sb-line bg-sb-charcoal py-12 md:py-0"
      id="menu"
    >
      {!responsiveReady ? (
        <div className="min-h-dvh bg-[#050607]" aria-hidden="true" />
      ) : null}
      {responsiveReady && mode === "tablet" ? (
        <TabletMenuExplorer
          category={category}
          cartItemCount={cartItemCount}
          categories={categories}
          filteredItems={filteredItems}
          isFavorite={isFavorite}
          query={query}
          onAddToCart={handleAddToCart}
          onClearFilters={clearFilters}
          onOpenCart={() => setCartOpen(true)}
          onQueryChange={setQuery}
          onSelectCategory={setCategory}
          onToggleFavorite={toggleFavorite}
          onViewDetails={setSelectedItem}
        />
      ) : null}
      {responsiveReady && mode === "mobile" ? (
        <MobileMenuExplorer
          cartItemCount={cartItemCount}
          cartSubtotalCents={cartSubtotalCents}
          categories={categories}
          category={category}
          filteredItems={filteredItems}
          query={query}
          onAddToCart={handleAddToCart}
          onClearFilters={clearFilters}
          onOpenCart={() => setCartOpen(true)}
          onQueryChange={setQuery}
          onSelectCategory={setCategory}
          onViewDetails={setSelectedItem}
        />
      ) : null}
      {responsiveReady && mode === "desktop" ? (
        <DesktopMenuExperience
          category={category}
          cartItemCount={uniqueItemCount}
          categories={categories}
          filteredItems={filteredItems}
          hasActiveFilters={hasActiveFilters}
          isFavorite={isFavorite}
          itemCount={itemCount}
          query={query}
          selectedCategoryLabel={selectedCategory.label}
          totalItemCount={totalItemCount}
          onClearFilters={clearFilters}
          onQueryChange={setQuery}
          onSelectCategory={setCategory}
          onToggleFavorite={toggleFavorite}
        />
      ) : null}
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
      {selectedItem ? (
        <ItemDetailDrawer
          item={selectedItem}
          key={selectedItem.id}
          onAdded={handleItemAdded}
          onOpenCart={() => setCartOpen(true)}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              setSelectedItem(null);
            }
          }}
          onSearchQueryChange={setQuery}
          open={Boolean(selectedItem)}
        />
      ) : null}
    </section>
  );
}
