"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";
import type { CartAddOnDefinition } from "@/types/order";

const itemHighlights = [
  { icon: icons.crown, label: "Premium Grade", value: "Bluefin Tuna" },
  { icon: icons.chef, label: "Handcrafted", value: "To Order" },
  { icon: icons.flower, label: "Fresh Wasabi", value: "Authentic" },
  { icon: icons.clock, label: "Served Chilled", value: "Optimal Temp" },
] as const;

const addOnIconById: Record<string, string | undefined> = {
  "caviar-5g": icons.crown,
  "edamame-side": icons.leaf,
  "gold-flakes": icons.flower,
  "green-onion": icons.leaf,
  "ikura-salmon-roe": icons.nigiri,
  "miso-soup-side": icons.miso,
  "pickled-ginger-side": icons.star,
  "seaweed-salad-side": icons.leaf,
  "truffle-oil": icons.miso,
  "yuzu-zest": icons.star,
};

interface ProductStoryCardProps {
  galleryImages: string[];
  heroImage: string;
  item: MenuItem;
  unitPriceCents: number;
}

export function ProductStoryCard({
  galleryImages,
  heroImage,
  item,
  unitPriceCents,
}: ProductStoryCardProps) {
  return (
    <article className="rounded-[22px] border border-white/10 bg-[#101112] p-4">
      <div className="relative h-[320px] overflow-hidden rounded-[18px] bg-white/[0.04] min-[1080px]:h-[392px]">
        <Image
          alt={item.image.alt || item.name}
          className="object-cover object-[54%_50%]"
          fill
          priority
          sizes="500px"
          src={heroImage}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/54 to-transparent p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="inline-flex rounded-[7px] border border-[var(--sb-gold)]/30 bg-black/34 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Chef&apos;s Special
              </p>
              <h1
                className="editorial-title mt-3 text-[38px] leading-none"
                id={`tablet-item-detail-${item.id}`}
              >
                {item.name}
              </h1>
              <p className="mt-3 text-[15px] text-[var(--sb-gold-soft)]">
                {item.description}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[24px] text-white">
                {formatMoney(unitPriceCents)}
              </p>
              <p className="mt-1 text-[12px] text-white/62">Per piece</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {itemHighlights.map((highlight) => (
          <div className="grid gap-1 text-center" key={highlight.label}>
            <AssetIcon className="mx-auto" size={24} src={highlight.icon} />
            <p className="text-[12px] text-white/76">{highlight.label}</p>
            <p className="text-[11px] text-white/46">{highlight.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-3 rounded-[16px] border border-white/10 bg-black/18 p-3">
        <p className="font-serif text-[15px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
          Chef&apos;s recommendation
        </p>
        <blockquote className="mt-2 text-[15px] leading-6 text-white/72">
          Enhance the rich, buttery texture with a light garnish and a clean soy
          finish for a harmonious balance.
        </blockquote>
        <p className="mt-3 text-[15px] text-[var(--sb-gold-soft)]">
          - Chef Takahashi
        </p>
      </section>

      <section className="mt-3">
        <h2 className="font-serif text-[16px] uppercase tracking-[0.1em] text-white/78">
          Item gallery
        </h2>
        <div className="mt-2.5 grid grid-cols-4 gap-3">
          {galleryImages.slice(0, 4).map((imageUrl, index) => (
            <div
              className="relative h-[70px] overflow-hidden rounded-[12px] border border-[var(--sb-gold)]/22 bg-white/[0.035] min-[1080px]:h-[80px]"
              key={imageUrl}
            >
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="110px"
                src={imageUrl}
              />
              {index === 0 ? (
                <span className="absolute inset-0 grid place-items-center bg-black/22 text-[28px] text-white">
                  ▶
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

interface OptionPanelProps {
  children: ReactNode;
  description: string;
  icon?: string;
  title: string;
}

export function OptionPanel({
  children,
  description,
  icon,
  title,
}: OptionPanelProps) {
  return (
    <section className="rounded-[18px] border border-white/10 bg-white/[0.035] p-2.5">
      <div className="mb-2 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <AssetIcon size={23} src={icon} />
          <div>
            <h2 className="font-serif text-[17px] uppercase tracking-[0.08em] text-white/86">
              {title}
            </h2>
            <p className="mt-1 text-[12px] text-white/50">{description}</p>
          </div>
        </div>
        <span className="text-[var(--sb-gold)]" aria-hidden="true">
          ^
        </span>
      </div>
      {children}
    </section>
  );
}

interface AddOnCardProps {
  addOn: CartAddOnDefinition;
  checked: boolean;
  compact?: boolean;
  itemId: string;
  onToggle: (addOnId: string) => void;
}

export function AddOnCard({
  addOn,
  checked,
  compact = false,
  itemId,
  onToggle,
}: AddOnCardProps) {
  return (
    <label
      className="cursor-pointer"
      htmlFor={`tablet-addon-${itemId}-${addOn.id}`}
    >
      <input
        checked={checked}
        className="peer sr-only"
        id={`tablet-addon-${itemId}-${addOn.id}`}
        onChange={() => onToggle(addOn.id)}
        type="checkbox"
      />
      <span
        className={classNames(
          "grid items-center rounded-[12px] border border-white/10 bg-black/20 transition peer-checked:border-[var(--sb-red-bright)] peer-checked:bg-[var(--sb-red)]/10",
          compact
            ? "min-h-[44px] grid-cols-[28px_1fr_24px] gap-2 px-2.5 py-1"
            : "min-h-[58px] grid-cols-[34px_1fr_28px] gap-3 px-3 py-2",
        )}
      >
        <AssetIcon
          size={compact ? 22 : 26}
          src={addOnIconById[addOn.id] || icons.star}
        />
        <span>
          <span
            className={classNames(
              "block font-semibold leading-tight text-white/82",
              compact ? "text-[12px]" : "text-[13px]",
            )}
          >
            {addOn.label}
          </span>
          <span
            className={classNames(
              "mt-1 block font-mono text-white/62",
              compact ? "text-[12px]" : "text-[13px]",
            )}
          >
            +{formatMoney(addOn.priceCents)}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={classNames(
            "grid h-6 w-6 place-items-center rounded-[7px] border text-[11px]",
            checked
              ? "border-[var(--sb-red-bright)] text-white"
              : "border-white/14 text-transparent",
          )}
        >
          ✓
        </span>
      </span>
    </label>
  );
}
