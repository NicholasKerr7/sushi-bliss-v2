import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { PremiumReservationCard as PremiumReservationCardType } from "@/types/omakase";

interface PremiumReservationCardProps {
  card: PremiumReservationCardType;
}

export function PremiumReservationCard({ card }: PremiumReservationCardProps) {
  return (
    <Card className="grid gap-4 overflow-hidden p-4 sm:grid-cols-[9rem_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sb-panel-soft sm:aspect-square">
        <Image
          alt={card.image.alt || card.title}
          className="object-cover"
          fill
          sizes="(min-width: 768px) 9rem, 100vw"
          src={card.image.publicUrl}
        />
      </div>
      <div className="min-w-0">
        <StatusBadge tone="premium">{card.label}</StatusBadge>
        <h3 className="mt-3 text-lg font-semibold text-sb-rice">
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-sb-muted">
          {card.description}
        </p>
        <Button className="mt-4" href={card.href} size="sm" variant="secondary">
          Reserve
        </Button>
      </div>
    </Card>
  );
}
