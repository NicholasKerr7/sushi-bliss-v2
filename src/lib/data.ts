import rawData from "../../public/assets/data/data.json";

import { toImageReference } from "@/lib/assets";
import { ASSET_FALLBACKS } from "@/lib/constants";
import { slugify, titleCase } from "@/lib/format";
import { dollarsToCents } from "@/lib/money";
import type {
  AppContent,
  BrandContent,
  BusinessHoursContent,
  BusinessLocationContent,
  DesignTokens,
} from "@/types/brand";
import type {
  Chef,
  OmakaseCourse,
  OmakaseCourseItem,
  OmakaseExperience,
} from "@/types/chef";
import type { ImageReference } from "@/types/common";
import type { EditorialAsset, FeaturedAssets } from "@/types/asset";
import type {
  MenuCategory,
  MenuItem,
  MenuTastingProfile,
  MenuTag,
  SakePairing,
} from "@/types/menu";

interface LegacyImage {
  filePath?: string;
  publicUrl?: string;
}

interface LegacySakePairing {
  id?: string;
  image?: LegacyImage | null;
  menuItemId?: string;
  menuName?: string;
  sakeName?: string;
  sakeSlug?: string;
}

interface LegacyMenuItem {
  category?: string;
  chefNote?: string;
  description?: string;
  id?: string;
  image?: LegacyImage;
  ingredientImage?: LegacyImage;
  ingredients?: string;
  name?: string;
  price?: number;
  sakePairing?: LegacySakePairing | null;
  tags?: string[];
  texture?: string;
}

interface LegacyChef {
  about?: string;
  appetizer?: string;
  dessert?: string;
  id?: string;
  name?: string;
  platingImage?: LegacyImage;
  position?: string;
  profileImage?: LegacyImage;
  sashimi?: string;
  specialty?: string;
  standingImage?: LegacyImage;
  sushi?: string;
}

interface LegacyBrandContent {
  assets?: {
    floralEmblem?: LegacyImage;
    icon?: LegacyImage;
    logo?: LegacyImage;
    secondaryMark?: LegacyImage;
  };
  name?: string;
  tagline?: string;
}

interface LegacyDesignTokens {
  colors?: Record<string, string>;
  style?: string[];
}

interface LegacyEditorialAsset {
  experienceId?: string;
  filePath?: string;
  id?: string;
  publicUrl?: string;
  role?: string;
  title?: string;
}

interface LegacyFeaturedAssets {
  ambience?: LegacyEditorialAsset[];
  heroSushi?: LegacyImage;
  sakeSets?: LegacyImage[];
}

interface LegacyOmakaseCourseItem {
  image?: LegacyImage;
  title?: string;
}

interface LegacyOmakaseCourse {
  appetizer?: LegacyOmakaseCourseItem;
  chefId?: string;
  dessert?: LegacyOmakaseCourseItem;
  sequence?: number;
  specialty?: LegacyOmakaseCourseItem;
}

interface LegacyOmakaseExperience {
  courses?: LegacyOmakaseCourse[];
  description?: string;
  id?: string;
  title?: string;
}

interface LegacyAppContent {
  benefits?: Array<{
    copy?: string;
    icon?: string;
    id?: string;
    title?: string;
  }>;
  hours?: Partial<BusinessHoursContent>;
  location?: Partial<BusinessLocationContent>;
}

interface LegacyDataFile {
  appContent?: LegacyAppContent;
  brand?: LegacyBrandContent;
  chefs?: LegacyChef[];
  designTokens?: LegacyDesignTokens;
  featuredAssets?: LegacyFeaturedAssets;
  masterChefsOmakaseExperience?: LegacyOmakaseExperience;
  menu?: LegacyMenuItem[];
}

const legacyData = rawData as LegacyDataFile;

const DEFAULT_TASTING_PROFILE: MenuTastingProfile = {
  buttery: 44,
  richness: 48,
  sweetness: 42,
  tenderness: 55,
  umami: 58,
};

