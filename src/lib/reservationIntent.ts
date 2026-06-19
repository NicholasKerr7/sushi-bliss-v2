import { getMenuItemById } from "@/data/menu";
import {
  getDefaultReservationDraft,
  reservationExperiences,
} from "@/data/reservations";
import type { ReservationDraft } from "@/types/reservation";
import type { UserProfile } from "@/types/user";

interface ReservationIntentParams {
  get(name: string): string | null;
}

function getKnownExperienceId(value: string | null): string | undefined {
  if (!value) {
    return undefined;
  }

  return reservationExperiences.some((experience) => experience.id === value)
    ? value
    : undefined;
}

export function hasReservationIntent(params?: ReservationIntentParams | null) {
  return Boolean(params?.get("intent") || params?.get("item"));
}

/** Builds a booking draft from menu-originated reservation intent query params. */
export function createReservationDraftFromIntent(
  profile: Pick<UserProfile, "name" | "phone">,
  params?: ReservationIntentParams | null,
): ReservationDraft {
  const draft = getDefaultReservationDraft(profile);

  if (!params) {
    return draft;
  }

  const intent = params.get("intent");
  const item = getMenuItemById(params.get("item") || "");

  if (!hasReservationIntent(params) || (!intent && !item)) {
    return draft;
  }

  const experienceId =
    getKnownExperienceId(params.get("experience")) ||
    (intent === "liquid-omakase" ? "chef-omakase" : "sushi-counter");
  const itemLabel = item
    ? `${item.name}${item.serving ? ` (${item.serving})` : ""}`
    : intent === "liquid-omakase"
      ? "Liquid Omakase pairing"
      : "table-side service";

  if (intent === "liquid-omakase") {
    return {
      ...draft,
      experienceId,
      notes: `Interested in ${itemLabel}. Please pace the beverage pairing around the chef's menu and confirm ID requirements at arrival.`,
      occasion: "Liquid Omakase",
      seatingPreference: "Chef counter",
    };
  }

  return {
    ...draft,
    experienceId,
    notes: `Interested in ${itemLabel}. Please prepare this as part of the table-side service.`,
    seatingPreference: "Chef counter",
  };
}
