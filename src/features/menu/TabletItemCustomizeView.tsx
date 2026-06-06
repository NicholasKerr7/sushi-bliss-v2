"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { cartCustomizationGroups } from "@/data/cart";
import { icons } from "@/features/home/visualHomeData";
import { getTabletPresentationImage } from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";
import type { CartAddOnDefinition, CartCustomization } from "@/types/order";

import {
  AddOnCard,
  OptionPanel,
  ProductStoryCard,
} from "./TabletItemCustomizePanels";
import { TabletQuantityStepper } from "./TabletItemQuantityStepper";

interface TabletCustomizeViewProps {
  availableAddOns: CartAddOnDefinition[];
  customizations: CartCustomization[];
  item: MenuItem;
  notes: string;
  quantity: number;
  selectedAddOnIds: string[];
  totalCents: number;
  unitPriceCents: number;
  onAddOnToggle: (addOnId: string) => void;
  onAddToCart: () => void;
  onCustomizationChange: (groupId: string, optionId: string) => void;
  onNotesChange: (notes: string) => void;
  onQuantityChange: (quantity: number) => void;
  onViewDetail: () => void;
}

const dietaryPreferences = [
  "Gluten Free",
  "Soy Free",
  "Nut Allergy",
  "Dairy Free",
  "None",
] as const;

