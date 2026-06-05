import { menuItemById, menuItems } from "@/data/menu";
import type { MenuItem } from "@/types/menu";

export function getMenuItemsById(ids: string[]): MenuItem[] {
  return ids
    .map((id) => menuItemById.get(id))
    .filter((item): item is MenuItem => Boolean(item));
}

export const menuHeroItem = menuItemById.get("otoro-nigiri") || menuItems[0];

export const chefSpecialItems = getMenuItemsById([
  "otoro-nigiri",
  "spicy-tuna-roll",
  "salmon-sashimi",
  "dragon-roll",
]);

export const allTabletMenuItems = getMenuItemsById([
  "tuna-nigiri",
  "salmon-nigiri",
  "hamachi-nigiri",
  "unagi-nigiri",
  "ikura-gunkan",
  "scallop-nigiri",
  "california-roll",
  "philadelphia-roll",
  "shrimp-tempura-roll",
]);

export const tabletSearchFallbackItems = getMenuItemsById([
  "spicy-tuna-roll",
  "spicy-tuna-crunch-roll",
  "spicy-yellowtail-roll",
  "firecracker-roll",
]);

export const tabletNigiriItems = getMenuItemsById([
  "otoro-nigiri",
  "salmon-nigiri",
  "hamachi-nigiri",
  "uni-nigiri",
  "ebi-nigiri",
  "ikura-gunkan",
]);

export const recentTabletSearches = [
  "Spicy tuna roll",
  "Salmon sashimi",
  "Dragon roll",
  "Otoro nigiri",
  "Sake nigiri",
];
