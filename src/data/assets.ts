import { getAssetManifest } from "@/lib/assets";
import { getFeaturedAssets, getScreenshots } from "@/lib/data";

export const assetManifest = getAssetManifest();

export const featuredAssets = getFeaturedAssets();

export const mobileScreens = getScreenshots("mobile");

export const tabletScreens = getScreenshots("tablet");

export const desktopScreens = getScreenshots("desktop");
