"use client";

import { cartCustomizationGroups } from "@/data/cart";
import { classNames } from "@/lib/classNames";
import type { CartCustomization } from "@/types/order";

interface ItemCustomizationControlsProps {
  customizations: CartCustomization[];
  itemId: string;
  onCustomizationChange: (groupId: string, optionId: string) => void;
}

export function ItemCustomizationControls({
  customizations,
  itemId,
  onCustomizationChange,
}: ItemCustomizationControlsProps) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-sb-rice">Customization</h3>
      <div className="mt-3 grid gap-4">
        {cartCustomizationGroups.map((group) => {
          const selectedOption =
            customizations.find(
              (customization) => customization.groupId === group.id,
            )?.optionId || group.options[0]?.id;

          return (
            <fieldset
              className="rounded-card border border-sb-line bg-sb-ink/40 p-4"
              key={group.id}
            >
              <legend className="px-1 text-sm font-semibold text-sb-rice">
                {group.label}
              </legend>
              <div className="mt-3 grid gap-2">
                {group.options.map((option) => (
                  <label
                    className={classNames(
                      "flex cursor-pointer gap-3 rounded-card border p-3 transition",
                      selectedOption === option.id
                        ? "border-sb-gold bg-sb-gold/10"
                        : "border-sb-line bg-sb-panel/55 hover:bg-sb-rice/5",
                    )}
                    key={option.id}
                  >
                    <input
                      checked={selectedOption === option.id}
                      className="mt-1 accent-sb-gold"
                      name={`customization-${itemId}-${group.id}`}
                      onChange={() =>
                        onCustomizationChange(group.id, option.id)
                      }
                      type="radio"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-sb-rice">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-sb-muted">
                        {option.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        })}
      </div>
    </section>
  );
}