export function TabletCustomizeView({
  availableAddOns,
  customizations,
  item,
  notes,
  quantity,
  selectedAddOnIds,
  totalCents,
  unitPriceCents,
  onAddOnToggle,
  onAddToCart,
  onCustomizationChange,
  onNotesChange,
  onQuantityChange,
  onViewDetail,
}: TabletCustomizeViewProps) {
  const heroImage = getTabletPresentationImage(item);
  const galleryImages = [
    heroImage,
    item.ingredientImage?.publicUrl,
    item.sakePairing?.image?.publicUrl,
    item.image.publicUrl,
  ].filter((imageUrl, index, imageUrls): imageUrl is string =>
    Boolean(imageUrl && imageUrls.indexOf(imageUrl) === index),
  );
  const selectedCustomizationsCount =
    selectedAddOnIds.length + customizations.length;

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <button
          className="flex h-11 items-center gap-3 rounded-full border border-white/12 bg-white/[0.035] px-5 text-[15px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          onClick={onViewDetail}
          type="button"
        >
          <span aria-hidden="true">←</span>
          Back to menu
        </button>
        <p className="text-[14px] uppercase tracking-[0.28em] text-white/40">
          Customize order
        </p>
      </div>

      <section className="mt-4 grid grid-cols-[500px_1fr] gap-4 rounded-[26px] border border-white/10 bg-[#0d0f10] p-4">
        <ProductStoryCard
          galleryImages={galleryImages}
          heroImage={heroImage}
          item={item}
          unitPriceCents={unitPriceCents}
        />

        <div className="grid content-start gap-3">
          <section className="flex min-h-[66px] items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.035] px-5">
            <div className="flex items-center gap-3">
              <AssetIcon size={24} src={icons.nigiri} />
              <h2 className="font-serif text-[17px] uppercase tracking-[0.08em] text-white/86">
                Quantity
              </h2>
            </div>
            <TabletQuantityStepper
              className="w-[170px] grid-cols-[42px_1fr_42px] rounded-[12px] border-[var(--sb-gold)]/18 bg-black/24 p-1 [&_button]:h-9 [&_button]:w-9 [&_button]:rounded-[10px] [&_span:first-child]:hidden"
              onChange={onQuantityChange}
              value={quantity}
            />
          </section>

          <OptionPanel
            description="Optional extras to elevate your dish"
            icon={icons.crown}
            title="Add-ons"
          >
            <div className="grid grid-cols-2 gap-3">
              {availableAddOns.map((addOn) => (
                <AddOnCard
                  addOn={addOn}
                  checked={selectedAddOnIds.includes(addOn.id)}
                  itemId={item.id}
                  key={addOn.id}
                  onToggle={onAddOnToggle}
                />
              ))}
            </div>
          </OptionPanel>

          <OptionPanel
            description="Choose the preparation details"
            icon={icons.flower}
            title="Sauces and seasonings"
          >
            <div className="grid grid-cols-3 gap-3">
              {cartCustomizationGroups.map((group) => {
                const selected = customizations.find(
                  (customization) => customization.groupId === group.id,
                );

                return (
                  <fieldset
                    className="rounded-[16px] border border-white/10 bg-black/20 p-3"
                    key={group.id}
                  >
                    <legend className="px-1 text-[13px] font-semibold text-white/78">
                      {group.label}
                    </legend>
                    <div className="mt-2 grid gap-2">
                      {group.options.map((option) => (
                        <label
                          className={classNames(
                            "flex min-h-[34px] cursor-pointer items-center justify-between gap-2 rounded-[10px] border px-3 text-[12px] transition",
                            selected?.optionId === option.id
                              ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/12 text-white"
                              : "border-white/10 bg-white/[0.025] text-white/58",
                          )}
                          htmlFor={`tablet-customization-${item.id}-${group.id}-${option.id}`}
                          key={option.id}
                        >
                          <input
                            checked={selected?.optionId === option.id}
                            className="sr-only"
                            id={`tablet-customization-${item.id}-${group.id}-${option.id}`}
                            name={`tablet-customization-${item.id}-${group.id}`}
                            onChange={() =>
                              onCustomizationChange(group.id, option.id)
                            }
                            type="radio"
                          />
                          {option.label}
                          {selected?.optionId === option.id ? (
                            <span
                              aria-hidden="true"
                              className="grid h-5 w-5 place-items-center rounded-full border border-[var(--sb-red-bright)] text-[11px] text-[var(--sb-red-bright)]"
                            >
                              ✓
                            </span>
                          ) : null}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                );
              })}
            </div>
          </OptionPanel>

          <OptionPanel
            description="Tell us about allergies or requirements"
            icon={icons.leaf}
            title="Dietary preferences"
          >
            <div className="flex flex-wrap gap-2">
              {dietaryPreferences.map((preference) => (
                <span
                  className={classNames(
                    "rounded-[10px] border px-3 py-2 text-[12px]",
                    preference === "None"
                      ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/12 text-white"
                      : "border-white/10 bg-black/18 text-white/58",
                  )}
                  key={preference}
                >
                  {preference}
                </span>
              ))}
            </div>
          </OptionPanel>

          <OptionPanel
            description="Optional"
            icon={icons.settings}
            title="Special instructions"
          >
            <label className="sr-only" htmlFor={`tablet-notes-${item.id}`}>
              Special instructions
            </label>
            <textarea
              className="min-h-[52px] w-full resize-none rounded-[12px] border border-white/10 bg-black/24 px-4 py-3 text-[13px] text-white outline-none placeholder:text-white/36 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
              id={`tablet-notes-${item.id}`}
              maxLength={180}
              onChange={(event) => onNotesChange(event.target.value)}
              placeholder="Any special requests or notes for our chef..."
              value={notes}
            />
            <p className="mt-1 text-right text-[11px] text-white/38">
              {notes.length}/180
            </p>
          </OptionPanel>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-[260px_1fr_180px_270px] items-center gap-6 rounded-[20px] border border-[var(--sb-gold)]/28 bg-[#111111]/95 p-4 shadow-[0_24px_70px_rgb(0_0_0_/_0.56)] backdrop-blur">
        <div className="grid grid-cols-[64px_1fr] items-center gap-4">
          <div className="relative h-[64px] overflow-hidden rounded-[10px] border border-white/12">
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="64px"
              src={item.image.publicUrl}
            />
          </div>
          <div>
            <p className="font-serif text-[15px] uppercase tracking-[0.08em]">
              {item.name}
            </p>
            <p className="mt-1 text-[14px] text-white/72">
              {quantity} {quantity === 1 ? "Piece" : "Pieces"}
            </p>
            <button
              className="mt-2 text-[13px] text-[var(--sb-gold-soft)]"
              onClick={onViewDetail}
              type="button"
            >
              View details ↑
            </button>
          </div>
        </div>
        <div className="border-l border-white/12 pl-8">
          <p className="font-serif text-[15px] uppercase tracking-[0.08em]">
            Customizations
          </p>
          <p className="mt-1 text-[14px] text-white/72">
            {selectedCustomizationsCount} selected
          </p>
        </div>
        <div className="border-l border-white/12 pl-8">
          <p className="font-mono text-[26px] text-white">
            {formatMoney(totalCents)}
          </p>
          <p className="mt-1 text-[13px] text-white/54">Estimated total</p>
        </div>
        <Button
          className="h-[72px] rounded-[16px] text-[17px] uppercase tracking-[0.08em]"
          onClick={onAddToCart}
        >
          Add to cart
          <span className="block font-mono text-[18px]">
            {formatMoney(totalCents)}
          </span>
        </Button>
      </div>
    </>
  );
}
