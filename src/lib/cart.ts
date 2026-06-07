import {
  cartAddOns,
  cartCustomizationGroups,
  cartSidePairings,
} from "@/data/cart";
import { slugify } from "@/lib/format";
import type { MenuItem } from "@/types/menu";
import type {
  CartAddOnDefinition,
  CartCustomization,
  CartItemDraft,
  CartLineItem,
  CartSelectedAddOn,
  StoredCartLineItem,
} from "@/types/order";

/** Returns paid add-ons that make sense for the selected menu item. */
export function getAvailableAddOns(menuItem: MenuItem): CartAddOnDefinition[] {
  const isPremiumItem =
    menuItem.tags.includes("premium") ||
    menuItem.tags.includes("chef-special") ||
    menuItem.category === "nigiri";

  return cartAddOns.filter((addOn) => !addOn.premiumOnly || isPremiumItem);
}

/** Returns side pairings that can be selected from tablet customization. */
export function getAvailableSidePairings(): CartAddOnDefinition[] {
  return cartSidePairings;
}

/** Builds the default customization state from the first option in each group. */
export function getDefaultCustomizations(): CartCustomization[] {
  return cartCustomizationGroups.map((group) => {
    const option = group.options[0];

    return {
      groupId: group.id,
      groupLabel: group.label,
      optionId: option.id,
      optionLabel: option.label,
    };
  });
}

/** Converts a selected group option into the compact cart customization value. */
export function createCustomizationSelection(
  groupId: string,
  optionId: string,
): CartCustomization | undefined {
  const group = cartCustomizationGroups.find((item) => item.id === groupId);
  const option = group?.options.find((item) => item.id === optionId);

  if (!group || !option) {
    return undefined;
  }

  return {
    groupId: group.id,
    groupLabel: group.label,
    optionId: option.id,
    optionLabel: option.label,
  };
}

/** Normalizes note text so line-item identity and display stay predictable. */
export function normalizeCartNotes(notes: string | undefined): string {
  return (notes || "").trim().replace(/\s+/g, " ");
}

/** Adds menu price and selected add-ons into a single unit price. */
export function calculateCartLineUnitPrice(
  menuItem: MenuItem,
  addOns: CartSelectedAddOn[],
): number {
  return (
    menuItem.priceCents +
    addOns.reduce((total, addOn) => total + addOn.priceCents, 0)
  );
}

/** Calculates the full line subtotal before tax and service fees. */
export function calculateCartLineSubtotal(lineItem: CartLineItem): number {
  return (
    calculateCartLineUnitPrice(lineItem.menuItem, lineItem.addOns) *
    lineItem.quantity
  );
}

/** Creates a stable line id so identical customization sets merge in the cart. */
export function createCartLineId(draft: CartItemDraft): string {
  const customizations = draft.customizations
    .map(
      (customization) => `${customization.groupId}:${customization.optionId}`,
    )
    .sort()
    .join(",");
  const addOns = draft.addOns
    .map((addOn) => addOn.id)
    .sort()
    .join(",");
  const notes = slugify(normalizeCartNotes(draft.notes));

  return [draft.menuItem.id, customizations, addOns, notes]
    .filter(Boolean)
    .join("|");
}

/** Converts an add-to-cart draft into the serializable storage shape. */
export function createStoredCartLineItem(
  draft: CartItemDraft,
): StoredCartLineItem {
  return {
    addOns: draft.addOns,
    customizations: draft.customizations,
    id: createCartLineId(draft),
    menuItemId: draft.menuItem.id,
    notes: normalizeCartNotes(draft.notes) || undefined,
    quantity: draft.quantity,
  };
}

/** Resolves serialized cart records into rich line items with menu content. */
export function resolveStoredCartLineItems(
  storedItems: StoredCartLineItem[],
  menuItemsById: Map<string, MenuItem>,
): CartLineItem[] {
  return storedItems
    .map((storedItem) => {
      const menuItem = menuItemsById.get(storedItem.menuItemId);

      if (!menuItem) {
        return undefined;
      }

      return {
        ...storedItem,
        menuItem,
      };
    })
    .filter((item): item is CartLineItem => Boolean(item));
}
