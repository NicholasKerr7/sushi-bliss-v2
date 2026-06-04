import {
  getFeaturedMenuItems,
  getMenuCategories,
  getMenuItemById,
  getMenuItems,
  getMenuTags,
} from "@/lib/data";

export const menuItems = getMenuItems();

export const menuItemById = new Map(menuItems.map((item) => [item.id, item]));

export const menuCategories = getMenuCategories();

export const menuTags = getMenuTags();

export const featuredMenuItems = getFeaturedMenuItems();

export const popularMenuItems = menuItems
  .filter(
    (item) =>
      item.tags.includes("premium") ||
      item.tags.includes("chef-special") ||
      item.category === "nigiri",
  )
  .slice(0, 6);

export { getMenuItemById };
