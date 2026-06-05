import type { MetadataRoute } from "next";

import { customerRouteIds, getCustomerRoutePath } from "@/data/customerRoutes";
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
    ...customerRouteIds.map((routeId) => ({
      changeFrequency: "weekly" as const,
      lastModified: now,
      priority: routeId === "home" ? 0.95 : 0.8,
      url: new URL(getCustomerRoutePath(routeId), siteUrl).toString(),
    })),
  ];
}
