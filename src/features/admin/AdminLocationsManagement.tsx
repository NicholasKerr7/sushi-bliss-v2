"use client";

import Image from "next/image";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { locations } from "@/data/locations";

export function AdminLocationsManagement() {
  const [closedLocationIds, setClosedLocationIds] = useState<string[]>([]);
  const [reviewLocationIds, setReviewLocationIds] = useState<string[]>([]);
  const acceptingLocationCount = locations.length - closedLocationIds.length;
  const locationSummary = [
    {
      detail: "Taking bookings",
      icon: "/assets/icons/map-pin-icon.png",
      label: "Accepting",
      value: acceptingLocationCount,
    },
    {
      detail: "Temporarily closed",
      icon: "/assets/icons/gold-alert-icon.png",
      label: "Closed",
      value: closedLocationIds.length,
    },
    {
      detail: "Needs operator pass",
      icon: "/assets/icons/gold-alert-icon.png",
      label: "Review",
      value: reviewLocationIds.length,
    },
  ] as const;

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
    <Card className="overflow-hidden p-0" id="locations-admin">
      <div className="relative border-b border-white/10 bg-[radial-gradient(circle_at_14%_0%,rgba(215,168,79,0.12),transparent_34%),rgba(0,0,0,0.2)] p-5 md:p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.7),transparent)]"
        />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px] xl:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-sb-gold/30 bg-sb-gold/10">
                <AssetIcon
                  loading="eager"
                  size={26}
                  src="/assets/icons/map-pin-icon.png"
                />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sb-gold-soft">
                  Dining rooms
                </p>
                <h2 className="mt-1 text-xl font-semibold text-sb-rice">
                  Locations management
                </h2>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-sb-muted">
              Review dining room availability, public hours, map assets, and
              operational flags before changes reach guests.
            </p>
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-[14px] border border-white/10 bg-black/24">
            {locationSummary.map((item) => (
              <div
                className="min-w-0 border-l border-white/10 px-3 py-3 first:border-l-0 sm:px-4"
                key={item.label}
              >
                <div className="flex items-center gap-2">
                  <AssetIcon size={18} src={item.icon} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                    {item.label}
                  </p>
                </div>
                <p className="mt-1 font-mono text-lg font-semibold text-sb-rice">
                  {item.value}
                </p>
                <p className="mt-0.5 hidden truncate text-[11px] text-sb-dim sm:block">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-4 md:p-5">
        {locations.map((location) => {
          const closed = closedLocationIds.includes(location.id);
          const needsReview = reviewLocationIds.includes(location.id);

          return (
            <div
              className="grid gap-4 rounded-[14px] border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] min-[900px]:grid-cols-[5rem_minmax(0,1fr)_236px] min-[900px]:items-center"
              key={location.id}
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-[12px] border border-white/10 bg-sb-panel-soft">
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
                <p className="mt-2 line-clamp-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                  {location.features.join(" / ")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 min-[900px]:justify-end">
                <Button
                  aria-label={`${closed ? "Open" : "Close"} ${location.name}`}
                  className="h-11 rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
                  onClick={() => toggleClosed(location.id)}
                  size="sm"
                  variant={closed ? "secondary" : "ghost"}
                >
                  {closed ? "Open" : "Close"}
                </Button>
                <Button
                  aria-label={`Toggle review for ${location.name}`}
                  className="h-11 rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
                  onClick={() => toggleReview(location.id)}
                  size="sm"
                  variant={needsReview ? "danger" : "secondary"}
                >
                  {needsReview ? "Clear" : "Review"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
