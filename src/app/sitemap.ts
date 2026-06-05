import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return [
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 1,
      url: siteUrl.toString(),
    },
  ];
}
