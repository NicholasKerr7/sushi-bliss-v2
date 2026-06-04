import { slugify } from "@/lib/format";
import { isEmail, isPostalCode, requireNonEmpty } from "@/lib/validation";
import type {
  Address,
  AddressDraft,
  PaymentMethod,
  PaymentMethodDraft,
  ProfileDetailsDraft,
  UserPreferences,
  UserProfile,
} from "@/types/user";

export type ProfileDetailsValidation = Partial<
  Record<keyof ProfileDetailsDraft, string>
>;

const PAYMENT_LAST4_PATTERN = /^\d{4}$/;
const PAYMENT_EXPIRATION_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;
const PHONE_PATTERN = /^[+()\d\s.-]{7,}$/;

export function getDefaultAddressDraft(): AddressDraft {
  return {
    city: "",
    label: "",
    line1: "",
    line2: "",
    postalCode: "",
    region: "",
  };
}

export function addressToDraft(address: Address): AddressDraft {
  return {
    city: address.city,
    label: address.label,
    line1: address.line1,
    line2: address.line2 || "",
    postalCode: address.postalCode,
    region: address.region,
  };
}

/** Validates a saved address before checkout or profile persistence uses it. */
export function validateAddressDraft(draft: AddressDraft): string | undefined {
  const requiredFields: Array<[string, string]> = [
    [draft.label, "Label"],
    [draft.line1, "Street address"],
    [draft.city, "City"],
    [draft.region, "State"],
    [draft.postalCode, "Postal code"],
  ];

  for (const [value, label] of requiredFields) {
    const result = requireNonEmpty(value, label);

    if (!result.valid) {
      return result.message;
    }
  }

  if (!isPostalCode(draft.postalCode)) {
    return "Enter a valid US postal code.";
  }

  return undefined;
}

/** Creates a saved address object from validated profile or checkout fields. */
export function createAddressFromDraft(
  draft: AddressDraft,
  existingId?: string,
  isDefault?: boolean,
): Address {
  const id =
    existingId ||
    slugify(`${draft.label}-${draft.line1}-${Date.now().toString(36)}`);

  return {
    city: draft.city.trim(),
    id,
    isDefault,
    label: draft.label.trim(),
    line1: draft.line1.trim(),
    line2: draft.line2.trim() || undefined,
    postalCode: draft.postalCode.trim(),
    region: draft.region.trim().toUpperCase(),
  };
}

export function getDefaultPaymentMethodDraft(): PaymentMethodDraft {
  return {
    billingPostalCode: "",
    brand: "Visa",
    expiresAt: "",
    label: "",
    last4: "",
  };
}

export function paymentMethodToDraft(
  paymentMethod: PaymentMethod,
): PaymentMethodDraft {
  return {
    billingPostalCode: paymentMethod.billingPostalCode || "",
    brand: paymentMethod.brand,
    expiresAt: paymentMethod.expiresAt,
    label: paymentMethod.label || "",
    last4: paymentMethod.last4,
  };
}

/** Validates token-like mock payment metadata without collecting full card data. */
export function validatePaymentMethodDraft(
  draft: PaymentMethodDraft,
): string | undefined {
  const brand = requireNonEmpty(draft.brand, "Card brand");
  const expiration = requireNonEmpty(draft.expiresAt, "Expiration");

  if (!brand.valid) {
    return brand.message;
  }

  if (!PAYMENT_LAST4_PATTERN.test(draft.last4.trim())) {
    return "Enter the last four card digits.";
  }

  if (!expiration.valid) {
    return expiration.message;
  }

  if (!PAYMENT_EXPIRATION_PATTERN.test(draft.expiresAt.trim())) {
    return "Enter expiration as YYYY-MM.";
  }

  if (!isFuturePaymentExpiration(draft.expiresAt.trim())) {
    return "Use a payment method that has not expired.";
  }

  if (
    draft.billingPostalCode.trim() &&
    !isPostalCode(draft.billingPostalCode)
  ) {
    return "Enter a valid billing ZIP code.";
  }

  return undefined;
}

export function createPaymentMethodFromDraft(
  draft: PaymentMethodDraft,
  existingId?: string,
  isDefault?: boolean,
): PaymentMethod {
  const label = draft.label.trim();
  const id =
    existingId ||
    slugify(
      `${draft.brand}-${draft.last4}-${draft.expiresAt}-${Date.now().toString(36)}`,
    );

  return {
    billingPostalCode: draft.billingPostalCode.trim() || undefined,
    brand: draft.brand.trim(),
    expiresAt: draft.expiresAt.trim(),
    id,
    isDefault,
    label: label || undefined,
    last4: draft.last4.trim(),
  };
}

/** Determines whether a saved payment method can be used for checkout. */
export function isPaymentMethodUsable(paymentMethod: PaymentMethod): boolean {
  return isFuturePaymentExpiration(paymentMethod.expiresAt);
}

export function getProfileDetailsDraft(
  profile: UserProfile,
): ProfileDetailsDraft {
  return {
    email: profile.email,
    name: profile.name,
    phone: profile.phone,
  };
}

