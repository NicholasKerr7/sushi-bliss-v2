import { TABLET_OTORO_HERO_IMAGE } from "@/lib/assets";
import type { MenuCategory, MenuItem } from "@/types/menu";

export interface TabletCategoryContent {
  description: string;
  filterLabel: string;
  filterOptions: string[];
  heroImage: string;
  heroPosition: string;
  placeholder: string;
  title: string;
}

export const tabletDietaryOptions = [
  "Any Diet",
  "Lean",
  "Rich",
  "Shellfish Free",
] as const;

export const tabletSpiceOptions = ["Any Heat", "Mild", "Hot"] as const;

export const tabletSortOptions = [
  "Featured",
  "Price Low",
  "Price High",
] as const;

const tabletCategoryContent: Record<string, TabletCategoryContent> = {
  "chef-specials": {
    description:
      "Rare cuts, premium finishes, and chef-driven signatures prepared with ceremony.",
    filterLabel: "Feature",
    filterOptions: ["Any Feature", "Toro", "Wagyu", "Truffle", "Caviar"],
    heroImage: "/assets/editorial/luxury-seafood-and-wagyu-selection.webp",
    heroPosition: "object-[68%_46%]",
    placeholder: "Wagyu, truffle, toro...",
    title: "Chef Specials",
  },
  drinks: {
    description:
      "Order zero-proof and tea online, or reserve rare sake, cocktails, and Liquid Omakase pairings for the dining room.",
    filterLabel: "Drink Type",
    filterOptions: [
      "Any Drink",
      "Sake",
      "Flights",
      "Cocktails",
      "Zero Proof",
      "Tea",
      "Beer & Wine",
    ],
    heroImage: "/assets/drinks/akai-tsuki-red-moon-cocktail.webp",
    heroPosition: "object-[58%_50%]",
    placeholder: "Sake, tea, yuzu...",
    title: "Drinks",
  },
  nigiri: {
    description:
      "Experience the pure art of nigiri. Hand-pressed perfection featuring the finest fish and seasonal ingredients.",
    filterLabel: "Fish",
    filterOptions: [
      "Any Fish",
      "Tuna",
      "Salmon",
      "Yellowtail",
      "Shellfish",
      "Roe",
    ],
    heroImage: TABLET_OTORO_HERO_IMAGE,
    heroPosition: "object-[70%_46%]",
    placeholder: "Otoro, uni, salmon...",
    title: "Nigiri",
  },
  rolls: {
    description:
      "Layered maki, precise cuts, and signature rolls built for texture, balance, and richness.",
    filterLabel: "Style",
    filterOptions: ["Any Style", "Classic", "Spicy", "Tempura", "Premium"],
    heroImage: "/assets/food/sushi-rolls-with-warm-cinematic-glow.webp",
    heroPosition: "object-[66%_52%]",
    placeholder: "Dragon, spicy tuna...",
    title: "Rolls",
  },
  sashimi: {
    description:
      "Clean slices of premium fish served with restraint, clarity, and seasonal garnish.",
    filterLabel: "Cut",
    filterOptions: ["Any Cut", "Tuna", "Salmon", "Scallop", "Octopus"],
    heroImage: "/assets/editorial/elegant-sashimi-platter-on-slate.webp",
    heroPosition: "object-[72%_48%]",
    placeholder: "Salmon, tuna, scallop...",
    title: "Sashimi",
  },
  vegetarian: {
    description:
      "Plant-forward sushi with bright vegetables, seasoned rice, and elegant umami.",
    filterLabel: "Ingredient",
    filterOptions: [
      "Any Ingredient",
      "Avocado",
      "Tofu",
      "Cucumber",
      "Shiitake",
    ],
    heroImage: "/assets/menu/sushi/vegetarian-temaki.webp",
    heroPosition: "object-[70%_50%]",
    placeholder: "Avocado, tofu, cucumber...",
    title: "Vegetarian",
  },
};

export function getTabletCategoryContent(
  category: string,
  categories: MenuCategory[],
) {
  const categoryLabel =
    categories.find((item) => item.id === category)?.label || "Menu";

  return (
    tabletCategoryContent[category] || {
      description:
        "Explore refined Sushi Bliss selections prepared with premium ingredients.",
      filterLabel: "Type",
      filterOptions: ["Any Type"],
      heroImage: TABLET_OTORO_HERO_IMAGE,
      heroPosition: "object-[70%_46%]",
      placeholder: `Search ${categoryLabel.toLowerCase()}...`,
      title: categoryLabel,
    }
  );
}

export function matchesTabletCategorySearch(item: MenuItem, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  return (
    normalizedQuery.length === 0 || item.searchText.includes(normalizedQuery)
  );
}

export function matchesTabletPrimaryFilter(item: MenuItem, filter: string) {
  const searchText = item.searchText;

  if (filter.startsWith("Any ")) return true;

  if (item.itemType === "drink") {
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

  const matchers: Record<string, RegExp> = {
    Avocado: /avocado/,
    Caviar: /caviar/,
    Classic: /california|philadelphia|classic/,
    Cucumber: /cucumber/,
    Octopus: /octopus|tako/,
    Premium: /premium|dragon|rainbow|wagyu|toro|uni|truffle/,
    Roe: /roe|ikura/,
    Salmon: /salmon/,
    Scallop: /scallop/,
    Shellfish: /shrimp|scallop|ebi/,
    Shiitake: /shiitake|mushroom/,
    Spicy: /spicy|hot|firecracker/,
    Tempura: /tempura/,
    Tofu: /tofu|inari/,
    Toro: /toro|otoro|chutoro/,
    Truffle: /truffle/,
    Tuna: /tuna|toro/,
    Wagyu: /wagyu|beef/,
    Yellowtail: /yellowtail|hamachi/,
  };

  return matchers[filter]?.test(searchText) ?? true;
}

export function matchesTabletDietary(item: MenuItem, dietary: string) {
  if (item.itemType === "drink") return true;

  const searchText = `${item.name} ${item.description} ${item.ingredients.join(
    " ",
  )}`.toLowerCase();

  if (dietary === "Lean") return /lean|hamachi|salmon|ebi/.test(searchText);
  if (dietary === "Rich") return /otoro|toro|uni|roe/.test(searchText);
  if (dietary === "Shellfish Free") return !/shrimp|scallop/.test(searchText);

  return true;
}

export function matchesTabletSpice(item: MenuItem, spice: string) {
  if (item.itemType === "drink") return true;

  if (spice === "Hot") return item.tags.includes("hot");
  if (spice === "Mild") return !item.tags.includes("hot");

  return true;
}

export function sortTabletCategoryItems(items: MenuItem[], sort: string) {
  if (sort === "Price Low") {
    return [...items].sort((a, b) => a.priceCents - b.priceCents);
  }

  if (sort === "Price High") {
    return [...items].sort((a, b) => b.priceCents - a.priceCents);
  }

  return items;
}
