"use client";

import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { locations } from "@/data/locations";
import { useCart } from "@/hooks/useCart";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import type { RestaurantLocation } from "@/types/location";

import { LocationCard } from "./LocationCard";
import { LocationDetailDrawer } from "./LocationDetailDrawer";
import { TabletLocationsDirectory } from "./TabletLocationsDirectory";

export function LocationsDirectory() {
  const mode = useResponsiveMode();
  const { itemCount } = useCart();
  const [selectedLocation, setSelectedLocation] =
    useState<RestaurantLocation | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  if (mode === "tablet") {
    return (
      <TabletLocationsDirectory
        cartCount={itemCount}
        cartOpen={cartOpen}
        onCartOpenChange={setCartOpen}
        onOpenCart={() => setCartOpen(true)}
      />
    );
  }

  return (
    <section
      className="border-b border-sb-line bg-sb-ink py-12 md:py-16"
      id="locations"
    >
      <PageContainer>
        <SectionHeader
          eyebrow={<Badge>Locations</Badge>}
          subtitle="Choose from intimate chef counters, rooftop dining, and celebration-ready private rooms."
          title="Dining rooms"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {locations.map((location, index) => (
            <LocationCard
              imagePriority={index < 3}
              key={location.id}
              location={location}
              onViewDetails={setSelectedLocation}
            />
          ))}
        </div>
      </PageContainer>

      <LocationDetailDrawer
        location={selectedLocation}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedLocation(null);
          }
        }}
        open={Boolean(selectedLocation)}
      />
    </section>
  );
}
