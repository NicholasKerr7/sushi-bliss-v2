"use client";

import { useCallback, useMemo, useState } from "react";

import { mockNotifications } from "@/data/mockUser";
import type { AppNotification } from "@/types/notification";

export function useNotifications(
  initialNotifications: AppNotification[] = mockNotifications,
) {
  const [notifications, setNotifications] =
    useState<AppNotification[]>(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.readAt).length,
    [notifications],
  );

  const markRead = useCallback((id: string) => {
    const readAt = new Date().toISOString();

    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, readAt } : notification,
      ),
    );
  }, []);

  return {
    markRead,
    notifications,
    unreadCount,
  };
}
