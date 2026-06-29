import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { CarouselIndicator } from "@/components/ui/CarouselIndicator";
import {
  getMenuGalleryImageClassName,
  getMenuItemGalleryImages,
} from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import { getMenuItemOrderAction } from "@/lib/menuAvailability";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";
import type { CartAddOnDefinition, CartCustomization } from "@/types/order";

import type { DesktopMenuAddHandler } from "./DesktopMenuTypes";
import { PairingImageBackdrop } from "./PairingImageBackdrop";

export const detailFeaturePills = [
  ["floral-emblem-icon.png", "Sourced Daily"],
  ["takeaway-bag-icon.png", "Limited Availability"],
] as const;

export const customizeFeaturePills = [
  ["nigiri-icon.png", "Premium Grade", "Bluefin Tuna"],
  ["crossed-knives-icon.png", "Handcrafted", "To Order"],
  ["lotus-icon.png", "Fresh Wasabi", "Authentic"],
  ["clock-icon.png", "Served Chilled", "Optimal Temp"],
] as const;

export function buildCustomizeGalleryImages(item: MenuItem) {
  return [item.image.publicUrl, ...getMenuItemGalleryImages(item)].filter(
    (imageUrl, index, imageUrls): imageUrl is string =>
      Boolean(imageUrl && imageUrls.indexOf(imageUrl) === index),
  );
}

export function DesktopItemBreadcrumbs({
  itemName,
  onBackToMenu,
}: {
  itemName: string;
  onBackToMenu: () => void;
}) {
  const crumbs = ["Home", "Menu", "Nigiri"];

  return (
    <nav
      aria-label="Desktop item breadcrumbs"
      className="flex h-11 items-center gap-3 px-6 text-[13px] text-white/58"
    >
      {crumbs.map((crumb) => (
        <span className="inline-flex items-center gap-3" key={crumb}>
          <button
            className="transition hover:text-[var(--sb-gold-soft)]"
            onClick={onBackToMenu}
            type="button"
          >
            {crumb}
          </button>
          <ChevronIcon
            className="text-[var(--sb-gold-soft)]"
            direction="right"
            size={14}
          />
        </span>
      ))}
      <span className="text-[var(--sb-red-bright)]">{itemName}</span>
    </nav>
  );
}

export function DesktopImageStage({
  activeImage,
  activeImageIndex,
  galleryImages,
  itemName,
  onImageSelect,
  onNext,
  onPrevious,
}: {
  activeImage: string;
  activeImageIndex: number;
  galleryImages: string[];
  itemName: string;
  onImageSelect: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const hasMultipleImages = galleryImages.length > 1;

  return (
    <div className="relative h-[388px] overflow-hidden">
      <PairingImageBackdrop imageUrl={activeImage} sizes="820px" />
      <Image
        alt={itemName}
        className={getMenuGalleryImageClassName(
          activeImage,
          "object-cover object-[50%_50%]",
        )}
        fill
        loading="eager"
        priority
        sizes="820px"
        src={activeImage}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.1),rgba(0,0,0,0.08)_66%,rgba(0,0,0,0.36))]" />
      <button
        aria-label="Previous gallery image"
        className="absolute left-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[var(--sb-gold)]/42 bg-black/46 text-[var(--sb-gold-soft)] disabled:cursor-not-allowed disabled:opacity-35"
        disabled={!hasMultipleImages}
        onClick={onPrevious}
        type="button"
      >
        <ChevronIcon direction="left" size={22} />
      </button>
      <button
        aria-label="Next gallery image"
        className="absolute right-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[var(--sb-gold)]/42 bg-black/46 text-[var(--sb-gold-soft)] disabled:cursor-not-allowed disabled:opacity-35"
        disabled={!hasMultipleImages}
        onClick={onNext}
        type="button"
      >
        <ChevronIcon direction="right" size={22} />
      </button>
      <CarouselIndicator
        activeIndex={activeImageIndex}
        ariaLabel="Item image gallery"
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        count={galleryImages.length}
        labelPrefix="Show image"
        onSelect={onImageSelect}
      />
    </div>
  );
}

export function RoundActionButton({
  active = false,
  icon,
  label,
  onClick,
}: {
  active?: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={classNames(
        "grid h-[54px] w-[54px] place-items-center justify-self-center rounded-full border bg-black/24 transition",
        active
          ? "border-[var(--sb-red-bright)] shadow-[0_0_18px_rgba(255,35,22,0.25)]"
          : "border-[var(--sb-gold)]/34 hover:border-[var(--sb-gold)]/70",
      )}
      onClick={onClick}
      type="button"
    >
      <AssetIcon size={24} src={icon} />
    </button>
  );
}

export function DesktopDetailInfoCard({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: string;
  title: string;
}) {
  return (
    <article className="relative flex h-full min-h-[178px] overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018)_44%,rgba(7,9,10,0.96))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_45px_rgba(0,0,0,0.24)]">
      <span className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(215,168,79,0.14),transparent_68%)]" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.32),transparent)]" />
      <div className="relative z-10 flex min-w-0 flex-col">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-[var(--sb-gold)]/34 bg-black/42 shadow-[0_0_22px_rgba(215,168,79,0.12)]">
            <AssetIcon size={28} src={icon} />
          </span>
          <h2 className="min-w-0 truncate text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
            {title}
          </h2>
        </div>
        <div className="mt-4 text-[14px] leading-6 text-white/68">
          {children}
        </div>
      </div>
    </article>
  );
}

