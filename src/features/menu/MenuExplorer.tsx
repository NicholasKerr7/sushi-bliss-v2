"use client";

import { useState } from "react";

import { CartDrawer } from "@/features/cart/CartDrawer";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { useMenu } from "@/hooks/useMenu";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { useResponsiveReady } from "@/hooks/useResponsiveReady";
import { getDefaultCustomizationsForItem } from "@/lib/cart";
import type { MenuItem } from "@/types/menu";

import { DesktopMenuExperience } from "./DesktopMenuExperience";
import { ItemDetailDrawer } from "./ItemDetailDrawer";
import { MobileMenuExplorer } from "./MobileMenuExplorer";
import { TabletMenuExplorer } from "./TabletMenuExplorer";

export function MenuExplorer() {
  const mode = useResponsiveMode();
  const [cartOpen, setCartOpen] = useState(false);
  const responsiveReady = useResponsiveReady();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const {
    categories,
    category,
    clearFilters,
    filteredItems,
    hasActiveFilters,
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
      customizations: getDefaultCustomizationsForItem(item),
      menuItem: item,
      quantity: 1,
    });
    setCartOpen(true);
  };

  return (
    <section className="border-b border-sb-line bg-sb-charcoal" id="menu">
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
