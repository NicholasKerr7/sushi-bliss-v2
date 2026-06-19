import type { ID, ImageReference } from "@/types/common";

export interface SakePairing {
  id: ID;
  menuItemId: ID;
  menuName: string;
  sakeName: string;
  sakeSlug: string;
  image?: ImageReference;
}

export interface MenuTastingProfile {
  richness: number;
  umami: number;
  buttery: number;
  tenderness: number;
  sweetness: number;
}

export type DrinkCategory =
  | "beer-wine"
  | "cocktail"
  | "flight"
  | "sake"
  | "tea"
  | "zero-proof";

export type MenuOrderMode = "dine-in" | "online" | "reservation";

export interface DrinkTastingProfile {
  dry: number;
  bright: number;
  aromatic: number;
  body: number;
  finish: number;
}

export interface MenuItem {
  id: ID;
  name: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  priceCents: number;
  description: string;
  ingredients: string[];
  chefNote: string;
  texture: string;
  image: ImageReference;
  ingredientImage?: ImageReference;
  searchText: string;
  tastingNotes: MenuTastingProfile;
  abv?: number;
  ageRestricted?: boolean;
  beverageTastingNotes?: DrinkTastingProfile;
  drinkCategory?: DrinkCategory;
  itemType?: "drink" | "food";
  orderMode?: MenuOrderMode;
  pairingItemIds?: ID[];
  serving?: string;
  sakePairing?: SakePairing;
}

export interface MenuCategory {
  id: string;
  label: string;
  itemCount: number;
}

export interface MenuTag {
  id: string;
  label: string;
  itemCount: number;
}
