"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Chef } from "@/types/chef";

interface ChefDetailModalProps {
  chef: Chef | null;
  onOpenChange: (open: boolean) => void;
}

export function ChefDetailModal({ chef, onOpenChange }: ChefDetailModalProps) {
  const chefDetails = chef
    ? [
        { label: "Signature", value: chef.specialty },
        { label: "Sushi", value: chef.sushi },
        { label: "Sashimi", value: chef.sashimi },
        { label: "Appetizer", value: chef.appetizer },
        { label: "Dessert", value: chef.dessert },
      ]
    : [];

  return (
    <Modal
      className="max-w-3xl"
      description={chef?.position}
      footer={
        chef ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Button href="#reservations" onClick={() => onOpenChange(false)}>
              Reserve counter
            </Button>
            <Button
              href="#omakase"
              onClick={() => onOpenChange(false)}
              variant="ghost"
            >
              View omakase
            </Button>
          </div>
        ) : null
      }
      onOpenChange={onOpenChange}
      open={Boolean(chef)}
      title={chef?.name || "Chef profile"}
    >
      {chef ? (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-sb-panel-soft">
              <Image
                alt={chef.standingImage.alt || chef.name}
                className="object-cover"
                fill
                sizes="(min-width: 768px) 22rem, 100vw"
                src={chef.standingImage.publicUrl}
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-sb-panel-soft">
              <Image
                alt={chef.platingImage.alt || `${chef.name} plating sushi`}
                className="object-cover"
                fill
                sizes="(min-width: 768px) 22rem, 100vw"
                src={chef.platingImage.publicUrl}
              />
            </div>
          </div>

          <p className="text-sm leading-6 text-sb-muted">{chef.about}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            {chefDetails.map((detail) => (
              <div
                className="rounded-card border border-sb-line bg-sb-ink/50 p-4"
                key={detail.label}
              >
                <StatusBadge tone="neutral">{detail.label}</StatusBadge>
                <p className="mt-3 text-sm leading-6 text-sb-muted">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
