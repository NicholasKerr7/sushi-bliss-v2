import { getOmakaseExperience } from "@/lib/data";
import type { Chef } from "@/types/chef";
import type { ImageReference } from "@/types/common";
import type { MenuItem } from "@/types/menu";

import { menuItemById, menuItems } from "@/data/menu";

type ChefProfileHighlightLabel =
  | "Signature"
  | "Sushi"
  | "Sashimi"
  | "Appetizer"
  | "Dessert";

export interface ChefProfileHighlight {
  label: ChefProfileHighlightLabel;
  value: string;
}

export interface ChefSignatureDishPreview extends ChefProfileHighlight {
  ctaLabel: string;
  href: string;
  image: ImageReference;
  menuItem?: MenuItem;
  sourceLabel: string;
}

const chefDishPreviewIds: Record<string, string[]> = {
  "aiko-nakamura": ["tamago-nigiri", "vegetarian-temaki", "inari-sushi"],
  "hiroshi-tanaka": ["otoro-nigiri", "deluxe-toro-caviar-nigiri", "uni-nigiri"],
  "kenji-sato": ["seared-beef-nigiri", "truffle-wagyu-nigiri", "dragon-roll"],
  "ren-mori": ["chutoro-nigiri", "uni-gunkan", "red-snapper-sashimi"],
};

const fallbackDishIds = ["otoro-nigiri", "spicy-tuna-roll", "salmon-sashimi"];

const chefDishMenuAliases: Record<
  string,
  Partial<Record<ChefProfileHighlightLabel, string>>
> = {
  "aiko-nakamura": {
    Sashimi: "scallop-sashimi",
    Sushi: "salmon-temari-sushi",
  },
  "hiroshi-tanaka": {
    Sashimi: "tuna-sashimi",
    Signature: "otoro-nigiri",
    Sushi: "deluxe-toro-caviar-nigiri",
  },
  "kenji-sato": {
    Sashimi: "hamachi-nigiri",
    Sushi: "seared-beef-nigiri",
  },
  "ren-mori": {
    Sashimi: "red-snapper-sashimi",
    Sushi: "dragon-roll",
  },
};

const menuItemByName = new Map(
  menuItems.map((item) => [normalizeDishName(item.name), item]),
);

const omakaseCourseByChefId = new Map(
  getOmakaseExperience().courses.map((course) => [course.chefId, course]),
);

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
export function getChefProfileHighlights(chef: Chef): ChefProfileHighlight[] {
  return [
    { label: "Signature", value: chef.specialty },
    { label: "Sushi", value: chef.sushi },
    { label: "Sashimi", value: chef.sashimi },
    { label: "Appetizer", value: chef.appetizer },
    { label: "Dessert", value: chef.dessert },
  ];
}

/** Builds five visual chef-signature previews from chef, omakase, and menu data. */
export function getChefSignatureDishPreviews(
  chef: Chef,
): ChefSignatureDishPreview[] {
  const fallbackImage = getChefDishPreview(chef)[0]?.image || chef.platingImage;

  return getChefProfileHighlights(chef).map((highlight) => {
    const menuItem = getChefHighlightMenuItem(chef, highlight);
    const courseImage = getChefHighlightCourseImage(chef, highlight);
    const image = courseImage || menuItem?.image || fallbackImage;
    const isMenuItem = Boolean(menuItem && !courseImage);

    return {
      ...highlight,
      ctaLabel: isMenuItem ? "View menu" : "View omakase",
      href:
        isMenuItem && menuItem
          ? `/menu?category=${menuItem.category}`
          : "/omakase",
      image: {
        ...image,
        alt: image.alt || highlight.value,
      },
      menuItem,
      sourceLabel: getChefSignatureSourceLabel(highlight.label, menuItem),
    };
  });
}

function getChefHighlightMenuItem(
  chef: Chef,
  highlight: ChefProfileHighlight,
): MenuItem | undefined {
  const aliasId = chefDishMenuAliases[chef.id]?.[highlight.label];

  return aliasId
    ? menuItemById.get(aliasId)
    : menuItemByName.get(normalizeDishName(highlight.value));
}

function getChefHighlightCourseImage(
  chef: Chef,
  highlight: ChefProfileHighlight,
): ImageReference | undefined {
  const course = omakaseCourseByChefId.get(chef.id);

  if (!course) {
    return undefined;
  }

  if (highlight.label === "Appetizer") {
    return course.appetizer.image;
  }

  if (highlight.label === "Dessert") {
    return course.dessert.image;
  }

  if (highlight.label === "Signature") {
    const menuItem = getChefHighlightMenuItem(chef, highlight);

    return menuItem ? undefined : course.specialty.image;
  }

  return undefined;
}

function getChefSignatureSourceLabel(
  label: ChefProfileHighlightLabel,
  menuItem: MenuItem | undefined,
): string {
  if (menuItem) {
    return menuItem.categoryLabel;
  }

  return label === "Dessert"
    ? "Dessert course"
    : label === "Appetizer"
      ? "Opening course"
      : "Omakase course";
}

function normalizeDishName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
