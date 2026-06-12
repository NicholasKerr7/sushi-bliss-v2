"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Chef } from "@/types/chef";

interface ChefCardProps {
  chef: Chef;
  eagerImage?: boolean;
  onViewChef: (chef: Chef) => void;
}

export function ChefCard({
  chef,
  eagerImage = false,
  onViewChef,
}: ChefCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/5] bg-sb-panel-soft">
        <Image
          alt={chef.standingImage.alt || chef.name}
          className="object-cover"
          fill
          loading={eagerImage ? "eager" : "lazy"}
          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 100vw"
          src={chef.standingImage.publicUrl}
        />
      </div>
      <div className="p-5">
        <StatusBadge tone="premium">{chef.position}</StatusBadge>
        <h3 className="mt-4 text-xl font-semibold text-sb-rice">{chef.name}</h3>
        <p className="mt-2 text-sm leading-6 text-sb-muted">{chef.specialty}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            aria-label={`View ${chef.name} profile`}
            onClick={() => onViewChef(chef)}
            size="sm"
          >
            Profile
          </Button>
          <Button
            aria-label={`View omakase experiences for ${chef.name}`}
            href="/omakase"
            size="sm"
            variant="ghost"
          >
            Omakase
          </Button>
        </div>
      </div>
    </Card>
  );
}
