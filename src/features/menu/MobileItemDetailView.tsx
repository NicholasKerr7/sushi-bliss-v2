"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { CarouselIndicator } from "@/components/ui/CarouselIndicator";
import { brand, icons } from "@/features/home/homeDashboardData";
import { useItemGalleryCarousel } from "@/hooks/useItemGalleryCarousel";
import {
  getMenuGalleryImageClassName,
  getMenuItemGalleryImages,
  getTabletPresentationImage,
} from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import {
  getMenuItemOrderAction,
  isMenuItemOnlineOrderable,
} from "@/lib/menuAvailability";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

import { PairingImageBackdrop } from "./PairingImageBackdrop";
import { ReservationHandoffCard } from "./ReservationHandoffCard";
import { TastingNotesCard } from "./TastingNotesCard";

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
  const galleryImages = useMemo(() => getMenuItemGalleryImages(item), [item]);
  const { imageIndex, selectImage } = useItemGalleryCarousel({
    imageCount: galleryImages.length,
    itemId: item.id,
  });
  const heroImage =
    galleryImages[imageIndex] || getTabletPresentationImage(item);
  const isDrinkItem = item.itemType === "drink";
  const isOnlineOrderable = isMenuItemOnlineOrderable(item);
  const orderAction = getMenuItemOrderAction(item);
  const tastingProfile = item.beverageTastingNotes || item.tastingNotes;

  const togglePanel = (panel: DetailPanel) => {
    setExpandedPanel((current) => (current === panel ? null : panel));
  };

  const handleShareItem = () => {
    void navigator.clipboard?.writeText(window.location.href);
  };

  const addButtonLabel = isDrinkItem
    ? `${orderAction.label} ${quantity}`
    : `Add ${quantity} to cart`;

  return (
    <div className="smooth-scroll-area relative h-dvh overflow-x-hidden overflow-y-auto bg-black pb-[calc(112px+var(--sb-safe-bottom))]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_6%,rgba(202,164,93,0.08),transparent_24%),radial-gradient(circle_at_90%_8%,rgba(160,22,18,0.12),transparent_26%),linear-gradient(180deg,#050505_0%,#080706_44%,#030303_100%)]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-20 px-2.5 pt-3 min-[390px]:px-5 min-[390px]:pt-5">
        <div className="mobile-frame flex items-center justify-between gap-2">
          <button
            aria-label="Back to menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-border)] bg-black/44 text-[var(--sb-gold)] backdrop-blur min-[390px]:h-[54px] min-[390px]:w-[54px]"
            onClick={onClose}
            type="button"
          >
            <ChevronIcon direction="left" size={18} />
          </button>
          <div className="flex min-w-0 items-center gap-1.5 min-[390px]:gap-3">
            <AssetIcon
              alt=""
              className="h-8 w-8 rounded-full min-[390px]:h-[46px] min-[390px]:w-[46px]"
              loading="eager"
              size={46}
              src={brand.assets.floralEmblem.publicUrl}
            />
            <span className="editorial-title text-[12px] leading-[0.95] tracking-[0.16em] min-[390px]:text-[17px] min-[390px]:tracking-[0.34em]">
              Sushi
              <br />
              Bliss
            </span>
          </div>
          <div className="flex items-center gap-1.5 min-[390px]:gap-2">
            <button
              aria-label={isFavorite ? "Remove favorite" : "Save favorite"}
              aria-pressed={isFavorite}
              className={classNames(
                "grid h-9 w-9 place-items-center rounded-full border bg-black/44 backdrop-blur min-[390px]:h-[50px] min-[390px]:w-[50px]",
                isFavorite
                  ? "border-[var(--sb-red-bright)]"
                  : "border-[var(--sb-border)]",
              )}
              onClick={onToggleFavorite}
              type="button"
            >
              <AssetIcon
                className="drop-shadow-[0_0_8px_rgba(215,168,79,0.38)]"
                loading="eager"
                size={22}
                src="/assets/icons/heart-icon.png"
              />
            </button>
            <button
              aria-label="Share item"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-border)] bg-black/44 backdrop-blur min-[390px]:h-[50px] min-[390px]:w-[50px]"
              onClick={handleShareItem}
              type="button"
            >
              <ShareGlyph />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative h-[276px] min-[390px]:h-[330px] min-[430px]:h-[348px]">
          <PairingImageBackdrop imageUrl={heroImage} sizes="430px" />
          <Image
            alt={item.image.alt || item.name}
            className={getMenuGalleryImageClassName(
              heroImage,
              "object-cover object-[58%_42%]",
              "object-contain object-[50%_50%]",
            )}
            fill
            loading="eager"
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

        <section className="relative z-10 mt-2 px-3.5 min-[390px]:px-6 min-[430px]:px-8">
          <span className="inline-flex rounded-[8px] border border-[var(--sb-border)] bg-[var(--sb-red)]/24 px-3.5 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold)] shadow-[0_10px_22px_rgba(0,0,0,0.32)] min-[390px]:px-4 min-[390px]:text-[12px]">
            {item.tags.includes("premium") ? "Premium" : item.categoryLabel}
          </span>
          <h1
            className="editorial-title mt-3 text-[25px] leading-none tracking-[0.04em] min-[390px]:text-[32px] min-[390px]:tracking-[0.12em]"
            id={`mobile-item-detail-${item.id}`}
          >
            {item.name}
          </h1>
          <p className="mt-2 text-[14px] leading-5 text-[var(--sb-gold)] min-[390px]:text-[16px]">
            {item.description}
          </p>
          <p className="mt-3 text-[23px] text-[var(--sb-gold)] min-[390px]:text-[28px]">
            {formatMoney(item.priceCents)}
          </p>
          <p className="mt-3 max-w-[360px] text-[13px] leading-[22px] text-white/72 min-[390px]:text-[15px] min-[390px]:leading-6">
            {item.chefNote}
          </p>

          <TastingNotesCard
            className="mt-4"
            profile={tastingProfile}
            variant={isDrinkItem ? "drink" : "food"}
          />

          {!isOnlineOrderable ? (
            <ReservationHandoffCard
              action={orderAction}
              className="mt-4"
              item={item}
              variant="mobile"
            />
          ) : null}

          <div className="mt-4 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018)_44%,rgba(7,9,10,0.96))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_45px_rgba(0,0,0,0.24)] min-[390px]:mt-5">
            <DetailPanelButton
              expanded={expandedPanel === "ingredients"}
              icon={
                isDrinkItem
                  ? "/assets/editorial/sake-vase-set-black-gold-floral.webp"
                  : icons.leaf
              }
              label={isDrinkItem ? "Build" : "Ingredients"}
              onClick={() => togglePanel("ingredients")}
            >
              {item.ingredients.join(", ")}
            </DetailPanelButton>
            <DetailPanelButton
              expanded={expandedPanel === "chef-note"}
              icon={icons.chef}
              label={isDrinkItem ? "Sommelier Note" : "Chef's Note"}
              onClick={() => togglePanel("chef-note")}
            >
              {item.chefNote}
            </DetailPanelButton>
            <DetailPanelButton
              expanded={expandedPanel === "pairing"}
              icon={
                isDrinkItem
                  ? "/assets/editorial/sake-vase-set-black-gold-floral.webp"
                  : icons.miso
              }
              label={isDrinkItem ? "Best With" : "Pairing Suggestion"}
              onClick={() => togglePanel("pairing")}
            >
              {isDrinkItem
                ? orderAction.note
                : item.sakePairing
                  ? `${item.sakePairing.sakeName} is recommended with ${item.name}.`
                  : "Ask our team for a sake pairing selected around today's fish."}
            </DetailPanelButton>
          </div>

          {isDrinkItem ? null : (
            <button
              className="mt-4 min-h-[52px] w-full rounded-[14px] border border-[var(--sb-border)] bg-black/40 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold)] min-[390px]:min-h-[54px] min-[390px]:text-[14px] min-[390px]:tracking-[0.1em]"
              onClick={onCustomize}
              type="button"
            >
              Customize item
            </button>
          )}
        </section>
      </main>

      {isOnlineOrderable ? (
        <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--sb-border)] bg-[linear-gradient(180deg,rgba(9,8,7,0.88),rgba(0,0,0,0.98))] px-3 pb-[calc(0.75rem+var(--sb-safe-bottom))] pt-3 shadow-[0_-20px_50px_rgba(0,0,0,0.62)] backdrop-blur-xl">
          <div className="mobile-frame grid grid-cols-[102px_minmax(0,1fr)] items-center gap-2 min-[390px]:grid-cols-[126px_minmax(0,1fr)] min-[390px]:gap-3">
            <MobileQuantityStepper
              onChange={onQuantityChange}
              value={quantity}
            />
            <button
              aria-label={addButtonLabel}
              className="red-glow-button grid h-[52px] min-w-0 grid-cols-1 place-items-center rounded-[13px] px-2 text-[11px] uppercase tracking-[0.04em] min-[390px]:h-[58px] min-[390px]:grid-cols-[minmax(0,1fr)_auto] min-[390px]:gap-2 min-[390px]:px-4 min-[390px]:text-[14px] min-[390px]:tracking-[0.07em]"
              onClick={onAddToCart}
              type="button"
            >
              <span className="min-w-0 truncate">{orderAction.label}</span>
              <span className="shrink-0 font-mono text-[12px] min-[390px]:text-[13px]">
                {formatMoney(totalCents)}
              </span>
            </button>
          </div>
        </footer>
      ) : null}
    </div>
  );
}

