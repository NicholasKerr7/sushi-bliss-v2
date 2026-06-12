"use client";

import Image from "next/image";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { TabletExperienceHeader } from "@/components/layout/TabletExperienceHeader";
import { chefs } from "@/data/chefs";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import type { Chef } from "@/types/chef";

import { ChefDetailModal } from "./ChefDetailModal";

const chefTabs = [
  ["Head chefs", "/assets/icons/user-icon.png"],
  ["Sushi masters", "/assets/icons/sushi-menu-icon.png"],
  ["Hospitality team", "/assets/icons/group-icon.png"],
] as const;

export function TabletChefsSection() {
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);

  return (
    <section
      className="flex min-h-dvh flex-col bg-[#050607] px-[18px] pb-3 pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pb-4 min-[1080px]:pt-3"
      id="chefs"
    >
      <TabletExperienceHeader
        cartCount={itemCount}
        onOpenCart={() => setCartOpen(true)}
        title="Master Chefs"
      />

      <main className="mx-auto w-full max-w-[1034px]">
        <section className="relative mt-3 overflow-hidden rounded-[18px] border border-white/10 bg-black/42 min-[1080px]:mt-5">
          <Image
            alt=""
            className="object-cover object-right opacity-76"
            fill
            priority
            sizes="1034px"
            src="/assets/editorial/premium-sushi-preparation-still-life.webp"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98),rgba(5,6,7,0.74)_44%,rgba(5,6,7,0.08))]" />
          <div className="relative z-10 min-h-[274px] px-7 py-8 min-[1080px]:min-h-[340px] min-[1080px]:px-9 min-[1080px]:py-10">
            <h1 className="editorial-title max-w-[580px] text-[58px] leading-[0.94] text-white min-[1080px]:text-[76px]">
              Master Chefs
              <span className="block text-[var(--sb-red-bright)]">
                Our Team
              </span>
            </h1>
            <p className="mt-5 max-w-[360px] text-[17px] leading-7 text-white/62">
              Meet the artisans behind your unforgettable dining experience.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-[150px] bg-[var(--sb-border)]" />
              <AssetIcon size={28} src="/assets/icons/floral-emblem-icon.png" />
              <span className="h-px w-[150px] bg-[var(--sb-border)]" />
            </div>
          </div>
        </section>

        <nav
          aria-label="Tablet chef teams"
          className="mt-3 grid grid-cols-3 rounded-[14px] border border-white/12 bg-white/[0.035] p-1 min-[1080px]:mt-4"
        >
          {chefTabs.map(([label, icon], index) => (
            <button
              aria-pressed={index === 0}
              className={
                index === 0
                  ? "red-glow-button grid h-[54px] grid-cols-[32px_auto] place-content-center items-center gap-3 rounded-[11px] text-[12px] uppercase tracking-[0.08em]"
                  : "grid h-[54px] grid-cols-[32px_auto] place-content-center items-center gap-3 rounded-[11px] text-[12px] uppercase tracking-[0.08em] text-white/62"
              }
              key={label}
              type="button"
            >
              <AssetIcon size={25} src={icon} />
              {label}
            </button>
          ))}
        </nav>

        <section className="mt-3 grid grid-cols-3 gap-3 min-[1080px]:mt-4 min-[1080px]:gap-4">
          {chefs.map((chef, index) => (
            <TabletChefCard
              chef={chef}
              imagePriority={index < 3}
              key={chef.id}
              onViewChef={setSelectedChef}
            />
          ))}
        </section>

        <section className="mt-4 grid grid-cols-[auto_minmax(0,1fr)_300px] items-center gap-5 rounded-[16px] border border-white/10 bg-white/[0.04] p-5">
          <AssetIcon size={72} src="/assets/icons/floral-emblem-icon.png" />
          <div>
            <h2 className="text-[18px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              Our philosophy
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-white/56">
              Respect for tradition. Passion for excellence. Each dish reflects
              our commitment.
            </p>
          </div>
          <a
            className="grid h-[52px] place-items-center rounded-[12px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
            href="/about"
          >
            Meet our full team
          </a>
        </section>
      </main>

      <TabletBottomNavigation
        activeId="profile"
        ariaLabel="Tablet chefs navigation"
        fixed={false}
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
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

function TabletChefCard({
  chef,
  imagePriority,
  onViewChef,
}: {
  chef: Chef;
  imagePriority: boolean;
  onViewChef: (chef: Chef) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[14px] border border-white/12 bg-white/[0.04]">
      <div className="relative aspect-[16/10] bg-black/30">
        <Image
          alt={chef.standingImage.alt || chef.name}
          className="object-cover object-top"
          fill
          loading={imagePriority ? "eager" : "lazy"}
          sizes="330px"
          src={chef.standingImage.publicUrl}
        />
        <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-[var(--sb-border)] bg-black/54">
          <AssetIcon size={28} src="/assets/icons/floral-emblem-icon.png" />
        </span>
      </div>
      <div className="p-4">
        <h2 className="text-[25px] font-semibold leading-none text-white">
          {chef.name}
        </h2>
        <p className="mt-1 text-[15px] font-semibold text-[var(--sb-gold-soft)]">
          {chef.position}
        </p>
        <p className="mt-3 line-clamp-3 min-h-[66px] text-[14px] leading-[22px] text-white/58">
          {chef.about}
        </p>
        <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
          Specialties
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[chef.specialty, chef.sushi].map((specialty) => (
            <span
              className="rounded-full border border-[var(--sb-border)] px-3 py-1 text-[11px] text-[var(--sb-gold-soft)]"
              key={specialty}
            >
              {specialty}
            </span>
          ))}
        </div>
        <button
          className="red-glow-button mt-4 h-10 w-full rounded-[10px] text-[11px] uppercase tracking-[0.08em]"
          onClick={() => onViewChef(chef)}
          type="button"
        >
          View profile
        </button>
      </div>
    </article>
  );
}
