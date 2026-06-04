import type { ImageReference } from "@/types/common";

export interface BrandAssets {
  floralEmblem: ImageReference;
  icon: ImageReference;
  logo: ImageReference;
  secondaryMark: ImageReference;
}

export interface BrandContent {
  name: string;
  tagline: string;
  assets: BrandAssets;
}

export interface DesignTokens {
  colors: Record<string, string>;
  style: string[];
}

export interface BusinessLocationContent {
  city: string;
  country: string;
  email: string;
  label: string;
  phone: string;
  postalLine: string;
  street: string;
}

export interface BusinessHoursContent {
  days: string;
  lastOrder: string;
  service: string;
}

export interface BenefitContent {
  copy: string;
  icon: string;
  id: string;
  title: string;
}

export interface AppContent {
  benefits: BenefitContent[];
  hours: BusinessHoursContent;
  location: BusinessLocationContent;
}
