import { APP_NAME } from "@/lib/constants";

export const DEFAULT_SITE_URL = "https://sushi-bliss-v2.vercel.app";

function normalizeSiteUrl(value: string | undefined): string {
  const trimmed = value?.trim();

  if (!trimmed) {
    return DEFAULT_SITE_URL;
  }

  try {
    return new URL(trimmed).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/** Resolves the public site origin for metadata, sitemap, and deployment docs. */
export function getSiteUrl(env: NodeJS.ProcessEnv = process.env): URL {
  return new URL(normalizeSiteUrl(env.NEXT_PUBLIC_SITE_URL));
}

export const siteMetadata = {
  description:
    "A luxury sushi restaurant experience for ordering, reservations, omakase, loyalty, gifts, and support.",
  name: APP_NAME,
  shortName: "Sushi Bliss",
} as const;
