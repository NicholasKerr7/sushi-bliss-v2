import {
  getTabletPresentationImage,
  TABLET_OTORO_HERO_IMAGE,
} from "@/lib/assets";
import type { MenuItem } from "@/types/menu";

import { menuHeroItem } from "./tabletMenuData";

export const desktopCategoryButtons = [
  ["all", "Recommended", "/assets/icons/star-icon.png"],
  ["nigiri", "Nigiri", "/assets/icons/nigiri-icon.png"],
  ["rolls", "Rolls", "/assets/icons/sushi-menu-icon.png"],
  ["sashimi", "Sashimi", "/assets/icons/sashimi-icon.png"],
  ["chef-specials", "Chef Specials", "/assets/icons/lotus-crown-icon.png"],
  ["vegetarian", "Vegetarian", "/assets/icons/vegetarian-sushi-icon.webp"],
  ["drinks", "Drinks", "/assets/icons/floral-emblem-icon.png"],
] as const;

export const desktopNigiriDisplayNames: Record<string, string> = {
  "salmon-nigiri": "Sake Nigiri",
  "scallop-nigiri": "Hotate Nigiri",
  "tuna-nigiri": "Maguro Nigiri",
};

export const desktopFishOptions = [
  "Fish Type",
  "Tuna",
  "Salmon",
  "Yellowtail",
  "Shellfish",
  "Roe",
] as const;
export const desktopDrinkOptions = [
  "Drink Type",
  "Sake",
  "Flights",
  "Cocktails",
  "Zero Proof",
  "Tea",
  "Beer & Wine",
] as const;
export const desktopDietaryOptions = [
  "Dietary",
  "Lean",
  "Rich",
  "Shellfish Free",
  "Vegetarian",
] as const;
export const desktopSpiceOptions = ["Spicy Level", "Mild", "Hot"] as const;
export const desktopSortOptions = ["Sort By", "Price Low", "Price High"] as const;

export const desktopHeroContent = {
  all: {
    accent: "Japanese Cuisine",
    description: "Sourced daily. Crafted by masters. Served with passion.",
    eyebrow: "Explore our menu",
    image: getTabletPresentationImage(menuHeroItem),
    imagePosition: "object-[72%_42%]",
    title: "Exceptional",
  },
  "chef-specials": {
    description:
      "Rare cuts, premium finishes, and chef-driven signatures prepared with ceremony.",
    eyebrow: "Chef signatures",
    image: "/assets/editorial/luxury-seafood-and-wagyu-selection.webp",
    imagePosition: "object-[68%_46%]",
    title: "Chef Specials",
  },
  drinks: {
    description:
      "Order zero-proof and tea online, or reserve rare sake, cocktails, and Liquid Omakase pairings for the dining room.",
    eyebrow: "Beverage Pairings",
    image: "/assets/drinks/akai-tsuki-red-moon-cocktail.webp",
    imagePosition: "object-[58%_48%]",
    title: "Drinks",
  },
  nigiri: {
    description:
      "Experience the pure art of nigiri. Hand-pressed perfection, featuring the finest fish and seasonal ingredients.",
    eyebrow: "Our Menu",
    image: TABLET_OTORO_HERO_IMAGE,
    imagePosition: "object-[70%_46%]",
    title: "Nigiri",
  },
  rolls: {
    description:
      "Layered maki, precise cuts, and signature rolls built for texture, balance, and richness.",
    eyebrow: "Signature rolls",
    image: "/assets/food/sushi-rolls-with-warm-cinematic-glow.webp",
    imagePosition: "object-[66%_52%]",
    title: "Rolls",
  },
  sashimi: {
    description:
      "Clean slices of premium fish served with restraint, clarity, and seasonal garnish.",
    eyebrow: "Pure cuts",
    image: "/assets/editorial/elegant-sashimi-platter-on-slate.webp",
    imagePosition: "object-[72%_48%]",
    title: "Sashimi",
  },
  vegetarian: {
    description:
      "Plant-forward sushi with bright vegetables, seasoned rice, and elegant umami.",
    eyebrow: "Plant-forward",
    image: "/assets/menu/sushi/vegetarian-temaki.webp",
    imagePosition: "object-[70%_50%]",
    title: "Vegetarian",
  },
} as const;

function getDesktopMenuSearchText(item: MenuItem) {
  return `${item.name} ${item.description} ${item.ingredients.join(" ")} ${item.tags.join(" ")}`.toLowerCase();
}

export function matchesDesktopFishFilter(item: MenuItem, filter: string) {
  if (item.itemType === "drink") {
    if (filter === desktopFishOptions[0] || filter === desktopDrinkOptions[0]) {
      return true;
    }

    const searchText = getDesktopMenuSearchText(item);
    const drinkMatchers: Record<string, RegExp> = {
      "Beer & Wine": /beer|lager|wine|sparkling/,
      Cocktails: /cocktail|old fashioned|highball|spritz|akai|kintsugi/,
      Flights: /flight/,
      Sake: /sake|junmai|ginjo|daiginjo|yamahai/,
      Tea: /tea|sencha|hojicha|gyokuro|matcha/,
      "Zero Proof": /zero-proof|zero proof|nonalcoholic|tonic|cloud|ember/,
    };

    return drinkMatchers[filter]?.test(searchText) ?? true;
  }

  if (filter === desktopFishOptions[0]) return true;

  const searchText = getDesktopMenuSearchText(item);
  const matchers: Record<string, RegExp> = {
    Roe: /roe|ikura/,
    Salmon: /salmon/,
    Shellfish: /shrimp|scallop|ebi/,
    Tuna: /tuna|toro/,
    Yellowtail: /yellowtail|hamachi/,
  };

  return matchers[filter]?.test(searchText) ?? true;
}

export function matchesDesktopDietaryFilter(item: MenuItem, filter: string) {
  if (filter === desktopDietaryOptions[0]) return true;
  if (item.itemType === "drink") return true;

  const searchText = getDesktopMenuSearchText(item);

  if (filter === "Lean") return /lean|hamachi|salmon|ebi/.test(searchText);
  if (filter === "Rich") return /otoro|toro|uni|roe|wagyu/.test(searchText);
  if (filter === "Shellfish Free")
    return !/shrimp|scallop|ebi/.test(searchText);
  if (filter === "Vegetarian") return item.category === "vegetarian";

  return true;
}

export function matchesDesktopSpiceFilter(item: MenuItem, filter: string) {
  if (item.itemType === "drink") return true;
  if (filter === "Hot") return item.tags.includes("hot");
  if (filter === "Mild") return !item.tags.includes("hot");

  return true;
}

export function sortDesktopMenuItems(items: MenuItem[], sort: string) {
  if (sort === "Price Low") {
    return [...items].sort((a, b) => a.priceCents - b.priceCents);
  }

  if (sort === "Price High") {
    return [...items].sort((a, b) => b.priceCents - a.priceCents);
  }

  return items;
}