const CATEGORY_TASTING_PROFILES: Record<string, MenuTastingProfile> = {
  gunkan: {
    buttery: 52,
    richness: 62,
    sweetness: 30,
    tenderness: 55,
    umami: 82,
  },
  nigiri: {
    buttery: 52,
    richness: 58,
    sweetness: 36,
    tenderness: 68,
    umami: 66,
  },
  oshizushi: {
    buttery: 35,
    richness: 44,
    sweetness: 38,
    tenderness: 50,
    umami: 72,
  },
  rolls: {
    buttery: 56,
    richness: 54,
    sweetness: 50,
    tenderness: 52,
    umami: 58,
  },
  sashimi: {
    buttery: 36,
    richness: 42,
    sweetness: 28,
    tenderness: 70,
    umami: 60,
  },
  temaki: {
    buttery: 48,
    richness: 45,
    sweetness: 48,
    tenderness: 44,
    umami: 50,
  },
  vegetarian: {
    buttery: 36,
    richness: 34,
    sweetness: 56,
    tenderness: 48,
    umami: 48,
  },
};

/** Normalizes a legacy image object into the shared image model with fallback data. */
function normalizeImage(
  image: LegacyImage | undefined,
  alt: string,
  fallback: string = ASSET_FALLBACKS.menuItem,
): ImageReference {
  const reference = toImageReference(image?.publicUrl, alt, fallback);

  return {
    ...reference,
    filePath: image?.filePath || reference.filePath,
  };
}

/** Splits comma-delimited ingredient copy into searchable structured values. */
function normalizeIngredients(value: string | undefined): string[] {
  return (value || "")
    .split(",")
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
}

/** Converts legacy free-form tags into lowercase ids without duplicates. */
function normalizeTags(tags: string[] | undefined): string[] {
  return Array.from(new Set((tags || []).map(slugify).filter(Boolean)));
}

/** Creates a canonical category id for filtering and a readable label for UI. */
function normalizeCategory(value: string | undefined): {
  id: string;
  label: string;
} {
  const id = slugify(value || "signature");

  return {
    id,
    label: titleCase(id),
  };
}

/** Preserves sake pairing data only when the minimum identifying fields exist. */
function normalizePairing(
  value: LegacySakePairing | null | undefined,
): SakePairing | undefined {
  if (!value?.id || !value.menuItemId || !value.sakeName) {
    return undefined;
  }

  return {
    id: value.id,
    image: value.image
      ? normalizeImage(value.image, `${value.sakeName} pairing`)
      : undefined,
    menuItemId: value.menuItemId,
    menuName: value.menuName || "",
    sakeName: value.sakeName,
    sakeSlug: value.sakeSlug || slugify(value.sakeName),
  };
}

/** Builds a pre-normalized search field from the menu content users scan. */
function createSearchText(item: Omit<MenuItem, "searchText">): string {
  return [
    item.name,
    item.category,
    item.categoryLabel,
    item.description,
    item.chefNote,
    item.texture,
    ...item.ingredients,
    ...item.tags,
  ]
    .join(" ")
    .toLowerCase();
}

function clampTastingValue(value: number): number {
  return Math.min(96, Math.max(18, Math.round(value)));
}

function applyTastingBoost(
  profile: MenuTastingProfile,
  boost: Partial<MenuTastingProfile>,
): void {
  Object.entries(boost).forEach(([key, value]) => {
    profile[key as keyof MenuTastingProfile] += value ?? 0;
  });
}