/** Validates editable profile identity fields before saving them locally. */
export function validateProfileDetailsDraft(
  draft: ProfileDetailsDraft,
): ProfileDetailsValidation {
  const validation: ProfileDetailsValidation = {};
  const name = requireNonEmpty(draft.name, "Name");
  const phone = requireNonEmpty(draft.phone, "Phone");

  if (!name.valid) {
    validation.name = name.message;
  }

  if (!isEmail(draft.email)) {
    validation.email = "Enter a valid email address.";
  }

  if (!phone.valid) {
    validation.phone = phone.message;
  } else if (!PHONE_PATTERN.test(draft.phone.trim())) {
    validation.phone = "Enter a valid phone number.";
  }

  return validation;
}

export function hasProfileDetailsValidationErrors(
  validation: ProfileDetailsValidation,
): boolean {
  return Object.values(validation).some(Boolean);
}

export function applyProfileDetailsDraft(
  profile: UserProfile,
  draft: ProfileDetailsDraft,
): UserProfile {
  return {
    ...profile,
    email: draft.email.trim(),
    name: draft.name.trim(),
    phone: draft.phone.trim(),
  };
}

export function upsertAddress(
  addresses: Address[],
  nextAddress: Address,
): Address[] {
  const exists = addresses.some((address) => address.id === nextAddress.id);
  const shouldBeDefault =
    Boolean(nextAddress.isDefault) ||
    addresses.length === 0 ||
    addresses.some(
      (address) => address.id === nextAddress.id && address.isDefault,
    );
  const mergedAddresses = exists
    ? addresses.map((address) =>
        address.id === nextAddress.id ? nextAddress : address,
      )
    : [...addresses, nextAddress];

  return ensureSingleDefaultAddress(
    mergedAddresses,
    shouldBeDefault ? nextAddress.id : undefined,
  );
}

export function removeAddress(addresses: Address[], id: string): Address[] {
  return ensureSingleDefaultAddress(
    addresses.filter((address) => address.id !== id),
  );
}

export function setDefaultAddress(addresses: Address[], id: string): Address[] {
  return ensureSingleDefaultAddress(addresses, id);
}

export function upsertPaymentMethod(
  paymentMethods: PaymentMethod[],
  nextPaymentMethod: PaymentMethod,
): PaymentMethod[] {
  const exists = paymentMethods.some(
    (paymentMethod) => paymentMethod.id === nextPaymentMethod.id,
  );
  const shouldBeDefault =
    Boolean(nextPaymentMethod.isDefault) ||
    paymentMethods.length === 0 ||
    paymentMethods.some(
      (paymentMethod) =>
        paymentMethod.id === nextPaymentMethod.id && paymentMethod.isDefault,
    );
  const mergedPaymentMethods = exists
    ? paymentMethods.map((paymentMethod) =>
        paymentMethod.id === nextPaymentMethod.id
          ? nextPaymentMethod
          : paymentMethod,
      )
    : [...paymentMethods, nextPaymentMethod];

  return ensureSingleDefaultPaymentMethod(
    mergedPaymentMethods,
    shouldBeDefault ? nextPaymentMethod.id : undefined,
  );
}

export function removePaymentMethod(
  paymentMethods: PaymentMethod[],
  id: string,
): PaymentMethod[] {
  return ensureSingleDefaultPaymentMethod(
    paymentMethods.filter((paymentMethod) => paymentMethod.id !== id),
  );
}

export function setDefaultPaymentMethod(
  paymentMethods: PaymentMethod[],
  id: string,
): PaymentMethod[] {
  return ensureSingleDefaultPaymentMethod(paymentMethods, id);
}

export function togglePreferenceTag(tags: string[], tag: string): string[] {
  return tags.includes(tag)
    ? tags.filter((item) => item !== tag)
    : [...tags, tag];
}

export function updatePreferences(
  preferences: UserPreferences,
  nextPreferences: Partial<UserPreferences>,
): UserPreferences {
  return {
    ...preferences,
    ...nextPreferences,
    notifications: {
      ...preferences.notifications,
      ...nextPreferences.notifications,
    },
    privacy: {
      ...preferences.privacy,
      ...nextPreferences.privacy,
    },
  };
}

function ensureSingleDefaultAddress(
  addresses: Address[],
  preferredDefaultId?: string,
): Address[] {
  if (addresses.length === 0) {
    return [];
  }

  const defaultId =
    preferredDefaultId ||
    addresses.find((address) => address.isDefault)?.id ||
    addresses[0].id;

  return addresses.map((address) => ({
    ...address,
    isDefault: address.id === defaultId,
  }));
}

function ensureSingleDefaultPaymentMethod(
  paymentMethods: PaymentMethod[],
  preferredDefaultId?: string,
): PaymentMethod[] {
  if (paymentMethods.length === 0) {
    return [];
  }

  const defaultId =
    preferredDefaultId ||
    paymentMethods.find((paymentMethod) => paymentMethod.isDefault)?.id ||
    paymentMethods[0].id;

  return paymentMethods.map((paymentMethod) => ({
    ...paymentMethod,
    isDefault: paymentMethod.id === defaultId,
  }));
}

function isFuturePaymentExpiration(expiresAt: string): boolean {
  if (!PAYMENT_EXPIRATION_PATTERN.test(expiresAt)) {
    return false;
  }

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  return expiresAt >= currentMonth;
}
