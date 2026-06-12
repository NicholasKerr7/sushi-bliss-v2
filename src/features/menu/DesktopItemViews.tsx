import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { cartCustomizationGroups } from "@/data/cart";
import { getTabletPresentationImage } from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";
import type { CartAddOnDefinition, CartCustomization } from "@/types/order";

import {
  CustomizeGroup,
  DesktopAddOnButton,
  DesktopQuantity,
  InfoCard,
} from "./DesktopMenuPrimitives";
import type { DesktopMenuAddHandler } from "./DesktopMenuTypes";
import { DesktopCompactMenuRow } from "./DesktopMenuSurface";
import { DesktopBenefitStrip } from "./DesktopMenuChrome";

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
  return (
    <main className="mx-auto max-w-[1530px] px-7 pb-6 pt-4">
      <section className="overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[#080a0b] shadow-[0_26px_90px_rgba(0,0,0,0.54)]">
        <div className="grid min-h-[430px] grid-cols-[0.55fr_0.45fr] border-b border-white/10">
          <div className="relative min-h-[430px]">
            <Image
              alt={item.image.alt || item.name}
              className="object-cover object-[56%_48%]"
              fill
              priority
              sizes="780px"
              src={getTabletPresentationImage(item)}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.42))]" />
            <button
              className="absolute left-7 top-7 text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              onClick={onBackToMenu}
              type="button"
            >
              Back to menu
            </button>
          </div>
          <div className="flex flex-col justify-center p-9">
            <span className="w-max rounded-[8px] border border-[var(--sb-gold)]/34 bg-[var(--sb-gold)]/8 px-3 py-1 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
              Chef&apos;s Special
            </span>
            <h1 className="editorial-title mt-4 text-[54px] leading-none text-white">
              {item.name}
            </h1>
            <p className="mt-3 text-[17px] leading-7 text-white/70">
              {item.description}
            </p>
            <p className="mt-5 font-mono text-[30px] text-[var(--sb-gold-soft)]">
              {formatMoney(item.priceCents)}
            </p>
            <div className="mt-5 grid grid-cols-[140px_1fr] gap-4">
              <DesktopQuantity
                label={item.name}
                quantity={quantity}
                onQuantityChange={onQuantityChange}
              />
              <Button
                aria-label="Add to Cart"
                className="h-[58px] rounded-[13px] text-[15px] uppercase tracking-[0.08em]"
                onClick={onAddToCart}
              >
                Add to cart
                <span aria-hidden="true">{formatMoney(totalCents)}</span>
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <button
                className="h-12 rounded-[12px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                onClick={onCustomize}
                type="button"
              >
                Customize
              </button>
              <button
                aria-pressed={isFavorite}
                className="h-12 rounded-[12px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                onClick={onToggleFavorite}
                type="button"
              >
                {isFavorite ? "Saved" : "Favorite"}
              </button>
              <button
                className="h-12 rounded-[12px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                type="button"
              >
                Share
              </button>
            </div>
            <p className="mt-5 border-t border-white/10 pt-5 text-[16px] leading-7 text-white/68">
              {item.chefNote}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 p-5">
          <InfoCard title="Ingredients">{item.ingredients.join(", ")}</InfoCard>
          <InfoCard title="Chef's Note">
            Hand-selected daily and prepared moments before serving.
          </InfoCard>
          <InfoCard title="Perfect Pairing">
            {item.sakePairing?.sakeName || "Ask your chef for today's pairing."}
          </InfoCard>
          <InfoCard title="Tasting Notes">
            Richness, umami, tenderness, and a clean finish.
          </InfoCard>
        </div>
        <section className="border-t border-white/10 p-5">
          <h2 className="text-center text-[18px] uppercase tracking-[0.18em] text-white">
            You may also like
          </h2>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {relatedItems.map((relatedItem) => (
              <DesktopCompactMenuRow
                item={relatedItem}
                key={relatedItem.id}
                onAddToCart={onAddRelatedItem}
                onViewDetails={() => undefined}
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
  return (
    <main className="mx-auto max-w-[1574px] px-7 pb-6 pt-4">
      <button
        className="mb-4 text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onBackToMenu}
        type="button"
      >
        Back to menu
      </button>
      <section className="grid grid-cols-[0.42fr_0.34fr_0.24fr] overflow-hidden rounded-[22px] border border-[var(--sb-border)] bg-[#080a0b] shadow-[0_26px_90px_rgba(0,0,0,0.54)]">
        <div className="relative min-h-[650px]">
          <Image
            alt={item.image.alt || item.name}
            className="object-cover object-[52%_50%]"
            fill
            priority
            sizes="650px"
            src={getTabletPresentationImage(item)}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/74 to-transparent p-8">
            <span className="rounded-[8px] border border-[var(--sb-gold)]/34 bg-[var(--sb-gold)]/8 px-3 py-1 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
              Chef&apos;s Special
            </span>
            <h1 className="editorial-title mt-4 text-[40px] leading-none text-white">
              {item.name}
            </h1>
            <p className="mt-3 text-[16px] text-[var(--sb-gold-soft)]">
              {item.description}
            </p>
          </div>
        </div>
        <div className="space-y-4 border-l border-white/10 p-6">
          <section className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="editorial-title text-[18px] uppercase tracking-[0.08em]">
              Quantity
            </h2>
            <DesktopQuantity
              label={item.name}
              quantity={quantity}
              onQuantityChange={onQuantityChange}
            />
            <p className="font-mono text-[18px] text-white">
              {formatMoney(unitPriceCents)}
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
          <CustomizeGroup title="Sauces and seasonings">
            <div className="grid gap-3">
              {cartCustomizationGroups.map((group) => {
                const selected = customizations.find(
                  (customization) => customization.groupId === group.id,
                );

                return (
                  <fieldset key={group.id}>
                    <legend className="mb-2 text-[12px] uppercase tracking-[0.1em] text-white/52">
                      {group.label}
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
                      {group.options.map((option) => (
                        <label
                          className={classNames(
                            "grid min-h-[40px] cursor-pointer place-items-center rounded-[10px] border px-2 text-center text-[12px]",
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
              className="min-h-[54px] w-full resize-none rounded-[10px] border border-white/12 bg-black/24 px-4 py-3 text-[13px] text-white outline-none placeholder:text-white/35 focus:border-[var(--sb-gold)]"
              maxLength={180}
              onChange={(event) => onNotesChange(event.target.value)}
              placeholder="Any special requests or notes for our chef..."
              value={notes}
            />
          </CustomizeGroup>
        </div>
        <aside className="border-l border-white/10 p-6">
          <h2 className="editorial-title text-[20px] uppercase tracking-[0.08em]">
            Your selection
          </h2>
          <div className="mt-5 grid grid-cols-[88px_1fr] gap-4 border-b border-white/10 pb-5">
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
                {formatMoney(unitPriceCents)} x {quantity}
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-[14px] text-white/62">
            <p>
              Add-ons
              <span className="mt-1 block text-white">
                {selectedAddOnIds.length || "None"}
              </span>
            </p>
            <p>
              Customizations
              <span className="mt-1 block text-white">
                {customizations.length} selected
              </span>
            </p>
            <p className="border-t border-white/10 pt-6">
              Subtotal
              <span className="float-right font-mono text-white">
                {formatMoney(totalCents)}
              </span>
            </p>
          </div>
          <Button
            className="mt-8 h-[62px] w-full rounded-[12px] text-[15px] uppercase tracking-[0.08em]"
            onClick={onAddToCart}
          >
            Add to cart
            <span>{formatMoney(totalCents)}</span>
          </Button>
        </aside>
      </section>
      <div className="mt-4">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}
