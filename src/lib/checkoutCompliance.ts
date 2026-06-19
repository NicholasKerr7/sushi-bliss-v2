import { isMenuItemOnlineOrderable } from "@/lib/menuAvailability";
import type { OrderAgeVerification, CartLineItem } from "@/types/order";

export interface CheckoutComplianceState {
  ageRestrictedItems: CartLineItem[];
  ageVerificationRequired: boolean;
  onlineAgeRestrictedItems: CartLineItem[];
  unavailableItems: CartLineItem[];
  valid: boolean;
  validationMessage?: string;
}

function isAgeRestrictedLineItem(item: CartLineItem): boolean {
  return Boolean(
    item.menuItem.ageRestricted ||
    (item.menuItem.abv && item.menuItem.abv > 0) ||
    item.menuItem.tags.includes("alcohol"),
  );
}

function formatItemNames(items: CartLineItem[]): string {
  const names = items.map((item) => item.menuItem.name);

  if (names.length <= 2) {
    return names.join(" and ");
  }

  return `${names.slice(0, 2).join(", ")} and ${names.length - 2} more`;
}

/** Keeps regulated drink fulfillment rules consistent across every checkout surface. */
export function getCheckoutComplianceState(
  items: CartLineItem[],
  ageVerified: boolean,
): CheckoutComplianceState {
  const ageRestrictedItems = items.filter(isAgeRestrictedLineItem);
  const unavailableItems = items.filter(
    (item) => !isMenuItemOnlineOrderable(item.menuItem),
  );
  const onlineAgeRestrictedItems = ageRestrictedItems.filter((item) =>
    isMenuItemOnlineOrderable(item.menuItem),
  );
  const ageVerificationRequired = onlineAgeRestrictedItems.length > 0;
  let validationMessage: string | undefined;

  if (unavailableItems.length > 0) {
    validationMessage = `${formatItemNames(unavailableItems)} ${
      unavailableItems.length === 1 ? "is" : "are"
    } reserved for restaurant service. Remove ${
      unavailableItems.length === 1 ? "it" : "them"
    } from the cart or book a reservation.`;
  } else if (ageVerificationRequired && !ageVerified) {
    validationMessage =
      "Confirm the recipient is 21+ and can present valid ID at handoff.";
  }

  return {
    ageRestrictedItems,
    ageVerificationRequired,
    onlineAgeRestrictedItems,
    unavailableItems,
    valid: !validationMessage,
    validationMessage,
  };
}

/** Stores enough checkout context for future Supabase or payment-provider compliance hooks. */
export function createOrderAgeVerification(
  items: CartLineItem[],
  ageVerified: boolean,
  verifiedAt = new Date(),
): OrderAgeVerification | undefined {
  const compliance = getCheckoutComplianceState(items, ageVerified);

  if (compliance.ageRestrictedItems.length === 0) {
    return undefined;
  }

  return {
    required: compliance.ageVerificationRequired,
    restrictedItemIds: compliance.ageRestrictedItems.map(
      (item) => item.menuItemId,
    ),
    verified: compliance.ageVerificationRequired ? ageVerified : false,
    verifiedAt:
      compliance.ageVerificationRequired && ageVerified
        ? verifiedAt.toISOString()
        : undefined,
  };
}
