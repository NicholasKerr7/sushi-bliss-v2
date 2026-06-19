import { getFeaturedMenuItems, getMenuItems } from "@/lib/data";
import { titleCase } from "@/lib/format";
import type { MenuCategory, MenuItem, MenuTag } from "@/types/menu";

import { drinkMenuItems } from "./drinks";

function getCategoriesFromItems(items: MenuItem[]): MenuCategory[] {
  const counts = items.reduce<Record<string, MenuCategory>>((acc, item) => {
    const existing = acc[item.category];

    acc[item.category] = {
      id: item.category,
      itemCount: (existing?.itemCount || 0) + 1,
      label: item.categoryLabel,
    };

    return acc;
  }, {});

  return Object.values(counts).sort((a, b) => a.label.localeCompare(b.label));
}

function getTagsFromItems(items: MenuItem[]): MenuTag[] {
  const counts = items.reduce<Record<string, MenuTag>>((acc, item) => {
    item.tags.forEach((tag) => {
      const existing = acc[tag];

      acc[tag] = {
        id: tag,
        itemCount: (existing?.itemCount || 0) + 1,
        label: titleCase(tag),
      };
    });

    return acc;
  }, {});

  return Object.values(counts).sort((a, b) => a.label.localeCompare(b.label));
}

const foodMenuItems = getMenuItems();

export const menuItems = [...foodMenuItems, ...drinkMenuItems];

export const menuItemById = new Map(menuItems.map((item) => [item.id, item]));

export const menuCategories = getCategoriesFromItems(menuItems);

export const menuTags = getTagsFromItems(menuItems);

export const featuredMenuItems = [
  ...getFeaturedMenuItems(),
  ...drinkMenuItems
    .filter((item) => item.tags.includes("featured"))
    .slice(0, 2),
];

export const popularMenuItems = menuItems
  .filter(
    (item) =>
      item.tags.includes("premium") ||
      item.tags.includes("signature") ||
      item.tags.includes("chef-special") ||
      item.category === "nigiri",
  )
  .slice(0, 6);

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItemById.get(id);
}
