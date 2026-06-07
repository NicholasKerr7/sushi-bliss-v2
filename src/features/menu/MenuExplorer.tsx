"use client";

import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { ResponsiveGrid } from "@/components/responsive/ResponsiveGrid";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { useMenu } from "@/hooks/useMenu";
import { pluralize } from "@/lib/format";
import { getDefaultCustomizations } from "@/lib/cart";
import type { MenuItem } from "@/types/menu";

import { ItemDetailDrawer } from "./ItemDetailDrawer";
import { MenuCard } from "./MenuCard";
import { MenuCategoryTabs } from "./MenuCategoryTabs";
import { MobileMenuExplorer } from "./MobileMenuExplorer";
import { TabletMenuExplorer } from "./TabletMenuExplorer";

export function MenuExplorer() {
  const [cartOpen, setCartOpen] = useState(false);
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
  const { addItem, itemCount: cartItemCount } = useCart();

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
      className="border-b border-sb-line bg-sb-charcoal py-12 md:py-0 xl:py-16"
      id="menu"
    >
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
      <MobileMenuExplorer
        cartItemCount={cartItemCount}
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
      <PageContainer className="hidden xl:block">
        <SectionHeader
          actions={
            <>
              <Button onClick={() => setCartOpen(true)} variant="secondary">
                View cart
              </Button>
              {hasActiveFilters ? (
                <Button onClick={clearFilters} variant="ghost">
                  Reset filters
                </Button>
              ) : null}
            </>
          }
          eyebrow={<Badge>Menu browsing</Badge>}
          subtitle={`${totalItemCount} chef-built signatures with filters for category, ingredient, texture, and pairing preferences.`}
          title="Explore the menu"
        />

        <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end">
          <Input
            id="menu-search"
            label="Search menu"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try otoro, truffle, vegetarian, sake"
            value={query}
          />
          <div className="rounded-card border border-sb-line bg-sb-panel/70 p-4">
            <p className="text-xs font-semibold uppercase text-sb-dim">
              Current view
            </p>
            <p aria-live="polite" className="mt-2 text-sm text-sb-muted">
              Showing{" "}
              <span className="font-mono text-sb-gold-soft">{itemCount}</span>{" "}
              {pluralize(itemCount, "item")} in{" "}
              <span className="text-sb-rice">{selectedCategory.label}</span>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <MenuCategoryTabs
            activeCategory={category}
            categories={categories}
            onCategoryChange={setCategory}
          />
        </div>

        {filteredItems.length > 0 ? (
          <ResponsiveGrid className="mt-6 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <MenuCard
                isFavorite={isFavorite(item.id)}
                item={item}
                key={item.id}
                onToggleFavorite={toggleFavorite}
                onViewDetails={setSelectedItem}
              />
            ))}
          </ResponsiveGrid>
        ) : (
          <EmptyState
            action={
              <Button onClick={clearFilters} variant="secondary">
                Clear search
              </Button>
            }
            className="mt-6"
            message="No menu items match the current search and category filters."
            title="No matching signatures"
          />
        )}
      </PageContainer>
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
