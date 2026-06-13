import { menuItemById } from "@/data/menu";
import { omakasePackages } from "@/data/omakase";
import type { ImageReference } from "@/types/common";

export type RecentlyViewedEntryType = "dish" | "experience";

export interface RecentlyViewedEntry {
  ctaLabel: string;
  href: string;
  id: string;
  image: ImageReference;
  isSaved: boolean;
  priceCents: number;
  subtitle: string;
  title: string;
  type: RecentlyViewedEntryType;
  viewedAt: string;
}

export interface RecentlyViewedSection {
  entries: RecentlyViewedEntry[];
  label: string;
}

interface DishHistorySeed {
  id: string;
  isSaved?: boolean;
  viewedAt: string;
}

interface ExperienceHistorySeed {
  id: string;
  isSaved?: boolean;
  priceCents: number;
  subtitle: string;
  title: string;
  viewedAt: string;
}

const dishHistoryToday: DishHistorySeed[] = [
  { id: "otoro-nigiri", viewedAt: "Viewed at 9:32 PM" },
  { id: "spicy-tuna-roll", viewedAt: "Viewed at 8:15 PM" },
  { id: "salmon-nigiri", viewedAt: "Viewed at 6:47 PM" },
];

const experienceHistoryEarlier: ExperienceHistorySeed[] = [
  {
    id: "seasonal-mastery",
    isSaved: true,
    priceCents: 18000,
    subtitle: "12 courses - 180 min",
    title: "Harmony Omakase",
    viewedAt: "Viewed yesterday at 9:10 PM",
  },
  {
    id: "counter-signature",
    priceCents: 12000,
    subtitle: "8 courses - 120 min",
    title: "Bliss Omakase",
    viewedAt: "Viewed yesterday at 7:05 PM",
  },
];

const dishHistoryEarlier: DishHistorySeed[] = [
  { id: "uni-nigiri", viewedAt: "Viewed May 23 at 8:42 PM" },
];

/** Resolves static recent-history seeds against typed menu and omakase data. */
export function getRecentlyViewedSections(): RecentlyViewedSection[] {
  return [
    {
      entries: dishHistoryToday
        .map(createDishHistoryEntry)
        .filter((entry): entry is RecentlyViewedEntry => Boolean(entry)),
      label: "Today",
    },
    {
      entries: [
        ...experienceHistoryEarlier
          .map(createExperienceHistoryEntry)
          .filter((entry): entry is RecentlyViewedEntry => Boolean(entry)),
        ...dishHistoryEarlier
          .map(createDishHistoryEntry)
          .filter((entry): entry is RecentlyViewedEntry => Boolean(entry)),
      ],
      label: "Earlier",
    },
  ].filter((section) => section.entries.length > 0);
}

function createDishHistoryEntry(
  seed: DishHistorySeed,
): RecentlyViewedEntry | null {
  const item = menuItemById.get(seed.id);

  if (!item) {
    return null;
  }

  return {
    ctaLabel: "View again",
    href: "/menu",
    id: item.id,
    image: item.image,
    isSaved: Boolean(seed.isSaved),
    priceCents: item.priceCents,
    subtitle: item.description,
    title: item.name,
    type: "dish",
    viewedAt: seed.viewedAt,
  };
}

function createExperienceHistoryEntry(
  seed: ExperienceHistorySeed,
): RecentlyViewedEntry | null {
  const experience = omakasePackages.find((item) => item.id === seed.id);

  if (!experience) {
    return null;
  }

  return {
    ctaLabel: "View experience",
    href: "/omakase",
    id: experience.id,
    image: experience.image,
    isSaved: Boolean(seed.isSaved),
    priceCents: seed.priceCents,
    subtitle: seed.subtitle,
    title: seed.title,
    type: "experience",
    viewedAt: seed.viewedAt,
  };
}
