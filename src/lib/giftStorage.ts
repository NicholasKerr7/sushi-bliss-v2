import { defaultGiftState } from "@/data/gifts";
import { readStorageValue, writeStorageValue } from "@/lib/storage";
import type { GiftConfirmation, GiftState } from "@/types/gift";

const GIFT_STORAGE_KEY = "sushi-bliss:gifts";
const GIFT_CHANGED_EVENT = "sushi-bliss:gifts-changed";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseGiftConfirmation(value: unknown): GiftConfirmation | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  if (
    typeof value.confirmationCode !== "string" ||
    typeof value.createdAt !== "string" ||
    typeof value.deliveryDate !== "string" ||
    typeof value.giftId !== "string" ||
    typeof value.giftTitle !== "string" ||
    typeof value.id !== "string" ||
    typeof value.paymentMethodLabel !== "string" ||
    typeof value.priceCents !== "number" ||
    typeof value.senderEmail !== "string" ||
    typeof value.senderName !== "string" ||
    (value.status !== "sent" && value.status !== "scheduled")
  ) {
    return undefined;
  }

  if (!isRecord(value.recipient) || !isRecord(value.giftImage)) {
    return undefined;
  }

  if (
    typeof value.recipient.email !== "string" ||
    typeof value.recipient.name !== "string" ||
    typeof value.giftImage.publicUrl !== "string"
  ) {
    return undefined;
  }

  return {
    confirmationCode: value.confirmationCode,
    createdAt: value.createdAt,
    deliveryDate: value.deliveryDate,
    giftId: value.giftId,
    giftImage: {
      alt:
        typeof value.giftImage.alt === "string"
          ? value.giftImage.alt
          : value.giftTitle,
      filePath:
        typeof value.giftImage.filePath === "string"
          ? value.giftImage.filePath
          : undefined,
      height:
        typeof value.giftImage.height === "number"
          ? value.giftImage.height
          : undefined,
      publicUrl: value.giftImage.publicUrl,
      width:
        typeof value.giftImage.width === "number"
          ? value.giftImage.width
          : undefined,
    },
    giftTitle: value.giftTitle,
    id: value.id,
    message: typeof value.message === "string" ? value.message : undefined,
    paymentMethodLabel: value.paymentMethodLabel,
    priceCents: Math.max(Math.floor(value.priceCents), 0),
    recipient: {
      email: value.recipient.email,
      message:
        typeof value.recipient.message === "string"
          ? value.recipient.message
          : undefined,
      name: value.recipient.name,
    },
    senderEmail: value.senderEmail,
    senderName: value.senderName,
    status: value.status,
  };
}

/** Validates locally persisted gift confirmations before hydrating React state. */
export function parseStoredGiftState(value: string | null): GiftState {
  if (!value) {
    return defaultGiftState;
  }

  try {
    const parsed = JSON.parse(value);

    if (!isRecord(parsed) || !Array.isArray(parsed.confirmations)) {
      return defaultGiftState;
    }

    return {
      confirmations: parsed.confirmations
        .map(parseGiftConfirmation)
        .filter((gift): gift is GiftConfirmation => Boolean(gift)),
    };
  } catch {
    return defaultGiftState;
  }
}

export function getGiftSnapshot(): string {
  return readStorageValue(GIFT_STORAGE_KEY) || JSON.stringify(defaultGiftState);
}

function notifyGiftsChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(GIFT_CHANGED_EVENT));
}

/** Subscribes gift history consumers to same-tab and cross-tab local changes. */
export function subscribeToGifts(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === GIFT_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(GIFT_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(GIFT_CHANGED_EVENT, onStoreChange);
  };
}

export function readStoredGiftState(): GiftState {
  return parseStoredGiftState(getGiftSnapshot());
}

export function writeStoredGiftState(state: GiftState) {
  writeStorageValue(GIFT_STORAGE_KEY, JSON.stringify(state));
  notifyGiftsChanged();
}
