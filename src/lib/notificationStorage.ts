import { readStorageValue, writeStorageValue } from "@/lib/storage";

const NOTIFICATION_READS_STORAGE_KEY = "sushi-bliss:notification-reads";
const NOTIFICATION_READS_CHANGED_EVENT =
  "sushi-bliss:notification-reads-changed";

export type NotificationReadState = Record<string, string>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Validates persisted notification read timestamps before merging with seed data. */
export function parseNotificationReadSnapshot(
  value: string | null,
): NotificationReadState {
  if (!value) {
    return {};
  }

  try {
    const parsed = JSON.parse(value);

    if (!isRecord(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] => typeof entry[1] === "string",
      ),
    );
  } catch {
    return {};
  }
}

export function getNotificationReadsSnapshot(): string {
  return readStorageValue(NOTIFICATION_READS_STORAGE_KEY) || "{}";
}

function notifyNotificationReadsChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(NOTIFICATION_READS_CHANGED_EVENT));
}

/** Subscribes notification consumers to same-tab and cross-tab read-state changes. */
export function subscribeToNotificationReads(
  onStoreChange: () => void,
): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === NOTIFICATION_READS_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(NOTIFICATION_READS_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(NOTIFICATION_READS_CHANGED_EVENT, onStoreChange);
  };
}

export function readNotificationReadState(): NotificationReadState {
  return parseNotificationReadSnapshot(getNotificationReadsSnapshot());
}

export function writeNotificationReadState(readState: NotificationReadState) {
  writeStorageValue(NOTIFICATION_READS_STORAGE_KEY, JSON.stringify(readState));
  notifyNotificationReadsChanged();
}

/** Marks one notification as read without mutating the seeded notification list. */
export function setNotificationReadAt(
  id: string,
  readAt: string = new Date().toISOString(),
) {
  writeNotificationReadState({
    ...readNotificationReadState(),
    [id]: readAt,
  });
}

/** Marks all visible notifications as read with one persisted timestamp. */
export function setAllNotificationsRead(
  ids: string[],
  readAt: string = new Date().toISOString(),
) {
  const nextReadState = ids.reduce<NotificationReadState>(
    (acc, id) => ({
      ...acc,
      [id]: readAt,
    }),
    readNotificationReadState(),
  );

  writeNotificationReadState(nextReadState);
}
