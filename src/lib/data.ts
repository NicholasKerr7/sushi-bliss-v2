import rawData from "../../public/assets/data/data.json";

import { ASSET_FALLBACKS } from "@/lib/constants";
import { dollarsToCents } from "@/lib/money";
import { titleCase } from "@/lib/format";
import type { ImageReference } from "@/types/common";
import type { MenuCategory, MenuItem, SakePairing } from "@/types/menu";

interface LegacyImage {
  filePath?: string;
  publicUrl?: string;
}

interface LegacySakePairing {
  id?: string;
  menuItemId?: string;
  menuName?: string;
  sakeName?: string;
  sakeSlug?: string;
  image?: LegacyImage | null;
}

interface LegacyMenuItem {
  id?: string;
  name?: string;
  category?: string;
  tags?: string[];
  price?: number;
  description?: string;
  ingredients?: string;
  chefNote?: string;
  texture?: string;
  image?: LegacyImage;
  ingredientImage?: LegacyImage;
  sakePairing?: LegacySakePairing | null;
}

interface LegacyBrandContent {
  name?: string;
  tagline?: string;
  assets?: {
    logo?: LegacyImage;
    icon?: LegacyImage;
    floralEmblem?: LegacyImage;
    secondaryMark?: LegacyImage;
  };
}

interface LegacyDataFile {
  brand?: LegacyBrandContent;
  menu?: LegacyMenuItem[];
}

const legacyData = rawData as LegacyDataFile;

function normalizeImage(
  image: LegacyImage | undefined,
  alt: string,
): ImageReference {
  return {
    filePath: image?.filePath,
    publicUrl: image?.publicUrl || ASSET_FALLBACKS.menuItem,
    alt,
  };
}

function normalizeIngredients(value: string | undefined): string[] {
  return (value || "")
    .split(",")
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
}

function normalizePairing(
  value: LegacySakePairing | null | undefined,
): SakePairing | undefined {
  if (!value?.id || !value.menuItemId || !value.sakeName) {
    return undefined;
  }

  return {
    id: value.id,
    menuItemId: value.menuItemId,
    menuName: value.menuName || "",
    sakeName: value.sakeName,
    sakeSlug: value.sakeSlug || "",
    image: value.image
      ? normalizeImage(value.image, `${value.sakeName} pairing`)
      : undefined,
  };
}

export function getBrandContent() {
  const brand = legacyData.brand;

  return {
    name: brand?.name || "Sushi Bliss",
    tagline: brand?.tagline || "Timeless Japanese Artistry",
    logo: normalizeImage(brand?.assets?.logo, "Sushi Bliss logo"),
    icon: normalizeImage(brand?.assets?.icon, "Sushi Bliss app icon"),
  };
}

export function getMenuItems(): MenuItem[] {
  return (legacyData.menu || []).map((item) => {
    const id = item.id || "menu-item";
    const name = item.name || titleCase(id);

    return {
      id,
      name,
      category: item.category || "signature",
      tags: item.tags || [],
      priceCents: dollarsToCents(item.price || 0),
      description: item.description || "Chef-selected seasonal preparation.",
      ingredients: normalizeIngredients(item.ingredients),
      chefNote: item.chefNote || "Prepared with Sushi Bliss precision.",
      texture: item.texture || "Balanced",
      image: normalizeImage(item.image, name),
      ingredientImage: item.ingredientImage
        ? normalizeImage(item.ingredientImage, `${name} ingredient`)
        : undefined,
      sakePairing: normalizePairing(item.sakePairing),
    };
  });
}

export function getMenuCategories(): MenuCategory[] {
  const counts = getMenuItems().reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([id, itemCount]) => ({
    id,
    label: titleCase(id),
    itemCount,
  }));
}

export function getFeaturedMenuItems(limit = 4): MenuItem[] {
  return getMenuItems()
    .filter(
      (item) => item.tags.includes("premium") || item.category === "nigiri",
    )
    .slice(0, limit);
}
