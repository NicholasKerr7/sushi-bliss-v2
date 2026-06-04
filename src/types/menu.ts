import type { ID, ImageReference } from "@/types/common";

export interface SakePairing {
  id: ID;
  menuItemId: ID;
  menuName: string;
  sakeName: string;
  sakeSlug: string;
  image?: ImageReference;
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
