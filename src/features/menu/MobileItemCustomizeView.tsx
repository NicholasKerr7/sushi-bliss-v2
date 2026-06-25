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

import { getAddOnImageSrc, getCompactAddOnLabel } from "./addOnVisuals";

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
  const selectedCount = selectedAddOns.length;

  return (
    <div className="smooth-scroll-area h-dvh overflow-x-hidden overflow-y-auto bg-black px-3 pb-[calc(7.75rem+var(--sb-safe-bottom))] pt-4 min-[390px]:px-4 min-[390px]:pt-5">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_8%,rgba(120,14,12,0.22),transparent_24%),radial-gradient(circle_at_88%_24%,rgba(202,164,93,0.08),transparent_24%),linear-gradient(180deg,#050505_0%,#080706_42%,#030303_100%)]" />
      </div>

      <div className="mobile-frame relative z-10">
        <header className="grid grid-cols-[40px_minmax(0,1fr)_36px] items-center gap-2 min-[390px]:grid-cols-[52px_1fr_52px] min-[390px]:gap-0">
          <button
            aria-label="Back to item details"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-border)] bg-black/36 text-[var(--sb-gold)] min-[390px]:h-[48px] min-[390px]:w-[48px]"
            onClick={onBack}
            type="button"
          >
            <ChevronIcon direction="left" size={18} />
          </button>
          <h1 className="editorial-title min-w-0 text-center text-[12px] uppercase leading-5 tracking-[0.03em] text-[var(--sb-gold)] min-[390px]:text-[19px] min-[390px]:tracking-[0.14em]">
            Customize Your Item
          </h1>
          <div className="relative grid h-9 w-9 place-items-center justify-self-end rounded-full border border-[var(--sb-border)] bg-black/28 min-[390px]:h-auto min-[390px]:w-auto min-[390px]:border-0 min-[390px]:bg-transparent">
            <AssetIcon loading="eager" size={26} src={icons.cart} />
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold">
              {quantity}
            </span>
          </div>
        </header>

        <section className="relative mt-4 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.018)_44%,rgba(7,9,10,0.96))] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_54px_rgba(0,0,0,0.38)] min-[390px]:mt-5 min-[390px]:p-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(239,47,37,0.18),transparent_68%)] blur-xl"
          />
          <div className="relative grid grid-cols-[78px_minmax(0,1fr)] gap-2.5 min-[390px]:grid-cols-[138px_1fr] min-[390px]:gap-4">
            <div className="relative h-[88px] overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-black/42 min-[390px]:h-[128px]">
              <Image
                alt=""
                className="object-cover"
                fill
                loading="eager"
                priority
                sizes="138px"
                src={getTabletPresentationImage(item)}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,rgba(0,0,0,0.48))]" />
            </div>
            <div className="min-w-0 self-center">
              <span className="inline-flex max-w-full truncate rounded-[7px] border border-[var(--sb-red-bright)] bg-[var(--sb-red)]/24 px-2 py-1 text-[9px] uppercase text-white min-[390px]:px-2.5 min-[390px]:text-[11px]">
                {item.tags.includes("premium") ? "Premium" : item.categoryLabel}
              </span>
              <h2 className="editorial-title mt-2 line-clamp-2 text-[16px] leading-5 min-[390px]:mt-3 min-[390px]:text-[24px] min-[390px]:leading-7">
                {item.name}
              </h2>
              <p className="mt-1 line-clamp-1 text-[12px] text-[var(--sb-gold)] min-[390px]:text-[15px]">
                {item.description}
              </p>
              <p className="mt-2 line-clamp-2 text-[11px] leading-4 text-white/64 min-[390px]:mt-3 min-[390px]:text-[13px] min-[390px]:leading-5">
                {item.chefNote}
              </p>
              <p className="mt-2 text-[16px] text-[var(--sb-gold)] min-[390px]:mt-4 min-[390px]:text-[22px]">
                {formatMoney(item.priceCents)}
              </p>
            </div>
          </div>
          <div className="relative mt-3 grid grid-cols-3 overflow-hidden rounded-[13px] border border-white/10 bg-black/26 text-center">
            <CustomizeMetric
              label="Base"
              value={formatMoney(item.priceCents)}
            />
            <CustomizeMetric
              label="Add-ons"
              value={selectedCount > 0 ? `${selectedCount}` : "None"}
            />
            <CustomizeMetric label="Points" value={`+${pointsEarned}`} />
          </div>
          <div className="relative mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
            <span className="text-[11px] uppercase tracking-[0.09em] text-white/48 min-[390px]:text-[12px] min-[390px]:tracking-[0.12em]">
              Quantity
            </span>
            <SmallQuantityStepper
              onChange={onQuantityChange}
              value={quantity}
            />
          </div>
        </section>

        <section className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-black/42 p-3 min-[390px]:p-4">
          <div className="flex items-start gap-3">
            <AssetIcon size={27} src={icons.flower} />
            <div className="min-w-0">
              <h2 className="editorial-title text-[18px] uppercase tracking-[0.06em] min-[390px]:text-[20px] min-[390px]:tracking-[0.08em]">
                Add-ons
              </h2>
              <p className="mt-1 text-[12px] leading-5 text-white/62 min-[390px]:text-[13px]">
                Elevate your experience with premium add-ons.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {availableAddOns.map((addOn) => (
              <MobileAddOnRow
                addOn={addOn}
                checked={selectedAddOnIds.includes(addOn.id)}
                key={addOn.id}
                onToggle={onAddOnToggle}
              />
            ))}
          </div>
          <div className="mt-4 rounded-[14px] border border-white/10 bg-black/26 p-3">
            <p className="text-[10px] uppercase tracking-[0.1em] text-white/42 min-[390px]:text-[11px] min-[390px]:tracking-[0.12em]">
              Selected finish
            </p>
            <p className="mt-2 text-[13px] leading-5 text-white/70 min-[390px]:text-[14px]">
              {selectedAddOns.length > 0
                ? selectedAddOns.map((addOn) => addOn.label).join(" + ")
                : "Chef standard plating with house ginger and balanced wasabi."}
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-black/42 p-3 min-[390px]:p-4">
          <label
            className="editorial-title flex flex-wrap items-center gap-2 text-[14px] uppercase tracking-[0.04em] text-white/86 min-[390px]:gap-3 min-[390px]:text-[18px] min-[390px]:tracking-[0.08em]"
            htmlFor={`mobile-notes-${item.id}`}
          >
            <AssetIcon size={24} src={icons.settings} />
            Special instructions
            <span className="text-[11px] text-white/42 min-[390px]:text-[12px]">
              (optional)
            </span>
          </label>
          <textarea
            className="mt-3 min-h-[88px] w-full resize-none rounded-[12px] border border-[var(--sb-border)] bg-black/36 px-3 py-3 text-[14px] leading-5 text-white outline-none placeholder:text-white/38 focus:border-[var(--sb-gold)] min-[390px]:mt-4 min-[390px]:min-h-[92px] min-[390px]:px-4 min-[390px]:text-[15px]"
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

        <section className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-black/42 p-3 min-[390px]:p-4">
          <h2 className="editorial-title flex items-center gap-2.5 text-[15px] uppercase tracking-[0.04em] min-[390px]:gap-3 min-[390px]:text-[18px] min-[390px]:tracking-[0.08em]">
            <AssetIcon size={24} src={icons.chef} />
            Presentation preference
          </h2>
          <div className="mt-4 grid gap-3">
            {cartCustomizationGroups.map((group) => {
              const selected = customizations.find(
                (customization) => customization.groupId === group.id,
              );

              return (
                <fieldset
                  className="rounded-[14px] border border-white/10 bg-white/[0.025] p-2.5 min-[390px]:p-3"
                  key={group.id}
                >
                  <legend className="px-1 text-[11px] uppercase text-[var(--sb-gold)] min-[390px]:text-[13px]">
                    {group.label}
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.options.map((option) => (
                      <label
                        className={classNames(
                          "cursor-pointer rounded-[10px] border px-2.5 py-2 text-[10px] leading-4 min-[390px]:px-3 min-[390px]:text-[12px]",
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

        <section className="mt-4 rounded-[18px] border border-[var(--sb-border)] bg-black/50 p-3 min-[390px]:p-4">
          <h2 className="editorial-title flex items-center gap-2.5 text-[15px] uppercase tracking-[0.04em] min-[390px]:gap-3 min-[390px]:text-[18px] min-[390px]:tracking-[0.08em]">
            <AssetIcon size={24} src={icons.chef} />
            Order summary
          </h2>
          <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-[12px] min-[390px]:text-[15px]">
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
          <p className="mt-4 text-center text-[12px] leading-5 text-white/56 min-[390px]:text-[13px]">
            Earn{" "}
            <span className="text-[var(--sb-gold)]">
              {pointsEarned} Bliss Points
            </span>{" "}
            with this order
          </p>
        </section>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--sb-border)] bg-[linear-gradient(180deg,rgba(9,8,7,0.9),rgba(0,0,0,0.98))] px-3 pb-[calc(0.75rem+var(--sb-safe-bottom))] pt-3 shadow-[0_-20px_50px_rgba(0,0,0,0.62)] backdrop-blur-xl">
        <div className="mobile-frame grid grid-cols-[minmax(0,1fr)_118px] items-center gap-2 min-[390px]:grid-cols-[minmax(0,1fr)_150px] min-[390px]:gap-3">
          <p className="min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.08em] text-white/48 min-[390px]:text-[11px]">
              {selectedCount > 0
                ? `${selectedCount} add-on${selectedCount === 1 ? "" : "s"} selected`
                : "Chef standard"}
            </span>
            <span className="mt-1 block font-mono text-[16px] leading-none text-[var(--sb-gold-soft)] min-[390px]:text-[22px]">
              {formatMoney(totalCents)}
            </span>
          </p>
          <button
            aria-label={`Add ${quantity} to cart`}
            className="red-glow-button grid h-[50px] min-w-0 place-items-center rounded-[13px] px-2 text-[11px] uppercase tracking-[0.04em] min-[390px]:h-[58px] min-[390px]:text-[14px] min-[390px]:tracking-[0.07em]"
            onClick={onAddToCart}
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </footer>
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
  const imageSrc = getAddOnImageSrc(addOn.id);
  const displayLabel = getCompactAddOnLabel(addOn.id, addOn.label);

  return (
    <button
      aria-pressed={checked}
      className={classNames(
        "relative grid min-h-[72px] w-full grid-cols-[42px_minmax(0,1fr)_48px] items-center gap-2 overflow-hidden rounded-[15px] border px-2 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:min-h-[84px] min-[390px]:grid-cols-[64px_minmax(0,1fr)_64px] min-[390px]:gap-3 min-[390px]:px-3",
        checked
          ? "border-[var(--sb-red-bright)] bg-[linear-gradient(135deg,rgba(239,47,37,0.18),rgba(255,255,255,0.035)_48%,rgba(0,0,0,0.28))] shadow-[0_0_26px_rgba(239,47,37,0.16),inset_0_1px_0_rgba(255,255,255,0.08)]"
          : "border-white/10 bg-white/[0.025] hover:border-[var(--sb-gold)]/30 hover:bg-white/[0.045]",
      )}
      onClick={() => onToggle(addOn.id)}
      type="button"
    >
      <span
        aria-hidden="true"
        className={classNames(
          "pointer-events-none absolute inset-y-3 left-0 w-1 rounded-r-full bg-[var(--sb-red-bright)] opacity-0 shadow-[0_0_16px_rgba(239,47,37,0.78)] transition",
          checked && "opacity-100",
        )}
      />
      <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-[12px] border border-[var(--sb-border)] bg-black/34 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] min-[390px]:h-[58px] min-[390px]:w-[58px] min-[390px]:rounded-[14px]">
        <Image
          alt=""
          className="h-full w-full object-cover"
          height={58}
          loading="eager"
          sizes="58px"
          src={imageSrc}
          width={58}
        />
      </span>
      <span className="min-w-0 self-center">
        <span className="editorial-title block line-clamp-2 text-[12px] uppercase leading-4 tracking-[0.02em] text-white min-[390px]:line-clamp-1 min-[390px]:text-[16px] min-[390px]:leading-normal min-[390px]:tracking-[0.04em]">
          {displayLabel}
        </span>
        <span className="mt-1 block line-clamp-1 text-[10px] leading-[15px] text-white/58 min-[390px]:line-clamp-2 min-[390px]:text-[13px] min-[390px]:leading-5">
          {addOn.description}
        </span>
      </span>
      <span className="grid justify-items-end gap-1.5 text-right min-[390px]:gap-2">
        <span className="font-mono text-[11px] text-[var(--sb-gold)] min-[390px]:text-[15px]">
          {formatMoney(addOn.priceCents)}
        </span>
        <span
          aria-hidden="true"
          className={classNames(
            "grid h-6 w-6 place-items-center justify-self-end rounded-[8px] border text-[12px] min-[390px]:h-8 min-[390px]:w-8 min-[390px]:rounded-[9px] min-[390px]:text-[14px]",
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
    <div className="grid h-10 w-[124px] grid-cols-[40px_44px_40px] overflow-hidden rounded-full border border-[var(--sb-border)] bg-black/34 min-[390px]:h-11 min-[390px]:w-[136px] min-[390px]:grid-cols-[44px_48px_44px]">
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

function CustomizeMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-white/10 px-1.5 py-2 last:border-r-0">
      <p className="truncate text-[9px] uppercase tracking-[0.08em] text-white/42 min-[390px]:text-[10px]">
        {label}
      </p>
      <p className="mt-1 truncate font-mono text-[12px] text-[var(--sb-gold-soft)] min-[390px]:text-[14px]">
        {value}
      </p>
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
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2.5 min-[390px]:gap-3",
        large && "text-[19px] text-[var(--sb-gold)] min-[390px]:text-[22px]",
        muted && "text-white/58",
      )}
    >
      <span className="min-w-0 break-words">{label}</span>
      <span className="shrink-0 text-right font-mono">{value}</span>
    </p>
  );
}
