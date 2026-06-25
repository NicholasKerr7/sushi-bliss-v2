"use client";

import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { locations } from "@/data/locations";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { icons } from "@/features/home/homeDashboardData";
import type { RestaurantLocation } from "@/types/location";

import { LocationDetailDrawer } from "./LocationDetailDrawer";
import { TabletLocationRow } from "./TabletLocationRow";
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
      className="flex min-h-dvh flex-col bg-[#050607] px-[18px] pb-3 pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pb-4 min-[1080px]:pt-3"
      id="locations"
    >
      <TabletLocationsHeader cartCount={cartCount} onOpenCart={onOpenCart} />

      <main className="mx-auto w-full max-w-[1034px]">
        <section className="mt-3 text-center lg:mt-4 min-[1080px]:mt-8">
          <h1 className="editorial-title text-[42px] uppercase leading-none tracking-[0.12em] min-[1080px]:text-[58px] min-[1080px]:tracking-[0.14em]">
            Locations
          </h1>
          <p className="mt-2 text-[15px] text-[var(--sb-gold-soft)] min-[1080px]:mt-3 min-[1080px]:text-[18px]">
            Exceptional sushi, wherever you are.
          </p>
        </section>

        <section className="mt-3 grid grid-cols-[1fr_220px_54px] gap-3 lg:mt-4 min-[1080px]:mt-6 min-[1080px]:grid-cols-[1fr_260px_62px] min-[1080px]:gap-4">
          <form
            className="flex h-[50px] items-center gap-3 rounded-[12px] border border-[var(--sb-gold)]/24 bg-white/[0.04] px-4 min-[1080px]:h-[58px] min-[1080px]:gap-4 min-[1080px]:rounded-[14px] min-[1080px]:px-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <AssetIcon size={24} src={icons.search} />
            <label className="sr-only" htmlFor="tablet-location-search">
              Search locations
            </label>
            <input
              className="h-full w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/48 min-[1080px]:text-[15px]"
              id="tablet-location-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by city, address, or feature..."
              value={query}
            />
          </form>
          <label className="relative block">
            <span className="sr-only">Filter locations</span>
            <select
              className="h-[50px] w-full appearance-none rounded-[12px] border border-[var(--sb-gold)]/24 bg-white/[0.04] px-4 pr-11 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] outline-none transition focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25 min-[1080px]:h-[58px] min-[1080px]:rounded-[14px] min-[1080px]:px-5 min-[1080px]:pr-12 min-[1080px]:text-[14px]"
              onChange={(event) => setNeighborhood(event.target.value)}
              value={neighborhood}
            >
              {neighborhoods.map((item) => (
                <option
                  className="bg-[#050607] text-white"
                  key={item}
                  value={item}
                >
                  {item === allNeighborhoods ? "All locations" : item}
                </option>
              ))}
            </select>
            <ChevronIcon
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--sb-gold)] min-[1080px]:right-5"
              direction="down"
              size={18}
            />
          </label>
          <button
            aria-label="Prioritize nearby locations"
            aria-pressed={nearbyFirst}
            className="grid h-[50px] place-items-center rounded-[12px] border border-[var(--sb-gold)]/24 bg-white/[0.04] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[1080px]:h-[58px] min-[1080px]:rounded-[14px]"
            onClick={() => setNearbyFirst((current) => !current)}
            type="button"
          >
            <AssetIcon size={24} src={icons.location} />
          </button>
        </section>

        <section className="mt-3 grid gap-2 lg:mt-4 lg:gap-3 min-[1080px]:mt-5 min-[1080px]:gap-4">
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

        <section className="mt-3 hidden grid-cols-[1fr_auto] items-center gap-4 rounded-[14px] border border-white/10 bg-white/[0.04] p-4 lg:grid min-[1080px]:mt-5 min-[1080px]:gap-5 min-[1080px]:rounded-[16px] min-[1080px]:p-5">
          <div className="flex items-center gap-4 min-[1080px]:gap-5">
            <AssetIcon size={44} src={icons.flower} />
            <div>
              <h2 className="text-[16px] font-semibold text-white min-[1080px]:text-[18px]">
                Hosting an event or special occasion?
              </h2>
              <p className="mt-1 text-[13px] text-white/52 min-[1080px]:text-[14px]">
                Contact our team to book private dining experiences.
              </p>
            </div>
          </div>
          <Button href="/support" variant="secondary">
            Inquire now
          </Button>
        </section>
      </main>

      <TabletBottomNavigation
        ariaLabel="Tablet locations navigation"
        fixed={false}
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
      <CartDrawer onOpenChange={onCartOpenChange} open={cartOpen} />
    </section>
  );
}

function locationPriority(id: string) {
  const priority = ["tokyo-rooftop", "sushi-bar", "kintsugi-courtyard"];
  const index = priority.indexOf(id);

  return index === -1 ? priority.length : index;
}
