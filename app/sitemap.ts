import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://paysmallsmall.app/",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://paysmallsmall.app/founders-club/",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
