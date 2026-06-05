"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatMoney } from "@/lib/money";
import type { OmakasePackage } from "@/types/omakase";

interface OmakasePackageCardProps {
  isSelected: boolean;
  onReview: () => void;
  onSelect: (packageId: string) => void;
  omakasePackage: OmakasePackage;
}

export function OmakasePackageCard({
  isSelected,
  onReview,
  onSelect,
  omakasePackage,
}: OmakasePackageCardProps) {
  return (
    <Card
      className={
        isSelected
          ? "flex h-full flex-col overflow-hidden border-sb-gold/70"
          : "flex h-full flex-col overflow-hidden"
      }
    >
      <div className="relative aspect-[4/3] bg-sb-panel-soft">
        <Image
          alt={omakasePackage.image.alt || omakasePackage.title}
          className="object-cover"
          fill
          sizes="(min-width: 1180px) 25vw, (min-width: 760px) 33vw, 100vw"
          src={omakasePackage.image.publicUrl}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <StatusBadge tone={omakasePackage.accent}>
            {omakasePackage.subtitle}
          </StatusBadge>
          {isSelected ? <Badge tone="premium">Selected</Badge> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-sb-rice">
              {omakasePackage.title}
            </h3>
            <span className="shrink-0 font-mono text-sm text-sb-gold-soft">
              {formatMoney(omakasePackage.priceCents)}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            {omakasePackage.description}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-xs text-sb-muted">
          <div className="rounded-card border border-sb-line bg-sb-ink/40 p-3">
            <dt className="font-semibold uppercase text-sb-dim">Guests</dt>
            <dd className="mt-1 text-sb-rice">
              {omakasePackage.guestRange.min}-{omakasePackage.guestRange.max}
            </dd>
          </div>
          <div className="rounded-card border border-sb-line bg-sb-ink/40 p-3">
            <dt className="font-semibold uppercase text-sb-dim">Duration</dt>
            <dd className="mt-1 text-sb-rice">
              {omakasePackage.durationMinutes} min
            </dd>
          </div>
        </dl>

        <ul className="space-y-2 text-sm leading-6 text-sb-muted">
          {omakasePackage.inclusions.map((inclusion) => (
            <li key={inclusion}>{inclusion}</li>
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <Button
            onClick={() => onSelect(omakasePackage.id)}
            variant={isSelected ? "secondary" : "ghost"}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
          <Button onClick={onReview}>Review</Button>
        </div>
      </div>
    </Card>
  );
}
