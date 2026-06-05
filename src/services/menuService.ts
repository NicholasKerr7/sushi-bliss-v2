import { menuCategories, menuItemById, menuItems, menuTags } from "@/data/menu";
import {
  serviceFailure,
  serviceSuccess,
  type ListServiceParams,
  type ServiceResponse,
} from "@/services/contracts";
import type { MenuCategory, MenuItem, MenuTag } from "@/types/menu";

export interface MenuCatalogSnapshot {
  categories: MenuCategory[];
  items: MenuItem[];
  tags: MenuTag[];
}

/** Provides the menu catalog through the future Supabase service boundary. */
export async function listMenuCatalog(
  params: ListServiceParams = {},
): Promise<ServiceResponse<MenuCatalogSnapshot>> {
  const query = params.query?.trim().toLowerCase();
  const filteredItems = query
    ? menuItems.filter((item) => item.searchText.includes(query))
    : menuItems;
  const offset = params.offset || 0;
  const limit = params.limit || filteredItems.length;

  return serviceSuccess({
    categories: menuCategories,
    items: filteredItems.slice(offset, offset + limit),
    tags: menuTags,
  });
}

/** Resolves one menu item by id behind the future API/data boundary. */
export async function getMenuItem(
  id: string,
): Promise<ServiceResponse<MenuItem>> {
  const item = menuItemById.get(id);

  return item
    ? serviceSuccess(item)
    : serviceFailure("menu_item_not_found", "Menu item was not found.");
}