function ShareGlyph() {
  return (
    <svg
      aria-hidden="true"
      className="h-[18px] w-[18px] text-[var(--sb-gold-soft)] drop-shadow-[0_0_8px_rgba(215,168,79,0.38)] min-[390px]:h-[20px] min-[390px]:w-[20px]"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M8.5 11.25 15.5 7.5M8.5 12.75l7 3.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      />
      <path
        d="M7 15.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 20.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.9"
      />
    </svg>
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
    <div className="grid h-[52px] w-[102px] grid-cols-[31px_40px_31px] overflow-hidden rounded-[13px] border border-[var(--sb-border)] bg-black/38 text-[17px] text-[var(--sb-gold)] min-[390px]:h-[58px] min-[390px]:w-[126px] min-[390px]:grid-cols-[39px_48px_39px] min-[390px]:text-[22px]">
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
    <div className="relative border-b border-[var(--sb-border)] last:border-b-0">
      <span
        aria-hidden="true"
        className={classNames(
          "pointer-events-none absolute inset-y-0 left-0 w-1 bg-[var(--sb-red-bright)] opacity-0 shadow-[0_0_18px_rgba(239,47,37,0.72)] transition",
          expanded && "opacity-100",
        )}
      />
      <button
        aria-expanded={expanded}
        className={classNames(
          "grid min-h-[68px] w-full grid-cols-[38px_minmax(0,1fr)_34px] items-center gap-2 px-3 text-left transition min-[390px]:min-h-[78px] min-[390px]:grid-cols-[48px_1fr_auto] min-[390px]:gap-3 min-[390px]:px-4",
          expanded ? "bg-[var(--sb-gold)]/7" : "hover:bg-white/[0.025]",
        )}
        onClick={onClick}
        type="button"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-gold)]/32 bg-black/42 min-[390px]:h-11 min-[390px]:w-11">
          <AssetIcon size={23} src={icon} />
        </span>
        <span className="min-w-0 break-words text-[11px] font-semibold uppercase leading-4 tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:text-[13px] min-[390px]:tracking-[0.12em]">
          {label}
        </span>
        <span
          className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/24 text-[var(--sb-gold)] min-[390px]:h-9 min-[390px]:w-9"
          aria-hidden="true"
        >
          <ChevronIcon direction={expanded ? "up" : "down"} size={17} />
        </span>
      </button>
      {expanded ? (
        <p className="px-3 pb-4 pl-[54px] text-[12px] leading-5 text-white/66 min-[390px]:px-5 min-[390px]:pl-[76px] min-[390px]:text-[14px] min-[390px]:leading-6">
          {children}
        </p>
      ) : null}
    </div>
  );
}
