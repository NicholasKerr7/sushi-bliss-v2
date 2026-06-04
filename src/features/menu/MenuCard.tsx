"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

interface MenuCardProps {
  isFavorite: boolean;
  item: MenuItem;
  onToggleFavorite: (itemId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

export function MenuCard({
  isFavorite,
  item,
  onToggleFavorite,
  onViewDetails,
}: MenuCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-sb-panel-soft">
        <Image
          alt={item.image.alt || item.name}
          className="object-cover"
          fill
          sizes="(min-width: 1180px) 25vw, (min-width: 760px) 33vw, 100vw"
          src={item.image.publicUrl}
        />
        <div className="absolute left-3 top-3">
          <StatusBadge
            tone={item.tags.includes("premium") ? "premium" : "neutral"}
          >
            {item.categoryLabel}
          </StatusBadge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold leading-snug text-sb-rice">
              {item.name}
            </h3>
            <span className="shrink-0 font-mono text-sm text-sb-gold-soft">
              {formatMoney(item.priceCents)}
            </span>
          </div>
          <p className="line-clamp-3 text-sm leading-6 text-sb-muted">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag.replaceAll("-", " ")}</Badge>
          ))}
          {item.sakePairing ? <Badge tone="premium">Sake pairing</Badge> : null}
        </div>

        <div className="mt-auto space-y-3">
          <p className="text-xs leading-5 text-sb-dim">
            {item.ingredients.slice(0, 4).join(", ") || item.texture}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => onViewDetails(item)}>Details</Button>
            <Button
              aria-pressed={isFavorite}
              onClick={() => onToggleFavorite(item.id)}
              variant={isFavorite ? "secondary" : "ghost"}
            >
              {isFavorite ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
