import type { ID, ImageReference, StatusTone } from "@/types/common";

export type OmakasePackageTier = "counter" | "seasonal" | "private";

export interface OmakasePackageCourse {
  description: string;
  id: ID;
  image: ImageReference;
  label: string;
  title: string;
}

export interface OmakasePackage {
  accent: StatusTone;
  courses: OmakasePackageCourse[];
  description: string;
  durationMinutes: number;
  guestRange: {
    max: number;
    min: number;
  };
  id: ID;
  image: ImageReference;
  inclusions: string[];
  priceCents: number;
  subtitle: string;
  tier: OmakasePackageTier;
  title: string;
}

export interface SakePairingOption {
  description: string;
  id: ID;
  label: string;
  priceCents: number;
}

export interface PremiumReservationCard {
  description: string;
  href: string;
  id: ID;
  image: ImageReference;
  label: string;
  title: string;
}

export interface OmakaseReview {
  guestCount: number;
  package: OmakasePackage;
  sakePairing?: SakePairingOption;
  subtotalCents: number;
  totalCents: number;
}
