"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { cartCustomizationGroups } from "@/data/cart";
import { icons } from "@/features/home/visualHomeData";
import { getTabletPresentationImage } from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";
import type { CartAddOnDefinition, CartCustomization } from "@/types/order";

interface MobileItemCustomizeViewProps {
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
  onBack: () => void;
  onCustomizationChange: (groupId: string, optionId: string) => void;
  onNotesChange: (notes: string) => void;
  onQuantityChange: (quantity: number) => void;
}

const addOnIcons: Record<string, string> = {
  "caviar-5g": "/assets/icons/lotus-crown-icon.png",
  "gold-flakes": "/assets/icons/star-icon.png",
  "green-onion": "/assets/icons/vegetarian-sushi-icon.webp",
  "ikura-salmon-roe": "/assets/icons/nigiri-icon.png",
  "truffle-oil": "/assets/icons/miso-soup-icon.png",
  "yuzu-zest": "/assets/icons/star-icon.png",
};

export function MobileItemCustomizeView({
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
  onBack,
  onCustomizationChange,
  onNotesChange,
  onQuantityChange,
}: MobileItemCustomizeViewProps) {
  const selectedAddOns = availableAddOns.filter((addOn) =>
    selectedAddOnIds.includes(addOn.id),
  );
  const addOnTotalCents = selectedAddOns.reduce(
    (total, addOn) => total + addOn.priceCents * quantity,
    0,
  );
  const baseTotalCents = item.priceCents * quantity;
  const pointsEarned = Math.max(1, Math.floor(totalCents / 100));

  return (
    <div className="h-dvh overflow-y-auto bg-black px-4 pb-8 pt-5">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_8%,rgba(120,14,12,0.22),transparent_24%),radial-gradient(circle_at_88%_24%,rgba(202,164,93,0.08),transparent_24%),linear-gradient(180deg,#050505_0%,#080706_42%,#030303_100%)]" />
      </div>

      <div className="mobile-frame relative z-10">
        <header className="grid grid-cols-[52px_1fr_52px] items-center">
          <button
            aria-label="Back to item details"
            className="grid h-[48px] w-[48px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/36 text-[24px] text-[var(--sb-gold)]"
            onClick={onBack}
            type="button"
          >
            <ChevronIcon direction="left" size={18} />
          </button>
          <h1 className="editorial-title text-center text-[19px] uppercase tracking-[0.14em] text-[var(--sb-gold)]">
            Customize Your Item
          </h1>
          <div className="relative justify-self-end">
            <AssetIcon loading="eager" size={32} src={icons.cart} />
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold">
              {quantity}
            </span>
          </div>
        </header>

        <section className="mt-5 grid grid-cols-[128px_minmax(0,1fr)] gap-3 rounded-[18px] border border-[var(--sb-border)] bg-black/46 p-3 min-[390px]:grid-cols-[138px_1fr] min-[390px]:gap-4 min-[390px]:p-4">
          <div className="relative h-[118px] overflow-hidden rounded-[12px] border border-[var(--sb-border)] min-[390px]:h-[128px]">
            <Image
              alt=""
              className="object-cover"
              fill
              loading="eager"
              priority
              sizes="138px"
              src={getTabletPresentationImage(item)}
            />
          </div>
          <div className="min-w-0">
            <span className="rounded-[7px] border border-[var(--sb-red-bright)] bg-[var(--sb-red)]/24 px-2.5 py-1 text-[11px] uppercase text-white">
              {item.tags.includes("premium") ? "Premium" : item.categoryLabel}
            </span>
            <h2 className="editorial-title mt-3 line-clamp-2 text-[24px] leading-7">
              {item.name}
            </h2>
            <p className="mt-1 text-[15px] text-[var(--sb-gold)]">
              {item.description}
            </p>
            <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-white/64">
              {item.chefNote}
            </p>
            <p className="mt-4 text-[22px] text-[var(--sb-gold)]">
              {formatMoney(item.priceCents)}
            </p>
          </div>
          <div className="col-span-2 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
            <span className="text-[12px] uppercase tracking-[0.12em] text-white/48">
              Quantity
            </span>
            <SmallQuantityStepper
              onChange={onQuantityChange}
              value={quantity}
            />
          </div>
        </section>

        <section className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-black/42 p-4">
          <div className="flex items-start gap-3">
            <AssetIcon size={30} src={icons.flower} />
            <div>
              <h2 className="editorial-title text-[20px] uppercase tracking-[0.08em]">
                Add-ons
              </h2>
              <p className="mt-1 text-[13px] text-white/62">
                Elevate your experience with premium add-ons.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {availableAddOns.slice(0, 4).map((addOn) => (
              <MobileAddOnRow
                addOn={addOn}
                checked={selectedAddOnIds.includes(addOn.id)}
                key={addOn.id}
                onToggle={onAddOnToggle}
              />
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-black/42 p-4">
          <label
            className="editorial-title flex items-center gap-3 text-[18px] uppercase tracking-[0.08em] text-white/86"
            htmlFor={`mobile-notes-${item.id}`}
          >
            <AssetIcon size={26} src={icons.settings} />
            Special instructions
            <span className="text-[12px] text-white/42">(optional)</span>
          </label>
          <textarea
            className="mt-4 min-h-[92px] w-full resize-none rounded-[12px] border border-[var(--sb-border)] bg-black/36 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/38 focus:border-[var(--sb-gold)]"
            id={`mobile-notes-${item.id}`}
            maxLength={180}
            onChange={(event) => onNotesChange(event.target.value)}
            placeholder="E.g. No wasabi on the side, light soy sauce, extra ginger..."
            value={notes}
          />
          <p className="mt-2 text-right text-[12px] text-white/42">
            {notes.length}/180
          </p>
        </section>

        <section className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-black/42 p-4">
          <h2 className="editorial-title flex items-center gap-3 text-[18px] uppercase tracking-[0.08em]">
            <AssetIcon size={26} src={icons.chef} />
            Presentation preference
          </h2>
          <div className="mt-4 grid gap-3">
            {cartCustomizationGroups.map((group) => {
              const selected = customizations.find(
                (customization) => customization.groupId === group.id,
              );

              return (
                <fieldset
                  className="rounded-[14px] border border-white/10 bg-white/[0.025] p-3"
                  key={group.id}
                >
                  <legend className="px-1 text-[13px] uppercase text-[var(--sb-gold)]">
                    {group.label}
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.options.map((option) => (
                      <label
                        className={classNames(
                          "cursor-pointer rounded-[10px] border px-3 py-2 text-[12px]",
                          selected?.optionId === option.id
                            ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/16 text-white"
                            : "border-white/10 bg-black/24 text-white/58",
                        )}
                        key={option.id}
                      >
                        <input
                          checked={selected?.optionId === option.id}
                          className="sr-only"
                          name={`mobile-customization-${item.id}-${group.id}`}
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
        </section>

        <section className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-black/50 p-4">
          <h2 className="editorial-title flex items-center gap-3 text-[18px] uppercase tracking-[0.08em]">
            <AssetIcon size={26} src={icons.chef} />
            Order summary
          </h2>
          <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-[15px]">
            <SummaryLine
              label="Unit price"
              muted
              value={formatMoney(unitPriceCents)}
            />
            <SummaryLine
              label={item.name}
              value={formatMoney(baseTotalCents)}
            />
            {selectedAddOns.map((addOn) => (
              <SummaryLine
                key={addOn.id}
                label={addOn.label}
                value={formatMoney(addOn.priceCents * quantity)}
              />
            ))}
            <SummaryLine
              label="Add-ons"
              muted
              value={formatMoney(addOnTotalCents)}
            />
            <div className="border-t border-white/10 pt-3">
              <SummaryLine
                label="Total"
                large
                value={formatMoney(totalCents)}
              />
            </div>
          </div>
          <button
            aria-label={`Add ${quantity} to cart`}
            className="red-glow-button mt-5 min-h-[70px] w-full rounded-[14px] text-[17px] uppercase tracking-[0.08em]"
            onClick={onAddToCart}
            type="button"
          >
            Add to Cart - {formatMoney(totalCents)}
          </button>
          <p className="mt-4 text-center text-[13px] text-white/56">
            Earn{" "}
            <span className="text-[var(--sb-gold)]">
              {pointsEarned} Bliss Points
            </span>{" "}
            with this order
          </p>
        </section>
      </div>
    </div>
  );
}

function MobileAddOnRow({
  addOn,
  checked,
  onToggle,
}: {
  addOn: CartAddOnDefinition;
  checked: boolean;
  onToggle: (addOnId: string) => void;
}) {
  return (
    <button
      aria-pressed={checked}
      className={classNames(
        "grid min-h-[78px] w-full grid-cols-[56px_1fr_42px] items-center gap-3 rounded-[14px] border px-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]",
        checked
          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/12"
          : "border-white/10 bg-white/[0.025]",
      )}
      onClick={() => onToggle(addOn.id)}
      type="button"
    >
      <span className="grid h-[48px] w-[48px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/34">
        <AssetIcon
          size={30}
          src={addOnIcons[addOn.id] || "/assets/icons/star-icon.png"}
        />
      </span>
      <span>
        <span className="editorial-title block text-[16px] uppercase tracking-[0.04em]">
          {addOn.label}
        </span>
        <span className="mt-1 block text-[13px] text-white/58">
          {addOn.description}
        </span>
      </span>
      <span className="grid gap-2 justify-self-end text-right">
        <span className="text-[15px] text-[var(--sb-gold)]">
          {formatMoney(addOn.priceCents)}
        </span>
        <span
          aria-hidden="true"
          className={classNames(
            "grid h-8 w-8 place-items-center rounded-[9px] border text-[14px]",
            checked
              ? "border-[var(--sb-red-bright)] text-white"
              : "border-[var(--sb-border)] text-transparent",
          )}
        >
          {checked ? (
            <AssetIcon size={16} src="/assets/icons/check-icon.png" />
          ) : null}
        </span>
      </span>
    </button>
  );
}

function SmallQuantityStepper({
  onChange,
  value,
}: {
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <div className="grid h-11 w-[136px] grid-cols-[44px_48px_44px] overflow-hidden rounded-full border border-[var(--sb-border)] bg-black/34">
      <button
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
        type="button"
      >
        -
      </button>
      <output aria-label="Quantity" className="grid place-items-center">
        {value}
      </output>
      <button
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(12, value + 1))}
        type="button"
      >
        +
      </button>
    </div>
  );
}

function SummaryLine({
  label,
  large = false,
  muted = false,
  value,
}: {
  label: string;
  large?: boolean;
  muted?: boolean;
  value: string;
}) {
  return (
    <p
      className={classNames(
        "flex items-center justify-between gap-4",
        large && "text-[22px] text-[var(--sb-gold)]",
        muted && "text-white/58",
      )}
    >
      <span>{label}</span>
      <span>{value}</span>
    </p>
  );
}
