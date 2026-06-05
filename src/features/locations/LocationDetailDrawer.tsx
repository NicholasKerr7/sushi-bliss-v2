"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import type { RestaurantLocation } from "@/types/location";

interface LocationDetailDrawerProps {
  location: RestaurantLocation | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function LocationDetailDrawer({
  location,
  onOpenChange,
  open,
}: LocationDetailDrawerProps) {
  const mode = useResponsiveMode();

  return (
    <Drawer
      className="md:max-w-xl"
      description={location?.neighborhood}
      labelledById="location-detail-title"
      onOpenChange={onOpenChange}
      open={open && Boolean(location)}
      side={mode === "mobile" ? "bottom" : "right"}
      title={location?.name || "Location"}
      footer={
        location ? (
          <Button className="w-full" href="/reservations">
            Reserve this location
          </Button>
        ) : null
      }
    >
      {location ? (
        <div className="space-y-5">
          <div className="relative aspect-[5/3] overflow-hidden rounded-card bg-sb-panel-soft">
            <Image
              alt={`${location.name} map`}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 36rem, 100vw"
              src={location.mapImageUrl}
            />
          </div>

          <div>
            <StatusBadge tone="premium">{location.neighborhood}</StatusBadge>
            <p className="mt-3 text-sm leading-6 text-sb-muted">
              {location.description}
            </p>
          </div>

          <div className="grid gap-3 rounded-card border border-sb-line bg-sb-ink/45 p-4 text-sm">
            <div>
              <p className="font-semibold text-sb-rice">Address</p>
              <p className="mt-1 text-sb-muted">{location.address}</p>
            </div>
            <div>
              <p className="font-semibold text-sb-rice">Hours</p>
              <p className="mt-1 text-sb-muted">{location.hours}</p>
            </div>
            <div>
              <p className="font-semibold text-sb-rice">Contact</p>
              <p className="mt-1 text-sb-muted">
                {location.phone} - {location.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {location.features.map((feature) => (
              <span
                className="rounded-control border border-sb-line bg-sb-rice/5 px-3 py-1 text-xs font-semibold text-sb-muted"
                key={feature}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </Drawer>
  );
}
