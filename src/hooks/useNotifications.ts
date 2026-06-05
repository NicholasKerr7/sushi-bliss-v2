"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { initialNotifications as defaultNotifications } from "@/data/notifications";
import {
  getNotificationReadsSnapshot,
  parseNotificationReadSnapshot,
  setAllNotificationsRead,
  setNotificationReadAt,
  subscribeToNotificationReads,
} from "@/lib/notificationStorage";
import type { AppNotification } from "@/types/notification";

/** Manages notification read state for local mock notifications. */
export function useNotifications(
  initialNotifications: AppNotification[] = defaultNotifications,
) {
  const readSnapshot = useSyncExternalStore(
    subscribeToNotificationReads,
    getNotificationReadsSnapshot,
    () => "{}",
  );
  const readState = useMemo(
    () => parseNotificationReadSnapshot(readSnapshot),
    [readSnapshot],
  );
  const notifications = useMemo(
    () =>
      initialNotifications.map((notification) => ({
        ...notification,
        readAt: notification.readAt || readState[notification.id],
      })),
    [initialNotifications, readState],
  );

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.readAt).length,
    [notifications],
  );

  const markRead = useCallback((id: string) => {
    setNotificationReadAt(id);
  }, []);

  const markAllRead = useCallback(() => {
    setAllNotificationsRead(
      initialNotifications.map((notification) => notification.id),
    );
  }, [initialNotifications]);

  return {
    markAllRead,
    markRead,
    notifications,
    unreadCount,
  };
}