/** Derives a radar profile from normalized menu copy without requiring raw data changes. */
function createTastingProfile(
  item: Omit<MenuItem, "searchText" | "tastingNotes">,
): MenuTastingProfile {
  const profile = {
    ...(CATEGORY_TASTING_PROFILES[item.category] || DEFAULT_TASTING_PROFILE),
  };
  const copy = [
    item.name,
    item.category,
    item.description,
    item.chefNote,
    item.texture,
    ...item.ingredients,
    ...item.tags,
  ]
    .join(" ")
    .toLowerCase();
  const hasAny = (keywords: string[]) =>
    keywords.some((keyword) => copy.includes(keyword));

  if (hasAny(["premium", "chef-special", "luxurious", "gold"])) {
    applyTastingBoost(profile, { buttery: 5, richness: 8, umami: 6 });
  }

  if (hasAny(["fatty", "toro", "otoro", "chutoro", "wagyu", "marbled"])) {
    applyTastingBoost(profile, {
      buttery: 26,
      richness: 30,
      tenderness: 10,
      umami: 8,
    });
  }

  if (hasAny(["rich", "melt-in-your-mouth"])) {
    applyTastingBoost(profile, {
      buttery: 14,
      richness: 24,
      tenderness: 8,
    });
  }

  if (hasAny(["buttery", "soft", "silky", "custard", "custardy", "creamy"])) {
    applyTastingBoost(profile, {
      buttery: 22,
      richness: 12,
      tenderness: 12,
      sweetness: 6,
    });
  }

  if (hasAny(["salmon"])) {
    applyTastingBoost(profile, {
      buttery: 16,
      richness: 10,
      sweetness: 10,
      tenderness: 6,
    });
  }

  if (hasAny(["tuna", "bluefin"])) {
    applyTastingBoost(profile, { richness: 6, tenderness: 8, umami: 12 });
  }

  if (hasAny(["uni", "sea urchin", "urchin"])) {
    applyTastingBoost(profile, {
      buttery: 20,
      richness: 18,
      sweetness: -4,
      umami: 26,
    });
  }

  if (hasAny(["ikura", "roe", "caviar", "briny"])) {
    applyTastingBoost(profile, {
      buttery: -2,
      richness: 8,
      sweetness: -8,
      umami: 22,
    });
  }

  if (hasAny(["eel", "unagi", "tare", "glazed", "sauce", "saucy"])) {
    applyTastingBoost(profile, {
      buttery: 10,
      richness: 8,
      sweetness: 18,
      umami: 20,
    });
  }

  if (hasAny(["shrimp", "ebi", "scallop", "shellfish"])) {
    applyTastingBoost(profile, {
      buttery: hasAny(["scallop"]) ? 16 : 6,
      sweetness: 20,
      tenderness: 8,
      umami: 8,
    });
  }

  if (hasAny(["octopus", "tako", "chewy", "firm"])) {
    applyTastingBoost(profile, {
      buttery: -14,
      richness: -10,
      sweetness: -4,
      tenderness: -16,
      umami: 8,
    });
  }

  if (hasAny(["whitefish", "snapper", "lean", "clean", "delicate", "light"])) {
    applyTastingBoost(profile, {
      buttery: -12,
      richness: -10,
      sweetness: 2,
      tenderness: 6,
    });
  }

  if (hasAny(["avocado", "cream cheese", "omelet", "tamago"])) {
    applyTastingBoost(profile, {
      buttery: 18,
      richness: 10,
      sweetness: 12,
      tenderness: 8,
    });
  }

  if (hasAny(["cucumber", "vegetable", "vegetables", "greens", "crisp"])) {
    applyTastingBoost(profile, {
      buttery: -8,
      richness: -12,
      sweetness: 6,
      tenderness: -6,
      umami: -6,
    });
  }

  if (hasAny(["shiitake", "earthy", "savory", "mackerel", "smoky"])) {
    applyTastingBoost(profile, { richness: 4, tenderness: 4, umami: 22 });
  }

  if (hasAny(["beef", "seared", "truffle", "warm"])) {
    applyTastingBoost(profile, { buttery: 10, richness: 18, umami: 20 });
  }

  if (hasAny(["sweet", "inari", "tofu"])) {
    applyTastingBoost(profile, { sweetness: 22, tenderness: 8, umami: 4 });
  }

  if (hasAny(["hot", "spicy"])) {
    applyTastingBoost(profile, { richness: 8, sweetness: -2, umami: 8 });
  }

  return {
    buttery: clampTastingValue(profile.buttery),
    richness: clampTastingValue(profile.richness),
    sweetness: clampTastingValue(profile.sweetness),
    tenderness: clampTastingValue(profile.tenderness),
    umami: clampTastingValue(profile.umami),
  };
}

/** Converts editorial assets into card-ready image references. */
function normalizeEditorialAsset(
  asset: LegacyEditorialAsset,
): EditorialAsset | undefined {
  if (!asset.publicUrl) {
    return undefined;
  }

  const title = asset.title || asset.role || "Sushi Bliss asset";

  return {
    experienceId: asset.experienceId,
    id: asset.id || slugify(title),
    image: normalizeImage(asset, title),
    role: asset.role,
    title,
  };
}

