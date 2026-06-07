"use client";

import { useMemo, useState } from "react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CartDrawer } from "@/features/cart/CartDrawer";
import type { RestaurantLocation } from "@/types/location";

import { MobileLocationDetailView } from "./MobileLocationDetailView";
import { MobileLocationListView } from "./MobileLocationListView";
import { MobileLocationMapView } from "./MobileLocationMapView";

type MobileLocationSurface = "detail" | "list" | "map";

interface MobileLocationsDirectoryProps {
  cartCount: number;
  cartOpen: boolean;
  locations: RestaurantLocation[];
  onCartOpenChange: (open: boolean) => void;
  onOpenCart: () => void;
}

/** Coordinates the mobile-only list, map, and detail screens for locations. */
export function MobileLocationsDirectory({
  cartCount,
  cartOpen,
  locations,
  onCartOpenChange,
  onOpenCart,
}: MobileLocationsDirectoryProps) {
  const [surface, setSurface] = useState<MobileLocationSurface>("list");
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState(
    locations[0] || null,
  );

  const neighborhoods = useMemo(
    () => [
      "all",
      ...new Set(locations.map((location) => location.neighborhood)),
    ],
    [locations],
  );

  const visibleLocations = useMemo(
    () =>
      locations.filter((location) => {
        const normalizedQuery = query.trim().toLowerCase();
        const matchesNeighborhood =
          selectedNeighborhood === "all" ||
          location.neighborhood === selectedNeighborhood;
        const searchable = [
          location.name,
          location.address,
          location.neighborhood,
          location.hours,
          location.description,
          ...location.features,
        ]
          .join(" ")
          .toLowerCase();

        return (
          matchesNeighborhood &&
          (!normalizedQuery || searchable.includes(normalizedQuery))
        );
      }),
    [locations, query, selectedNeighborhood],
  );

  const currentLocation =
    selectedLocation || visibleLocations[0] || locations[0];

  const openDetail = (location: RestaurantLocation) => {
    setSelectedLocation(location);
    setSurface("detail");
  };

  const openMap = () => {
    setSelectedLocation(currentLocation);
    setSurface("map");
  };

  const showNearest = () => {
    const nearest = locations.find(
      (location) => location.id === "tokyo-rooftop",
    );

    if (nearest) {
      setSelectedLocation(nearest);
    }

    setSurface("map");
  };

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-black px-5 pb-[124px] pt-5 text-white md:hidden"
      id="locations"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/assets/textures/red-moon-sakura-background.webp')] bg-cover bg-left-top opacity-54"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_96%_16%,rgba(202,164,93,0.12),transparent_22%),radial-gradient(circle_at_0%_42%,rgba(188,20,18,0.18),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.32)_0%,#050505_35%,#030303_100%)]"
      />
      <div
        aria-hidden="true"
        className="sb-wave-pattern pointer-events-none absolute left-0 top-[18rem] h-64 w-full opacity-20"
      />

      {surface === "detail" && currentLocation ? (
        <MobileLocationDetailView
          cartCount={cartCount}
          location={currentLocation}
          onBack={() => setSurface("list")}
          onOpenCart={onOpenCart}
          onOpenMap={() => setSurface("map")}
        />
      ) : surface === "map" && currentLocation ? (
        <MobileLocationMapView
          cartCount={cartCount}
          locations={visibleLocations.length > 0 ? visibleLocations : locations}
          onBack={() => setSurface("list")}
          onOpenCart={onOpenCart}
          onOpenDetail={openDetail}
          onSelectLocation={setSelectedLocation}
          onShowNearest={showNearest}
          selectedLocation={currentLocation}
        />
      ) : (
        <MobileLocationListView
          cartCount={cartCount}
          filterOpen={filterOpen}
          locations={visibleLocations}
          neighborhoods={neighborhoods}
          onClearFilters={() => {
            setQuery("");
            setSelectedNeighborhood("all");
          }}
          onNeighborhoodChange={setSelectedNeighborhood}
          onOpenCart={onOpenCart}
          onOpenDetail={openDetail}
          onOpenMap={openMap}
          onQueryChange={setQuery}
          onShowNearest={showNearest}
          onToggleFilter={() => setFilterOpen((current) => !current)}
          query={query}
          selectedNeighborhood={selectedNeighborhood}
        />
      )}

      <BottomNavigation
        activeId="home"
        ariaLabel="Mobile locations navigation"
      />
      <CartDrawer onOpenChange={onCartOpenChange} open={cartOpen} />
    </section>
  );
}
