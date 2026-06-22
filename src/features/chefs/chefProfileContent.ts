import { getOmakaseExperience } from "@/lib/data";
import type { Chef } from "@/types/chef";
import type { ImageReference } from "@/types/common";
import type { MenuItem } from "@/types/menu";

import { menuItemById, menuItems } from "@/data/menu";

type ChefOmakaseCourseLabel = "Appetizer" | "Signature" | "Dessert";

export interface ChefOmakaseCoursePreview {
  image: ImageReference;
  label: ChefOmakaseCourseLabel;
  name: string;
  sequence: number;
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

/** Returns non-clickable chef omakase course cards from the omakase data set. */
export function getChefOmakaseCoursePreviews(
  chef: Chef,
): ChefOmakaseCoursePreview[] {
  const course = omakaseCourseByChefId.get(chef.id);

  if (!course) {
    const fallbackImage =
      getChefDishPreview(chef)[0]?.image || chef.platingImage;

    return [
      createOmakaseCoursePreview("Signature", chef.specialty, fallbackImage, 1),
    ];
  }

  return [
    createOmakaseCoursePreview(
      "Appetizer",
      course.appetizer.title || chef.appetizer,
      course.appetizer.image,
      1,
    ),
    createOmakaseCoursePreview(
      "Signature",
      course.specialty.title || chef.specialty,
      course.specialty.image,
      2,
    ),
    createOmakaseCoursePreview(
      "Dessert",
      course.dessert.title || chef.dessert,
      course.dessert.image,
      3,
    ),
  ];
}

function createOmakaseCoursePreview(
  label: ChefOmakaseCourseLabel,
  name: string,
  image: ImageReference,
  sequence: number,
): ChefOmakaseCoursePreview {
  return {
    image: {
      ...image,
      alt: image.alt || name,
    },
    label,
    name,
    sequence,
  };
}
