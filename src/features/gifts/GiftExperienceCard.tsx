"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatMoney } from "@/lib/money";
import type { GiftExperience } from "@/types/gift";

interface GiftExperienceCardProps {
  gift: GiftExperience;
  onSelectGift: (gift: GiftExperience) => void;
}

export function GiftExperienceCard({
  gift,
  onSelectGift,
}: GiftExperienceCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-sb-panel-soft">
        <Image
          alt={gift.image.alt || gift.title}
          className="object-cover"
          fill
          sizes="(min-width: 1180px) 28vw, (min-width: 760px) 42vw, 100vw"
          src={gift.image.publicUrl}
        />
        <div className="absolute left-3 top-3">
          <StatusBadge tone="premium">{gift.category}</StatusBadge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-sb-rice">{gift.title}</h3>
            <span className="shrink-0 font-mono text-sm text-sb-gold-soft">
              {formatMoney(gift.priceCents)}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            {gift.description}
          </p>
        </div>

        <div className="rounded-card border border-sb-line bg-sb-ink/45 p-3">
          <Badge>Delivery</Badge>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            {gift.deliveryNote}
          </p>
        </div>

        <ul className="space-y-2 text-sm leading-6 text-sb-muted">
          {gift.inclusions.map((inclusion) => (
            <li key={inclusion}>{inclusion}</li>
          ))}
        </ul>

        <Button className="mt-auto" onClick={() => onSelectGift(gift)}>
          Send gift
        </Button>
      </div>
    </Card>
  );
}
