import { getSushiIconAssets } from "@/data/iconAssets";
import { featuredMenuItems, menuItemById } from "@/data/menu";
import {
  getAppContent,
  getBrandContent,
  getChefs,
  getFeaturedAssets,
} from "@/lib/data";
import type { MenuItem } from "@/types/menu";

export const brand = getBrandContent();
export const featuredAssets = getFeaturedAssets();
export const appContent = getAppContent();
export const icons = getSushiIconAssets();
export const chefAvatar =
  getChefs().find((chef) => chef.id === "hiroshi-tanaka")?.profileImage
    .publicUrl || "/assets/chefs/hiroshi-tanaka-profile-photo.webp";

export const dashboardCategories = [
  { id: "nigiri", icon: icons.nigiri, label: "Nigiri" },
  { id: "rolls", icon: icons.menu, label: "Rolls" },
  { id: "sashimi", icon: icons.sashimi, label: "Sashimi" },
  { id: "chef-specials", icon: icons.crown, label: "Chef Specials" },
] as const;

export const desktopNav = [
  ["Home", "#home-dashboard"],
  ["Menu", "#menu"],
  ["Reservations", "#reservations"],
  ["Order Online", "#menu"],
  ["About Us", "#about"],
  ["Contact", "#support"],
] as const;

export const mobileNav = [
  { href: "#home-dashboard", icon: icons.home, label: "Home" },
  { href: "#menu", icon: icons.menu, label: "Menu" },
  { href: "#reservations", icon: icons.calendar, label: "Reservations" },
  { href: "#orders", icon: icons.bag, label: "Orders" },
  { href: "#profile", icon: icons.profile, label: "Profile" },
] as const;

/** Chooses a stable menu item for screenshot-matched dashboard modules. */
export function getDashboardItem(id: string, fallbackIndex = 0): MenuItem {
  return (
    menuItemById.get(id) ||
    featuredMenuItems[fallbackIndex] ||
    featuredMenuItems[0]
  );
}