export function DesktopRelatedMenuCard({
  item,
  onAddToCart,
}: {
  item: MenuItem;
  onAddToCart: DesktopMenuAddHandler;
}) {
  const orderAction = getMenuItemOrderAction(item);

  return (
    <article className="grid min-h-[96px] grid-cols-[118px_minmax(0,1fr)_42px] overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-white/[0.035]">
      <div className="relative min-h-full">
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="140px"
          src={item.image.publicUrl}
        />
      </div>
      <div className="min-w-0 px-4 py-3">
        <p className="line-clamp-1 text-[16px] text-white">{item.name}</p>
        <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-white/56">
          {item.description}
        </p>
        <p className="mt-2 font-mono text-[17px] text-[var(--sb-gold-soft)]">
          {formatMoney(item.priceCents)}
        </p>
      </div>
      {orderAction.kind === "reservation" ? (
        <Link
          aria-label={`${orderAction.label} for ${item.name}`}
          className="mb-3 mr-3 grid h-9 w-9 place-items-center self-end justify-self-end rounded-full border border-[var(--sb-gold)]/52 bg-[var(--sb-gold)]/12"
          href={orderAction.href || "/reservations"}
        >
          <AssetIcon size={18} src={orderAction.icon} />
        </Link>
      ) : (
        <button
          aria-label={`Add ${item.name} to cart`}
          className="mb-3 mr-3 grid h-9 w-9 place-items-center self-end justify-self-end rounded-full border border-[var(--sb-gold)]/52 bg-black/52"
          onClick={() => onAddToCart(item)}
          type="button"
        >
          <AssetIcon size={20} src="/assets/icons/plus-icon.png" />
        </button>
      )}
    </article>
  );
}

export function DesktopImageThumbs({
  activeImageIndex,
  galleryImages,
  itemName,
  onImageSelect,
}: {
  activeImageIndex: number;
  galleryImages: string[];
  itemName: string;
  onImageSelect: (index: number) => void;
}) {
  return (
    <div className="mt-4 grid grid-cols-5 gap-2">
      {galleryImages.slice(0, 5).map((image, index) => (
        <button
          aria-label={`Show ${itemName} view ${index + 1}`}
          aria-pressed={index === activeImageIndex}
          className={classNames(
            "relative h-[58px] overflow-hidden rounded-[9px] border bg-black/40",
            index === activeImageIndex
              ? "border-[var(--sb-gold)]"
              : "border-white/12 hover:border-[var(--sb-gold)]/50",
          )}
          key={image}
          onClick={() => onImageSelect(index)}
          type="button"
        >
          <Image
            alt=""
            className={getMenuGalleryImageClassName(
              image,
              "object-cover",
              "object-cover object-[50%_50%]",
            )}
            fill
            sizes="95px"
            src={image}
          />
        </button>
      ))}
    </div>
  );
}

export function SelectionSummary({
  customizations,
  item,
  quantity,
  selectedSideAddOns,
  selectedToppingAddOns,
  totalCents,
  unitPriceCents,
}: {
  customizations: CartCustomization[];
  item: MenuItem;
  quantity: number;
  selectedSideAddOns: CartAddOnDefinition[];
  selectedToppingAddOns: CartAddOnDefinition[];
  totalCents: number;
  unitPriceCents: number;
}) {
  return (
    <div className="mt-5 space-y-4 text-[14px] text-white/64">
      <SummaryRows
        emptyLabel="No add-ons selected"
        items={selectedToppingAddOns}
        label="Add-ons"
        quantity={quantity}
      />
      <SummaryRows
        emptyLabel="No side selected"
        items={selectedSideAddOns}
        label="Side"
        quantity={quantity}
      />
      <div>
        <p className="text-white/52">Preparation</p>
        <div className="mt-2 grid gap-1.5 text-white">
          {customizations.map((customization) => (
            <p
              className="flex justify-between gap-3"
              key={customization.groupId}
            >
              <span>{customization.groupLabel}</span>
              <span className="text-right text-white/72">
                {customization.optionLabel}
              </span>
            </p>
          ))}
        </div>
      </div>
      <div className="space-y-2 border-t border-white/10 pt-5">
        <p className="flex justify-between gap-4">
          <span>{item.name}</span>
          <span className="font-mono text-white">
            {formatMoney(item.priceCents * quantity)}
          </span>
        </p>
        <p className="flex justify-between gap-4">
          <span>Configured unit</span>
          <span className="font-mono text-white">
            {formatMoney(unitPriceCents)}
          </span>
        </p>
        <p className="flex justify-between gap-4 text-white">
          <span>Subtotal</span>
          <span className="font-mono">{formatMoney(totalCents)}</span>
        </p>
      </div>
    </div>
  );
}

function SummaryRows({
  emptyLabel,
  items,
  label,
  quantity,
}: {
  emptyLabel: string;
  items: CartAddOnDefinition[];
  label: string;
  quantity: number;
}) {
  return (
    <div>
      <p className="text-white/52">{label}</p>
      {items.length > 0 ? (
        <div className="mt-2 grid gap-1.5 text-white">
          {items.map((item) => (
            <p className="flex justify-between gap-3" key={item.id}>
              <span>{item.label}</span>
              <span className="font-mono text-white/72">
                {formatMoney(item.priceCents * quantity)}
              </span>
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-white/42">{emptyLabel}</p>
      )}
    </div>
  );
}
