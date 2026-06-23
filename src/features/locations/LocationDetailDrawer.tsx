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
      className="md:max-w-[40rem]"
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
          <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-sb-panel-soft shadow-[0_24px_65px_rgba(0,0,0,0.44)]">
            <Image
              alt={`${location.name} map`}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 36rem, 100vw"
              src={location.mapImageUrl}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.48))]" />
            <div className="absolute bottom-4 left-4 right-4">
              <StatusBadge tone="premium">{location.neighborhood}</StatusBadge>
              <p className="mt-2 text-lg leading-6 text-white">
                {location.name}
              </p>
            </div>
          </div>

          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.066),rgba(255,255,255,0.018))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_55px_rgba(0,0,0,0.36)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Dining room
            </p>
            <p className="mt-2 text-sm leading-6 text-sb-muted">
              {location.description}
            </p>
          </section>

          <dl className="grid gap-3 rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.016))] p-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_50px_rgba(0,0,0,0.34)]">
            <div className="rounded-[15px] border border-white/10 bg-black/24 p-3">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                Address
              </dt>
              <dd className="mt-1 leading-5 text-sb-rice">
                {location.address}
              </dd>
            </div>
            <div className="rounded-[15px] border border-white/10 bg-black/24 p-3">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                Hours
              </dt>
              <dd className="mt-1 leading-5 text-sb-rice">{location.hours}</dd>
            </div>
            <div className="rounded-[15px] border border-white/10 bg-black/24 p-3">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                Contact
              </dt>
              <dd className="mt-1 break-words leading-5 text-sb-rice">
                {location.phone} - {location.email}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2 rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-3">
            {location.features.map((feature) => (
              <span
                className="rounded-full border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--sb-gold-soft)]"
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
