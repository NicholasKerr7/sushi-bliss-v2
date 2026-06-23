"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { CarouselIndicator } from "@/components/ui/CarouselIndicator";
import { icons } from "@/features/home/visualHomeData";
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

import { ReservationHandoffCard } from "./ReservationHandoffCard";
import { PairingImageBackdrop } from "./PairingImageBackdrop";
import { TabletQuantityStepper } from "./TabletItemQuantityStepper";
import { TastingNotesCard } from "./TastingNotesCard";

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
  const galleryImages = useMemo(() => getMenuItemGalleryImages(item), [item]);
  const [galleryState, setGalleryState] = useState({
    imageIndex: 0,
    itemId: item.id,
  });
  const imageIndex =
    galleryState.itemId === item.id ? galleryState.imageIndex : 0;
  const activeImage =
    galleryImages[imageIndex] || getTabletPresentationImage(item);
  const isDrinkItem = item.itemType === "drink";
  const isOnlineOrderable = isMenuItemOnlineOrderable(item);
  const orderAction = getMenuItemOrderAction(item);
  const tastingProfile = item.beverageTastingNotes || item.tastingNotes;
  const selectImage = (nextImageIndex: number) => {
    setGalleryState({ imageIndex: nextImageIndex, itemId: item.id });
  };

  const showPreviousImage = () => {
    selectImage(imageIndex === 0 ? galleryImages.length - 1 : imageIndex - 1);
  };
  const showNextImage = () => {
    selectImage(imageIndex === galleryImages.length - 1 ? 0 : imageIndex + 1);
  };

  return (
    <>
      <section className="mt-4 overflow-hidden rounded-[26px] border border-white/10 bg-[#101112] shadow-[0_26px_80px_rgb(0_0_0_/_0.48)]">
        <div className="relative h-[440px]">
          <PairingImageBackdrop imageUrl={activeImage} sizes="1034px" />
          <Image
            alt={item.image.alt || item.name}
            className={getMenuGalleryImageClassName(
              activeImage,
              "object-cover object-[58%_48%]",
              "object-cover object-[50%_50%]",
            )}
            fill
            loading="eager"
            priority
            sizes="1034px"
            src={activeImage}
          />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#101112] via-[#101112]/82 to-transparent" />
          <nav
            aria-label="Item breadcrumb"
            className="absolute left-7 top-6 flex items-center gap-4 text-[14px] text-white/70"
          >
            <button
              className="flex items-center gap-2 text-[var(--sb-gold)] hover:text-[var(--sb-gold-soft)]"
              onClick={onClose}
              type="button"
            >
              <ChevronIcon direction="left" size={18} />
              Back
            </button>
            <Link className="hover:text-white" href="/home">
              Home
            </Link>
            <ChevronIcon direction="right" size={18} />
            <button
              className="hover:text-white"
              onClick={onClose}
              type="button"
            >
              Menu
            </button>
            <ChevronIcon direction="right" size={18} />
            <span className="text-[var(--sb-red-bright)]">{item.name}</span>
          </nav>
          {galleryImages.length > 1 ? (
            <>
              <button
                aria-label="Show previous image"
                className="absolute left-8 top-1/2 grid h-[54px] w-[54px] -translate-y-1/2 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/34 text-[34px] text-[var(--sb-gold-soft)] shadow-soft backdrop-blur"
                onClick={showPreviousImage}
                type="button"
              >
                <ChevronIcon direction="left" size={18} />
              </button>
              <button
                aria-label="Show next image"
                className="absolute right-8 top-1/2 grid h-[54px] w-[54px] -translate-y-1/2 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/34 text-[34px] text-[var(--sb-gold-soft)] shadow-soft backdrop-blur"
                onClick={showNextImage}
                type="button"
              >
                <ChevronIcon direction="right" size={18} />
              </button>
            </>
          ) : null}
          <CarouselIndicator
            activeIndex={imageIndex}
            ariaLabel="Item image gallery"
            className="absolute inset-x-0 bottom-6 flex justify-center"
            count={galleryImages.length}
            labelPrefix="Show image"
            onSelect={selectImage}
          />
        </div>

        <div className="px-8 pb-6 pt-3">
          <div className="grid grid-cols-[minmax(0,1fr)_468px] gap-8 border-b border-white/10 pb-4">
            <div>
              <span className="inline-flex rounded-[8px] border border-[var(--sb-gold)]/34 bg-[var(--sb-gold)]/8 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
                {isDrinkItem ? "Liquid Omakase" : "Chef's Special"}
              </span>
              <h1
                className="editorial-title mt-2 text-[50px] leading-[0.95] text-white"
                id={`tablet-item-detail-${item.id}`}
              >
                {item.name}
              </h1>
              <p className="mt-2 max-w-[620px] text-[17px] leading-7 text-white/72">
                {item.description}
              </p>
              <p className="mt-3 font-mono text-[30px] font-semibold text-[var(--sb-gold-soft)]">
                {formatMoney(totalCents)}
              </p>
            </div>

            <aside className="pt-8">
              {isOnlineOrderable ? (
                <div className="grid grid-cols-[170px_1fr] gap-4">
                  <TabletQuantityStepper
                    className="w-[148px] grid-cols-[42px_1fr_42px] rounded-[12px] border-[var(--sb-gold)]/28 bg-black/24 p-1 [&_button]:h-9 [&_button]:w-9 [&_button]:rounded-[10px] [&_span:first-child]:hidden"
                    onChange={onQuantityChange}
                    value={quantity}
                  />
                  <Button
                    aria-label={orderAction.label}
                    className="h-[64px] rounded-[17px] text-[16px] uppercase tracking-[0.08em]"
                    onClick={onAddToCart}
                  >
                    {orderAction.label}
                    <span aria-hidden="true">•</span>
                    <span aria-hidden="true">{formatMoney(totalCents)}</span>
                  </Button>
                </div>
              ) : (
                <ReservationHandoffCard
                  action={orderAction}
                  item={item}
                  variant="tablet"
                />
              )}
              <div className="mt-4 grid grid-cols-2 gap-4">
                {isDrinkItem ? (
                  <Button
                    className="h-[50px] rounded-[17px] text-[15px]"
                    href={
                      isOnlineOrderable
                        ? "/reservations"
                        : orderAction.href || "/reservations"
                    }
                    variant="secondary"
                  >
                    {isOnlineOrderable ? "Pairing table" : "View tables"}
                  </Button>
                ) : (
                  <Button
                    className="h-[50px] rounded-[17px] text-[15px]"
                    onClick={onCustomize}
                    variant="secondary"
                  >
                    Customize
                  </Button>
                )}
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

          <p className="mt-4 max-w-[760px] text-[15px] leading-6 text-white/72">
            {item.chefNote}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <TabletDetailInfoCard
              icon={
                isDrinkItem
                  ? "/assets/editorial/sake-vase-set-black-gold-floral.webp"
                  : icons.leaf
              }
              title={isDrinkItem ? "Build" : "Ingredients"}
            >
              <p className="text-[15px] leading-6 text-white/66">
                {item.ingredients.join(", ")}
              </p>
            </TabletDetailInfoCard>

            <TabletDetailInfoCard
              icon={icons.chef}
              title={isDrinkItem ? "Sommelier Note" : "Chef Note"}
            >
              <p className="text-[15px] leading-6 text-white/66">
                {isDrinkItem
                  ? orderAction.note
                  : "Prepared with the house balance and finished moments before serving."}
              </p>
            </TabletDetailInfoCard>

            <TastingNotesCard
              className="min-h-[150px]"
              profile={tastingProfile}
              variant={isDrinkItem ? "drink" : "food"}
            />
          </div>

          {item.sakePairing ? (
            <section className="relative mt-4 grid min-h-[124px] grid-cols-[minmax(0,1fr)_238px] items-center gap-5 overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(215,168,79,0.13),rgba(255,255,255,0.018)_48%,rgba(7,9,10,0.94))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.26)] min-[980px]:grid-cols-[minmax(0,1fr)_260px]">
              <span className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(215,168,79,0.22),transparent_68%)]" />
              <div className="relative z-10 flex min-w-0 items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/42">
                  <AssetIcon
                    size={34}
                    src="/assets/editorial/sake-vase-set-black-gold-floral.webp"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
                    Perfect Pairing
                  </p>
                  <h2 className="mt-1 line-clamp-2 text-[22px] font-semibold leading-7">
                    {item.sakePairing.sakeName}
                  </h2>
                  <p className="mt-1 text-[14px] leading-6 text-white/64">
                    A premium sake with floral notes that complements{" "}
                    {item.name}.
                  </p>
                </div>
              </div>
              <Button
                className="relative z-10 h-[50px] rounded-[17px]"
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

function TabletDetailInfoCard({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon?: string;
  title: string;
}) {
  return (
    <article className="relative flex h-full min-h-[150px] overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018)_44%,rgba(7,9,10,0.96))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_45px_rgba(0,0,0,0.24)]">
      <span className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(215,168,79,0.14),transparent_68%)]" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.32),transparent)]" />
      <div className="relative z-10 min-w-0">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/34 bg-black/42">
            <AssetIcon size={27} src={icon} />
          </span>
          <h2 className="min-w-0 truncate text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
            {title}
          </h2>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </article>
  );
}

