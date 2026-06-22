"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatMoney } from "@/lib/money";
import type { Chef } from "@/types/chef";
import type { MenuItem } from "@/types/menu";

import {
  MobileChefsBackButton,
  MobileChefsPanel,
} from "./MobileChefsPrimitives";
import {
  getChefDishPreview,
  getChefProfileHighlights,
} from "./chefProfileContent";

interface MobileChefDetailViewProps {
  chef: Chef;
  onBack: () => void;
}

/** Mobile chef profile with signature dishes and direct booking actions. */
export function MobileChefDetailView({
  chef,
  onBack,
}: MobileChefDetailViewProps) {
  const details = getChefProfileHighlights(chef);
  const previewDishes = getChefDishPreview(chef);

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <MobileChefsBackButton label="Back to chef team" onClick={onBack} />
        <StatusBadge tone="premium">{chef.position}</StatusBadge>
      </div>

      <MobileChefsPanel className="mt-5 overflow-hidden">
        <div className="relative min-h-[438px] p-5">
          <Image
            alt={chef.standingImage.alt || chef.name}
            className="absolute inset-0 object-cover object-top opacity-92"
            fill
            loading="eager"
            priority
            sizes="430px"
            src={chef.standingImage.publicUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.3)_52%,rgba(0,0,0,0.88)_100%)]" />
          <div className="relative z-10 flex min-h-[398px] flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--sb-gold)]/42 bg-black/54">
                <AssetIcon
                  loading="eager"
                  size={30}
                  src="/assets/icons/floral-emblem-icon.png"
                />
              </span>
              <span className="rounded-full border border-white/12 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/68">
                Counter profile
              </span>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
                {chef.position}
              </p>
              <h1 className="editorial-title mt-3 text-[35px] uppercase leading-[0.95] tracking-[0.04em] text-white min-[390px]:text-[40px]">
                {chef.name}
              </h1>
              <p className="mt-4 text-[14px] leading-6 text-white/68">
                {chef.specialty}
              </p>
            </div>
          </div>
        </div>
      </MobileChefsPanel>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link
          className="red-glow-button grid min-h-[52px] place-items-center rounded-[13px] border text-[12px]"
          href="/reservations"
        >
          Reserve
        </Link>
        <Link
          className="grid min-h-[52px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          href="/omakase"
        >
          Omakase
        </Link>
      </div>

      <MobileChefsPanel className="mt-4 overflow-hidden">
        <div className="relative min-h-[190px]">
          <Image
            alt={chef.platingImage.alt || `${chef.name} plating sushi`}
            className="object-cover"
            fill
            sizes="430px"
            src={chef.platingImage.publicUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.58))]" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-red-bright)]">
              Counter approach
            </p>
            <h2 className="mt-2 text-[21px] font-semibold leading-tight text-white">
              Timing, temperature, and restraint.
            </h2>
          </div>
        </div>
        <div className="p-5">
          <p className="text-[14px] leading-6 text-white/60">{chef.about}</p>
          <div className="mt-4 grid gap-2">
            <MobileChefSignal
              icon="/assets/icons/sushi-menu-icon.png"
              label="Signature lane"
              value={chef.sushi}
            />
            <MobileChefSignal
              icon="/assets/icons/sashimi-icon.png"
              label="Knife work"
              value={chef.sashimi}
            />
          </div>
        </div>
      </MobileChefsPanel>

      <section className="mt-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Dishes preview
            </p>
            <h2 className="editorial-title mt-2 text-[27px] uppercase tracking-[0.04em] text-white">
              Chef signatures
            </h2>
          </div>
          <Link
            aria-label="Open full menu"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--sb-border)] bg-black/34 text-[var(--sb-gold-soft)]"
            href="/menu"
          >
            <ChevronIcon direction="right" size={18} />
          </Link>
        </div>

        <div className="mt-3 grid gap-3">
          {previewDishes.map((dish, index) => (
            <MobileDishPreviewCard dish={dish} index={index} key={dish.id} />
          ))}
        </div>
      </section>

      <div className="mt-4 grid gap-3">
        {details.map((detail) => (
          <MobileChefsPanel className="p-4" key={detail.label}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
              {detail.label}
            </p>
            <p className="mt-2 text-[13px] leading-6 text-white/60">
              {detail.value}
            </p>
          </MobileChefsPanel>
        ))}
      </div>
    </section>
  );
}

function MobileChefSignal({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[42px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border border-[var(--sb-border)] bg-black/28 p-3">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-gold)]/28 bg-black/42">
        <AssetIcon size={24} src={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/42">
          {label}
        </p>
        <p className="mt-1 line-clamp-2 text-[12px] font-semibold leading-4 text-[var(--sb-gold-soft)]">
          {value}
        </p>
      </div>
    </div>
  );
}

function MobileDishPreviewCard({
  dish,
  index,
}: {
  dish: MenuItem;
  index: number;
}) {
  return (
    <Link
      aria-label={`Browse ${dish.name} in the menu`}
      className="grid min-h-[138px] grid-cols-[112px_minmax(0,1fr)] overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018))] shadow-[0_18px_50px_rgba(0,0,0,0.38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
      href={`/menu?category=${dish.category}`}
    >
      <div className="relative min-h-full bg-black/30">
        <Image
          alt={dish.image.alt || dish.name}
          className="object-cover"
          fill
          sizes="112px"
          src={dish.image.publicUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.42))]" />
        <span className="absolute left-3 top-3 grid h-7 min-w-7 place-items-center rounded-full border border-white/12 bg-black/62 px-2 font-mono text-[11px] text-[var(--sb-gold-soft)]">
          0{index + 1}
        </span>
      </div>

      <div className="flex min-w-0 flex-col p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-red-bright)]">
            {dish.categoryLabel}
          </span>
          <span className="font-mono text-[13px] text-[var(--sb-gold-soft)]">
            {formatMoney(dish.priceCents)}
          </span>
        </div>
        <h3 className="editorial-title mt-2 line-clamp-2 text-[17px] leading-tight text-white">
          {dish.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-white/56">
          {dish.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
          View menu
          <ChevronIcon direction="right" size={14} />
        </span>
      </div>
    </Link>
  );
}
