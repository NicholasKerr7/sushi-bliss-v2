"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { cartCustomizationGroups } from "@/data/cart";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";
import type { CartAddOnDefinition, CartCustomization } from "@/types/order";

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
  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <button
          className="flex h-11 items-center gap-3 rounded-full border border-white/12 bg-white/[0.035] px-5 text-[15px] text-white/78"
          onClick={onViewDetail}
          type="button"
        >
          <span aria-hidden="true">‹</span>
          Back to item details
        </button>
        <p className="text-[14px] uppercase tracking-[0.18em] text-white/38">
          Customize order
        </p>
      </div>

      <section className="mt-4 grid grid-cols-[0.88fr_1.12fr] gap-5">
        <article className="rounded-[26px] border border-white/10 bg-[#111111] p-5">
          <div className="relative h-[510px] overflow-hidden rounded-[22px] bg-white/[0.04]">
            <Image
              alt={item.image.alt || item.name}
              className="object-cover"
              fill
              priority
              sizes="440px"
              src={item.image.publicUrl}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/86 to-transparent p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
                {item.categoryLabel}
              </p>
              <h1 className="editorial-title mt-2 text-[42px] leading-none">
                {item.name}
              </h1>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <MiniGalleryImage imageUrl={item.image.publicUrl} label="Dish" />
            <MiniGalleryImage
              imageUrl={item.ingredientImage?.publicUrl || item.image.publicUrl}
              label="Ingredient"
            />
            <MiniGalleryImage
              imageUrl={
                item.sakePairing?.image?.publicUrl || item.image.publicUrl
              }
              label="Pairing"
            />
          </div>
          <p className="mt-4 text-[15px] leading-7 text-white/62">
            {item.chefNote}
          </p>
        </article>

        <article className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/42">
                Add-ons and preferences
              </p>
              <h2 className="mt-2 text-[32px] font-semibold">
                Customize {item.name}
              </h2>
            </div>
            <div className="rounded-[18px] border border-[var(--sb-gold)]/22 bg-[var(--sb-gold)]/10 px-5 py-4 text-right">
              <p className="text-[12px] uppercase tracking-[0.16em] text-white/42">
                Unit
              </p>
              <p className="font-mono text-[22px] font-semibold text-[var(--sb-gold-soft)]">
                {formatMoney(unitPriceCents)}
              </p>
            </div>
          </div>

          <TabletQuantityStepper
            className="mt-6"
            onChange={onQuantityChange}
            value={quantity}
          />

          <div className="mt-6">
            <h3 className="text-[19px] font-semibold">Premium add-ons</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {availableAddOns.map((addOn) => (
                <label
                  className="cursor-pointer"
                  htmlFor={`tablet-addon-${item.id}-${addOn.id}`}
                  key={addOn.id}
                >
                  <input
                    checked={selectedAddOnIds.includes(addOn.id)}
                    className="peer sr-only"
                    id={`tablet-addon-${item.id}-${addOn.id}`}
                    onChange={() => onAddOnToggle(addOn.id)}
                    type="checkbox"
                  />
                  <span className="block min-h-[124px] rounded-[18px] border border-white/10 bg-black/20 p-4 transition peer-checked:border-[var(--sb-gold)] peer-checked:bg-[var(--sb-gold)]/12">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-white/86">
                        {addOn.label}
                      </span>
                      <span className="font-mono text-[var(--sb-gold-soft)]">
                        {formatMoney(addOn.priceCents)}
                      </span>
                    </span>
                    <span className="mt-2 block text-[13px] leading-5 text-white/52">
                      {addOn.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {cartCustomizationGroups.map((group) => {
              const selected = customizations.find(
                (customization) => customization.groupId === group.id,
              );

              return (
                <fieldset
                  className="rounded-[18px] border border-white/10 bg-black/18 p-4"
                  key={group.id}
                >
                  <legend className="px-1 text-[15px] font-semibold text-white">
                    {group.label}
                  </legend>
                  <div className="mt-3 grid gap-2">
                    {group.options.map((option) => (
                      <label
                        className={classNames(
                          "flex min-h-[42px] cursor-pointer items-center rounded-[12px] border px-3 text-[13px] transition",
                          selected?.optionId === option.id
                            ? "border-[var(--sb-gold)] bg-[var(--sb-gold)]/12 text-white"
                            : "border-white/8 bg-white/[0.025] text-white/56",
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
                      </label>
                    ))}
                  </div>
                </fieldset>
              );
            })}
          </div>

          <div className="mt-6">
            <label
              className="text-[17px] font-semibold"
              htmlFor={`tablet-notes-${item.id}`}
            >
              Special instructions
            </label>
            <textarea
              className="mt-3 min-h-[116px] w-full resize-none rounded-[18px] border border-white/10 bg-black/24 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/36 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
              id={`tablet-notes-${item.id}`}
              maxLength={180}
              onChange={(event) => onNotesChange(event.target.value)}
              placeholder="Allergy notes, pacing, sauce on the side..."
              value={notes}
            />
          </div>
        </article>
      </section>

      <div className="sticky bottom-4 z-10 mt-5 grid grid-cols-[1fr_260px] items-center gap-5 rounded-[24px] border border-[var(--sb-gold)]/28 bg-[#111111]/95 p-5 shadow-[0_24px_70px_rgb(0_0_0_/_0.56)] backdrop-blur">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/42">
            Order summary
          </p>
          <p className="mt-1 text-[18px] text-white/72">
            {quantity} x {item.name} with selected preferences
          </p>
        </div>
        <Button className="h-[58px] rounded-[18px]" onClick={onAddToCart}>
          Add {formatMoney(totalCents)}
        </Button>
      </div>
    </>
  );
}

function MiniGalleryImage({
  imageUrl,
  label,
}: {
  imageUrl: string;
  label: string;
}) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.035]">
      <div className="relative h-[98px]">
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="130px"
          src={imageUrl}
        />
      </div>
      <p className="px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/48">
        {label}
      </p>
    </div>
  );
}
