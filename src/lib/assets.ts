import rawAssetManifest from "../../public/assets/data/asset-manifest.json";

import { ASSET_FALLBACKS } from "@/lib/constants";
import type { ImageReference } from "@/types/common";
import type { AssetManifestEntry } from "@/types/asset";
import type { MenuItem } from "@/types/menu";

const manifest = rawAssetManifest as unknown;

const assetEntries = (
  Array.isArray(manifest)
    ? manifest
    : Object.values(manifest as Record<string, AssetManifestEntry>)
).filter((entry): entry is AssetManifestEntry => Boolean(entry.publicUrl));

const assetById = new Map(assetEntries.map((entry) => [entry.id, entry]));
const assetByPublicUrl = new Map(
  assetEntries.map((entry) => [entry.publicUrl, entry]),
);

export const TABLET_OTORO_HERO_IMAGE =
  "/assets/editorial/hero-otoro-nigiri-no-red-moon.webp";

/** Uses wide editorial imagery for tablet presentation surfaces when available. */
export function getTabletPresentationImage(item: MenuItem) {
  return item.id === "otoro-nigiri"
    ? TABLET_OTORO_HERO_IMAGE
    : item.image.publicUrl;
}

/** Builds a de-duplicated gallery for item detail carousels. */
export function getMenuItemGalleryImages(item: MenuItem): string[] {
  return [
    getTabletPresentationImage(item),
    item.ingredientImage?.publicUrl,
    item.sakePairing?.image?.publicUrl,
    item.image.publicUrl,
  ].filter((imageUrl, index, imageUrls): imageUrl is string =>
    Boolean(imageUrl && imageUrls.indexOf(imageUrl) === index),
  );
}

/** Identifies composed sushi/sake pairing images. */
export function isSakePairingImage(imageUrl: string | undefined): boolean {
  return Boolean(imageUrl?.includes("/assets/pairings/"));
}

/** Keeps gallery image treatment consistent for food and pairing hero art. */
export function getMenuGalleryImageClassName(
  imageUrl: string | undefined,
  coverClassName: string,
  pairingClassName = "object-contain object-[50%_50%]",
): string {
  return isSakePairingImage(imageUrl) ? pairingClassName : coverClassName;
}

/** Returns the normalized asset manifest as a stable, read-only list. */
export function getAssetManifest(): AssetManifestEntry[] {
  return assetEntries;
}

/** Finds a manifest entry by its generated asset id. */
export function getAssetById(id: string): AssetManifestEntry | undefined {
  return assetById.get(id);
}

/** Finds a manifest entry by the public URL used by Next image components. */
export function getAssetByPublicUrl(
  publicUrl: string,
): AssetManifestEntry | undefined {
  return assetByPublicUrl.get(publicUrl);
}

/** Returns every manifest entry within a logical folder such as `menu/sushi`. */
export function getAssetsByFolder(folder: string): AssetManifestEntry[] {
  return assetEntries.filter((entry) => entry.folder === folder);
}

/** Resolves an asset id to a public URL, with a safe fallback for missing data. */
export function getAssetUrl(
  id: string,
  fallback: string = ASSET_FALLBACKS.menuItem,
): string {
  return getAssetById(id)?.publicUrl ?? fallback;
}

/** Converts a raw asset URL into the shared image contract with dimensions. */
export function toImageReference(
  publicUrl: string | undefined,
  alt: string,
  fallback: string = ASSET_FALLBACKS.menuItem,
): ImageReference {
  const resolvedPublicUrl = publicUrl || fallback;
  const manifestEntry = getAssetByPublicUrl(resolvedPublicUrl);

  return {
    alt,
    filePath: manifestEntry?.filePath,
    height: manifestEntry?.height,
    publicUrl: resolvedPublicUrl,
    width: manifestEntry?.width,
  };
}

/** Creates an image reference from a manifest id, falling back when unavailable. */
export function imageReferenceFromAssetId(
  id: string,
  alt: string,
  fallback: string = ASSET_FALLBACKS.menuItem,
): ImageReference {
  return toImageReference(getAssetById(id)?.publicUrl, alt, fallback);
}
