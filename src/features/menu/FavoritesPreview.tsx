"use client";

import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useFavorites } from "@/hooks/useFavorites";
import { formatMoney } from "@/lib/money";

export function FavoritesPreview() {
  const { clearFavorites, favoriteItems, hasFavorites, toggleFavorite } =
    useFavorites();
  const previewItems = favoriteItems.slice(0, 3);

  return (
    <section
      className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16"
      id="favorites-preview"
    >
      <PageContainer>
        <SectionHeader
          actions={
            hasFavorites ? (
              <Button onClick={clearFavorites} variant="ghost">
                Clear saved
              </Button>
            ) : (
              <Button href="#menu" variant="secondary">
                Browse menu
              </Button>
            )
          }
          eyebrow={<Badge>Favorites</Badge>}
          subtitle="Saved signatures stay on this device for easy return visits."
          title="Saved signatures"
        />

        {hasFavorites ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {previewItems.map((item) => (
              <Card
                className="grid grid-cols-[88px_1fr] gap-4 overflow-hidden p-3"
                key={item.id}
              >
                <div className="relative aspect-square overflow-hidden rounded-card bg-sb-panel-soft">
                  <Image
                    alt={item.image.alt || item.name}
                    className="object-cover"
                    fill
                    sizes="88px"
                    src={item.image.publicUrl}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-sb-rice">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-sb-muted">
                    {item.categoryLabel}
                  </p>
                  <p className="mt-2 font-mono text-xs text-sb-gold-soft">
                    {formatMoney(item.priceCents)}
                  </p>
                  <Button
                    className="mt-3"
                    onClick={() => toggleFavorite(item.id)}
                    size="sm"
                    variant="ghost"
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            action={
              <Button href="#menu" variant="secondary">
                Explore menu
              </Button>
            }
            className="mt-6"
            message="Start with the chef's premium nigiri or browse the full menu."
            title="No saved signatures yet"
          />
        )}
      </PageContainer>
    </section>
  );
}
