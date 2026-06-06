"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { icons } from "@/features/home/visualHomeData";
import { getTabletPresentationImage } from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

import { TabletQuantityStepper } from "./TabletItemQuantityStepper";

interface TabletDetailViewProps {
  isFavorite: boolean;
  item: MenuItem;
  quantity: number;
  relatedItems: MenuItem[];
  totalCents: number;
  onAddRelatedItem: (item: MenuItem) => void;
  onAddToCart: () => void;
  onClose: () => void;
  onCustomize: () => void;
  onQuantityChange: (quantity: number) => void;
  onToggleFavorite: () => void;
}

const tastingNotes = [
  { label: "Richness", value: "Full body", point: "left-[61%] top-[16%]" },
  { label: "Umami", value: "Deep", point: "left-[72%] top-[50%]" },
  { label: "Texture", value: "Silky", point: "left-[48%] top-[74%]" },
  { label: "Finish", value: "Clean", point: "left-[28%] top-[53%]" },
] as const;

const detailBadges = ["Chef balanced", "Fresh cut", "Sake ready"] as const;

export function TabletDetailView({
  isFavorite,
  item,
  quantity,
  relatedItems,
  totalCents,
  onAddRelatedItem,
  onAddToCart,
  onClose,
  onCustomize,
  onQuantityChange,
  onToggleFavorite,
}: TabletDetailViewProps) {
  return (
    <>
      <nav
        aria-label="Item breadcrumb"
        className="mt-4 flex items-center gap-3 text-[14px] text-white/58"
      >
        <Link className="hover:text-white" href="/home">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <button className="hover:text-white" onClick={onClose} type="button">
          Menu
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-white/82">{item.name}</span>
      </nav>

      <section className="mt-3 overflow-hidden rounded-[26px] border border-white/10 bg-[#111111] shadow-[0_26px_80px_rgb(0_0_0_/_0.48)]">
        <div className="relative h-[386px]">
          <Image
            alt={item.image.alt || item.name}
            className="object-cover object-[62%_50%]"
            fill
            priority
            sizes="1034px"
            src={getTabletPresentationImage(item)}
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#111111] via-[#111111]/78 to-transparent" />
          <button
            aria-label="Back to menu"
            className="absolute left-7 top-7 grid h-12 w-12 place-items-center rounded-full border border-white/16 bg-black/54 text-[28px] text-white shadow-soft backdrop-blur"
            onClick={onClose}
            type="button"
          >
            ‹
          </button>
        </div>

        <div className="px-8 pb-6 pt-4">
          <div className="grid grid-cols-[minmax(0,1fr)_468px] gap-8 border-b border-white/10 pb-5">
            <div>
              <div className="flex flex-wrap gap-2">
                {detailBadges.map((badge) => (
                  <span
                    className="rounded-full border border-[var(--sb-gold)]/32 bg-[var(--sb-gold)]/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]"
                    key={badge}
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <h1
                className="editorial-title mt-3 text-[50px] leading-[0.95] text-white"
                id={`tablet-item-detail-${item.id}`}
              >
                {item.name}
              </h1>
              <p className="mt-3 max-w-[620px] text-[17px] leading-7 text-white/72">
                {item.description}
              </p>
              <p className="mt-3 font-mono text-[30px] font-semibold text-[var(--sb-gold-soft)]">
                {formatMoney(totalCents)}
              </p>
            </div>

            <aside className="pt-8">
              <div className="grid grid-cols-[170px_1fr] gap-4">
                <TabletQuantityStepper
                  onChange={onQuantityChange}
                  value={quantity}
                />
                <Button
                  className="h-[64px] rounded-[17px] text-[16px] uppercase tracking-[0.08em]"
                  onClick={onAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button
                  className="h-[50px] rounded-[17px] text-[15px]"
                  onClick={onCustomize}
                  variant="secondary"
                >
                  Customize
                </Button>
                <button
                  aria-pressed={isFavorite}
                  className={classNames(
                    "flex h-[50px] items-center justify-center gap-2 rounded-[16px] border text-[14px] font-semibold transition",
                    isFavorite
                      ? "border-[var(--sb-gold)] bg-[var(--sb-gold)]/16 text-[var(--sb-gold-soft)]"
                      : "border-white/12 bg-white/[0.035] text-white/68",
                  )}
                  onClick={onToggleFavorite}
                  type="button"
                >
                  <AssetIcon size={18} src={icons.star} />
                  {isFavorite ? "Saved" : "Favorite"}
                </button>
              </div>
            </aside>
          </div>

          <p className="mt-4 text-[15px] leading-6 text-white/68">
            {item.chefNote}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <article className="min-h-[150px] rounded-[16px] border border-white/10 bg-black/20 p-4">
              <h2 className="text-[16px] font-semibold uppercase tracking-[0.08em]">
                Ingredients
              </h2>
              <p className="mt-3 text-[15px] leading-6 text-white/66">
                {item.ingredients.join(", ")}
              </p>
            </article>

            <article className="min-h-[150px] rounded-[16px] border border-white/10 bg-black/20 p-4">
              <h2 className="text-[16px] font-semibold uppercase tracking-[0.08em]">
                Chef Note
              </h2>
              <p className="mt-3 text-[15px] leading-6 text-white/66">
                Prepared with the house balance and finished moments before
                serving.
              </p>
            </article>

            <article className="min-h-[150px] rounded-[16px] border border-white/10 bg-black/20 p-4">
              <h2 className="text-[16px] font-semibold uppercase tracking-[0.08em]">
                Tasting Notes
              </h2>
              <div className="mt-3 grid grid-cols-[108px_1fr] items-center gap-3">
                <div className="relative h-[108px] rounded-full border border-[var(--sb-gold)]/22 bg-black/24">
                  <div className="absolute inset-4 rounded-full border border-white/10" />
                  <div className="absolute inset-8 rounded-full border border-white/10" />
                  {tastingNotes.map((note) => (
                    <span
                      aria-hidden="true"
                      className={`absolute h-2.5 w-2.5 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_18px_rgb(239_47_37_/_0.7)] ${note.point}`}
                      key={note.label}
                    />
                  ))}
                </div>
                <div className="grid gap-1">
                  {tastingNotes.slice(0, 3).map((note) => (
                    <p
                      className="flex justify-between text-[12px]"
                      key={note.label}
                    >
                      <span className="text-white/46">{note.label}</span>
                      <span className="text-white/78">{note.value}</span>
                    </p>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {item.sakePairing ? (
            <section className="mt-4 grid min-h-[112px] grid-cols-[minmax(0,1fr)_260px] items-center gap-5 rounded-[16px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/8 p-4">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
                  Perfect Pairing
                </p>
                <h2 className="mt-1 text-[22px] font-semibold">
                  {item.sakePairing.sakeName}
                </h2>
                <p className="mt-1 text-[14px] leading-6 text-white/64">
                  A premium sake with floral notes that complements {item.name}.
                </p>
              </div>
              <Button
                className="h-[50px] rounded-[17px]"
                href="/omakase"
                variant="secondary"
              >
                Explore sake pairings
              </Button>
            </section>
          ) : null}

          {relatedItems.length > 0 ? (
            <section className="mt-4">
              <h2 className="text-center text-[19px] font-semibold uppercase tracking-[0.18em]">
                You may also like
              </h2>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {relatedItems.map((relatedItem) => (
                  <RelatedMenuCard
                    item={relatedItem}
                    key={relatedItem.id}
                    onAddRelatedItem={onAddRelatedItem}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </>
  );
}

function RelatedMenuCard({
  item,
  onAddRelatedItem,
}: {
  item: MenuItem;
  onAddRelatedItem: (item: MenuItem) => void;
}) {
  return (
    <article className="grid h-[116px] grid-cols-[126px_1fr] overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.04]">
      <div className="relative h-[116px]">
        <Image
          alt={item.image.alt || item.name}
          className="object-cover"
          fill
          loading="eager"
          sizes="126px"
          src={item.image.publicUrl}
        />
      </div>
      <div className="p-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">
          {item.categoryLabel}
        </p>
        <h3 className="mt-1 line-clamp-2 text-[17px] font-semibold leading-5">
          {item.name}
        </h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-mono text-[var(--sb-gold-soft)]">
            {formatMoney(item.priceCents)}
          </span>
          <button
            className="rounded-full bg-[var(--sb-red)] px-4 py-2 text-[13px] font-semibold text-white"
            onClick={() => onAddRelatedItem(item)}
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
