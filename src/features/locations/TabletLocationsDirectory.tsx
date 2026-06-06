"use client";

import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { locations } from "@/data/locations";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { icons } from "@/features/home/visualHomeData";
import { TabletMenuStatusBar } from "@/features/menu/TabletMenuChrome";
import type { RestaurantLocation } from "@/types/location";

import { LocationDetailDrawer } from "./LocationDetailDrawer";
import { TabletLocationRow } from "./TabletLocationRow";
import { TabletLocationsBottomNav } from "./TabletLocationsBottomNav";
import { TabletLocationsHeader } from "./TabletLocationsHeader";

interface TabletLocationsDirectoryProps {
  cartCount: number;
  cartOpen: boolean;
  onCartOpenChange: (open: boolean) => void;
  onOpenCart: () => void;
}

const allNeighborhoods = "all";

/** Tablet-specific locations list with search, filtering, and map previews. */
export function TabletLocationsDirectory({
  cartCount,
  cartOpen,
  onCartOpenChange,
  onOpenCart,
}: TabletLocationsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [nearbyFirst, setNearbyFirst] = useState(false);
  const [neighborhood, setNeighborhood] = useState(allNeighborhoods);
  const [selectedLocation, setSelectedLocation] =
    useState<RestaurantLocation | null>(null);

  const neighborhoods = useMemo(
    () => [
      allNeighborhoods,
      ...locations.map((location) => location.neighborhood),
    ],
    [],
  );

  const visibleLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = locations.filter((location) => {
      const matchesNeighborhood =
        neighborhood === allNeighborhoods ||
        location.neighborhood === neighborhood;
      const searchableText = [
        location.address,
        location.description,
        location.features.join(" "),
        location.name,
        location.neighborhood,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesNeighborhood &&
        (!normalizedQuery || searchableText.includes(normalizedQuery))
      );
    });

    if (!nearbyFirst) {
      return filtered;
    }

    return [...filtered].sort(
      (left, right) => locationPriority(left.id) - locationPriority(right.id),
    );
  }, [nearbyFirst, neighborhood, query]);

  const resetFilters = () => {
    setQuery("");
    setNeighborhood(allNeighborhoods);
    setNearbyFirst(false);
  };

  return (
    <section
      className="min-h-dvh bg-[#050607] px-[26px] pb-4 pt-3 text-white"
      id="locations"
    >
      <TabletMenuStatusBar />
      <TabletLocationsHeader cartCount={cartCount} onOpenCart={onOpenCart} />

      <main className="mx-auto max-w-[1034px]">
        <section className="mt-8 text-center">
          <h1 className="editorial-title text-[58px] uppercase leading-none tracking-[0.14em]">
            Locations
          </h1>
          <p className="mt-3 text-[18px] text-[var(--sb-gold-soft)]">
            Exceptional sushi, wherever you are.
          </p>
        </section>

        <section className="mt-6 grid grid-cols-[1fr_260px_62px] gap-4">
          <form
            className="flex h-[58px] items-center gap-4 rounded-[14px] border border-[var(--sb-gold)]/24 bg-white/[0.04] px-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <AssetIcon size={28} src={icons.search} />
            <label className="sr-only" htmlFor="tablet-location-search">
              Search locations
            </label>
            <input
              className="h-full w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/48"
              id="tablet-location-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by city, address, or feature..."
              value={query}
            />
          </form>
          <label className="sr-only" htmlFor="tablet-location-filter">
            Filter locations
          </label>
          <select
            className="h-[58px] rounded-[14px] border border-[var(--sb-gold)]/24 bg-white/[0.04] px-5 text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] outline-none focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25"
            id="tablet-location-filter"
            onChange={(event) => setNeighborhood(event.target.value)}
            value={neighborhood}
          >
            {neighborhoods.map((item) => (
              <option key={item} value={item}>
                {item === allNeighborhoods ? "All locations" : item}
              </option>
            ))}
          </select>
          <button
            aria-label="Prioritize nearby locations"
            aria-pressed={nearbyFirst}
            className="grid h-[58px] place-items-center rounded-[14px] border border-[var(--sb-gold)]/24 bg-white/[0.04] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            onClick={() => setNearbyFirst((current) => !current)}
            type="button"
          >
            <AssetIcon size={28} src={icons.location} />
          </button>
        </section>

        <section className="mt-5 grid gap-4">
          {visibleLocations.length > 0 ? (
            visibleLocations.map((location, index) => (
              <TabletLocationRow
                featured={index === 0 && neighborhood === allNeighborhoods}
                imagePriority={index < 3}
                key={location.id}
                location={location}
                onViewDetails={setSelectedLocation}
              />
            ))
          ) : (
            <EmptyState
              action={
                <Button onClick={resetFilters} variant="secondary">
                  Clear filters
                </Button>
              }
              message="Try a different city, neighborhood, or feature."
              title="No matching locations"
            />
          )}
        </section>

        <section className="mt-5 grid grid-cols-[1fr_auto] items-center gap-5 rounded-[16px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-5">
            <AssetIcon size={52} src={icons.flower} />
            <div>
              <h2 className="text-[18px] font-semibold text-white">
                Hosting an event or special occasion?
              </h2>
              <p className="mt-1 text-[14px] text-white/52">
                Contact our team to book private dining experiences.
              </p>
            </div>
          </div>
          <Button href="/support" variant="secondary">
            Inquire now
          </Button>
        </section>
      </main>

      <TabletLocationsBottomNav />
      <LocationDetailDrawer
        location={selectedLocation}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedLocation(null);
          }
        }}
        open={Boolean(selectedLocation)}
      />
      <CartDrawer onOpenChange={onCartOpenChange} open={cartOpen} />
    </section>
  );
}

function locationPriority(id: string) {
  const priority = ["tokyo-rooftop", "sushi-bar", "kintsugi-courtyard"];
  const index = priority.indexOf(id);

  return index === -1 ? priority.length : index;
}
