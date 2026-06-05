import { defaultSupportState } from "@/data/support";
import { readStorageValue, writeStorageValue } from "@/lib/storage";
import type { SupportMessage, SupportState } from "@/types/support";

const SUPPORT_STORAGE_KEY = "sushi-bliss:support";
const SUPPORT_CHANGED_EVENT = "sushi-bliss:support-changed";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStoredSupportMessage(value: unknown): value is SupportMessage {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.createdAt === "string" &&
    typeof value.email === "string" &&
    typeof value.id === "string" &&
    typeof value.message === "string" &&
    typeof value.name === "string" &&
    value.status === "received" &&
    typeof value.topicId === "string"
  );
}

/** Validates locally persisted support messages before rendering them. */
export function parseStoredSupportState(
  value: string | null,
  fallback: SupportState = defaultSupportState,
): SupportState {
  if (!value) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(value);

    if (!isRecord(parsed) || !Array.isArray(parsed.messages)) {
      return fallback;
    }

    return {
      messages: parsed.messages.filter(isStoredSupportMessage),
    };
  } catch {
    return fallback;
  }
}

export function getSupportSnapshot(): string {
  return (
    readStorageValue(SUPPORT_STORAGE_KEY) || JSON.stringify(defaultSupportState)
  );
}

function notifySupportChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(SUPPORT_CHANGED_EVENT));
}

/** Subscribes support consumers to same-tab and cross-tab local message changes. */
export function subscribeToSupport(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === SUPPORT_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(SUPPORT_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(SUPPORT_CHANGED_EVENT, onStoreChange);
  };
}

export function readStoredSupportState(): SupportState {
  return parseStoredSupportState(getSupportSnapshot());
}

export function writeStoredSupportState(state: SupportState) {
  writeStorageValue(SUPPORT_STORAGE_KEY, JSON.stringify(state));
  notifySupportChanged();
}

export function addStoredSupportMessage(message: SupportMessage) {
  const current = readStoredSupportState();

  writeStoredSupportState({
    messages: [message, ...current.messages].slice(0, 12),
  });
}
