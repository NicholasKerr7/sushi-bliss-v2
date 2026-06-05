"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { menuItems } from "@/data/menu";

const visibleMenuItems = menuItems.slice(0, 6);

export function AdminMenuManagement() {
  const [pausedItemIds, setPausedItemIds] = useState<string[]>([]);
  const [spotlightItemId, setSpotlightItemId] = useState(
    visibleMenuItems[0]?.id || "",
  );

  const togglePausedItem = (itemId: string) => {
    setPausedItemIds((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId],
    );
  };

  return (
    <Card className="p-5 md:p-6" id="menu-admin">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-sb-rice">
            Menu management
          </h2>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            Adjust live availability and featured placement for signature items.
          </p>
        </div>
        <StatusBadge tone="premium">
          {menuItems.length} catalog items
        </StatusBadge>
      </div>

      <div className="mt-5 grid gap-3">
        {visibleMenuItems.map((item) => {
          const paused = pausedItemIds.includes(item.id);
          const spotlight = spotlightItemId === item.id;

          return (
            <div
              className="grid gap-4 rounded-card border border-sb-line bg-sb-ink/50 p-3 sm:grid-cols-[4.5rem_1fr_auto]"
              key={item.id}
            >
              <div className="relative aspect-square overflow-hidden rounded-card bg-sb-panel-soft">
                <Image
                  alt={item.image.alt || item.name}
                  className="object-cover"
                  fill
                  sizes="72px"
                  src={item.image.publicUrl}
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-sb-rice">{item.name}</p>
                  <StatusBadge tone={paused ? "warning" : "success"}>
                    {paused ? "Paused" : "Live"}
                  </StatusBadge>
                  {spotlight ? (
                    <StatusBadge tone="premium">Featured</StatusBadge>
                  ) : null}
                </div>
                <p className="mt-1 text-sm leading-6 text-sb-muted">
                  {item.categoryLabel} - {item.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <Button
                  aria-label={`${paused ? "Resume" : "Pause"} ${item.name}`}
                  onClick={() => togglePausedItem(item.id)}
                  size="sm"
                  variant={paused ? "secondary" : "ghost"}
                >
                  {paused ? "Resume" : "Pause"}
                </Button>
                <Button
                  aria-label={`Feature ${item.name}`}
                  disabled={spotlight}
                  onClick={() => setSpotlightItemId(item.id)}
                  size="sm"
                >
                  {spotlight ? "Featured" : "Feature"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