/** Normalizes an omakase course slot while preserving a readable fallback title. */
function normalizeOmakaseCourseItem(
  value: LegacyOmakaseCourseItem | undefined,
  fallbackTitle: string,
): OmakaseCourseItem {
  const title = value?.title || fallbackTitle;

  return {
    image: normalizeImage(value?.image, title),
    title,
  };
}

/** Returns brand copy and all core marks required by the app shell. */
export function getBrandContent(): BrandContent {
  const brand = legacyData.brand;

  return {
    assets: {
      floralEmblem: normalizeImage(
        brand?.assets?.floralEmblem,
        "Sushi Bliss floral emblem",
        ASSET_FALLBACKS.brandIcon,
      ),
      icon: normalizeImage(
        brand?.assets?.icon,
        "Sushi Bliss app icon",
        ASSET_FALLBACKS.brandIcon,
      ),
      logo: normalizeImage(
        brand?.assets?.logo,
        "Sushi Bliss logo",
        ASSET_FALLBACKS.brandLogo,
      ),
      secondaryMark: normalizeImage(
        brand?.assets?.secondaryMark,
        "Sushi Bliss secondary brand mark",
        ASSET_FALLBACKS.brandIcon,
      ),
    },
    name: brand?.name || "Sushi Bliss",
    tagline: brand?.tagline || "Timeless Japanese Artistry",
  };
}

/** Exposes imported design tokens as data for future theme tooling. */
export function getDesignTokens(): DesignTokens {
  return {
    colors: legacyData.designTokens?.colors || {},
    style: legacyData.designTokens?.style || [],
  };
}

/** Returns normalized menu items with categories, tags, image fallbacks, and search text. */
export function getMenuItems(): MenuItem[] {
  return (legacyData.menu || []).map((item) => {
    const id = item.id || slugify(item.name || "menu-item");
    const name = item.name || titleCase(id);
    const category = normalizeCategory(item.category);
    const tags = normalizeTags(item.tags);

    const baseItem: Omit<MenuItem, "searchText" | "tastingNotes"> = {
      category: category.id,
      categoryLabel: category.label,
      chefNote: item.chefNote || "Prepared with Sushi Bliss precision.",
      description: item.description || "Chef-selected seasonal preparation.",
      id,
      image: normalizeImage(item.image, name),
      ingredientImage: item.ingredientImage
        ? normalizeImage(item.ingredientImage, `${name} ingredient`)
        : undefined,
      ingredients: normalizeIngredients(item.ingredients),
      name,
      priceCents: dollarsToCents(item.price || 0),
      sakePairing: normalizePairing(item.sakePairing),
      tags,
      texture: item.texture || "Balanced",
    };
    const normalizedItem: Omit<MenuItem, "searchText"> = {
      ...baseItem,
      tastingNotes: createTastingProfile(baseItem),
    };

    return {
      ...normalizedItem,
      searchText: createSearchText(normalizedItem),
    };
  });
}

/** Finds a menu item by canonical id. */
export function getMenuItemById(id: string): MenuItem | undefined {
  return getMenuItems().find((item) => item.id === id);
}

/** Groups normalized menu items into categories for filters and navigation. */
export function getMenuCategories(): MenuCategory[] {
  const counts = getMenuItems().reduce<Record<string, MenuCategory>>(
    (acc, item) => {
      const existing = acc[item.category];

      acc[item.category] = {
        id: item.category,
        itemCount: (existing?.itemCount || 0) + 1,
        label: item.categoryLabel,
      };

      return acc;
    },
    {},
  );

  return Object.values(counts).sort((a, b) => a.label.localeCompare(b.label));
}

/** Groups normalized menu item tags for search chips and preference filters. */
export function getMenuTags(): MenuTag[] {
  const counts = getMenuItems().reduce<Record<string, MenuTag>>((acc, item) => {
    item.tags.forEach((tag) => {
      const existing = acc[tag];

      acc[tag] = {
        id: tag,
        itemCount: (existing?.itemCount || 0) + 1,
        label: titleCase(tag),
      };
    });

    return acc;
  }, {});

  return Object.values(counts).sort((a, b) => a.label.localeCompare(b.label));
}

