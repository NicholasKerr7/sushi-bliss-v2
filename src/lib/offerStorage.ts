import {
  readStorageValue,
  removeStorageValue,
  writeStorageValue,
} from "@/lib/storage";

const PENDING_OFFER_CODE_STORAGE_KEY = "sushi-bliss-pending-offer-code";

/** Reads the offer code selected outside checkout so the checkout form can prefill it. */
export function readPendingOfferCode(): string {
  return readStorageValue(PENDING_OFFER_CODE_STORAGE_KEY) || "";
}

/** Persists a checkout-ready offer code selected from the offers experience. */
export function writePendingOfferCode(code: string): boolean {
  return writeStorageValue(
    PENDING_OFFER_CODE_STORAGE_KEY,
    code.trim().toUpperCase(),
  );
}

/** Clears an offer code after checkout applies or dismisses it. */
export function clearPendingOfferCode(): boolean {
  return removeStorageValue(PENDING_OFFER_CODE_STORAGE_KEY);
}
