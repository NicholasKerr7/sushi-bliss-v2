"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CarouselIndicator } from "@/components/ui/CarouselIndicator";
import { brand, icons } from "@/features/home/visualHomeData";
import {
  getMenuItemGalleryImages,
  getTabletPresentationImage,
} from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

interface MobileItemDetailViewProps {
  isFavorite: boolean;
  item: MenuItem;
  quantity: number;
  totalCents: number;
  onAddToCart: () => void;
  onClose: () => void;
  onCustomize: () => void;
  onQuantityChange: (quantity: number) => void;
  onToggleFavorite: () => void;
}

type DetailPanel = "ingredients" | "chef-note" | "pairing";

export function MobileItemDetailView({
  isFavorite,
  item,
  quantity,
  totalCents,
  onAddToCart,
  onClose,
  onCustomize,
  onQuantityChange,
  onToggleFavorite,
}: MobileItemDetailViewProps) {
  const [expandedPanel, setExpandedPanel] = useState<DetailPanel | null>(null);
  const [galleryState, setGalleryState] = useState({
    imageIndex: 0,
    itemId: item.id,
  });
  const galleryImages = useMemo(() => getMenuItemGalleryImages(item), [item]);
  const imageIndex =
    galleryState.itemId === item.id ? galleryState.imageIndex : 0;
  const heroImage =
    galleryImages[imageIndex] || getTabletPresentationImage(item);
  const selectImage = (nextImageIndex: number) => {
    setGalleryState({ imageIndex: nextImageIndex, itemId: item.id });
  };

  const togglePanel = (panel: DetailPanel) => {
    setExpandedPanel((current) => (current === panel ? null : panel));
  };

  const handleShareItem = () => {
    void navigator.clipboard?.writeText(window.location.href);
  };

  return (
    <div className="relative h-dvh overflow-y-auto bg-black pb-[126px]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_6%,rgba(202,164,93,0.08),transparent_24%),radial-gradient(circle_at_90%_8%,rgba(160,22,18,0.12),transparent_26%),linear-gradient(180deg,#050505_0%,#080706_44%,#030303_100%)]" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-20 flex items-center justify-between px-5 pt-5">
        <button
          aria-label="Back to menu"
          className="grid h-[54px] w-[54px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/44 text-[30px] text-[var(--sb-gold)] backdrop-blur"
          onClick={onClose}
          type="button"
        >
          <ChevronIcon direction="left" size={18} />
        </button>
        <div className="flex items-center gap-3">
          <AssetIcon
            alt=""
            className="rounded-full"
            loading="eager"
            size={46}
            src={brand.assets.floralEmblem.publicUrl}
          />
          <span className="editorial-title text-[17px] leading-[0.95] tracking-[0.34em]">
            Sushi
            <br />
            Bliss
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label={isFavorite ? "Remove favorite" : "Save favorite"}
            aria-pressed={isFavorite}
            className={classNames(
              "grid h-[50px] w-[50px] place-items-center rounded-full border bg-black/44 backdrop-blur",
              isFavorite
                ? "border-[var(--sb-red-bright)]"
                : "border-[var(--sb-border)]",
            )}
            onClick={onToggleFavorite}
            type="button"
          >
            <AssetIcon
              loading="eager"
              size={24}
              src="/assets/icons/heart-icon.png"
            />
          </button>
          <button
            aria-label="Share item"
            className="grid h-[50px] w-[50px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/44 text-[var(--sb-gold)] backdrop-blur"
            onClick={handleShareItem}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-7 w-7 drop-shadow-[0_0_8px_rgba(202,164,93,0.65)]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 16V4m0 0 5 5m-5-5-5 5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
              <path
                d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative h-[360px]">
          <Image
            alt={item.image.alt || item.name}
            className="object-cover object-[58%_42%]"
            fill
            priority
            sizes="430px"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.86)_86%,#050505_100%)]" />
          <CarouselIndicator
            activeIndex={imageIndex}
            ariaLabel="Item image gallery"
            className="absolute bottom-[22px] left-1/2 -translate-x-1/2"
            count={galleryImages.length}
            labelPrefix="Show image"
            onSelect={selectImage}
          />
        </section>

        <section className="-mt-3 px-8">
          <span className="inline-flex rounded-[8px] border border-[var(--sb-border)] bg-[var(--sb-red)]/24 px-4 py-1 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
            {item.tags.includes("premium") ? "Premium" : item.categoryLabel}
          </span>
          <h1
            className="editorial-title mt-3 text-[32px] leading-none tracking-[0.12em]"
            id={`mobile-item-detail-${item.id}`}
          >
            {item.name}
          </h1>
          <p className="mt-2 text-[16px] text-[var(--sb-gold)]">
            {item.description}
          </p>
          <p className="mt-3 text-[28px] text-[var(--sb-gold)]">
            {formatMoney(item.priceCents)}
          </p>
          <p className="mt-3 max-w-[360px] text-[15px] leading-6 text-white/72">
            {item.chefNote}
          </p>

          <div className="mt-4">
            <MobileQuantityStepper
              onChange={onQuantityChange}
              value={quantity}
            />
          </div>

          <button
            aria-label={`Add ${quantity} to cart`}
            className="red-glow-button mt-4 grid min-h-[66px] w-full grid-cols-[1fr_auto] items-center rounded-[14px] px-8 text-[17px] uppercase tracking-[0.08em]"
            onClick={onAddToCart}
            type="button"
          >
            <span className="text-center">Add to Cart</span>
            <span>{formatMoney(totalCents)}</span>
          </button>

          <div className="mt-5 overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-black/38">
            <DetailPanelButton
              expanded={expandedPanel === "ingredients"}
              icon={icons.leaf}
              label="Ingredients"
              onClick={() => togglePanel("ingredients")}
            >
              {item.ingredients.join(", ")}
            </DetailPanelButton>
            <DetailPanelButton
              expanded={expandedPanel === "chef-note"}
              icon={icons.chef}
              label="Chef's Note"
              onClick={() => togglePanel("chef-note")}
            >
              {item.chefNote}
            </DetailPanelButton>
            <DetailPanelButton
              expanded={expandedPanel === "pairing"}
              icon={icons.miso}
              label="Pairing Suggestion"
              onClick={() => togglePanel("pairing")}
            >
              {item.sakePairing
                ? `${item.sakePairing.sakeName} is recommended with ${item.name}.`
                : "Ask our team for a sake pairing selected around today's fish."}
            </DetailPanelButton>
          </div>

          <button
            className="mt-4 min-h-[54px] w-full rounded-[14px] border border-[var(--sb-border)] bg-black/40 text-[14px] uppercase tracking-[0.1em] text-[var(--sb-gold)]"
            onClick={onCustomize}
            type="button"
          >
            Customize item
          </button>
        </section>
      </main>

      <BottomNavigation activeId="menu" ariaLabel="Mobile item navigation" />
    </div>
  );
}