/** Returns menu highlights while keeping the limit deterministic for static rendering. */
export function getFeaturedMenuItems(limit = 4): MenuItem[] {
  return getMenuItems()
    .filter(
      (item) => item.tags.includes("premium") || item.category === "nigiri",
    )
    .slice(0, limit);
}

/** Returns normalized chef profiles and their editorial image set. */
export function getChefs(): Chef[] {
  return (legacyData.chefs || []).map((chef) => {
    const id = chef.id || slugify(chef.name || "chef");
    const name = chef.name || titleCase(id);

    return {
      about: chef.about || "Sushi Bliss chef profile.",
      appetizer: chef.appetizer || "Seasonal appetizer",
      dessert: chef.dessert || "Seasonal dessert",
      id,
      name,
      platingImage: normalizeImage(chef.platingImage, `${name} plating`),
      position: chef.position || "Chef",
      profileImage: normalizeImage(chef.profileImage, `${name} profile`),
      sashimi: chef.sashimi || "Seasonal sashimi",
      specialty: chef.specialty || "Chef specialty",
      standingImage: normalizeImage(chef.standingImage, `${name} portrait`),
      sushi: chef.sushi || "Seasonal sushi",
    };
  });
}

/** Returns editorial asset groups used by home, about, locations, and experiences. */
export function getFeaturedAssets(): FeaturedAssets {
  const featuredAssets = legacyData.featuredAssets;

  return {
    ambience: (featuredAssets?.ambience || [])
      .map(normalizeEditorialAsset)
      .filter((asset): asset is EditorialAsset => Boolean(asset)),
    heroSushi: normalizeImage(
      featuredAssets?.heroSushi,
      "Otoro nigiri presented on a dark luxury surface",
    ),
    sakeSets: (featuredAssets?.sakeSets || []).map((image, index) =>
      normalizeImage(image, `Sake set ${index + 1}`),
    ),
  };
}

/** Returns chef-led omakase content without coupling UI to legacy course fields. */
export function getOmakaseExperience(): OmakaseExperience {
  const experience = legacyData.masterChefsOmakaseExperience;

  const courses: OmakaseCourse[] = (experience?.courses || []).map(
    (course, index) => ({
      appetizer: normalizeOmakaseCourseItem(course.appetizer, "Appetizer"),
      chefId: course.chefId || "chef",
      dessert: normalizeOmakaseCourseItem(course.dessert, "Dessert"),
      sequence: course.sequence || index + 1,
      specialty: normalizeOmakaseCourseItem(course.specialty, "Specialty"),
    }),
  );

  return {
    courses,
    description:
      experience?.description ||
      "A chef-led tasting journey prepared by the Sushi Bliss team.",
    id: experience?.id || "master-chefs-omakase-experience",
    title: experience?.title || "Master Chefs Omakase Experience",
  };
}

/** Returns reusable brand-adjacent app content such as hours, location, and benefits. */
export function getAppContent(): AppContent {
  const content = legacyData.appContent;

  return {
    benefits: (content?.benefits || []).map((benefit) => ({
      copy: benefit.copy || "Sushi Bliss benefit",
      icon: benefit.icon || "star",
      id: benefit.id || slugify(benefit.title || "benefit"),
      title: benefit.title || "Sushi Bliss Benefit",
    })),
    hours: {
      days: content?.hours?.days || "Mon - Sun",
      lastOrder: content?.hours?.lastOrder || "Last Order: 10:30 PM",
      service: content?.hours?.service || "11:30 AM - 11:00 PM",
    },
    location: {
      city: content?.location?.city || "Tokyo",
      country: content?.location?.country || "Japan",
      email: content?.location?.email || "hello@sushibliss.example",
      label: content?.location?.label || "Sushi Bliss",
      phone: content?.location?.phone || "+81 3 0000 0000",
      postalLine: content?.location?.postalLine || "Tokyo",
      street: content?.location?.street || "123 Kai Street",
    },
  };
}
