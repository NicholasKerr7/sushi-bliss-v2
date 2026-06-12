import type {
  AppNotification,
  NotificationCategory,
} from "@/types/notification";

export const mobileNotificationCategoryOrder: NotificationCategory[] = [
  "order",
  "reservation",
  "reward",
  "offer",
  "support",
];

const notificationActionLabels: Record<NotificationCategory, string> = {
  offer: "Claim offer",
  order: "Track order",
  reservation: "Manage booking",
  reward: "View rewards",
  support: "Contact support",
};

const notificationFlowCopy: Record<
  NotificationCategory,
  { body: string; title: string }
> = {
  offer: {
    body: "Offers connect to checkout-ready promotions and seasonal omakase drops.",
    title: "Offer follow-up",
  },
  order: {
    body: "Order updates stay linked to tracking, receipt details, and reorder actions.",
    title: "Order follow-up",
  },
  reservation: {
    body: "Reservation notices connect to guest count, timing, location, and modification tools.",
    title: "Reservation follow-up",
  },
  reward: {
    body: "Reward notices stay connected to points, tier progress, and valid redemption paths.",
    title: "Reward follow-up",
  },
  support: {
    body: "Concierge messages keep allergy, accessibility, private dining, and gift timing help close.",
    title: "Concierge follow-up",
  },
};

export function getNotificationActionLabel(notification: AppNotification) {
  return notificationActionLabels[notification.category];
}

/** Returns category-specific context for the mobile notification detail view. */
export function getNotificationFlowCopy(category: NotificationCategory) {
  return notificationFlowCopy[category];
}

export function getNoticeCountLabel(count: number) {
  return `${count} notice${count === 1 ? "" : "s"}`;
}
