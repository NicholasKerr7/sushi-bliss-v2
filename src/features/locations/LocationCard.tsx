"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { RestaurantLocation } from "@/types/location";

interface LocationCardProps {
  location: RestaurantLocation;
  onViewDetails: (location: RestaurantLocation) => void;
}

export function LocationCard({ location, onViewDetails }: LocationCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-sb-panel-soft">
        <Image
          alt={location.name}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          src={location.imageUrl}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <StatusBadge tone="premium">{location.neighborhood}</StatusBadge>
          <h3 className="mt-3 text-base font-semibold text-sb-rice">
            {location.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            {location.description}
          </p>
        </div>
        <div className="mt-auto space-y-3">
          <p className="text-xs leading-5 text-sb-dim">
            {location.address} - {location.hours}
          </p>
          <Button onClick={() => onViewDetails(location)} variant="secondary">
            View location
          </Button>
        </div>
      </div>
    </Card>
  );
}
