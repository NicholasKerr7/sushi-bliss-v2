import type { ID, ImageReference } from "@/types/common";

export type AssetDevice = "mobile" | "tablet" | "desktop";

export interface AssetManifestEntry {
  id: ID;
  fileName: string;
  filePath: string;
  publicUrl: string;
  folder: string;
  extension: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
}

export interface ScreenshotReference {
  id: ID;
  role: string;
  device: AssetDevice;
  filePath: string;
  publicUrl: string;
  width?: number;
  height?: number;
  sizeBytes?: number;
}

export interface EditorialAsset {
  id: ID;
  title: string;
  role?: string;
  experienceId?: ID;
  image: ImageReference;
}

export interface FeaturedAssets {
  heroSushi: ImageReference;
  sakeSets: ImageReference[];
  ambience: EditorialAsset[];
  screensToRedesignFrom: ScreenshotReference[];
}
