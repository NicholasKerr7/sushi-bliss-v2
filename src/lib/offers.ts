import type { Offer } from "@/types/offer";
import type { StatusTone } from "@/types/common";

/** Returns true when an offer has passed its configured expiration timestamp. */
export function isOfferExpired(
  offer: Offer,
  currentTime = new Date().getTime(),
): boolean {
  return new Date(offer.expiresAt).getTime() <= currentTime;
}

/** Converts offer timing into the compact label shown in offer cards. */
export function getOfferStatusLabel(
  offer: Offer,
  currentTime = new Date().getTime(),
): string {
  return isOfferExpired(offer, currentTime) ? "Expired" : "Active";
}

/** Maps offer state and accent to the shared status badge tone scale. */
export function getOfferTone(
  offer: Offer,
  currentTime = new Date().getTime(),
): StatusTone {
  if (isOfferExpired(offer, currentTime)) {
    return "neutral";
  }

  return offer.accent === "premium" ? "premium" : "success";
}

/** Searches the user-facing offer fields used by the mobile offer finder. */
export function offerMatchesQuery(offer: Offer, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [
    offer.code,
    offer.description,
    offer.eligibility,
    offer.subtitle,
    offer.title,
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}

/** Keeps usable offers ahead of expired codes without changing authoring order. */
export function sortOffersByAvailability(
  offers: Offer[],
  currentTime = new Date().getTime(),
): Offer[] {
  return [...offers].sort((first, second) => {
    const firstExpired = isOfferExpired(first, currentTime);
    const secondExpired = isOfferExpired(second, currentTime);

    if (firstExpired === secondExpired) {
      return 0;
    }

    return firstExpired ? 1 : -1;
  });
}
