"use client";

import { useState } from "react";

import { locations } from "@/data/locations";
import { useCart } from "@/hooks/useCart";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import type { RestaurantLocation } from "@/types/location";

import { DesktopLocationsDirectory } from "./DesktopLocationsDirectory";
import { LocationDetailDrawer } from "./LocationDetailDrawer";
import { MobileLocationsDirectory } from "./MobileLocationsDirectory";
import { TabletLocationsDirectory } from "./TabletLocationsDirectory";

export function LocationsDirectory() {
  const mode = useResponsiveMode();
  const { itemCount } = useCart();
  const [selectedLocation, setSelectedLocation] =
    useState<RestaurantLocation | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  if (mode === "mobile") {
    return (
      <MobileLocationsDirectory
        cartCount={itemCount}
        cartOpen={cartOpen}
        locations={locations}
        onCartOpenChange={setCartOpen}
        onOpenCart={() => setCartOpen(true)}
      />
    );
  }

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
    <>
      <DesktopLocationsDirectory
        cartCount={itemCount}
        locations={locations}
        onViewDetails={setSelectedLocation}
      />
      <LocationDetailDrawer
        location={selectedLocation}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedLocation(null);
          }
        }}
        open={Boolean(selectedLocation)}
      />
    </>
  );
}
