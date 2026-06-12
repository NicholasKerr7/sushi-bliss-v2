"use client";

import Image from "next/image";
import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { getDefaultCustomizations } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

import { MobileFavoritesPage } from "./MobileFavoritesPage";
import { TabletFavoritesPage } from "./TabletFavoritesPage";

/** Routes favorites to a mobile-first reorder flow or expanded desktop layout. */
export function FavoritesPage() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileFavoritesPage />;
  }

  if (mode === "tablet") {
    return <TabletFavoritesPage />;
  }

  return <DesktopFavoritesPage />;
}

function DesktopFavoritesPage() {
  const { addItem } = useCart();
  const { clearFavorites, favoriteItems, hasFavorites, toggleFavorite } =
    useFavorites();
  const [cartMessage, setCartMessage] = useState("");

  const handleAddFavoriteToCart = (item: MenuItem) => {
    addItem({
      addOns: [],
      customizations: getDefaultCustomizations(),
      menuItem: item,
      quantity: 1,
    });
    setCartMessage(`${item.name} added to cart.`);
  };

  return (
    <section
      className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16"
      id="favorites"
    >
      <PageContainer>
        <SectionHeader
          actions={
            hasFavorites ? (
              <Button onClick={clearFavorites} variant="ghost">
                Clear saved
              </Button>
            ) : (
              <Button href="/menu" variant="secondary">
                Browse menu
              </Button>
            )
          }
          eyebrow={<Badge>Favorites</Badge>}
          subtitle="Saved signatures stay ready for quick reorder and reward planning."
          title="Favorite dishes"
        />

        {cartMessage ? (
          <p className="mt-5 rounded-card border border-sb-wasabi/30 bg-sb-wasabi/10 p-3 text-sm font-semibold text-sb-wasabi">
            {cartMessage}
          </p>
        ) : null}

        {hasFavorites ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {favoriteItems.map((item) => (
              <Card
                className="grid grid-cols-[104px_1fr] gap-4 overflow-hidden p-3"
                key={item.id}
              >
                <div className="relative aspect-square overflow-hidden rounded-card bg-sb-panel-soft">
                  <Image
                    alt={item.image.alt || item.name}
                    className="object-cover"
                    fill
                    sizes="104px"
                    src={item.image.publicUrl}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-snug text-sb-rice">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-sb-muted">
                    {item.categoryLabel}
                  </p>
                  <p className="mt-2 font-mono text-sm text-sb-gold-soft">
                    {formatMoney(item.priceCents)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleAddFavoriteToCart(item)}
                      size="sm"
                    >
                      Add
                    </Button>
                    <Button
                      onClick={() => toggleFavorite(item.id)}
                      size="sm"
                      variant="ghost"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            action={
              <Button href="/menu" variant="secondary">
                Explore menu
              </Button>
            }
            className="mt-6"
            message="Save menu items from the menu explorer to build a quick reorder list."
            title="No favorites saved"
          />
        )}
      </PageContainer>
    </section>
  );
}
