import { mockUser } from "@/data/mockUser";
import { readStorageValue, writeStorageValue } from "@/lib/storage";
import type {
  Address,
  PaymentMethod,
  UserNotificationPreferences,
  UserPreferences,
  UserPrivacyPreferences,
  UserProfile,
} from "@/types/user";

const PROFILE_STORAGE_KEY = "sushi-bliss:profile";
const PROFILE_CHANGED_EVENT = "sushi-bliss:profile-changed";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function readBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function parseAddress(value: unknown): Address | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.label !== "string" ||
    typeof value.line1 !== "string" ||
    typeof value.city !== "string" ||
    typeof value.region !== "string" ||
    typeof value.postalCode !== "string"
  ) {
    return undefined;
  }

  return {
    city: value.city,
    id: value.id,
    isDefault: typeof value.isDefault === "boolean" ? value.isDefault : false,
    label: value.label,
    line1: value.line1,
    line2: typeof value.line2 === "string" ? value.line2 : undefined,
    postalCode: value.postalCode,
    region: value.region,
  };
}

function parsePaymentMethod(value: unknown): PaymentMethod | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.brand !== "string" ||
    typeof value.last4 !== "string" ||
    typeof value.expiresAt !== "string"
  ) {
    return undefined;
  }

  return {
    billingPostalCode:
      typeof value.billingPostalCode === "string"
        ? value.billingPostalCode
        : undefined,
    brand: value.brand,
    expiresAt: value.expiresAt,
    id: value.id,
    isDefault: typeof value.isDefault === "boolean" ? value.isDefault : false,
    label: typeof value.label === "string" ? value.label : undefined,
    last4: value.last4,
  };
}

function parseStringList(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is string => typeof item === "string");
}

function parseNotificationPreferences(
  value: unknown,
  legacyValue: unknown,
  fallback: UserNotificationPreferences,
): UserNotificationPreferences {
  const source = isRecord(value) ? value : {};

  return {
    conciergeMessages: readBoolean(
      source.conciergeMessages,
      fallback.conciergeMessages,
    ),
    offerAlerts: readBoolean(source.offerAlerts, fallback.offerAlerts),
    orderUpdates: readBoolean(
      source.orderUpdates,
      readBoolean(legacyValue, fallback.orderUpdates),
    ),
    reservationReminders: readBoolean(
      source.reservationReminders,
      fallback.reservationReminders,
    ),
    rewardAlerts: readBoolean(source.rewardAlerts, fallback.rewardAlerts),
  };
}

function parsePrivacyPreferences(
  value: unknown,
  fallback: UserPrivacyPreferences,
): UserPrivacyPreferences {
  const source = isRecord(value) ? value : {};

  return {
    loginAlerts: readBoolean(source.loginAlerts, fallback.loginAlerts),
    personalizedRecommendations: readBoolean(
      source.personalizedRecommendations,
      fallback.personalizedRecommendations,
    ),
    shareDiningHistory: readBoolean(
      source.shareDiningHistory,
      fallback.shareDiningHistory,
    ),
    twoFactorEnabled: readBoolean(
      source.twoFactorEnabled,
      fallback.twoFactorEnabled,
    ),
  };
}

function parsePreferences(
  value: unknown,
  fallback: UserPreferences,
): UserPreferences {
  if (!isRecord(value)) {
    return fallback;
  }

  return {
    dietaryTags: parseStringList(value.dietaryTags, fallback.dietaryTags),
    fulfillmentMode:
      value.fulfillmentMode === "delivery" || value.fulfillmentMode === "pickup"
        ? value.fulfillmentMode
        : fallback.fulfillmentMode,
    marketingOptIn: readBoolean(value.marketingOptIn, fallback.marketingOptIn),
    notifications: parseNotificationPreferences(
      value.notifications,
      value.orderUpdates,
      fallback.notifications,
    ),
    privacy: parsePrivacyPreferences(value.privacy, fallback.privacy),
  };
}

/** Validates and normalizes locally persisted profile state. */
export function parseStoredProfile(
  value: string | null,
  fallback: UserProfile = mockUser,
): UserProfile {
  if (!value) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(value);

    if (!isRecord(parsed)) {
      return fallback;
    }

    const addresses = Array.isArray(parsed.addresses)
      ? parsed.addresses
          .map(parseAddress)
          .filter((address): address is Address => Boolean(address))
      : fallback.addresses;
    const paymentMethods = Array.isArray(parsed.paymentMethods)
      ? parsed.paymentMethods
          .map(parsePaymentMethod)
          .filter((paymentMethod): paymentMethod is PaymentMethod =>
            Boolean(paymentMethod),
          )
      : fallback.paymentMethods;

    return {
      addresses,
      email: readString(parsed.email, fallback.email),
      id: readString(parsed.id, fallback.id),
      name: readString(parsed.name, fallback.name),
      paymentMethods,
      phone: readString(parsed.phone, fallback.phone),
      preferences: parsePreferences(parsed.preferences, fallback.preferences),
      tier: readString(parsed.tier, fallback.tier),
    };
  } catch {
    return fallback;
  }
}

export function getProfileSnapshot(): string {
  return readStorageValue(PROFILE_STORAGE_KEY) || JSON.stringify(mockUser);
}

function notifyProfileChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(PROFILE_CHANGED_EVENT));
}

/** Subscribes profile consumers to same-tab and cross-tab local changes. */
export function subscribeToProfile(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === PROFILE_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(PROFILE_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(PROFILE_CHANGED_EVENT, onStoreChange);
  };
}

export function readStoredProfile(
  fallback: UserProfile = mockUser,
): UserProfile {
  return parseStoredProfile(getProfileSnapshot(), fallback);
}

export function writeStoredProfile(profile: UserProfile) {
  writeStorageValue(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  notifyProfileChanged();
}

export function resetStoredProfile() {
  writeStoredProfile(mockUser);
}
