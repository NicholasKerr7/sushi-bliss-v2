"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { locations } from "@/data/locations";

export function AdminLocationsManagement() {
  const [closedLocationIds, setClosedLocationIds] = useState<string[]>([]);
  const [reviewLocationIds, setReviewLocationIds] = useState<string[]>([]);

  const toggleClosed = (locationId: string) => {
    setClosedLocationIds((current) =>
      current.includes(locationId)
        ? current.filter((id) => id !== locationId)
        : [...current, locationId],
    );
  };

  const toggleReview = (locationId: string) => {
    setReviewLocationIds((current) =>
      current.includes(locationId)
        ? current.filter((id) => id !== locationId)
        : [...current, locationId],
    );
  };

  return (
    <Card className="p-5 md:p-6" id="locations-admin">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-sb-rice">
            Locations management
          </h2>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            Review dining room availability, hours, and operational flags.
          </p>
        </div>
        <StatusBadge tone="neutral">{locations.length} locations</StatusBadge>
      </div>

      <div className="mt-5 grid gap-3">
        {locations.map((location) => {
          const closed = closedLocationIds.includes(location.id);
          const needsReview = reviewLocationIds.includes(location.id);

          return (
            <div
              className="grid gap-4 rounded-card border border-sb-line bg-sb-ink/50 p-3 lg:grid-cols-[5rem_1fr_auto]"
              key={location.id}
            >
              <div className="relative aspect-square overflow-hidden rounded-card bg-sb-panel-soft">
                <Image
                  alt={location.name}
                  className="object-cover"
                  fill
                  sizes="80px"
                  src={location.imageUrl}
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-sb-rice">{location.name}</p>
                  <StatusBadge tone={closed ? "warning" : "success"}>
                    {closed ? "Closed" : "Accepting"}
                  </StatusBadge>
                  {needsReview ? (
                    <StatusBadge tone="danger">Review</StatusBadge>
                  ) : null}
                </div>
                <p className="mt-1 text-sm leading-6 text-sb-muted">
                  {location.neighborhood} - {location.hours}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase text-sb-dim">
                  {location.features.join(" / ")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Button
                  aria-label={`${closed ? "Open" : "Close"} ${location.name}`}
                  onClick={() => toggleClosed(location.id)}
                  size="sm"
                  variant={closed ? "secondary" : "ghost"}
                >
                  {closed ? "Open" : "Close"}
                </Button>
                <Button
                  aria-label={`Toggle review for ${location.name}`}
                  onClick={() => toggleReview(location.id)}
                  size="sm"
                  variant={needsReview ? "danger" : "secondary"}
                >
                  {needsReview ? "Clear review" : "Review"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
