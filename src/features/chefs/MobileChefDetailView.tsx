"use client";

import Image from "next/image";
import Link from "next/link";

import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Chef } from "@/types/chef";

import {
  MobileChefsBackButton,
  MobileChefsPanel,
} from "./MobileChefsPrimitives";

interface MobileChefDetailViewProps {
  chef: Chef;
  onBack: () => void;
}

/** Mobile chef profile with service specialties and direct booking actions. */
export function MobileChefDetailView({
  chef,
  onBack,
}: MobileChefDetailViewProps) {
  const details = getChefDetails(chef);

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <MobileChefsBackButton label="Back to chef team" onClick={onBack} />
        <StatusBadge tone="premium">{chef.position}</StatusBadge>
      </div>

      <MobileChefsPanel className="mt-5 overflow-hidden">
        <div className="relative min-h-[406px] p-5">
          <Image
            alt={chef.standingImage.alt || chef.name}
            className="absolute inset-0 object-cover opacity-88"
            fill
            loading="eager"
            priority
            sizes="430px"
            src={chef.standingImage.publicUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.78)_76%,rgba(0,0,0,0.92)_100%)]" />
          <div className="relative z-10 flex min-h-[366px] flex-col justify-end">
            <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Chef profile
            </p>
            <h1 className="editorial-title mt-3 text-[42px] uppercase leading-[0.96] text-white">
              {chef.name}
            </h1>
            <p className="mt-4 text-[15px] leading-6 text-white/64">
              {chef.specialty}
            </p>
          </div>
        </div>
      </MobileChefsPanel>

      <MobileChefsPanel className="mt-4 overflow-hidden">
        <div className="relative min-h-[176px]">
          <Image
            alt={chef.platingImage.alt || `${chef.name} plating sushi`}
            className="object-cover"
            fill
            sizes="430px"
            src={chef.platingImage.publicUrl}
          />
        </div>
        <div className="p-5">
          <h2 className="text-[19px] font-semibold text-white">
            Counter approach
          </h2>
          <p className="mt-3 text-[14px] leading-6 text-white/58">
            {chef.about}
          </p>
        </div>
      </MobileChefsPanel>

      <div className="mt-4 grid gap-3">
        {details.map((detail) => (
          <MobileChefsPanel className="p-4" key={detail.label}>
            <StatusBadge tone="neutral">{detail.label}</StatusBadge>
            <p className="mt-3 text-[14px] leading-6 text-white/58">
              {detail.value}
            </p>
          </MobileChefsPanel>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          className="red-glow-button grid min-h-[54px] place-items-center rounded-[13px] border text-[12px]"
          href="/reservations"
        >
          Reserve
        </Link>
        <Link
          className="grid min-h-[54px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          href="/omakase"
        >
          Omakase
        </Link>
      </div>
    </section>
  );
}

function getChefDetails(chef: Chef) {
  return [
    { label: "Signature", value: chef.specialty },
    { label: "Sushi", value: chef.sushi },
    { label: "Sashimi", value: chef.sashimi },
    { label: "Appetizer", value: chef.appetizer },
    { label: "Dessert", value: chef.dessert },
  ] as const;
}
