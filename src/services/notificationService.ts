import { initialNotifications } from "@/data/notifications";
import {
  serviceFailure,
  serviceSuccess,
  type ListServiceParams,
  type ServiceResponse,
} from "@/services/contracts";
import type { AppNotification } from "@/types/notification";

/** Lists seeded notifications through the future Supabase notification boundary. */
export async function listNotifications(
  params: ListServiceParams = {},
): Promise<ServiceResponse<AppNotification[]>> {
  const query = params.query?.trim().toLowerCase();
  const filteredNotifications = query
    ? initialNotifications.filter((notification) =>
        [
          notification.body,
          notification.category,
          notification.relatedLabel,
          notification.title,
        ]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(query)),
      )
    : initialNotifications;
  const offset = params.offset || 0;
  const limit = params.limit || filteredNotifications.length;

  return serviceSuccess(
    filteredNotifications.slice(offset, offset + limit),
    "mock",
  );
}

/** Resolves one notification by id without coupling UI code to seed data. */
export async function getNotification(
  id: string,
): Promise<ServiceResponse<AppNotification>> {
  const notification = initialNotifications.find(
    (candidate) => candidate.id === id,
  );

  return notification
    ? serviceSuccess(notification)
    : serviceFailure("notification_not_found", "Notification was not found.");
}
