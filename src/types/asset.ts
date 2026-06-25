import type { ID, ImageReference } from "@/types/common";

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
}
