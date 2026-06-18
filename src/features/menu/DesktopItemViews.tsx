"use client";

import Image from "next/image";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { cartCustomizationGroups } from "@/data/cart";
import {
  getMenuItemGalleryImages,
  getTabletPresentationImage,
} from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";
import type { CartAddOnDefinition, CartCustomization } from "@/types/order";

import {
  CustomizeGroup,
  DesktopAddOnButton,
  DesktopQuantity,
} from "./DesktopMenuPrimitives";
import type { DesktopMenuAddHandler } from "./DesktopMenuTypes";
import { DesktopBenefitStrip } from "./DesktopMenuChrome";
import {
  DesktopDetailInfoCard,
  DesktopImageStage,
  DesktopImageThumbs,
  DesktopItemBreadcrumbs,
  DesktopRelatedMenuCard,
  RoundActionButton,
  SelectionSummary,
  buildCustomizeGalleryImages,
  customizeFeaturePills,
  detailFeaturePills,
} from "./DesktopItemVisualParts";
import { TastingNotesCard } from "./TastingNotesCard";

export function DesktopItemDetailView({
  isFavorite,
  item,
  quantity,
  relatedItems,
  totalCents,
  onAddRelatedItem,
  onAddToCart,
  onBackToMenu,
  onCustomize,
  onQuantityChange,
  onToggleFavorite,
}: {
  isFavorite: boolean;
  item: MenuItem;
  quantity: number;
  relatedItems: MenuItem[];
  totalCents: number;
  onAddRelatedItem: DesktopMenuAddHandler;
  onAddToCart: () => void;
  onBackToMenu: () => void;
  onCustomize: () => void;
  onQuantityChange: (quantity: number) => void;
  onToggleFavorite: () => void;
}) {
  const galleryImages = getMenuItemGalleryImages(item);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeGalleryIndex = galleryImages.length
    ? activeImageIndex % galleryImages.length
    : 0;
  const activeImage =
    galleryImages[activeGalleryIndex] || getTabletPresentationImage(item);

  const stepGallery = (direction: number) => {
    if (galleryImages.length < 2) {
      return;
    }

    setActiveImageIndex(
      (current) =>
        (current + direction + galleryImages.length) % galleryImages.length,
    );
  };

  return (
    <main className="mx-auto max-w-[1530px] px-7 pb-6 pt-3">
      <section className="overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[#080a0b] shadow-[0_26px_90px_rgba(0,0,0,0.54)]">
        <DesktopItemBreadcrumbs
          itemName={item.name}
          onBackToMenu={onBackToMenu}
        />

        <div className="grid h-[388px] grid-cols-[0.54fr_0.46fr] border-t border-white/10">
          <DesktopImageStage
            activeImage={activeImage}
            activeImageIndex={activeGalleryIndex}
            galleryImages={galleryImages}
            itemName={item.name}
            onImageSelect={setActiveImageIndex}
            onNext={() => stepGallery(1)}
            onPrevious={() => stepGallery(-1)}
          />

          <div className="flex flex-col justify-center px-9 py-6">
            <span className="w-max rounded-[8px] border border-[var(--sb-gold)]/34 bg-[var(--sb-gold)]/8 px-3 py-1 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
              Chef&apos;s Special
            </span>
            <h1 className="editorial-title mt-3 text-[48px] leading-none text-white">
              {item.name}
            </h1>
            <p className="mt-2 text-[16px] leading-6 text-white/72">
              {item.description}
            </p>
            <p className="mt-4 font-mono text-[29px] text-[var(--sb-gold-soft)]">
              {formatMoney(item.priceCents)}
            </p>

            <div className="mt-4 grid grid-cols-[132px_minmax(198px,1fr)_58px_58px] items-center gap-3">
              <DesktopQuantity
                label={item.name}
                quantity={quantity}
                onQuantityChange={onQuantityChange}
              />
              <Button
                aria-label="Add to Cart"
                className="h-[54px] min-w-[198px] whitespace-nowrap rounded-[13px] px-3 text-[12px] uppercase tracking-[0.07em] min-[1380px]:text-[14px]"
                onClick={onAddToCart}
              >
                Add to cart
                <span aria-hidden="true">{formatMoney(totalCents)}</span>
              </Button>
              <RoundActionButton
                active={isFavorite}
                icon="/assets/icons/heart-icon.png"
                label={isFavorite ? "Saved favorite" : "Favorite"}
                onClick={onToggleFavorite}
              />
              <RoundActionButton
                icon="/assets/icons/share-icon.png"
                label="Share"
                onClick={() => {
                  void navigator.clipboard?.writeText(window.location.href);
                }}
              />
            </div>

            <div className="mt-3 grid grid-cols-[190px_1fr] gap-3">
              <button
                className="h-12 rounded-[12px] border border-[var(--sb-border)] bg-white/[0.025] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/60"
                onClick={onCustomize}
                type="button"
              >
                Customize
              </button>
              <div className="flex items-center gap-7 border-l border-white/10 pl-6">
                {detailFeaturePills.map(([icon, label]) => (
                  <span
                    className="inline-flex items-center gap-2 text-[13px] text-white/66"
                    key={label}
                  >
                    <AssetIcon size={23} src={`/assets/icons/${icon}`} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-4 text-[15px] leading-6 text-white/72">
              {item.chefNote}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 p-4">
          <DesktopDetailInfoCard
            icon="/assets/icons/nigiri-icon.png"
            title="Ingredients"
          >
            {item.ingredients.join(", ")}
          </DesktopDetailInfoCard>
          <DesktopDetailInfoCard
            icon="/assets/icons/chef-hat-icon.png"
            title="Chef's Note"
          >
            Hand-selected daily and prepared moments before serving.
          </DesktopDetailInfoCard>
          <DesktopDetailInfoCard
            icon="/assets/editorial/sake-vase-set-black-gold-floral.webp"
            title="Perfect Pairing"
          >
            {item.sakePairing?.sakeName || "Ask your chef for today's pairing."}
          </DesktopDetailInfoCard>
          <TastingNotesCard
            className="min-h-[178px]"
            profile={item.tastingNotes}
          />
        </div>

        <section className="border-t border-white/10 px-4 pb-4 pt-3">
          <h2 className="editorial-title text-center text-[18px] uppercase tracking-[0.18em] text-white">
            You may also like
          </h2>
          <div className="mt-3 grid grid-cols-4 gap-4">
            {relatedItems.map((relatedItem) => (
              <DesktopRelatedMenuCard
                item={relatedItem}
                key={relatedItem.id}
                onAddToCart={onAddRelatedItem}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export function DesktopItemCustomizeView({
  availableAddOns,
  availableSidePairings,
  customizations,
  item,
  notes,
  quantity,
  selectedAddOnIds,
  totalCents,
  unitPriceCents,
  onAddOnToggle,
  onAddToCart,
  onBackToMenu,
  onCustomizationChange,
  onNotesChange,
  onQuantityChange,
}: {
  availableAddOns: CartAddOnDefinition[];
  availableSidePairings: CartAddOnDefinition[];
  customizations: CartCustomization[];
  item: MenuItem;
  notes: string;
  quantity: number;
  selectedAddOnIds: string[];
  totalCents: number;
  unitPriceCents: number;
  onAddOnToggle: (addOnId: string) => void;
  onAddToCart: () => void;
  onBackToMenu: () => void;
  onCustomizationChange: (groupId: string, optionId: string) => void;
  onNotesChange: (notes: string) => void;
  onQuantityChange: (quantity: number) => void;
}) {
  const galleryImages = buildCustomizeGalleryImages(item);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeGalleryIndex = galleryImages.length
    ? activeImageIndex % galleryImages.length
    : 0;
  const activeImage = galleryImages[activeGalleryIndex] || item.image.publicUrl;
  const selectedToppingAddOns = availableAddOns.filter((addOn) =>
    selectedAddOnIds.includes(addOn.id),
  );
  const selectedSideAddOns = availableSidePairings.filter((addOn) =>
    selectedAddOnIds.includes(addOn.id),
  );

  return (
    <main className="mx-auto max-w-[1574px] px-7 pb-5 pt-4">
      <button
        className="mb-4 inline-flex items-center gap-2 text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onBackToMenu}
        type="button"
      >
        <ChevronIcon direction="left" size={18} />
        Back to menu
      </button>

      <section className="grid h-[690px] grid-cols-[0.42fr_0.34fr_0.24fr] overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[#080a0b] shadow-[0_26px_90px_rgba(0,0,0,0.54)]">
        <div className="relative min-h-0 overflow-hidden">
          <Image
            alt={item.image.alt || item.name}
            className="object-cover object-[51%_48%]"
            fill
            loading="eager"
            priority
            sizes="650px"
            src={activeImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.08)_48%,rgba(0,0,0,0.86)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <span className="rounded-[8px] border border-[var(--sb-gold)]/34 bg-[var(--sb-gold)]/8 px-3 py-1 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
              Chef&apos;s Special
            </span>
            <h1 className="editorial-title mt-3 text-[36px] leading-none text-white">
              {item.name}
            </h1>
            <p className="mt-2 text-[15px] text-[var(--sb-gold-soft)]">
              {item.description}
            </p>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {customizeFeaturePills.map(([icon, title, copy]) => (
                <div className="grid grid-cols-[28px_1fr] gap-2" key={title}>
                  <AssetIcon size={24} src={`/assets/icons/${icon}`} />
                  <p className="text-[11px] leading-4 text-white/64">
                    <span className="block text-white/82">{title}</span>
                    {copy}
                  </p>
                </div>
              ))}
            </div>
            <DesktopImageThumbs
              activeImageIndex={activeGalleryIndex}
              galleryImages={galleryImages}
              itemName={item.name}
              onImageSelect={setActiveImageIndex}
            />
          </div>
        </div>

        <div className="min-h-0 space-y-2 border-l border-white/10 p-5">
          <section className="grid grid-cols-[1fr_126px_92px] items-center gap-4 border-b border-white/10 pb-2">
            <h2 className="editorial-title text-[17px] uppercase tracking-[0.08em]">
              Quantity
            </h2>
            <DesktopQuantity
              label={item.name}
              quantity={quantity}
              onQuantityChange={onQuantityChange}
            />
            <p className="text-right">
              <span className="block font-mono text-[17px] text-white">
                {formatMoney(item.priceCents)}
              </span>
              <span className="text-[11px] uppercase tracking-[0.08em] text-white/42">
                Per piece
              </span>
            </p>
          </section>

          <CustomizeGroup title="Add-ons">
            <div className="grid grid-cols-3 gap-2">
              {availableAddOns.map((addOn) => (
                <DesktopAddOnButton
                  addOn={addOn}
                  checked={selectedAddOnIds.includes(addOn.id)}
                  key={addOn.id}
                  onToggle={onAddOnToggle}
                />
              ))}
            </div>
          </CustomizeGroup>

          <CustomizeGroup title="Preparation">
            <div className="grid gap-2">
              {cartCustomizationGroups.map((group) => {
                const selected = customizations.find(
                  (customization) => customization.groupId === group.id,
                );

                return (
                  <fieldset
                    className="grid grid-cols-[66px_1fr] items-center gap-3"
                    key={group.id}
                  >
                    <legend className="sr-only">{group.label}</legend>
                    <span
                      aria-hidden="true"
                      className="text-[11px] uppercase tracking-[0.1em] text-white/52"
                    >
                      {group.label}
                    </span>
                    <div
                      aria-label={group.label}
                      className="grid grid-cols-3 gap-2"
                      role="radiogroup"
                    >
                      {group.options.map((option) => (
                        <label
                          className={classNames(
                            "grid min-h-[36px] cursor-pointer place-items-center rounded-[9px] border px-2 text-center text-[12px] transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sb-gold",
                            selected?.optionId === option.id
                              ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/12 text-white"
                              : "border-white/12 bg-white/[0.025] text-white/58",
                          )}
                          key={option.id}
                        >
                          <input
                            checked={selected?.optionId === option.id}
                            className="sr-only"
                            name={`desktop-customization-${item.id}-${group.id}`}
                            onChange={() =>
                              onCustomizationChange(group.id, option.id)
                            }
                            type="radio"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                );
              })}
            </div>
          </CustomizeGroup>

          <CustomizeGroup title="Side options">
            <div className="grid grid-cols-4 gap-2">
              {availableSidePairings.slice(0, 4).map((addOn) => (
                <DesktopAddOnButton
                  addOn={addOn}
                  checked={selectedAddOnIds.includes(addOn.id)}
                  compact
                  key={addOn.id}
                  onToggle={onAddOnToggle}
                />
              ))}
            </div>
          </CustomizeGroup>

          <CustomizeGroup title="Special instructions">
            <textarea
              className="min-h-[42px] w-full resize-none rounded-[10px] border border-white/12 bg-black/24 px-4 py-2.5 text-[13px] text-white outline-none placeholder:text-white/35 focus:border-[var(--sb-gold)]"
              maxLength={180}
              onChange={(event) => onNotesChange(event.target.value)}
              placeholder="Any special requests or notes for our chef..."
              value={notes}
            />
          </CustomizeGroup>
        </div>

        <aside className="min-h-0 border-l border-white/10 p-5">
          <h2 className="editorial-title text-[20px] uppercase tracking-[0.08em]">
            Your selection
          </h2>
          <div className="mt-5 grid grid-cols-[88px_1fr_auto] gap-4 border-b border-white/10 pb-5">
            <div className="relative h-[74px] overflow-hidden rounded-[9px]">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="90px"
                src={item.image.publicUrl}
              />
            </div>
            <div>
              <p className="font-semibold text-white">{item.name}</p>
              <p className="mt-1 text-[13px] text-white/54">
                {item.description}
              </p>
              <p className="mt-2 font-mono text-[var(--sb-gold-soft)]">
                {formatMoney(item.priceCents)}
              </p>
            </div>
            <p className="font-mono text-sm text-white/72">x {quantity}</p>
          </div>

          <SelectionSummary
            customizations={customizations}
            item={item}
            quantity={quantity}
            selectedSideAddOns={selectedSideAddOns}
            selectedToppingAddOns={selectedToppingAddOns}
            totalCents={totalCents}
            unitPriceCents={unitPriceCents}
          />

          <Button
            className="mt-6 h-[58px] w-full rounded-[12px] text-[15px] uppercase tracking-[0.08em]"
            onClick={onAddToCart}
          >
            Add to cart
            <span>{formatMoney(totalCents)}</span>
          </Button>
          <p className="mt-5 flex items-center justify-center gap-2 text-[12px] text-white/46">
            <AssetIcon size={16} src="/assets/icons/chef-crest-icon.png" />
            Secure checkout
          </p>
        </aside>
      </section>

      <div className="mt-4">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}