function MobileQuantityStepper({
  onChange,
  value,
}: {
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <div className="grid h-[64px] w-[190px] grid-cols-3 overflow-hidden rounded-[14px] border border-[var(--sb-border)] bg-black/38 text-[26px] text-[var(--sb-gold)]">
      <button
        aria-label="Decrease quantity"
        className="grid place-items-center disabled:opacity-35"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
        type="button"
      >
        -
      </button>
      <output
        aria-label="Quantity"
        className="grid place-items-center border-x border-[var(--sb-border)] text-white"
      >
        {value}
      </output>
      <button
        aria-label="Increase quantity"
        className="grid place-items-center"
        onClick={() => onChange(Math.min(12, value + 1))}
        type="button"
      >
        +
      </button>
    </div>
  );
}

function DetailPanelButton({
  children,
  expanded,
  icon,
  label,
  onClick,
}: {
  children: string;
  expanded: boolean;
  icon?: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[var(--sb-border)] last:border-b-0">
      <button
        aria-expanded={expanded}
        className="grid min-h-[76px] w-full grid-cols-[44px_1fr_auto] items-center gap-3 px-4 text-left"
        onClick={onClick}
        type="button"
      >
        <AssetIcon size={30} src={icon} />
        <span className="editorial-title text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold)]">
          {label}
        </span>
        <span className="text-[28px] text-[var(--sb-gold)]" aria-hidden="true">
          <ChevronIcon direction="right" size={18} />
        </span>
      </button>
      {expanded ? (
        <p className="px-16 pb-5 text-[14px] leading-6 text-white/66">
          {children}
        </p>
      ) : null}
    </div>
  );
}
