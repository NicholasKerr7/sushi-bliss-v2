import { readStorageValue, writeStorageValue } from "@/lib/storage";
import type { Reservation } from "@/types/reservation";

const RESERVATIONS_STORAGE_KEY = "sushi-bliss:reservations";
const RESERVATIONS_CHANGED_EVENT = "sushi-bliss:reservations-changed";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStoredReservation(value: unknown): value is Reservation {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.confirmationCode === "string" &&
    typeof value.experienceId === "string" &&
    typeof value.locationId === "string" &&
    typeof value.startsAt === "string" &&
    typeof value.partySize === "number"
  );
}

/** Validates stored reservation records before hydrating React state. */
export function parseStoredReservations(value: string | null): Reservation[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isStoredReservation);
  } catch {
    return [];
  }
}

export function getReservationsSnapshot(): string {
  return readStorageValue(RESERVATIONS_STORAGE_KEY) || "[]";
}

function notifyReservationsChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(RESERVATIONS_CHANGED_EVENT));
}

/** Subscribes to same-tab and cross-tab reservation changes. */
export function subscribeToReservations(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === RESERVATIONS_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(RESERVATIONS_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(RESERVATIONS_CHANGED_EVENT, onStoreChange);
  };
}

export function readStoredReservations(): Reservation[] {
  return parseStoredReservations(getReservationsSnapshot());
}

export function writeStoredReservations(reservations: Reservation[]) {
  writeStorageValue(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
  notifyReservationsChanged();
}
