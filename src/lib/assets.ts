import rawAssetManifest from "../../public/assets/data/asset-manifest.json";

import { ASSET_FALLBACKS } from "@/lib/constants";
import type { ImageReference } from "@/types/common";

export interface AssetManifestEntry {
  id: string;
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

const manifest = rawAssetManifest as unknown;

const assetEntries = (
  Array.isArray(manifest)
    ? manifest
    : Object.values(manifest as Record<string, AssetManifestEntry>)
).filter((entry): entry is AssetManifestEntry => Boolean(entry.publicUrl));

export function getAssetManifest(): AssetManifestEntry[] {
  return assetEntries;
}

export function getAssetById(id: string): AssetManifestEntry | undefined {
  return assetEntries.find((entry) => entry.id === id);
}

export function getAssetUrl(
  id: string,
  fallback = ASSET_FALLBACKS.menuItem,
): string {
  return getAssetById(id)?.publicUrl ?? fallback;
}

export function toImageReference(
  publicUrl: string | undefined,
  alt: string,
): ImageReference {
  return {
    publicUrl: publicUrl || ASSET_FALLBACKS.menuItem,
    alt,
  };
}
