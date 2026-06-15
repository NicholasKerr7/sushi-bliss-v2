"use client";

import Image from "next/image";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { chefs } from "@/data/chefs";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import type { Chef } from "@/types/chef";

import { ChefDetailModal } from "./ChefDetailModal";
import { MobileChefsSection } from "./MobileChefsSection";
import { TabletChefsSection } from "./TabletChefsSection";

/** Switches chef pages between mobile roster flow and expanded grid views. */
export function ChefsSection() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileChefsSection />;
  }

  if (mode === "tablet") {
    return <TabletChefsSection />;
  }

  return <DesktopChefsSection />;
}

function DesktopChefsSection() {
  const { itemCount } = useCart();
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="chefs"
    >
      <DesktopMenuHeader activeId="chefs" cartCount={itemCount} />
      <main className="mx-auto max-w-[1672px] px-7 pb-6 pt-6">
        <section className="grid min-h-[328px] grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[#07090a] shadow-[0_30px_90px_rgba(0,0,0,0.54)]">
          <div className="flex flex-col justify-center px-12 py-8">
            <p className="text-[16px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Master Chefs
            </p>
            <h1 className="editorial-title mt-4 text-[58px] uppercase leading-[0.94] tracking-[0.04em] text-white">
              The Art Behind
              <span className="block text-[var(--sb-red-bright)]">
                Every Bite.
              </span>
            </h1>
            <p className="mt-5 max-w-[560px] text-[18px] leading-7 text-[var(--sb-gold-soft)]">
              Meet the masters behind nigiri, sashimi, plated appetizers, and
              dessert-led tasting moments.
            </p>
            <Button
              className="mt-8 h-[58px] w-[284px] rounded-[12px] text-[13px] uppercase tracking-[0.08em]"
              href="/reservations"
            >
              Reserve an experience
            </Button>
          </div>
          <div className="relative min-h-[328px]">
            <Image
              alt="Sushi Bliss master chef team"
              className="object-cover object-[58%_40%]"
              fill
              loading="eager"
              priority
              sizes="920px"
              src="/assets/chefs/sushi-bliss-master-chef-team.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,10,0.08),rgba(7,9,10,0.32)_70%,rgba(7,9,10,0.74))]" />
          </div>
        </section>

        <section className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
          <div className="flex items-center justify-between">
            <h2 className="editorial-title text-[24px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              Chef Team
            </h2>
            <p className="text-[14px] uppercase tracking-[0.12em] text-white/46">
              Precision. Restraint. Seasonal craft.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-4 gap-4">
            {chefs.map((chef, index) => (
              <DesktopChefCard
                chef={chef}
                key={chef.id}
                priority={index < 4}
                onViewChef={setSelectedChef}
              />
            ))}
          </div>
        </section>

        <div className="mt-4">
          <DesktopBenefitStrip />
        </div>
      </main>

      <ChefDetailModal
        chef={selectedChef}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedChef(null);
          }
        }}
      />
    </section>
  );
}

function DesktopChefCard({
  chef,
  priority,
  onViewChef,
}: {
  chef: Chef;
  priority: boolean;
  onViewChef: (chef: Chef) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[16px] border border-white/10 bg-black/28">
      <div className="relative h-[250px]">
        <Image
          alt={chef.standingImage.alt || chef.name}
          className="object-cover object-top"
          fill
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes="370px"
          src={chef.standingImage.publicUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <p className="absolute bottom-4 left-4 rounded-full border border-[var(--sb-gold)]/32 bg-black/54 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          {chef.position}
        </p>
      </div>
      <div className="p-5">
        <h3 className="editorial-title text-[22px] uppercase leading-tight text-white">
          {chef.name}
        </h3>
        <p className="mt-2 min-h-[48px] text-[14px] leading-6 text-white/58">
          {chef.specialty}
        </p>
        <div className="mt-4 grid grid-cols-[34px_1fr] items-center gap-3 rounded-[10px] border border-white/10 bg-white/[0.035] p-3">
          <AssetIcon size={26} src="/assets/icons/sushi-menu-icon.png" />
          <span className="text-[12px] uppercase tracking-[0.08em] text-white/62">
            {chef.sushi}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button
            className="h-11 rounded-[10px] text-[12px] uppercase tracking-[0.08em]"
            onClick={() => onViewChef(chef)}
            size="sm"
          >
            Profile
          </Button>
          <Button
            className="h-11 rounded-[10px] text-[12px] uppercase tracking-[0.08em]"
            href="/omakase"
            size="sm"
            variant="secondary"
          >
            Omakase
          </Button>
        </div>
      </div>
    </article>
  );
}
