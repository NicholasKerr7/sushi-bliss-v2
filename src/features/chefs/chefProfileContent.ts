import { menuItemById, menuItems } from "@/data/menu";
import type { Chef } from "@/types/chef";
import type { MenuItem } from "@/types/menu";

const chefDishPreviewIds: Record<string, string[]> = {
  "aiko-nakamura": ["tamago-nigiri", "vegetarian-temaki", "inari-sushi"],
  "hiroshi-tanaka": ["otoro-nigiri", "deluxe-toro-caviar-nigiri", "uni-nigiri"],
  "kenji-sato": ["seared-beef-nigiri", "truffle-wagyu-nigiri", "dragon-roll"],
  "ren-mori": ["chutoro-nigiri", "uni-gunkan", "red-snapper-sashimi"],
};

const fallbackDishIds = ["otoro-nigiri", "spicy-tuna-roll", "salmon-sashimi"];

/** Returns real menu records for a chef's signature dish preview. */
export function getChefDishPreview(chef: Chef): MenuItem[] {
  const ids = chefDishPreviewIds[chef.id] || fallbackDishIds;
  const items = ids
    .map((id) => menuItemById.get(id))
    .filter((item): item is MenuItem => Boolean(item));

  if (items.length > 0) {
    return items;
  }

  return menuItems.filter((item) => item.itemType !== "drink").slice(0, 3);
}

/** Keeps chef specialty cards consistent between mobile and expanded modals. */
export function getChefProfileHighlights(chef: Chef) {
  return [
    { label: "Signature", value: chef.specialty },
    { label: "Sushi", value: chef.sushi },
    { label: "Sashimi", value: chef.sashimi },
    { label: "Appetizer", value: chef.appetizer },
    { label: "Dessert", value: chef.dessert },
  ] as const;
}
