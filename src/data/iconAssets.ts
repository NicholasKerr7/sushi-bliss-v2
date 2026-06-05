import { getAssetById } from "@/lib/assets";

export const sushiIconAssetIds = {
  bag: "takeaway-bag-icon",
  bell: "notification-bell-icon",
  calendar: "calendar-icon",
  cart: "shopping-cart-icon",
  chef: "chef-crest-icon",
  clock: "clock-icon",
  crown: "lotus-crown-icon",
  flower: "floral-emblem-icon",
  home: "home-icon",
  location: "map-pin-icon",
  menu: "sushi-menu-icon",
  nigiri: "nigiri-icon",
  plus: "plus-icon",
  profile: "user-icon",
  reservations: "calendar-icon",
  sashimi: "sashimi-icon",
  search: "search-icon",
  settings: "user-settings-icon",
} as const;

export type SushiIconAssetKey = keyof typeof sushiIconAssetIds;

/** Resolves transparent brand and navigation icons from the copied asset manifest. */
export function getSushiIconAssets(): Record<
  SushiIconAssetKey,
  string | undefined
> {
  return Object.fromEntries(
    Object.entries(sushiIconAssetIds).map(([key, id]) => [
      key,
      getAssetById(id)?.publicUrl,
    ]),
  ) as Record<SushiIconAssetKey, string | undefined>;
}
