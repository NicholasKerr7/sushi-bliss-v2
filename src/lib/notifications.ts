import type {
  AppNotification,
  NotificationCategory,
} from "@/types/notification";

export type NotificationFilter = "all" | "unread" | NotificationCategory;

export const notificationCategoryLabels: Record<NotificationCategory, string> =
  {
    offer: "Offer",
    order: "Order",
    reservation: "Reservation",
    reward: "Reward",
    support: "Support",
  };

export const notificationCategoryIcons: Record<NotificationCategory, string> = {
  offer: "/assets/icons/gift-icon.png",
  order: "/assets/icons/takeaway-bag-icon.png",
  reservation: "/assets/icons/calendar-icon.png",
  reward: "/assets/icons/golden-ticket-icon.png",
  support: "/assets/icons/headset-icon.png",
};

export const notificationFilters: Array<{
  id: NotificationFilter;
  label: string;
}> = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "order", label: "Orders" },
  { id: "reservation", label: "Reserve" },
  { id: "reward", label: "Rewards" },
  { id: "offer", label: "Offers" },
  { id: "support", label: "Support" },
];

/** Sorts notices newest-first while preserving read metadata from storage. */
export function sortNotificationsByRecency(
  notifications: AppNotification[],
): AppNotification[] {
  return [...notifications].sort(
    (first, second) =>
      new Date(second.createdAt).getTime() -
      new Date(first.createdAt).getTime(),
  );
}

/** Applies the notification center filter model used across breakpoints. */
export function filterNotifications(
  notifications: AppNotification[],
  filter: NotificationFilter,
): AppNotification[] {
  if (filter === "all") {
    return notifications;
  }

  if (filter === "unread") {
    return notifications.filter((notification) => !notification.readAt);
  }

  return notifications.filter(
    (notification) => notification.category === filter,
  );
}