function RelatedMenuCard({
  item,
  onAddRelatedItem,
}: {
  item: MenuItem;
  onAddRelatedItem: (item: MenuItem) => void;
}) {
  const orderAction = getMenuItemOrderAction(item);

  return (
    <article className="grid h-[106px] grid-cols-[130px_1fr] overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.035]">
      <div className="relative h-[106px]">
        <Image
          alt={item.image.alt || item.name}
          className="object-cover"
          fill
          loading="eager"
          sizes="126px"
          src={item.image.publicUrl}
        />
      </div>
      <div className="grid grid-cols-[1fr_44px] gap-2 p-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">
            {item.categoryLabel}
          </p>
          <h3 className="mt-1 line-clamp-2 text-[17px] font-semibold leading-5">
            {item.name}
          </h3>
          <span className="mt-2 block font-mono text-[var(--sb-gold-soft)]">
            {formatMoney(item.priceCents)}
          </span>
        </div>
        {orderAction.kind === "reservation" ? (
          <Link
            aria-label={`${orderAction.label} for ${item.name}`}
            className="self-end rounded-full border border-[var(--sb-gold)]/50 bg-[var(--sb-gold)]/12 p-2.5 text-[22px] leading-none text-[var(--sb-gold-soft)]"
            href={orderAction.href || "/reservations"}
          >
            <AssetIcon size={18} src={orderAction.icon} />
          </Link>
        ) : (
          <button
            aria-label={`Add ${item.name}`}
            className="self-end rounded-full border border-[var(--sb-gold)]/50 bg-black/20 p-2.5 text-[22px] leading-none text-[var(--sb-gold-soft)]"
            onClick={() => onAddRelatedItem(item)}
            type="button"
          >
            +
          </button>
        )}
      </div>
    </article>
  );
}
