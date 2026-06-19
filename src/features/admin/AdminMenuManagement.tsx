"use client";

import Image from "next/image";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
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
  const featuredItem = visibleMenuItems.find(
    (item) => item.id === spotlightItemId,
  );
  const liveItemCount = visibleMenuItems.length - pausedItemIds.length;

  return (
    <Card className="overflow-hidden p-0" id="menu-admin">
      <div className="relative border-b border-white/10 bg-[radial-gradient(circle_at_12%_0%,rgba(215,168,79,0.12),transparent_34%),rgba(0,0,0,0.2)] p-5 md:p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.7),transparent)]"
        />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-sb-gold/30 bg-sb-gold/10">
                <AssetIcon
                  loading="eager"
                  size={26}
                  src="/assets/icons/sushi-menu-icon.png"
                />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sb-gold-soft">
                  Catalog controls
                </p>
                <h2 className="mt-1 text-xl font-semibold text-sb-rice">
                  Menu management
                </h2>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-sb-muted">
              Adjust live availability and featured placement for signature
              items.
            </p>
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-[14px] border border-white/10 bg-black/24">
            <div className="px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                Live
              </p>
              <p className="mt-1 font-mono text-lg font-semibold text-sb-rice">
                {liveItemCount}
              </p>
            </div>
            <div className="border-l border-white/10 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                On hold
              </p>
              <p className="mt-1 font-mono text-lg font-semibold text-sb-rice">
                {pausedItemIds.length}
              </p>
            </div>
            <div className="min-w-0 border-l border-white/10 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                Feature
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-sb-gold-soft">
                {featuredItem?.name || "None"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-4 md:p-5">
        {visibleMenuItems.map((item) => {
          const paused = pausedItemIds.includes(item.id);
          const spotlight = spotlightItemId === item.id;

          return (
            <div
              className="grid gap-4 rounded-[14px] border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:grid-cols-[5rem_minmax(0,1fr)_236px] md:items-center"
              key={item.id}
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-[12px] border border-white/10 bg-sb-panel-soft">
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
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-sb-muted">
                  {item.categoryLabel} - {item.description}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                  {item.id}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 md:justify-end">
                <Button
                  aria-label={`${paused ? "Resume" : "Pause"} ${item.name}`}
                  className="h-11 rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
                  onClick={() => togglePausedItem(item.id)}
                  size="sm"
                  variant={paused ? "secondary" : "ghost"}
                >
                  {paused ? "Resume" : "Pause"}
                </Button>
                <Button
                  aria-label={`Feature ${item.name}`}
                  className="h-11 rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
                  disabled={spotlight}
                  onClick={() => setSpotlightItemId(item.id)}
                  size="sm"
                  variant={spotlight ? "ghost" : "primary"}
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
