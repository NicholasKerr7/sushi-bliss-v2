"use client";

import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { locations } from "@/data/locations";
import type { RestaurantLocation } from "@/types/location";

import { LocationCard } from "./LocationCard";
import { LocationDetailDrawer } from "./LocationDetailDrawer";

export function LocationsDirectory() {
  const [selectedLocation, setSelectedLocation] =
    useState<RestaurantLocation | null>(null);

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
          {locations.map((location) => (
            <LocationCard
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
