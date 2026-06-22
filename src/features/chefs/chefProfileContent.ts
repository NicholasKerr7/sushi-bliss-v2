import { getOmakaseExperience } from "@/lib/data";
import type { Chef } from "@/types/chef";
import type { ImageReference } from "@/types/common";
import type { MenuItem } from "@/types/menu";

import { menuItemById, menuItems } from "@/data/menu";

type ChefSignatureCourseLabel =
  | "Signature"
  | "Sushi"
  | "Sashimi"
  | "Appetizer"
  | "Dessert";

export interface ChefSignatureCoursePreview {
  image: ImageReference;
  label: ChefSignatureCourseLabel;
  name: string;
  sequence: number;
  sourceLabel: string;
}

const omakaseCourseByChefId = new Map(
  getOmakaseExperience().courses.map((course) => [course.chefId, course]),
);

const chefDishPreviewIds: Record<string, string[]> = {
  "aiko-nakamura": ["tamago-nigiri", "vegetarian-temaki", "inari-sushi"],
  "hiroshi-tanaka": ["otoro-nigiri", "deluxe-toro-caviar-nigiri", "uni-nigiri"],
  "kenji-sato": ["seared-beef-nigiri", "truffle-wagyu-nigiri", "dragon-roll"],
  "ren-mori": ["chutoro-nigiri", "uni-gunkan", "red-snapper-sashimi"],
};

const fallbackDishIds = ["otoro-nigiri", "spicy-tuna-roll", "salmon-sashimi"];

const chefDishMenuAliases: Record<
  string,
  Partial<Record<ChefSignatureCourseLabel, string>>
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

/** Returns real menu records for the orderable picks below each chef profile. */
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

/** Returns the five chef-profile preview cards shown above related menu picks. */
export function getChefSignatureCoursePreviews(
  chef: Chef,
): ChefSignatureCoursePreview[] {
  const course = omakaseCourseByChefId.get(chef.id);

  if (!course) {
    const fallbackImage =
      getChefDishPreview(chef)[0]?.image || chef.platingImage;

    return [
      createSignatureCoursePreview(
        "Signature",
        chef.specialty,
        fallbackImage,
        1,
        "Chef course",
      ),
    ];
  }

  return [
    createSignatureCoursePreview(
      "Signature",
      chef.specialty,
      getChefCourseImage(chef, "Signature", course.specialty.image),
      1,
      getChefCourseSourceLabel(chef, "Signature"),
    ),
    createSignatureCoursePreview(
      "Sushi",
      chef.sushi,
      getChefCourseImage(chef, "Sushi", chef.platingImage),
      2,
      getChefCourseSourceLabel(chef, "Sushi"),
    ),
    createSignatureCoursePreview(
      "Sashimi",
      chef.sashimi,
      getChefCourseImage(chef, "Sashimi", chef.platingImage),
      3,
      getChefCourseSourceLabel(chef, "Sashimi"),
    ),
    createSignatureCoursePreview(
      "Appetizer",
      chef.appetizer,
      course.appetizer.image,
      4,
      "Omakase",
    ),
    createSignatureCoursePreview(
      "Dessert",
      chef.dessert,
      course.dessert.image,
      5,
      "Omakase",
    ),
  ];
}

function createSignatureCoursePreview(
  label: ChefSignatureCourseLabel,
  name: string,
  image: ImageReference,
  sequence: number,
  sourceLabel = "Chef course",
): ChefSignatureCoursePreview {
  return {
    image: {
      ...image,
      alt: image.alt || name,
    },
    label,
    name,
    sequence,
    sourceLabel,
  };
}

function getChefCourseImage(
  chef: Chef,
  label: ChefSignatureCourseLabel,
  fallbackImage: ImageReference,
): ImageReference {
  const menuItem = getChefCourseMenuItem(chef, label);

  return menuItem?.image || fallbackImage;
}

function getChefCourseMenuItem(
  chef: Chef,
  label: ChefSignatureCourseLabel,
): MenuItem | undefined {
  const aliasId = chefDishMenuAliases[chef.id]?.[label];
  const name =
    label === "Signature"
      ? chef.specialty
      : label === "Sushi"
        ? chef.sushi
        : label === "Sashimi"
          ? chef.sashimi
          : "";

  return aliasId
    ? menuItemById.get(aliasId)
    : menuItemByName.get(normalizeDishName(name));
}

function getChefCourseSourceLabel(
  chef: Chef,
  label: ChefSignatureCourseLabel,
): string {
  return getChefCourseMenuItem(chef, label)?.categoryLabel || "Omakase";
}

function normalizeDishName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
