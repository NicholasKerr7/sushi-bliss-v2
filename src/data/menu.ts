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

export { getMenuItemById };
