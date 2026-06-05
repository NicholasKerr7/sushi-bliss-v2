import type { MetadataRoute } from "next";

import { getSiteUrl, siteMetadata } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();

  return {
    background_color: "#080606",
    description: siteMetadata.description,
    display: "standalone",
    icons: [
      {
        purpose: "any",
        sizes: "512x512",
        src: "/icon.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/apple-icon.png",
        type: "image/png",
      },
    ],
    id: siteUrl.origin,
    name: siteMetadata.name,
    short_name: siteMetadata.shortName,
    start_url: "/",
    theme_color: "#080606",
  };
}
